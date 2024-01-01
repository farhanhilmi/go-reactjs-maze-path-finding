package usecase

import (
	"context"
	"errors"
	"fmt"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
)

const (
	START = "-"
	PATH  = "*"
	WALL  = "#"
	EXIT  = "+"
)

type MazeUsecase interface {
	FindPath(ctx context.Context, req dto.FindPathRequest) ([]dto.Point, error)
}

type mazeUsecase struct {
}

func NewMazeUsecase() MazeUsecase {
	return &mazeUsecase{}
}

func (u *mazeUsecase) findPoint(maze dto.Maze, value string) dto.Point {
	for y := 0; y < len(maze); y++ {
		for x := 0; x < len(maze[y]); x++ {
			if maze[y][x] == value {
				return dto.Point{X: x, Y: y}
			}
		}
	}
	return dto.Point{X: -1, Y: -1}
}

func (u *mazeUsecase) FindPath(ctx context.Context, req dto.FindPathRequest) ([]dto.Point, error) {
	res := []dto.Point{}

	start, exit := u.findPoint(req.Maze, START), u.findPoint(req.Maze, EXIT)
	if start.X == -1 || exit.X == -1 {
		return res, errors.New("start or exit point not found")
	}

	path := u.explorePath(req.Maze, start, exit)

	if path != nil {
		fmt.Println("Path found:")
		u.printMazeWithPath(req.Maze, path)
	} else {
		fmt.Println("No path found.")
		return res, errors.New("no path found")
	}

	return path, nil
}

func (u *mazeUsecase) explorePath(maze dto.Maze, current dto.Point, exit dto.Point) []dto.Point {
	if current == exit {
		return []dto.Point{current}
	}

	if u.isOutOfBounds(current, maze) || maze[current.Y][current.X] == WALL {
		return nil
	}

	// Mark the current position as visited
	maze[current.Y][current.X] = "V"

	// Explore neighbors in a specific order (up, down, left, right)
	neighbors := []dto.Point{{X: -1, Y: 0}, {X: 1, Y: 0}, {X: 0, Y: -1}, {X: 0, Y: 1}}
	for _, neighbor := range neighbors {
		newX, newY := current.X+neighbor.X, current.Y+neighbor.Y
		next := dto.Point{X: newX, Y: newY}

		if u.isOutOfBounds(next, maze) || maze[next.Y][next.X] == "V" {
			continue
		}

		if path := u.explorePath(maze, next, exit); path != nil {
			return append([]dto.Point{current}, path...)
		}
	}

	return nil
}

func (u *mazeUsecase) isOutOfBounds(p dto.Point, maze dto.Maze) bool {
	return p.X < 0 || p.X >= len(maze[0]) || p.Y < 0 || p.Y >= len(maze)
}

func (u *mazeUsecase) printMazeWithPath(maze dto.Maze, path []dto.Point) {
	for y := 0; y < len(maze); y++ {
		for x := 0; x < len(maze[y]); x++ {
			if u.containsPoint(path, dto.Point{X: x, Y: y}) {
				fmt.Print("X ")
			} else {
				fmt.Print(maze[y][x] + " ")
			}
		}
		fmt.Println()
	}
}

func (u *mazeUsecase) containsPoint(points []dto.Point, p dto.Point) bool {
	for _, point := range points {
		if point == p {
			return true
		}
	}
	return false
}
