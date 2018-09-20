import express from 'express';

import handleUser from '../../Chatible'

const Router = express.Router();

Router.post('/', (req, res) => {
    handleUser(req.body)
    res.send("ok")
});

export default Router;