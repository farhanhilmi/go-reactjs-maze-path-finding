aws:
	ssh -i go-be-api-ec2.pem ec2-user@ec2-13-236-53-232.ap-southeast-2.compute.amazonaws.com

docker-run:
	docker run -d -p 8080:8080 --name go-be-api go-be-api

docker-build:
	docker build -t farhanhilmi/go-be-api .

docker-ush:
	docker push farhanhilmi/go-be-api