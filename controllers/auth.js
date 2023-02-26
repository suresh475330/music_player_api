const admin = require("../config/firebase-config");
const Users = require("../models/users");

const admins = {
    email: "suresh475330@gmail.com"
}

const createNewUser = async (decodeValue, req, res) => {

    const newUser = new Users({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        email_verfied: decodeValue.email_verified,
        role: decodeValue.email === admins.email ? "admin" : "member",
        auth_time: decodeValue.auth_time,
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).send({ user: savedUser });
    } catch (err) {
        res.status(400).send({ msg: err });
    }

}

const updateUser = async (decodeValue, req, res) => {

    const filter = { email : decodeValue.email };
    const update = { auth_time: decodeValue.auth_time };
    const options = { new: true };

    try {
        const result = await Users.findOneAndUpdate(filter, update, options);
        res.status(200).send({ user: result });
    } catch (err) {
        res.status(400).send({ success: false, msg: err });
    }
}


const login = async (req, res) => {

    // check if authorization token is not there in headers
    if (!req.headers.authorization) {
        return res.status(500).send({ message: "Invalid Token" });
    }
    const token = req.headers.authorization.split(" ")[1];

    try {

        // DecodeValue the user information in the token 
        const decodeValue = await admin.auth().verifyIdToken(token);

        // Check if not token is there
        if (!decodeValue) {
            return res.status(500).json({ message: "Un Authorize" });
        }

        // Check the user is already exists or not in mongodb
        const userExists = await Users.findOne({ email : decodeValue.email });

        if (!userExists) {
            console.log("create new user");
            // If user in not there create new user
            createNewUser(decodeValue, req, res);
        } else {
            console.log("update user");
            // If user already in there update user
            updateUser(decodeValue, req, res);
        }


    } catch (error) {
        return res.status(404).json({ msg: error });
    }
}


const getAllUser = async (req, res) => {

    try {
        const users = await Users.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ msg: error });
    }

}


const deleteUser = async (req, res) => {
    const { id : userId } = req.params;

    const user = await Users.findByIdAndRemove({ _id: userId,})

    if (!user) {
        return res.status(404).json({ msg: `No user with id : ${userId}` })
    }

    res.status(200).send("deleted succes")
}



module.exports = { login, getAllUser,deleteUser };
