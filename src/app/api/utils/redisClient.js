import Redis from 'ioredis';

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxmemory_policy: 'allkeys-lru',
    connectTimeout: 10000, 
    maxRetriesPerRequest: 10,
    retryStrategy(times) {
        if (times >= 10) {
            return null; // Stop retrying after 10 attempts
        }
        return Math.min(times * 100, 2000); // Delay up to 3 seconds
    },
};

// Maximum allowed clients
const MAX_CLIENTS = 28; 
const MAX_CLIENTS_TO_QUIT = 20; // Number of clients to quit when the limit is reached

// Connection pool
const connectionPool = [];

// Function to create a new Redis client
function createRedisClient() {
    return new Redis(redisConfig);
}

// Function to get or create a Redis client
function getRedisClient() {
    // if (connectionPool.length < MAX_CLIENTS) {
        const client = createRedisClient();
        // connectionPool.push(client);
        return client;
    // } else {
    //     // Quit the specified number of least recently used clients
    //     for (let i = 0; i < MAX_CLIENTS_TO_QUIT && connectionPool.length > 0; i++) {
    //         const oldestClient = connectionPool.shift(); // Remove the oldest client
    //          oldestClient.quit(); // Close the old connection
    //     }

    //     // Create a new Redis client and add it to the pool
    //     const newClient = createRedisClient();
    //     connectionPool.push(newClient);
    //     return newClient;
    // }
}

export { getRedisClient };
