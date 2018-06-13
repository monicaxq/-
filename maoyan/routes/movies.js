var express = require('express');
var router = express.Router();
var http = require('ykt-http-client')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/show_movies', (req, res) => {
  let obj = {};
  if (req.query.nowtype != 'movies') {
    obj.submitType = "findJoin";
    obj.ref = ['movies', '']
  }
  else {
    if (req.query.type != '') {
      obj.movie_type = req.query.type
    }
    if (req.query.area != '') {
      obj.area = req.query.area
    }
    if (req.query.time != '') {
      obj.year = Number(req.query.time)
    }
  }
  http.get(`127.0.0.1:3333/${req.query.nowtype}/find`, obj).then((data) => {
    if (req.query.nowtype != 'movies') {
      let arr = []
      for (let item of data) {
        arr.push(item.movies[0])
      }
      console.log(arr)
      res.send(arr)
    }
    else {
      res.send(data)
    }
  })
})


//
router.get('/ordonner', (req, res) => {
  http.get(`127.0.0.1:3333/movies/find`, {}).then((data) => {
    res.send(data)
  })

})

module.exports = router;
