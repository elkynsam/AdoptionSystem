'use strict'

import mongoose, { mongo } from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB  cold not be connected to MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', ()=>{
            console.log('mongoDB try connection');
        });
        mongoose.connection.on('connected', ()=>{
            console.log('mongoDB connected to mongoDB');
        });
        mongoose.connection.on('open', ()=>{
            console.log('mongoDB connected to database');
        });
        mongoose.connection.on('reconnected', ()=>{
            console.log('mongoDB reconnected to mongoDB');
        });
        mongoose.connection.on('disconnected', ()=>{
            console.log('mongoDB disconnected');
        });
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });
    } catch (error) {
        console.log('Database connection failed', error);
    }
}