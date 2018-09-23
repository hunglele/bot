import express from 'express';

import handleUser from '../../Chatible'
import changeGender from '../../Chatible/changeGender'

const Router = express.Router();

Router.post('/', (req, res) => {
    handleUser(req.body)
    res.send("ok")
});

Router.get('/changeGender', (req, res) => {
    changeGender(req.query.senderId, req.query.favorite)
    res.send("ok")

})

export default Router;