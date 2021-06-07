var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lab 3 - Datatables and AJAX Calls using Node.js' });
});

module.exports = router;
