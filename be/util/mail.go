package util

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"text/template"

	"github.com/farhanhilmi/go-reactjs-maze-path-finding/config"
	"github.com/farhanhilmi/go-reactjs-maze-path-finding/dto"
	"gopkg.in/gomail.v2"
)

func SendContactMeMail(payload dto.SendEmailContactMe) error {
	htmlTemplatePath := "contact_me_template.html"
	htmlTemplate, err := ioutil.ReadFile(htmlTemplatePath)
	if err != nil {
		return err
	}

	tmpl, err := template.New("emailTemplate").Parse(string(htmlTemplate))
	if err != nil {
		return err
	}

	var tplBuffer bytes.Buffer
	if err := tmpl.Execute(&tplBuffer, payload); err != nil {
		return err
	}

	emailBody := tplBuffer.String()

	mailer := gomail.NewMessage()
	mailer.SetHeader("From", config.GetEnv("EMAIL_SENDER_NAME"))
	mailer.SetHeader("To", config.GetEnv("EMAIL_RECEIVER_NAME"))
	mailer.SetAddressHeader("Cc", payload.Email, payload.Fullname)
	mailer.SetHeader("Subject", fmt.Sprintf("[Farhan Hilmi] %s want to contact you", payload.Fullname))
	mailer.SetBody("text/html", emailBody)

	// Attach files, if any
	for _, attachment := range payload.Attachments {
		file, err := attachment.Open()
		if err != nil {
			log.Printf("Error opening attachment %s: %v", attachment.Filename, err)
			continue
		}
		defer file.Close()

		mailer.Attach(attachment.Filename)
	}

	port, err := strconv.Atoi(config.GetEnv("EMAIL_SMTP_PORT"))
	if err != nil {
		return err
	}

	dialer := gomail.NewDialer(
		config.GetEnv("EMAIL_SMTP_HOST"),
		port,
		config.GetEnv("EMAIL_AUTH"),
		config.GetEnv("EMAIL_AUTH_PASSWORD"),
	)

	err = dialer.DialAndSend(mailer)
	if err != nil {
		return err
	}

	return nil
}
