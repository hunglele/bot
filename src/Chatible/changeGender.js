import mongodb from 'mongodb'
import Chatfuel from '../api/Chatfuel'

const MongoClient = mongodb.MongoClient;
const ChatfuelAPI = new Chatfuel();

export default (senderId, favorite) => {
    return new Promise(resolve => {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) throw err;
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').updateOne({
                _id: senderId
            }, {
                "$set": {
                    "favorite": favorite,
                }
            }, (err) => {
                return ChatfuelAPI.sendText(senderId, "Sở thích của bạn đã được đổi thành công trong lần tìm bạn kế tiếp").then(() => {
                    db.close(null, () => {
                        resolve(true)
                    })
                })
            });
        })
    })
}