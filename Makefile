.PHONY: compile build clean

NAME := dashboard
BUCKET := tiki-artifacts-catalog
TEMPLATE_FILE := out/template.yml
PACKAGED_FILE := out/packaged-template.yml

semver:
	@if [ -z "$(version)" ]; then \
  		echo "Version is null, skipping semver step"; \
	else \
	  if echo "$(version)" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$$'; then \
	    cd src/app && \
	  	sed -i 's/"version": "[0-9]*\.[0-9]*\.[0-9]*"/"version": "$(version)"/' ./package.json && \
			npm ci; \
	  else \
	    echo "version must be in semver format (major.minor.patch)"; \
	    exit 1; \
	  fi; \
	fi

compile: template.yml
	mkdir -p out
	cp template.yml out/template.yml
	for res in $(wildcard src/*.yml); do \
		echo "Processing: $$res"; \
		yq eval '.Resources += load("'$$res'")' out/template.yml -i || exit 1; \
	done

build: compile
	sam build --template $(TEMPLATE_FILE)
	cd src/app && npm ci && npm run build
	sam validate --lint --template $(TEMPLATE_FILE)

publish: build
	sam package --template-file $(TEMPLATE_FILE) --s3-bucket $(BUCKET) --s3-prefix $(NAME) --output-template-file $(PACKAGED_FILE)
	aws s3 mv $(PACKAGED_FILE) "s3://$(BUCKET)/$(NAME)/template.yml"
	aws s3 sync ./src/app/dist s3://$(BUCKET)/$(NAME)/$(VERSION) --delete
	aws servicecatalog create-provisioning-artifact \
        --product-id $(PRODUCT_ID) \
        --parameters '{"Name":"$(VERSION)","Type": "CLOUD_FORMATION_TEMPLATE","Info":{"LoadTemplateFromURL":"https://s3.amazonaws.com/$(BUCKET)/$(NAME)/template.yml"}}';
