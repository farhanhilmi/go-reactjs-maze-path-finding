package router

import (
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/handler"
	"github.com/gin-gonic/gin"
)

func NewMazeRouter(h *handler.MazeHandler, gin *gin.Engine, group *gin.RouterGroup) *gin.Engine {
	group.GET("/ping", h.TestServer)

	group.POST("/finding-path", h.FindPath)

	return gin
}
