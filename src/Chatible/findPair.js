import mongodb from 'mongodb'
import pair from './pair';

const MongoClient = mongodb.MongoClient;

export default () => {
    return new Promise(resolve => {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) throw err;
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').find({
                status: 1
            }).toArray(async (err, obj) => {
                if (err) throw err;
                if (obj.length > 1) {
                    for (var i = 0; i < obj.length; i++) {
                        pair(obj[i]._id, await (findUser2(obj[i]._id, obj[i].favorite, obj[i].gender)));
                    }
                }
            })
        })
    })
}

function findUser2(senderId, senderFav, senderGen) {
    return new Promise(resolve => {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) throw err;
            if (senderFav === 'any') {
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').find({
                    $or: [{
                        favorite: senderGen
                    }, {
                        favorite: "any"
                    }],
                    status: 1,
                    _id: {
                        $ne: senderId
                    }
                }).toArray((err, obj) => {
                    if (err) throw err;
                    if (obj.length === 0) return senderId
                    else {
                        return resolve(obj[Math.floor(Math.random() * obj.length)]._id);
                    }
                })
            } else {
                db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').find({
                    $or: [{
                        favorite: senderGen
                    }, {
                        favorite: "any"
                    }],
                    gender: senderFav,
                    status: 1,
                    _id: {
                        $ne: senderId
                    }
                }).toArray((err, obj) => {
                    if (err) throw err;
                    if (obj.length === 0) return senderId
                    else {
                        return resolve(obj[Math.floor(Math.random() * obj.length)]._id)
                    }
                })
            }
        })
    })
}
