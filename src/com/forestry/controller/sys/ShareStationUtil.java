package com.forestry.controller.sys;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.forestry.model.sys.ShareStation;

public class ShareStationUtil {
	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");

	public static List<ShareStation> objectToShareStation(List<Object[]> models) {
		List<ShareStation> shareStationList = new ArrayList<ShareStation>();
		for (int i = 0; i < models.size(); i++) {
			try {
				ShareStation shareStation = new ShareStation();
				//No need the id, it is only for table operation
				/*if (StringUtils.isNotBlank(models.get(i)[0].toString())) {
					shareStation.setId(Long.valueOf(models.get(i)[0].toString()));
				} else {
					//shareStation.setId(0L);
				}*/
				
				//项目编号
				if (StringUtils.isBlank(models.get(i)[1].toString())) {
					shareStation.setProjectNo(null);
				} else {
					shareStation.setProjectNo(models.get(i)[1].toString());
				}
				//站名
				if (StringUtils.isBlank(models.get(i)[2].toString())) {
					shareStation.setStationName(null);
				} else {
					shareStation.setStationName(models.get(i)[2].toString());
				}
				//区域
				if (StringUtils.isBlank(models.get(i)[3].toString())) {
					shareStation.setArea(null);
				} else {
					shareStation.setArea(models.get(i)[3].toString());
				}
				//区域经理
				if (StringUtils.isBlank(models.get(i)[4].toString())) {
					shareStation.setAreaMgr(null);
				} else {
					shareStation.setAreaMgr(models.get(i)[4].toString());
				}
				//工程批次 
				if (StringUtils.isBlank(models.get(i)[5].toString())) {
					shareStation.setProjectBatchNo(null);
				} else {
					shareStation.setProjectBatchNo(models.get(i)[5].toString());
				}
				//经度
				if (StringUtils.isBlank(models.get(i)[6].toString())) {
					shareStation.setLongitude(null);
				} else {
					shareStation.setLongitude(models.get(i)[6].toString());
				}
				//纬度
				if (StringUtils.isBlank(models.get(i)[7].toString())) {
					shareStation.setLatitude(null);
				} else {
					shareStation.setLatitude(models.get(i)[7].toString());
				}
				//共享目标站点
				if (StringUtils.isBlank(models.get(i)[8].toString())) {
					shareStation.setShareStationName(null);
				} else {
					shareStation.setShareStationName(models.get(i)[8].toString());
				}
				//存量站点归属
				if (StringUtils.isBlank(models.get(i)[9].toString())) {
					shareStation.setBelongTo(null);
				} else {
					shareStation.setBelongTo(models.get(i)[9].toString());
				}
				//天面改造完工
				if (StringUtils.isBlank(models.get(i)[10].toString())) {
					shareStation.setGzFinish(null);
				} else {
					if(models.get(i)[10].toString().equals("是")) {
						shareStation.setGzFinish(true);
					}
				}
				//引电完工
				if (StringUtils.isBlank(models.get(i)[11].toString())) {
					shareStation.setYdFinish(null);
				} else {
					if(models.get(i)[11].toString().equals("是")) {
						shareStation.setYdFinish(true);
					}
				}
				
				shareStationList.add(shareStation);
			} catch (Exception e) {
				e.printStackTrace();
				continue;
			}
		}
		
		return shareStationList;
	}
	
	public static HSSFWorkbook createShareStationWorkbook(List<Object[]> shareStationList) {
		HSSFWorkbook workBook = new HSSFWorkbook();
		//创建sheet页
		HSSFSheet sheet = workBook.createSheet("基站信息");
		//设置第一行为Header
		HSSFRow row = sheet.createRow(0);
		HSSFCell cell0 = row.createCell(0);
		HSSFCell cell1 = row.createCell(1);
		HSSFCell cell2 = row.createCell(2);
		HSSFCell cell3 = row.createCell(3);
		HSSFCell cell4 = row.createCell(4);
		HSSFCell cell5 = row.createCell(5);
		HSSFCell cell6 = row.createCell(6);
		HSSFCell cell7 = row.createCell(7);
		HSSFCell cell8 = row.createCell(8);
		HSSFCell cell9 = row.createCell(9);
		HSSFCell cell10 = row.createCell(10);
		HSSFCell cell11 = row.createCell(11);

		cell0.setCellValue("序号");
		cell1.setCellValue("项目编号");
		cell2.setCellValue("站名");
		cell3.setCellValue("区域");
		cell4.setCellValue("区域经理");
		cell5.setCellValue("工程批次");
		cell6.setCellValue("经度");
		cell7.setCellValue("纬度");
		cell8.setCellValue("共享目标站点");
		cell9.setCellValue("存量站点归属");
		cell10.setCellValue("天面改造完工");
		cell11.setCellValue("引电完工");
		
		for (int i = 0; i < shareStationList.size(); i++) {
			Object[] forestry = shareStationList.get(i);
			row = sheet.createRow(i + 1);
			cell0 = row.createCell(0);
			cell1 = row.createCell(1);
			cell2 = row.createCell(2);
			cell3 = row.createCell(3);
			cell4 = row.createCell(4);
			cell5 = row.createCell(5);
			cell6 = row.createCell(6);
			cell7 = row.createCell(7);
			cell8 = row.createCell(8);
			cell9 = row.createCell(9);
			cell10 = row.createCell(10);
			cell11 = row.createCell(11);
			
			cell0.setCellValue(forestry[0].toString());
			cell1.setCellValue(forestry[1].toString());
			if(forestry[2] != null) {
				cell2.setCellValue(forestry[2].toString());
			}
			
			if(forestry[3] != null) {
				cell3.setCellValue(forestry[3].toString());
			}
			
			if(forestry[4] != null) {
				cell4.setCellValue(forestry[4].toString());
			}
			
			if(forestry[5] != null) {
				cell5.setCellValue(forestry[5].toString());
			}
			
			if(forestry[6] != null) {
				cell6.setCellValue(forestry[6].toString());
			}
			
			if(forestry[7] != null) {
				cell7.setCellValue(forestry[7].toString());
			}
			
			if(forestry[8] != null) {
				cell8.setCellValue(forestry[8].toString());
			}
			
			if(forestry[9] != null) {
				cell9.setCellValue(forestry[9].toString());
			}
			
			if(forestry[10] != null) {
				if((Boolean)forestry[10]) {
					cell10.setCellValue("是");
				} else {
					cell10.setCellValue("否");
				}
			}
			
			if(forestry[11] != null) {
				if((Boolean)forestry[11]) {
					cell11.setCellValue("是");
				} else {
					cell11.setCellValue("否");
				}
			}
			//sheet.setColumnWidth(0, 6000);
		}
		return workBook;
	}
}
