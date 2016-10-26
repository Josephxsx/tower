Ext.define('Ext.ux.custom.TimeoutController', {
  extend : 'Ext.data.Store',
  alias : 'widget.timeoutstore',
  constructor : function(config) {
    Ext.apply(config.proxy, {
      listeners : {
        exception : function(self, response) {
          var responseText = response.responseText;
          if (responseText
              && responseText.indexOf("SESSION_TIMEOUT_ERROR") > 0) {
            top.location = '../../login.jsp';
          }
        }
      }
    });
    this.callParent([config]);
  },

  statics : {
    request : function(config) {
      var f = config.success;
      config.success = Ext.Function.createInterceptor(f, function(
              response) {
            var txt = response.responseText;
            // alert(txt);
            if (txt && txt.indexOf("SESSION_TIMEOUT_ERROR") > 0) {
              top.location = '../../login.jsp';
              return false;
            }

            return true;
          });
      Ext.Ajax.request(config);
    }
  }
});