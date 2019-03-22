const express = require('express');
const routes = express.Router();
const Project = require('../data/helpers/projectModel');

routes.use(express.json());

routes.get('/', (req, res) => {
    Project.get()
    .then(data => {
    res.status(200).json(data);
    })
    .catch(err => {
    res.status(500).json({ errorMessage: error })
    })
})

routes.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    Project.get(id)
    .then(data => {
        if (!data) {
        res.status(404).json({ 
            message: "The Project with ID no exist." 
        })
        } else {
        res.status(200).json(data);
        }
    })
    .catch(err => {
        res.status(500).json({
        error: "The Project info could not be found."
        })
    })
})

routes.post('/projects/', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
    res.status(400).json({ 
        errorMessage: "no name or description for the project."
    })
    } else {
    Project.insert(req.body)
        .then(data => {
        res.status(201).json({ ...data, name, description });
        })
        .catch(err => {
        res.status(500).json({
            error: "error"
        })
        })
    }
})

routes.put('/projects/:id', (req, res)=>{
    const {id}=req.params;
    const {name, description}= req.body;
    if(!name || !description){
        res.status(400).json({
            errorMessage: "no name or description for project"
        });
    }else{
        Project.update(id, req.body).then(data=>{
            if(data){
                res.status(202).json(data);
            }else{
                res.status(404).json({
                    message: "error message"
                })
            }
        }).catch(error =>{
            res.status(500).json({error:"error"});
        })
    }
})

routes.delete("/projects/:id", async (req, res) => {
    const actions = await Projects.getProjectActions(req.params.id)
    await actions.forEach( async (action) => {
    await Actions.remove(action.id)
    });
    Projects.remove(req.params.id)
    .then( data => {
    if(!data){
        res.status(404).json({message: "does not exist"})
    }else {
        res.status(202).json({message: "message", id: req.params.id})
    }
    })
    .catch( err => {
    res.status(500).json({message: "error", error: err})
    })
})

module.exports = routes;