	// 共享基站信息列表
	Ext.define('App.tjReportQueryWindow', {
		extend : 'Ext.window.Window',
		dataId:0,
		constructor : function(config) {
			var scope = this;
			//alert('id' + config.dataId);
			var basicInformation = new Ext.form.FieldContainer({  
	            layout: { type: "vbox" },    
	            items: [  
	                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
	                    { fieldLabel: "项目编号", name: "projectNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
	                    { fieldLabel: "站名", name: "stationName", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },
	                    { fieldLabel: "区域", name: "area", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
	                ]  
	                },  
	                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
	                    { fieldLabel: "区域经理", name: "areaMgr", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
	                    { fieldLabel: "工程批次", name: "projectBatchNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },
	                    { fieldLabel: "土建施工单位", name: "tjsgUnit", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
	                ]  
	                }
	                ]
			});
			
			var others = new Ext.form.FieldContainer({  
	            layout: { type: "vbox" },    
	            items: [  
	                    { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
	                        { fieldLabel: "站点塔高塔型", name: "tjReport.towerType", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
	                        { fieldLabel: "基础类型", name: "tjReport.baseType", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },
	                        { fieldLabel: "桩长", name: "tjReport.stubLength", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
	                    ]  
	                    },  
	                    { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
	                        { fieldLabel: "直径", name: "tjReport.diam", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
	                        { fieldLabel: "钢筋品牌", name: "tjReport.steelBrand", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },
	                        { fieldLabel: "混凝土标号", name: "tjReport.concreteNo", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
	                    ]  
	                    },  
	                    { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [ 
	                        { fieldLabel: "机房类型", name: "tjReport.roomType", xtype: "textfield",labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },                                         
	                        { fieldLabel: "尺寸", name: "tjReport.size", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
	                        { fieldLabel: "实际开工时间", name: "tjReport.openDate", xtype: "datefield", format : 'Y-m-d',labelWidth: 90, margin: "5 0 0 5", labelAlign: "right" } ]  
	                    },  
	                    { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [ 
  	                        { fieldLabel: "实际完工时间", name: "tjReport.closeDate", xtype: "datefield", format : 'Y-m-d',labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" } ]  
  	                    }
	                    ] 

			});
			
			config = config || {};
			Ext.apply(config, {
				id: 'tjReportEntry',
				title : '更新土建完工报告',
				width : 840,
				height : 500,
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
						   height: 100, 
						   title: "基站基本信息", 
						   margin: "5 0 5 0",
						   items: [basicInformation]   
					   },
					   {xtype: 
						   "fieldset",
						   layout: {type:"hbox"}, 
						   height: 170, 
						   title: "报告内容", 
						   margin: "5 0 5 0",
						   items: [others, {
								xtype : 'hiddenfield',
								name : 'tjReport.bsId'
							},,{
								xtype : 'hiddenfield',
								name : 'tjid'
							},{
								xtype : 'hiddenfield',
								name : 'requirementNo'
							}]   
					   },
					   {xtype: 
						   "fieldset",
						   layout: {type : 'table',columns:3}, 
						   height: 100, 
						   title: "上传文件", 
						   
						   margin: "5 0 5 0",
						   items: [{
								xtype : 'fileuploadfield',
								width: 335,
								fieldLabel : '选择文件',
								labelWidth: 60,
								buttonText : '请选择...',
								name : 'importedFile',
								emptyText : '请选择文件',
								blankText : '文件不能为空',
								//allowBlank : false,
								listeners : {
									change : function(view, value, eOpts) {
										scope.checkImportFile(view, value);
									}
								}
							},{
								xtype : 'button',
								text : '上传完工报告',
								//iconCls : 'icon-excel',
								margin: "0 15 0 0",
								buttonAlign: 'right',
								handler : function(btn) {
									scope.importReportFile(btn);
								}
							} ,{
								xtype : 'button',
								text : '生成完工报告',
								//iconCls : 'icon-excel',
								buttonAlign: 'right',
								handler : function(btn) {
									scope.downloadReportFile(btn);
								}
							} ,
							{
								html : '1. 先点文件选择按钮，选择完文件后再点上传按钮。'
							},{},{},
							{
								html : '2. 本次上传的文件会覆盖上次的文件，只保存最新的版本。'
							},{},{},
							{
								html : '3. 填写完报告内容并保存成功后，才能成功生成完工报告。'
							},{},{}
							 ]   
					   }]
					}],
					buttons : [ '->', {
						id : 'tjReportEntry-save',
						text : '保存',
						iconCls : 'icon-save',
						width : 80,
						handler : function(btn, eventObj) {
							var window = btn.up('window');
							var form = window.down('form').getForm();
							if (form.isValid()) {
								window.getEl().mask('数据保存中，请稍候...');
								var vals = form.getValues();
								Ext.ux.custom.TimeoutController.request({
									url : appBaseUri + '/sys/tjreport/saveReport',
									params : {
										id : vals['tjid'],
										bsId: vals['tjReport.bsId'],
										requirementNo : vals['requirementNo'],
										openDate : vals['tjReport.openDate'],
										closeDate : vals['tjReport.closeDate'],
										towerType : vals['tjReport.towerType'],
										baseType: vals['tjReport.baseType'],
										stubLength : vals['tjReport.stubLength'],
										diam : vals['tjReport.diam'],
										steelBrand : vals['tjReport.steelBrand'],
										concreteNo : vals['tjReport.concreteNo'],
										roomType : vals['tjReport.roomType'],
										size : vals['tjReport.size']
									},
									method : "POST",
									success : function(response) {
										if (response.responseText != '') {
											var res = Ext.JSON.decode(response.responseText);
											//globalObject.errTip(res.success);
											if (res.success) {
												globalObject.msgTip('操作成功！');
												Ext.getCmp('tjReportlist-grid').getStore().reload();
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
						id : 'tjReportEntry-cancel',
						text : '取消',
						iconCls : 'icon-cancel',
						width : 80,
						handler : function() {
							this.up('window').close();
						}
					}
					, '->' ]
				
			});
			App.tjReportQueryWindow.superclass.constructor.call(this, config);
		},
		checkImportFile : function(fileObj, fileName) {
			var scope = this;
			if (!(scope.getFileType(scope.getFileSuffix(fileName)))) {
				globalObject.errTip('上传文件类型有误！');
				fileObj.reset();// 清空上传内容
				return;
			}
		},
		downloadReportFile : function(btn) {
			var win = btn.up('window');
			var form = win.down('form').getForm();
			var vals = form.getValues();
			var requirementNo = vals['requirementNo'];
			var fileName = requirementNo + '-TjReport.doc';
			var postUri = appBaseUri + '/sys/baseStation/downloadDesignFile?fileName=' + fileName;
			//alert(postUri);
			window.open(postUri);
		},
		getFileType : function(suffix) {
			var typestr = 'doc,docx,pdf,xls,xlsx';
			var types = typestr.split(',');
			for (var i = 0; i < types.length; i++) {
				if (suffix == types[i]) {
					return true;
				}
			}
			return false;
		},
		getFileSuffix : function(fileName) {
			var suffix = '';// 后缀
			var index = fileName.lastIndexOf('.');// 文件名称中最后一个.的位置
			if (index != -1) {
				suffix = fileName.substr(index + 1).toLowerCase();// 后缀转成小写
			}
			return suffix;
		},
		importReportFile : function(btn) {
			//alert(type);
			var postUri = '/sys/tjreport/importReportFile';
			/*if (type === 'New') {
				postUri = '/sys/baseStation/importDesignFile';
			} else {
				postUri = '/sys/shareStation/importNewStationFile';
			}*/
			var windowObj = btn.up('window');// 获取Window对象
			var formObj = btn.up('form');// 获取Form对象
			if (formObj.isValid()) { // 验证Form表单
				formObj.form.doAction('submit', {
					url : appBaseUri + postUri,
					method : 'POST',
					submitEmptyText : false,
					waitMsg : '正在上传文件,请稍候...',
					timeout : 60000, // 60s
					success : function(response, options) {
						var result = options.result;
						if (!result.success) {
							globalObject.errTip(result.msg);
							return;
						}
						globalObject.infoTip(result.msg);
						// var url = result.data;
						windowObj.close();// 关闭窗体
						Ext.getCmp('tjReportlist-grid').getStore().reload();
					},
					failure : function(response, options) {
						globalObject.errTip(options.result.msg);
					}
				});
			}
		}
	});



	Ext.define('Forestry.app.finishReport.tjReport', {
		extend : 'Ext.ux.custom.GlobalGridPanel',
		id : 'tjReportlist-grid',
		region : 'center',
		initComponent : function() {
			var me = this;
			
			Ext.define('ModelList', {
				extend : 'Ext.data.Model',
				idProperty : 'id',
				fields : [ {
					name : 'id',
					type : 'int'
				}, {
					name : 'tjid',
					type : 'int'
				},{
					name : 'tjReport.bsId',
					type : 'int'
				},'requirementNo','projectNo','tjsgUnit', 
				'stationName', 'area', 'areaMgr', 'projectBatchNo',
				{name: 'tjReport.openDate', type: 'date', convert:dateFormat},
				{name: 'tjReport.closeDate', type: 'date', convert:dateFormat},
				 'tjReport.towerType','tjReport.baseType',
				'tjReport.stubLength','tjReport.diam','tjReport.steelBrand','tjReport.concreteNo','tjReport.roomType','tjReport.size','tjReport.reportPath'
				
				]
			});

			var store = me.createStore({
				modelName : 'ModelList',
				proxyUrl : appBaseUri + '/sys/baseStation/getTjReport',
				proxyDeleteUrl : appBaseUri + '/sys/tjReport/deletetjReport',
				proxyExportUrl : appBaseUri + '/sys/tjtjreport/exporttjReport',
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
			},{
				text : "项目编号",
				dataIndex : 'projectNo'
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
				text : "土建施工单位",
				dataIndex : 'tjsgUnit'
			}, {
				text : "实际开工日期",
				dataIndex : 'tjReport.openDate',
				xtype: 'datecolumn',
				renderer: Ext.util.Format.dateRenderer('Y-m-d'),
				sortable:false
			}, {
				text : "实际完工日期",
				dataIndex : 'tjReport.closeDate',
				xtype: 'datecolumn',
				renderer: Ext.util.Format.dateRenderer('Y-m-d'),
				sortable:false
			}, {
				text : "站点塔高塔型",
				dataIndex : 'tjReport.towerType',
				sortable:false
			}, {
				text : "基础类型",
				dataIndex : 'tjReport.baseType',
				sortable:false
			},{
				text : "桩长",
				dataIndex : 'tjReport.stubLength',
				sortable:false
			},{
				text : "直径",
				dataIndex : 'tjReport.diam',
				sortable:false
			}, {
				text : "钢筋品牌",
				dataIndex : 'tjReport.steelBrand',
				sortable:false
			}, {
				text : "混凝土标号",
				dataIndex : 'tjReport.concreteNo',
				sortable:false
			}, {
				text : "机房类型",
				dataIndex : 'tjReport.roomType',
				sortable:false
			}, {
				text : "尺寸",
				dataIndex : 'tjReport.size',
				sortable:false
			}, {
				text : "报告地址",
				dataIndex : 'tjReport.reportPath',
				sortable:false,
				renderer : function(value) {
					if (value != null)
					return "<a href='"+ appBaseUri+ "/sys/baseStation/downloadDesignFile?fileName=" + value + "'>"+ value + "</a>";		   
				}
			}
				];

			var ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
				id: 'tjReportTT',
				items : [ {
					xtype : 'textfield',
					id : 'query-tjReport-requirementNo',
					name : 'stationName',
					fieldLabel : '需求编号',
					labelWidth : 60,
					width : '20%'
				}, {
					xtype : 'button',
					text : '查询',
					iconCls : 'icon-search',
					//disabled : !globalObject.haveActionMenu(me.cButtons, 'Query'),
					width : '10%',
					maxWidth : 60,
					handler : function(btn, eventObj) {
						var searchParams = {
							requirementNo : Ext.getCmp('query-tjReport-requirementNo').getValue()
						};
						Ext.apply(store.proxy.extraParams, searchParams);
						//store.reload();
						store.loadPage(1);
					}
				}, {
					xtype : 'button',
					text : '重置',
					iconCls : 'icon-reset',
					width : '10%',
					maxWidth : 60,
					handler : function(btn, eventObj) {
						Ext.getCmp('query-tjReport-requirementNo').setValue(null);
						store.currentPage = 1;
					}
				}
				]
			});
			
			Ext.apply(this, {
				store : store,
				tbar : ttoolbar,
				// features : [ filters ],
				columns : columns,
				listeners : {
				}
			});

			store.loadPage(1);

			this.callParent(arguments);
		},
		onViewClick : function() {
			var grid = Ext.getCmp("tjReportlist-grid");
			var dataId = grid.getSelectionModel().getSelection()[0].get('id');
			var gridRecord = grid.getStore().findRecord('id', dataId);
			//alert(gridRecord);
			var win = new App.tjReportQueryWindow({
				hidden : true,
				dataId : dataId
			});
			var form = win.down('form').getForm();
			form.loadRecord(gridRecord);
			form.findField('projectNo').setReadOnly(true);
			form.findField('stationName').setReadOnly(true);
			form.findField('area').setReadOnly(true);
			form.findField('areaMgr').setReadOnly(true);
			form.findField('projectBatchNo').setReadOnly(true);
			form.findField('tjsgUnit').setReadOnly(true);
			win.show();
		}
	});