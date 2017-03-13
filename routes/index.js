var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {     
     if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    console.log(req.session+'333');
    res.render("home",{title:'Home'}); 
});
router.route("/login").get(function(req,res){   
    res.render("login");
}).post(function(req,res){                       
    
    var User = global.wdldb.getModel('user');
    var name = req.body.name;    
    console.log(req.body.Mypassword+'王登林')     ;   
    User.findOne({name:name},function(err,doc){   
        if(err){                                        
            res.send(500);
            console.log(err);
        }else if(!doc){                                
          req.session.error = '用户名不存在！'; 
           res.send(404);                       
        }
        else{ 
            if(req.body.Mypassword != doc.password){  
               req.session.error = '密码错误'; 
                 res.send(500);
           	res.redirect("/login");
            }else{ 
             req.session.user = doc                                    
               res.send(200);
            }
        }
    });
});
router.route("/register").get(function(req,res){    
    res.render("register",{title:'User register'});
}).post(function(req,res){ 
    var User = global.wdldb.getModel('user');
    var name = req.body.name;
    console.log(name);
    var Mypassword = req.body.Mypassword;
    User.findOne({name: name},function(err,doc){  
    console.log(doc) ;
        if(err){ 
            res.send(503);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){ 
        	console.log('用户名已存在！');
            req.session.error = '用户名已存在！';
            res.send(500);
        }
        else{ 
            User.create({                             
                name: name,
                password: Mypassword
            },function(err,doc){ 
                 if (err) {
                        res.send(500);
                        console.log(err);
                    } else {
                      req.session.error='用户名创建成功！';
                        res.send(200);
                    }
                  });
        }
    });
});
router.get('/home', function(req, res) {
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    console.log(req.session+'333');
    res.render("home",{title:'Home'});      
});
router.get('/logout', function(req, res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect("/login");
});
module.exports = router;
