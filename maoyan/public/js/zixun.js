$(function () {
    init()
})

var con = location.search;
var con_id = con.split("?")[1];
function init() {
    // console.log(con_id)
    consult();

}

function consult() {
    $.get('/consult', { _id: con_id }, function (data) {
        let write;
        if (data.writer) {
            write = data.writer
        }
        else {
            write = "匿名"
        }
        // console.log(data.word.length)
        let str = "";
        str += `         <section><p>${data.title}</p></section>
        <section><p>猫眼电影 &nbsp;&nbsp;${data.show_time} &nbsp;&nbsp;<img src="../images/icon_05.png" alt=""/>${data.look}</p></section>
     `
        for (let i = 0; i < data.word.length; i++) {
            str += ` <section>${data.word[i]}</section>
            <section><img src="http://127.0.0.1:3000${data.img[i]}" alt=""/></section>`
        }
        str += `   <p>（文/${write}）</p>`//作者名
        $("#refer").append(str);


        let str2 = "";
        for (let j = 0; j < data.pl.length; j++) {
            str2 += `<div>
            <img src="../images/7dd82a16316ab32c8359debdb04396ef2897.png" alt="ff"/>
            <img src="../images/v2.png" alt=""/>
            <div>
                <div class="pinglun">
                    <p>duangduangduang</p>

                    <p>09-28 徐州</p>

                    <p>${data.pl[j]}</p>
                </div>
                <span><img src="../images/icon_08.png" alt=""/>151</span>
            </div>
        </div>`
        }
        $("#hot_talk").append(str2)
    })
}