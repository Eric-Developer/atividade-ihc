import { Kafka } from 'kafkajs';

class KafkaProducer {
    private kafka = new Kafka({
        clientId: 'veiculo-service',
        brokers: ['kafka:9093'],
    });

    private producer = this.kafka.producer();

    async connect() {
        try {
            await this.producer.connect();
            console.log('Kafka producer connected');
        } catch (error) {
            console.error('Error connecting Kafka producer:', error);
            throw error;
        }
    }

    async sendMessage(topic: string, message: object) {
        try {
            // Ensure the producer is connected before sending
            await this.connect();
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(message) }],
            });
            console.log('Message sent to topic', topic);
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.producer.disconnect();
            console.log('Kafka producer disconnected');
        } catch (error) {
            console.error('Error disconnecting Kafka producer:', error);
            throw error;
        }
    }
}

export default new KafkaProducer();
