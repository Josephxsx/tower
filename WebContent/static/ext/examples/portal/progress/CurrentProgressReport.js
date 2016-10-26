Ext.define('Forestry.app.progress.CurrentProgressReport', {
    extend: 'Ext.panel.Panel',
    initComponent: function () {
    	var progressStore = Ext.create('Ext.data.JsonStore', {
			proxy : {
				type : 'ajax',
				url : appBaseUri + '/sys/baseStation/getCurrentProgress',
				reader : {
					type : 'json',
					root : ''
				}
			},
			fields : [ 'xz','jc', 'tower' ]
		});
    	
    	
    	
    	Ext.apply(this, {
			store : progressStore,
			items: [{
				 html : '以下内容根据各项完工状态为“是”，且完工日期为今日进行统计所得。',
				 margin: "0 0 10 0"
			},
			        {
		        xtype: "textarea",
		        fieldLabel: "选址完工",
		        id: "xz",
		        labelSepartor: "：",
		        labelWidth: 60,
		        width: 600
		    },
			        {
		        xtype: "textarea",
		        fieldLabel: "基础完工",
		        id: "jc",
		        labelSepartor: "：",
		        labelWidth: 60,
		        width: 600
		    },
		    {
		        xtype: "textarea",
		        fieldLabel: "铁塔完工",
		        id: "tower",
		        labelSepartor: "：",
		        labelWidth: 60,
		        width: 600
		    }]
		});
    	progressStore.load({callback:function(records, options, success) {
    		if (records[0].get("jc") == "") {
    			Ext.getCmp('jc').setValue("今日无进度");
    		} else {
    			Ext.getCmp('jc').setValue(records[0].get("jc"));
    		}
    		if (records[0].get("xz") == "") {
    			Ext.getCmp('xz').setValue("今日无进度");
    		} else {
    			Ext.getCmp('xz').setValue(records[0].get("xz"));
    		}
    		if (records[0].get("tower") == "") {
    			Ext.getCmp('tower').setValue("今日无进度");
    		} else {
    			Ext.getCmp('tower').setValue(records[0].get("tower"));
    		}
    		
    	}});
        this.callParent(arguments);
    }
});