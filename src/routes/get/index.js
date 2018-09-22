import express from 'express';

import handleUser from '../../Chatible'

const Router = express.Router();

Router.get('/image', (req, res) => {
    res.json({
        "messages": [{
            "attachment": {
                "type": "image",
                "payload": {
                    "url": req.query.payload
                }
            }
        }]
    })
});

export default Router;