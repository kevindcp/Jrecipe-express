const { response } = require("express")

let Users = [{
    id: 1,
    username: "testuser1",
    password: "testpassword"  // plain text for test purposes only
}]

// only for initial test purposes
let id = 2

const getUsers = async (req, res) => {
    res.json(Users)
}

const postUser = async(req, res) => {
    try{
        const {body} = req
        const { username, password } = body

        const user = {
            id: id++,
            username,
            password,
        }
        Users.push(user)
        res.status(200).json(Users)
    }catch(e){
        res.status(400).json(e.message)
    }
}

const getSingleUser = async(req, res) =>{
    try{
        const id = Number(req.params.id)
        const user  = Users.find(user => user.id === id)
        res.status(200).json(user)
    } catch(e){
        res.status(400).json(e.message)
    }
}

const updateUser = async(req, res) => {
    try{
        const { password } = req.body
        const id = Number(req.params.id)
        Users = Users.map(user => {
            if (user.id === id){
                user = {...user, password} 
            }
            return user
        })
        res.status(200).json(users)
    } catch(e){
        res.status(400).json(e.message)
    }
}

const deleteUser = async(req, res) => {
    try {
        const id = Number(req.params.id)
        Users = Users.filter(user => user.id !== id)
        res.status(200).json(Users)
    } catch(e){
        res.status(400).json(e.message)
    }
}

module.exports = {
    getUsers, 
    postUser,
    getSingleUser,
    updateUser,
    deleteUser
}