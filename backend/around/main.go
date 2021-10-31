package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("started-service")
	http.HandleFunc("/upload", uploadHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
