const router = require('express').Router()
const { getRecipes, postRecipe, getSingleRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipes')
const { getIngredients, postIngredient, getSingleIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredients')
const { getUsers, postUser, getSingleUser, updateUser, deleteUser } = require('../controllers/users')

router.get('/', (req, res) => {
    res.send('<h1> API /h1>')
})

router.get('/recipes', getRecipes)

router.post('/recipes', postRecipe)

router.get('/recipes/:id', getSingleRecipe)

router.put('/recipes/:id', updateRecipe)

router.delete('/recipes/:id', deleteRecipe)

router.get('/ingredients', getIngredients)

router.post('/ingredients', postIngredient)

router.get('/ingredients/:id', getSingleIngredient)

router.put('/ingredients/:id', updateIngredient)

router.delete('/ingredients/:id', deleteIngredient)

router.get('/users', getUsers)

router.post('/users', postUser)

router.get('/users/:id', getSingleUser)

router.put('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)

module.exports = router;