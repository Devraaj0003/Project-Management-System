const db = require("../database"); // Import your database module
//view Teachers
function view_teacher(req, res) {
    const search = req.query.search;

    const query = search
        ? "SELECT * FROM teacher WHERE t_name =?;"
        : "SELECT * FROM teacher;";

    const queryParams = search ? [search] : [];

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.render('view_teacher', { result, userRole: req.session.user.role });
        console.log("viewing teachers from adminfunction");
    });
};


//Editing Teacher
function edit_teacher(req, res) {
    const id = req.params.id;
   

    db.query("SELECT * FROM `teacher` WHERE `t_id` = ?;",[id],(err, rows)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            console.log(rows);
            res.render('edit_teacher', { userRole: req.session.user.role, rows });
            console.log("The data from the teacher table:",id);    
            }
    })
}


//Updating Teacher 
function update_teacher(req, res) {
    const { name, email, password, phone } = req.body;
    const id = req.params.id;
   

    db.query("UPDATE `teacher` SET `t_name`=?,`t_email`= ?,`t_password`= ?,`t_phone` = ? WHERE `t_id` = ?",[ name, email, password, phone , id],(err)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/admin/view_teacher");
            console.log("The updated teacher from table:",id);    
            }
    })
}

//Deleting Teacher
function delete_teacher(req, res) {
    const id = req.params.id;
   

    db.query("DELETE FROM `teacher` WHERE `t_id` = ?",[id],(err)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/admin/view_teacher");
            console.log("The deleted teacher from table:",id);    
            }
    })
}


//Viewing Student
function view_student(req, res) {
    const search = req.query.search;

    const query = search
        ? "SELECT * FROM student WHERE s_name = ?"
        : "SELECT * FROM student";

    const queryParams = search ? [search] : [];

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.render('view_student', { result, userRole: req.session.user.role });
        console.log("Viewing students from admin function");
    });
}


//Editing Student
function edit_student(req, res) {
    const id = req.params.id;
   

    db.query("SELECT * FROM `student` WHERE `s_id` = ?;",[id],(err, rows)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            console.log(rows);
            res.render('edit_student', { userRole: req.session.user.role, rows });
            console.log("The data from the student table:",id);    
            }
    })
}


//Updating Student 
function update_student(req, res) {
    const {  email, password, phone } = req.body;
    const id = req.params.id;
   

    db.query("UPDATE `student` SET `s_email`= ?,`s_password`= ?,`s_phone` = ? WHERE `s_id` = ?",[  email, password, phone , id],(err)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/admin/view_student");
            console.log("The updated student from table:",id);    
            }
    })
}

//Deleting Student
function delete_student(req, res) {
    const id = req.params.id;
   

    db.query("DELETE FROM `student` WHERE `s_id` = ?",[id],(err)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/admin/view_student");
            console.log("The deleted student from table:",id);    
            }
    })
}

//Viewing Projects

function view_project(req, res) {

    const search = req.query.search;

    const query = search
        ? "SELECT `p_id`, `group_id`, `project_name`, `project_detail`,`s_id`,`teacher_id`, `student_name`, `teacher_name`, `year`, `type`, DATE_FORMAT(`start_date`, '%d-%m-%y') AS start_date, DATE_FORMAT(`end_date`, '%d-%m-%y') AS end_date, `status` FROM projects WHERE project_name =?"
        : "SELECT `p_id`, `group_id`, `project_name`, `project_detail`,`s_id`,`teacher_id`, `student_name`, `teacher_name`, `year`, `type`, DATE_FORMAT(`start_date`, '%d-%m-%y') AS start_date, DATE_FORMAT(`end_date`, '%d-%m-%y') AS end_date, `status` FROM projects;";

    const queryParams = search ? [search] : [];

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.render('view_project', { result, userRole: req.session.user.role });
                console.log("viewing project from adminfunction");
    });

};


//Deleting Project
function delete_project(req, res) {
    const id = req.params.id;
   

    db.query("DELETE FROM `projects` WHERE `p_id` = ?",[id],(err)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/admin/view_project");
            console.log("The deleted project from table:",id);    
            }
    })
}


//Viewing Groups
function view_group(req, res) {
   

    const search = req.query.search;

    const query = search
        ? "SELECT * FROM `group` WHERE student1_name = ? OR student2_name =?"
        : "SELECT * FROM `group`;";

    const queryParams = search ? [search,search] : [];

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.render('view_group', { result, userRole: req.session.user.role });
            console.log("viewing group from adminfunction");
    });
};


//Deleting Groups
function delete_group(req, res) {
    const id = req.params.id;
   

    db.query("DELETE FROM `group` WHERE `group_id` = ?",[id],(err)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/admin/view_group");
            console.log("The deleted team from table:",id);    
            }
    })
}


//Viewing Marks
function view_mark(req, res) {

    const search = req.query.search;

    const query = search
        ? "SELECT * FROM `marks` WHERE st_name = ?"
        : "SELECT * FROM `marks`;";

    const queryParams = search ? [search] : [];

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.render('view_mark', { result, userRole: req.session.user.role });
        console.log("viewing marks from adminfunction");
    });
};


//Deleting Marks
function delete_mark(req, res) {
    const id = req.params.id;
   

    db.query("DELETE FROM `marks` WHERE `p_id` = ?",[id],(err)=>{
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send("Internal Server Error");
        }
        else {
            res.redirect("/admin/view_mark");
            console.log("The deleted team from table:",id);    
            }
    })
}






module.exports = {
    view_teacher,
     edit_teacher,
     update_teacher,
     delete_teacher, 
     view_student,
     edit_student,
     update_student,
     delete_student,
     view_project,
     delete_project,
     view_group,
     delete_group,
     view_mark,
     delete_mark,
     
};