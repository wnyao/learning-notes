package example

import (
	"database/sql"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
	"woojiahao.com/gda/internal/utility"
)

func Connect() {
	connStr := utility.ConnectionString()
	db, err := sql.Open("pgx", connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database because %s", err)
	}

	if err = db.Ping(); err != nil {
		log.Fatalf("Cannot ping database because %s", err)
	}

	log.Println("Successfully connected to database and pinged it")
}
