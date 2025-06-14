"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
const getClient = async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log('✅ Cliente Redis conectado');
    }
    return client;
};
exports.getClient = getClient;
