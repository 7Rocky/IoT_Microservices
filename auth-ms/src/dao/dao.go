package dao

import (
	"auth-ms/helper"
	"auth-ms/model"

	"database/sql"
	"fmt"
	"log"
)

// connect Connect to MySQL Server
func connect() *sql.DB {
	user := "root"
	password := helper.GetEnv("MYSQL_ROOT_PASSWORD", "my-secret-pw")
	host := helper.GetEnv("MYSQL_HOSTNAME", "192.168.1.222")
	port := helper.GetEnv("MYSQL_SERVICE_PORT", "31000")
	database := helper.GetEnv("MYSQL_DATABASE_NAME", "iot")

	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password, host, port, database))

	if err != nil {
		panic(err.Error())
	}

	return db
}

// Exists Exists user credentials in the DB
func Exists(user model.User) bool {
	db := connect()
	pStmt, err := db.Prepare("SELECT * FROM iot.users WHERE username = ? AND password = ?")

	if err != nil {
		panic(err.Error())
	}

	defer pStmt.Close()
	var dbUser model.User

	err = pStmt.QueryRow(user.Username, user.Password).Scan(&dbUser.Username, &dbUser.Password, &dbUser.RefreshToken)

	existUser := user.Username == dbUser.Username && user.Password == dbUser.Password

	if err != nil {
		existUser = false
		log.Println("User '" + user.Username + "' and password '***' not found in the DB")
	}

	var updateCredential model.Credential = model.Credential{
		Username:        user.Username,
		RefreshToken:    dbUser.RefreshToken,
		NewRefreshToken: user.RefreshToken,
	}

	success := Update(updateCredential)

	if err != nil {
		success = false
		log.Println("Error updating refresh token")
	}

	return existUser && success
}

// Insert Insert new user credentials in the DB
func Insert(user model.User) bool {
	db := connect()
	pStmt, err := db.Prepare("INSERT INTO iot.users VALUES (?, ?, ?)")

	if err != nil {
		panic(err.Error())
	}

	defer pStmt.Close()

	_, err = pStmt.Exec(user.Username, user.Password, user.RefreshToken)

	if err != nil {
		log.Println("The user inserted is already registered")
		return false
	}

	return true
}

// Update Update user credentials in the DB
func Update(credentials model.Credential) bool {
	db := connect()
	pStmt, err := db.Prepare("UPDATE iot.users SET refresh_token = ? WHERE refresh_token = ? AND username = ?")

	if err != nil {
		panic(err.Error())
	}

	defer pStmt.Close()

	result, err := pStmt.Exec(credentials.NewRefreshToken, credentials.RefreshToken, credentials.Username)

	if err != nil {
		log.Println("The transaction failed")
		return false
	}

	rows, _ := result.RowsAffected()

	return rows == 1
}
