import { db } from "@/config";

const Boxchat = db.collection("Boxchat");

async function addMessageToBoxchat(data) {
  const { boxchatid, content, id, avatar, time } = data;
  await Boxchat.doc(boxchatid).collection("message").add({
    content: content,
    id: id,
    avatar: avatar,
    time: time,
  });
}

export default addMessageToBoxchat;
