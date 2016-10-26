package com.forestry.controller.sys;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.forestry.core.ForestryBaseController;
import com.forestry.model.sys.BaseStation;
import com.forestry.service.sys.BaseStationService;
import com.forestry.service.sys.ShareStationService;

import core.extjs.ListView;
import core.support.QueryResult;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/sys/statistic")
public class StatisticController extends ForestryBaseController<BaseStation>{
	@Resource
	private BaseStationService baseStationService;
	
	@Resource
	private ShareStationService shareStationService;
	
	@RequestMapping("/getIndexForBaseStation")
	public void getIndexForBaseStation(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String batchNo = request.getParameter("projectBatchNo");

		List<Object[]> forestryTypeList = baseStationService.getStatisticIndex(batchNo);
		JSONArray jsonArray = new JSONArray();
		Integer total = 0, inFinishNum = 0, jcFinishNum = 0, towerFinishNum = 0, ydFinishNum = 0;
		for (int i = 0; i < forestryTypeList.size(); i++) {
			Object[] value = forestryTypeList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i + 1);
				jsonObject.element("area",  value[0]);
				jsonObject.element("total",  value[1]);
				if (value[1] != null) {
					total += Integer.valueOf(value[1].toString());
				}
				jsonObject.element("xzFinish",  value[2]);
				jsonObject.element("dkFinish",  value[3]);
				jsonObject.element("sjFinish",  value[4]);
				jsonObject.element("inFinish",  value[5]);
				if (value[5] != null) {
					inFinishNum += Integer.valueOf(value[5].toString());
				}
				jsonObject.element("jcFinish",  value[6]);
				if (value[6] != null) {
					jcFinishNum += Integer.valueOf(value[6].toString());
				}
				jsonObject.element("towerFinish",  value[7]);
				if (value[7] != null) {
					towerFinishNum += Integer.valueOf(value[7].toString());
				}
				jsonObject.element("ydsjFinish",  value[8]);
				jsonObject.element("ydProgFinish",  value[9]);
				jsonObject.element("ydFinish",  value[10]);
				if (value[10] != null) {
					ydFinishNum += Integer.valueOf(value[10].toString());
				}
				jsonObject.element("ptFinish",  value[11]);
				jsonObject.element("dhFinish",  value[12]);
				jsonObject.element("totalFinish",  value[13]);
				jsonArray.add(jsonObject);
			
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.element("id",  forestryTypeList.size() + 1);
		jsonObject.element("area",  "总计");
		jsonObject.element("total",  total);
		jsonObject.element("xzFinish",  new Object());
		jsonObject.element("dkFinish",  new Object());
		jsonObject.element("sjFinish",  new Object());
		jsonObject.element("inFinish",  inFinishNum);
		jsonObject.element("jcFinish",  jcFinishNum);
		
		jsonObject.element("towerFinish",  towerFinishNum);

		jsonObject.element("ydsjFinish",  new Object());
		jsonObject.element("ydProgFinish",  new Object());
		jsonObject.element("ydFinish",  ydFinishNum);
		jsonObject.element("ptFinish",  new Object());
		jsonObject.element("dhFinish",  new Object());
		jsonObject.element("totalFinish",  new Object());
		jsonArray.add(jsonObject);
		//JSONObject resultJSONObject = new JSONObject();
		ListView<JSONObject> list = new ListView<JSONObject>();
		list.setData(jsonArray);
		list.setTotalRecord(Long.valueOf((forestryTypeList.size())));
		//resultJSONObject.element("list", jsonArray);
		writeJSON(response, list);
	}
	
	@RequestMapping("/getIndexForShareStation")
	public void getIndexForShareStation(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String batchNo = request.getParameter("projectBatchNo");

		List<Object[]> forestryTypeList = shareStationService.getStatisticIndex(batchNo);
		JSONArray jsonArray = new JSONArray();
		Integer total = 0,  ydFinishNum = 0;
		for (int i = 0; i < forestryTypeList.size(); i++) {
			Object[] value = forestryTypeList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i + 1);
				jsonObject.element("area",  value[0]);
				jsonObject.element("total",  value[1]);
				if (value[1] != null) {
					total += Integer.valueOf(value[1].toString());
				}
				jsonObject.element("ydFinish",  value[2]);
				if (value[2] != null) {
					ydFinishNum += Integer.valueOf(value[2].toString());
				}
				jsonArray.add(jsonObject);
			
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.element("id",  forestryTypeList.size() + 1);
		jsonObject.element("area",  "总计");
		jsonObject.element("total",  total);
		jsonObject.element("ydFinish",  ydFinishNum);
		
		jsonArray.add(jsonObject);
		ListView<JSONObject> list = new ListView<JSONObject>();
		list.setData(jsonArray);
		list.setTotalRecord(Long.valueOf((forestryTypeList.size())));
		writeJSON(response, list);
	}
	
	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");

	@RequestMapping("/getXZFinishNotIn")
	public void getXZFinishNotIn(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dateStr = request.getParameter("dateStr");
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
		BaseStation baseStation = new BaseStation();
		baseStation.setFirstResult(firstResult);
		baseStation.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		baseStation.setSortedConditions(sortedCondition);
		QueryResult<Object[]> qr = baseStationService.getXzFinishNotIn(dateStr, baseStation);
		List<Object[]> forestryTypeList = qr.getResultList();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < forestryTypeList.size(); i++) {
			Object[] value = forestryTypeList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i + 1);
				jsonObject.element("areaMgr",  value[0]);
				jsonObject.element("area",  value[1]);
				jsonObject.element("stationName",  value[2]);
				jsonObject.element("xzName",  value[3]);
				if (value[4] != null) {
					jsonObject.element("xzFinishTime",  value[4].toString());
				} else {
					jsonObject.element("xzFinishTime",  "");
				}
				jsonObject.element("delayTime",  value[5]);
				jsonObject.element("projectBatchNo",  value[6]);
				jsonObject.element("memo",  value[7]);
				jsonArray.add(jsonObject);
			
		}

		ListView<JSONObject> list = new ListView<JSONObject>();
		list.setData(jsonArray);
		list.setTotalRecord(qr.getTotalCount());
		writeJSON(response, list);
	}
	
	@RequestMapping("/getInFinishNotWG")
	public void getInNotFinishInTime(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dateStr = request.getParameter("dateStr");
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
		BaseStation baseStation = new BaseStation();
		baseStation.setFirstResult(firstResult);
		baseStation.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		baseStation.setSortedConditions(sortedCondition);
		QueryResult<Object[]> qr = baseStationService.getInFinishNotWG(dateStr, baseStation);
		List<Object[]> forestryTypeList = qr.getResultList();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < forestryTypeList.size(); i++) {
			Object[] value = forestryTypeList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i + 1);
				jsonObject.element("areaMgr",  value[0]);
				jsonObject.element("area",  value[1]);
				jsonObject.element("stationName",  value[2]);
				//jsonObject.element("xzName",  value[3]);
				if (value[3] != null) {
					jsonObject.element("kgTime",  value[3].toString());
				} else {
					jsonObject.element("kgTime",  "");
				}
				jsonObject.element("delayTime",  value[4]);
				jsonObject.element("projectBatchNo",  value[5]);
				jsonObject.element("memo",  value[6]);
				jsonArray.add(jsonObject);
			
		}

		ListView<JSONObject> list = new ListView<JSONObject>();
		list.setData(jsonArray);
		list.setTotalRecord(qr.getTotalCount());
		writeJSON(response, list);
	}
	
	@RequestMapping("/getJcFinishNotTower")
	public void getJcFinishNotTower(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dateStr = request.getParameter("dateStr");
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
		BaseStation baseStation = new BaseStation();
		baseStation.setFirstResult(firstResult);
		baseStation.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		baseStation.setSortedConditions(sortedCondition);
		QueryResult<Object[]> qr = baseStationService.getJcFinishNotTower(dateStr, baseStation);
		List<Object[]> forestryTypeList = qr.getResultList();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < forestryTypeList.size(); i++) {
			Object[] value = forestryTypeList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i + 1);
				jsonObject.element("areaMgr",  value[0]);
				jsonObject.element("area",  value[1]);
				jsonObject.element("stationName",  value[2]);
				jsonObject.element("towerUnit",  value[3]);
				if (value[4] != null) {
					jsonObject.element("jcFinishTime",  value[4].toString());	
				} else {
					jsonObject.element("jcFinishTime",  "");	
				}
				jsonObject.element("delayTime",  value[5]);
				jsonObject.element("projectBatchNo",  value[6]);
				jsonObject.element("memo",  value[7]);
				jsonArray.add(jsonObject);
			
		}

		ListView<JSONObject> list = new ListView<JSONObject>();
		list.setData(jsonArray);
		list.setTotalRecord(qr.getTotalCount());
		writeJSON(response, list);
	}
	
	@RequestMapping("/getNoYdProgram")
	public void getNoYdProgram(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dateStr = request.getParameter("dateStr");
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
		BaseStation baseStation = new BaseStation();
		baseStation.setFirstResult(firstResult);
		baseStation.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		baseStation.setSortedConditions(sortedCondition);
		QueryResult<Object[]> qr = baseStationService.getNoYdProgram(dateStr, baseStation);
		List<Object[]> forestryTypeList = qr.getResultList();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < forestryTypeList.size(); i++) {
			Object[] value = forestryTypeList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i + 1);
				jsonObject.element("areaMgr",  value[0]);
				jsonObject.element("area",  value[1]);
				jsonObject.element("stationName",  value[2]);
				jsonObject.element("ydUnit",  value[3]);
				if (value[4] != null) {
					jsonObject.element("towerFinishTime",  value[4].toString());
				} else {
					jsonObject.element("towerFinishTime",  "");
				}
				jsonObject.element("delayTime",  value[5]);
				jsonObject.element("projectBatchNo",  value[6]);
				jsonObject.element("memo",  value[7]);
				jsonArray.add(jsonObject);
			
		}

		ListView<JSONObject> list = new ListView<JSONObject>();
		list.setData(jsonArray);
		list.setTotalRecord(qr.getTotalCount());
		writeJSON(response, list);
	}
	
	@RequestMapping("/getNoYdFinish")
	public void getNoYdFinish(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dateStr = request.getParameter("dateStr");
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
		BaseStation baseStation = new BaseStation();
		baseStation.setFirstResult(firstResult);
		baseStation.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		baseStation.setSortedConditions(sortedCondition);
		QueryResult<Object[]> qr = baseStationService.getNoYdFinish(dateStr, baseStation);
		List<Object[]> forestryTypeList = qr.getResultList();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < forestryTypeList.size(); i++) {
			Object[] value = forestryTypeList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i + 1);
				jsonObject.element("areaMgr",  value[0]);
				jsonObject.element("area",  value[1]);
				jsonObject.element("stationName",  value[2]);
				jsonObject.element("ydUnit",  value[3]);
				if (value[4] != null) {
					jsonObject.element("ydProgramTime",  value[4].toString());
				} else {
					jsonObject.element("ydProgramTime",  "");
				}
				jsonObject.element("delayTime",  value[5]);
				jsonObject.element("projectBatchNo",  value[6]);
				jsonObject.element("memo",  value[7]);
				jsonArray.add(jsonObject);
			
		}

		ListView<JSONObject> list = new ListView<JSONObject>();
		list.setData(jsonArray);
		list.setTotalRecord(qr.getTotalCount());
		writeJSON(response, list);
	}
}
