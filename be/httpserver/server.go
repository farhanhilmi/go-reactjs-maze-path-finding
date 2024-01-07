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
	configCors.AddAllowHeaders("authorization")
	gin.Use(middleware.Logger(logger.NewLogger()))
	gin.Use(middleware.ErrorHandler())
	gin.Use(cors.New(configCors))

	mazeUsecase := usecase.NewMazeUsecase()
	personalUsecase := usecase.NewPersonalUsecase()

	mazeHandler := handler.NewMazeHandler(mazeUsecase)
	personalHandler := handler.NewPersonalHandler(personalUsecase)

	apiGroup := gin.Group("api")

	// router.HomeRouter(personalHandler, gin)
	router.NewMazeRouter(mazeHandler, gin, apiGroup)
	router.NewPersonalRouter(personalHandler, gin, apiGroup)

	// srv := &http.Server{
	// 	Addr:    fmt.Sprintf(":%s", config.GetEnv("PORT")),
	// 	Handler: gin,
	// }

	// err := http.ListenAndServeTLS(fmt.Sprintf(":%s", config.GetEnv("PORT")), "certificate.crt", "private.key", gin)

	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", config.GetEnv("PORT")),
		Handler: gin,
	}

	if err := server.ListenAndServeTLS("certificate.crt", "private.key"); err != nil && err != http.ErrServerClosed {
		log.Printf("listen: %s\n", err)
	}
}
