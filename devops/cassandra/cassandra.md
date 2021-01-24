# Cassandra Cheatsheet

## Guides to data modeling

1. Enumerate all use-cases and their interdependencies
2. Use the use cases to identify all queries the app will perform (order use cases)
3. Use the queries to drive the table definitions

## Notes

- Query work with partition key
- Inserting a row that doesn't exist, Cassandra proceeds to write the row. Similar to updates, this is refer as **upsert**.

## Cassandra CLI

Example of `cqlshrc`

```
[connection]
hostname = c588c9a6-f4e4-414f-a20a-24a62021dded-us-east1.db.astra.datastax.com
port = 31067
ssl = true

[ssl]
validate = true
certfile = ./ca.crt
userkey = ./key
usercert = ./cert
```

Login into cassandra using `cqlshrc`

```
cqlsh -C -u [usernam] -p [password] --cqlshrc=[cqlshrc path]
```

Execute command from shell

```
cqlsh -u KVUser -p KVPassword -f --cqlshrc=[cqlshrc path] /home/ubuntu/data/query_user_credentials.cql
```

Determine which partition resides on which node by executing the following nodetool commands

```
nodetool getendpoints [keyspace] [tablename] '[partition value]'
# Eg. nodetool getendpoints killrvideo videos_by_tag 'cassandra'
```

Node status

```
nodetool status
```

## CQL

General Commands

```
/* clear */
cls

/* help */
HELP [shell command]
```

Create Keyspace

```
CREATE KEYSPACE killrvideo WITH replication = {
    'class': 'SimpleStrategy | NetworkTopologyStrategy',
    'replication_factor': 3
}
```

Create Table

```
/* create table with multiple primary keys */
CREATE TABLE IF NOT EXISTS latest_videos (
    /* example of different types definition */
    yyyymmdd text,
    added_date timestamp,
    videoid uuid,
    userid uuid,
    name text,
    number int,
    tags set<text>,
    views counter,
    preview_image_location text,
    PRIMARY KEY (yyyymmdd, added_date, videoid)
) WITH CLUSTERING ORDER BY (added_date DESC, videoid ASC);
```

Alter Table

```
/* add column */
ALTER TABLE users ADD ( [column] text );

/* drop column */
ALTER TABLE users DROP [column];
```

Source

```
/* execute query from file */
SOURCE './query.cql'
```

Consistency

```
CONSISTENCY [level];
```

Use

```
/* use keyspace */
USE [keyspace name];
```

Describe

- `describe` is not CQL, but cql support it.

```
/* describe keyspaces */
DESCRIBE keyspaces;

/* describe single keyspace */
DESCRIBE KEYSPACE [keyspace_name];

```

```
/* describe tables */
DESRIBE tables;

/* describe single table */
DESCRIBE [table_name];

/* describe single table from keyspace */
DESCRIBE TABLE [keyspace_name].[table_name];
```

Select

```
/* normal selection */
SELECT email FROM users where userid = ac1215ad-195e-4a65-9b4c-ade244ee5de3;

/* check TTL left for row values */
SELECT videoid, TTL(videoid) FROM video_positions_by_user WHERE userid = 11111111-1111-1111-1111-111111111111;

/* check patitioner value of a table */
SELECT token(videoid), videoid from videos;


```

Insert

```
/* normal insertion */
INSERT INTO users (userid, firstname, created_date) VALUES (uuid(), 'Jeff', toTimestamp(now()));

/* insertion with LWT */
INSERT INTO users (userid, firstname, created_date) VALUES (uuid(), 'Jeff', toTimestamp(now())) IF NOT EXISTS;

/* insert set datatype */
IESERT INTO videos (videos, tags) VALUES (12121212-1212-1212-1212-121212121212, { 'Favorite', 'Fast-paced', 'Funny' });

/* insertion with TTL set */
INSERT INTO video_positions_by_user (userid, videoid, video_position) VALUES(11111111-1111-1111-1111-111111111111, aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa, 42) USING TTL 300;

```

Update

```
/* normal update */
UPDATE users SET email = 'jeffc@datastax.com' WHERE userid = ac1215ad-195e-4a65-9b4c-ade244ee5de3;

/* update with LWT */
UPDATE killrvideo.user_credentials SET password = 'password_A' WHERE email = 'cv@datastax.com' IF password = '3@$tC0@$tC@ss@ndr@';

/* delete single data from existing set, this work similarly with counter type too */
UPDATE videos set tags = tags - { 'Refined' } WHERE videoid = ac1215ad-195e-4a65-9b4c-ade244ee5de3;

/* add single data into existing set, this work similarly with counter type too */
UPDATE videos set tags = tags + { 'Refined' } WHERE videoid = ac1215ad-195e-4a65-9b4c-ade244ee5de3;

/* reset TTL value on row */
UPDATE video_positions_by_user USING TTL 300 SET videoid = aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa WHERE userid = 11111111-1111-1111-1111-111111111111;
```

Delete

```
/* delete column */
delete email from users where userid = ac1215ad-195e-4a65-9b4c-ade244ee5de3;

/* delete row */
delete from users where userid = ac1215ad-195e-4a65-9b4c-ade244ee5de3;
```

Truncate

```
/* delete all rows without deleting table */
truncate [tablename];
```

Copy

```
/* copy data from csv to table */
COPY user_credentials FROM '/home/ubuntu/data/user_credentials.csv' WITH HEADER=TRUE;

COPY tale1 (column1, column2, column3) from 'table1data.csv' WITH HEADER=TRUE;
```

Batch

```
/* start of batch */
BEGIN BATCH

INSERT INTO killrvideo.user_credentials (email, password, userid)
  VALUES('cv@datastax.com', '3@$tC0@$tC@ss@ndr@', 55555555-5555-5555-5555-555555555555);

INSERT INTO killrvideo.users (userid, created_date, firstname, lastname, email)
  VALUES(55555555-5555-5555-5555-555555555555, toTimestamp(now()), 'Cristina', 'Veale', 'cv@datastax.com');

/* end of batch */
APPLY BATCH;
```
