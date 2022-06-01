const express = require('express')
const router = express.Router()
const Joi = require('joi')

const Todo = require('./../models/todo.model')
const todoSchema = require('./../validation/todoValidator')

router.post('/', async (req, res) => {

    const result = todoSchema.validate(req.body)
    if (result.error) return res.send(result.error.details[0].message)

    try {
        await Todo.create({
            ...req.body
        })
        res.json({ status: 'ok' })
    }
    catch (err) {
        console.log("err", err);
        res.json({ status: 'error', error: 'todo cannot created' })
    }
})

router.get('/:email', async (req, res) => {
    const emails = req.params.email
    try {
        const note = await Todo.find({ userid: emails }).sort({ createdAt: 1 });
        return res.status(201).send(note);
    }
    catch (error) {
        res.json({ status: 'error', error: 'cannot found' })
    }
})


router.get('/complete/:email', async (req, res) => {
    const emails = req.params.email
    try {
        const note = await Todo.find({ userid: emails, isCompleted: false });
        return res.status(201).send(note);
    }
    catch (error) {
        res.json({ status: 'error', error: 'cannot found' })
    }
})

//able to highlight todays tasks
router.post('/date/:email', async (req, res) => {
    const email = req.params.email
    // const date = req.body.date
    try {
        const todo = await Todo.find({ userid: email, createdAt: { $gt: "2022-05-31", $lte: "2022-06-01" } })
        return res.status(201).send(todo);
    }
    catch (error) {
        res.json({ status: 'error', error: 'cannot sort todo' })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const todo = await Todo.findOneAndDelete({ _id: id })
        res.send('successfully deleted')
    }
    catch (error) {
        res.json({ status: 'error', error: 'cannot delete todo' })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, update, { new: true });
        res.status(201).send(updatedTodo)
    }
    catch (error) {
        res.json({ status: 'error', error: 'cannot update todo' })
    }
})

module.exports = router;