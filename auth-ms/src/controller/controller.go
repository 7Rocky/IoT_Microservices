package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"auth-ms/model"

	"auth-ms/dao"
)

func getBodyContent(r *http.Request) model.User {
	var user model.User
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		panic(err.Error())
	}

	json.Unmarshal(reqBody, &user)

	return user
}

// Login login
func Login(w http.ResponseWriter, r *http.Request) {
	user := getBodyContent(r)
	existsUser := dao.Exists(user)

	fmt.Fprintf(w, fmt.Sprintf("%t", existsUser))
}

// Register register
func Register(w http.ResponseWriter, r *http.Request) {
	user := getBodyContent(r)
	success := dao.Insert(user)

	fmt.Fprintf(w, fmt.Sprintf("%t", success))
}
