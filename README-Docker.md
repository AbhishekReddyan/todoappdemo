# Running with Docker Compose

1. Make sure Docker and Docker Compose are installed on your machine.

2. From the root of this project (where docker-compose.yml is), run:

docker-compose up --build

This will build the backend and frontend images, start Postgres, and run all services.

- Backend API will be available at: http://localhost:4000/api/todos
- Frontend (served by nginx) will be available at: http://localhost:5173

3. To stop: docker-compose down
