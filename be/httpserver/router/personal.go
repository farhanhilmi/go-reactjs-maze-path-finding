package router

import (
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/handler"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/middleware"
	"github.com/gin-gonic/gin"
)

func NewPersonalRouter(h *handler.PersonalHandler, gin *gin.Engine, group *gin.RouterGroup) *gin.Engine {
	personal := group.Group("/personal")
	personal.Use(middleware.BasicAuthMiddleware())
	personal.POST("/contact-me", h.MessageMe)

	return gin
}
