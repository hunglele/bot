import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;

export default (user) => {
    return new Promise(resolve => {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) throw err;
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').insertOne({
                _id: user.senderId,
                idCouple: null,
                "status": 1,
                "favorite": 'any',
                "timestamp": Date.now(),
                "name": user.name,
                "gender": user.gender,
                "profile_pic": user.profile_pic,
            }, (err, res) => {
                if (err) throw err;
                db.close(null, () => resolve(true))
            })
        })
    })
}