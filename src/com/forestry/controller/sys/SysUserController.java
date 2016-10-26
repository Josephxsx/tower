package com.forestry.controller.sys;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.forestry.core.Constant;
import com.forestry.core.ForestryBaseController;
import com.forestry.model.sys.SysUser;
import com.forestry.model.sys.TreeItem;
import com.forestry.service.sys.SysUserService;

import core.extjs.ExtJSBaseParameter;
import core.extjs.ListView;
import core.support.Item;
import core.support.QueryResult;
import core.util.MD5;
import core.web.SystemCache;

/**
 * @author Yang Tian
 * @email 1298588579@qq.com
 */
@Controller
@RequestMapping("/sys/sysuser")
public class SysUserController extends ForestryBaseController<SysUser> implements Constant {

	@Resource
	private SysUserService sysUserService;

	@RequestMapping("/login")
	public void login(SysUser sysUserModel, HttpServletRequest request, HttpServletResponse response) throws IOException {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		SysUser sysUser = sysUserService.getByProerties("userName", sysUserModel.getUserName());
		if (sysUser == null || sysUser.getRole() == 0) { // 用户名有误或已被禁用
			result.put("result", -1);
			writeJSON(response, result);
			return;
		}
		if (!sysUser.getPassword().equals(MD5.crypt(sysUserModel.getPassword()))) { // 密码错误
			result.put("result", -2);
			writeJSON(response, result);
			return;
		}
		sysUser.setLastLoginTime(new Date());
		sysUserService.update(sysUser);
		request.getSession().setAttribute(SESSION_SYS_USER, sysUser);
		result.put("result", 1);
		writeJSON(response, result);
	}

	@RequestMapping("/home")
	public String home(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (request.getSession().getAttribute(SESSION_SYS_USER) == null) {
			return "";
		} else {
			return "back/main";
		}
	}

	@RequestMapping("/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.getSession().removeAttribute(SESSION_SYS_USER);
		response.sendRedirect(request.getContextPath() + "/login.jsp");
	}

	@RequestMapping("/resetPassword")
	public void resetPassword(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String userName = request.getParameter("userName");
		String oldPassword = request.getParameter("oldPassword");
		String newPassword = request.getParameter("newPassword");
		Map<String, Object> result = new HashMap<String, Object>();
		SysUser sysUser = sysUserService.getByProerties("userName", userName);
		if (!sysUser.getPassword().equals(MD5.crypt(oldPassword))) {
			result.put("result", -2);
			writeJSON(response, result);
			return;
		}
		result.put("result", 1);
		sysUser.setPassword(MD5.crypt(newPassword));
		sysUserService.update(sysUser);
		writeJSON(response, result);
	}

	@RequestMapping("/externalVerifySysUser")
	public void externalVerifySysUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		SysUser sysUser = sysUserService.getByProerties(new String[] { "userName", "password" }, new Object[] { username, MD5.crypt(password) });
		if (null == sysUser) {
			writeJSON(response, "{success:false}");
		} else {
			writeJSON(response, "{success:true}");
		}
	}

	@RequestMapping("/getRoleName")
	public void getRoleName(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONArray jsonArray = new JSONArray();
		for (Map.Entry<String, Item> roleMap : SystemCache.DICTIONARY.get("SYSUSER_ROLE").getItems().entrySet()) {
			Item item = roleMap.getValue();
			JSONObject jsonObject = new JSONObject();
			jsonObject.element("ItemText", item.getValue());
			jsonObject.element("ItemValue", item.getKey());
			jsonArray.add(jsonObject);
		}
		JSONObject resultJSONObject = new JSONObject();
		resultJSONObject.element("list", jsonArray);
		writeJSON(response, resultJSONObject);
	}

	@Override
	@RequestMapping(value = "/saveSysUser", method = { RequestMethod.POST, RequestMethod.GET })
	public void doSave(SysUser entity, HttpServletRequest request, HttpServletResponse response) throws IOException {
		ExtJSBaseParameter parameter = ((ExtJSBaseParameter) entity);
		SysUser checkuserName = sysUserService.getByProerties("userName", entity.getUserName());
		if (null != checkuserName && null == entity.getId()) {
			parameter.setSuccess(false);
		} else {
			if (CMD_EDIT.equals(parameter.getCmd())) {
				entity.setLastLoginTime(checkuserName.getLastLoginTime());
				sysUserService.update(entity);
			} else if (CMD_NEW.equals(parameter.getCmd())) {
				entity.setPassword(MD5.crypt(entity.getPassword()));
				sysUserService.persist(entity);
			}
			parameter.setCmd(CMD_EDIT);
			parameter.setSuccess(true);
		}
		writeJSON(response, parameter);
	}

	@RequestMapping(value = "/getSysUser", method = { RequestMethod.POST, RequestMethod.GET })
	public void getSysUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Integer firstResult = Integer.valueOf(request.getParameter("start"));
		Integer maxResults = Integer.valueOf(request.getParameter("limit"));
		String sortedObject = null;
		String sortedValue = null;
		List<LinkedHashMap<String, Object>> sortedList = mapper.readValue(request.getParameter("sort"), List.class);
		for (int i = 0; i < sortedList.size(); i++) {
			Map<String, Object> map = sortedList.get(i);
			sortedObject = (String) map.get("property");
			sortedValue = (String) map.get("direction");
		}
		SysUser sysUser = new SysUser();
		String userName = request.getParameter("userName");
		if (StringUtils.isNotBlank(userName)) {
			sysUser.set$like_userName(userName);
		}
		String realName = request.getParameter("realName");
		if (StringUtils.isNotBlank(realName)) {
			sysUser.set$like_realName(realName);
		}
		String role = request.getParameter("role");
		if (StringUtils.isNotBlank(role)) {
			sysUser.set$eq_role(Short.valueOf(role));
		}
		sysUser.setFirstResult(firstResult);
		sysUser.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		sysUser.setSortedConditions(sortedCondition);
		QueryResult<SysUser> queryResult = sysUserService.doPaginationQuery(sysUser);
		List<SysUser> forestryList = sysUserService.getSysUserList(queryResult.getResultList());
		ListView<SysUser> forestryListView = new ListView<SysUser>();
		forestryListView.setData(forestryList);
		forestryListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, forestryListView);
	}

	@RequestMapping("/deleteSysUser")
	public void deleteSysUser(HttpServletRequest request, HttpServletResponse response, @RequestParam("ids") Long[] ids) throws IOException {
		if (Arrays.asList(ids).contains(Long.valueOf("1"))) {
			writeJSON(response, "{success:false,msg:'删除项包含超级管理员，超级管理员不能删除！'}");
		} else {
			boolean flag = sysUserService.deleteByPK(ids);
			if (flag) {
				writeJSON(response, "{success:true}");
			} else {
				writeJSON(response, "{success:false}");
			}
		}
	}

	@RequestMapping(value = "/getRoleNameList")
	public void getRoleNameList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List roleNameList = new ArrayList();
		for (Map.Entry<String, Item> roleMap : SystemCache.DICTIONARY.get("SYSUSER_ROLE").getItems().entrySet()) {
			Item item = roleMap.getValue();
			SysUser sysUser = new SysUser();
			sysUser.setRole(Short.valueOf(item.getKey()));
			sysUser.setRoleName(item.getValue());
			roleNameList.add(sysUser);
		}
		ListView roleNameListView = new ListView();
		roleNameListView.setData(roleNameList);
		roleNameListView.setTotalRecord(Long.valueOf(roleNameList.size()));
		writeJSON(response, roleNameListView);
	}

	@RequestMapping(value = "/getTree")
	public void getTree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		/*List roleNameList = new ArrayList();
		for (Map.Entry<String, Item> roleMap : SystemCache.DICTIONARY.get("SYSUSER_ROLE").getItems().entrySet()) {
			Item item = roleMap.getValue();
			SysUser sysUser = new SysUser();
			sysUser.setRole(Short.valueOf(item.getKey()));
			sysUser.setRoleName(item.getValue());
			roleNameList.add(sysUser);
		}
		ListView roleNameListView = new ListView();
		roleNameListView.setData(roleNameList);
		roleNameListView.setTotalRecord(Long.valueOf(roleNameList.size()));*/
		TreeItem parent = new TreeItem();
		parent.setId(3);
		parent.setOrderno(1000);
		parent.setName("进度管理");
		parent.setEnabled(true);
		parent.setCode("progress");
		parent.setLeaf(false);
		parent.setExpanded(false);
		parent.setInframe(false);
		
		/*
		TreeItem child = new TreeItem();
		child.setId(4);
		child.setOrderno(1010);
		child.setName("导入基站");
		child.setEnabled(true);
		child.setCode("progress_importjz");
		child.setLeaf(true);
		child.setExpanded(true);
		child.setInframe(false);
		child.setUrl("progress/importjz");
		child.setParent(parent);
		ArrayList arr = new ArrayList();
		arr.add(child);
		//parent.setChildren(arr);
		*/
		String json = "[{\"id\":3,\"parent\":null,\"bigIcon\":null,\"plugin\":null,\"orderno\":1000,\"name\":\"进度管理\",\"parentId\":null,\"menuIcon\":null,\"enabled\":true,\"code\":\"progress\",\"url\":\"\",\"leaf\":false,\"expanded\":true,\"inframe\":false,\"children\":[{\"id\":4,\"name\":\"导入基站\",\"parentId\":3,\"orderno\":1010,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":3,\"bigIcon\":null,\"code\":\"progress\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度管理\",\"orderno\":1000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"plugin\":null,\"code\":\"progress_importjz\",\"menuIcon\":null,\"enabled\":true,\"url\":\"progress/importjz\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":5,\"parentId\":3,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":3,\"bigIcon\":null,\"code\":\"progress\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度管理\",\"orderno\":1000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"plugin\":null,\"menuIcon\":null,\"enabled\":true,\"url\":\"progress/update\",\"code\":\"progress_update\",\"orderno\":1020,\"name\":\"进度更新\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":31,\"parentId\":3,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":3,\"bigIcon\":null,\"code\":\"progress\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度管理\",\"orderno\":1000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"url\":\"progress/alldrawing\",\"plugin\":null,\"name\":\"所有图纸\",\"code\":\"progress_alldrawing\",\"orderno\":1035,\"menuIcon\":null,\"enabled\":true,\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":6,\"orderno\":1040,\"parentId\":3,\"code\":\"progress_drjdtb\",\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":3,\"bigIcon\":null,\"code\":\"progress\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度管理\",\"orderno\":1000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"url\":\"progress/drjdtb\",\"plugin\":null,\"menuIcon\":null,\"enabled\":true,\"name\":\"当日进度通报\",\"leaf\":true,\"expanded\":true,\"inframe\":false}]},{\"id\":2,\"name\":\"进度报表\",\"parent\":null,\"code\":\"report\",\"bigIcon\":null,\"plugin\":null,\"parentId\":null,\"menuIcon\":null,\"orderno\":2000,\"enabled\":true,\"url\":\"\",\"leaf\":false,\"expanded\":true,\"inframe\":false,\"children\":[{\"id\":7,\"orderno\":2010,\"url\":\"report/zbtj\",\"parentId\":2,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":2,\"bigIcon\":null,\"code\":\"report\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度报表\",\"orderno\":2000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"plugin\":null,\"code\":\"report_zbtj\",\"menuIcon\":null,\"enabled\":true,\"name\":\"指标统计\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":8,\"parentId\":2,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":2,\"bigIcon\":null,\"code\":\"report\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度报表\",\"orderno\":2000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"plugin\":null,\"code\":\"report1\",\"url\":\"report/report1\",\"menuIcon\":null,\"enabled\":true,\"orderno\":2020,\"name\":\"已选址未及时进场\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":9,\"parentId\":2,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":2,\"bigIcon\":null,\"code\":\"report\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度报表\",\"orderno\":2000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"plugin\":null,\"orderno\":2030,\"code\":\"report2\",\"url\":\"report/report2\",\"menuIcon\":null,\"enabled\":true,\"name\":\"已进场未及时完工\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":10,\"orderno\":2040,\"parentId\":2,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":2,\"bigIcon\":null,\"code\":\"report\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度报表\",\"orderno\":2000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"plugin\":null,\"code\":\"report3\",\"menuIcon\":null,\"enabled\":true,\"name\":\"基础完工未及时装塔\",\"url\":\"report/report3\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":11,\"parentId\":2,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":2,\"bigIcon\":null,\"code\":\"report\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度报表\",\"orderno\":2000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"name\":\"引电方案未上报统计\",\"plugin\":null,\"code\":\"report4\",\"menuIcon\":null,\"orderno\":2050,\"enabled\":true,\"url\":\"report/report4\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":12,\"parentId\":2,\"bigIcon\":null,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":2,\"bigIcon\":null,\"code\":\"report\",\"enabled\":true,\"menuIcon\":null,\"name\":\"进度报表\",\"orderno\":2000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"plugin\":null,\"orderno\":2060,\"code\":\"report5\",\"name\":\"引电未完工统计\",\"menuIcon\":null,\"enabled\":true,\"url\":\"report/report5\",\"leaf\":true,\"expanded\":true,\"inframe\":false}]},{\"id\":13,\"parent\":null,\"bigIcon\":null,\"plugin\":null,\"parentId\":null,\"code\":\"finish\",\"menuIcon\":null,\"enabled\":true,\"name\":\"完工报告\",\"orderno\":3000,\"url\":\"\",\"leaf\":false,\"expanded\":true,\"inframe\":false,\"children\":[{\"id\":14,\"name\":\"完工情况\",\"bigIcon\":null,\"plugin\":null,\"code\":\"finish_wgqk\",\"menuIcon\":null,\"enabled\":true,\"parentId\":13,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":13,\"bigIcon\":null,\"code\":\"finish\",\"enabled\":true,\"menuIcon\":null,\"name\":\"完工报告\",\"orderno\":3000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"orderno\":3020,\"url\":\"finish/wgqk\",\"leaf\":true,\"expanded\":true,\"inframe\":false}]},{\"id\":15,\"parent\":null,\"bigIcon\":null,\"plugin\":null,\"code\":\"other\",\"parentId\":null,\"menuIcon\":null,\"enabled\":true,\"name\":\"其他模块\",\"orderno\":4000,\"url\":\"\",\"leaf\":false,\"expanded\":true,\"inframe\":false,\"children\":[{\"id\":16,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":15,\"bigIcon\":null,\"code\":\"other\",\"enabled\":true,\"menuIcon\":null,\"name\":\"其他模块\",\"orderno\":4000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"url\":\"progress/compare\",\"bigIcon\":null,\"plugin\":null,\"orderno\":4010,\"name\":\"进度比对\",\"code\":\"progress_compare\",\"menuIcon\":null,\"enabled\":true,\"parentId\":15,\"leaf\":true,\"expanded\":true,\"inframe\":false}]},{\"id\":1,\"parent\":null,\"bigIcon\":null,\"plugin\":null,\"code\":\"xtgl\",\"parentId\":null,\"menuIcon\":null,\"enabled\":true,\"name\":\"系统管理\",\"url\":\"\",\"orderno\":5000,\"leaf\":false,\"expanded\":true,\"inframe\":false,\"children\":[{\"id\":17,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":1,\"bigIcon\":null,\"code\":\"xtgl\",\"enabled\":true,\"menuIcon\":null,\"name\":\"系统管理\",\"orderno\":5000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"parentId\":1,\"bigIcon\":null,\"orderno\":5010,\"code\":\"cjdw\",\"plugin\":null,\"url\":\"admin/cjdw\",\"menuIcon\":null,\"enabled\":true,\"name\":\"承建单位\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":24,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":1,\"bigIcon\":null,\"code\":\"xtgl\",\"enabled\":true,\"menuIcon\":null,\"name\":\"系统管理\",\"orderno\":5000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"parentId\":1,\"orderno\":5015,\"bigIcon\":null,\"plugin\":null,\"name\":\"监理公司\",\"code\":\"jlgs\",\"menuIcon\":null,\"enabled\":true,\"url\":\"admin/jlgs\",\"leaf\":true,\"expanded\":true,\"inframe\":false},{\"id\":19,\"parent\":{\"class\":\"com.spark.portal.Module\",\"id\":1,\"bigIcon\":null,\"code\":\"xtgl\",\"enabled\":true,\"menuIcon\":null,\"name\":\"系统管理\",\"orderno\":5000,\"parent\":null,\"plugin\":null,\"url\":\"\"},\"parentId\":1,\"url\":\"user\",\"bigIcon\":null,\"orderno\":5040,\"code\":\"user\",\"menuIcon\":null,\"plugin\":\"spark-portal\",\"enabled\":true,\"name\":\"用户管理\",\"leaf\":true,\"expanded\":true,\"inframe\":false}]}]";
		writeJSON(response, json);
	}
}
