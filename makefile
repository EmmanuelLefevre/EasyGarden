SHELL := /bin/bash
.DEFAULT_GOAL = help


## ============ HELP ============
help: ## List of commands
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'


## ============ SERVER ============
sf-serv: ## Launch Symfony local server
	cd api && $(MAKE) sf
.PHONY: sf-serv

ang-serv: ## Launch Angular local server
	cd pwa && $(MAKE) ang
.PHONY: ang-serv

serv: ## Launch EasyGarden local server
	make -j 2 ang-serv sf-serv
.PHONY: serv

servx: ## Relaunch Angular with clear cache
	cd pwa && $(MAKE) ang-relaunch
.PHONY: servx

sf-stop: ## Stop Symfony local server
	cd api && $(MAKE) stop
.PHONY: sf-stop

ang-stop: ## Stop Angular local server
	cd pwa && $(MAKE) stop
.PHONY: ang-stop

stop-serv: ## Stop EasyGarden local server
	make -j 2 ang-stop sf-stop
.PHONY: stop-serv


## ============ INSTALL ============
install-sf:
	cd api && $(MAKE) install
.PHONY: install-sf
