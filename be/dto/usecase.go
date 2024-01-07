package dto

import "mime/multipart"

type Point struct {
	X, Y int
}

type Maze [][]string

type SendEmailContactMe struct {
	Fullname    string
	Email       string
	Message     string
	Attachments []*multipart.FileHeader
}
