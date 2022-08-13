const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization']?.split(" ");
    if (!authHeader) return res.status(401).json({ auth: false, message: 'No token provided.' });
    const token = authHeader[1];
    
    jwt.verify(token, process.env.CLIENT_SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}
module.exports = verifyJWT;