const {Todo} = require("../models/index")

class TodoController{
    static async getTodos (req, res, next){
        try {
            const todos = await Todo.findAll({
                where:{
                    UserId: req.loginUser.id
                }
            })
            //use where
            res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static addTodo(req, res, next){
        // console.log(req.body)
        
        // res.status(201).json({message: 'masuk create movie'})
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loginUser.id
        }
        Todo.create(obj)
        .then(data=>{
            // console.log(data)
            // console.log(req.loginUser)
            res.status(201).json(data)
        })
        .catch(e=>{
            next(e)
            // if (e.name === 'SequelizeValidationError'){ 
            //     res.status(400).json({message: `${e.message}`})
            // } else {
            //     res.status(500).json({message: `internal server error`})
            // }
        })
    }
    
    static filterId(req, res, next){
        const id = req.params.id
        Todo.findByPk(id)
        .then(data=>{
            if(!data){
                res.status(404).json({message: `data not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(e=>{
            next(e)
        })
    }

    static putTodos(req, res, next){
        const id = req.params.id
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        console.log(obj)
        Todo.update(obj, {
            where:{
                id
            },
            returning: true
        })
        .then(data=>{
            if(!data){
                res.status(404).json({message: 'data not found'})
            } else {
                res.status(200).json(data[1][0])
            }
        })
        .catch(e=>{
            next(e)
        })
    }

    static editStatusTodo(req, res, next){
        const id = req.params.id
        const obj = {
            status: req.body.status
        }
        Todo.update(obj, {
            where:{
                id
            },
            returning: true
        })
        .then(data=>{
            if(!data){
                res.status(404).json({message: 'data not found'})
            } else {
                res.status(200).json(data[1][0])
            }
        })
        .catch(e=>{
            next(e)
        })
    }

    static deleteId(req, res, next){
        const id = req.params.id
        Todo.destroy({
            where:{
                id
            }
        })
        .then(data=>{
            if(!data){
                res.status(404).json({message: 'data not found'})
            } else {
                res.status(200).json({message: `todo success to delete`})
            }
        })
        .catch(e=>{
            next(e)
        })
    }
}

module.exports = TodoController