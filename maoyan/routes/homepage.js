var express = require('express');
var router = express.Router();
var http = require('ykt-http-client')

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
//热映
router.get('/nowhot', function (req, res, next) {
  http.get('127.0.0.1:3333/hot_movies/find', { submitType: "findJoin", ref: ["movies", ""] }).then(function (data) {
    let arr = [];
    for (let i of data) {
      arr.push(i.movies)
    }
    res.send(arr);
  })
});
//即将上映
router.get("/beOn", function (req, res) {
  http.get("127.0.0.1:3333/movies_reflected/find", {submitType: "findJoin", ref: ["movies", ""] }).then(function (data) {
    let arr = [];
    for (let j of data) {
      arr.push(j.movies)
    }
    res.send(arr);
  })
})
//热播
router.get("/hotPlay", function (req, res) {
  http.get("127.0.0.1:3333/hot_play/find", {submitType: "findJoin", ref: ["movies", ""] }).then(function (data) {
    let arr = [];
    for (let j of data) {
      arr.push(j.movies)
    }
    res.send(arr);
  })
})


//轮播
router.get("/background_img", function (req, res) {
  http.get("127.0.0.1:3333/background/find", {}).then(function (data) {
    let arr = [];
    for (let j of data) {
      arr.push(j.img)
    }
    res.send(arr);
  })
})

//今日票房
router.get("/todayboxoffice",function(req,res){
 http.get("127.0.0.1:3333/hot_movies/find",{submitType:"findJoin",ref:["movies",""]}).then(function(data){
     let arr=[];
     for(let i of data){
        arr.push(i.movies)
     }
    //  console.log(arr[0][0].like);
     for(let i=0;i<arr.length-1;i++){
      for(let j=i+1;j<arr.length;j++){
        let numi=Number(arr[i][0].box_office)
        let numj=Number(arr[j][0].box_office)
        if(numi<numj){
          let item=arr[i];
          arr[i]=arr[j];
          arr[j]=item;
        }
      }
    }
    res.send(arr);
  
 })
})

// 最受期待
router.get("/mostexpect",function(req,res){
  http.get("127.0.0.1:3333/movies_reflected/find",{submitType:"findJoin",ref:["movies",""]}).then(function(data){
      let arr=[];
      for(let i of data){
         arr.push(i.movies)
      }
      console.log(arr[0][0].box_office);
      for(let i=0;i<arr.length-1;i++){
       for(let j=i+1;j<arr.length;j++){
         let numi=Number(arr[i][0].like)
         let numj=Number(arr[j][0].like)
         if(numi<numj){
           let item=arr[i];
           arr[i]=arr[j];
           arr[j]=item;
         }
       }
     }
     res.send(arr);
   
  })
 })

//top100
router.get("/topoh",function(req,res){
http.get("127.0.0.1:3333/hot_movies/find",{submitType:"findJoin",ref:["movies",""]}).then(function(data){
  let arr=[];
  for(let i of data){
    arr.push(i.movies)
  }
  for(let i=0;i<arr.length-1;i++){
    for(let j=i+1;j<arr.length;j++){
      let numi=Number(arr[i][0].movie_soc)
      let numj=Number(arr[j][0].movie_soc)
      if(numi<numj){
        let item=arr[i];
        arr[i]=arr[j];
        arr[j]=item;
      }
    }
  }
//   console.log(arr)
  res.send(arr);
})

})


module.exports = router;
