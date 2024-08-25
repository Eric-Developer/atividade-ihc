import { Kafka } from 'kafkajs';

class KafkaConsumer {
    private kafka = new Kafka({
        clientId: 'notificacoes-service',
        brokers: ['kafka:9093'],
    });

    private consumer = this.kafka.consumer({ groupId: 'veiculo-service-group' });

    async connect() {
        try {
            await this.consumer.connect();
            console.log('Kafka consumer connected');
        } catch (error) {
            console.error('Error connecting Kafka consumer:', error);
            throw error;
        }
    }

    async subscribe(topic: string) {
        try {
            await this.consumer.subscribe({ topic });
            console.log(`Subscribed to topic: ${topic}`);
        } catch (error) {
            console.error('Error subscribing to topic:', error);
            throw error;
        }
    }

    async run() {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log(`Received message from topic ${topic}: ${message.value?.toString()}`);
                    console.log(`Received message: ${message.value?.toString()}`);
                },
            });
            console.log('Consumer is running');
        } catch (error) {
            console.error('Error running Kafka consumer:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.consumer.disconnect();
            console.log('Kafka consumer disconnected');
        } catch (error) {
            console.error('Error disconnecting Kafka consumer:', error);
            throw error;
        }
    }
}

export default new KafkaConsumer();
