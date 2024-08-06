.PHONY: clean

RESOURCES = $(wildcard src/**/*.yml)

compile: src/template.yml
	@echo "YML files to merge: $(RESOURCES)"
	mkdir -p out
	cp src/template.yml out/template.yml
	for res in $(RESOURCES); do \
		echo "Processing: $$res"; \
		yq eval '.Resources += load("'$$res'")' out/template.yml -i || exit 1; \
	done

build: compile
	sam build
	sam validate --lint

publish: build
	sam deploy --capabilities CAPABILITY_IAM
	echo VITE_API_URL="api.$(HOSTNAME)" >> ../.env
	cd app && npm ci
	cd app && npm run build-only
	cp -r app/dist ./out/src && aws s3 sync ./out/src s3://$(HOSTNAME)-dashboard-site --delete

clean:
	rm -rf .aws-sam
	rm -rf out
