package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func getAlbums(client *mongo.Client) func(c *gin.Context) {
	return func(c *gin.Context) {
		coll := client.Database("test").Collection("users")

		// find and defer close connection
		cursor, err := coll.Find(context.TODO(), bson.D{})
		defer cursor.Close(c)

		if err != nil {
			panic(err)
		}

		// getting results as bson.M
		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}

		c.IndentedJSON(http.StatusOK, results)
	}
}

// getMongoURL get mongoDB url from .env
func getMongoURL() string {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Get env var
	uri := os.Getenv("MONGOURL")
	if uri == "" {
		log.Fatal("You must set your 'MONGOURL' environmental variable")
	}

	return uri
}

// connectMongoDB connect mongoDB
func connectMongoDB() *mongo.Client {
	uri := getMongoURL()

	// Establish mongo connection
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	return client
}

// closeConnection disconnet mongoDB
func closeConnection(client *mongo.Client) {
	if err := client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
}

func main() {
	client := connectMongoDB()
	defer closeConnection(client)

	router := gin.Default()
	router.GET("/albums", getAlbums(client))
	router.Run("localhost:8080")
}
