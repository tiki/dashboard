.PHONY: clean

RESOURCES = $(wildcard src/*.yml src/*/*.yml src/*/*/*.yml)

compile: template.yml
	@echo "YML files to merge: $(RESOURCES)"
	mkdir -p out
	cp template.yml out/template.yml
	for res in $(RESOURCES); do \
		echo "Processing: $$res"; \
		yq eval '.Resources += load("'$$res'")' out/template.yml -i || exit 1; \
	done

build: compile
	sam build
	sam validate --lint

publish: build
	sam deploy --parameter-overrides "HostName=$(HOSTNAME) DNSZone=$(DNSZone)" --capabilities CAPABILITY_IAM
	echo VITE_API_URL="$(API_URL)" >> ../.env
	npm run deploy --bucket=$(HOSTNAME)-dashboard-site

clean:
	rm -rf .aws-sam
	rm -rf out
