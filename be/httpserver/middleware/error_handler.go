package middleware

import (
	"context"
	"errors"
	"net/http"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/util"
	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		err := c.Errors.Last()
		if err != nil {
			if errors.Is(err, context.DeadlineExceeded) {
				c.AbortWithStatusJSON(http.StatusBadGateway, dto.JSONResponse{Message: "request timeout"})
			}

			errMap, ok := err.Err.(*util.CustomError)

			if !ok {
				// c.AbortWithStatusJSON(http.StatusInternalServerError, dto.JSONResponse{Message: err.Err.Error()})
				c.AbortWithStatusJSON(http.StatusInternalServerError, dto.JSONResponse{Message: "Internal Server Error"})
			}

			switch errMap.Code {
			case util.BadRequest:
				c.AbortWithStatusJSON(http.StatusBadRequest, dto.JSONResponse{Message: errMap.Message})
			case util.Unauthorized:
				c.AbortWithStatusJSON(http.StatusUnauthorized, dto.JSONResponse{Message: errMap.Message})
			case util.NotFound:
				c.AbortWithStatusJSON(http.StatusNotFound, dto.JSONResponse{Message: errMap.Message})

			default:
				// c.AbortWithStatusJSON(http.StatusInternalServerError, dto.JSONResponse{Message: err.Error()})
				c.AbortWithStatusJSON(http.StatusInternalServerError, dto.JSONResponse{Message: "Internal Server Error"})
			}
			c.Abort()
		}
	}
}
