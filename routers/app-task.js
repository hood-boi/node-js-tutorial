const express = require('express');
const router = new express.Router();
const {User, Task} = require('../app-model.js').task_manager;

router.post('/tasks', (req,res) => {
        const task = new Task(req.body);

        task.save().then((result) => {
                res.send(result);
        }).catch((error) =>{
                res.status(404).send(error);
        });
})

router.get('/tasks', (req,res) => {
        Task.find({}).then((tasks) => {
                res.status(200).send(tasks)
        }).catch((error) => {
                res.status(400).send(error.message);
        })
})

router.get('/tasks/:id', (req,res) => {
        const id = req.params.id;
        Task.findById(id).then((task) => {
                if(!task){
                        return res.status(404).send("Error: `task` not found");
                }
                res.status(200).send(task);
        }).catch((error) => {
                res.status(400).send(error.message);
        })

})

router.patch('/task/:id', (req,res) => {
        const _id = req.params.id

        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update);
        })

        if(!isValidOperation){
                return res.status(400).send({error : "Invalid update keys"});
        }

        Task.findByIdAndUpdate( req.params.id,
                                req.body,
                                {new : true, runValidators: true}
        ).then((task) => {
                if(!task){
                        return res.status(404).send({"error" : "Task not found"});
                }
                res.send(task);
        }).catch((error) => {
                res.status(400).send({"error" : error.message});
        })

})

router.delete('/task/:id', (req,res) => {
        const _id = req.params.id


        Task.findByIdAndDelete(req.params.id).then((task) => {
                if(!task){
                        return res.status(404).send({"error" : "no such task to delete"});
                }
                res.send(task);
        }).catch((error) => {
                res.status(400).send({"error" : error.message});
        })
})

module.exports = router
