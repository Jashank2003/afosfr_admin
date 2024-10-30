import Redis from 'ioredis';

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxmemory_policy: 'allkeys-lru',
    connectTimeout: 10000, 
};

// Maximum allowed clients
const MAX_CLIENTS = 28; 

// Connection pool
const connectionPool = [];

// Function to create a new Redis client
function createRedisClient() {
    return new Redis(redisConfig);
}

// Function to get or create a Redis client
function getRedisClient() {
    if (connectionPool.length < MAX_CLIENTS) {
        const client = createRedisClient();
        connectionPool.push(client);
        return client;
    } else {
        // Remove the least recently used client
        const oldestClient = connectionPool.shift();
        oldestClient.quit(); // Close the old connection

        //  oldestClient = connectionPool.shift();
        // oldestClient.quit(); // Close the old connection

        const newClient = createRedisClient();
        connectionPool.push(newClient);
        return newClient;
    }
}

// Export the function to get the Redis client
export { getRedisClient };
