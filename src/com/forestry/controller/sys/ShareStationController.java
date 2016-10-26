package com.forestry.controller.sys;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.RequestContext;

import com.forestry.core.ForestryBaseController;
import com.forestry.model.sys.ShareStation;
import com.forestry.service.sys.ShareStationService;

import core.extjs.ExtJSBaseParameter;
import core.extjs.ListView;
import core.support.QueryResult;
import core.util.ForestryUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/sys/shareStation")
public class ShareStationController extends ForestryBaseController<ShareStation>{
	private static final Logger log = Logger.getLogger(ShareStationController.class);

	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	@Resource
	private ShareStationService shareStationService;
	
	@RequestMapping("/getBatchNoGroup")
	public void getForestryTypeName(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<String> forestryTypeList = shareStationService.getBatchNoGroup();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < forestryTypeList.size(); i++) {
			String value = forestryTypeList.get(i);
			if (StringUtils.isNotBlank(value)) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.element("id",  i);
				jsonObject.element("value", forestryTypeList.get(i));
				jsonArray.add(jsonObject);
			}
		}
		JSONObject resultJSONObject = new JSONObject();
		resultJSONObject.element("list", jsonArray);
		writeJSON(response, resultJSONObject);
	}
	
	@RequestMapping("/getShareStation")
	public void getShareStation(HttpServletRequest request, HttpServletResponse response) throws Exception {
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
		ShareStation shareStation = new ShareStation();
		String stationName = request.getParameter("stationName");
		if (StringUtils.isNotBlank(stationName)) {
			shareStation.set$like_stationName(stationName);
		}
		String area = request.getParameter("area");
		if (StringUtils.isNotBlank(area)) {
			shareStation.set$like_area(area);
		}
		String projectBatchNo = request.getParameter("projectBatchNo");
		if (StringUtils.isNotBlank(projectBatchNo)) {
			shareStation.set$like_projectBatchNo(projectBatchNo);
		}
		
		shareStation.setFirstResult(firstResult);
		shareStation.setMaxResults(maxResults);
		Map<String, String> sortedCondition = new HashMap<String, String>();
		sortedCondition.put(sortedObject, sortedValue);
		shareStation.setSortedConditions(sortedCondition);
		QueryResult<ShareStation> queryResult = shareStationService.doPaginationQuery(shareStation);
		List<ShareStation> shareStationList = shareStationService.getShareStationList(queryResult.getResultList());
		ListView<ShareStation> shareStationListView = new ListView<ShareStation>();
		shareStationListView.setData(shareStationList);
		shareStationListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, shareStationListView);	
	}

	@RequestMapping("/getShareStationById")
	public void getshareStationById(HttpServletRequest request, HttpServletResponse response, @RequestParam("id") Integer id) throws Exception {
		ShareStation shareStation = shareStationService.get(id);
		writeJSON(response, shareStation);
	}
	
	
	@RequestMapping(value = "/saveShareStation", method = { RequestMethod.POST, RequestMethod.GET })
	public void doSave(ShareStation entity, HttpServletRequest request, HttpServletResponse response) throws IOException {
		ExtJSBaseParameter parameter = ((ExtJSBaseParameter) entity);
		ShareStation checkEpcId = shareStationService.getByProerties("projectNo", entity.getProjectNo());
		if (null != checkEpcId && null == entity.getId()) {
			parameter.setSuccess(false);
		} else {
			//ShareStation shareStation = shareStationService.get(entity.getId());
			//entity.setshareStation(shareStation);
			/*if (CMD_EDIT.equals(parameter.getCmd())) {
				shareStationService.update(entity);
			} else if (CMD_NEW.equals(parameter.getCmd())) {
				shareStationService.persist(entity);
			}
			parameter.setCmd(CMD_EDIT);*/
			shareStationService.update(entity);
			parameter.setSuccess(true);
		}
		writeJSON(response, parameter);
	}
	
	@RequestMapping("/deleteShareStation")
	public void deleteShareStation(HttpServletRequest request, HttpServletResponse response, @RequestParam("ids") Integer[] ids) throws IOException {
		boolean flag = shareStationService.deleteByPK(ids);
		if (flag) {
			writeJSON(response, "{success:true}");
		} else {
			writeJSON(response, "{success:false}");
		}
	}

	@RequestMapping(value = "/exportShareStation", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportShareStation(HttpServletRequest request, HttpServletResponse response, @RequestParam("ids") Integer[] ids) throws Exception {
		List<Object[]> forestryList = shareStationService.queryExportedShareStation(ids);
		//创建一个新的Excel
		HSSFWorkbook workBook = ShareStationUtil.createShareStationWorkbook(forestryList);
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=ShareStationList.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/importNewStationFile", method = RequestMethod.POST)
	public void importForestryFile(@RequestParam(value = "importedFile", required = false) MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		RequestContext requestContext = new RequestContext(request);
		JSONObject json = new JSONObject();
		/*
		try {
			shareStationService.deleteAll("basestation");
		} catch (Exception e) {
			e.printStackTrace();
			json.put("success", false);
			json.put("msg", "不能删除表记录，请联系管理员！");
			writeJSON(response, json.toString());
			return;
		}*/
				
		if (!file.isEmpty()) {
			//if (file.getSize() > 2097152) {
			//	json.put("msg", requestContext.getMessage("g_fileTooLarge"));
			//} else {
				try {
					String originalFilename = file.getOriginalFilename();
					String fileName = sdf.format(new Date()) + ForestryUtils.getRandomString(3) + originalFilename.substring(originalFilename.lastIndexOf("."));
					File filePath = new File(getClass().getClassLoader().getResource("/").getPath().replace("/WEB-INF/classes/", "/static/download/attachment/" + DateFormatUtils.format(new Date(), "yyyyMM")));
					if (!filePath.exists()) {
						filePath.mkdirs();
					}
					String serverFile = filePath.getAbsolutePath() + "/" + fileName;
					file.transferTo(new File(serverFile));

					String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
					if (!fileType.equalsIgnoreCase("xls") && !fileType.equalsIgnoreCase("xlsx")) {
						json.put("success", false);
						json.put("msg", requestContext.getMessage("g_notValidExcel"));
						writeJSON(response, json.toString());
						return;
					}
					int count = 0;
					StringBuilder stringBuilder = new StringBuilder();
					InputStream xls = new FileInputStream(serverFile);
					Workbook wb = null;
					Sheet sheet = null;
					Row currentRow = null;
					Row headRow = null;
					Cell currentCell = null;
					if (fileType.equals("xls")) {
						wb = new HSSFWorkbook(xls);
					} else if (fileType.equals("xlsx")) {
						wb = new XSSFWorkbook(xls);
					}
					sheet = wb.getSheetAt(0);// excel中至少会存在一个sheet页
					int rowNum = sheet.getPhysicalNumberOfRows();// 物理有效行数
					log.info("Import new station file has line number: " + rowNum);
					Object[] rowValues = null;// excel中一行树木信息
					List<Object[]> models = new ArrayList<Object[]>();// excel中全部树木信息
					if (rowNum > 1) {
						headRow = sheet.getRow(0);
						columns: for (int i = 1; i < rowNum; i++) {
							currentRow = sheet.getRow(i);
							if (currentRow != null) {
								rowValues = new Object[12];
								// int cellNum = currentRow.getLastCellNum();// 总单元格数目
								for (short j = 0; j < 12; j++) {
									try {
										currentCell = currentRow.getCell(j);
										//log.error("column: " + j + ", type: " + currentCell.getCellType());
										Object obj = null;
										if (currentCell == null) {
											obj = "";
										} else {
											switch (currentCell.getCellType()) {
												case Cell.CELL_TYPE_BLANK:
													obj = "";
													break;
												case Cell.CELL_TYPE_STRING:
													obj = currentCell.getRichStringCellValue();
													break;
												case Cell.CELL_TYPE_NUMERIC:
													if (HSSFDateUtil.isCellDateFormatted(currentCell)) {
														double d = currentCell.getNumericCellValue();
														Date date = HSSFDateUtil.getJavaDate(d);
														obj = sdfDate.format(date);
													} else {
														NumberFormat nf = NumberFormat.getInstance();
														nf.setGroupingUsed(false);//true时的格式：1,234,567,890
														obj = nf.format(currentCell.getNumericCellValue());
													}
													break;
												default:
													obj = "";
													break;
											}
										}
										String cellVal = obj.toString();
										//log.error("value: " + cellVal);
										rowValues[j] = cellVal;
									} catch (IllegalStateException e) {
										rowValues = null;
										stringBuilder.append("第" + i + "行," + headRow.getCell(j).getRichStringCellValue() + "列输入了非法值，未导入成功！");
										continue columns;
									} catch (NullPointerException e) {
										rowValues = null;
										stringBuilder.append("第" + i + "行," + headRow.getCell(j).getRichStringCellValue() + "列输入了空值，未导入成功!");
										continue columns;
									} catch (Exception e) {
										rowValues = null;
										stringBuilder.append(e.getMessage());
										continue columns;
									}
								}
								if (rowValues != null) {
									models.add(rowValues);
								}
							}
						}
					} else if (rowNum <= 1 && rowNum > 0) {// 表示模版中只存在头部信息
						json.put("success", false);
						json.put("msg", "Excel表格中没有需要导入 的内容！");
						writeJSON(response, json.toString());
						return;
					} else if (rowNum <= 0) {// 表示这是一个空sheet页
						json.put("success", false);
						json.put("msg", "所导入文件格式不正确，请下载模板！");
						writeJSON(response, json.toString());
						return;
					}
					List<ShareStation> list = ShareStationUtil.objectToShareStation(models);// Object-->Forestry
					for (int i = 0; i < list.size(); i++) {
						if (StringUtils.isBlank(list.get(i).getProjectNo())) {
							stringBuilder.append("第" + (i + 1) + "行记录的必填项有空值，导入失败。");
							continue;
						}
						
						
						shareStationService.updateByPK(list.get(i), list.get(i).getProjectNo());
						count++;
					}
					log.info("Imported reocrd number: " + count);

					json.put("success", true);
					json.put("msg", count + "条记录导入完成。" + stringBuilder.toString());
				} catch (Exception e) {
					e.printStackTrace();
					json.put("success", false);
					json.put("msg", requestContext.getMessage("g_operateFailure"));
					writeJSON(response, json.toString());
				}
			//}
		} else {
			json.put("success", false);
			json.put("msg", requestContext.getMessage("g_uploadNotExists"));
		}
		writeJSON(response, json.toString());
	}

	@RequestMapping("/downloadTemplateFile")
	public ResponseEntity<byte[]> downloadImportedFile() throws IOException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", "sharetemplate.xls");
		File filePath = new File(getClass().getClassLoader().getResource("/").getPath().replace("/WEB-INF/classes/", "/static/download/attachment/" + "sharetemplate.xls"));
		return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(filePath), headers, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/exportAllShareStation", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportAllShareStation(HttpServletRequest request, HttpServletResponse response, @RequestParam("area") String area,
			@RequestParam("stationName") String stationName, @RequestParam("projectBatchNo") String projectBatchNo) throws Exception {
		area = new String(area.getBytes("ISO-8859-1"), "UTF-8");

		stationName = new String(stationName.getBytes("ISO-8859-1"), "UTF-8");

		projectBatchNo = new String(projectBatchNo.getBytes("ISO-8859-1"), "UTF-8");
		
		List<Object[]> forestryList = shareStationService.queryExportedShareStation(stationName, area, projectBatchNo);
		//创建一个新的Excel
		HSSFWorkbook workBook = ShareStationUtil.createShareStationWorkbook(forestryList);
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=ShareStationList.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
