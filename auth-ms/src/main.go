package main

import (
	"auth-ms/helper"
	"auth-ms/routes"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	port := ":" + helper.GetEnv("PORT", "5000")
	routes.App(port)
}
