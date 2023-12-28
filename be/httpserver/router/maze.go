package router

import (
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/handler"
	"github.com/gin-gonic/gin"
)

func NewMazeRouter(h *handler.MazeHandler, gin *gin.Engine) *gin.Engine {
	maze := gin.Group("mazes")

	maze.POST("/finding-path", h.FindPath)

	return gin
}
