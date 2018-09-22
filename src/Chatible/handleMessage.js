import Chatfuel from '../api/Chatfuel'

function isImage(msg) {
    const url = new URL(msg);
    if (url.protocol !== 'https:') return false;
    if (url.hostname.includes("fbcdn.net") && url.pathname.endsWith(".jpg") && url.pathname.endsWith(".jped") && url.pathname.endsWith(".gift")) return true
    return false;
}

function isVoice(msg) {
    const url = new URL(msg);
    if (url.protocol !== 'https:') return false;
    if (url.hostname.includes("fbcdn.net") && url.pathname.endsWith(".mp4") && url.pathname.endsWith(".acc")) return url.split(" ")
    return false;
}

export default (senderId, msg) => {
    if (isImage(msg)) {
        msg.split(" ").forEach(async (v) => {
            return await Chatfuel.sendImage(senderId, v)
        })
    } else {
        return Chatfuel.sendText(senderId, msg);
    }
}