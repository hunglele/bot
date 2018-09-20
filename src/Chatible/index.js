import findUser from './findUser'
import insertUser from './insertUser'
import userRequest from './userRequest'
import findPair from './findPair'


import Chatfuel from '../api/Chatfuel'

const ChatfuelAPI = new Chatfuel();

export default async (user) => {
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
        // Waiting ?
        return await ChatfuelAPI.sendText(user.senderId, "Chờ chút. Yêu cầu của bạn chắc bây giờ không có ai cạ. Thử huỷ đi chọn lại hoặc chờ đợi nhé")
    } else if (userDb.idCouple) {
        //Ok
        return await ChatfuelAPI.sendText(userDb.idCouple, user.msg);
    }
}