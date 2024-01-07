package middleware

import (
	"net/http"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/config"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
	"github.com/gin-gonic/gin"
)

func BasicAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the Basic Auth credentials
		user, password, hasAuth := c.Request.BasicAuth()

		// Check if the provided credentials are valid
		if !hasAuth || !checkCredentials(user, password) {
			c.Header("WWW-Authenticate", "Basic realm=Restricted")
			c.AbortWithStatusJSON(http.StatusUnauthorized, dto.JSONResponse{Message: "Unauthorized"})
			return
		}

		// Continue with the next middleware or route handler
		c.Next()
	}
}

func checkCredentials(username, password string) bool {
	validUsername := config.GetEnv("BASIC_AUTH_USER")
	validPassword := config.GetEnv("BASIC_AUTH_PASSWORD")

	return username == validUsername && password == validPassword
}
