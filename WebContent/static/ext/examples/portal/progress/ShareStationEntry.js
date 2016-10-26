// 共享基站信息列表
Ext.define('App.ShareStationQueryWindow', {
	extend : 'Ext.window.Window',
	dataId:0,
	constructor : function(config) {
		var me = this;
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
                    { fieldLabel: "经度", name: "longitude", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                },  
                { xtype: "fieldcontainer", layout: { type: "hbox" },  items: [  
                    { fieldLabel: "纬度", name: "latitude", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" },  
                    { fieldLabel: "共享目标站点", name: "shareStationName", xtype: "textfield", labelWidth: 90, margin: "5 10 0 5", labelAlign: "right" } ,
                    { fieldLabel: "存量站点归属", name: "belongTo", xtype: "textfield", labelWidth: 90, margin: "5 0 0 5",labelAlign:"right" }  
                ]  
                }]
		});
		
		var others = new Ext.form.FieldContainer({  
            layout: { type: "vbox" },    
            items: [  
                { xtype: "fieldcontainer", layout: { type: "hbox" }, items: [  
                    { fieldLabel: "天面改造完工", name: "gzFinish", xtype: "checkbox", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" },  
                    { fieldLabel: "引电完工", name: "ydFinish", xtype: "checkbox", labelWidth: 90, margin: "5 10 0 5",labelAlign:"right" }
                ]  
                } 
          
                ]
		});
		
		config = config || {};
		Ext.apply(config, {
			id: 'shareStationEntry',
			title : '更新共享基站',
			width : 840,
			height : 320,
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
					   height: 70, 
					   title: "选址阶段", 
					   margin: "5 0 5 0",
					   items: [others,  {
							xtype : 'hiddenfield',
							name : 'id'
						}]   
				   }]
				}],
				buttons : [ '->', {
					id : 'shareStationEntry-save',
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
								url : appBaseUri + '/sys/shareStation/saveShareStation',
								params : {
									id : vals['id'],
									projectNo : vals['projectNo'],
									stationName : vals['stationName'],
									area : vals['area'],
									areaMgr: vals['areaMgr'],
									projectBatchNo : vals['projectBatchNo'],
									longitude : vals['longitude'],
									latitude : vals['latitude'],
									shareStationName : vals['shareStationName'],
									belongTo : vals['belongTo'],
									gzFinish : vals['gzFinish'],
									ydFinish : vals['ydFinish']
								},
								method : "POST",
								success : function(response) {
									if (response.responseText != '') {
										var res = Ext.JSON.decode(response.responseText);
										//globalObject.errTip(res.success);
										if (res.success) {
											globalObject.msgTip('操作成功！');
											Ext.getCmp('shareStationlist-grid').getStore().reload();
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
					id : 'shareStationEntry-cancel',
					text : '取消',
					iconCls : 'icon-cancel',
					width : 80,
					handler : function() {
						this.up('window').close();
					}
				}
				, '->' ]
			
		});
		App.ShareStationQueryWindow.superclass.constructor.call(this, config);
	}
});



Ext.define('Forestry.app.progress.ShareStationEntry', {
	extend : 'Ext.ux.custom.GlobalGridPanel',
	id : 'shareStationlist-grid',
	region : 'center',
	initComponent : function() {
		var me = this;
		
		var projectBatchNoStore = Ext.create('Ext.data.JsonStore', {
			proxy : {
				type : 'ajax',
				url : appBaseUri + '/sys/shareStation/getBatchNoGroup',
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
			}, 'projectNo', 
			'stationName', 'area', 'areaMgr', 'projectBatchNo',
			'longitude', 'latitude', 'shareStationName','belongTo',
			{name:'gzFinish', type:'boolean'},
			{name:'ydFinish', type:'boolean'}
			]
		});

		var store = me.createStore({
			modelName : 'ModelList',
			proxyUrl : appBaseUri + '/sys/shareStation/getShareStation',
			proxyDeleteUrl : appBaseUri + '/sys/shareStation/deleteShareStation',
			proxyExportUrl : appBaseUri + '/sys/shareStation/exportShareStation',
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
			text : "经度",
			dataIndex : 'longitude'
		}, {
			text : "纬度",
			dataIndex : 'latitude'
		}, {
			text : "共享目标站点",
			dataIndex : 'shareStationName'
		}, {
			text : "存量站点归属",
			dataIndex : 'belongTo'
		},{
			text : "天面改造完工",
			dataIndex : 'gzFinish',
			xtype: 'booleancolumn',
			trueText: '是',
			falseText: '否'
		},{
			text : "引电完工",
			dataIndex : 'ydFinish',
			xtype: 'booleancolumn',
			trueText: '是',
			falseText: '否'
		}
			];

		var ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
			id: 'shareStationTT',
			items : [ {
				xtype : 'textfield',
				id : 'query-share-stationName',
				name : 'stationName',
				fieldLabel : '站名',
				labelWidth : 30,
				width : '15%'
			}, {
				xtype : 'combobox',
				id : 'query-share-area',
				name : 'area',
				store:Ext.create('Ext.ux.custom.TimeoutController',
					    {
					        fields:['id','name'],
					        data:
					        [
					            {'id':1,'name':'三山区'},
					            {'id':2,'name':'南陵县'},
					            {'id':3,'name':'弋江区'},
					            {'id':4,'name':'无为县'},
					            {'id':5,'name':'繁昌县'},
					            {'id':6,'name':'芜湖县'},
					            {'id':7,'name':'镜湖区'},
					            {'id':8,'name':'鸠江区'}
					        ]
					    }),
				displayField:'name',
				valueField:'name',
				emptyText : '请选择...',
				editable : false,
				fieldLabel : '区域',
				labelWidth : 30,
				width : '15%'
			}, {
				xtype : 'combobox',
				fieldLabel : '工程批次',
				id : 'query-share-projectBatchNo',
				name : 'projectBatchNo',
				store : projectBatchNoStore,
				valueField : 'value',
				displayField : 'value',
				typeAhead : true,
				queryMode : 'remote',
				emptyText : '请选择...',
				editable : false,
				labelWidth : 60,
				width : '20%',
				maxWidth : 320
			}, {
				xtype : 'button',
				text : '查询',
				iconCls : 'icon-search',
				//disabled : !globalObject.haveActionMenu(me.cButtons, 'Query'),
				width : '10%',
				maxWidth : 60,
				handler : function(btn, eventObj) {
					var searchParams = {
						stationName : Ext.getCmp('query-share-stationName').getValue(),
						area : Ext.getCmp('query-share-area').getValue(),
						projectBatchNo : Ext.getCmp('query-share-projectBatchNo').getValue()
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
					Ext.getCmp('query-share-stationName').setValue(null);
					Ext.getCmp('query-share-area').setValue(null);
					Ext.getCmp('query-share-projectBatchNo').setValue(null);
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
					var grid = this;
					var id = grid.getSelectionModel().getSelection()[0].get('id');
					var gridRecord = grid.getStore().findRecord('id', id);
					var win = new App.ShareStationQueryWindow({
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
		var grid = Ext.getCmp("shareStationlist-grid");
		var dataId = grid.getSelectionModel().getSelection()[0].get('id');
		var gridRecord = grid.getStore().findRecord('id', dataId);
		//alert(gridRecord);
		var win = new App.ShareStationQueryWindow({
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
			//Modify export all records to export current queried records
			/*var grid = Ext.getCmp("shareStationlist-grid");
			var store = grid.getStore();
			var ids = [];
			 store.each(function(record) {   
				 ids.push(record.get("id"));
			 });
			//location.href = me.proxyExportUrl + "?ids=0";
			 location.href = me.proxyExportUrl + "?ids=" + ids;*/
			var stationName = Ext.getCmp('query-share-stationName').getValue();
			var area = Ext.getCmp('query-share-area').getValue();
			var projectBatchNo = Ext.getCmp('query-share-projectBatchNo').getValue();
			location.href = appBaseUri + '/sys/shareStation/exportAllShareStation?stationName=' + stationName + "&area=" + area + "&projectBatchNo=" + projectBatchNo;
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