//基础完工未及时装塔
Ext.define('Forestry.app.statistic.towerNotFinish', {
	extend : 'Ext.ux.custom.GlobalGridPanel',
	id : 'towerNotFinishList-grid',
	region : 'center',
	initComponent : function() {
		var me = this;
		
		Ext.define('ModelList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ {
				name : 'id',
				type : 'int'
			}, 'areaMgr', 'area','stationName','towerUnit',
			{name: 'jcFinishTime', type: 'date', convert:dateFormat},
			'delayTime','projectBatchNo','memo'
			]
		});

		var store = me.createStore({
			modelName : 'ModelList',
			proxyUrl : appBaseUri + '/sys/statistic/getJcFinishNotTower',
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
			}]
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
			text : "区域经理",
			dataIndex : 'areaMgr',
			sortable:false
		}, {
			text : "区域",
			dataIndex : 'area',
			sortable:false
		}, {
			text : "站名",
			dataIndex : 'stationName',
			sortable:false
		}, {
			text : "铁塔单位",
			dataIndex : 'towerUnit',
			sortable:false
		}, {
			text : "进场时间",
			dataIndex : 'jcFinishTime',
			xtype: 'datecolumn',
			renderer: Ext.util.Format.dateRenderer('Y-m-d'),
			sortable:false
		}, {
			text : "延迟装塔时间",
			dataIndex : 'delayTime',
			sortable:false
		}, {
			text : "工程批次",
			dataIndex : 'projectBatchNo',
			sortable:false
		}, {
			text : "备注",
			dataIndex : 'memo',
			width: '25%',
			sortable:false
		}
			];

		var ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
			id: 'towerNotFinishTT',
			items : [ {
				xtype : 'datefield',
				fieldLabel : '查询日期',
				id : 'query-towerNotFinish-dateStr',
				name : 'dateStr',
				format: 'Y-m-d'
			}, {
				xtype : 'button',
				text : '查询',
				iconCls : 'icon-search',
				//disabled : !globalObject.haveActionMenu(me.cButtons, 'Query'),
				width : '10%',
				maxWidth : 60,
				handler : function(btn, eventObj) {
					var searchParams = {
							dateStr : Ext.getCmp('query-towerNotFinish-dateStr').getValue()
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
					Ext.getCmp('query-towerNotFinish-dateStr').setValue(null);
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
