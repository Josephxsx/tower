Ext.define('Forestry.app.progress.BaseStationList', {
    extend: 'Ext.tab.Panel',
    id:'baseStationListTab',
   /*,
    listeners:{ 
        tabchange:function(tp,p){ 
            if(p.id=='stationTab'){ 
                //alert('新建基站数据'); 
                Ext.getCmp("shareStationTT").hide();
                Ext.getCmp("baseStationTT").show();
            }else{
            	//alert('共享基站数据');
            	Ext.getCmp("baseStationTT").hide();
            	Ext.getCmp("shareStationTT").show();
            }
        } 
    }*/
    initComponent: function () {
    	var tabs = Ext.getCmp("baseStationListTab");
		if(!tabs) {
			var bt = Ext.create("Forestry.app.progress.BaseStationEntry");
			var st = Ext.create("Forestry.app.progress.ShareStationEntry");
			Ext.apply(this, {
				 items: [{
				    	id: 'stationTab',
				    	layout : 'fit',
						height:'100%',
				    	title: '新建基站数据',
				    	items : [bt]
				    },{
				    	id: 'shareStationTab',
						layout : 'fit',
						height:'100%', 
				    	title: '共享基站数据',
				    	items : [st]
				    }]
			})
		}
        this.callParent(arguments);
    }
});
