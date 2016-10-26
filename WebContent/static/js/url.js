m?xwl=sys/portal/home/find
		
http://121.41.52.218:8080/towerprog/login/doauth?username=admin&password=123456
			
http://121.41.52.218:8080/towerprog/main/moduleTreedata
	[
	  {
	    "id": 3,
	    "parent": null,
	    "bigIcon": null,
	    "plugin": null,
	    "orderno": 1000,
	    "name": "进度管理",
	    "parentId": null,
	    "menuIcon": null,
	    "enabled": true,
	    "code": "progress",
	    "url": "",
	    "leaf": false,
	    "expanded": true,
	    "inframe": false,
	    "children": [
	      {
	        "id": 4,
	        "name": "导入基站",
	        "parentId": 3,
	        "orderno": 1010,
	        "bigIcon": null,
	        "plugin": null,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 3,
	          "bigIcon": null,
	          "code": "progress",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度管理",
	          "orderno": 1000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "code": "progress_importjz",
	        "menuIcon": null,
	        "enabled": true,
	        "url": "progress/importjz",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 5,
	        "parentId": 3,
	        "bigIcon": null,
	        "plugin": null,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 3,
	          "bigIcon": null,
	          "code": "progress",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度管理",
	          "orderno": 1000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "menuIcon": null,
	        "enabled": true,
	        "url": "progress/update",
	        "code": "progress_update",
	        "orderno": 1020,
	        "name": "进度更新",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 31,
	        "parentId": 3,
	        "bigIcon": null,
	        "url": "progress/alldrawing",
	        "plugin": null,
	        "name": "所有图纸",
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 3,
	          "bigIcon": null,
	          "code": "progress",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度管理",
	          "orderno": 1000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "code": "progress_alldrawing",
	        "orderno": 1035,
	        "menuIcon": null,
	        "enabled": true,
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 6,
	        "orderno": 1040,
	        "parentId": 3,
	        "code": "progress_drjdtb",
	        "bigIcon": null,
	        "url": "progress/drjdtb",
	        "plugin": null,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 3,
	          "bigIcon": null,
	          "code": "progress",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度管理",
	          "orderno": 1000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "menuIcon": null,
	        "enabled": true,
	        "name": "当日进度通报",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      }
	    ]
	  },
	  {
	    "id": 2,
	    "name": "进度报表",
	    "parent": null,
	    "code": "report",
	    "bigIcon": null,
	    "plugin": null,
	    "parentId": null,
	    "menuIcon": null,
	    "orderno": 2000,
	    "enabled": true,
	    "url": "",
	    "leaf": false,
	    "expanded": true,
	    "inframe": false,
	    "children": [
	      {
	        "id": 7,
	        "orderno": 2010,
	        "url": "report/zbtj",
	        "parentId": 2,
	        "bigIcon": null,
	        "plugin": null,
	        "code": "report_zbtj",
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 2,
	          "bigIcon": null,
	          "code": "report",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度报表",
	          "orderno": 2000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "menuIcon": null,
	        "enabled": true,
	        "name": "指标统计",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 8,
	        "parentId": 2,
	        "bigIcon": null,
	        "plugin": null,
	        "code": "report1",
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 2,
	          "bigIcon": null,
	          "code": "report",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度报表",
	          "orderno": 2000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "url": "report/report1",
	        "menuIcon": null,
	        "enabled": true,
	        "orderno": 2020,
	        "name": "已选址未及时进场",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 9,
	        "parentId": 2,
	        "bigIcon": null,
	        "plugin": null,
	        "orderno": 2030,
	        "code": "report2",
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 2,
	          "bigIcon": null,
	          "code": "report",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度报表",
	          "orderno": 2000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "url": "report/report2",
	        "menuIcon": null,
	        "enabled": true,
	        "name": "已进场未及时完工",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 10,
	        "orderno": 2040,
	        "parentId": 2,
	        "bigIcon": null,
	        "plugin": null,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 2,
	          "bigIcon": null,
	          "code": "report",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度报表",
	          "orderno": 2000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "code": "report3",
	        "menuIcon": null,
	        "enabled": true,
	        "name": "基础完工未及时装塔",
	        "url": "report/report3",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 11,
	        "parentId": 2,
	        "bigIcon": null,
	        "name": "引电方案未上报统计",
	        "plugin": null,
	        "code": "report4",
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 2,
	          "bigIcon": null,
	          "code": "report",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度报表",
	          "orderno": 2000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "menuIcon": null,
	        "orderno": 2050,
	        "enabled": true,
	        "url": "report/report4",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 12,
	        "parentId": 2,
	        "bigIcon": null,
	        "plugin": null,
	        "orderno": 2060,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 2,
	          "bigIcon": null,
	          "code": "report",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "进度报表",
	          "orderno": 2000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "code": "report5",
	        "name": "引电未完工统计",
	        "menuIcon": null,
	        "enabled": true,
	        "url": "report/report5",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      }
	    ]
	  },
	  {
	    "id": 13,
	    "parent": null,
	    "bigIcon": null,
	    "plugin": null,
	    "parentId": null,
	    "code": "finish",
	    "menuIcon": null,
	    "enabled": true,
	    "name": "完工报告",
	    "orderno": 3000,
	    "url": "",
	    "leaf": false,
	    "expanded": true,
	    "inframe": false,
	    "children": [
	      {
	        "id": 14,
	        "name": "完工情况",
	        "bigIcon": null,
	        "plugin": null,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 13,
	          "bigIcon": null,
	          "code": "finish",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "完工报告",
	          "orderno": 3000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "code": "finish_wgqk",
	        "menuIcon": null,
	        "enabled": true,
	        "parentId": 13,
	        "orderno": 3020,
	        "url": "finish/wgqk",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      }
	    ]
	  },
	  {
	    "id": 15,
	    "parent": null,
	    "bigIcon": null,
	    "plugin": null,
	    "code": "other",
	    "parentId": null,
	    "menuIcon": null,
	    "enabled": true,
	    "name": "其他模块",
	    "orderno": 4000,
	    "url": "",
	    "leaf": false,
	    "expanded": true,
	    "inframe": false,
	    "children": [
	      {
	        "id": 16,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 15,
	          "bigIcon": null,
	          "code": "other",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "其他模块",
	          "orderno": 4000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "url": "progress/compare",
	        "bigIcon": null,
	        "plugin": null,
	        "orderno": 4010,
	        "name": "进度比对",
	        "code": "progress_compare",
	        "menuIcon": null,
	        "enabled": true,
	        "parentId": 15,
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      }
	    ]
	  },
	  {
	    "id": 1,
	    "parent": null,
	    "bigIcon": null,
	    "plugin": null,
	    "code": "xtgl",
	    "parentId": null,
	    "menuIcon": null,
	    "enabled": true,
	    "name": "系统管理",
	    "url": "",
	    "orderno": 5000,
	    "leaf": false,
	    "expanded": true,
	    "inframe": false,
	    "children": [
	      {
	        "id": 17,
	        "parentId": 1,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 1,
	          "bigIcon": null,
	          "code": "xtgl",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "系统管理",
	          "orderno": 5000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "bigIcon": null,
	        "orderno": 5010,
	        "code": "cjdw",
	        "plugin": null,
	        "url": "admin/cjdw",
	        "menuIcon": null,
	        "enabled": true,
	        "name": "承建单位",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 24,
	        "parentId": 1,
	        "orderno": 5015,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 1,
	          "bigIcon": null,
	          "code": "xtgl",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "系统管理",
	          "orderno": 5000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "bigIcon": null,
	        "plugin": null,
	        "name": "监理公司",
	        "code": "jlgs",
	        "menuIcon": null,
	        "enabled": true,
	        "url": "admin/jlgs",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      },
	      {
	        "id": 19,
	        "parentId": 1,
	        "parent": {
	          "class": "com.spark.portal.Module",
	          "id": 1,
	          "bigIcon": null,
	          "code": "xtgl",
	          "enabled": true,
	          "menuIcon": null,
	          "name": "系统管理",
	          "orderno": 5000,
	          "parent": null,
	          "plugin": null,
	          "url": ""
	        },
	        "url": "user",
	        "bigIcon": null,
	        "orderno": 5040,
	        "code": "user",
	        "menuIcon": null,
	        "plugin": "spark-portal",
	        "enabled": true,
	        "name": "用户管理",
	        "leaf": true,
	        "expanded": true,
	        "inframe": false
	      }
	    ]
	  }
	]

http://121.41.52.218:8080/towerprog/page/progress_importjz?xwlt=1
	(function(contextOptions,contextOwner){
		var app={};
		app.contextOwner=contextOwner;
		app.tab1=app._tab1=new Ext.tab.Panel({appScope:app,itemId:"tab1",items:[
		{appScope:app,xtype:"form",title:"新建基站导入",height:128,baseParams:{abc:123},layout:"absolute",width:456,itemId:"form1",items:[
		{appScope:app,xtype:"filefield",labelWidth:120,allowBlank:false,width:360,labelAlign:"right",itemId:"file1",fieldLabel:"选择新建基站文件",y:24,x:32
		},
		{appScope:app,xtype:"button",text:"导入新建基站",width:88,itemId:"successBtn",y:64,x:184,listeners:{
		click:function(button,e,options){
		//文件上传必须使用form控件,form控件可以嵌套在任何容器中，包括panel,window和viewport等。
		if (!Wb.verify(app.form1)) //验证值是否合法
		  return;
		//上传数据。此方法采用multipart/form-data编码上传数据，因此后台必须通过request.getAttribute(itemId)获取指定控件数据
		Wb.upload({
		  form: app.form1, //上传的表单控件，必选项
		  //showProgress: true, //显示上传进度条
		  url: ctxPath +'/new_towerinfo/import_jz',
		  //out:[panel1, grid1],以控件列表的方式上传指定控件值
		  showMask: true,//上传过程不显示mask
		  message: '正在导入中...',
		  //mask: app.form1, //mask遮盖对象，未指定默认为全屏，前1.5秒透明遮盖。
		  reset: true,
		  params: { //以json对象表达的参数列表
		    foo: 'bar',
		    num: 123,
		    date: new Date()
		  },
		  //上传成功之后的回调方法
		  success: function(form, action, data) {
		    console.log(action);
		    //value为服务器返回的值，action.response.responseText为服务器返回的原始值
		    Wb.info(action.result.message);
		  }
		});
		}
		}
		}
		]},
		{appScope:app,xtype:"form",title:"共享基站导入",height:128,baseParams:{abc:123},layout:"absolute",width:456,itemId:"form2",items:[
		{appScope:app,xtype:"filefield",labelWidth:120,allowBlank:false,width:360,labelAlign:"right",itemId:"file1",fieldLabel:"选择共享基站文件",y:24,x:32
		},
		{appScope:app,xtype:"button",text:"导入共享基站",width:88,itemId:"successBtn",y:64,x:184,listeners:{
		click:function(button,e,options){
		//文件上传必须使用form控件,form控件可以嵌套在任何容器中，包括panel,window和viewport等。
		if (!Wb.verify(app.form2)) //验证值是否合法
		  return;
		//上传数据。此方法采用multipart/form-data编码上传数据，因此后台必须通过request.getAttribute(itemId)获取指定控件数据
		Wb.upload({
		  form: app.form2, //上传的表单控件，必选项
		  //showProgress: true, //显示上传进度条
		  url: ctxPath +'/share_towerinfo/import_jz',
		  //out:[panel1, grid1],以控件列表的方式上传指定控件值
		  //showMask: false,上传过程不显示mask
		  //message: '正在导入中...',
		  //mask: app.form2, //mask遮盖对象，未指定默认为全屏，前1.5秒透明遮盖。
		  reset: true,
		  params: { //以json对象表达的参数列表
		    foo: 'bar',
		    num: 123,
		    date: new Date()
		  },
		  //上传成功之后的回调方法
		  success: function(form, action, value) {
		    //value为服务器返回的值，action.response.responseText为服务器返回的原始值
		    Wb.info(action.result.message);
		  }
		});
		}
		}
		}
		]}
		]});

		return app;})();
	
	
	http://121.41.52.218:8080/towerprog/page/progress_update?xwlt=1
		(function(contextOptions,contextOwner){
			var app={};
			app.contextOwner=contextOwner;

			app.store_cjdw_tj=app._store_cjdw_tj=new Ext.data.Store({appScope:app,autoLoad:true,url:ctxPath +"/cjdw/listdata?q={\"dwlx\":\"TJ\"}"
			});
			app.store_cjdw_tt=app._store_cjdw_tt=new Ext.data.Store({appScope:app,autoLoad:true,url:ctxPath +"/cjdw/listdata?q={\"dwlx\":\"TT\"}"
			});
			app.store_cjdw_yd=app._store_cjdw_yd=new Ext.data.Store({appScope:app,autoLoad:true,url:ctxPath +"/cjdw/listdata?q={\"dwlx\":\"YD\"}"
			});
			app.win_newtower=app._win_newtower=new Ext.window.Window({appScope:app,title:"更新新建基站",height:500,autoScroll:true,dialog:true,itemId:"win_newtower",modal:true,listeners:{
			ok:function(win,options){
			win.editHandler();
			}
			},items:[
			{appScope:app,xtype:"form",itemId:"form1",items:[
			{appScope:app,xtype:"fieldset",title:"基站基本信息",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 0px 10px;' } },margin:"5",itemId:"fieldset_base",items:[
			{appScope:app,xtype:"displayfield",width:250,itemId:"qyjl",fieldLabel:"区域经理"
			},
			{appScope:app,xtype:"displayfield",width:250,itemId:"qy",fieldLabel:"区域"
			},
			{appScope:app,xtype:"displayfield",itemId:"zm",fieldLabel:"站名"
			},
			{appScope:app,xtype:"displayfield",itemId:"xmbh",fieldLabel:"项目编号"
			},
			{appScope:app,xtype:"displayfield",itemId:"gcpc",fieldLabel:"工程批次"
			},
			{appScope:app,xtype:"displayfield",itemId:"jd",fieldLabel:"经度"
			},
			{appScope:app,xtype:"displayfield",itemId:"wd",fieldLabel:"纬度"
			}
			]},
			{appScope:app,xtype:"fieldset",title:"选址阶段",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 2px 10px;' } },margin:"5",itemId:"fieldset_xz",items:[
			{appScope:app,xtype:"displayfield",width:250,itemId:"xzr",fieldLabel:"选址人"
			},
			{appScope:app,xtype:"checkbox",width:250,itemId:"xzwc",fieldLabel:"选址完成"
			},
			{appScope:app,xtype:"displayfield",itemId:"xzwcsj",fieldLabel:"选址完成时间",renderer:function(value,displayfield){
			return Ext.Date.format(value, 'Y-m-d');
			}
			}
			]},
			{appScope:app,xtype:"fieldset",title:"土建开工",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 2px 10px;' } },margin:"5",itemId:"fieldset_tjkg",items:[
			{appScope:app,xtype:"displayfield",itemId:"dkdw",fieldLabel:"地勘单位",
			nestField:'dwmc'
			},
			{appScope:app,xtype:"checkbox",width:250,itemId:"dk",fieldLabel:"是否地勘"
			},
			{appScope:app,xtype:"displayfield",itemId:"sjdw",fieldLabel:"设计单位",
			nestField:'dwmc'
			},
			{appScope:app,xtype:"checkbox",itemId:"sj",fieldLabel:"是否设计"
			},
			{appScope:app,xtype:"displayfield",itemId:"tjdw",fieldLabel:"土建施工单位",
			nestField:'dwmc'
			},
			{appScope:app,xtype:"checkbox",itemId:"jc",fieldLabel:"进场"
			},
			{appScope:app,xtype:"datefield",itemId:"kgsj",fieldLabel:"开工时间"
			}
			]},
			{appScope:app,xtype:"fieldset",title:"土建完工",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 2px 10px;' } },margin:"5",itemId:"fieldset_tjwg",items:[
			{appScope:app,xtype:"checkbox",width:250,itemId:"jcwg",fieldLabel:"基础完工"
			},
			{appScope:app,xtype:"datefield",itemId:"jcwgsj",fieldLabel:"基础完工时间"
			}
			]},
			{appScope:app,xtype:"fieldset",title:"铁塔安装",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 2px 10px;' } },margin:"5",itemId:"fieldset_ttaz",items:[
			{appScope:app,xtype:"displayfield",itemId:"ttdw",fieldLabel:"铁塔单位",
			nestField:'dwmc'
			},
			{appScope:app,xtype:"checkbox",itemId:"ttaz",fieldLabel:"铁塔安装"
			},
			{appScope:app,xtype:"datefield",itemId:"ttazsj",fieldLabel:"铁塔安装时间"
			},
			{appScope:app,xtype:"combo",displayField:"V",valueField:"K",forceSelection:true,store:{fields:["K","V"],sorters:"K",data:[{"K":"jydgt","V":"简易灯杆塔"},{"K":"dgjgt","V":"灯杆景观塔"},{"K":"mgwgtx","V":"美化外观天线"},{"K":"sgt","V":"三管塔"},{"K":"dgt","V":"单管塔"},{"K":"lmbg","V":"楼面抱杆"},{"K":"jgt","V":"景观塔"},{"K":"fsst","V":"仿生树塔"},{"K":"fzmhtx","V":"方柱美化天线"},{"K":"ptdmt","V":"普通地面塔"},{"K":"ptlmt","V":"普通楼面塔"},{"K":"mhtx","V":"美化天线"},{"K":"ldt","V":"路灯塔"}]},keyName:"tx",itemId:"tx",fieldLabel:"塔型"
			},
			{appScope:app,xtype:"textfield",itemId:"tg",fieldLabel:"塔高"
			}
			]},
			{appScope:app,xtype:"fieldset",title:"引电施工",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 2px 10px;' } },margin:"5",itemId:"fieldset_ydsg",items:[
			{appScope:app,xtype:"displayfield",width:250,itemId:"yddw",fieldLabel:"引电单位",
			nestField:'dwmc'
			},
			{appScope:app,xtype:"checkbox",itemId:"ydfazd",fieldLabel:"引电方案制定"
			},
			{appScope:app,xtype:"datefield",itemId:"ydfazdsj",fieldLabel:"方案制定时间"
			},
			{appScope:app,xtype:"checkbox",itemId:"ydwg",fieldLabel:"引电完工"
			},
			{appScope:app,xtype:"combo",displayField:"V",valueField:"K",forceSelection:true,store:{fields:["K","V"],sorters:"K",data:[{"K":"t","V":"转供电"},{"K":"d","V":"直供电"}]},keyName:"ydfs",itemId:"ydfs",fieldLabel:"引电方式"
			},
			{appScope:app,xtype:"textfield",itemId:"gdhh",fieldLabel:"供电户号"
			}
			]},
			{appScope:app,xtype:"fieldset",title:"配套施工",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 2px 10px;' } },margin:"5",itemId:"fieldset_ptsg",items:[
			{appScope:app,xtype:"checkbox",width:250,itemId:"ptazwg",fieldLabel:"配套安装完工"
			},
			{appScope:app,xtype:"textfield",width:500,itemId:"bz",fieldLabel:"备注",flex:1,
			colspan:2
			}
			]}
			]}
			]});
			app.win_sharetower=app._win_sharetower=new Ext.window.Window({appScope:app,title:"更新共享基站",dialog:true,itemId:"win_sharetower",modal:true,listeners:{
			ok:function(win,options){
			win.editHandler();
			}
			},items:[
			{appScope:app,xtype:"form",itemId:"form1",items:[
			{appScope:app,xtype:"fieldset",title:"基站基本信息",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 0px 10px;' } },margin:"5",itemId:"fieldset_base",items:[
			{appScope:app,xtype:"displayfield",width:250,itemId:"qyjl_mc",fieldLabel:"区域经理"
			},
			{appScope:app,xtype:"displayfield",width:250,itemId:"qy",fieldLabel:"区域"
			},
			{appScope:app,xtype:"displayfield",itemId:"zm",fieldLabel:"站名"
			},
			{appScope:app,xtype:"displayfield",itemId:"xmbh",fieldLabel:"项目编号"
			},
			{appScope:app,xtype:"displayfield",itemId:"gcpc",fieldLabel:"工程批次"
			},
			{appScope:app,xtype:"displayfield",itemId:"jd",fieldLabel:"经度"
			},
			{appScope:app,xtype:"displayfield",itemId:"wd",fieldLabel:"纬度"
			},
			{appScope:app,xtype:"displayfield",itemId:"gxmbzd",fieldLabel:"共享目标站点"
			},
			{appScope:app,xtype:"displayfield",itemId:"clzdgs",fieldLabel:"存量站点归属"
			}
			]},
			{appScope:app,xtype:"fieldset",title:"其他信息",layout:{type:'table',columns:3,tdAttrs: { style: 'padding: 2px 10px;' } },margin:"5",itemId:"fieldset_qt",items:[
			{appScope:app,xtype:"checkbox",width:250,itemId:"tmgzswg",fieldLabel:"天面改造完工"
			},
			{appScope:app,xtype:"checkbox",width:250,itemId:"ydwg",fieldLabel:"引电完工"
			}
			]}
			]}
			]});
			app.viewport1=app._viewport1=new Ext.container.Container({appScope:app,layout:"fit",itemId:"viewport1",items:[
			{appScope:app,xtype:"tabpanel",itemId:"tab1",items:[
			{appScope:app,xtype:"grid",title:"新建基站数据",itemId:"gridNewTower",listeners:{
			itemdblclick:function(view,record,item,index,e,options){
			app.editBtn.fireEvent('click');
			}
			},
			store:{appScope:app,autoLoad:true,url:ctxPath +"/new_towerinfo/listdata"
			},
			columns:[
			{appScope:app,xtype:"rownumberer",itemId:"rownum"
			},
			{appScope:app,text:"站名",width:180,dataIndex:"zm",itemId:"zm"
			},
			{appScope:app,text:"区域",width:50,dataIndex:"qy",itemId:"qy"
			},
			{appScope:app,text:"区域经理",width:80,dataIndex:"qyjl",itemId:"qyjl"
			},
			{appScope:app,text:"项目编号",width:150,dataIndex:"xmbh",itemId:"xmbh"
			},
			{appScope:app,text:"工程批次",width:180,dataIndex:"gcpc",itemId:"gcpc"
			},
			{appScope:app,text:"经度",align:"right",width:80,dataIndex:"jd",itemId:"jd"
			},
			{appScope:app,text:"纬度",align:"right",width:80,dataIndex:"wd",itemId:"wd"
			},
			{appScope:app,text:"选址人",width:60,dataIndex:"xzr",itemId:"xzr"
			},
			{appScope:app,text:"选址完成",width:80,dataIndex:"xzwc",itemId:"xzwc",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"选址完成时间",dataIndex:"xzwcsj",itemId:"xzwcsj"
			},
			{appScope:app,text:"地勘",dataIndex:"dk",itemId:"dk",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"地勘单位",dataIndex:"dkdw",itemId:"dkdw",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?value.dwmc:'';  
			}
			},
			{appScope:app,text:"设计",dataIndex:"sj",itemId:"sj",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"设计单位",dataIndex:"sjdw",itemId:"sjdw",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?value.dwmc:'';  
			}
			},
			{appScope:app,text:"铁塔单位",dataIndex:"ttdw",itemId:"ttdw",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?value.dwmc:'';  
			}
			},
			{appScope:app,text:"土建施工单位",dataIndex:"tjdw",itemId:"tjdw",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?value.dwmc:'';  
			}
			},
			{appScope:app,text:"进场",dataIndex:"jc",itemId:"jc",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"开工时间",dataIndex:"kgsj",itemId:"kgsj"
			},
			{appScope:app,text:"基础完工",dataIndex:"jcwg",itemId:"jcwg",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"基础完工时间",dataIndex:"jcwgsj",itemId:"jcwgsj"
			},
			{appScope:app,text:"铁塔单位",dataIndex:"ttdw",itemId:"ttdw",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?value.dwmc:'';  
			}
			},
			{appScope:app,text:"铁塔安装",dataIndex:"ttaz",itemId:"ttaz",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"铁塔安装时间",dataIndex:"ttazsj",itemId:"ttazsj"
			},
			{appScope:app,renderer:Wb.kvRenderer,keyItems:[{"K":"jydgt","V":"简易灯杆塔"},{"K":"dgjgt","V":"灯杆景观塔"},{"K":"mgwgtx","V":"美化外观天线"},{"K":"sgt","V":"三管塔"},{"K":"dgt","V":"单管塔"},{"K":"lmbg","V":"楼面抱杆"},{"K":"jgt","V":"景观塔"},{"K":"fsst","V":"仿生树塔"},{"K":"fzmhtx","V":"方柱美化天线"},{"K":"ptdmt","V":"普通地面塔"},{"K":"ptlmt","V":"普通楼面塔"},{"K":"mhtx","V":"美化天线"},{"K":"ldt","V":"路灯塔"}],text:"塔型",keyName:"tx",dataIndex:"tx",itemId:"tx"
			},
			{appScope:app,renderer:Wb.kvRenderer,keyItems:[{"K":"jydgt","V":"简易灯杆塔"},{"K":"dgjgt","V":"灯杆景观塔"},{"K":"mgwgtx","V":"美化外观天线"},{"K":"sgt","V":"三管塔"},{"K":"dgt","V":"单管塔"},{"K":"lmbg","V":"楼面抱杆"},{"K":"jgt","V":"景观塔"},{"K":"fsst","V":"仿生树塔"},{"K":"fzmhtx","V":"方柱美化天线"},{"K":"ptdmt","V":"普通地面塔"},{"K":"ptlmt","V":"普通楼面塔"},{"K":"mhtx","V":"美化天线"},{"K":"ldt","V":"路灯塔"}],text:"塔高",keyName:"tx",dataIndex:"tg",itemId:"tg"
			},
			{appScope:app,text:"引电单位",dataIndex:"yddw",itemId:"yddw",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?value.dwmc:'';  
			}
			},
			{appScope:app,text:"引电方案制订",dataIndex:"ydfazd",itemId:"ydfazd",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"引电方案时间",dataIndex:"ydfazdsj",itemId:"ydfazdsj"
			},
			{appScope:app,text:"引电完工",dataIndex:"ydwg",itemId:"ydwg",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,renderer:Wb.kvRenderer,keyItems:[{"K":"t","V":"转供电"},{"K":"d","V":"直供电"}],text:"引电方式",keyName:"ydfs",dataIndex:"ydfs",itemId:"ydfs"
			},
			{appScope:app,text:"供电户号",dataIndex:"gdhh",itemId:"gdhh"
			},
			{appScope:app,text:"配套安装完工",dataIndex:"ptazwg",itemId:"ptazwg",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"全部完工",dataIndex:"qbwg",itemId:"qbwg",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"交付",dataIndex:"jf",itemId:"jf",renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
			return value?'是':'否';
			}
			},
			{appScope:app,text:"备注",dataIndex:"bz",itemId:"bz"
			}
			],
			tbar:{appScope:app,xtype:"toolbar",itemId:"tbar",items:[
			{appScope:app,text:"更新",itemId:"editBtn",iconCls:"record_edit_icon",tooltip:"更新新建基站信息",listeners:{
			click:function(item,e,options){
			  Wb.edit(app.gridNewTower, {
			    win: app._win_newtower,
			    url: ctxPath +'/new_towerinfo/update',
			    titleField: 'zm'
			  });
			}
			}
			},
			"-",
			{appScope:app,xtype:"textfield",labelAlign:"right",itemId:"query",listeners:{
			specialkey:function(text,e,options){
			if (e.getKey() == e.ENTER) {
			    this.nextNode().fireEvent('click');
			}
			}
			}
			},
			{
			  appScope:app,xtype:"combo",displayField:"V",valueField:"K",forceSelection:true,
			  store:{fields:["K","V"],sorters:"K",data:[{"K":"镜湖区","V":"镜湖区"},{"K":"芜湖县","V":"芜湖县"},{"K":"南陵县","V":"南陵县"},{"K":"鸠江区","V":"鸠江区"},{"K":"三山区","V":"三山区"},{"K":"弋江区","V":"弋江区"},{"K":"无为县","V":"无为县"},{"K":"繁昌县","V":"繁昌县"}]},
			  labelWidth:45,keyName:"qy",width:150,labelAlign:"right",itemId:"qy",fieldLabel:"区域"
			},
			{
			  appScope:app,xtype:"combo",labelWidth:70,displayField:"gcpc",width:250,valueField:"gcpc",labelAlign:"right",itemId:"gcpc",fieldLabel:"工程批次",
			  store:{appScope:app,autoLoad:true,url:ctxPath +"/report/gcpc_listdata?lx=n"}
			},
			{appScope:app,xtype:"button",itemId:"btnQuery",iconCls:"seek_icon",listeners:{
			click:function(button,e,options){
			app.gridNewTower.store.load({
			  out: this.findParentByType('toolbar')
			});
			}
			}
			},
			{appScope:app,xtype:"button",text:"导出",itemId:"btnExport",iconCls:"db_export_icon",listeners:{
			click:function(button,e,options){
			var tb = this.findParentByType('toolbar');
			var qy = tb.queryById("qy").getRawValue();
			var gcpc = tb.queryById("gcpc").getRawValue();

			window.location.href=ctxPath +'/new_towerinfo/exportdata?query='+app.query.getValue()+'&qy='+ qy +'&gcpc='+ gcpc;
			}
			}
			},
			{
			  appScope:app,xtype:"button",text:"删除",itemId:"btnRemove",iconCls:"record_delete_icon",listeners:{
			  click:function(button,e,options){
			      var recs = app.gridNewTower.getSelection();
			      if (!recs.length) {
			        Wb.warn('请选择需要删除的记录。');
			        return;
			      }
			      Wb.confirm('确定要删除选择的 ' + recs.length + ' 条记录吗？', function() {
			          Wb.request({
			              url: ctxPath+'/new_towerinfo/delete',
			              params: Wb.apply({
			                destroy: Wb.getData(recs)
			              }),
			              success: function() {
			                Wb.remove(app.gridNewTower, recs);
			              }
			          });
			      });
			    }
			  }
			}
			]}
			},
			{appScope:app,xtype:"grid",title:"共享基站数据",itemId:"gridShareTower",listeners:{
			itemdblclick:function(view,record,item,index,e,options){
			app.edit.fireEvent('click');
			}
			},
			store:{appScope:app,autoLoad:true,url:ctxPath +"/share_towerinfo/listdata"
			},
			tbar:{appScope:app,xtype:"toolbar",itemId:"tbar",items:[
			{appScope:app,text:"更新",itemId:"edit",iconCls:"record_edit_icon",tooltip:"更新共享基站信息",listeners:{
			click:function(item,e,options){
			Wb.edit(app.gridShareTower, {
			  win: app._win_sharetower,
			  url: ctxPath +'/share_towerinfo/update',
			  titleField: 'zm'
			});

			}
			}
			},
			{appScope:app,text:"-",itemId:"item1"
			},
			{appScope:app,xtype:"textfield",labelAlign:"right",itemId:"query",listeners:{
			specialkey:function(text,e,options){
			if (e.getKey() == e.ENTER) {
			    this.nextNode().fireEvent('click');
			}
			}
			}
			},
			{appScope:app,xtype:"button",itemId:"btnQuery",iconCls:"seek_icon",listeners:{
			click:function(button,e,options){
			app.gridNewTower.store.load({
			  out: this.findParentByType('toolbar')
			});
			}
			}
			}
			]},
			columns:[
			{appScope:app,text:"站名",dataIndex:"zm",itemId:"zm"
			},
			{appScope:app,text:"区域",dataIndex:"qy",itemId:"qy"
			},
			{appScope:app,text:"区域经理",dataIndex:"qyjl",itemId:"qyjl"
			},
			{appScope:app,text:"项目编号",dataIndex:"xmbh",itemId:"xmbh"
			},
			{appScope:app,text:"工程批次",dataIndex:"gcpc",itemId:"gcpc"
			},
			{appScope:app,text:"经度",dataIndex:"jd",itemId:"jd"
			},
			{appScope:app,text:"纬度",dataIndex:"wd",itemId:"wd"
			},
			{appScope:app,text:"共享目标站点",dataIndex:"gxmbzd",itemId:"gxmbzd"
			},
			{appScope:app,text:"存量站点归属",dataIndex:"clzdgs",itemId:"clzdgs"
			}
			]
			}
			]}
			]});
			return app;})();
	
	http://121.41.52.218:8080/towerprog/cjdw/listdata?q={%22dwlx%22:%22TJ%22}
	Querystring:	q:{"dwlx":"TJ"} 
	Formdata: page:1
	offset:0
	max:50
		http://121.41.52.218:8080/towerprog/cjdw/listdata?q={%22dwlx%22:%22TT%22}
			q:{"dwlx":"TT"}
	page:1
	offset:0
	max:50
http://121.41.52.218:8080/towerprog/cjdw/listdata?q={%22dwlx%22:%22YD%22}
	q:{"dwlx":"YD"}
	page:1
	offset:0
	max:50
	
http://121.41.52.218:8080/towerprog/new_towerinfo/listdata
	page:1
	offset:0
	max:50				
http://121.41.52.218:8080/towerprog/report/gcpc_listdata?lx=n
	page:1
	offset:0
	max:50
	
	共享基站			
http://121.41.52.218:8080/towerprog/share_towerinfo/listdata
