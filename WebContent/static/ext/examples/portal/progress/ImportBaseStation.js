Ext.define('App.ImportPanel', {
		extend : 'Ext.panel.Panel',
		constructor : function(config) {
			config = config || {};
			var downloadUri;
			if (config.type == 'New') {
				downloadUri = appBaseUri + '/sys/baseStation/downloadTemplateFile';
			} else {
				downloadUri = appBaseUri + '/sys/shareStation/downloadTemplateFile';
			}
			var scope = this;
			Ext.apply(config, {
//				title : '树木识别数据导入',
				width : 500,
				height : 140,
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
							scope.importForestryFile(btn, config.type);
						}
					}, '->' ]
				} ]
			});
			App.ImportPanel.superclass.constructor.call(this, config);
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
		importForestryFile : function(btn, type) {
			var postUri;
			if (type === 'New') {
				postUri = '/sys/baseStation/importNewStationFile';
			} else {
				postUri = '/sys/shareStation/importNewStationFile';
			}
			//var windowObj = btn.up('window');// 获取Window对象
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
						//windowObj.close();// 关闭窗体
						//Ext.getCmp('forestryimportgrid').getStore().reload();
					},
					failure : function(response, options) {
						globalObject.errTip(options.result.msg);
					}
				});
			}
		}
	});

Ext.define('Forestry.app.progress.ImportBaseStation', {
    extend: 'Ext.tab.Panel',
    id: 'importBaseStationTab',
    
    initComponent: function () {
    	var tabs = Ext.getCmp("importBaseStationTab");
		if(!tabs) {
			var bt = new App.ImportPanel({type: 'New'});
			var st = new App.ImportPanel({type: 'Share'});
			Ext.apply(this, {
				items: [{
			    	title: '新建基站导入',
			    	width: 400,
			    	items : [bt]
			    },{
			    	title: '共享基站导入',
			    	width: 400,
			    	items : [st]
			    }]
	    	});
		}
    	
        this.callParent(arguments);
    }
});