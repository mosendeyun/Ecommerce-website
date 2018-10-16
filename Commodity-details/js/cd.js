var scollTop=(function(){
    var $left = document.querySelector(".pd_left");
    window.onscroll = function() {
        // 获取滚动高度
        var y= document.documentElement.scrollTop
        // console.log(y)
      if(y>255){
          $left.style.top=(y-255)+'px'
      }else{
        $left.style.top=0 
      }

      if(y>=1027){
          $left.style.top=772+'px'
      }
    }
}())