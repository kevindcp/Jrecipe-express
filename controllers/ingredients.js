const { response } = require("express")

let Ingredients = [{
    id: 1,
    name: "Chicken", 
}]

// only for initial test purposes
let id = 2

const getIngredients = async (req, res) => {
    res.json(Ingredients)
}

const postIngredient = async(req, res) => {
    try{
        const { body } = req
        const { name } = body

        const ingredient = {
            id: id++,
            name,
        }
        Ingredients.push(ingredient)
        res.status(200).json(Ingredients)
    }catch(e){
        res.status(400).json(e.message)
    }
}

const getSingleIngredient = async(req, res) =>{
    try{
        const id = Number(req.params.id)
        const ingredient  = Ingredients.find(ingredient => ingredient.id === id)
        res.status(200).json(ingredient)
    } catch(e){
        res.status(400).json(e.message)
    }
}

const updateIngredient = async(req, res) => {
    try{
        const { name } = req.body
        const id = Number(req.params.id)
        Ingredients = Ingredients.map(ingredient => {
            if (ingredient.id === id){
                ingredient = {...ingredient, name} 
            }
            return ingredient
        })
        res.status(200).json(Ingredients)
    } catch(e){
        res.status(400).json(e.message)
    }
}

const deleteIngredient = async(req, res) => {
    try {
        const id = Number(req.params.id)
        ingredients = Ingredients.filter(ingredient => ingredient.id !== id)
        res.status(200).json(Ingredients)
    } catch(e){
        res.status(400).json(e.message)
    }
}

module.exports = {
    getIngredients, 
    postIngredient,
    getSingleIngredient,
    updateIngredient,
    deleteIngredient
}