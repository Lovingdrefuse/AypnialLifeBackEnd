var express = require('express');
var mysql = require('../utils/mysql.js');
var sql = require('../utils/sql.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/hello',(req,res)=>{
	mysql.query(sql.getUser,(err,results,fields)=>{
		console.log(results)
		res.send(results) //results.data是可以拿到查询返回的数组的
	})
})
module.exports = router;
