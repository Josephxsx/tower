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
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
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
import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.Blueprint;
import com.forestry.model.sys.Contract;
import com.forestry.model.sys.PtReport;
import com.forestry.model.sys.TjReport;
import com.forestry.model.sys.TowerReport;
import com.forestry.model.sys.YdReport;
import com.forestry.service.sys.BaseStationService;
import com.forestry.service.sys.BlueprintService;
import com.forestry.service.sys.ContractService;
import com.forestry.service.sys.PtReportService;
import com.forestry.service.sys.TjReportService;
import com.forestry.service.sys.TowerReportService;
import com.forestry.service.sys.YdReportService;

import core.extjs.ExtJSBaseParameter;
import core.extjs.ListView;
import core.support.QueryResult;
import core.util.ForestryUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/sys/baseStation")
public class BaseStationController extends ForestryBaseController<BaseStation>{
	private static final Logger log = Logger.getLogger(BaseStationController.class);

	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	@Resource
	private BaseStationService baseStationService;
	@Resource
	private BlueprintService blueprintService;
	@Resource
	private TjReportService tjReportService;
	@Resource
	private TowerReportService towerReportService;
	@Resource
	private YdReportService ydReportService;
	@Resource
	private PtReportService ptReportService;
	@Resource
	private ContractService contractService;
	
	@RequestMapping("/getGroupByColumnName")
	public void getGroupByColumnName(HttpServletRequest request, HttpServletResponse response, @RequestParam("colName") String colName) throws Exception {
		List<String> forestryTypeList = baseStationService.getGroupByColumnName(colName);
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
	
	@RequestMapping("/getBaseStation")
	public void getBaseStation(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,false);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
		//List<BaseStation> baseStationList = baseStationService.getBaseStationList(queryResult.getResultList());
		
		ListView<BaseStation> baseStationListView = new ListView<BaseStation>();
		baseStationListView.setData(queryResult.getResultList());
		baseStationListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, baseStationListView);	
	}

	private BaseStation getQueryObject(HttpServletRequest request,Boolean isExport)
			throws IOException, JsonParseException, JsonMappingException {
		BaseStation baseStation = new BaseStation();
		String stationName = request.getParameter("stationName");
		if (StringUtils.isNotBlank(stationName)) {
			baseStation.set$like_stationName(stationName);
		}
		
		String requirementNo = request.getParameter("requirementNo");
		if (StringUtils.isNotBlank(requirementNo)) {
			baseStation.set$like_requirementNo(requirementNo);
		}
		
		String area = request.getParameter("area");
		if (StringUtils.isNotBlank(area)) {
			baseStation.set$eq_area(area);
		}
		String areaMgr = request.getParameter("areaMgr");
		if (StringUtils.isNotBlank(areaMgr)) {
			baseStation.set$eq_areaMgr(areaMgr);
		}
		String projectBatchNo = request.getParameter("projectBatchNo");
		if (StringUtils.isNotBlank(projectBatchNo)) {
			baseStation.set$eq_projectBatchNo(projectBatchNo);
		}
		String tjsgUnit = request.getParameter("tjsgUnit");
		if (StringUtils.isNotBlank(tjsgUnit)) {
			baseStation.set$eq_tjsgUnit(tjsgUnit);
		}
		String ydUnit = request.getParameter("ydUnit");
		if (StringUtils.isNotBlank(ydUnit)) {
			baseStation.set$eq_ydUnit(ydUnit);
		}
		if (isExport) {
			baseStation.setFirstResult(0);
			baseStation.setMaxResults(10000);
			Map<String, String> sortedCondition = new HashMap<String, String>();
			sortedCondition.put("id", "ASC");
			baseStation.setSortedConditions(sortedCondition);
		} else {
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
			
			baseStation.setFirstResult(firstResult);
			baseStation.setMaxResults(maxResults);
			Map<String, String> sortedCondition = new HashMap<String, String>();
			sortedCondition.put(sortedObject, sortedValue);
			baseStation.setSortedConditions(sortedCondition);
		}
		
		return baseStation;
	}
	
	
	
	@RequestMapping("/getBaseStationById")
	public void getbaseStationById(HttpServletRequest request, HttpServletResponse response, @RequestParam("id") Integer id) throws Exception {
		BaseStation baseStation = baseStationService.get(id);
		writeJSON(response, baseStation);
	}
	
	
	@RequestMapping(value = "/saveBaseStation", method = { RequestMethod.POST, RequestMethod.GET })
	public void doSave(BaseStation entity, HttpServletRequest request, HttpServletResponse response) throws IOException {
		ExtJSBaseParameter parameter = ((ExtJSBaseParameter) entity);
		BaseStation baseStation = baseStationService.getByProerties("requirementNo", entity.getRequirementNo());
		if (null == baseStation || null == entity.getId()) {
			parameter.setSuccess(false);
		} else {
			//BaseStation baseStation = baseStationService.get(entity.getId());
			//blueprintService.update(baseStation.getBlueprint());
			entity.setBluePrint(baseStation.getBlueprint());
			entity.setCid(baseStation.getCid());
			entity.setTjid(baseStation.getTjid());
			entity.setYdid(baseStation.getYdid());
			entity.setPtid(baseStation.getPtid());
			entity.setTowerid(baseStation.getTowerid());
			baseStationService.update(entity);
			parameter.setSuccess(true);
		}
		writeJSON(response, parameter);
	}
	
	@RequestMapping("/deleteBaseStation")
	public void deleteBaseStation(HttpServletRequest request, HttpServletResponse response, @RequestParam("ids") Integer[] ids) throws IOException {
		//List<Integer> bpIds = baseStationService.getBlueprintIds(ids);
		//List<Integer> cIds = baseStationService.getContractIds(ids);
		List<Integer> bpIds = baseStationService.getSubIds(ids, "bp_id");
		List<Integer> cIds = baseStationService.getSubIds(ids, "cid");
		List<Integer> tjIds = baseStationService.getSubIds(ids, "tjid");
		List<Integer> ptIds = baseStationService.getSubIds(ids, "ptid");
		List<Integer> towerIds = baseStationService.getSubIds(ids, "towerid");
		List<Integer> ydIds = baseStationService.getSubIds(ids, "ydid");
		
		boolean flag = baseStationService.deleteByPK(ids);
		Integer[] bpIdArr = new Integer[bpIds.size()];
		for (int i = 0; i < bpIds.size(); i++) {
			bpIdArr[i] = bpIds.get(i);
		}
		int bpRet = blueprintService.deleteByIds(bpIdArr);
		/*
		int tjRet = tjReportService.deleteBybsId(ids);
		int ptRet = ptReportService.deleteBybsId(ids);
		int towerRet = towerReportService.deleteBybsId(ids);
		int ydRet = ydReportService.deleteBybsId(ids);
		*/
		
		Integer[] cIdArr = new Integer[cIds.size()];
		for (int i = 0; i < cIds.size(); i++) {
			cIdArr[i] = cIds.get(i);
		}
		boolean contractRet = contractService.deleteByPK(cIdArr);
		
		Integer[] tjIdArr = new Integer[tjIds.size()];
		for (int i = 0; i < tjIds.size(); i++) {
			tjIdArr[i] = tjIds.get(i);
		}
		boolean tjRet = tjReportService.deleteByPK(tjIdArr);
		
		Integer[] ptIdArr = new Integer[ptIds.size()];
		for (int i = 0; i < ptIds.size(); i++) {
			ptIdArr[i] = ptIds.get(i);
		}
		boolean ptRet = ptReportService.deleteByPK(ptIdArr);
		
		Integer[] ydIdArr = new Integer[ydIds.size()];
		for (int i = 0; i < ydIds.size(); i++) {
			ydIdArr[i] = ydIds.get(i);
		}
		boolean ydRet = ydReportService.deleteByPK(ydIdArr);
		
		Integer[] towerIdArr = new Integer[towerIds.size()];
		for (int i = 0; i < towerIds.size(); i++) {
			towerIdArr[i] = towerIds.get(i);
		}
		boolean towerRet = towerReportService.deleteByPK(towerIdArr);
		//int contractRet = contractService.deleteBybsId(ids);
		
		log.info(flag + ", " + bpRet + ", " + tjRet + ", " + ptRet + ", " + towerRet + ", " + ydRet + ", " + contractRet);
		if (flag && bpRet > 0 && tjRet && ptRet && towerRet && ydRet  && contractRet) {
			writeJSON(response, "{success:true}");
		} else {
			writeJSON(response, "{success:false}");
		}
	}

/*
	@RequestMapping(value = "/exportBaseStation", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportBaseStation(HttpServletRequest request, HttpServletResponse response, @RequestParam("ids") Integer[] ids) throws Exception {
		List<Object[]> forestryList = baseStationService.queryExportedBaseStation(ids);
		//创建一个新的Excel
		HSSFWorkbook workBook = BaseStationUtil.createBaseStationWorkbook(forestryList);
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=BaseStationList.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	*/
	@RequestMapping(value = "/importNewStationFile", method = RequestMethod.POST)
	public void importForestryFile(@RequestParam(value = "importedFile", required = false) MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		RequestContext requestContext = new RequestContext(request);
		JSONObject json = new JSONObject();
		/*
		try {
			baseStationService.deleteAll("basestation");
		} catch (Exception e) {
			e.printStackTrace();
			json.put("success", false);
			json.put("msg", "不能删除表记录，请联系管理员！");
			writeJSON(response, json.toString());
			return;
		}*/
				
		if (!file.isEmpty()) {
			//if (file.getSize() > 2097152) {
				//json.put("msg", requestContext.getMessage("g_fileTooLarge"));
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
								rowValues = new Object[42];
								// int cellNum = currentRow.getLastCellNum();// 总单元格数目
								for (short j = 0; j < 42; j++) {
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
					List<BaseStation> list = BaseStationUtil.objectToBaseStation(models);// Object-->Forestry
					for (int i = 0; i < list.size(); i++) {
						BaseStation bs = list.get(i);
						if (StringUtils.isBlank(bs.getRequirementNo())) {
							stringBuilder.append("第" + (i + 1) + "行记录的必填项有空值，导入失败。");
							continue;
						}
						String requirementNo = bs.getRequirementNo();
						Blueprint bp = new Blueprint();
						bp.setRequirementNo(requirementNo);
						
						
						
						Blueprint bpInDb = blueprintService.getByProerties("requirementNo", requirementNo);
						if (bpInDb == null) {
							blueprintService.persist(bp);
							bs.setBluePrint(bp);
						} else {
							bs.setBluePrint(bpInDb);
						}
						
						Contract contract = new Contract();
						contract.setRequirementNo(requirementNo);
						if (contractService.getByProerties("requirementNo", requirementNo) == null) {
							contractService.persist(contract);
							log.info("contract.getId()=" + contract.getId());
							bs.setCid(contract.getId());
						}
						
						PtReport pt = new PtReport();
						pt.setRequirementNo(requirementNo);
						if (ptReportService.getByProerties("requirementNo", requirementNo) == null) {
							ptReportService.persist(pt);
							log.info("pt.getId()=" + pt.getId());
							bs.setPtid(pt.getId());
						}
						
						YdReport yd = new YdReport();
						yd.setRequirementNo(requirementNo);
						if (ydReportService.getByProerties("requirementNo", requirementNo) == null) {
							ydReportService.persist(yd);
							log.info("yd.getId()=" + yd.getId());
							bs.setYdid(yd.getId());
						}
						
						TjReport tj = new TjReport();
						tj.setRequirementNo(requirementNo);
						if (tjReportService.getByProerties("requirementNo", requirementNo) == null) {
							tjReportService.persist(tj);
							log.info("tj.getId()=" + tj.getId());
							bs.setTjid(tj.getId());
						}
						
						TowerReport tower = new TowerReport();
						tower.setRequirementNo(requirementNo);
						if (towerReportService.getByProerties("requirementNo", requirementNo) == null) {
							towerReportService.persist(tower);
							log.info("tower.getId()=" + tower.getId());
							bs.setTowerid(tower.getId());
						}
						
						baseStationService.updateByPK(bs, requirementNo);
						log.info("Imported record id is: " + bs.getId() + ", cid is "+ bs.getCid());
						
						Integer bsId = bs.getId();
					
						
						tj.setBsId(bsId);
						tjReportService.update(tj);
			
						tower.setBsId(bsId);
						towerReportService.update(tower);
												
						yd.setBsId(bsId);
						ydReportService.update(yd);
						
						
						pt.setBsId(bsId);
						ptReportService.update(pt);
						
						/*
						Contract contract = new Contract();
						contract.setBsId(bsId);
						contract.setRequirementNo(requirementNo);
						if (contractService.getByProerties("requirementNo", requirementNo) == null) {
							contractService.persist(contract);
						}
						*/
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

	@RequestMapping(value = "/downloadDesignFile", method = { RequestMethod.POST, RequestMethod.GET })
	public void downloadDesignFile(@RequestParam("fileName") String fileName, 
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requirementNo = fileName.substring(0, fileName.indexOf("-"));
		File filePath = new File(getClass().getClassLoader().getResource("/").getPath().replace("/WEB-INF/classes/", "/static/download/attachment/" + requirementNo /*DateFormatUtils.format(new Date(), "yyyyMM")*/));
		
		String serverFileStr = filePath.getAbsolutePath() + "/" + fileName;
		if (filePath.exists()) {
			File serverFile = new File(serverFileStr);
			if(serverFile.exists()) {
				OutputStream os = response.getOutputStream();  
			    try {  
			    	response.reset();  
			    	String headerStr = "attachment; filename= " + fileName;
			    	response.setHeader("Content-Disposition", headerStr);  
			    	response.setContentType("application/octet-stream; charset=utf-8");  
			        os.write(FileUtils.readFileToByteArray(serverFile));  
			        os.flush();  
			    } finally {  
			        if (os != null) {  
			            os.close();  
			        }  
			    }  
			}
		}
		
		
	}

	@RequestMapping(value = "/importDesignFile", method = RequestMethod.POST)
	public void importDesignFile(@RequestParam("blueprint.id") Integer id,@RequestParam(value = "importedFile", required = false) MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String doctype = request.getParameter("doctype");
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
					blueprintService.updateBlueprint(id, doctype, fileName);
					
					//Update basestation if doctype = dk_report, tj_design, yd_design
					log.info("Update basestation set " + doctype + " status with requirementNo: " + requirementNo);
					if(doctype.equalsIgnoreCase("dk_report")) {
						baseStationService.updateStatusByColumnName(requirementNo, "dk_finish", "1");
					} else if (doctype.equalsIgnoreCase("tj_design")) {
						baseStationService.updateStatusByColumnName(requirementNo, "sj_finish", "1");
					} else if (doctype.equalsIgnoreCase("yd_design")) {
						baseStationService.updateStatusByColumnName(requirementNo, "ydsj_finish", "1");
					}
					
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
	
	@RequestMapping("/downloadTemplateFile")
	public ResponseEntity<byte[]> downloadImportedFile() throws IOException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", "basetemplate.xls");
		File filePath = new File(getClass().getClassLoader().getResource("/").getPath().replace("/WEB-INF/classes/", "/static/download/attachment/" + "basetemplate.xls"));
		return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(filePath), headers, HttpStatus.CREATED);
	}
	
	@RequestMapping("/downloadContractTemplateFile")
	public ResponseEntity<byte[]> downloadContractTemplateFile() throws IOException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", "contractTemplate.xls");
		File filePath = new File(getClass().getClassLoader().getResource("/").getPath().replace("/WEB-INF/classes/", "/static/download/attachment/" + "contractTemplate.xls"));
		return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(filePath), headers, HttpStatus.CREATED);
	}
	
	/*
	@RequestMapping(value = "/exportAllBaseStation", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportAllBaseStation(HttpServletRequest request, HttpServletResponse response, @RequestParam("area") String area,
			@RequestParam("stationName") String stationName, @RequestParam("projectBatchNo") String projectBatchNo,
			@RequestParam("areaMgr") String areaMgr,
			@RequestParam("tjsgUnit") String tjsgUnit,
			@RequestParam("ydUnit") String ydUnit) throws Exception {
		area = new String(area.getBytes("ISO-8859-1"), "UTF-8");

		stationName = new String(stationName.getBytes("ISO-8859-1"), "UTF-8");

		projectBatchNo = new String(projectBatchNo.getBytes("ISO-8859-1"), "UTF-8");
		
		areaMgr = new String(areaMgr.getBytes("ISO-8859-1"), "UTF-8");

		tjsgUnit = new String(tjsgUnit.getBytes("ISO-8859-1"), "UTF-8");

		ydUnit = new String(ydUnit.getBytes("ISO-8859-1"), "UTF-8");
		
		//创建一个新的Excel
		List<Object[]> forestryList = baseStationService.queryExportedBaseStation(stationName, area, projectBatchNo,
				areaMgr, tjsgUnit, ydUnit);

		HSSFWorkbook workBook = BaseStationUtil.createBaseStationWorkbook(forestryList);
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=BaseStationList.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	*/
	@RequestMapping("/getCurrentProgress")
	public void getCurrentProgress(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<Object[]> list = baseStationService.getCurrentProgress();
		JSONObject jsonObject = new JSONObject();
		Object[] data = list.get(0);
		jsonObject.element("xz",  data[0]);
		jsonObject.element("jc",  data[1]);
		jsonObject.element("tower",  data[2]);
		writeJSON(response, jsonObject);
	}
	
	@RequestMapping(value = "/exportAllContract", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportAllContract(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,true);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
	
		contractService.getBaseStationList(queryResult.getResultList());
		log.info("exportAllContract: " + queryResult.getResultList().size());
		HSSFWorkbook workBook = BaseStationUtil.createContractWorkbook(queryResult.getResultList());
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=Contract.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/exportContractByIds", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportContractByIds(HttpServletRequest request, HttpServletResponse response, @RequestParam("ids") Integer[] ids) throws Exception {
		List<BaseStation> queryResult = baseStationService.queryExportedBaseStations(ids);
		//List<BaseStation> baseStationList = baseStationService.getBaseStationList(queryResult.getResultList());
		
		contractService.getBaseStationList(queryResult);
		log.info("exportContractByIds: " + queryResult.size());
		HSSFWorkbook workBook = BaseStationUtil.createContractWorkbook(queryResult);
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=Contract.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/exportAllBaseStations", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportAllBaseStations(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,true);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
		log.info("exportAllContract: " + queryResult.getResultList().size());
		
		HSSFWorkbook workBook = BaseStationUtil.createBaseStationsWorkbook(queryResult.getResultList());
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=BaseStationList.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/exportBaseStations", method = { RequestMethod.POST, RequestMethod.GET })
	public void exportBaseStations(HttpServletRequest request, HttpServletResponse response, @RequestParam("ids") Integer[] ids) throws Exception {
		List<BaseStation> queryResult = baseStationService.queryExportedBaseStations(ids);
		//创建一个新的Excel
		HSSFWorkbook workBook = BaseStationUtil.createBaseStationsWorkbook(queryResult);
		response.reset();
		response.setContentType("application/msexcel;charset=UTF-8");
		try {
			response.addHeader("Content-Disposition", "attachment;filename=BaseStationList.xls");
			OutputStream out = response.getOutputStream();
			workBook.write(out);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/getContract")
	public void getContract(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,false);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
		//List<BaseStation> baseStationList = baseStationService.getBaseStationList(queryResult.getResultList());
		
		contractService.getBaseStationList(queryResult.getResultList());
		
		ListView<BaseStation> baseStationListView = new ListView<BaseStation>();
		baseStationListView.setData(queryResult.getResultList());
		baseStationListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, baseStationListView);	
	}
	
	@RequestMapping("/getPtReport")
	public void getPtReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,false);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
		//List<BaseStation> baseStationList = baseStationService.getBaseStationList(queryResult.getResultList());
		
		ptReportService.getBaseStationList(queryResult.getResultList());
		
		ListView<BaseStation> baseStationListView = new ListView<BaseStation>();
		baseStationListView.setData(queryResult.getResultList());
		baseStationListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, baseStationListView);	
	}
	@RequestMapping("/getTjReport")
	public void getTjReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,false);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
		//List<BaseStation> baseStationList = baseStationService.getBaseStationList(queryResult.getResultList());
		
		tjReportService.getBaseStationList(queryResult.getResultList());
		
		ListView<BaseStation> baseStationListView = new ListView<BaseStation>();
		baseStationListView.setData(queryResult.getResultList());
		baseStationListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, baseStationListView);	
	}
	@RequestMapping("/getTowerReport")
	public void getTowerReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,false);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
		//List<BaseStation> baseStationList = baseStationService.getBaseStationList(queryResult.getResultList());
		
		towerReportService.getBaseStationList(queryResult.getResultList());
		
		ListView<BaseStation> baseStationListView = new ListView<BaseStation>();
		baseStationListView.setData(queryResult.getResultList());
		baseStationListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, baseStationListView);	
	}
	@RequestMapping("/getYdReport")
	public void getYdReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		BaseStation baseStation = getQueryObject(request,false);
		QueryResult<BaseStation> queryResult = baseStationService.doPaginationQuery(baseStation);
		//List<BaseStation> baseStationList = baseStationService.getBaseStationList(queryResult.getResultList());
		
		ydReportService.getBaseStationList(queryResult.getResultList());
		
		ListView<BaseStation> baseStationListView = new ListView<BaseStation>();
		baseStationListView.setData(queryResult.getResultList());
		baseStationListView.setTotalRecord(queryResult.getTotalCount());
		writeJSON(response, baseStationListView);	
	}
}
