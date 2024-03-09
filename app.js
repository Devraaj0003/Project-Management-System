var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./database");
const exphbs = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require('multer');
const fs = require('fs');


// require('dotenv').config();

//Routes
var formRouter = require("./routes/login_form");
var indexRouter = require("./routes/index");
var studentRouter = require("./routes/users/student");
var adminRouter = require("./routes/users/admin");
var teacherRouter = require("./routes/users/teacher");
const regstudRouter = require("./routes/forms/registration/r_student");
const regteachRouter = require("./routes/forms/registration/r_teacher");

const formHandler = require("./function/formHandler"); 
const regFuntion = require("./function/register");
const projectFunction = require("./function/project");
const new_project = require("./routes/forms/new_project");
const adminFunction = require("./function/adminFunction");
const studFunction = require("./function/studFunction");
const teachFunction = require("./function/teachFunction");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

// Express session middleware
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// // Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: './public/images',
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

app.post("/login", formHandler.login);
app.post("/logout", formHandler.logout);
app.post("/reg_student", regFuntion.reg_student);
app.post("/reg_teacher", regFuntion.reg_teacher);
app.post("/reg_project",projectFunction.reg_project);
app.post('/update_teacher/:id',adminFunction.update_teacher);
app.post('/update_student/:id',adminFunction.update_student);
app.post('/update_myproject/:id',studFunction.update_myproject);
app.post('/upload/:id&:lvl',upload.single('upload'),studFunction.upload);
app.post('/post_comment/:id&:lvl',studFunction.post_comment);




// ,upload.single('upload')





// app.use('/', indexRouter);
app.use("/", formRouter);
app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/teacher", teacherRouter);
app.use("/admin/r_student",regstudRouter);
app.use("/admin/r_teacher",regteachRouter);
app.use("/admin/new_project",new_project);
app.use('/admin/view_teacher',adminFunction.view_teacher);
app.use('/edit_teacher/:id',adminFunction.edit_teacher);
app.use('/delete_teacher/:id',adminFunction.delete_teacher);
app.use('/admin/view_student',adminFunction.view_student);
app.use('/edit_student/:id',adminFunction.edit_student);
app.use('/delete_student/:id',adminFunction.delete_student);
app.use('/admin/view_project',adminFunction.view_project);
app.use('/delete_project/:id',adminFunction.delete_project);
app.use('/admin/view_group',adminFunction.view_group);
app.use('/delete_group/:id',adminFunction.delete_group);
app.use('/admin/view_mark',adminFunction.view_mark);
app.use('/delete_mark/:id',adminFunction.delete_mark);

app.use('/edit_myproject/:id',studFunction.edit_myproject);
app.use('/stud/upload/:id&:lvl',studFunction.add_file);

app.use('/view_studproject/:id',teachFunction.view_studproject);
app.use('/view_file/:id&:lvl',teachFunction.view_file);
app.use('/update_status/:id',teachFunction.update_status);
app.use('/teacher/view_mygroups/:id',teachFunction.view_mygroups);





// Middleware to set Cache-Control header
app.use((req, res, next) => {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
