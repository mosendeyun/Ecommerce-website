// function getele(ele,attr,num){
//     if(typeof ele=='string'){
//         ele=document.querySelector(ele)
//     }
//     for(var i=0;i<num;i++){
//         var first=ele.firstElementChild.cloneNode(true);
//         ele.appendChlid(first)
//     }

// }
// function getele(ele,targetObj,nul){
//     if(typeof ele=='string'){
//         ele=document.querySelector(ele)
//     }
//     for(var attr in targetObj){
//         for(var i=0;i<num;i++){
//             var first=targetObj
//         }
//     }
// }
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr]
    }else{
        return ele.currentstyle[attr]
    }
}