const throwTimeoutError = () => {
    connectionTimeout = setTimeout(() => {
        throw new DatabaseError();
    }, 16000); // (reconnectTries * reconnectInterval) + buffer
}
const instanceEventListeners = ({ conn }) => {
    conn.on('connected', () => {
        console.log('Database - Connection status: connected');
		clearTimeout(connectionTimeout);
    });
    conn.on('disconnected', () => {
        console.log('Database - Connection status: disconnected');
		throwTimeoutError();
    });
    conn.on('reconnected', () => {
        console.log('Database - Connection status: reconnected');
		clearTimeout(connectionTimeout);
    });
    conn.on('close', () => {
        console.log('Database - Connection status: close ');
		clearTimeout(connectionTimeout);
    });
}
module.exports.init = () => {
    const mongoInstance = mongoose.createConnection(config.DATABASE.HOST, {
        useNewUrlParser: true,
        keepAlive: true,
        autoReconnect: true,
        reconnectTries: 3,
        reconnectInterval: 5000,
    });
    clients.mongoInstance = mongoInstance;
    instanceEventListeners({ conn: mongoInstance });
};