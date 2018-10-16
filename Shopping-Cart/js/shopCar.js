var  shopList = (function(){
    return {
        init: function(ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            this.getData();
        },
        event: function() {
            var _this = this;
            this.$ele.addEventListener('click', function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                // 给添加购物车按钮添加事件
                if(target.nodeName === 'A' && target.className === 'shopBtn') {
                    // 获取商品id
                    var id = target.getAttribute('attr-id');
                    // 获取商品数量
                    var count = target.parentNode.querySelector('.shop-count').value;
                    _this.addCar(id, count);
                }
            }, false);
        },
        // 获取数据
        getData: function() {
            var _this = this;
            var params = {
                url: 'json/shop.json',
                success: function (data){
                    _this.insertData(data);
                }
            }
            sendAjax(params);
        },
        // 渲染数据
        insertData: function(data) {
            data = data.data;
            var arr = [];
            for(var i = 0; i < data.length; i++) {
               arr.push(` <div class="top_row">
                                <div class="col col_check"><i class="iconfont icon-anonymous-iconfont"></i></div>
                                <div class="col col_img"><a href="../Commodity-details/cd.html"> <img src="images/car1.jpg" alt=""></a></div>
                                <div class="col col_name"> <a href="../Commodity-details/cd.html">小米8 SE 全网通版 4GB内存 64GB 亮红</a></div>
                                <div class="col col_price"> 1699元 </div>
                                <div class="col col_num col_btn">
                                    <div class="num_con">
                                        <a class="minus" href="javascript:void(0)">-</a>
                                        <input class="shop-count" type="number" value="1">
                                        <a class="plus" href="javascript:void(0)">+</a>
                                    </div>                                      
                                </div>
                                <div class="col col_total"> 1699元 </div>
                                <div class="col col_action">
                                    <a class="btn" href="javascript:void(0)">
                                        <i class="iconfont icon-guanbi"></i>
                                    </a>
                                </div>
                            </div>`)
            }
            this.$ele.innerHTML = arr.join('');
        },
        // 商品加入到购物车
        addCar: function(id, count) {
            // 把商品数据添加到本地, 提供给购物车页面使用
            // 尽量占用少的属性名称,所以我们把商品数据都保存在一个字段里
            // 我们要把数据都放在shopList里面, 数据类型应该是一个数组, 把多个商品信息存放进去

            // 添加第一个商品时,可能localStorage 不存在这个属性
            // 本地存储都是字符串的形式
            var shopList = localStorage.shopList || '[]';
            // 转化为对象进行操作
            shopList = JSON.parse(shopList);

            // shopList = [{id: 1, count: 1}, {id: 2, count: 2}];

            //  判断原有数据中,是否已经添加过该商品, 如果添加过,直接进行累加, 如果没有添加一条新的数据
            for(var j = 0; j < shopList.length; j++) {
                if(shopList[j].id === id) {
                    // 证明商品已经存在
                    shopList[j].count = Number(shopList[j].count) + Number(count);
                    break;
                }
            }
            if(j === shopList.length) {
                // 商品不存在, 添加一条新数据
                shopList.push({id: id, count: count});
                
            }
            localStorage.shopList = JSON.stringify(shopList);



        }
    }
}())

var shopCar = (function(){
    
    return {
        init: function(ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            this.getShopList();
        },
        event: function() {
            var _this = this;
            this.$ele.oninput = function(e) {
                if(e.target.className == 'shop-count') {
                    // 获取商品总价
                    var _parent =  e.target.parentNode
                    // console.log(e.target.value,_parent.querySelector('.shop-price'));
                    _parent.querySelector('.col_total').innerHTML = e.target.value * _parent.querySelector('.col_price').innerHTML;

                }
            }
        },
        // 获取商品数据
        getShopList: function() {
            var _this = this;
            var params = {
                url: 'json/shop.json',
                success: function (data){
                    // 把商品数据放到实例的属性上
                   _this.shopList = data.data;
                   _this.getData();
                }
            }
            sendAjax(params);
        },
        // 获取购物车数据
        getData: function() {
            this.carShopList = JSON.parse(localStorage.shopList || '[]');
            this.insertData(this.carShopList);
        },
        // 把购物车数据添加到页面中
        insertData: function(data) {
            // console.log(this.shopList);
            // console.log(data);
            var arr = [];
            // [{id: 1, count: 2}]
            for(var i = 0; i < data.length; i++) {
                // 通过id获取商品信息
                var shop;
                for(var j = 0; j < this.shopList.length; j++) {
                    if(this.shopList[j].id == data[i].id) {
                        // 获取商品信息
                        shop = this.shopList[j];
                        break;
                    }
                }
                arr.push( `<div class="top_row">
                                <div class="col col_check"><i class="iconfont icon-anonymous-iconfont"></i></div>
                                <div class="col col_img"><a href="../Commodity-details/cd.html"> <img src="images/car1.jpg" alt=""></a></div>
                                <div class="col col_name"> <a href="../Commodity-details/cd.html">小米8 SE 全网通版 4GB内存 64GB 亮红</a></div>
                                <div class="col col_price"> 1699元 </div>
                                <div class="col col_num col_btn">
                                    <div class="num_con">
                                        <a class="minus" href="javascript:void(0)">-</a>
                                        <input class="shop-count" type="number" value="1">
                                        <a class="plus" href="javascript:void(0)">+</a>
                                    </div>                                      
                                </div>
                                <div class="col col_total"> 1699元 </div>
                                <div class="col col_action">
                                    <a class="btn" href="javascript:void(0)">
                                        <i class="iconfont icon-guanbi"></i>
                                    </a>
                                </div>
                            </div>`)
            }
            this.$ele.innerHTML = arr.join('');
        }
    }


}())