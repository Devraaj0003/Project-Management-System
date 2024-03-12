const express = require('express');
const router = express.Router();
const db = require("../../database");

router.get('/', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }

  const userEmail = req.session.user.email;
  const userName = req.session.user.name;
  const userRole = req.session.user.role;
  let dt = {} ;
  let data1, data2, data3, data4;

  // Fetch student information
  db.query("SELECT * FROM `student` WHERE `s_email` = ? AND `s_name` = ?", [userEmail, userName], (err, result1) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    const s_id = result1[0].s_id;

    // Fetch project information
    db.query("SELECT `p_id`, `group_id`, `project_name`, `project_detail`,`s_id`, `student_name`, `teacher_name`, `year`, `type`, DATE_FORMAT(`start_date`, '%d-%m-%y') AS start_date, DATE_FORMAT(`end_date`, '%d-%m-%y') AS end_date, `status` FROM projects WHERE `s_id` = ?", [s_id], (err, result2) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      }

      const grp_id = result2[0].group_id;
     

      // Fetch marks information
      db.query("SELECT * FROM marks WHERE group_id = ?", [grp_id], (err, marks) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }

        db.query("SELECT * FROM comment WHERE group_id = ?", [grp_id], (err, comment) => {
          if (err) {
            console.log(err);
          }
          

          const comm = comment;
          if (comm) {
            comm.forEach(element => {
              console.log(element.level);
              if (element.level == 1) {
                data1 = element.description;
                console.log("this is", element.description);
              } else if (element.level == 2) {
                data2 = element.description;
                console.log("this is", element.description);
              } else if (element.level == 3) {
                data3 = element.description;
                console.log("this is", element.description);
              } else if (element.level == 4) {
                data4 = element.description;
                console.log("this is", element.description);
              }
            });
            console.log("thisiddd", data1, data2, data3, data4);
            dt = {
              datac1: data1,
              datac2: data2,
              datac3: data3,
              datac4: data4
            }
          }
        
        let stage = {};
        if (marks[0]) {
          stage = {
            stage1: marks[0].file1,
            stage2: marks[0].file2,
            stage3: marks[0].file3,
            stage4: marks[0].file4,
            status1: marks[0].status1,
            status2: marks[0].status2,
            status3: marks[0].status3,
            status4: marks[0].status4
          };
        } else {
          stage = "None";
        }
        console.log("comented data:", dt);
        console.log("On data:", data1);

        res.render('student', { userEmail, userName, userRole, s_id, result2, grp_id, stage, dt, message: req.flash('message') });
      });
    });
    });
  });
});

module.exports = router;
