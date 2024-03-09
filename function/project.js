const db = require("../database"); // Import your database module

function reg_project(req, res) {
  const formData = {
    project_type: req.body.project_type,
    project_year: req.body.project_year,
    strt_date: req.body.strt_date,
    end_date: req.body.end_date,

  };
  console.log(formData);
  const query = "SELECT * FROM `student` WHERE `s_year` = ?";
  db.query(
    query,
    [formData.project_year],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      }
      //Groupin of students and assigning to thegroup table
      if (formData.project_type === "Mini") {
        // Step 2: Shuffle the student data (optional)
        const shuffledStudents = shuffleArray(results);

        // Step 3: Iterate over shuffled student data and create groups of two
        const groups = [];
        for (let i = 0; i < shuffledStudents.length; i += 2) {
          const group = {
            student1_id: shuffledStudents[i].s_id,
            student1_name: shuffledStudents[i].s_name,
            student2_id: (i + 1 < shuffledStudents.length) ? shuffledStudents[i + 1].s_id : null,
            student2_name: (i + 1 < shuffledStudents.length) ? shuffledStudents[i + 1].s_name : null
          };
          groups.push(group);
        }

        // Step 4: Insert groups into the group table
        const insertQuery = 'INSERT INTO `group` (student1_id, student1_name, student2_id, student2_name) VALUES ?';
        db.query(insertQuery, [groups.map(group => [group.student1_id, group.student1_name, group.student2_id, group.student2_name])], (err, result) => {
          if (err) {
            console.error('Error inserting groups into group table:', err);
            return;
          }
          console.log('Groups inserted successfully as MINI');
        });
      }
      else {
        results.forEach((row) => {
          const studentName = row.s_name;
          const studentId = row.s_id;
          const insertQuery = 'INSERT INTO `group` (student1_id, student1_name) VALUES (?,?)';
          db.query(insertQuery, [studentId, studentName], (err, result) => {
            if (err) {
              console.error('Error inserting groups into group table:', err);
              return;
            }
            console.log('Groups inserted successfully as MAIN');
          });
        });
      }



      // Assigning teacher for the groups
      console.log(" started assign teachers to group");

      db.query('SELECT * FROM teacher', (err, teachersResults) => {
        if (err) {
          console.error('Error querying teachers table: ' + err.stack);
          return;
        }

        db.query('SELECT * FROM `group`', (err, groupsResults) => {
          if (err) {
            console.error('Error querying groups table: ' + err.stack);
            return;
          }

          // Step 2: Assign teachers to groups and update the groups table
          for (let i = 0; i < groupsResults.length; i++) {
            const group = groupsResults[i];
            const teacher = teachersResults[i % teachersResults.length]; // Assign teachers in a round-robin manner

            const groupId = group.group_id; // Assuming the group_id column name
            const teacherId = teacher.t_id; // Assuming the teacher_id column name
            const teacherName = teacher.t_name; // Assuming the teacher_name column name

            console.log(`Assigned teacher ${teacherName} (ID: ${teacherId}) to group ${groupId}`);

            // Update the teacher_id and teacher_name fields in the groups table
            db.query('UPDATE `group` SET `teacher_id` = ?, `teacher_name` = ? WHERE `group_id` = ?', [teacherId, teacherName, groupId], (err, updateResult) => {
              if (err) {
                console.error('Error updating groups table: ' + err.stack);
                return;
              }
              console.log(`Assigned teacher ${teacherName} (ID: ${teacherId}) to group ${groupId}`);
            });
          }


          //Retriving group id and setting to the project table
          console.log("Retriving group id and setting to the project table ");

          db.query(
            'SELECT * FROM `student` WHERE `s_year` = ?',
            [formData.project_year],
            (err, lresult) => {
              if (err) {
                console.error("Database query error:", err);
                return res.status(500).send("Internal Server Error");
              }
              lresult.forEach((row) => {
                const studentName = row.s_name;
                const studId = row.s_id;
                const id = Math.floor(0 + Math.random() * 100);

                const query2 = "SELECT * FROM `group` WHERE `student1_id` = ? OR `student2_id` = ?";

                db.query(query2, [studId, studId], (err, groupResults) => {
                  if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).send("Internal Server Error");
                  }

                  if (groupResults.length > 0) {
                    const groupId = groupResults[0].group_id;
                    const teacherName = groupResults[0].teacher_name;
                    const teacher_id = groupResults[0].teacher_id;

                    console.log(` teacher ${teacherName} to group ${groupId}`);

                    const query1 = "INSERT INTO `projects`(`group_id`, `project_name`, `project_detail`, `s_id`, `student_name`, `teacher_id`, `teacher_name`, `year`, `type`, `start_date`, `end_date`, `status`) VALUES ( ?, NULL, NULL,?, ?, ?, ?, ?, ?, ?, ?, NULL)";

                    db.query(query1, [groupId, studId, studentName, teacher_id, teacherName, formData.project_year, formData.project_type, formData.strt_date, formData.end_date], (err, projectResult) => {
                      if (err) {
                        console.error("Database query error:", err);
                        return res.status(500).send("Internal Server Error");
                      } else {
                        console.log("Successfully added");
                        req.flash('message', 'Saved Successfully');
                      }
                      // Adding team table
                      const query3 = "INSERT INTO `marks`(`p_id`, `group_id`, `st_name`,`t_id` ,`file1`,`filecont1`,`file2`,`filecont2`,`file3`,`filecont3`,`file4`,`filecont4`,`level1`, `level2`, `level3`, `level4`, `status1`, `status2`, `status3`, `status4`, `total`, `year`) VALUES (?, ?, ?,NUll, NULL,NULL,NULL,NULL,NULL, NUll, NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,?) ";
                      db.query(query3, [id, groupId, studentName, formData.project_year], (err) => {
                        if (err) {
                          console.error("Database query error:", err);
                          return res.status(500).send("Internal Server Error");
                        }
                        

                        console.log("Successfully added to marks table");

                        const query6 = "SELECT * FROM `projects` WHERE `group_id` = ? AND `student_name`= ?;";
                        db.query(query6, [groupId, studentName], (err, result) => {
                          if (err) {
                            console.error("Database query error:", err);
                            return res.status(500).send("Internal Server Error");
                          } else {
                          
                            const pid = result[0].p_id;
                            const t_id =result[0].teacher_id;
                            const query5 = "UPDATE `marks` SET `p_id`= ?,`t_id`= ? WHERE `group_id`= ? AND `st_name` = ?;"
                            db.query(query5, [pid, t_id, groupId, studentName]);
                          }

                        })

                      });
                      const query4 = "UPDATE `student` SET `g_id`= ? WHERE s_name = ?;";
                      db.query(query4, [groupId, studentName]);




                    });

                  } else {
                    console.log(`No group found for student with ID ${studId}`);
                  }
                });
              });
            });




        });
      });

      req.flash('message', 'Saved Successfully');
      res.redirect("/admin/new_project");
    }
  );
}


// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = {
  reg_project
};
