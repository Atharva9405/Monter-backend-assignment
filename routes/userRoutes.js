const express = require('express');
const { registerUser } = require('../controllers/UserController');
const router = express.Router();

router.get("/test",(req,res)=>{
    res.send("Hello World");
});

router.post("/register",registerUser);

module.exports = router;