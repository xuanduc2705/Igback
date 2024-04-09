import { db } from "@/config";

const Boxchat = db.collection("Boxchat");

export const getBoxchat = async (req, res) => {
  const boxlist = await Boxchat.get();
  const list = boxlist.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
};
export const addBoxchat = async (req, res) => {
  const { host, partner, isg, avatar1, avatar2, groupname } = req.body;
  let boxchat;
  const boxlist = await Boxchat.get();
  const box_found = boxlist.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (isg == true) {
    const existingBoxchat = box_found.find(
      (u) => u.member == partner && u.host == host && u.groupname == groupname
    );
    if (existingBoxchat) {
      res.send({ msg: "boxchat already exist" });
    }
    boxchat = {
      isGroupchat: isg,
      host,
      member: partner,
      groupava: "",
      msgg: [],
      groupname: groupname,
    };
  } else {
    const existingBoxchat1 = box_found.find(
      (u) => u.member == partner && host == host
    );
    const existingBoxchat2 = box_found.find(
      (u) => u.member == host && host == partner
    );
    if (existingBoxchat1 || existingBoxchat2) {
      res.send({ error: "Already has" });
    }
    boxchat = {
      isGroupchat: isg,
      host,
      member: partner,
      avatar1: avatar1,
      avatar2: avatar2,
      msgg: [],
    };
  }
  await Boxchat.add(boxchat);
  res.send({ msg: "Boxchat add" });
};
