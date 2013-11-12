#! /usr/bin/env node

var Pouch = require('pouchdb');
var address = "http://localhost:5984/pres";
Pouch(address,function(err,db){

function get(cb){
	db.query('medium/sum',function(err,doc){
		if(err){
			cb(err);
		}else{
			cb(null,doc.rows[0].value);
		}
	});
};

if(process.argv.length>2){
	if(process.argv[2]==='len'){
		get(function(err,num){
			if(err){
				console.log('shit',err);
			}else{
				console.log(num);
			}
		})
	} else if(process.argv[2]==='get'){
		db.get(process.argv[3],function(err,doc){
			console.log(doc.text);
		});
	}else if(process.argv[2]==='update'){
		db.get(process.argv[3],function(err,doc){
			doc.text = process.argv[4];
			db.put(doc,function(err,resp){
				if(err){
					console.log(err);
				}else{
					if(resp.ok){
						console.log('ok');
					}
				}
			})
		});
	}else if(process.argv[2]==='new'){
		get(function(err,num){
			doc = {};
			doc._id = (++num).toString();
			doc.text = process.argv[3];
			db.put(doc,function(err,resp){
				if(err){
					console.log(err);
				}else{
					if(resp.ok){
						console.log('ok');
					}
				}
			});
		});
	}
}
});