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

	// Register both paths to avoid redirect issues
	http.HandleFunc("/api/blogpost", func(w http.ResponseWriter, r *http.Request) {
		handleBlogPost(w, r, collection)
	})
	http.HandleFunc("/api/blogpost/", func(w http.ResponseWriter, r *http.Request) {
		handleBlogPost(w, r, collection)
	})

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func handleBlogPost(w http.ResponseWriter, r *http.Request, collection *mongo.Collection) {
	// CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Handle GET by ID only if path is longer than /api/blogpost/
	if strings.HasPrefix(r.URL.Path, "/api/blogpost/") {
		id := strings.TrimPrefix(r.URL.Path, "/api/blogpost/")
		if r.Method == http.MethodGet {
			objID, err := primitive.ObjectIDFromHex(id)
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{"error": "Invalid ID"})
				return
			}
			var post BlogPost
			err = collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&post)
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusNotFound)
				json.NewEncoder(w).Encode(map[string]string{"error": "Post not found"})
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(post)
			return
		}
	}

	// Handle POST and GET for all posts
	if r.URL.Path == "/api/blogpost" {
		switch r.Method {
		case http.MethodPost:
			var post BlogPost
			if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{"error": "Bad request"})
				return
			}
			_, err := collection.InsertOne(context.TODO(), post)
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{"error": "Failed to save post"})
				return
			}
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(map[string]string{"message": "Post saved!"})
		case http.MethodGet:
			cursor, err := collection.Find(context.TODO(), bson.D{})
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{"error": "Failed to fetch posts"})
				return
			}
			var posts []BlogPost
			if err = cursor.All(context.TODO(), &posts); err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{"error": "Failed to decode posts"})
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(posts)
		default:
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusMethodNotAllowed)
			json.NewEncoder(w).Encode(map[string]string{"error": "Method not allowed"})
		}
		return
	}

	// Catch-all for unknown paths
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Not found"})
}
