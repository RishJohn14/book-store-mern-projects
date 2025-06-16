const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {

 

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided' });
    }
 

    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) {
            console.log("JWT verification error:", err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

  
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        

        req.user = user; // Attach user info to request
        next();
    });
    
}


module.exports = verifyAdminToken;



