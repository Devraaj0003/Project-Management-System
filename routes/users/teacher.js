var express = require('express');
var router = express.Router();
const db = require("../../database");

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    const userEmail = req.session.user.email;
    const userName = req.session.user.name;
    const userRole = req.session.user.role;

    db.query("SELECT `p_id`, `group_id`, `project_name`, `project_detail`,`s_id`, `student_name`,`teacher_id`, `teacher_name`, `year`, `type`, DATE_FORMAT(`start_date`, '%d-%m-%y') AS start_date, DATE_FORMAT(`end_date`, '%d-%m-%y') AS end_date, `status` FROM projects WHERE teacher_name = ?;", [ userName ], (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      const t_id = result[0].teacher_id;
      if(result[0]){
        console.log(result[0].p_id);
        res.render('teacher', { userEmail, userName, userRole, result, t_id });
      }else{
        const noresult = "NO PROJECT ASSIGNED";
        res.render('teacher', { userEmail, userName, userRole, noresult, t_id });
        
      }
    

    })

    // res.render('teacher', { userEmail, userName, userRole });
  } else {
    res.redirect("/");
  }

});

module.exports = router;
