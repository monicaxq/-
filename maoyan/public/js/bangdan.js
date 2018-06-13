$(function () {
    init();
})
let db = 'hot_play';
example()

function init() {
    getCurrenttime()
   

    // let sd="";
    // $("#data").append(sd);
    $("#exam").delegate("a", 'click', function () {
        console.log($(event.target).html())
        switch ($(event.target).html()) {
            case "热映口碑榜":
                db = "hot_play"
                break;
            case "最受期待榜":
                db = "movies_match"
                break;
            case "国内票房榜":
                db = "movies_reflected"
                break;
            case "北美票房榜":
                db = "movies_match"
                break;
            case "TOP100榜":
                db = "hot_movies"
                break;
        }
        example();
    })

}


function getCurrenttime() {
    var date = new Date(); 
    var seperator1 = "-";
    var month = date.getMonth() + 1;
     var day = date.getDate();
    if (month >= 1 && month <= 9) { month = "0" + month; }
    if (day >= 0 && day <= 9) { day = "0" + day; }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + day 
    return $('#data').html(currentdate);
}
function example() {

    $.get("/example", { haha: db }, function (data) {
        console.log(data)
        // console.log(data[0]);
        // console.log(data[0][0])
        let str = "";
        let soc = 4;
        str += `<section class="pailie">
<ul>
    <li><a href="xiangqing.html?${data[0][0]._id}">
        <div>  <i></i> </div>
        <div>  <img src="http://127.0.0.1:3000${data[0][0].movie_img_small}" alt="mei"/></div>
        <div class="wenzi">
                <p>${data[0][0].movie_name}</p>
                <p>主演：${data[0][0].actor}</p>
                <p>上映时间：${data[0][0].movie_uptime}</p>

            <em>${data[0][0].movie_soc}</em>
        </div>
    </a>
    </li>
</ul>
</section> `

        str += `<section class="pailie">
<ul>
    <li><a href="xiangqing.html?${data[1][0]._id}">
        <div class="huangkuai"> <em>2</em>  </div>
        <div>  <img src="http://127.0.0.1:3000${data[1][0].movie_img_small}" alt="mei"/></div>
        <div class="wenzi">
        <p>${data[1][0].movie_name}</p>
        <p>主演：${data[1][0].actor}</p>
        <p>上映时间：${data[1][0].movie_uptime}</p>

    <em>${data[1][0].movie_soc}</em>
        </div>
    </a>
    </li>
</ul>
</section>`
        str += `<section class="pailie">
<ul>
    <li><a href="xiangqing.html?${data[2][0]._id}">
        <div class="huangkuai"> <em>2</em>  </div>
        <div>  <img src="http://127.0.0.1:3000${data[2][0].movie_img_small}" alt="mei"/></div>
        <div class="wenzi">
        <p>${data[2][0].movie_name}</p>
        <p>主演：${data[2][0].actor}</p>
        <p>上映时间：${data[2][0].movie_uptime}</p>

    <em>${data[2][0].movie_soc}</em>
        </div>
    </a>
    </li>
</ul>
</section>`

        for (let i = 3; i < 10; i++) {
            str += `<section class="pailie">
   <ul>
       <li><a href="xiangqing.html?${data[i][0]._id}">
           <div class="huikuai">  <em>${soc++}</em> </div>
           <div>  <img src="http://127.0.0.1:3000${data[i][0].movie_img_small}" alt="mei"/></div>
           <div class="wenzi">
               <p>${data[i][0].movie_name}</p>
               <p>主演：${data[i][0].actor}</p>
               <p>上映时间：${data[i][0].movie_uptime}</p>

               <em>${data[i][0].movie_soc}</em>
           </div>
       </a>
       </li>
   </ul>
</section>`
        }
        $('#example').html('');
        $('#example').append(str);

    })
}