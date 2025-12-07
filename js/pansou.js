var rule = {
	title:'盘搜',
	host:'https://so.252035.xyz',
	homeUrl:'/',
    url:'/?pg=fypage&class=fyclass&douban=1311269',
    class_name:'爱好&热门电影&热播剧集&热播综艺&电影筛选&电视筛选&电影榜单&电视榜单',
    class_url:'interests&hot_gaia&tv_hot&show_hot&movie&tv&rank_list_movie&rank_list_tv',
	filter_url:'',
	filter:{
	},
	searchUrl: '/api/search?cloud_types=quark,uc,115,aliyun&kw=**',
	searchable:2,
	quickSearch:0,
	filterable:0,
    图片来源:'@Referer=https://api.douban.com/@User-Agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/113.0.0.0%20Safari/537.36',
    headers:{
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        "Referer": "https://servicewechat.com/wx2f9b06c1de1ccfca/84/page-frame.html"
	},
	timeout:5000,
	play_parse:true,
	lazy:`js: 
input = panPlay(input,playObj.flag)
`,
	limit:6,
    推荐:'js:let d=[];let douban_api_host="http://api.douban.com/api/v2";let miniapp_apikey="0ac44ae016490db2204ce0a042db2916";const count=30;function miniapp_request(path,query){try{let url=douban_api_host+path;query.apikey=miniapp_apikey;fetch_params.headers=Object.assign({},oheaders,{"Host":"frodo.douban.com"});url=buildUrl(url,query);let html=fetch(url,fetch_params);return JSON.parse(html)}catch(e){print("发生了错误:"+e.message);return{}}}function subject_real_time_hotest(){try{let res=miniapp_request("/subject_collection/subject_real_time_hotest/items",{});let lists=[];let arr=res.subject_collection_items||[];arr.forEach(function(item){if(item.type==="movie"||item.type==="tv"){let rating=item.rating?item.rating.value:"暂无评分";let honnor=(item.honor_infos||[]).map(function(it){return it.title}).join("|");lists.append({vod_id:"msearch:"+TYPE,vod_name:item.title||"",vod_pic:item.pic.normal,vod_remarks:rating+" "+honnor})}});return lists}catch(e){print("发生了错误:"+e.message);return[]}}VODS=subject_real_time_hotest();print(VODS);',
    一级:'js:let d=[];let douban=input.split("douban=")[1].split("&")[0];let douban_api_host="http://api.douban.com/api/v2";let miniapp_apikey="0ac44ae016490db2204ce0a042db2916";const count=30;function miniapp_request(path,query){try{let url=douban_api_host+path;query.apikey=miniapp_apikey;fetch_params.headers=Object.assign({},oheaders,{"Host":"frodo.douban.com"});url=buildUrl(url,query);let html=fetch(url,fetch_params);if(/request_error/.test(html)){print(html)}return JSON.parse(html)}catch(e){print("发生了错误:"+e.message);return{}}}function cate_filter(d,douban){douban=douban||"";try{let res={};if(MY_CATE==="interests"){if(douban){let status=MY_FL.status||"mark";let subtype_tag=MY_FL.subtype_tag||"";let year_tag=MY_FL.year_tag||"全部";let path="/user/"+douban+"/interests";res=miniapp_request(path,{type:"movie",status:status,subtype_tag:subtype_tag,year_tag:year_tag,start:(MY_PAGE-1)*count,count:count})}else{return{}}}else if(MY_CATE==="hot_gaia"){let sort=MY_FL.sort||"recommend";let area=MY_FL.area||"全部";let path="/movie/"+MY_CATE;res=miniapp_request(path,{area:area,sort:sort,start:(MY_PAGE-1)*count,count:count})}else if(MY_CATE==="tv_hot"||MY_CATE==="show_hot"){let stype=MY_FL.type||MY_CATE;let path="/subject_collection/"+stype+"/items";res=miniapp_request(path,{start:(MY_PAGE-1)*count,count:count})}else if(MY_CATE.startsWith("rank_list")){let id=MY_CATE==="rank_list_movie"?"movie_real_time_hotest":"tv_real_time_hotest";id=MY_FL.榜单||id;let path="/subject_collection/"+id+"/items";res=miniapp_request(path,{start:(MY_PAGE-1)*count,count:count})}else{let path="/"+MY_CATE+"/recommend";let selected_categories;let tags;let sort;if(Object.keys(MY_FL).length>0){sort=MY_FL.sort||"T";tags=Object.values(MY_FL).join(",");if(MY_CATE==="movie"){selected_categories={"类型":MY_FL.类型||"","地区":MY_FL.地区||""}}else{selected_categories={"类型":MY_FL.类型||"","形式":MY_FL.类型?MY_FL.类型+"地区":"","地区":MY_FL.地区||""}}}else{sort="T";tags="";if(MY_CATE==="movie"){selected_categories={"类型":"","地区":""}}else{selected_categories={"类型":"","形式":"","地区":""}}}let params={tags:tags,sort:sort,refresh:0,selected_categories:stringify(selected_categories),start:(MY_PAGE-1)*count,count:count};res=miniapp_request(path,params)}let result={page:MY_PAGE,pagecount:Math.ceil(res.total/count),limit:count,total:res.total};let items=[];if(/^rank_list|tv_hot|show_hot/.test(MY_CATE)){items=res["subject_collection_items"]}else if(MY_CATE==="interests"){res["interests"].forEach(function(it){items.push(it.subject)})}else{items=res.items}let lists=[];items.forEach(function(item){if(item.type==="movie"||item.type==="tv"){let rating=item.rating?item.rating.value:"";let rat_str=rating||"暂无评分";let title=item.title;let honor=item.honor_infos||[];let honor_str=honor.map(function(it){return it.title}).join("|");let vod_obj={vod_name:title!=="未知电影"?title:"暂不支持展示",vod_pic:item.pic.normal,vod_remarks:rat_str+" "+honor_str};let vod_obj_d={url:item.type+"$"+item.id,title:title!=="未知电影"?title:"暂不支持展示",pic_url:item.pic.normal,desc:rat_str+" "+honor_str};lists.push(vod_obj);d.push(vod_obj_d)}});result.list=lists;return result}catch(e){print(e.message)}return{}}let res=cate_filter(d,douban);setResult2(res);',
	二级:`js:
	let id=input;
	let title="";
	let pic="";
	let typeName="";
	let dec=id;
	let remark="";
	let vod={vod_id:id,vod_name:title,vod_pic:pic,type_name:typeName,vod_remarks:remark,vod_content:dec};
	
	initPan();
	let panVod = panDetailContent(vod ,[input]);
	TABS = panVod.tabs
	LISTS = panVod.lists
	detailError = panVod.error
	vod["vod_play_from"]=panVod.tabs.join("$$$");

	for (var i in LISTS) {
		if (LISTS.hasOwnProperty(i)) {
			try {
			LISTS[i] = LISTS[i].map(function (it) {
				return it.split('$').slice(0, 2).join('$');
			});
			} catch (e) {
			print('格式化LISTS发生错误:' + e.message);
			}
		}
	}
	vod_play_url = LISTS.map(function (it) {
		return it.join('#');
	}).join("$$$");
	vod["vod_play_url"]=vod_play_url;
	VOD=vod;
	`,
	搜索:`js:
	function get_result(){
		// 优先使用自定义URL，如果没有配置则使用默认searchUrl
		var c = rule.params;
		let searchUrl = '';
		if (c && c.trim() !== '') {
			// rule.params是经过URL编码的，需要先解码
			try {
				searchUrl = decodeURIComponent(c);
			} catch (e) {
				// 如果解码失败，使用原始值
				searchUrl = c;
			}
		} else {
			searchUrl = rule.searchUrl;
		}
		const url = searchUrl.replace('**', encodeURIComponent(KEY));
		let response;
		try {
			response = request(url);
			const result = JSON.parse(response);
			
			// 检查返回状态
			if (!result || result.code !== 0 || !result.data) {
				return [];
			}
			
			const data = result.data;
			const videos = [];
			const processedLinks = new Set(); // 用于去重
			
			// 处理 merged_by_type 数据
			if (data.merged_by_type) {
				for (const type in data.merged_by_type) {
					if (data.merged_by_type.hasOwnProperty(type)) {
						const links = data.merged_by_type[type];
						if (Array.isArray(links)) {
							for (const link of links) {
								if (!link.url) continue;
								
								// 生成唯一标识用于去重
								const linkKey = type + '|' + link.url;
								if (processedLinks.has(linkKey)) continue;
								processedLinks.add(linkKey);
								
								// 构建资源名称
								let vodName = link.note || link.title || '未知资源';
								
								// 处理图片
								let pic = '';
								if (link.images && Array.isArray(link.images) && link.images.length > 0) {
									pic = link.images[0];
								}
								
								// 构建备注信息
								let remark = type.toUpperCase();
								if (link.source) {
									remark += (remark ? ' | ' : '') + link.source;
								}
								
								// 构建完整的链接（包含提取码）
								let vodId = link.url;
								
								videos.push({
									vod_id: vodId,
									vod_name: vodName,
									vod_pic: pic,
									vod_remarks: remark,
								});
							}
						}
					}
				}
			}
			
			return videos;
		} catch (e) {
			print('搜索发生错误: ' + e.message);
			return [];
		}
	}
	
	VODS = get_result();
`,
}

