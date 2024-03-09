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

        let stage = {};
        if (marks && marks[0]) {
          stage = {
            stage1: marks[0].file1,
            stage2: marks[0].file2,
            stage3: marks[0].file3,
            stage4: marks[0].file4
          };
        } else {
          stage = "None";
        }

        res.render('student', { userEmail, userName, userRole, s_id, result2, grp_id, stage, message: req.flash('message') });
      });
    });
  });
});

module.exports = router;
