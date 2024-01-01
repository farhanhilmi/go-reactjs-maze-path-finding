package dto

type FindPathRequest struct {
	Maze Maze `json:"maze" binding:"required"`
}
