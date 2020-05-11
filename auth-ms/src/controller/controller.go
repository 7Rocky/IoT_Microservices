package controller

import (
	"auth-ms/dao"
	"auth-ms/model"
	"log"

	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

// getBodyContent Parse application/json to model.User struct
func getBodyContent(r *http.Request) model.User {
	var user model.User
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		panic(err.Error())
	}

	json.Unmarshal(reqBody, &user)

	return user
}

// Login Login into IoT_Microservices app
func Login(w http.ResponseWriter, r *http.Request) {
	log.Println("POST /login")

	user := getBodyContent(r)
	existsUser, dbUser := dao.Exists(user)
	loginCorrect := false

	if existsUser {
		var updateCredential model.Credential = model.Credential{
			Username:        user.Username,
			RefreshToken:    dbUser.RefreshToken,
			NewRefreshToken: user.RefreshToken,
		}

		rows := dao.Update(updateCredential)
		loginCorrect = rows == 1
	}

	fmt.Fprintf(w, fmt.Sprintf("%t", loginCorrect))
}

// Register Register into IoT_Microservices app
func Register(w http.ResponseWriter, r *http.Request) {
	log.Println("POST /register")

	user := getBodyContent(r)
	success := dao.Insert(user)

	fmt.Fprintf(w, fmt.Sprintf("%t", success))
}

// Refresh Refresh token into IoT_Microservices DB
func Refresh(w http.ResponseWriter, r *http.Request) {
	log.Println("POST /refresh")

	var credentials model.Credential
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		panic(err.Error())
	}

	json.Unmarshal(reqBody, &credentials)

	rows := dao.Update(credentials)
	success := rows == 1

	fmt.Fprintf(w, fmt.Sprintf("%t", success))
}
