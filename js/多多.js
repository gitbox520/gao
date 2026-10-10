var rule = {
    title: '多多影音',
    host: 'https://tv.yydsys.cc',
    homeUrl: '/',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    filter_url: '{{fl.class}}',
    filter: {},
    searchUrl: '/index.php/vod/search.html?wd=**',
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
        'Cookie': ''
    },
    timeout: 10000,
    class_name: '多多电影&多多剧集&综艺&动漫&短剧&纪录',
    class_url: '1&2&3&4&5&20',
    play_parse: true,
    play_json: [{
        re: '*',
        json: {
            parse: 0,
            jx: 0
        }
    }],
	lazy:`js:
	input = panPlay(input,playObj.flag)
	`,
    推荐: 'div[class="module-item"];.video-name a&&Text;img&&data-src;;a&&href',
    一级: 'div[class="module-item"];.video-name a&&Text;img&&data-src;;a&&href',
    二级: {
        title: "h1&&Text",
        img: "img&&data-src",
        desc: ".video-info-items&&Text",
        content: ".video-info-items&&Text",
        tabs: `js: pdfh = jsp.pdfh;
pdfa = jsp.pdfa;
pd = jsp.pd;
TABS=[];
LISTS=[];
let d = pdfa(html, 'a');
let listurl = [];
log("多多影音详情页a标签数:" + d.length);
d.forEach(function(it) {
    let burl = pdfh(it, 'a&&href');
    if(!burl) return;
    if(burl.indexOf("pan.quark.cn")>-1 || burl.indexOf("pan.baidu.com")>-1 || burl.indexOf("pan.xunlei.com")>-1 || burl.indexOf("aliyundrive.com")>-1 || burl.indexOf("alipan.com")>-1 || burl.indexOf("115.com")>-1 || burl.indexOf("drive.uc.cn")>-1 || burl.indexOf("guangyapan.com")>-1){
        if(!listurl.includes(burl)){
            listurl.push(burl);
            log("多多影音捕获网盘:" + burl);
        }
    }
});
log("多多影音共捕获网盘链接数:" + listurl.length);
if (listurl.length){
    initPan();
    let alistVod = panDetailContent(vod ,listurl);
    log("多多影音解析结果 lists数:" + (alistVod.lists?alistVod.lists.length:0) + " error:" + (alistVod.error?alistVod.error:"无"));
    TABS = alistVod.tabs;
    LISTS = alistVod.lists;
    detailError = alistVod.error;
    if((!LISTS || LISTS.length==0) && listurl.length>0){
        log("多多影音 panDetailContent返回空(可能.iso等格式),启用手动构建");
        let quality = pdfh(html, '.module-tab-item.selected span&&Text') || '正片';
        let manualTabs = [];
        let manualLists = [];
        listurl.forEach(function(url){
            let panName='网盘';
            if(url.indexOf('quark.cn')>-1) panName='夸克网盘';
            else if(url.indexOf('baidu.com')>-1) panName='百度网盘';
            else if(url.indexOf('xunlei.com')>-1) panName='迅雷网盘';
            else if(url.indexOf('aliyun')>-1) panName='阿里云盘';
            else if(url.indexOf('115.com')>-1) panName='115网盘';
            else if(url.indexOf('drive.uc')>-1) panName='UC网盘';
            else if(url.indexOf('guangyapan')>-1) panName='光鸭云盘';
            manualTabs.push(panName);
            manualLists.push([[quality, url]]);
        });
        TABS = manualTabs;
        LISTS = manualLists;
        detailError = '';
        log("多多影音手动构建完成 tabs:" + JSON.stringify(TABS));
    }
}else{
    detailError = "多多影音未找到网盘链接";
    log("多多影音未找到任何网盘链接");
}
`,
lists: `js:`,
},
    搜索: 'div[class="module-item"];.video-name a&&Text;img&&data-src;;a&&href',
}
