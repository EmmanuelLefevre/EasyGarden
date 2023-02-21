SHELL := /bin/bash
.DEFAULT_GOAL = help


## ============ HELP ============
help: ## List of commands
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'


## ============ SERVER ============
sf: ## Launch Symfony local server
	php -S 127.0.0.1:8000 -t ./public
.PHONY: sf

stop: ## Stop Symfony local server
	npx kill-port 8000
	php bin/console cache:clear
.PHONY: stop
# taskkill /PID 14028 /F


## ============ DATABASE/FIXTURES ============
mg: ## Make new migration file
	$(eval CONFIRM := $(shell read -p "Do you want to create a new migration file? [y/N] " CONFIRM && echo $${CONFIRM:-N}))
	@if [ "$(CONFIRM)" = "y" ]; then \
		php bin/console make:migration --no-interaction;\
	fi
.PHONY: mg


lf: ## Load Symfony new fixtures
	php bin/console doctrine:database:drop --force
	php bin/console doctrine:database:create
	php bin/console doctrine:migrations:migrate --no-interaction
	php bin/console doctrine:fixtures:load --no-interaction
.PHONY: lf


## ============ CONSOLE ============
cc: ## Symfony clear cache
	php bin/console cache:clear
.PHONY: cc


## ============ INSTALL ============
install: ## Install all composants and dependencies after a clone repository
	composer install
	composer update
	composer req api
	composer require symfony/orm-pack
	composer require symfony/maker-bundle --dev
	composer require sensio/framework-extra-bundle
	composer require orm-fixtures --dev
	composer require fakerphp/faker
	composer require symfony/rate-limiter
	$(MAKE) lf
	composer require lexik/jwt-authentication-bundle
	openssl genrsa -out config/jwt/private.pem 4096
	openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
.PHONY: install