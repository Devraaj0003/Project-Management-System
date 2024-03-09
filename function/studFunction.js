const db = require("../database");
// const zlib = require('zlib');
const multer = require('multer');

function edit_myproject(req, res) {
    const pid = req.params.id;
    console.log("pid recieved from the my project edit", pid)


    db.query("SELECT * FROM projects WHERE `p_id` = ?", [pid], (err, rows) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {

            res.render('edit_myproject', { userRole: req.session.user.role, rows })

        }
    })

}

function update_myproject(req, res) {
    const { project_name, description } = req.body;
    console.log('descritp', description);
    const id = req.params.id;


    db.query("UPDATE `projects` SET `project_name`= ?,`project_detail` = ?,`status` = 'started' WHERE `group_id` = ?", [project_name, description, id], (err) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/student");
            console.log("The updated student from table:", id);
        }
    })
}


// function add_file(req, res) {
//     const grp_id = req.params.id;
//     const lvl = req.params.lvl;
//     console.log("Group is", grp_id);
//     let uploaded;

//     console.log("Level is", lvl);

//     if (lvl == 'file1') {
//         var task = 'Study Phase';
//         db.query("SELECT * FROM `marks` WHERE group_id = ?;", [grp_id], (err, result) => {
//             if (result[0]) {
//                 uploaded = result[0].file1;
//             } else {
//                 uploaded = "NO Uploads !";
//             }
//             if (err) {
//                 console.log(err);
//             }
//         });
//     } else if (lvl == 'file2') {
//         var task = 'Design Phase';
//         db.query("SELECT * FROM `marks` WHERE group_id = ?;", [grp_id], (err, result) => {
//             if (result[0]) {
//                 uploaded = result[0].file2;
//             } else {
//                 uploaded = "NO Uploads !";
//             }
//             if (err) {
//                 console.log(err);
//             }
//         });
//     } else if (lvl == 'file3') {
//         var task = 'Development Phase';
//         db.query("SELECT * FROM `marks` WHERE group_id = ?;", [grp_id], (err, result) => {
//             if (result[0]) {
//                 uploaded = result[0].file3;
//             } else {
//                 uploaded = "NO Uploads !";
//             }
//             if (err) {
//                 console.log(err);
//             }
//         });
//     } else {
//         var task = 'Test Phase';
//         db.query("SELECT * FROM `marks` WHERE group_id = ?;", [grp_id], (err, result) => {
//             if (result[0]) {
//                 uploaded = result[0].file4;
//             } else {
//                 uploaded = "NO Uploads !";
//             }
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }




//     db.query("SELECT * FROM `comment` WHERE group_id = ? AND level =?", [grp_id, lvl], (err, result) => {
//         if (result[0]) {
//             const descp = result[0].description; // Assuming you want the first row's description

//             res.render("upload", { userRole: req.session.user.role, descp, lvl, grp_id, task, uploaded });
//         }
//         else {
//             res.render("upload", { userRole: req.session.user.role, lvl, grp_id, task, uploaded });
//         }
//         if (err) {
//             console.log(err);
//         }
//     })




// }
function add_file(req, res) {
    const grp_id = req.params.id;
    const lvl = req.params.lvl;
    console.log("Group is", grp_id);

    let uploaded;
    console.log("Level is", lvl);

    let task;

    switch (lvl) {
        case '1':
            task = 'Study Phase';
            break;
        case '2':
            task = 'Design Phase';
            break;
        case '3':
            task = 'Development Phase';
            break;
        case '4':
            task = 'Test Phase';
            break;
        default:
            task = 'Unknown Phase';
    }

    // Fetch uploaded file from marks table
    const marksQuery = "SELECT * FROM `marks` WHERE group_id = ?;";
    db.query(marksQuery, [grp_id], (err, result) => {
        if (err) {
            console.log(err);

        } else {
           if(lvl == 1){
            uploaded = result[0].status1;
           }else if(lvl == 2){
            uploaded = result[0].status2;

           }else if(lvl ==3){
            uploaded = result[0].status3;

           }else{
            uploaded = result[0].status4;

           }
            
        }

        // Fetch comment from comment table
        const commentQuery = "SELECT * FROM `comment` WHERE group_id = ? AND level =?";
        db.query(commentQuery, [grp_id, lvl], (err, result) => {
            if (err) {
                console.log(err);
                res.render("upload", { userRole: req.session.user.role, lvl, grp_id, task, uploaded });
            } else {
                const descp = result[0] ? result[0].description : null;

                res.render("upload", { userRole: req.session.user.role, descp, lvl, grp_id, task, uploaded });
            }
        });
    });
}








// function upload(req, res) {
//     const grp_id = req.params.id;
//     const lvl = req.params.lvl;
//     const file = req.file;

//     // Check if file exists
//     if (!file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     console.log("Group is", grp_id);
//     console.log("Level is", lvl);
//     console.log("Data is", file);

//     // Compress the file buffer using zlib
//     zlib.deflate(file.buffer, (err, compressedBuffer) => {
//         if (err) {
//             console.error('Error compressing file buffer:', err);
//             return res.status(500).send('Internal Server Error');
//         }

//         // Fetch teacher_id from the group
//         db.query("SELECT `teacher_id` FROM `group` WHERE `group_id` = ?;", [grp_id], (err, result) => {
//             if (err) {
//                 console.error("Error fetching teacher_id:", err);
//                 return res.status(500).send('Internal Server Error');
//             }

//             const teach_id = result[0].teacher_id;

//             // Insert a comment
//             db.query("INSERT INTO `comment` (`group_id`, `t_id`, `description`, `level`) VALUES (?, ?, NULL, ?);", [grp_id, teach_id, lvl], (err) => {
//                 if (err) {
//                     console.error("Error inserting comment:", err);
//                     return res.status(500).send('Internal Server Error');
//                 }

//                 // Update marks based on the file level
//                 const updateQuery = `UPDATE \`marks\` SET ${lvl} = ?, filecont${lvl.slice(4)} = ? WHERE \`group_id\` = ?;`;

//                 db.query(updateQuery, [file.originalname, compressedBuffer, grp_id], (err) => {
//                     if (err) {
//                         console.error(`Error updating marks for ${lvl}:`, err);
//                         return res.status(500).send('Internal Server Error');
//                     }

//                     req.flash('message', 'Saved Successfully');
//                     res.redirect('/student');
//                 });
//             });
//         });
//     });
// }


// Set up multer for file uploads
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function upload(req, res) {
    const grp_id = req.params.id;
    const lvl = req.params.lvl;
    const file = req.file;
    const filename = req.file.originalname;
    const data = req.file.buffer.toString('base64');

    // Check if file exists
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log("Group is", grp_id);
    console.log("Level is", lvl);
    console.log("Data is", file);
    console.log("Data is", filename);



    // Fetch teacher_id from the group
    db.query("SELECT `teacher_id` FROM `group` WHERE `group_id` = ?;", [grp_id], (err, result) => {
        if (err) {
            console.error("Error fetching teacher_id:", err);
            return res.status(500).send('Internal Server Error');
        }

        const teach_id = result[0].teacher_id;

        // Insert a comment
        db.query("INSERT INTO `comment` (`group_id`, `t_id`, `description`, `level`) VALUES (?, ?, NULL, ?);", [grp_id, teach_id, lvl], (err) => {
            if (err) {
                console.error("Error inserting comment:", err);
                return res.status(500).send('Internal Server Error');
            }

            // Update marks based on the file level
            const fileno = 'file' + lvl;
            const filecont = 'filecont' + lvl;
            console.log(fileno, filecont);

            const updateQuery = `UPDATE marks SET ${fileno} = ?, ${filecont} = ? WHERE group_id = ?;`;

            db.query(updateQuery, [filename, data, grp_id], (err) => {
                if (err) {
                    console.error(`Error updating marks for ${lvl}:`, err);
                    return res.status(500).send('Internal Server Error');
                }

                req.flash('message', 'Saved Successfully');
                res.redirect('/student');
            });
        });
    });
}





function post_comment(req, res) {
    const grp_id = req.params.id;
    const lvl = req.params.lvl;
    const comment = req.body.comment;

    db.query("UPDATE `comment` SET `description`=? WHERE group_id =? AND level = ? ", [comment, grp_id, lvl], (err) => {
        if (err) {
            console.error("Error updating comment:", err);
            return res.status(500).send("Internal Server Error");
        }

        // Fetch updated description
        db.query("SELECT `description` FROM `comment` WHERE group_id = ? AND level =?", [grp_id, lvl], (err, result) => {
            if (err) {
                console.error("Error fetching updated comment:", err);
                return res.status(500).send("Internal Server Error");
            }

            const descp = result[0].description;

            req.flash('message', 'Saved Successfully');
            res.render("upload", { userRole: req.session.user.role, descp, lvl, grp_id, message: req.flash('message') });
        });
    });
}















// function upload(req, res) {
//     let sampleFile;
//     let uploadFile;

//     const grp_id = req.params.id;
//     const lvl = req.params.lvl;
//     const file = req.file;

//     // // Check if file exists
//     // if (!file) {
//     //     return res.status(400).send('No file uploaded.');
//     // }

//     sampleFile = req.body.file.upload;
//     uploadFile = __dirname + '../public/images/' + sampleFile.name;

//     console.log(sampleFile);
//     sampleFile.mv(uploadPath, function (err) {
//         if (err) returnres.status(500).send(err);
//     });



//     // Fetch teacher_id from the group
//     db.query("SELECT `teacher_id` FROM `group` WHERE `group_id` = ?;", [grp_id], (err, result) => {
//         if (err) {
//             console.error("Error fetching teacher_id:", err);
//             return res.status(500).send('Internal Server Error');
//         }

//         const teach_id = result[0].teacher_id;

//         // Insert a comment
//         db.query("INSERT INTO `comment` (`group_id`, `t_id`, `description`, `level`) VALUES (?, ?, NULL, ?);", [grp_id, teach_id, lvl], (err) => {
//             if (err) {
//                 console.error("Error inserting comment:", err);
//                 return res.status(500).send('Internal Server Error');
//             }

//             // Update marks based on the file level
//             const fileno = 'file' + lvl;
//             const filecont = 'filecont' + lvl;
//             console.log(fileno, filecont);

//             const updateQuery = `UPDATE marks SET ${fileno} = ?, ${filecont} = ? WHERE group_id = ?;`;

//             db.query(updateQuery, [sampleFile.name, fileno, grp_id], (err) => {
//                 if (err) {
//                     console.error(`Error updating marks for ${lvl}:`, err);
//                     return res.status(500).send('Internal Server Error');
//                 }

//                 req.flash('message', 'Saved Successfully');
//                 res.redirect('/student');
//             });
//         });
//     });
// }




module.exports = {
    edit_myproject,
    update_myproject,
    add_file,
    upload,
    post_comment
}

