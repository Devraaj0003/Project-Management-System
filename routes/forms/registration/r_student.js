var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        const userEmail = req.session.user.email ;
        const userName = req.session.user.name ;
        const userRole = req.session.user.role;
        res.render('stud_reg',{ userEmail, userName, userRole, message : req.flash('message')});

    }else{
        res.redirect("/");
    }
});


module.exports = router;