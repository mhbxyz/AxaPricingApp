PROJECT_NAME=axa-pricing-app

.PHONY: build up down restart logs clean prune

build:
	docker-compose -p $(PROJECT_NAME) build

up:
	docker-compose -p $(PROJECT_NAME) up -d

down:
	docker-compose -p $(PROJECT_NAME) down

restart:
	docker-compose -p $(PROJECT_NAME) down && docker-compose -p $(PROJECT_NAME) up -d

logs:
	docker-compose -p $(PROJECT_NAME) logs -f

clean:
	docker-compose -p $(PROJECT_NAME) down -v --remove-orphans

prune:
	docker system prune -f
