package dto

type FindPathResponse struct {
	X int
	Y int
}

type JSONResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}
