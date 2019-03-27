.PHONY: build install release clean uninstall

build:
	docker build -t marina_build .
	docker run --rm -v $$PWD/build:/app/build marina_build

install:
	mv $$PWD/build/marina /usr/local/bin/marina

release: build
	tar -czvf $$PWD/dist/marina-macos-x64-latest.tar.gz $$PWD/build/marina
	@shasum -a 256 $$PWD/dist/marina-macos-x64-latest.tar.gz | awk '{printf $$1}'
	@echo
	@docker run -it --rm marina_build npm run version --silent
	@ls -lh $$PWD/dist/marina-macos-x64-latest.tar.gz | awk '{printf $$5}'

clean:
	rm -f ./build/marina*
	docker rmi marina_build

uninstall:
	rm -f /usr/local/bin/marina