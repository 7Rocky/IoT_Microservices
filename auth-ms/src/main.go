package main

import (
	"auth-ms/helper"
	"auth-ms/routes"

	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	port := ":" + helper.GetEnv("PORT", "5000")
	log.Println("Starting GO server on port " + port)
	routes.App(port)
}
