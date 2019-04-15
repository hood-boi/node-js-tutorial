const express = require('express');
const {User, Task} = require('../app-model.js').task_manager;
const router = new express.Router();

router.post('/users', (req,res) => {
        const user = new User(req.body)

        user.save().then((result)=>{
                res.status(200).send(result);
        }).catch((error)=> {
                res.status(404).send(error);
        })

})

router.get('/users', (req,res) => {
        User.find({}).then((users)=>{
                res.status(200).send(users);
        }).catch((error)=>{
                res.status(400).send(error.message);
        })

})

router.get('/users/:id', (req,res) => {
        const _id = req.params.id

        User.findById(_id).then((user)=>{
                if(!user){
                        return res.status(400).send("Error : No user found.")
                }
                res.status(200).send(user);
        }).catch((error)=>{
                res.status(400).send(error.message);
        })

})

router.patch('/user/:id', (req,res) => {
        const _id = req.params.id

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update);
        })

        if(!isValidOperation){
                return res.status(400).send({error : "Invalid update keys"});
        }

        User.findByIdAndUpdate( req.params.id,
                                req.body,
                                {new : true, runValidators: true}
        ).then((user) => {
                if(!user){
                        return res.status(404).send({"error" : "User not found"});
                }
                res.send(user);
        }).catch((error) => {
                res.status(400).send({"error" : error.message});
        })

})

router.delete('/user/:id', (req,res) => {
        const _id = req.params.id


        User.findByIdAndDelete(req.params.id).then((user) => {
                if(!user){
                        return res.status(404).send({"error" : "no such user to delete"});
                }
                res.send(user);
        }).catch((error) => {
                res.status(400).send({"error" : error.message});
        })
})

module.exports = router;
