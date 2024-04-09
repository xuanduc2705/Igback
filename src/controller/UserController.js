import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "@/config/config.js";
const User = db.collection("User");
export const Register = async (req, res) => {
  const { email, nickname, password, avatar } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const userObject = {
    email: email,
    nickname: nickname,
    name: nickname,
    password: hashed,
  };

  if (avatar) {
    userObject.avatar = avatar;
  } else {
    userObject.avatar =
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
  }

  await User.add(userObject);
  res.send({ msg: "User add" });
};
export const getUser = async (req, res) => {
  const userlist = await User.get();
  const list = userlist.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const userlist = await User.get();
  const user_found = userlist.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const user = user_found.find((u) => u.email === email);
  if (!user) {
    res.send({ msg: "No user found" });
  } else {
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      res.send({ msg: "Wrong password" });
    } else {
      const accesstoken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1h" }
      );

      res.send({ user, accesstoken });
    }
  }
};
