docker run -it --net="host" --mount type=bind,src="$(pwd)",target=/source bodypace-frontend-testing npm run test
