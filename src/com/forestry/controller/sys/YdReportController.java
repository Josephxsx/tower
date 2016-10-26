package com.forestry.controller.sys;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.RequestContext;

import com.forestry.core.ForestryBaseController;
import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.YdReport;
import com.forestry.service.sys.BaseStationService;
import com.forestry.service.sys.YdReportService;

import core.extjs.ExtJSBaseParameter;
import core.extjs.ListView;
import core.support.QueryResult;
import net.sf.json.JSONObject;
@Controller
@RequestMapping("/sys/ydreport")
public class YdReportController extends ForestryBaseController<YdReport>{
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");

	@Resource
	private YdReportService ydReportService;
	@Resource
	private BaseStationService baseStationService;

	
	@RequestMapping("/getReport")
	public void getReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
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
		YdReport report = new YdReport();
		
		String requirementNo = request.getParameter("requirementNo");
		if (StringUtils.isNotBlank(requirementNo)) {
			report.set$like_requirementNo(requirementNo);
		}
		
		report.setFirstResult(firstResult);
		report.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		report.setSortedConditions(sortedCondition);
		QueryResult<YdReport> queryResult = ydReportService.doPaginationQuery(report);
		List<YdReport> reportList = ydReportService.getReportList(queryResult.getResultList());
		ListView<YdReport> ydReportListView = new ListView<YdReport>();
		ydReportListView.setData(reportList);
		ydReportListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, ydReportListView);	
	}
	
	@RequestMapping(value = "/saveReport", method = { RequestMethod.POST, RequestMethod.GET })
	public void saveReport(YdReport entity, HttpServletRequest request, HttpServletResponse response) throws IOException {
		ExtJSBaseParameter parameter = ((ExtJSBaseParameter) entity);
		if (null == entity.getId()) {
			parameter.setSuccess(false);
		} else {
			ydReportService.update(entity);
			generateReport(entity);
			parameter.setSuccess(true);
		}
		writeJSON(response, parameter);
	}
	
	@RequestMapping(value = "/importReportFile", method = RequestMethod.POST)
	public void importDesignFile(@RequestParam("id") Integer id,@RequestParam(value = "importedFile", required = false) MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String doctype = "ydReport";
		String requirementNo = request.getParameter("requirementNo");
		RequestContext requestContext = new RequestContext(request);
		JSONObject json = new JSONObject();	
		if (!file.isEmpty()) {
				try {
					String originalFilename = file.getOriginalFilename();
					String fileName = requirementNo + "-" + doctype + "-" +sdf.format(new Date()) + originalFilename.substring(originalFilename.lastIndexOf("."));
					File filePath = new File(getClass().getClassLoader().getResource("/").getPath().replace("/WEB-INF/classes/", "/static/download/attachment/" + requirementNo /*DateFormatUtils.format(new Date(), "yyyyMM")*/));
					if (!filePath.exists()) {
						filePath.mkdirs();
					}
					String serverFile = filePath.getAbsolutePath() + "/" + fileName;
					file.transferTo(new File(serverFile));

					//String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
					/*if (!fileType.equalsIgnoreCase("xls") && !fileType.equalsIgnoreCase("xlsx")) {
						json.put("success", false);
						json.put("msg", requestContext.getMessage("g_notValidExcel"));
						writeJSON(response, json.toString());
						return;
					}*/
					//TODO: insert or update record
					ydReportService.updateReportLoc(id, fileName);
					
					json.put("success", true);
					json.put("msg", "文件上传成功！");
				} catch (Exception e) {
					e.printStackTrace();
					json.put("success", false);
					json.put("msg", requestContext.getMessage("g_operateFailure"));
					writeJSON(response, json.toString());
				}
			
		} else {
			json.put("success", false);
			json.put("msg", requestContext.getMessage("g_uploadNotExists"));
		}
		writeJSON(response, json.toString());
	}
	
	public void generateReport(YdReport entity) throws IOException {
		BaseStation bs = baseStationService.get(entity.getBsId());
		Map<String, Object> dataMap = new HashMap<String, Object>();  
		String dateStr = sdfDate.format(entity.getCloseDate());
		String[] arr = dateStr.split("-");
		dataMap.put("stationName", bs.getStationName()); 
		dataMap.put("area", bs.getArea());  
		dataMap.put("ydUnit", bs.getYdUnit());  
		dataMap.put("openDate", sdfDate.format(entity.getOpenDate()));  
		dataMap.put("closeDate", dateStr);  
		dataMap.put("highLow", entity.getHighLow());  
		dataMap.put("directTurn", entity.getDirectTurn()); 
		dataMap.put("elecUnit", entity.getElecUnit()); 
		dataMap.put("transNo", entity.getTransNo()); 
		dataMap.put("lowVolt", entity.getLowVolt());
		dataMap.put("inSky", entity.getInSky());  
		dataMap.put("inGround", entity.getInGround()); 
		dataMap.put("newPole", entity.getNewPole()); 
		dataMap.put("accountNo", entity.getAccountNo()); 
		dataMap.put("ammeterNo", entity.getAmmeterNo());
		dataMap.put("year", arr[0]);
		dataMap.put("month", arr[1]);
		dataMap.put("day", arr[2]);
		dataMap.put("ydUnit2", bs.getYdUnit()); 
      
		DocumentHelper doc = new DocumentHelper();
		String basePath = getClass().getClassLoader().getResource("/").getPath().replace("/WEB-INF/classes/", "/static/download/attachment");
		File filePath = new File(basePath + "/" + entity.getRequirementNo());
		if (!filePath.exists()) {
			filePath.mkdirs();
		}
		String fileName = filePath.getAbsolutePath() + "/" + entity.getRequirementNo() + "-YdReport.doc";
		doc.createDoc(dataMap, new File(basePath ), "YdReportTemplate.ftl", fileName);
	}
}
