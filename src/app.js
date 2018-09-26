import express from 'express'
import bodyParser from 'body-parser'

import Chatible from './routes/Chatible'
import GetMessage from './routes/get'


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/ping', (_, res) => res.send("pong"))

app.use('/chatible', Chatible)
app.use('/get', GetMessage)
app.get('/status', (req, res) => {
    res.json({
        mongodb_url: process.env.MONGODB_URI,
        bot: {
            TOKEN_CHATFUEL: process.env.TOKEN_CHATFUEL,
            BOT_ID: process.env.BOT_ID,
            TEXT_BLOCK: process.env.TEXT_BLOCK,
            IMAGE_BLOCK: process.env.IMAGE_BLOCK,
            VOICE_BLOCK: process.env.VOICE_BLOCK,
        },
        PORT: process.env.PORT || 3000,
    })
})

function runServer(port = process.env.PORT || 3000, done) {
    /* 3000 is port default */
    app.listen(port, async err => {
        if (err) throw err;
        console.log(`Listening at port ${port}`);
        if (done) done();
    });
}

export default app;

export {
    runServer
};