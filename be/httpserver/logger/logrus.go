package logger

import "github.com/sirupsen/logrus"

type Logger interface {
	Errorf(format string, args ...interface{})
	Fatalf(format string, args ...interface{})
	Fatal(args ...interface{})
	Infof(format string, args ...interface{})
	Info(args logrus.Fields)
	Warnf(format string, args ...interface{})
	Debugf(format string, args ...interface{})
	Debug(args ...interface{})
}
type loggerWrapper struct {
	lw *logrus.Logger
}

func (logger *loggerWrapper) Errorf(format string, args ...interface{}) {
	logger.lw.Errorf(format, args...)
}
func (logger *loggerWrapper) Fatalf(format string, args ...interface{}) {
	logger.lw.Fatalf(format, args...)
}
func (logger *loggerWrapper) Fatal(args ...interface{}) {
	logger.lw.Fatal(args...)
}
func (logger *loggerWrapper) Infof(format string, args ...interface{}) {
	logger.lw.Infof(format, args...)
}
func (logger *loggerWrapper) Info(args logrus.Fields) {
	logger.lw.WithFields(args).Info()
}
func (logger *loggerWrapper) Warnf(format string, args ...interface{}) {
	logger.lw.Warnf(format, args...)
}
func (logger *loggerWrapper) Debugf(format string, args ...interface{}) {
	logger.lw.Debugf(format, args...)
}
func (logger *loggerWrapper) Debug(args ...interface{}) {
	logger.lw.Debug(args...)
}

func NewLogger() Logger {
	logrus.SetFormatter(&logrus.JSONFormatter{})
	return &loggerWrapper{
		lw: logrus.New(),
	}
}
