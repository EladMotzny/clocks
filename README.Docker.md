### Building and running the application

To build and create an image for the application use:
`docker build -t clocks-image .`

To run the application:
`docker run -p 3000:3000 clocks-image`

To build and reuse the docker container use:
`docker-compose up --build`
