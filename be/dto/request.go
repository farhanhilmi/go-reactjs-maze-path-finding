package dto

type FindPathRequest struct {
	Maze [][]int `json:"maze" binding:"required"`
}
