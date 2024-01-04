package httpserver

import (
	"fmt"
	"log"
	"net/http"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/config"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/handler"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/logger"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/middleware"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/httpserver/router"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/usecase"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Start(gin *gin.Engine) {
	configCors := cors.DefaultConfig()
	configCors.AllowAllOrigins = true
	// configCors.AddAllowHeaders("authorization")
	gin.Use(middleware.Logger(logger.NewLogger()))
	gin.Use(middleware.ErrorHandler())
	gin.Use(cors.New(configCors))

	mazeUsecase := usecase.NewMazeUsecase()
	personalUsecase := usecase.NewPersonalUsecase()

	mazeHandler := handler.NewMazeHandler(mazeUsecase)
	personalHandler := handler.NewPersonalHandler(personalUsecase)

	apiGroup := gin.Group("api")

	router.NewMazeRouter(mazeHandler, gin, apiGroup)
	router.NewPersonalRouter(personalHandler, gin, apiGroup)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", config.GetEnv("PORT")),
		Handler: gin,
	}

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("listen: %s\n", err)
	}
}
