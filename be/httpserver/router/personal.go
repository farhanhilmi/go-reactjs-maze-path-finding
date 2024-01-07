package router

import (
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/handler"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/middleware"
	"github.com/gin-gonic/gin"
)

// func HomeRouter(h *handler.PersonalHandler, gin *gin.Engine) *gin.Engine {
// 	gin.GET("/.well-known/pki-validation/D62847BA879E8F63BE49F57AED4D4A73.txt", h.VerifySSL)

// 	return gin
// }

func NewPersonalRouter(h *handler.PersonalHandler, gin *gin.Engine, group *gin.RouterGroup) *gin.Engine {
	personal := group.Group("/personal")
	personal.Use(middleware.BasicAuthMiddleware())
	personal.POST("/contact-me", h.MessageMe)

	return gin
}
