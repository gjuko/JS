package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type BlogPost struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

func main() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb+srv://gjuko:vuoOfKulMlV9rCmX@azure-cluster.yukzke9.mongodb.net/?retryWrites=true&w=majority&appName=Azure-Cluster"))
	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database("blogdb").Collection("posts")

	http.HandleFunc("/api/blogpost/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Extract ID from URL if present
		id := strings.TrimPrefix(r.URL.Path, "/api/blogpost/")
		if id != "" && r.Method == http.MethodGet {
			objID, err := primitive.ObjectIDFromHex(id)
			if err != nil {
				http.Error(w, "Invalid ID", http.StatusBadRequest)
				return
			}
			var post BlogPost
			err = collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&post)
			if err != nil {
				http.Error(w, "Post not found", http.StatusNotFound)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(post)
			return
		}

		// Fallback to your existing logic for /api/blogpost
		if r.URL.Path == "/api/blogpost" {
			if r.Method == http.MethodPost {
				var post BlogPost
				if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
					http.Error(w, "Bad request", http.StatusBadRequest)
					return
				}
				_, err := collection.InsertOne(context.TODO(), post)
				if err != nil {
					http.Error(w, "Failed to save post", http.StatusInternalServerError)
					return
				}
				w.WriteHeader(http.StatusCreated)
				fmt.Fprint(w, "Post saved!")
			} else if r.Method == http.MethodGet {
				cursor, err := collection.Find(context.TODO(), bson.D{})
				if err != nil {
					http.Error(w, "Failed to fetch posts", http.StatusInternalServerError)
					return
				}
				posts := []BlogPost{}
				if err = cursor.All(context.TODO(), &posts); err != nil {
					http.Error(w, "Failed to decode posts", http.StatusInternalServerError)
					return
				}
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(posts)
			} else {
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			}
			return
		}

		http.Error(w, "Not found", http.StatusNotFound)
	})

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
