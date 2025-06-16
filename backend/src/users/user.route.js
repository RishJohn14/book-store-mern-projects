const express = require('express');
const User = require('./user.model');
const  jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post('/admin',async (req, res) => {
    const { username, password } = req.body;
    try {
       const admin = await User.findOne({ username });
       if (!admin) {
           return res.status(404).json({ message: 'Admin not found' });
       }
       

       if( password !== admin.password) {

           return res.status(401).json({ message: 'Invalid password. There should be a match between'+ password+ ' and '+ admin.password });
       }

       console.log("Password matched successfully");
       
       const token = jwt.sign(
           { id: admin._id, username: admin.username, role: admin.role },
           JWT_SECRET,
           { expiresIn: '1h' }
       );
       console.log("Token generated successfully");
       return res.status(200).json({ 
        token: token, 
        message: 'Admin logged in successfully',
        user: {
            username: admin.username,
            role: admin.role
        }
       });

        
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(401).json({ message: 'Failed to login' }); 
    }
    
});



module.exports = router;