If you want to build local image use the next command:

docker build -t ${IMAGE_NAME}

If you want to run created image by previous step use the next command:

docker run -p ${LOCAL_PORT}:3000 -e REACT_APP_API_URL=${YOUR_API_URL}(Default: http://localhost:8000/api/v1) --name ${CONTAINER_NAME} ${IMAGE_NAME}

If you want to run image from DockerHub use the next command:

docker run -p ${LOCAL_PORT}:3000 -e REACT_APP_API_URL=${YOUR_API_URL}(Default: http://localhost:8000/api/v1) no1nero/movie-searcher-test