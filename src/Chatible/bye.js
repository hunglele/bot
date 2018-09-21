import mongodb from 'mongodb'
import Chatfuel from '../api/Chatfuel'
const MongoClient = mongodb.MongoClient;

const ChatfuelAPI = new Chatfuel();

export default (id1, id2) => {
    return new Promise(resolve => {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) throw err;
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').updateOne({
                    _id: id1
                }, {
                    "$set": {
                        "status": 0,
                        "timestamp": null,
                        "idCouple": null
                    }
                },
                (err) => {
                    if (err) throw err;
                    db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').updateOne({
                            _id: id2
                        }, {
                            "$set": {
                                "status": 0,
                                "timestamp": null,
                                "idCouple": null
                            }
                        },
                        (err) => {
                            if (err) throw err;
                            return Promise.all([ChatfuelAPI.sendText(id1, "Bạn đã kết thúc cuộc trò chuyện với đối phương"), ChatfuelAPI.sendText(id2, "Đối phương đã kết thúc cuộc trò chuyện với bạn")]).then(() => {
                                db.close(null, () => {
                                    resolve(true)
                                })
                            })
                        })
                })
        })
    })
}