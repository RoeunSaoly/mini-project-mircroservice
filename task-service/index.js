const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
const app = express();
const port = 3002;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/tasks')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDb connection error:", err));

// Define schema + model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

let channel , connection;
async function connectRabbitMQWithRetry(retries = 5, delay = 3000){
  while(retries){
    try{
      connection = await amqp.connect('amqp://rabbitmq_node');
      channel = await connection.createChannel();
      await channel.assertQueue('task_created');
      console.log("Connected to RabbitMQ");
      return;
    
    }catch(error){
      console.error("RabbitMQ connection error:", error.message);
      retries--;
      console.error("Retrying again: ", retries);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const task = new Task({ title, description, userId });
    await task.save();
    const message = {taskId: task._id, userId, title}
    if(!channel){
      return res.status(503).send({error: "RabbitMQ connection not established"});
    }

    channel.sendToQueue("task_created", Buffer.from(JSON.stringify(message)));

    res.status(201).send(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Task service listening on port ${port}`);
  connectRabbitMQWithRetry();
});
