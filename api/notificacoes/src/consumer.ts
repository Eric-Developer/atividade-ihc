import kafka from "./config/kafka";

(async () => {
    try {
        await kafka.connect();
        await kafka.subscribe('veiculo_cadastrado');
        await kafka.run();
    } catch (error) {
        console.error('Error setting up Kafka consumer:', error);
    }
})();
