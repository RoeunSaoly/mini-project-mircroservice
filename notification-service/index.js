const amqp = require('amqplib');
async function start(retries = 5, delay = 3000){
    try{
      connection = await amqp.connect('amqp://rabbitmq_node');
      channel = await connection.createChannel();
      await channel.assertQueue('task_created');
      console.log("Notification service listening to messages");
      channel.consume('task_created', (msg) => {
        const taskData = JSON.parse(msg.content.toString());
        console.log("Received task created event:", taskData.title);
        console.log("Sending notification to user:", taskData);
        channel.ack(msg);
      })

    }catch(error){
      console.error("RabbitMQ connection error:", error.message);
    }
}
start();