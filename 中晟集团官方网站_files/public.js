/**
 * 公共js文件，页面公用函数
 * 下载页面头部，注意实现方式
 */
var AjaxType= 'GET';

/*二级导航 下边线动画*/
$(function () {
    //二级导航动画
    $('.J-nav5')&&$('.J-nav5')[0] && navAnimate();
    //返回顶部
    $('#toTop')&&$('#toTop')[0]&& toTop();
    //加载新闻
    $('.J-more')&&$('.J-more')[0]&&loadMore();
});

/*一下为私有方法*/

//导航动画
function navAnimate() {
    var subNav = $('.J-nav5');
    var brdItem = subNav.find('.hover'),left = brdItem.css('left');
    subNav.find('li').not('.hover,.active').hover(function (e) {
        var that = $(this), index = that.index(), x;
        var a = that.find('a');
        if (e.type == 'mouseenter') {x = 220 * index + 'px';} else {x = left;}
        brdItem.stop(true).animate({left: x}, 500, 'easeOutBounce');
    });
}
//返回顶部
function toTop(){
    $(window).on('scroll',function(){
        var topBtn=$('#toTop');
        var scrollH=$(document).scrollTop();
        topBtn.toggle(scrollH>400);
    }).scroll();
}
//加载更多
function loadMore() {
    $('.J-more').on('click',function(){
        var that=$(this),span=that.find('span'),list=$('.J-list');
        var page=that.data('page')||2;

        Locked();
        span.data('oldTxt',that.text());
        span.text('加载中');
        $.ajax({
            url:that.attr('data-url'),
            type:AjaxType,
            data:{'page':page},
            success:function(data){
                if(data==''){
                    Alert("已加载完成");
                    that.fadeOut(100);
                }else{
                    list.append($(data));
                    span.text(that.data('oldTxt'));
                    that.data("page",page+1);
                }
            },
            error:function(err){
                span.text(that.data('oldTxt'));
                window.location.reload();
            },
            complete:function(){
                UnLocked();
            }
        });
    });
}



/*一下为公共方法*/

//函数：弹出提示层（提示信息）
function Alert(v,b){
    layer.msg(v);
}

//函数：锁屏幕（是否UNBind）
function Locked(b){
    b==undefined&&(b=!0);
    $("div.locked")[0]&&$("div.locked").remove();
    $("body").append("<div class=\"locked\"></div>");
    this.rLocked=function(){$("div.locked").css({height:$(document).height(),width:$(window).width(),backgroundPosition:"center "+parseInt($(window).height()/2+$(window).scrollTop())+"px"})};
    this.rLocked(),b&&$(window).unbind("resize"),$(window).bind("resize",function(){this.rLocked()});
    $("div.locked").fadeTo(200,0.6);
}

//函数：解锁屏幕（无参数）
function UnLocked(){
    $("div.locked").remove();
}

//函数：滚动条位置
function ScrollPosition() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { top: t, left: l, width: w, height: h };
}