$(function () {
    init();
})
var talk_id;
var ll = location.search;
var l_id = ll.split("?")[1];
// console.log(l_id);
function init() {
    introduce();
    $("#review").on('click', com)   //显示评论框
    $("#subbtn").on('click', textval)//提交评论
    review();
    relatedmovie();
    relatedconsult();
}


function introduce() {

    $.get('/details/introduce', { _id: l_id }, function (data) {
        console.log(data);
        //片名
        let str = ""
        str += ` 
        <a href="dianying.html">
                <img src="http://127.0.0.1:3000${data.movie_img_small}" alt="d"/>
                 <img src="../images/shadow.png" alt="s"/>
            </a>
            <section class="shang_nei" >
        <div class="shang_jieshao">
        <h1><a href="dianying.html">${data.movie_name}</a></h1>
        <h2>${data.en_name}</h2>
        <p>${data.movie_type}</p>
        <p>${data.area}/${data.movie_time}</p>
        <p>${data.movie_uptime}上映</p>
        <p><a href=""><img src="../images/banner_icon02.png" alt=""/>想看</a><a href=""><img src="../images/banner_icon01.png" alt=""/>评分</a></p>
    </div>
    <div>
        <ul class=" shang_ping">
            <li>
                <p>用户评分</p>
                <p>${data.movie_soc}</p>
                <p>（55.6万人评分）</p>
            </li>
            <li>
                <p>专业评分</p>
                <p>6.4</p>
                <p>（45人评分）</p>
            </li>
            <li>
                <p>累计票房</p>
                <p>10.33亿</p>
            </li></ul>
        <p><a href="">立即购票</a></p>
    </div>
    </section>`
        //简介
        $("#introduce").append(str)
        let str2 = ""
        str2 += `${data.info}`
        $("#intro").append(str2);


        //导演
        let str3 = ""
        str3 += `
<a href="#">
    <img src="http://127.0.0.1:3000${data.director_img}" alt="" />
    <p>${data.director}</p>
</a>
`
        $("#director").append(str3)
        //演员
        let actor = data.actor
        let newactor = actor.split(",");
        // console.log(newactor)
        let str4 = "";

        for (let i = 0; i < 4; i++) {
            str4 += ` <li>
    <a href="">
        <img src="http://127.0.0.1:3000${data.actor_img[i]}" alt="" />
        <p>${newactor[i]}</p>
        <p>饰：高刚</p>
    </a>
    </li>`
        }
        $("#people").append(str4)
        //tuji
        let str5 = "";
        for (let i = 0; i < 5; i++) {
            str5 += `<li>
    <img src="http://127.0.0.1:3000${data.img_box[i]}" alt="" />
</li>`
        }
        $("#atlas").append(str5)


    })

}



//pinglun
function review() {
    $.get('/details/review', { _id: l_id }, function (data) {
        if (data.movie_talk) {
            // console.log(data.movie_talk[0].movie_talk)
            let i = 0;
            let str6 = "";
            for (let j = 0; j < data.movie_talk.length; j++) {
                str6 += ` <div class="yonghu">
            <img src="../images/7dd82a16316ab32c8359debdb04396ef2897.png" alt="ff" />
            <img src="../images/v2.png" alt="" />
            <div class="ming">
                <div class="ming_shang">
                    <div>
                        <p>Asndjdndns</p>
                        <p>09-30
                            <img src="../images/star_icon01.png" alt="" />
                        </p>
                    </div>
                    <p>
                        <img src="../images/icon_08.png" alt="" />12454</p>
                </div>
                <p>${data.movie_talk[i++].movie_talk}</p>
            </div>
        </div>
            `
            }
            $("#talk").append(str6)

        } else {
            $("#talk").append(`<div class="yonghu">暂无评论</div>`)
        }
    })
}


function com() {
    $("#comment").css("display", "block")
}
function textval() {
    let inputval = $("textarea").val();
    $.get('/details/addtalk', { movie_talk: inputval, _id: l_id }, function (data) {
        $("#word").val("")
        $("#talk").html("")
        review();
    })
}

//xiangguandianying
function relatedmovie() {
    $.get('/details/relatedmovie', { _id: l_id }, function (data) {
        console.log(data)
        let str7 = "";

        for (let x = 6; x <12; x++) {
            str7 += `<li>
        <a href="xiangqing.html?${data[x]._id}">
            <img src="http://127.0.0.1:3000${data[x].movie_img_small}" alt="" />
            <p>${data[x].movie_name}</p>
            <em>${data[x].movie_soc}
            </em>
        </a>
    </li>`
        }
        $("#relatedmovie").append(str7);
    })
}

//相关资讯
function relatedconsult() {
    $.get('/details/relatedconsult', {}, function (data) {
        console.log(data)
        let str8 = "";
        for (let x = 4; x <7; x++) {
            str8 += ` <div class="xiang_piao">
            <a href="zixun.html?${data[x]._id}">
                <img src="http://127.0.0.1:3000${data[x].img[0]}" alt="" />
            </a>
            <p>
                <a href="zixun.html?${data[x]._id}">${data[x].title}</a>
            </p>
            <p>
                <a href="">猫眼电影</a>
                <img src="../images/icon09.png" alt="s" />21145
                <img src="../images/icon10.png" alt="d" />111</p>
        </div>`
        }
        $("#relatedconsult").append(str8);
    })
}
