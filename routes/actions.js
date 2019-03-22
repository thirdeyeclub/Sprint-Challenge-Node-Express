const express = require('express');
const routes = express.Router();
const Action = require('../data/helpers/actionModel');

routes.use(express.json());

routes.get('/actions', (req, res) => {
    Action.get()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: err})
    })
})

routes.get('./actions/:id',(req, res)=>{
    const{id} = req.params;
    Action.get(id).then(data =>{
        if(!data){
            res.status(404).json({
                message:"action with ID does not exist"
            })
        }else{res.status(200).json(data);
        }
    }).catch(error=>{
        res.status(500).json({
            error:"The action info could not be found, no find"
        })
    })
})

routes.post('/action', (req, res)=>{
    const{ notes, project_id, description} = req.body
    if(!notes || !project_id || !description){
        res.status(400).json({
            errorMessage: "Please add a description and notes"
        }).catch(error=>{
            res.status(500).json({
                error: "Error while adding action"
            });
        })
    }
})

routes.put('/action/:id',(req, res)=>{
    const {id} = req.params;
    const{notes, project_id, description} =req.body
    if(!notes || !project_id || !description){
        res.status(400).json({
            errorMessage:"Please add a description and notes"
        })
    } else{
        Action.update(id,req.body).then(data=>{
            if(data){
                res.status(202).json(data);
            }else{
                res.status(404).json({
                    message:"The Action with this ID no exist"
                });
            }
        }
        ).catch(error=>{
            res.status(500).json({
                error:"cannot update"
            });
        })
    }
})

routes.delete('/action/:id', (req, res)=>{
    const {id} = req.params;
    Action.get(id).then(data =>{
        if(!data){
            res.status(400).json({
                message: "No action with said ID exists"
            })
        } else{
            Action.remove(id).then(()=>{
                res.status(200).json(data)
            }).catch(error=>{
                res.status(500).json({
                    error: "Action couldnt be removed"
                });
            })
        }
    }
    )
})

module.exports = routes;