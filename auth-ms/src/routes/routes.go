package routes

import (
	"auth-ms/controller"

	"net/http"

	"github.com/gorilla/mux"
)

// App Initialize routes for auth-ms app
func App(port string) {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/login", controller.Login).Methods("POST")
	router.HandleFunc("/register", controller.Register).Methods("POST")
	router.HandleFunc("/refresh", controller.Refresh).Methods("POST")

	http.ListenAndServe(port, router)
}
