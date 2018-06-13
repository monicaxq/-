$(function () {
    init()
})


let nowtype = 'movies'
var type = '';
let area = '';
let time = '';
function init() {
    show_movie();
    $('#classmovie').delegate('li', 'click', () => {
        switch (event.target.innerHTML) {
            case '正在热映':
                nowtype = 'movies'
                break;
            case '即将上映':
                nowtype = 'movies_reflected'
                break;
            case '经典影片':
                nowtype = 'movies_match'
                break;
        }
        show_movie();
    })
    choose();
    paixu();
}


//当前页面显示
function show_movie() {
    let str = '';
    $.get('/movies/show_movies', { nowtype, type, area, time }, (data) => {
        //   console.log(data)
        for (let item of data) {
            str += ` <li>
            <a href="xiangqing.html?${item._id}">
            <img src="http://127.0.0.1:3000${item.movie_img_small
                }" alt=""/>
            <p>${item.movie_name}</p>
            <em>${item.movie_soc}</em>
             </a>
        </li>`
        }
        $('#show').html('')
        $('#show').append(str)
    })

}


// 选择
function choose() {
    $('#type').delegate('label', 'click', () => {
        console.log($(event.target).html())
        type = '';
        type = $(event.target).html();
        if (type == '全部') {
            type = ''
        }
        show_movie();
    })
    $('#area').delegate('label', 'click', () => {
        area = '';
        area = $(event.target).html();
        if (area == '全部') {
            area = ''
        }
        show_movie();
    })
    $('#time').delegate('label', 'click', () => {

        time = '';
        time = $(event.target).html();
        if (time == '全部') {
            time = ''
        }
        show_movie();
    })
}

//排序

function paixu() {
    // $('#ordonner').delegate('label', 'click', () => {

        // console.log($(event.target).html())
        // $.get("/ordonner",{ nowtype, type, area, time }, function (data) {
        //     console.log(data)
        //     console.log(data)
        // })
        // switch (event.target.innerHTML) {
        //     case '按热门排序':
        //         nowtype = 'movies'
        //         break;
        //     case '按时间排序':
        //         nowtype = 'movies_reflected'
        //         break;
        //     case '按评价排序':
        //         nowtype = 'movies_match'
        //         break;
        // }
    // })
}