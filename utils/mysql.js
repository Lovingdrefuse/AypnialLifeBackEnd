const mysql = require('mysql');

const options = {
	host:'127.0.0.1',
	database:'aypniallife',
	user:'root',
	password:'root'
}

//建立连接池
const pool = mysql.createPool(options)

/**
 * 不带参数的查询
 * @param {string}	sql sql语句
 * @param {function} callback 回调函数
 * @return {none}    
 */

const __selectDelete = (sql, callback)=>{
	//建立连接
	pool.getConnection(function(err,conn){
		if(err){
			console.log('CONNECT ERROR:',err.message)
			callback(err,null,null)
		}else {
			//执行查询，结果回调，并释放连接
			conn.query(sql,(err,results,fields)=>{
				conn.release()
				callback(err,results,fields)
			})
		}
	})
}
/**
 * 更改和添加
 * @param {string} sql sql语句
 * @param {Array} params 参数数组    
 * @param {function} callback 回调函数 
 * @return {none}
 */
const __updateInsert = (sql,params,callback)=>{
		pool.getConnection(function(err,conn){
			if(err){
				console.log('CONNECT ERROR:',err.message)
				callback(err,null,null)
			} else {
				//输出sql语句和参数
				console.log(sql,params)
				conn.query(sql,params,(err,results,fields)=>{
					conn.release()
					callback(err,results,fields)
				})
			}
		})
}


/**
 * 对增删改查进行函数重载
 */

exports.query = function(){
	//确定参数的个数
	let length = arguments.length
	let sql = ''//接收sql语句
	let cb = ''//接收回调函数
	if(length === 2){
		//如果是两个参数 那就是不带参数的查询
		sql = arguments[0]
		cb = arguments[1]
		__selectDelete(sql,cb)
	} else if (length === 3){
		//如果是三个参数 那就是带参数的查询
		sql = arguments[0]
		let params = arguments[1]
		cb = arguments[2]
		__updateInsert(sql,params,cb)
	}else{
		console.log('sql参数错误')
	}
}