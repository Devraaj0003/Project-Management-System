var express = require('express');
var router = express.Router();
const db = require("../../database"); // Import your database module


/* GET home page. */
router.get('/', function(req, res) {
  if (req.session.user){
    const userRole = req.session.user.role;
    db.query("SELECT * FROM projects;",(err,result)=>{
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      }
      else{
        res.render('admin',{ userRole,result });
      }
    })
  

    // res.render('admin',{ userRole});
  }else{
    res.redirect("/");
  }
});



module.exports = router;
