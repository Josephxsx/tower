Ext.define('App.ImportContractWindow', {
		extend : 'Ext.window.Window',
		constructor : function(config) {
			config = config || {};
			var scope = this;
			var downloadUri = appBaseUri + '/sys/baseStation/downloadContractTemplateFile';
			Ext.apply(config, {
//				title : '树木识别数据导入',
				width : 500,
				height : 180,
				bodyPadding : '10 5',
				modal : true,
				layout : 'fit',
				items : [ {
					xtype : 'form',
					fieldDefaults : {
						labelAlign : 'left',
						labelWidth : 70,
						anchor : '100%'
					},
					items : [ {
						xtype : 'fileuploadfield',
						fieldLabel : '选择文件',
						afterLabelTextTpl : '<span style="color:#FF0000;">*</span>',
						buttonText : '请选择...',
						name : 'importedFile',
						emptyText : '请选择Excel文件',
						blankText : 'Excel文件不能为空',
						allowBlank : false,
						listeners : {
							change : function(view, value, eOpts) {
								scope.checkImportFile(view, value);
							}
						}
					}, {
						columnWidth : 1,
						xtype : 'fieldset',
						title : '导入须知',
						layout : {
							type : 'table',
							columns : 1
						},
						collapsible : false,// 是否可折叠
						defaultType : 'label',// 默认的Form表单组件
						items : [ {
							html : '1、支持Microsoft Office Excel的xls和xlsx文件,模板<a href="'  + downloadUri + '")>点此下载.</a>'
						} ]
					} ],
					buttons : [ '->', {
						text : '导入',
						iconCls : 'icon-excel',
						handler : function(btn) {
							scope.importContractFile(btn);
						}
					}, '->' ]
				} ]
			});
			App.ImportContractWindow.superclass.constructor.call(this, config);
		},
		checkImportFile : function(fileObj, fileName) {
			var scope = this;
			if (!(scope.getFileType(scope.getFileSuffix(fileName)))) {
				globalObject.errTip('导入文件类型有误！');
				fileObj.reset();// 清空上传内容
				return;
			}
		},
		getFileType : function(suffix) {
			var typestr = 'xls,xlsx';
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
		importContractFile : function(btn) {
			var postUri = '/sys/contract/importContractFile';
			var windowObj = btn.up('window');// 获取Window对象
			var formObj = btn.up('form');// 获取Form对象
			if (formObj.isValid()) { // 验证Form表单
				formObj.form.doAction('submit', {
					url : appBaseUri + postUri,
					method : 'POST',
					submitEmptyText : false,
					waitMsg : '正在导入文件,请稍候...',
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
						Ext.getCmp('contractlist-grid').getStore().reload();
					},
					failure : function(response, options) {
						globalObject.errTip(options.result.msg);
					}
				});
			}
		}
	});	

Ext.define('App.contractQueryWindow', {
		extend : 'Ext.window.Window',
		dataId:0,
		constructor : function(config) {
			var scope = this;
			//alert('id' + config.dataId);
			var basicInformation = new Ext.form.FieldContainer({  
	            layout: { type: "vbox" },    
	            items: [  
	                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
	                    { fieldLabel: "需求编号", name: "requirementNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
	                    { fieldLabel: "项目编号", name: "projectNo", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },
	                    { fieldLabel: "站名", name: "stationName", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
	                ]  
	                },  
	                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
	                    { fieldLabel: "区域", name: "area", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
	                    { fieldLabel: "区域经理", name: "areaMgr", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },
	                    { fieldLabel: "工程批次", name: "projectBatchNo", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
	                    ]  
	                }
	                ]
			});
			
			var others = new Ext.form.FieldContainer({  
	            layout: { type: "vbox" },
	            items: [  
	                    { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
	                        { fieldLabel: "接收日期", name: "contract.receiveDate", xtype: "datefield", format : 'Y-m-d', labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
	                        { fieldLabel: "合同金额", name: "contract.value", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },
	                        { fieldLabel: "对方业主", name: "contract.owner", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
	                    ]  
	                    },  
	                    { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
	                        { fieldLabel: "期限", name: "contract.period", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
	                        { fieldLabel: "签订单位", name: "contract.signUnit", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },
	                        { fieldLabel: "人员姓名", name: "contract.name", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" }
	                    ]  
	                    },  
	                    { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
	                     { fieldLabel: "合同签订人", name: "contract.signName", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
	                     { fieldLabel: "是否录入系统", name: "contract.isImport", xtype: "checkbox", labelWidth: 90, margin: "5 154 0 5", labelAlign: "right" },
	                     { fieldLabel: "是否归档", name: "contract.isArchive", xtype: "checkbox", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" }
	                     ]  
	                    },
	                    { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [ 
	                             
  	                        { fieldLabel: "备注", name: "contract.memo", xtype: "textfield",labelWidth: 90, width: 524, margin: "5 10 0 5", labelAlign: "right" } ]  
  	                    }
	            ]
	             

			});
			
			config = config || {};
			Ext.apply(config, {
				id: 'contractEntry',
				title : '录入合同',
				width : 840,
				height : 370,
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
						   height: 160, 
						   title: "合同内容", 
						   margin: "5 0 5 0",
						   items: [others,  {
								xtype : 'hiddenfield',
								name : 'cid'
							}]   
					   }]
					}],
					buttons : [ '->', {
						id : 'contractEntry-save',
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
									url : appBaseUri + '/sys/contract/saveContract',
									params : {
										id : vals['cid'],
										requirementNo : vals['requirementNo'],
										receiveDate : vals['contract.receiveDate'],
										value : vals['contract.value'],
										owner : vals['contract.owner'],
										period: vals['contract.period'],
										signUnit : vals['contract.signUnit'],
										name : vals['contract.name'],
										signName : vals['contract.signName'],
										isImport : vals['contract.isImport'],
										isArchive : vals['contract.isArchive'],
										memo : vals['contract.memo']
									},
									method : "POST",
									success : function(response) {
										if (response.responseText != '') {
											var res = Ext.JSON.decode(response.responseText);
											//globalObject.errTip(res.success);
											if (res.success) {
												globalObject.msgTip('操作成功！');
												Ext.getCmp('contractlist-grid').getStore().reload();
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
						id : 'contractEntry-cancel',
						text : '取消',
						iconCls : 'icon-cancel',
						width : 80,
						handler : function() {
							this.up('window').close();
						}
					}
					, '->' ]
				
			});
			App.contractQueryWindow.superclass.constructor.call(this, config);
		},
	});

	
	Ext.define('Forestry.app.progress.ContractList', {
		extend : 'Ext.ux.custom.GlobalGridPanel',
		id : 'contractlist-grid',
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
			Ext.define('ModelList', {
				extend : 'Ext.data.Model',
				idProperty : 'id',
				fields : [ {
					name : 'id',
					type : 'int'
				},'requirementNo','projectNo',{
					name : 'cid',
					type : 'int'
				},
				'stationName', 'area', 'areaMgr', 'projectBatchNo',
				{name: 'contract.receiveDate', type: 'date', convert:dateFormat},
				 'contract.value','contract.owner','contract.period',
				'contract.signUnit','contract.name','contract.signName',
				{name:'contract.isImport',type:'boolean'},{name:'contract.isArchive',type:'boolean'},'contract.memo'
				]
			});

			var store = me.createStore({
				modelName : 'ModelList',
				proxyUrl : appBaseUri + '/sys/baseStation/getContract',
				proxyDeleteUrl : appBaseUri + '/sys/contract/deletecontract',
				proxyExportUrl : appBaseUri + '/sys/baseStation/exportContractByIds',
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
				text : "接收日期",
				dataIndex : 'contract.receiveDate',
				xtype: 'datecolumn',
				renderer: Ext.util.Format.dateRenderer('Y-m-d'),
				sortable:false
			}, {
				text : "合同金额",
				dataIndex : 'contract.value',
				sortable:false
			}, {
				text : "对方业主",
				dataIndex : 'contract.owner',
				sortable:false
			}, {
				text : "期限",
				dataIndex : 'contract.period',
				sortable:false
			},{
				text : "签订单位",
				dataIndex : 'contract.signUnit',
				sortable:false
			},{
				text : "人员姓名",
				dataIndex : 'contract.name',
				sortable:false
			}, {
				text : "合同签订人",
				dataIndex : 'contract.signName',
				sortable:false
			}, {
				text : "是否录入系统",
				dataIndex : 'contract.isImport',
				xtype: 'booleancolumn',
				trueText: '是',
				falseText: '否',
				sortable:false
			},{
				text : "是否归档",
				dataIndex : 'contract.isArchive',
				xtype: 'booleancolumn',
				trueText: '是',
				falseText: '否',
				sortable:false
			},{
				text : "备注",
				dataIndex : 'contract.memo',
				sortable:false
			}
				];

			var ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
				id: 'contractTT',
				items : [ {
					xtype : 'textfield',
					id : 'query-contract-stationName',
					name : 'stationName',
					fieldLabel : '站名',
					labelWidth : 30,
					width : '10%'
				},  {
					xtype : 'combobox',
					id : 'query-contract-area',
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
					id : 'query-contract-projectBatchNo',
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
					id : 'query-contract-areaMgr',
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
				},{
					xtype : 'button',
					text : '查询',
					iconCls : 'icon-search',
					//disabled : !globalObject.haveActionMenu(me.cButtons, 'Query'),
					width : '10%',
					maxWidth : 60,
					handler : function(btn, eventObj) {
						var searchParams = {
							stationName : Ext.getCmp('query-contract-stationName').getValue(),
							area : Ext.getCmp('query-contract-area').getValue(),
							areaMgr : Ext.getCmp('query-contract-areaMgr').getValue(),
							projectBatchNo : Ext.getCmp('query-contract-projectBatchNo').getValue()
						};
						//store.currentPage = 1;
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
						Ext.getCmp('query-contract-stationName').setValue(null);
						Ext.getCmp('query-contract-area').setValue(null);
						Ext.getCmp('query-contract-areaMgr').setValue(null);
						Ext.getCmp('query-contract-projectBatchNo').setValue(null);
						store.currentPage = 1;
					}
				},{
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
					itemId : 'btnImport',
					iconCls : 'icon-import',
					text : '导入合同',
					scope : this,
					// disabled : !globalObject.haveAction(me.cName + 'Export'),
					handler : function(btn) {
						me.onImportClick(btn);
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
			var grid = Ext.getCmp("contractlist-grid");
			var dataId = grid.getSelectionModel().getSelection()[0].get('id');
			var gridRecord = grid.getStore().findRecord('id', dataId);
			//alert(gridRecord);
			var win = new App.contractQueryWindow({
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
			win.show();
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
				var stationName = Ext.getCmp('query-contract-stationName').getValue();
				var area = Ext.getCmp('query-contract-area').getValue();
				var projectBatchNo = Ext.getCmp('query-contract-projectBatchNo').getValue();
				var areaMgr = Ext.getCmp('query-contract-areaMgr').getValue();
				if (area == null) area = '';
				if (projectBatchNo == null) projectBatchNo = '';
				if (areaMgr == null) areaMgr = '';
				location.href = appBaseUri + '/sys/baseStation/exportAllContract?stationName=' + stationName + "&area=" + area + "&projectBatchNo=" + projectBatchNo + "&areaMgr=" + areaMgr;

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
		},

		onImportClick : function(btn) {
			var win = new App.ImportContractWindow();
			win.show();
		}
	});