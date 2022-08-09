// https://github.com/docker-library/mongo/issues/174#issuecomment-297538188
db = db.getSiblingDB('test');

db.createUser({
  user: 'root',
  pwd: '123',
  roles: [{ role: 'readWrite', db: 'test' }]
});
