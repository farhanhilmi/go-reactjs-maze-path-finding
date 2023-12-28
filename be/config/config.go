package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
		panic(fmt.Errorf("Error loading .env file: %w", err))
	}
}

func GetEnv(key string) string {
	return os.Getenv(key)
}
