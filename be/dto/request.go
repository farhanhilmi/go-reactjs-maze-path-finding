package dto

import "mime/multipart"

type FindPathRequest struct {
	Maze Maze `json:"maze" binding:"required"`
}

type ContactMeRequest struct {
	Fullname    string                  `form:"fullname" binding:"required"`
	Email       string                  `form:"email" binding:"required,email"`
	Message     string                  `form:"message" binding:"required"`
	Attachments []*multipart.FileHeader `form:"attachments[]"`
}
