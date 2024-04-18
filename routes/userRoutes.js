const express = require('express');
const { registerUser, verifyUser, loginUser, getUserDetails } = require('../controllers/UserController');
const router = express.Router();

router.get("/test",(req,res)=>{
    res.send("Hello World");
});

router.post("/register",registerUser);
router.put('/verify',verifyUser)
router.post('/login', loginUser)
router.get('/get',getUserDetails)
module.exports = router;