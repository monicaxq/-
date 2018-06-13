$(() => { init() })
function init() {
    background_img()  //轮播
    nowhot();//热映
    beOn();
    hotPlay();
    todayboxoffice();
    mostexpect();
    topoh();
}
//轮播
function background_img() {
    $.get("/homepage/background_img", {}, function (data) {
        $("#banner").css({ "background": `url('http://127.0.0.1:3000${data[0]}')` })
        // console.log(data[0]);
        let i = 0;
        setInterval(function rightMove() {
            i++;
            if (i == 4) {
                i = 0;
            }

            $("#banner").css({ "background": `url('http://127.0.0.1:3000${data[i]}')` })

            // console.log(i)

        }, 1000)
    })
}
//热映
function nowhot() {
    $.get('/homepage/nowhot', {}, function (data) {
        // console.log(data)
        // console.log(data[i][0].movie_name)
        // console.log(data[0][0]._id)
        let str = "";
        for (let i = 0; i < 8; i++) {
            str += `<li>
            <a href="xiangqing.html?${data[i][0]._id}">
                <img src="http://127.0.0.1:3000${data[i][0].movie_img_small}" alt=""/>
                <p> <span>${data[i][0].movie_name}</span><em>${data[i][0].movie_soc}</em></p>
                <p>购票</p>
            </a>
        </li>`
        }
        $("#hotmovie").append(str);
    })
}

//即将上映
function beOn() {
    $.get('/homepage/beOn', {}, function (data) {
        console.log(data)
        console.log(data[3][0].movie_img_small)
        let str = "";
        for (let i = 0; i < 8; i++) {
            str += ` <li>
            <a href="xiangqing.html?${data[i][0]._id}">
                <img src="http://127.0.0.1:3000${data[i][0].movie_img_small}" alt=""/>
                <p> <span>${data[i][0].movie_name}</span><em>${data[i][0].movie_soc}</em></p>
                <p>${data[i][0].like}</p>
                <p><span>预告片</span><span>预售</span></p>
            </a>
            <p>${data[i][0].movie_uptime}</p>
        </li>`
        }
        $("#beOn").append(str);
    })
}

//热播
function hotPlay() {
    $.get('/homepage/hotPlay', {}, function (data) {
        let str = "";
        str = `<li>
        <a href="xiangqing.html?${data[0][0]._id}">
            <img src="http://127.0.0.1:3000${data[0][0].movie_img_middle}" alt=""/>
            <p><span>${data[0][0].movie_name}</span><i>${data[0][0].movie_soc}</i></p>
         </a>
    </li>`
        for (let i = 1; i < 7; i++) {
            str += `  <li>
            <a href="xiangqing.html?${data[i][0]._id}">
                <img src="http://127.0.0.1:3000${data[i][0].movie_img_small}" alt=""/>
                <p><span>${data[i][0].movie_name}</span><i>${data[i][0].movie_soc}</i></p>
             </a>
        </li>`
        }
        $("#hotplay").append(str);
    })

}

//今日票房
function todayboxoffice() {
    $.get('/homepage/todayboxoffice', {}, function (data) {
        console.log(data)
        let str = "";
        str += ` <li>
<a href="xiangqing.html?${data[0][0]._id}">
    <img src="http://127.0.0.1:3000${data[0][0].movie_img_small}" alt=""/>
        <span>${data[0][0].movie_name}</span>
        <span>${data[0][0].box_office}万</span>
</a>
</li>`
        let num = 2;
        for (let i = 1; i < 10; i++) {
            str += `   <li>
    <a href="xiangqing.html?${data[i][0]._id}">
        <i>${num++}</i><span>${data[i][0].movie_name}</span><span>${data[i][0].box_office}万</span>
    </a>
</li>`
        }

        $("#box_office").append(str);

    })
}
//最受期待
function mostexpect() {
    $.get('/homepage/mostexpect', {}, function (data) {
        // console.log(data)
        let str = "";
        str += `<li>
<a href="xiangqing.html?${data[1][0]._id}">
    <img src="http://127.0.0.1:3000${data[1][0].movie_img_small}" alt="d"/>
    <div>
        <p>${data[1][0].movie_name}</p>
        <p>上映时间：${data[1][0].movie_uptime}</p>
        <p>${data[1][0].like}人想看</p>
    </div>
 </a>
</li>
<li>
                        <a href="xiangqing.html?${data[3][0]._id}">
                            <img src="http://127.0.0.1:3000${data[3][0].movie_img_small}" alt="d"/>
                            <div>
                                <p>${data[3][0].movie_name}</p>
                                <span>${data[3][0].like}人想看</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="xiangqing.html?${data[4][0]._id}">
                            <img src="http://127.0.0.1:3000${data[4][0].movie_img_small}" alt="d"/>
                            <div>
                                <p>${data[4][0].movie_name}</p>
                                <span>${data[4][0].like}人想看</span>
                            </div>
                        </a>
                    </li>
`
        let num = 4;
        for (let i = 5; i < 12; i++) {
            str += ` <li>
    <a href="xiangqing.html?${data[i][0]._id}">
        <i>${num++}</i><span>${data[i][0].movie_name}</span><span>${data[i][0].like}人想看</span>
    </a>
</li>`
        }
        $("#mostexpect").append(str);
    })
}

//top100
function topoh() {

    $.get('/homepage/topoh', {}, function (data) {
        console.log(data)
        let str = "";
        str += ` <li>
        <a href="xiangqing.html?${data[0][0]._id}">
            <img src="http://127.0.0.1:3000${data[0][0].movie_img_small}" alt=""/>
            <span>${data[0][0].movie_name}</span>
            <span>${data[0][0].movie_soc}分</span>
        </a>
    </li>`
        let num = 2;
        for (let i = 2; i < 11; i++) {
            str += ` <li>
    <a href="xiangqing.html?${data[i][0]._id}">
        <i>${num++}</i><span>${data[i][0].movie_name}</span><span>${data[i][0].movie_soc}分</span>
    </a>
</li>`
        }

        $("#topoh").append(str);

    })
}

