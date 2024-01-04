package usecase

import (
	"context"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/util"
)

type PersonalUsecase interface {
	MessageMe(ctx context.Context, req dto.ContactMeRequest) (dto.SuccessMessage, error)
}

type personalUsecase struct {
}

func NewPersonalUsecase() PersonalUsecase {
	return &personalUsecase{}
}

func (u *personalUsecase) MessageMe(ctx context.Context, req dto.ContactMeRequest) (dto.SuccessMessage, error) {
	res := dto.SuccessMessage{}

	data := dto.SendEmailContactMe{
		Fullname:    req.Fullname,
		Email:       req.Email,
		Message:     req.Message,
		Attachments: req.Attachments,
	}

	err := util.SendContactMeMail(data)
	if err != nil {
		return res, err
	}

	res.Message = "Successfully send message. You will be contacted soon. Thank you!"

	return res, nil
}
