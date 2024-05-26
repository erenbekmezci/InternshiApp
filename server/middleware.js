const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDg0MzA2ODIsImV4cCI6MTcwODQzMDY5Mn0.3Xv4HynKEArrkqtSoeadkznyRdNcaI1ov_JCVLCJuMY

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Giris yapin." });
 


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json("Token geçerli değil");
    }
    req.user = user;
   

    next();
  });
};

module.exports = authMiddleware;
