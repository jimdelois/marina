.PHONY: build install release clean uninstall

build:
	docker build -t marina_build .
	docker run --rm -v $$PWD/build:/app/build marina_build

install:
	mv $$PWD/build/marina /usr/local/bin/marina

release: build
	$(eval MARINA_VERSION = $(shell docker run -it --rm marina_build npm run version --silent))
	cd $$PWD/build && tar -czvf ../dist/marina-$(MARINA_VERSION)-macos-x64.tar.gz marina
	@shasum -a 256 $$PWD/dist/marina-$(MARINA_VERSION)-macos-x64.tar.gz | awk '{printf $$1}'
	@echo
	@echo $(MARINA_VERSION)
	@ls -lh $$PWD/dist/marina-$(MARINA_VERSION)-macos-x64.tar.gz | awk '{printf $$5}'

clean:
	rm -f ./build/marina*
	docker rmi marina_build

uninstall:
	rm -f /usr/local/bin/marina