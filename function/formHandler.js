// Import necessary modules
const db = require("../database"); // Import your database module

function login(req, res) {
  const formData = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.user_type,
  };
  console.log(formData);
  const role = formData.role;
  const a_email = formData.email;
  const password = formData.password;

  if (role === "Admin" && a_email === "a" && password === "a") {
    req.session.user = {
      role: "admin",
      email: a_email,
      name: "admin", // Store the user's email in the session
    };

    res.redirect("/admin");
  } else if (role === "Teacher") {
    const query = "SELECT * FROM teacher WHERE t_email = ? AND t_password = ?";
    db.query(query, [formData.email, formData.password], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log(results[0]);
      if (results.length > 0) {
        req.session.user = {
          role: "teacher",
          email: results[0].t_email,
          name: results[0].t_name, // Store the user's email in the session
        };

        console.log("User email after login:", req.session.user.email);
        res.redirect("/teacher");
      } else {
        req.flash('message', 'Invalid Credential');
        res.redirect("/");
      }
    });
  } else if (role === "Student") {
    const query = "SELECT * FROM student WHERE s_email = ? AND s_password = ?";
    db.query(query, [formData.email, formData.password], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length > 0) {
        req.session.user = {
          role: "student",
          email: results[0].s_email,
          name: results[0].s_name, // Store the user's email in the session
        };

        console.log("User email after login:", req.session.user.email);
        return res.redirect("/student");
      } else {
        req.flash('message', 'Invalid Credential');
        res.redirect("/")
      }
    });
  } else {
    req.flash('message', 'Invalid Credential');
    res.redirect("/");
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } 
    else {
      // res.header(
      //   "Cache-Control",
      //   "no-store, private, no-cache, must-revalidate, max-stale=0, post-check=0, pre-check=0"
      // );
      console.log("successfully logged out");
      res.redirect("/");
    }
  });
}

module.exports = {
  login,
  logout,
};
