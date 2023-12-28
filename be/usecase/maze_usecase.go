package usecase

import (
	"context"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
)

type MazeUsecase interface {
	FindPath(ctx context.Context, req dto.FindPathRequest) ([]dto.FindPathResponse, error)
}

type mazeUsecase struct {
}

func NewMazeUsecase() MazeUsecase {
	return &mazeUsecase{}
}

func (u *mazeUsecase) FindPath(ctx context.Context, req dto.FindPathRequest) ([]dto.FindPathResponse, error) {
	res := []dto.FindPathResponse{}

	return res, nil
}
