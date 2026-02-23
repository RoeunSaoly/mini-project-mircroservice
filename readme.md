# 📋 Task Management Microservices

A microservices-based application for managing users, tasks, and notifications built with **Node.js**, **Express**, **MongoDB**, and **RabbitMQ**. This project demonstrates event-driven architecture where services communicate asynchronously via message queues.

## 🏗️ Architecture Overview

The system consists of three independent microservices:

- **User Service**: Handles user management (CRUD operations for users).
- **Task Service**: Manages tasks and publishes task creation events to RabbitMQ.
- **Notification Service**: Consumes task events and processes notifications.

Services communicate through **RabbitMQ** for event-driven messaging, ensuring loose coupling and scalability.

## 🚀 Technologies Used

- **Node.js** & **Express**: Backend framework for API development
- **MongoDB**: NoSQL database for data persistence
- **RabbitMQ**: Message broker for inter-service communication
- **Docker** & **Docker Compose**: Containerization and orchestration

## 📋 Prerequisites

- Node.js (v18 or later recommended)
- Docker & Docker Compose
- Git

## 🛠️ Setup and Installation

### 1. Clone the Repository

```bash
git clone git@github.com:RoeunSaoly/mini-project-mircroservice.git
cd microservices
```

### 2. Environment Configuration

Create a `.env` file in the root directory (optional, as defaults are set in code):

```env
MONGO_URL=mongodb://mongo:27017
RABBITMQ_URL=amqp://rabbitmq_node
```

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

This will start all services:
- MongoDB on port 27017
- RabbitMQ Management UI on port 15673 (http://localhost:15673)
- User Service on port 3001
- Task Service on port 3002
- Notification Service on port 3003

## 📡 API Endpoints

### User Service (Port 3001)

- `GET /users` - Retrieve all users
- `POST /users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### Task Service (Port 3002)

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
  ```json
  {
    "title": "Complete project",
    "description": "Finish the microservices implementation",
    "userId": "user_id_here"
  }
  ```

### Notification Service (Port 3003)

The notification service runs as a consumer and doesn't expose public APIs. It listens for task creation events and logs notifications.

## 🔄 Event-Driven Communication

1. **Task Creation**: When a task is created in the Task Service, it publishes a `task_created` event to RabbitMQ.
2. **Notification Processing**: The Notification Service consumes these events and processes notifications (currently logs to console).
3. **Future Extensions**: Can be extended to send emails, push notifications, etc.

## 📂 Project Structure

```
microservices/
├── docker-compose.yml
├── .env
├── user-service/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
├── task-service/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
└── notification-service/
    ├── Dockerfile
    ├── package.json
    └── index.js
```

## 🧪 Testing the Services

### Create a User
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

### Create a Task
```bash
curl -X POST http://localhost:3002/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task", "description": "Testing task creation", "userId": "user_id"}'
```

### Check Notifications
Monitor the notification service logs in Docker:
```bash
docker logs notification-service
```

## 🔧 Development

Each service can be run independently for development:

```bash
# User Service
cd user-service
npm install
npm start

# Task Service
cd task-service
npm install
npm start

# Notification Service
cd notification-service
npm install
npm start
```

Ensure MongoDB and RabbitMQ are running (via Docker Compose or separately).

## 👨‍💻 Author

Built with ❤️ by Roeun Saoly  
Third-year IT Engineering student at RUPP, aspiring full-stack developer.

---

*This project serves as a learning example for microservices architecture and event-driven systems.*
