var express = require('express');
var router = express.Router();
var http = require('ykt-http-client')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//榜单
router.get("/example", function (req, res) {
  console.log(req.query.haha)
  http.get(`127.0.0.1:3333/${req.query.haha}/find`, { submitType: 'findJoin', ref: ["movies", ""] }).then(function (data) {
    let arr = [];
    // console.log(data)
    for (let j of data) {
      arr.push(j.movies)
    }
    // console.log(arr[0][0].movie_soc);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        let numi = Number(arr[i][0].movie_soc)
        let numj = Number(arr[j][0].movie_soc)
        if (numi < numj) {
          let item = arr[i];
          arr[i] = arr[j];
          arr[j] = item;
        }
      }
    }
    res.send(arr);
  })
})



//登录
router.post('/login', function (req, res) {
  let obj = {
    name: req.body.name,
    pwd: req.body.pwd,
    findType: "exact"
  }
  http.get('127.0.0.1:3333/people/find', obj).then(function (data) {
    if (data.length == 1) {
      req.session.name = req.body.name
      res.redirect("/shouye.html")
    } else {
      res.redirect("/denglu.html?isLogin=0")
    }

  })

});

//注册
router.post('/reg', function(req, res, next) {
  let newUser = req.body;
  let obj = {
      name: newUser.name,
      pwd: newUser.pwd,
  }
  http.post('127.0.0.1:3333/people/add', obj).then((data) => {
      res.redirect('denglu.html');
      req.send("ok")
  })
});


//检测用户名是否存在
router.get('/phoneisreg', function(req, res) {
  
  http.get('127.0.0.1:3333/people/find', {name: req.query.name, findType: 'exact'}).then((data) => {
      if(data.length)
          res.send('no')  //已存在，不能使用
      else
          res.send('ok')  //可以使用
  })
  
});





//资讯
router.get('/consult', function (req, res) {
  http.get('127.0.0.1:3333/movies_info/find',req.query).then(function (data) {
    // console.log(data)
   res.send(data);
  })
});




//判断登陆
router.get('/islogin', (req, res) => {
  if (req.session.name) {
    res.send(req.session.name)
  }
  else {
    res.send('no')
  }
})

//退出登陆
router.get('/outlogin', (req, res) => {
  delete req.session.name
  res.send('')
})


module.exports = router;
