var express = require('express');
var router = express.Router();
const db = require("../database");



//   router.get('/', function(req, res) {
//     if (req.session.user){
//       const userRole = req.session.user.role;

      
//       db.query("SELECT * FROM teacher;",(err,result)=>{
//         if (err) {
//           console.error("Database query error:", err);
//           return res.status(500).send("Internal Server Error");
//         }
//         else{
//             res.render('view_teacher',{ userRole,result });
//         }
//       });
  
//     }
// });
router.get('/', function(req, res) {
    

      
      db.query("SELECT * FROM teacher;",(err,result)=>{
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).send("Internal Server Error");
        }
        else{
            res.render('view_teacher',{ result ,userRole:req.session.user.role});
        }
      });
  
  
});

module.exports = router;