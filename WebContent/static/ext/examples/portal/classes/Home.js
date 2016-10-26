Ext.define('Ext.app.Home',{ // 起始页
	extend : 'Ext.form.Panel',
	initComponent : function() {
		Ext.apply(this,{
			autoScroll : true,
			defaults : {
				defaults : {
					ui : 'light',
					closable : false
				}
			},
			items : [ {
				id : 'c1',
				items : [ {
					id : 'p1',
					//title : '欢迎语',
					style : 'padding:10px; line-height:22px;',
					html : '<center><img src = "' + appBaseUri + '/static/leaflet/images/chinatower.jpg" width = "600" height = "300"/></center>'
				} ]
			} ],
			isReLayout : false
		});
		this.callParent(arguments);
	}
});
