const db = require("../database"); // Import your database module

function reg_student(req, res) {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    year: req.body.year,
    // id: Math.floor(100 + Math.random() * 900),
  };
  console.log(formData);

  const query =
    "INSERT INTO `student`( `g_id`, `s_email`, `s_password`, `s_phone`, `s_name`, `s_year`) VALUES (?,?,?,?,?,?)";
  db.query(
    query,
    [
      
      0,
      formData.email,
      formData.password,
      formData.phone,
      formData.name,
      formData.year,
    ],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log("succesfully added");
      req.flash('message', 'Saved Successfully');
      res.redirect("/admin/r_student");

    }
  );
}


function reg_teacher(req, res) {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    // id: Math.floor(100 + Math.random() * 900),
  };
  console.log(formData);

  const query =
    "INSERT INTO `teacher`( `t_name`, `t_email`, `t_password`, `t_phone`) VALUES (?,?,?,?)";
  db.query(
    query,
    [
     
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
    ],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      } else {
        console.log("succesfully added");
        req.flash('message', 'Saved Successfully');
        res.redirect("/admin/r_teacher");
      }
    }
  );
}




module.exports = {
  reg_student, reg_teacher
};
