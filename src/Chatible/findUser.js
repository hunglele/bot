import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;

export default (senderId) => {
    return new Promise(resolve => {
        MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        }, (err, db) => {
            if (err) throw err;
            db.db(process.env.MONGODB_NAME || process.env.MONGODB_URI.split("/")[3]).collection('users').findOne({
                _id: senderId
            }, (err, obj) => {
                if (err) throw err;
                db.close(null, () => {
                    resolve(obj)
                });
            })
        })
    })
}