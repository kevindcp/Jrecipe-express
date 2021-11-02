const { response } = require("express")

let Recipes = [{
    id: 1,
    name: "Chicken Parmesan", 
    user: "testuser1",
}]

// only for initial test purposes
let id = 2

const getRecipes = async (req, res) => {
    res.json(Recipes)
}

const postRecipe = async(req, res) => {
    try{
        const {body} = req
        const { name, user } = body

        const recipe = {
            id: id++,
            name,
            user,
        }
        Recipes.push(recipe)
        res.status(200).json(Recipes)
    }catch(e){
        res.status(400).json(e.message)
    }
}

const getSingleRecipe = async(req, res) =>{
    try{
        const id = Number(req.params.id)
        const recipe  = Recipes.find(recipe => recipe.id === id)
        res.status(200).json(recipe)
    } catch(e){
        res.status(400).json(e.message)
    }
}

const updateRecipe = async(req, res) => {
    try{
        const { name } = req.body
        const id = Number(req.params.id)
        Recipes = Recipes.map(recipe => {
            if (recipe.id === id){
                recipe = {...recipe, name} 
            }
            return recipe
        })
        res.status(200).json(Recipes)
    } catch(e){
        res.status(400).json(e.message)
    }
}

const deleteRecipe = async(req, res) => {
    try {
        const id = Number(req.params.id)
        Recipes = Recipes.filter(recipe => recipe.id !== id)
        res.status(200).json(Recipes)
    } catch(e){
        res.status(400).json(e.message)
    }
}

module.exports = {
    getRecipes, 
    postRecipe,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe
}