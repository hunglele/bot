import url from 'url';
import Chatfuel from '../api/Chatfuel'

function isImage(msg) {
    const url = url.parse(msg);
    if (url.protocol !== 'https:') return false;
    if (url.hostname.includes("fbcdn.net") && url.pathname.endsWith(".jpg") && url.pathname.endsWith(".jpeg") && url.pathname.endsWith(".gif")) return true
    return false;
}

function isVoice(msg) {
    const url = url.parse(msg);
    if (url.protocol !== 'https:') return false;
    if (url.hostname.includes("fbcdn.net") && url.pathname.endsWith(".mp4") && url.pathname.endsWith(".acc")) return url.split(" ")
    return false;
}

export default async (senderId, msg) => {
    if (isImage(msg)) {
        msg.split(" ").forEach(async (v) => {
            return await Chatfuel.sendImage(senderId, v)
        })
    } else {
        return await Chatfuel.sendText(senderId, msg);
    }
}