package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/usecase"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/util"
	"github.com/gin-gonic/gin"
)

type PersonalHandler struct {
	personalUsecase usecase.PersonalUsecase
}

func NewPersonalHandler(personalUsecase usecase.PersonalUsecase) *PersonalHandler {
	return &PersonalHandler{personalUsecase: personalUsecase}
}

func (h *PersonalHandler) VerifySSL(c *gin.Context) {
	c.File("/app/D62847BA879E8F63BE49F57AED4D4A73.txt")
}

func (h *PersonalHandler) MessageMe(c *gin.Context) {
	var req dto.ContactMeRequestHTTP

	err := c.ShouldBind(&req)
	if err != nil {
		fmt.Println("error:", err)
		c.Error(util.ErrInvalidInput)
		return
	}

	uReq := dto.ContactMeRequest{
		Fullname: strings.TrimSpace(req.Fullname),
		Email:    strings.TrimSpace(req.Email),
		Message:  strings.TrimSpace(req.Message),
	}

	form, err := c.MultipartForm()

	if err == nil {
		files := form.File["attachments[]"]
		uReq.Attachments = files
	}

	response, err := h.personalUsecase.MessageMe(c.Request.Context(), uReq)
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, dto.JSONResponse{Message: response.Message})
}
