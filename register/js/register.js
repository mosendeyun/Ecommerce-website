var register = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['login-btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                console.log(1)
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.register(data);
                    }
                }
                sendAjax('http://localhost:8888/gitup/Ecommerce-website/register/php/register.php', params);
            },
            // 判断用户名称是否存在
            this.$usernameInp. addEventListener('change', function(){
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.checkUsername(data);
                    }
                }
                sendAjax('http://localhost:8888/gitup/Ecommerce-website/register/php/check_username.php', params);
            }, false);
        },
        checkUsername: function(data) {
            if(data.code == 200) {
               this.$usernameInp.className = 'inp success';
               this.$loginBtn.disabled = '';
            } else {
                alert(data.msg);
                this.$usernameInp.className = 'inp error';
                this.$loginBtn.disabled = 'true';
            }
        },
        register: function(data) {
            if(data.code == 200) {
                //   注册成功
                alert('注册成功')
                location.href = '../home-page/hp.html';
             } else {
                alert('用户名已存在')
             }
        }
    }

}())