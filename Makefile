start-dev:
	make -C server dev
start-prod:
	make -C server start
init-server-env:
	make -C server env-init
