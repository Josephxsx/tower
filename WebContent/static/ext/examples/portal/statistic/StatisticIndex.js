Ext.define('Forestry.app.statistic.StatisticIndex', {
    extend: 'Ext.tab.Panel',
    id: 'StatisticIndexTab'/*,
    items: [{
    	id: 'baseStationStatTab',
    	layout : 'fit',
		height:'100%',
    	title: '新建基站数据',
    	items : [Ext.create("Forestry.app.statistic.BaseStationPanel")]
    },{
    	id: 'shareStationStatTab',
    	layout : 'fit',
		height:'100%',
    	title: '共享基站数据',
    	items : [Ext.create("Forestry.app.statistic.ShareStationPanel")]
    }],
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
    }*/,
    initComponent: function () {
    	var bt = Ext.getCmp("baseStationStatTab");
		if(!bt) {
			bt = Ext.create("Forestry.app.statistic.BaseStationPanel");
		}
		
		var st = Ext.getCmp("shareStationStatTab");
		if(!st) {
			st = Ext.create("Forestry.app.statistic.ShareStationPanel");
		}
    	Ext.apply(this, {
    		items: [{
    	    	id: 'baseStationStatTab',
    	    	layout : 'fit',
    			height:'100%',
    	    	title: '新建基站数据',
    	    	items : [bt]
    	    },{
    	    	id: 'shareStationStatTab',
    	    	layout : 'fit',
    			height:'100%',
    	    	title: '共享基站数据',
    	    	items : [st]
    	    }]
    	});
    	
        this.callParent(arguments);
    }
});
