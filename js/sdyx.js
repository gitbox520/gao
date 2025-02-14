var rule={
    title:'闪电优汐',
    模板:'AlistShare',
    host:'http://1.95.79.193',
    url:'/index.php/vod/show/id/fyclass/page/fypage.html',
    filterable:0,//是否启用分类筛选,
    filter_url:'',
    filter: {},
    searchUrl:'/index.php/vod/search/wd/**.html',
    searchable:2,
    class_parse: 'ul.nav-menu-items&&li.nav-menu-item;a.nav-link&&Text;a.nav-link&&href;/(\\d+).html',
    推荐:'.module-list;.module-items&&.module-item;*;*;*;*',
    double:true,
    一级:'.module-list&&.module-items&&.module-item;.module-item-cover&&.module-item-pic&&a&&title;.module-item-cover&&.module-item-pic&&img&&data-src;.module-item-text&&Text;.module-item-cover&&.module-item-pic&&a&&href',
    二级:{
        "title": "h1&&Text;.video-info-aux a:eq(0)&&Text",
        "img": ".video-cover img&&data-src",
        "desc": ".module-row-title&&p&&Text;.video-info-main&&.video-info-item:eq(2) a&&Text;.video-info-aux a:eq(3)&&Text;.video-info-main&&.video-info-item:eq(1)&&Text;.video-info-main&&.video-info-item:eq(0)&&Text",
        "content": ".sqjj_a&&Text",
        "panarray": "div.scroll-box-y&&.module-row-title",
        "panhref": "p&&Text",
    },
    搜索:'.module-search-item;h3&&Text;*;.video-serial&&Text;.video-info-header&&h3&&a&&href',
}
