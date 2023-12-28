package main

import (
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/config"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()

	gin := gin.Default()
	httpserver.Start(gin)
}
