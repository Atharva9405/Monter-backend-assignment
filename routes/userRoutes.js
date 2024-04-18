const express = require('express');
const { registerUser, verifyUser, loginUser } = require('../controllers/UserController');
const router = express.Router();

router.get("/test",(req,res)=>{
    res.send("Hello World");
});

router.post("/register",registerUser);
router.put('/verify',verifyUser)
router.post('/login', loginUser)
module.exports = router;