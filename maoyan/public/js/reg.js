let isphone = false;
let ispass = false;
let iscode = false;
phone();
phoneisreg();
code();
pwdstrong();
repwd();
sumbit()
//手机号验证 
function phone() {
    let myphone = /^[1][3,4,5,7,8][0-9]{9}$/
    $('#phonenum').keyup(function () {
        if (myphone .test($('#phonenum').val())) {
            $('#phone_info').html('格式正确')
            isphone = true;
        }
        else {
            $('#phone_info').html('请输入正确的11位手机号')
            isphone = false;
        }
    })
}
//手机号是否注册
function phoneisreg() {
    $('#phonenum').keyup(function () {
        if (isphone) {
            $.get('/phoneisreg', { name: $('#phonenum').val() }, (data) => {
                if (data == 'no') {
                    // console.log('已经被注册了')
                    // $('#hapo').prop('disabled', 'true')
                    $('#phone_info').html('手机号码已被注册')
                }
            })
        }
    })
}
//验证码
function code(){
 let mycode=/^\d{6}$/
 $('#code').keyup(function () {
    if (mycode .test($('#code').val())) {
        $('#code_info').html('格式正确')
        iscode = true;
    }
    else {
        $('#code_info').html('请输入正确的六位验证码')
        iscode = false;
    }
})
}

//密码强度验证
function pwdstrong() {
    $('#pwd').keyup(function (e) {
        var strongRegex = new RegExp(/^\w{6,16}$/);
        var mediumRegex = new RegExp(/^[A-Za-z0-9]{6,16}$/);
        var enoughRegex = new RegExp(/^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/);
        if (enoughRegex.test($(this).val())) {
            console.log('弱')
            $('.color').children().css('background', '#efefef')
            $('#r').css('background', 'red')
        } else if (mediumRegex.test($(this).val())) {
            console.log('中')
            $('.color').children().css('background', '#efefef')
            $('#o').css('background', 'orange')
        } else if (strongRegex.test($(this).val())) {
            console.log('强')
            $('.color').children().css('background', '#efefef')
            $('#g').css('background', 'green')
        }
        return true;
    });
}

//确认密码
function repwd() {
    $('#repwd').keyup(function () {
        if ($(this).val() != $('#pwd').val()) {
            $('#pwd_info').html('密码不一致')
            ispass = false;
        }  
        else {
            $('#pwd_info').html('正确')
            ispass =true;
       
        }
    })
}

function sumbit() {
    $('#submit').on('click', () => {
        if (isphone && ispass) {
            $.post('/reg', {name: $('#phonenum').val(), pwd: $('#repwd').val() }, (data) => {
            })
        }
        else {
            $('#tishi').html('格式不正确')
        }

    })
}
