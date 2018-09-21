import findUser from './findUser'
import insertUser from './insertUser'
import userRequest from './userRequest'
import findPair from './findPair'
import bye from './bye'


import Chatfuel from '../api/Chatfuel'

import cache from 'memory-cache';

const ChatfuelAPI = new Chatfuel();

export default async (user) => {
    const idCouple = cache.get(user.senderId)
    if (idCouple) {
        if (user.msg === "pp") return await bye(user.senderId, idCouple)
        return await ChatfuelAPI.sendText(idCouple, user.msg);
    }
    const userDb = await findUser(user.senderId);
    if (!userDb) {
        insertUser(user).then(() => {
            return Promise.all([findPair(), ChatfuelAPI.sendText(user.senderId, "Hih chờ một chút để mình gửi yêu cầu tìm bạn nhé")]).then(() => {})
        })
    } else if (userDb.status == 0) {
        userRequest(user.senderId).then(() => {
            return Promise.all([findPair(), ChatfuelAPI.sendText(user.senderId, "Hih chờ một chút để mình gửi yêu cầu tìm bạn nhé")]).then(() => {})
        })
    } else if (userDb.status === 1) {
        return await ChatfuelAPI.sendText(user.senderId, "Chờ chút. Yêu cầu của bạn chắc bây giờ không có ai cạ. Thử huỷ đi chọn lại hoặc chờ đợi nhé")
    } else if (userDb.idCouple) {
        if (user.msg === "pp") return await bye(user.senderId, userDb.idCouple)
        cache.put(user.senderId, userDb.idCouple)
        return await ChatfuelAPI.sendText(userDb.idCouple, user.msg);
    }
}