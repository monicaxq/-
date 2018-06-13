var express = require('express');
var router = express.Router();
var http = require('ykt-http-client')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/introduce", function (req, res) {
    http.get("127.0.0.1:3333/movies/find", req.query).then(function (data) {
        // console.log(data)
        res.send(data);

    })
})
//
router.get("/review", function (req, res) {
    http.get("127.0.0.1:3333/movies/find", req.query).then(function (data) {
        // console.log(data)
        if (data.movie_talk) {
            req.query.submitType = "findJoin";
            req.query.ref = ["movie_talk", ""]
            http.get("127.0.0.1:3333/movies/find", req.query).then(function (data) {
                res.send(data);
            })
        }
        else {
            res.send(data);
        }

    })
})

//增加评论
router.get("/addtalk", function (req, res) {
    // console.log(req.query.movie_talk)
    http.get("127.0.0.1:3333/movie_talk/add", { movie_talk: req.query.movie_talk }).then(function (data) {
        console.log(req.query._id, data)
        http.post("127.0.0.1:3333/movies/update", { _id: req.query._id, movie_talk: data, isPush: true }).then(function (data) {
            console.log(data)
            res.send(data);
        })
    })
})

//相关电影

router.get("/relatedmovie", function (req, res) {
    http.get("127.0.0.1:3333/movies/find", { _id: req.query._id }).then(function (data) {
        let m_t = data.movie_type.split(",")

        var arr = [];
        for (let i = 0; i < m_t.length; i++) {
            http.get("127.0.0.1:3333/movies/find", { movie_type: m_t[i] }).then(function (data) {
                for (let item of data) {
                    arr.push(item);
                }
                http.get("127.0.0.1:3333/movies/find", { movie_type: m_t[i] }).then(function (data) {
                    for (let item of data) {
                        for (let x = 0; x < data.length - 1; x++) {
                            for (let y = x + 1; y < data.length; y++) {
                                if (data[x]._id == data[y]._id) {
                                    data.splice(y, 1);
                                    y--;
                                    arr.push(item);
                                }
                            }
                        }
                    }
                    console.log(arr.length);
                    res.send(arr);
                })

            })

        }
    })
})
//相关资讯
router.get("/relatedconsult", function (req, res) {
    http.get("127.0.0.1:3333/movies_info/find").then(function (data) {
        // console.log(data)
      res.send(data)
    })
})
module.exports = router;
