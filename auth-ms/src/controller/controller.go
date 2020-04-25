package controller

import (
	"auth-ms/dao"
	"auth-ms/model"

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
	user := getBodyContent(r)
	existsUser := dao.Exists(user)

	fmt.Fprintf(w, fmt.Sprintf("%t", existsUser))
}

// Register Register into IoT_Microservices app
func Register(w http.ResponseWriter, r *http.Request) {
	user := getBodyContent(r)
	success := dao.Insert(user)

	fmt.Fprintf(w, fmt.Sprintf("%t", success))
}

// Refresh Refresh token into IoT_Microservices DB
func Refresh(w http.ResponseWriter, r *http.Request) {
	var credentials model.Credential
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		panic(err.Error())
	}

	json.Unmarshal(reqBody, &credentials)

	success := dao.Update(credentials)

	fmt.Fprintf(w, fmt.Sprintf("%t", success))
}
