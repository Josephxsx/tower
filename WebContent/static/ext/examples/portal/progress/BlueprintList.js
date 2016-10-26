Ext.define('App.ImportDocWindow', {
		extend : 'Ext.window.Window',
		constructor : function(config) {
			config = config || {};
			var scope = this;
			
			var others = new Ext.form.FieldContainer({  
	            layout: { type: "vbox" },    
	            items: [  
	                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
	                    { fieldLabel: "需求编号",readonly:true, name: "requirementNo", xtype: "textfield" },
	                    {
							xtype : 'combobox',
							fieldLabel : '文件类型',
							id : 'query-doc-type',
							name : 'doctype',
							margin: "0 0 0 30",
							
							store:Ext.create('Ext.data.Store',
								    {
								        fields:['id','name'],
								        data:
								        [
								            {'id':'dk_report','name':'地勘报告'},
								            {'id':'tj_design','name':'土建设计图纸'},
								            {'id':'wx_design','name':'无线图纸'},
								            {'id':'tower_design','name':'铁塔图纸'},
								            {'id':'yd_design','name':'引电图纸'}
								        ]
								    }),
							displayField:'name',
							valueField:'id',
							emptyText : '请选择上传文件类型',
							blankText : '文件不能为空',
							allowBlank : false
						},
						{
							xtype : 'hiddenfield',
							name : 'blueprint.id'
						}
	                ]  
	                } 
	          
	                ]
			});
			
			Ext.apply(config, {
				title : '上传文档',
				width : 520,
				height : 250,
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
					items : [ others,
					{
						xtype : 'fileuploadfield',
						fieldLabel : '选择文件',
						buttonText : '请选择...',
						name : 'importedFile',
						emptyText : '请选择文件',
						blankText : '文件不能为空',
						allowBlank : false,
						listeners : {
							change : function(view, value, eOpts) {
								scope.checkImportFile(view, value);
							}
						}
					}, {
						columnWidth : 1,
						xtype : 'fieldset',
						title : '上传须知',
						layout : {
							type : 'table',
							columns : 1
						},
						collapsible : false,// 是否可折叠
						defaultType : 'label',// 默认的Form表单组件
						items : [ {
							html : '1、请先选择上传文档类型。'
						}, {
							html : '2、上传的文件将覆盖上一次的同类型文件，每种类型文件只保留最新版本。'
						} , {
							html : '3、有多个文件需要上传的情况，请先将文件汇总压缩后再上传。'
						}]
					} ],
					buttons : [ '->', {
						text : '上传',
						iconCls : 'icon-excel',
						handler : function(btn) {
							scope.importForestryFile(btn, Ext.getCmp('query-doc-type').getValue());
						}
					} ,{
						id : 'shareStationEntry-cancel',
						text : '取消',
						iconCls : 'icon-cancel',
						width : 80,
						handler : function() {
							this.up('window').close();
						}
					}, '->']
				} ]
			});
			App.ImportDocWindow.superclass.constructor.call(this, config);
		},
		checkImportFile : function(fileObj, fileName) {
			var scope = this;
			if (!(scope.getFileType(scope.getFileSuffix(fileName)))) {
				globalObject.errTip('上传文件类型有误！');
				fileObj.reset();// 清空上传内容
				return;
			}
		},
		getFileType : function(suffix) {
			var typestr = 'doc,docx,pdf,xls,xlsx,cad,zip,rar,dwg,vsd';
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
		importForestryFile : function(btn, type) {
			//alert(type);
			var postUri = '/sys/baseStation/importDesignFile';
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
						Ext.getCmp('blueprintList-grid').getStore().reload();
					},
					failure : function(response, options) {
						globalObject.errTip(options.result.msg);
					}
				});
			}
		}
	});

Ext.define('Forestry.app.progress.BlueprintList', {
	extend : 'Ext.ux.custom.GlobalGridPanel',
	id : 'blueprintList-grid',
	region : 'center',
	initComponent : function() {
		var me = this;
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
			}, 'projectNo', 'stationName','area','areaMgr',
			'projectBatchNo','requirementNo','blueprint.id',
			'blueprint.dkReport', 'blueprint.tjDesign', 'blueprint.wxDesign','blueprint.towerDesign',
			'blueprint.ydDesign'
			]
		});

		var store = me.createStore({
			modelName : 'ModelList',
			proxyUrl : appBaseUri + '/sys/baseStation/getBaseStation',
			//proxyDeleteUrl : appBaseUri + '/sys/shareStation/deleteShareStation',
			//proxyExportUrl : appBaseUri + '/sys/shareStation/exportShareStation',
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
			text : "地勘报告",
			dataIndex : 'blueprint.dkReport',
			renderer : function(value) {
				if (value != null)
				return "<a href='"+ appBaseUri + "/sys/baseStation/downloadDesignFile?fileName=" + value + "'>"+ value + "</a>";		   
			},
			sortable:false
		}, {
			text : "土建设计图纸",
			dataIndex : 'blueprint.tjDesign',
			renderer : function(value) {
				if (value != null)
				return "<a href='" + appBaseUri + "/sys/baseStation/downloadDesignFile?fileName=" + value + "'>"+ value + "</a>";		   
			},
			sortable:false
		}, {
			text : "无线图纸",
			dataIndex : 'blueprint.wxDesign',
			renderer : function(value) {
				if (value != null)
				return "<a href='" + appBaseUri + "/sys/baseStation/downloadDesignFile?fileName=" + value + "'>"+ value + "</a>";		   
			},
			sortable:false
		}, {
			text : "铁塔图纸",
			dataIndex : 'blueprint.towerDesign',
			renderer : function(value) {
				if (value != null)
				return "<a href='" + appBaseUri + "/sys/baseStation/downloadDesignFile?fileName=" + value + "'>"+ value + "</a>";		   
			},
			sortable:false
		},{
			text : "引电图纸",
			dataIndex : 'blueprint.ydDesign',
			renderer : function(value) {
				if (value != null)
				return "<a href='" + appBaseUri + "/sys/baseStation/downloadDesignFile?fileName=" + value + "'>"+ value + "</a>";		   
			},
			sortable:false
		}
			];

		var ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
			id: 'blueprintListTT',
			items : [ {
				xtype : 'textfield',
				id : 'query-blueprint-stationName',
				name : 'stationName',
				fieldLabel : '站名',
				labelWidth : 30,
				width : '12%'
			}, {
				xtype : 'combobox',
				id : 'query-blueprint-area',
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
				width : '12%'
			}, {
				xtype : 'combobox',
				fieldLabel : '工程批次',
				id : 'query-blueprint-projectBatchNo',
				name : 'projectBatchNo',
				store : projectBatchNoStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '15%',
				maxWidth : 320
			}, {
				xtype : 'combobox',
				fieldLabel : '土建单位',
				id : 'query-blueprint-tjsgUnit',
				name : 'tjsgUnit',
				store : tjsgUnitStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '15%',
				maxWidth : 320
			},{
				xtype : 'combobox',
				fieldLabel : '引电单位',
				id : 'query-blueprint-ydUnit',
				name : 'ydUnit',
				store : ydUnitStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '15%',
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
						stationName : Ext.getCmp('query-blueprint-stationName').getValue(),
						area : Ext.getCmp('query-blueprint-area').getValue(),
						projectBatchNo : Ext.getCmp('query-blueprint-projectBatchNo').getValue(),
						tjsgUnit : Ext.getCmp('query-blueprint-tjsgUnit').getValue(),
						ydUnit : Ext.getCmp('query-blueprint-ydUnit').getValue()
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
					Ext.getCmp('query-blueprint-stationName').setValue(null);
					Ext.getCmp('query-blueprint-area').setValue(null);
					Ext.getCmp('query-blueprint-projectBatchNo').setValue(null);
					Ext.getCmp('query-blueprint-tjsgUnit').setValue(null);
					Ext.getCmp('query-blueprint-ydUnit').setValue(null);
					store.currentPage = 1;
				}
			}]
		});
		
		Ext.apply(this, {
			store : store,
			tbar : ttoolbar,
			// features : [ filters ],
			columns : columns,
			listeners : {
				itemdblclick : function(dataview, record, item, index, e) {
					var grid = this;
					var id = grid.getSelectionModel().getSelection()[0].get('id');
					var gridRecord = grid.getStore().findRecord('id', id);
					var win = new App.ImportDocWindow({
						hidden : true
					});
					var form = win.down('form').getForm();
					form.loadRecord(gridRecord);
					//form.findField('epcId').setReadOnly(true);
					//form.findField('name').setReadOnly(true);
					//form.findField('plantTime').setReadOnly(true);
					//form.findField('entryTime').setReadOnly(true);
					//form.findField('forestryTypeName').setReadOnly(true);
					win.show();
				}
			}
		});

		store.loadPage(1);

		this.callParent(arguments);
	},
	onViewClick : function() {
		var grid = Ext.getCmp("blueprintList-grid");
		var dataId = grid.getSelectionModel().getSelection()[0].get('id');
		var gridRecord = grid.getStore().findRecord('id', dataId);
		//alert(gridRecord);
		var win = new App.ImportDocWindow({
			hidden : true,
			dataId : dataId
		});
		var form = win.down('form').getForm();
		form.loadRecord(gridRecord);
		win.show();
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
			location.href = me.proxyExportUrl + "?ids=0";
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
	}
	
});