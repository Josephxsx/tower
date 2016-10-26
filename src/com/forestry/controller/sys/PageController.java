package com.forestry.controller.sys;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.forestry.core.ForestryBaseController;
import com.forestry.model.sys.Config;

@Controller
@RequestMapping("/page")
public class PageController extends ForestryBaseController<Config> {
	@RequestMapping("/progress_importjz")
	public void progress_importjz(HttpServletRequest request, HttpServletResponse response) throws IOException {
	StringBuilder sb = new StringBuilder("");
	sb.append("(function(contextOptions,contextOwner){\n");
		sb.append("var app={};\n");
		sb.append("app.contextOwner=contextOwner;\n");
		sb.append("app.tab1=app._tab1=new Ext.tab.Panel({appScope:app,itemId:\"tab1\",items:[\n");
		sb.append("{appScope:app,xtype:\"form\",title:\"新建基站导入\",height:128,baseParams:{abc:123},layout:\"absolute\",width:456,itemId:\"form1\",items:[\n");
		sb.append("{appScope:app,xtype:\"filefield\",labelWidth:120,allowBlank:false,width:360,labelAlign:\"right\",itemId:\"file1\",fieldLabel:\"选择新建基站文件\",y:24,x:32\n");
		sb.append("},\n");
		sb.append("{appScope:app,xtype:\"button\",text:\"导入新建基站\",width:88,itemId:\"successBtn\",y:64,x:184,listeners:{\n");
		sb.append("click:function(button,e,options){\n");
		sb.append("//文件上传必须使用form控件,form控件可以嵌套在任何容器中，包括panel,window和viewport等。\n");
		sb.append("if (!Wb.verify(app.form1)) //验证值是否合法\n");
		sb.append("return;\n");
		sb.append("//上传数据。此方法采用multipart/form-data编码上传数据，因此后台必须通过request.getAttribute(itemId)获取指定控件数据\n");
		sb.append("Wb.upload({\n");		
		sb.append("form: app.form1, //上传的表单控件，必选项\n");
		sb.append("  //showProgress: true, //显示上传进度条\n");
		sb.append("url: ctxPath +'/new_towerinfo/import_jz',\n");
		sb.append(" //out:[panel1, grid1],以控件列表的方式上传指定控件值\n");
		sb.append(" showMask: true,//上传过程不显示mask\n");
		sb.append(" message: '正在导入中...',\n");
		sb.append(" //mask: app.form1, //mask遮盖对象，未指定默认为全屏，前1.5秒透明遮盖。\n");
		sb.append(" reset: true,\n");
		sb.append(" params: { //以json对象表达的参数列表\n");
		sb.append("   foo: 'bar',\n");
		sb.append("  num: 123,\n");
		sb.append("  date: new Date()\n");
		sb.append(" },\n");
		sb.append(" //上传成功之后的回调方法\n");
		sb.append("success: function(form, action, data) {\n");
		sb.append("  console.log(action);\n");
		sb.append("  //value为服务器返回的值，action.response.responseText为服务器返回的原始值\n");
		sb.append("  Wb.info(action.result.message);\n");
		sb.append("  }\n");
		sb.append("});\n");
		sb.append("}\n");
		sb.append("}\n");
		sb.append("}\n");
		sb.append("]},\n");
		sb.append("{appScope:app,xtype:\"form\",title:\"共享基站导入\",height:128,baseParams:{abc:123},layout:\"absolute\",width:456,itemId:\"form2\",items:[\n");
		sb.append("{appScope:app,xtype:\"filefield\",labelWidth:120,allowBlank:false,width:360,labelAlign:\"right\",itemId:\"file1\",fieldLabel:\"选择共享基站文件\",y:24,x:32\n");
		sb.append("},\n");
		sb.append("{appScope:app,xtype:\"button\",text:\"导入共享基站\",width:88,itemId:\"successBtn\",y:64,x:184,listeners:{\n");
		sb.append("click:function(button,e,options){\n");
		sb.append("//文件上传必须使用form控件,form控件可以嵌套在任何容器中，包括panel,window和viewport等。\n");
		sb.append("if (!Wb.verify(app.form2)) //验证值是否合法\n");
		sb.append("  return;\n");
		sb.append("//上传数据。此方法采用multipart/form-data编码上传数据，因此后台必须通过request.getAttribute(itemId)获取指定控件数据\n");
		sb.append("Wb.upload({\n");
		sb.append(" form: app.form2, //上传的表单控件，必选项\n");
		sb.append(" //showProgress: true, //显示上传进度条\n");
		sb.append(" url: ctxPath +'/share_towerinfo/import_jz',\n");
		sb.append("  //out:[panel1, grid1],以控件列表的方式上传指定控件值\n");
		sb.append("  //showMask: false,上传过程不显示mask\n");
		sb.append("  //message: '正在导入中...',\n");
		sb.append("  //mask: app.form2, //mask遮盖对象，未指定默认为全屏，前1.5秒透明遮盖。\n");
		sb.append("  reset: true,\n");
		sb.append("  params: { //以json对象表达的参数列表\n");
		sb.append("  foo: 'bar',\n");
		sb.append("  num: 123,\n");
		sb.append("   date: new Date()\n");
		sb.append(" },\n");
		sb.append(" //上传成功之后的回调方法\n");
		sb.append(" success: function(form, action, value) {\n");
		sb.append("   //value为服务器返回的值，action.response.responseText为服务器返回的原始值\n");
		sb.append("   Wb.info(action.result.message);\n");
		sb.append("  }\n");
		sb.append("});\n");
		sb.append("}\n");
		sb.append("}\n");
		sb.append("}\n");
		sb.append("]}\n");
		sb.append("]});\n");

		sb.append("return app;})();\n");
		writeJSON(response, sb.toString());
	}
}
