import express from 'express'

const app = express();

app.get('/ping', (_, res) => res.send("pong"))

function runServer(port = 3000, done) {
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