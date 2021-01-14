// 导入 mongoose 模块
const mongoose = require('mongoose');

const localdburl = "mongodb://127.0.0.1/locallibrary_db"
const remotedburl = "mongodb+srv://locallibrary_manager:FUrqvxYbFKngFDS3@cluster0.xtdgi.mongodb.net/locallibrary_db?retryWrites=true&w=majority"
const uri = "mongodb+srv://locallibrary_manager:FUrqvxYbFKngFDS3@cluster0.xtdgi.mongodb.net/locallibrary_db?retryWrites=true&w=majority";


function initDB(){
    // 设置默认 mongoose 连接
    const mongoDB = localdburl;
    mongoose.connect(mongoDB);
    // 让 mongoose 使用全局 Promise 库
    mongoose.Promise = global.Promise;
    // 取得默认连接
    const db = mongoose.connection;

    // 将连接与错误事件绑定（以获得连接错误的提示）
    db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
}

// 导出
module.exports = {initDB}



// locallibrary_manager
// FUrqvxYbFKngFDS3

// Atlas AWS Account ARN: arn:aws:iam::536727724300:root 
// Your unique External ID: 3937538d-28fd-4582-9cc5-81f17d6ba71b