//指标统计
Ext.define('Forestry.app.statistic.BaseStationPanel', {
	extend : 'Ext.ux.custom.GlobalGridPanel',
	id : 'baseStationStatList-grid',
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
		
		Ext.define('ModelList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ {
				name : 'id',
				type : 'int'
			}, 'area', 'total','inFinish','jcFinish','towerFinish','ydFinish'
			]
		});

		var store = me.createStore({
			modelName : 'ModelList',
			proxyUrl : appBaseUri + '/sys/statistic/getIndexForBaseStation',
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
		    
		var columns = [ /*{
			text : "ID",
			dataIndex : 'id'
		}, */{
			text : "区域",
			dataIndex : 'area',
			sortable:false
		}, {
			text : "任务数",
			dataIndex : 'total',
			sortable:false
		}, {
			text : "进场",
			dataIndex : 'inFinish',
			sortable:false
		}, {
			text : "基础完工",
			dataIndex : 'jcFinish',
			sortable:false
		}, {
			text : "铁塔安装",
			dataIndex : 'towerFinish',
			sortable:false
		}, {
			text : "引电完工",
			dataIndex : 'ydFinish',
			sortable:false
		}
			];

		var ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
			id: 'baseStationPanelTT',
			items : [ {
				xtype : 'combobox',
				fieldLabel : '工程批次',
				id : 'query-baseStationStat-projectBatchNo',
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
						projectBatchNo : Ext.getCmp('query-baseStationStat-projectBatchNo').getValue()
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
					Ext.getCmp('query-baseStationStat-projectBatchNo').setValue(null);
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
