package model

// User Credentials of a certain user
type User struct {
	Username     string
	Password     string
	RefreshToken string
}

// Credential New Tokens for a certain user
type Credential struct {
	Username        string
	RefreshToken    string
	NewRefreshToken string
}
