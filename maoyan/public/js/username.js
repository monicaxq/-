islogin()
function islogin() {
    $.get('/islogin', {}, (data) => {
        $('#user').html('')
        if (data == 'no') {
            $('#user').append(`
        <li>
            <a href="denglu.html">登陆</a>
        </li>
        <li>
            <a href="zhuce.html" id="zhuce">注册</a>
        </li>
        `)
        $('#zhuce').css({  'margin-left': '5px' });
        }
        else {
            $('#user').append(`  ${data}<a id='username' href="javascript:outlogin()">退出
      
        </a>
        `)
            
            $('#username').css({  'margin-left': '5px' })
        }
    })
}
function outlogin() {
    // console.log('2333')
    $.get('/outlogin', {}, (data) => {
        islogin()
    })
}
