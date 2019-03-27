.PHONY: build install clean

build:
	docker build -t marina_build .
	docker run --rm -v $$PWD/build:/app/build marina_build

install:
	mv $$PWD/build/marina /usr/local/bin/marina

clean:
	rm -f ./build/marina*
	docker rmi marina_build

uninstall:
	rm -f /usr/local/bin/marina