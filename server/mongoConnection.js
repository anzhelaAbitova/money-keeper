const mongoose = require('mongoose');
let connectionTimeout;

const throwTimeoutError = () => {
    connectionTimeout = setTimeout(() => {
        throw new DatabaseError();
    }, 16000); 
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
module.exports.init = (mongooseC, url) => {
    const mongoInstance = mongooseC.createConnection(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        keepAlive: true,
    });
    instanceEventListeners({ conn: mongoInstance });
};