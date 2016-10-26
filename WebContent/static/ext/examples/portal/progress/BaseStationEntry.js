// 基站信息列表
Ext.define('App.BaseStationQueryWindow', {
	extend : 'Ext.window.Window',
	dataId:0,
	constructor : function(config) {
		var me = this;
		//alert('id' + config.dataId);
		var basicInformation = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "需求编号", name: "requirementNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
                    { fieldLabel: "项目编号", name: "projectNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },
                    { fieldLabel: "站点编号", name: "stationNo", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "站名", name: "stationName", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
                    { fieldLabel: "区域", name: "area", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },
                    { fieldLabel: "区域经理", name: "areaMgr", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "工程批次", name: "projectBatchNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
                    { fieldLabel: "经度", name: "longitude", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" } ,
                    { fieldLabel: "纬度", name: "latitude", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                }]
		});
		
		var addressPhase = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "选址类型", name: "xzType", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
                    { fieldLabel: "选址人", name: "xzName", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },
                    { fieldLabel: "选址完成", name: "xzFinish", xtype: "checkbox", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "选址完成时间", name: "xzFinishTime", format : 'Y-m-d', xtype: "datefield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" }  
                   ]  
                }
                ]
		});
		
		var civilEngeneer = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "地勘单位", name: "dkUnit", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
                    { fieldLabel: "是否地勘", name: "dkFinish", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5",labelAlign:"right" },
                    { fieldLabel: "设计单位", name: "sjUnit", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "是否设计", name: "sjFinish", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5", labelAlign: "right" },  
                    { fieldLabel: "土建施工单位", name: "tjsgUnit", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },
                    { fieldLabel: "进场", name: "tjsgIn", xtype: "checkbox", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [ 
                    { fieldLabel: "开工时间", name: "kgTime", xtype: "datefield", format : 'Y-m-d',labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },                                         
                    { fieldLabel: "基础完工", name: "jcFinish", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5", labelAlign: "right" },  
                    { fieldLabel: "基础完工时间", name: "jcFinishTime", xtype: "datefield", format : 'Y-m-d',labelWidth: 90, margin: "5 0 0 5", labelAlign: "right" } ]  
                }]
		});
		
		var towerInstall = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "铁塔单位", name: "towerUnit", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
                    { fieldLabel: "铁塔安装", name: "towerFinish", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5",labelAlign:"right" },
                    { fieldLabel: "铁塔安装时间", name: "towerFinishTime", xtype: "datefield", format : 'Y-m-d',labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "塔型", name: "towerType", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
                    { fieldLabel: "塔高", name: "towerHeight", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" }
                ]  
                } 
                ]
		});
		
	
		var electInstall = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "引电设计单位", name: "ydsjUnit", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
                    { fieldLabel: "引电设计出图", name: "ydsjFinish", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5",labelAlign:"right" },
                    { fieldLabel: "引电单位", name: "ydUnit", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "引电方案制定", name: "ydProgramFinish", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5", labelAlign: "right" },  
                    { fieldLabel: "方案制定时间", name: "ydProgramTime", xtype: "datefield", format : 'Y-m-d',labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },
                    { fieldLabel: "引电完工", name: "ydFinish", xtype: "checkbox", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "引电方式", name: "ydType", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
                    { fieldLabel: "供电户号", name: "gdNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" } 
                ]  
                }]
		});
		
		var supportItems = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "配套安装完工", name: "ptInstallFinish", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5",labelAlign:"right" },  
                    { fieldLabel: "动环施工单位", name: "dhUnit", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },
                    { fieldLabel: "动环施工完成", name: "dhFinish", xtype: "checkbox", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "备注", name: "memo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" }  
                    ]  
                }]
		});
		
		var delivery = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "全部完工", name: "totalFinish",  xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5",labelAlign:"right" },  
                    { fieldLabel: "交付项", name: "delivery", xtype: "textfield", width: 524, labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" }
                ]  
                }]
		});
		
		config = config || {};
		Ext.apply(config, {
			id: 'baseStationEntry',
			title : '更新新建基站',
			width : 840,
			height : 600,
			bodyPadding : '5 5',
			defaults: {autoScroll: true}, 
			layout : 'fit',
			modal : true,
			items : [ { 
				   xtype : 'form',
				   layout: 'form', 
				   items:[{xtype: 
					   "fieldset",
					   layout: {type:"hbox"},
					   height: 140, 
					   title: "基站基本信息", 
					   margin: "5 0 5 0",
					   items: [basicInformation]   
				   },
				   {xtype: 
					   "fieldset",
					   layout: {type:"hbox"}, 
					   height: 100, 
					   title: "选址阶段", 
					   margin: "5 0 5 0",
					   items: [addressPhase]   
				   },
				   {xtype: 
					   "fieldset",
					   layout: {type:"hbox"},
					   height: 140, 
					   title: "土建施工", 
					   margin: "5 0 5 0",
					   items: [civilEngeneer]   
				   },
				   {xtype: 
					   "fieldset",
					   layout: {type:"hbox"},
					   height: 100, 
					   title: "铁塔安装", 
					   margin: "5 0 5 0",
					   items: [towerInstall]   
				   },
				   {xtype: 
					   "fieldset",
					   layout: {type:"hbox"},
					   height: 140, 
					   title: "引电施工", 
					   margin: "5 0 5 0",
					   items: [electInstall]   
				   },
				   { 
					   layout: 'form', 
					   items:[{xtype: 
						   "fieldset",
						   layout: {type:"hbox"},
						   height: 100, 
						   title: "配套施工", 
						   margin: "5 0 5 0",
						   items: [supportItems]   
					   }]
				   },
				   { 
					   layout: 'form', 
					   items:[{xtype: 
						   "fieldset",
						   layout: {type:"hbox"},
						   height: 60, 
						   title: "交付验收", 
						   margin: "10 0 10 0",
						   items: [delivery, {
								xtype : 'hiddenfield',
								name : 'id'
							}]   
					   }]
				   }]
				}],
				buttons : [ '->', {
					id : 'baseStationEntry-save',
					text : '保存',
					iconCls : 'icon-save',
					width : 80,
					handler : function(btn, eventObj) {
						var window = btn.up('window');
						var form = window.down('form').getForm();
						if (/*form.isValid()*/me.validateForm(form)) {
							window.getEl().mask('数据保存中，请稍候...');
							var vals = form.getValues();
							Ext.ux.custom.TimeoutController.request({
								url : appBaseUri + '/sys/baseStation/saveBaseStation',
								params : {
									id : vals['id'],
									requirementNo: vals['requirementNo'],
									projectNo : vals['projectNo'],
									stationNo : vals['stationNo'],
									stationName : vals['stationName'],
									area : vals['area'],
									dhUnit: vals['dhUnit'],
									dhFinish : vals['dhFinish'],
									memo : vals['memo'],
									totalFinish : vals['totalFinish'],
									delivery : vals['delivery'],
									areaMgr: vals['areaMgr'],
									projectBatchNo : vals['projectBatchNo'],
									longitude : vals['longitude'],
									latitude : vals['latitude'],
									xzType : vals['xzType'],
									xzName: vals['xzName'],
									xzFinish : vals['xzFinish'],
									xzFinishTime : vals['xzFinishTime'],
									dkUnit : vals['dkUnit'],
									dkFinish : vals['dkFinish'],
									sjUnit: vals['sjUnit'],
									sjFinish : vals['sjFinish'],
									tjsgUnit : vals['tjsgUnit'],
									tjsgIn : vals['tjsgIn'],
									kgTime: vals['kgTime'],
									jcFinish : vals['jcFinish'],
									jcFinishTime: vals['jcFinishTime'],
									towerUnit : vals['towerUnit'],
									towerFinish : vals['towerFinish'],
									towerFinishTime : vals['towerFinishTime'],
									towerType : vals['towerType'],
									towerHeight: vals['towerHeight'],
									ydsjUnit : vals['ydsjUnit'],
									ydsjFinish : vals['ydsjFinish'],
									ydUnit : vals['ydUnit'],
									ydProgramFinish : vals['ydProgramFinish'],
									ydProgramTime: vals['ydProgramTime'],
									ydFinish : vals['ydFinish'],
									ydType : vals['ydType'],
									gdNo : vals['gdNo'],
									ptInstallFinish : vals['ptInstallFinish']
								},
								method : "POST",
								success : function(response) {
									if (response.responseText != '') {
										var res = Ext.JSON.decode(response.responseText);
										//globalObject.errTip(res.success);
										if (res.success) {
											globalObject.msgTip('操作成功！');
											Ext.getCmp('baseStationlist-grid').getStore().reload();
										} else {
											globalObject.errTip('记录不存在！');
										}
									}
								},
								failure : function(response) {
									globalObject.errTip('操作失败！');
								}
							});
							window.getEl().unmask();
							window.close();
						}
					}
				}, {
					id : 'baseStationEntry-cancel',
					text : '取消',
					iconCls : 'icon-cancel',
					width : 80,
					handler : function() {
						this.up('window').close();
					}
				}
				, '->' ]
			
		});
		App.BaseStationQueryWindow.superclass.constructor.call(this, config);
	},
	validateForm: function(form) {
		if (form.findField("xzFinish").getValue() && form.findField("xzFinishTime").getValue() == null) {
			globalObject.errTip("请输入选址完成时间!");
			return false;
		}
		if (form.findField("tjsgIn").getValue() && form.findField("kgTime").getValue() == null) {
			globalObject.errTip("请输入开工时间!");
			return false;
		}
		if (form.findField("jcFinish").getValue() && form.findField("jcFinishTime").getValue() == null) {
			globalObject.errTip("请输入基础完工时间!");
			return false;
		}
		if (form.findField("towerFinish").getValue() && form.findField("towerFinishTime").getValue() == null) {
			globalObject.errTip("请输入铁塔安装时间!");
			return false;
		}
		if (form.findField("ydProgramFinish").getValue() && form.findField("ydProgramTime").getValue() == null) {
			globalObject.errTip("请输入方案制定时间!");
			return false;
		}
		return true;
	}
});



Ext.define('Forestry.app.progress.BaseStationEntry', {
	extend : 'Ext.ux.custom.GlobalGridPanel',
	id : 'baseStationlist-grid',
	region : 'center',
	initComponent : function() {
		var me = this;
		
		var projectBatchNoStore = Ext.create('Ext.data.JsonStore', {
			proxy : {
				type : 'ajax',
				url : appBaseUri + '/sys/baseStation/getGroupByColumnName?colName=project_batch_no',
				reader : {
					type : 'json',
					root : 'list',
					idProperty : 'id'
				}
			},
			fields : [ 'id', 'value' ]
		});
		
		var areaStore = Ext.create('Ext.data.JsonStore', {
			proxy : {
				type : 'ajax',
				url : appBaseUri + '/sys/baseStation/getGroupByColumnName?colName=area',
				reader : {
					type : 'json',
					root : 'list',
					idProperty : 'id'
				}
			},
			fields : [ 'id', 'value' ]
		});
		
		var areaMgrStore = Ext.create('Ext.data.JsonStore', {
			proxy : {
				type : 'ajax',
				url : appBaseUri + '/sys/baseStation/getGroupByColumnName?colName=area_mgr',
				reader : {
					type : 'json',
					root : 'list',
					idProperty : 'id'
				}
			},
			fields : [ 'id', 'value' ]
		});
		
		var tjsgUnitStore = Ext.create('Ext.data.JsonStore', {
			proxy : {
				type : 'ajax',
				url : appBaseUri + '/sys/baseStation/getGroupByColumnName?colName=tjsg_unit',
				reader : {
					type : 'json',
					root : 'list',
					idProperty : 'id'
				}
			},
			fields : [ 'id', 'value' ]
		});
		var ydUnitStore = Ext.create('Ext.data.JsonStore', {
			proxy : {
				type : 'ajax',
				url : appBaseUri + '/sys/baseStation/getGroupByColumnName?colName=yd_unit',
				reader : {
					type : 'json',
					root : 'list',
					idProperty : 'id'
				}
			},
			fields : [ 'id', 'value' ]
		});
		Ext.define('ModelList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ {
				name : 'id',
				type : 'int'
			}, 'requirementNo', 'projectNo', 'stationNo',
			'stationName', 'area', 'areaMgr', 'projectBatchNo',
			'longitude', 'latitude', 'xzType', 'xzName', 
			{name:'xzFinish', type:'boolean'}, 
			{name: 'xzFinishTime', type: 'date', convert:dateFormat},
			'dkUnit', {name:'dkFinish', type:'boolean'}, 'sjUnit',
			{name:'sjFinish', type:'boolean'}, 'tjsgUnit', 'tjsgIn',
			{name: 'kgTime', type: 'date', convert:dateFormat},
			{name:'jcFinish', type:'boolean'}, 
			{name: 'jcFinishTime', type: 'date', convert:dateFormat},
			'towerUnit',
			{name:'towerFinish', type:'boolean'}, 
			{name: 'towerFinishTime', type: 'date', convert:dateFormat},
			 'towerType',
			'towerHeight', 'ydsjUnit', {name:'ydsjFinish', type:'boolean'}, 
			'ydUnit', {name:'ydProgramFinish', type:'boolean'}, 
			{name: 'ydProgramTime', type: 'date', convert:dateFormat},
			{name:'ydFinish', type:'boolean'},'ydType','gdNo',{name:'ptInstallFinish', type:'boolean'},
			'dhUnit',{name:'dhFinish', type:'boolean'},'memo',
			{name:'totalFinish', type:'boolean'},'delivery']
		});

		var store = me.createStore({
			modelName : 'ModelList',
			proxyUrl : appBaseUri + '/sys/baseStation/getBaseStation',
			proxyDeleteUrl : appBaseUri + '/sys/baseStation/deleteBaseStation',
			proxyExportUrl : appBaseUri + '/sys/baseStation/exportBaseStations',
			extraParams : me.extraParams
		});

		var filters = {
			ftype : 'filters',
			encode : true,
			filters : [ {
				type : 'int',
				dataIndex : 'id'
			}, {
				type : 'string',
				dataIndex : 'name'
			}, {
				type : 'string',
				dataIndex : 'description'
			}, {
				type : 'string',
				dataIndex : 'descriptionNoHtml'
			} ]
		}
		
		function dateFormat(value){ 
		    if(null != value){ 
		        return Ext.Date.format(new Date(value),'Y-m-d'); 
		    }else{ 
		        return null; 
		    }
		}
		    
		var columns = [ {
			text : "ID",
			dataIndex : 'id'
		}, {
			text : "需求编号",
			dataIndex : 'requirementNo'
		}, {
			text : "项目编号",
			dataIndex : 'projectNo'
		}, {
			text : "站点编号",
			dataIndex : 'stationNo'
		}, {
			text : "站名",
			dataIndex : 'stationName'
		}, {
			text : "区域",
			dataIndex : 'area'
		}, {
			text : "区域经理",
			dataIndex : 'areaMgr'
		}, {
			text : "工程批次",
			dataIndex : 'projectBatchNo'
		}, {
			text : "经度",
			dataIndex : 'longitude'
		}, {
			text : "纬度",
			dataIndex : 'latitude'
		}, {
			text : "选址类型",
			dataIndex : 'xzType'
		}, {
			text : "选址人",
			dataIndex : 'xzName'
		}, {
			text : "选址完成",
			dataIndex : 'xzFinish',
			xtype: 'booleancolumn',
			trueText: '是',
			falseText: '否'
		}, {
			text : "选址完成时间",
			dataIndex : 'xzFinishTime',
			xtype: 'datecolumn',
			renderer: Ext.util.Format.dateRenderer('Y-m-d')
		}, {
			text : "地勘单位",
			dataIndex : 'dkUnit'
		}, {
			text : "是否地勘",
			dataIndex : 'dkFinish',
			xtype: 'booleancolumn',
			trueText: '是',
			falseText: '否'
		}, {
			text : "设计单位",
			dataIndex : 'sjUnit'
		}, {
			text : "是否设计",
			dataIndex : 'sjFinish',
			xtype: 'booleancolumn',
			trueText: '是',
			falseText: '否'
				
		}, {
			text : "土建施工单位",
			dataIndex : 'tjsgUnit'
		}, {
			text : "进场",
			dataIndex : 'tjsgIn',
			xtype: 'booleancolumn',
			trueText: '是',
			falseText: '否'
		},
		 {
			text : "开工时间",
			dataIndex : 'kgTime',
			xtype: 'datecolumn',
			renderer: Ext.util.Format.dateRenderer('Y-m-d')
			},
			{
			text : "基础完工",
			dataIndex : 'jcFinish',
			xtype: 'booleancolumn',
			trueText: '是',
			falseText: '否'
		},
		 {
			text : "基础完工时间",
			dataIndex : 'jcFinishTime',
			xtype: 'datecolumn',
			renderer: Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				text : "铁塔单位",
				dataIndex : 'towerUnit'
			}, {
				text : "铁塔安装",
				dataIndex : 'towerFinish',
				xtype: 'booleancolumn',
				trueText: '是',
				falseText: '否'
			}, {
				text : "铁塔安装时间",
				dataIndex : 'towerFinishTime',
				xtype: 'datecolumn',
				renderer: Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				text : "塔型",
				dataIndex : 'towerType'
			}, {
				text : "塔高",
				dataIndex : 'towerHeight'
			}, {
				text : "引电设计单位",
				dataIndex : 'ydsjUnit'
			}, {
				text : "引电设计出图",
				dataIndex : 'ydsjFinish',
				xtype: 'booleancolumn',
				trueText: '是',
				falseText: '否'
			}, {
				text : "引电单位",
				dataIndex : 'ydUnit'
			}, {
				text : "引电方案制定",
				dataIndex : 'ydProgramFinish',
				xtype: 'booleancolumn',
				trueText: '是',
				falseText: '否'
			},
			 {
					text : "方案制定时间",
					dataIndex : 'ydProgramTime',
					xtype: 'datecolumn',
					renderer: Ext.util.Format.dateRenderer('Y-m-d')
				}, {
					text : "引电完工",
					dataIndex : 'ydFinish',
					xtype: 'booleancolumn',
					trueText: '是',
					falseText: '否'
						
				}, {
					text : "引电方式",
					dataIndex : 'ydType'
				}, {
					text : "供电户号",
					dataIndex : 'gdNo'
				}, {
					text : "配套安装完工",
					dataIndex : 'ptInstallFinish',
					xtype: 'booleancolumn',
					trueText: '是',
					falseText: '否'
				}, {
					text : "动环施工单位",
					dataIndex : 'dhUnit'
				}, {
					text : "动环施工完成",
					dataIndex : 'dhFinish',
					xtype: 'booleancolumn',
					trueText: '是',
					falseText: '否'
				}, {
					text : "备注",
					dataIndex : 'memo'
				}, {
					text : "全部完工",
					dataIndex : 'totalFinish',
					xtype: 'booleancolumn',
					trueText: '是',
					falseText: '否'
				}, {
					text : "交付项",
					dataIndex : 'delivery'
				}
				
		];

		var ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
			id: 'baseStationTT',
			items : [ {
				xtype : 'textfield',
				id : 'query-stationName',
				name : 'stationName',
				fieldLabel : '站名',
				labelWidth : 30,
				width : '10%'
			}, {
				xtype : 'combobox',
				id : 'query-area',
				name : 'area',
				store: areaStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				fieldLabel : '区域',
				labelWidth : 30,
				width : '10%'
			}, {
				xtype : 'combobox',
				fieldLabel : '工程批次',
				id : 'query-projectBatchNo',
				name : 'projectBatchNo',
				store : projectBatchNoStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '13%',
				maxWidth : 320
			},{
				xtype : 'combobox',
				fieldLabel : '区域经理',
				id : 'query-areaMgr',
				name : 'areaMgr',
				store : areaMgrStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '13%',
				maxWidth : 320
			}, 
			{
				xtype : 'combobox',
				fieldLabel : '土建单位',
				id : 'query-tjsgUnit',
				name : 'tjsgUnit',
				store : tjsgUnitStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '13%',
				maxWidth : 320
			},{
				xtype : 'combobox',
				fieldLabel : '引电单位',
				id : 'query-ydUnit',
				name : 'ydUnit',
				store : ydUnitStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '13%',
				maxWidth : 320
			},
			{
				xtype : 'button',
				text : '查询',
				iconCls : 'icon-search',
				//disabled : !globalObject.haveActionMenu(me.cButtons, 'Query'),
				width : '10%',
				maxWidth : 60,
				handler : function(btn, eventObj) {
					var searchParams = {
						stationName : Ext.getCmp('query-stationName').getValue(),
						area : Ext.getCmp('query-area').getValue(),
						areaMgr : Ext.getCmp('query-areaMgr').getValue(),
						projectBatchNo : Ext.getCmp('query-projectBatchNo').getValue(),
						tjsgUnit : Ext.getCmp('query-tjsgUnit').getValue(),
						ydUnit : Ext.getCmp('query-ydUnit').getValue()
					};
					Ext.apply(store.proxy.extraParams, searchParams);
					store.loadPage(1);
				}
			}, {
				xtype : 'button',
				text : '重置',
				iconCls : 'icon-reset',
				width : '10%',
				maxWidth : 60,
				handler : function(btn, eventObj) {
					Ext.getCmp('query-stationName').setValue(null);
					Ext.getCmp('query-area').setValue(null);
					Ext.getCmp('query-areaMgr').setValue(null);
					Ext.getCmp('query-projectBatchNo').setValue(null);
					Ext.getCmp('query-tjsgUnit').setValue(null);
					Ext.getCmp('query-ydUnit').setValue(null);
					store.currentPage = 1;
				}
			},
			{
				xtype : 'button',
				itemId : 'btnExport',
				iconCls : 'icon-export',
				text : '导出',
				scope : this,
				// disabled : !globalObject.haveAction(me.cName + 'Export'),
				handler : function() {
					me.onExportClick();
				}
			},
			{
				xtype : 'button',
				itemId : 'btnExportAll',
				iconCls : 'icon-export',
				text : '导出所选',
				scope : this,
				// disabled : !globalObject.haveAction(me.cName + 'Export'),
				handler : function() {
					me.onExportClick(false);
				}
			},
			{
				xtype : 'button',
				itemId : 'btnExport',
				iconCls : 'icon-export',
				text : '导出全部',
				scope : this,
				// disabled : !globalObject.haveAction(me.cName + 'Export'),
				handler : function() {
					me.onExportClick(true);
				}
			},
			{
				xtype : 'button',
				itemId : 'btnDelete',
				iconCls : 'icon-delete',
				text : '删除',
				scope : this,
				disabled : true,
				handler : me.onDeleteClick
			}]
		});
		
		Ext.apply(this, {
			store : store,
			tbar : ttoolbar,
			// features : [ filters ],
			columns : columns,
			listeners : {
				itemdblclick : function(dataview, record, item, index, e) {
					/*var grid = this;
					var id = grid.getSelectionModel().getSelection()[0].get('id');
					var gridRecord = grid.getStore().findRecord('id', id);
					var win = new App.BaseStationQueryWindow({
						hidden : true
					});
					var form = win.down('form').getForm();
					form.loadRecord(gridRecord);
					form.findField('requirementNo').setReadOnly(true);
					//form.findField('name').setReadOnly(true);
					//form.findField('plantTime').setReadOnly(true);
					//form.findField('entryTime').setReadOnly(true);
					//form.findField('forestryTypeName').setReadOnly(true);
					win.show();
					*/
				}
			}
		});

		store.loadPage(1);

		this.callParent(arguments);
	}/*,
	onAddClick : function() {
		var me = this;
		globalObject.openTab('addforestrytype', '添加树木种类', Ext.create('Forestry.app.forestryManage.ForestryTypeEntry', {
			listTabId : me.getTabId()
		}));
	},
	onEditClick : function() {
		var me = this;
		if (mainTab.getComponent('tabeditforestrytype')) {
			mainTab.getComponent('tabeditforestrytype').destroy();
		}
		globalObject.openTab('editforestrytype', '修改树木种类', Ext.create('Forestry.app.forestryManage.ForestryTypeEntry', {
			dataId : dataId,
			listTabId : me.getTabId()
		}));
	},*/,
	onViewClick : function() {
		var grid = Ext.getCmp("baseStationlist-grid");
		var dataId = grid.getSelectionModel().getSelection()[0].get('id');
		var gridRecord = grid.getStore().findRecord('id', dataId);
		//alert(gridRecord);
		var win = new App.BaseStationQueryWindow({
			hidden : true,
			dataId : dataId
		});
		var form = win.down('form').getForm();
		form.loadRecord(gridRecord);
		form.findField('requirementNo').setReadOnly(true);
		win.show();
		/*globalObject.openTab('editforestrytype', '修改树木种类', Ext.create('Forestry.app.forestryManage.ForestryTypeEntry', {
			dataId : dataId,
			listTabId : dataId
		}));*/
	},
	onDeleteClick : function(isAll) {
		var me = this;
		globalObject.confirmTip('删除的记录不可恢复，继续吗？', function(btn) {
			if (btn == 'yes') {
				var s = me.getSelectionModel().getSelection();
				var ids = [];
				var idProperty = me.idProperty || 'id';
				for (var i = 0, r; r = s[i]; i++) {
					ids.push(r.get(idProperty));
				}
				Ext.ux.custom.TimeoutController.request({
					url : me.proxyDeleteUrl,
					params : {
						ids : ids.join(',') || singleId
					},
					success : function(response) {
						if (response.responseText != '') {
							var res = Ext.JSON.decode(response.responseText);
							if (res.success) {
								globalObject.msgTip('操作成功！');
								// Ext.example.msg('系统信息', '{0}', "操作成功！");
								me.getStore().reload();
							} else {
								globalObject.errTip('操作失败！' + res.msg);
							}
						}
					}
				});
			}
		});
	},
	onExportClick : function(isAll) {
		var me = this;
		if(isAll) {
			//Modify export all records to export current queried records
			/*var grid = Ext.getCmp("baseStationlist-grid");
			var store = grid.getStore();
			var ids = [];
			 store.each(function(record) {   
				 ids.push(record.get("id"));
			 });
			//location.href = me.proxyExportUrl + "?ids=0";
			 location.href = me.proxyExportUrl + "?ids=" + ids;*/
			var stationName = Ext.getCmp('query-stationName').getValue();
			var area = Ext.getCmp('query-area').getValue();
			var projectBatchNo = Ext.getCmp('query-projectBatchNo').getValue();
			var areaMgr = Ext.getCmp('query-areaMgr').getValue();
			var tjsgUnit = Ext.getCmp('query-tjsgUnit').getValue();
			var ydUnit = Ext.getCmp('query-ydUnit').getValue();
			if (area == null) area = '';
			if (projectBatchNo == null) projectBatchNo = '';
			if (areaMgr == null) areaMgr = '';
			if (tjsgUnit == null) tjsgUnit = '';
			if (ydUnit == null) ydUnit = '';
			location.href = appBaseUri + '/sys/baseStation/exportAllBaseStations?stationName=' + stationName + "&area=" + area + "&projectBatchNo=" + projectBatchNo + "&areaMgr=" + areaMgr + "&tjsgUnit=" + tjsgUnit + "&ydUnit=" + ydUnit;

		} else {
			var s = me.getSelectionModel().getSelection();
			var ids = [];
			var idProperty = me.idProperty || 'id';
			for (var i = 0, r; r = s[i]; i++) {
				ids.push(r.get(idProperty));
			}
			if (ids.length < 1) {
				globalObject.infoTip('请先选择导出的数据行！');
				return;
			}
			location.href = me.proxyExportUrl + "?ids=" + ids;
		}
		/**
		Ext.ux.custom.TimeoutController.request({
			url : me.proxyExportUrl,
			method : 'POST',
			params : {
				ids : ids.join(',')
			},
			success : function(response) {
			}
		});
		**/
	}
	
});
