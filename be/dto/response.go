package dto

type FindPathResponse struct {
	X int
	Y int
}

type JSONResponse struct {
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type SuccessMessage struct {
	Message string `json:"message"`
}
