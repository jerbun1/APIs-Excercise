var express = require('express');
var router = express.Router();
const fs = require("fs");
const Fuse = require("fuse.js");
const axios = require('axios');
const { response } = require('express');

//const userData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
//console.log(userData);
//console.log(results);
const filterData = (query, data) =>{
  return new Promise((resolve, reject) =>{
  const fuse = new Fuse(data, {
  keys: ['id', 'email', 'last_name', 'avatar'],
  threshold: 0.1,
  findAllMatches: true
  });

  const results = fuse.search(query).map(results => results.item);
  resolve(results);
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios('https://reqres.in/api/users')
    .then(response => {
      //console.log(response.data.data);  
      res.render('users', {data: response.data});
      
    })
    .catch(error => {
      res.render('error', {
        message: "Failed to load the proper users sorry",
        error: error
      });
    })
});

router.get('/:filter', function(req, res, next) {
  axios('https://reqres.in/api/users')
    .then(response => filterData(req.params.filter, response.data.data))
    .then(filteredData => {
      //console.log(response.data.data);  
      res.render('users', {data: filteredData});
    })
    .catch(error => {
      res.render('error', {
        message: "Failed to load the proper users sorry",
        error: error
      });
    })

});

module.exports = router;
