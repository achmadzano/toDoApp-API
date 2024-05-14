require('dotenv').config();
const { MongoClient } = require("mongodb");
const MAIN_DB = process.env.MAIN_DB;
const settings = require("./../../../settings");

exports.createList = async (req, res, next) => {
    try {
        const client = new MongoClient(settings.mongoDB.url);
        await client.connect();
        const db = client.db(MAIN_DB);

        let list = req.body;
        list._id = "list-" + Math.random().toString(36).substr(2, 9);

        const result = await db.collection('List').insertOne(req.body);
        res.send(result);
    } catch (error) {
        console.log('Error creating list: ', error);
        next(error);
    }
};

exports.getList = async (req, res) => {
    try {
        const client = new MongoClient(settings.mongoDB.url);
        await client.connect();
        const db = client.db(MAIN_DB);
        const result = await db.collection('List').find().toArray();
        res.send(result);
    } catch (error) {
        console.log('Error getting list: ', error);
        next(error);
    }
};

exports.getListById = async (req, res, next) => {
    try {
        const client = new MongoClient(settings.mongoDB.url);
        await client.connect();
        const db = client.db(MAIN_DB);

        const result = await db.collection('List').findOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.log('Error getting list by id: ', error);
        next(error);
    }
};

exports.updateList = async (req, res, next) => {
    try {
        const client = new MongoClient(settings.mongoDB.url);
        await client.connect();
        const db = client.db(MAIN_DB);

        const result = await db.collection('List').updateOne({ _id: req.body._id }, { $set: req.body });
        res.send(result);
    } catch (error) {
        console.log('Error updating list: ', error);
        next(error);
    }
};

exports.deleteList = async (req, res, next) => {
    try {
        const client = new MongoClient(settings.mongoDB.url);
        await client.connect();
        const db = client.db(MAIN_DB);

        // const result = await db.collection('List').deleteOne({ _id: req.body._id });
        const result = await db.collection('List').deleteOne({ _id: req.params.id });

        res.send(result);
    } catch (error) {
        console.log('Error deleting list: ', error);
        next(error);
    }
};