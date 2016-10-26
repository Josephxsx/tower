package com.forestry.controller.sys;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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
import com.forestry.service.sys.ContractService;

import core.extjs.ExtJSBaseParameter;
import core.extjs.ListView;
import core.support.QueryResult;
import core.util.ForestryUtils;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/sys/contract")
public class ContractController extends ForestryBaseController<Contract>{
	private static final Logger log = Logger.getLogger(ContractController.class);

	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
	@Resource
	private BaseStationService baseStationService;
	@Resource
	private ContractService contractService;
	
	@RequestMapping(value = "/saveContract", method = { RequestMethod.POST, RequestMethod.GET })
	public void saveReport(Contract entity, HttpServletRequest request, HttpServletResponse response) throws IOException {
		ExtJSBaseParameter parameter = ((ExtJSBaseParameter) entity);
		if (null == entity.getId()) {
			parameter.setSuccess(false);
		} else {
			contractService.update(entity);
			parameter.setSuccess(true);
		}
		writeJSON(response, parameter);
	}
	
	
	@RequestMapping(value = "/importContractFile", method = RequestMethod.POST)
	public void importContractFile(@RequestParam(value = "importedFile", required = false) MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		RequestContext requestContext = new RequestContext(request);
		JSONObject json = new JSONObject();		
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
					log.info("Import new contract file has line number: " + rowNum);
					Object[] rowValues = null;// excel中一行树木信息
					List<Object[]> models = new ArrayList<Object[]>();// excel中全部树木信息
					if (rowNum > 1) {
						headRow = sheet.getRow(0);
						columns: for (int i = 1; i < rowNum; i++) {
							log.error("row " + i);
							currentRow = sheet.getRow(i);
							if (currentRow != null) {
								rowValues = new Object[16];
								// int cellNum = currentRow.getLastCellNum();// 总单元格数目
								for (short j = 0; j < 16; j++) {
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
										log.error("j" + j + " col, value: " + cellVal);
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
					List<Contract> list = BaseStationUtil.objectToContract(models);// Object-->Forestry
					for (int i = 0; i < list.size(); i++) {
						Contract contract = list.get(i);
						if (StringUtils.isBlank(contract.getRequirementNo())) {
							stringBuilder.append("第" + (i + 1) + "行记录的必填项有空值，导入失败。");
							continue;
						}
						String requirementNo = contract.getRequirementNo();
						Contract contractInDb = contractService.getByProerties("requirementNo", requirementNo);
						if (contractInDb != null) {
							contract.setId(contractInDb.getId());
							contractService.update(contract);
						}

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

}
