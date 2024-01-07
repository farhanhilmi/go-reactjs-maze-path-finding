package handler

import (
	"fmt"
	"net/http"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/usecase"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/util"
	"github.com/gin-gonic/gin"
)

type MazeHandler struct {
	mazeUsecase usecase.MazeUsecase
}

func NewMazeHandler(mazeUsecase usecase.MazeUsecase) *MazeHandler {
	return &MazeHandler{mazeUsecase: mazeUsecase}
}

func (h *MazeHandler) FindPath(c *gin.Context) {
	var req dto.FindPathRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.Error(util.ErrInvalidInput)
		return
	}

	path, err := h.mazeUsecase.FindPath(c.Request.Context(), req)
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, dto.JSONResponse{Message: "Successfully finding path", Data: path})
}

func (h *MazeHandler) TestServer(c *gin.Context) {
	fmt.Println("TEST OK")
	c.JSON(http.StatusOK, dto.JSONResponse{Message: "pong"})
}
