package router

import (
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/handler"
	"github.com/gin-gonic/gin"
)

func NewMazeRouter(h *handler.MazeHandler, gin *gin.Engine) *gin.Engine {
	api := gin.Group("api")
	api.GET("/ping", h.TestServer)
	maze := gin.Group("api/mazes")

	maze.POST("/finding-path", h.FindPath)

	return gin
}
