import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth, isAdmin } from '../utils.js';

const userRouter = express.Router();

/*
    Things to add:
        - Delete by ID, use isAdmin middleware, don't let admins delete admins
        - Make admin, use put to allow admins (isAdmin middleware) to set others as admins
        - Add more admin functionality to edit (put) different user attributes
*/

userRouter.delete('/removeAll', expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    res.send({message:"All users have been deleted"});
}))

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.get('/list/:id', isAuth, expressAsyncHandler(async (req, res) => {
    //Authorizes user, then checks if user is admin, if so user is allowed to see info
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).send({message: 'Error, list request user not found'});
    } else if (!user.isAdmin) {
        res.status(404).send({message: 'Error, user requesting list is not admin'})
    } else {
        const users = await User.find({});
        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).send({message: 'Error, no users in DB'});
        }
    }
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            })
            return;
        }
    }
    res.status(401).send({message: 'Invalid user email or password'});
    })
);

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({name: req.body.name, email: req.body.email, 
    password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user);
    } else {
        res.status(404).send({message: 'User Not Found'});
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));

export default userRouter;