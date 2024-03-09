const db = require("../database");


// function view_studproject(req, res) {
//     const pid = req.params.id;

//     db.query("SELECT * FROM marks WHERE p_id = ?", [pid], (err, marks) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send("Internal Server Error");
//         }

//         let stage = {};
//         let data1,data2,data3,data4;
//         let dt ={};

//         if (marks && marks[0]) {

//             stage = {
//                 grp_id: marks[0].group_id,
//                 name: marks[0].st_name,
//                 stage1: marks[0].file1,
//                 stage2: marks[0].file2,
//                 stage3: marks[0].file3,
//                 stage4: marks[0].file4,
//                 status1: marks[0].status1,
//                 status2: marks[0].status2,
//                 status3: marks[0].status3,
//                 status4: marks[0].status4,
//                 level1: marks[0].level1,
//                 level2: marks[0].level2,
//                 level3: marks[0].level3,
//                 level4: marks[0].level4

//             };
//         } else {
//             stage = "None";
//         }
//         db.query("SELECT * FROM comment WHERE group_id = ?", [stage.grp_id], (err, comment) => {
//             if (err) {
//                 console.log(err);
//             }

//             const comm = comment;
//             if(comm){
//                 comm.forEach(element => {
//                     console.log(element.level);
//                     if (element.level == 1) {
//                         data1 = element.description;
//                         console.log("this is", element.description);
//                     } else if (element.level == 2) {
//                         data2 = element.description;
//                         console.log("this is", element.description);

//                     } else if (element.level == 3) {
//                         data3 = element.description;
//                         console.log("this is", element.description);

//                     } else if (element.level == 4) {
//                         data4 = element.description;
//                         console.log("this is", element.description);

//                     }
//                 });
//                 console.log( "thisiddd",data1, data2, data3, data4);
//                  dt = {
//                     datac1: data1,
//                     datac2: data2,
//                     datac3: data3,
//                     datac4: data4
//                 }
//                 res.render('view_studproject', { userRole: req.session.user.role, pid, dt, stage });
//             }else{
//                 res.render('view_studproject', { userRole: req.session.user.role, pid, dt, data1, data2, data3, data4, stage });

//             }

//         });
//     });
// }
// function view_studproject(req, res) {
//     const pid = req.params.id;

//     // Query for project marks
//     db.query("SELECT * FROM marks WHERE p_id = ?", [pid], (err, marks) => {
//         if (err) {
//             console.error("Error fetching project marks:", err);
//             return res.status(500).send("Internal Server Error");
//         }

//         let stage = {};

//         // Populate stage object if marks exist
//         if (marks && marks.length > 0) {
//             const { group_id, st_name, file1, file2, file3, file4, status1, status2, status3, status4, level1, level2, level3, level4 } = marks[0];
//             stage = { group_id, name: st_name, stage1: file1, stage2: file2, stage3: file3, stage4: file4, status1, status2, status3, status4, level1, level2, level3, level4 };
//         } else {
//             stage = null; // No marks found
//         }

//         // Query for comments
//         db.query("SELECT * FROM comment WHERE group_id = ?", [stage ? stage.group_id : null], (err, comments) => {
//             if (err) {
//                 console.error("Error fetching comments:", err);
//                 return res.status(500).send("Internal Server Error");
//             }

//             const dt = {};

//             // Populate dt object with comments
//             comments.forEach(comment => {
//                 const { level, description } = comment;
//                 dt[`datac${level}`] = description;
//             });

//             // Render view with data
//             res.render('view_studproject', { userRole: req.session.user.role, pid, dt, stage });
//         });
//     });
// }
function view_studproject(req, res) {
    const pid = req.params.id;

    db.query("SELECT * FROM marks WHERE p_id = ?", [pid], (err, marks) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        let stage = {};
        let data1, data2, data3, data4;
        let dt = {};

        if (marks && marks[0]) {

            stage = {
                grp_id: marks[0].group_id,
                name: marks[0].st_name,
                stage1: marks[0].file1,
                stage2: marks[0].file2,
                stage3: marks[0].file3,
                stage4: marks[0].file4,
                status1: marks[0].status1,
                status2: marks[0].status2,
                status3: marks[0].status3,
                status4: marks[0].status4,
                level1: marks[0].level1,
                level2: marks[0].level2,
                level3: marks[0].level3,
                level4: marks[0].level4,
                t_id: marks[0].t_id

            };
        } else {
            stage = "None";
        }
        db.query("SELECT * FROM comment WHERE group_id = ?", [stage.grp_id], (err, comment) => {
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
                res.render('view_studproject', { userRole: req.session.user.role, pid, dt, stage });
            } else {
                res.render('view_studproject', { userRole: req.session.user.role, pid, dt, data1, data2, data3, data4, stage });

            }

        });
    });
}

















// function view_file(req, res) {
//     const pid = req.params.id;
//     const lvl = req.params.lvl;
//     // Add a new function to retrieve and render files

//     const file = "filecont" + lvl;



//     db.query("SELECT * FROM marks WHERE p_id = ?;", [pid], (err, result) => {
//         if (err) {
//             console.error(`Error fetching file for ${lvl}:`, err);
//             return res.status(500).send('Internal Server Error');
//         }
//         if (!result) {
//             console.error(`File not found for ${lvl}`);
//             return res.status(404).send('File Not Found');
//         }
//         // Assuming the file content is stored in the 'file_content' column
//         switch (lvl) {
//             case '1':
//                 fileContent = result[0].filecont1;
//                 // Render HBS template and pass file content as a variable
//                 res.render('fileView', { fileContent, userRole: req.session.user.role });
//                 break;
//             case '2':
//                 fileContent = result[0].filecont2;
//                 // Render HBS template and pass file content as a variable
//                 res.render('fileView', { fileContent, userRole: req.session.user.role });
//                 break;
//             case '3':
//                 fileContent = result[0].filecont3;
//                 // Render HBS template and pass file content as a variable
//                 res.render('fileView', { fileContent, userRole: req.session.user.role });
//                 break;
//             case '4':
//                 fileContent = result[0].filecont4;
//                 // Render HBS template and pass file content as a variable
//                 res.render('fileView', { fileContent, userRole: req.session.user.role });
//                 break;
//             default:
//                 task = 'Unknown Phase';
//         }
//         // const fileContent = result[0].filecont2;
//         // console.log("filenumber is",file);
//         // // console.log(result);
//         // console.log("datapart :",fileContent);

//         // // Render HBS template and pass file content as a variable
//         // res.render('fileView', { fileContent ,userRole: req.session.user.role});
//     });
// }
/////////////////////////////////////////////////////////
function view_file(req, res) {
    const pid = req.params.id;
    const lvl = req.params.lvl;

    const fileColumn = "filecont" + lvl;
    const file = "file" + lvl;

    db.query("SELECT * FROM marks WHERE p_id = ?;", [pid], (err, result) => {
        if (err) {
            console.error(`Error fetching file for level ${lvl}:`, err);
            return res.status(500).send('Internal Server Error');
        }

        if (!result || !result.length) {
            console.error(`File not found for level ${lvl}`);
            return res.status(404).send('File Not Found');
        }

        const fileContent = result[0][fileColumn];
        const filedata = result[0][file];
        if (!fileContent) {
            console.error(`File content not found for level ${lvl}`);
            return res.status(404).send('File Content Not Found');
        }

        // Extract the file extension
        const extension = getFileExtension(filedata);

        // Determine content type based on the file extension
        const isImage = determineContentType(extension);
        console.log(isImage);

        // Render HBS template and pass variables
        res.render('fileView', { fileContent, isImage, pid, userRole: req.session.user.role });
    });
}

// Function to extract file extension
function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

// Function to determine content type based on file extension
function determineContentType(extension) {
    return (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif');
}




// // Function to determine content type based on content
// function detectContentType(content) {
//     // Regular expressions to match common PDF and image file signatures
//     const pdfSignature = /^%PDF-/;
//     const imageSignature = /^(\xff\xd8\xff|GIF8|PNG\x89|BM|JFIF|IHDR)/;

//     // Check if the content matches PDF or image signature
//     if (pdfSignature.test(content)) {
//         return 'pdf';
//     } else if (imageSignature.test(content)) {
//         return 'image';
//     } else {
//         return 'unknown';
//     }
// }


// function update_status(req, res) {
//     const { phase, status, mark, comment } = req.body;
//     const pid = req.params.id;
//     console.log(phase, status, mark, pid);


//     if (phase == 'Study Phase') {
//         db.query("UPDATE marks SET status1 = ?, level1 = ? WHERE group_id=?", [status, mark, pid], (err) => {
//             if (err) {
//                 console.log(err);
//             }
//             db.query("UPDATE comment SET description = ? WHERE group_id = ? AND level= ?", [comment, pid, 1]);

//             res.redirect("/teacher");

//         })
//     } else if (phase == 'Design Phase') {
//         db.query("UPDATE marks SET status2 = ?, level2 = ? WHERE group_id=?", [status, mark, pid], (err) => {
//             if (err) {
//                 console.log(err);
//             }
//             db.query("UPDATE comment SET description = ? WHERE group_id = ? AND level= ?", [comment, pid, 2]);

//             res.redirect("/teacher");

//         })
//     } else if (phase == 'Developement Phase') {
//         db.query("UPDATE marks SET status3 = ?, level3 = ? WHERE group_id=?", [status, mark, pid], (err) => {
//             if (err) {
//                 console.log(err);
//             }
//             db.query("UPDATE comment SET description = ? WHERE group_id = ? AND level= ?", [comment, pid, 3]);

//             res.redirect("/teacher");

//         })
//     } else {
//         db.query("UPDATE marks SET status4 = ?, level4 = ? WHERE group_id=?", [status, mark, pid], (err) => {
//             if (err) {
//                 console.log(err);
//             }
//             db.query("UPDATE comment SET description = ? WHERE group_id = ? AND level= ?", [comment, pid, 4]);

//             res.redirect("/teacher");

//         })
//     }



// }
function update_status(req, res) {
    const { phase, status, mark, comment } = req.body;
    const gid = req.params.id;
    console.log("list of", phase, status, mark, gid);

    const updateMarksQuery = "UPDATE marks SET status? = ?, level? = ? WHERE group_id=?";
    const updateCommentQuery = "UPDATE comment SET description = ? WHERE group_id = ? AND level= ?";
    const gettotal = "SELECT * FROM `marks` WHERE group_id = ? ";

    db.query(gettotal, [gid], (err, getmarks) => {
        if (err) {
            console.log(err);
        }
        // Check if getmarks array is not empty
        if (getmarks.length > 0) {
            console.log("this orange:", getmarks);

            const m1 = parseInt(getmarks[0].level1) || 0;
            const m2 = parseInt(getmarks[0].level2) || 0;
            const m3 = parseInt(getmarks[0].level3) || 0;
            const m4 = parseInt(getmarks[0].level4) || 0;

            const totalmarks = m1 + m2 + m3 + m4;
            console.log("marks are m1:" + m1 + "    m2:" + m2 + "     m3:" + m3 + "    m4:" + m4);

            console.log("total marks:", totalmarks);
            db.query("UPDATE marks SET total = ? WHERE group_id=?", [totalmarks, gid]);
        }

    });
    let level;

    switch (phase) {
        case 'Study Phase':
            level = 1;
            break;
        case 'Design Phase':
            level = 2;
            break;
        case 'Development Phase':
            level = 3;
            break;
        case 'Test Phase':
            level = 4;
            break;
    }

    console.log("Level is:", level);

    db.query(updateMarksQuery, [level, status, level, mark, gid], (err) => {
        if (err) {
            console.log(err);
            res.redirect("/error-page");
            return;
        }

        db.query(gettotal, [gid], (err, getmarks) => {
            if (err) {
                console.log(err);
            }
            // Check if getmarks array is not empty
            if (getmarks.length > 0) {
                console.log("this orange:", getmarks);

                const m1 = parseInt(getmarks[0].level1) || 0;
                const m2 = parseInt(getmarks[0].level2) || 0;
                const m3 = parseInt(getmarks[0].level3) || 0;
                const m4 = parseInt(getmarks[0].level4) || 0;

                const totalmarks = m1 + m2 + m3 + m4;
                const stat1 = getmarks[0].status1;
                const stat2 = getmarks[0].status2;
                const stat3 = getmarks[0].status3;
                const stat4 = getmarks[0].status4;
                 if(stat1,stat2,stat3,stat4 == "Approved"){
                    const last_stat = "Completed";

                    db.query("UPDATE projects SET status = ? WHERE group_id=?",[last_stat,gid]);
                 }



        
                db.query("UPDATE marks SET total = ? WHERE group_id=?", [totalmarks, gid]);
            }

        });
        db.query(updateCommentQuery, [comment, gid, level], (err) => {
            if (err) {
                console.log(err);
                res.redirect("/error-page");
                return;
            }

            res.redirect("/teacher");
        });
    });
}


function view_mygroups(req, res) {
    const tid = req.params.id;

    db.query("SELECT * FROM `group` WHERE teacher_id = ?", [tid], (err, row) => {
        if (err) {
            console.log(err);
        }
        if (row) {
            console.log(row);
            res.render('view_mygroups', { userRole: req.session.user.role, tid, row });
        }
    });
}








module.exports = {
    view_studproject,
    view_file,
    update_status,
    view_mygroups
}