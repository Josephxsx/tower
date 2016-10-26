package com.forestry.controller.sys;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.Blueprint;
import com.forestry.model.sys.Contract;

public class BaseStationUtil {
	private static SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");

	public static List<BaseStation> objectToBaseStation(List<Object[]> models) {
		List<BaseStation> baseStationList = new ArrayList<BaseStation>();
		for (int i = 0; i < models.size(); i++) {
			try {
				BaseStation baseStation = new BaseStation();
				//No need the id, it is only for table operation
				/*if (StringUtils.isNotBlank(models.get(i)[0].toString())) {
					baseStation.setId(Long.valueOf(models.get(i)[0].toString()));
				} else {
					//baseStation.setId(0L);
				}*/
				
				//需求编号
				baseStation.setRequirementNo(models.get(i)[1].toString());
				//Blueprint bp = new Blueprint();
				//bp.setId(Integer.valueOf(models.get(i)[0].toString()));
				//bp.setRequirementNo(models.get(i)[1].toString());
				//baseStation.setBluePrint(bp);
				//项目编号
				if (StringUtils.isBlank(models.get(i)[2].toString())) {
					baseStation.setProjectNo(null);
				} else {
					baseStation.setProjectNo(models.get(i)[2].toString());
				}
				//站点编号
				if (StringUtils.isBlank(models.get(i)[3].toString())) {
					baseStation.setStationNo(null);
				} else {
					baseStation.setStationNo(models.get(i)[3].toString());
				}
				//站名
				if (StringUtils.isBlank(models.get(i)[4].toString())) {
					baseStation.setStationName(null);
				} else {
					baseStation.setStationName(models.get(i)[4].toString());
				}
				//区域
				if (StringUtils.isBlank(models.get(i)[5].toString())) {
					baseStation.setArea(null);
				} else {
					baseStation.setArea(models.get(i)[5].toString());
				}
				//区域经理
				if (StringUtils.isBlank(models.get(i)[6].toString())) {
					baseStation.setAreaMgr(null);
				} else {
					baseStation.setAreaMgr(models.get(i)[6].toString());
				}
				//工程批次 
				if (StringUtils.isBlank(models.get(i)[7].toString())) {
					baseStation.setProjectBatchNo(null);
				} else {
					baseStation.setProjectBatchNo(models.get(i)[7].toString());
				}
				//经度
				if (StringUtils.isBlank(models.get(i)[8].toString())) {
					baseStation.setLongitude(null);
				} else {
					baseStation.setLongitude(models.get(i)[8].toString());
				}
				//纬度
				if (StringUtils.isBlank(models.get(i)[9].toString())) {
					baseStation.setLatitude(null);
				} else {
					baseStation.setLatitude(models.get(i)[9].toString());
				}
				//选址类型
				if (StringUtils.isBlank(models.get(i)[10].toString())) {
					baseStation.setXzType(null);
				} else {
					baseStation.setXzType(models.get(i)[10].toString());
				}
				//选址人
				if (StringUtils.isBlank(models.get(i)[11].toString())) {
					baseStation.setXzName(null);
				} else {
					baseStation.setXzName(models.get(i)[11].toString());
				}
				//选址完成
				if (StringUtils.isBlank(models.get(i)[12].toString())) {
					baseStation.setXzFinish(null);
				} else {
					if(models.get(i)[12].toString().equals("是")) {
						baseStation.setXzFinish(true);
					}
				}
				//选址完成时间
				if (StringUtils.isBlank(models.get(i)[13].toString())) {
					baseStation.setXzFinishTime(null);
				} else {
					baseStation.setXzFinishTime(sdfDate.parse(models.get(i)[13].toString()));
				}
				//地勘单位
				if (StringUtils.isBlank(models.get(i)[14].toString())) {
					baseStation.setDkUnit(null);
				} else {
					baseStation.setDkUnit(models.get(i)[14].toString());
				}
				//是否地勘
				if (StringUtils.isBlank(models.get(i)[15].toString())) {
					baseStation.setDkFinish(null);
				} else {
					if(models.get(i)[15].toString().equals("是")) {
						baseStation.setDkFinish(true);
					}
				}
				//设计单位
				if (StringUtils.isBlank(models.get(i)[16].toString())) {
					baseStation.setSjUnit(null);
				} else {
					baseStation.setSjUnit(models.get(i)[16].toString());
				}
				//是否设计
				if (StringUtils.isBlank(models.get(i)[17].toString())) {
					baseStation.setSjFinish(null);
				} else {
					if(models.get(i)[17].toString().equals("是")) {
						baseStation.setSjFinish(true);
					}
				}
				//土建施工单位
				if (StringUtils.isBlank(models.get(i)[18].toString())) {
					baseStation.setTjsgUnit(null);
				} else {
					baseStation.setTjsgUnit(models.get(i)[18].toString());
				}
				//进场
				if (StringUtils.isBlank(models.get(i)[19].toString())) {
					baseStation.setTjsgIn(null);
				} else {
					if(models.get(i)[19].toString().equals("是")) {
						baseStation.setTjsgIn(true);
					}
				}
				//开工时间
				if (StringUtils.isBlank(models.get(i)[20].toString())) {
					baseStation.setKgTime(null);
				} else {
					baseStation.setKgTime(sdfDate.parse(models.get(i)[20].toString()));
				}
				
				//基础完工
				if (StringUtils.isBlank(models.get(i)[21].toString())) {
					baseStation.setJcFinish(null);
				} else {
					if(models.get(i)[21].toString().equals("是")) {
						baseStation.setJcFinish(true);
					}
				}
				//基础完工时间
				if (StringUtils.isBlank(models.get(i)[22].toString())) {
					baseStation.setJcFinishTime(null);
				} else {
					baseStation.setJcFinishTime(sdfDate.parse(models.get(i)[22].toString()));
				}
				//铁塔单位
				if (StringUtils.isBlank(models.get(i)[23].toString())) {
					baseStation.setTowerUnit(null);
				} else {
					baseStation.setTowerUnit(models.get(i)[23].toString());
				}
				//铁塔安装
				if (StringUtils.isBlank(models.get(i)[24].toString())) {
					baseStation.setTowerFinish(null);
				} else {
					if(models.get(i)[24].toString().equals("是")) {
						baseStation.setTowerFinish(true);
					}
				}
				//铁塔安装时间
				if (StringUtils.isBlank(models.get(i)[25].toString())) {
					baseStation.setTowerFinishTime(null);
				} else {
					baseStation.setTowerFinishTime(sdfDate.parse(models.get(i)[25].toString()));
				}
				//塔型
				if (StringUtils.isBlank(models.get(i)[26].toString())) {
					baseStation.setTowerType(null);
				} else {
					baseStation.setTowerType(models.get(i)[26].toString());
				}
				//塔高
				if (StringUtils.isBlank(models.get(i)[27].toString())) {
					baseStation.setTowerHeight(null);
				} else {
					baseStation.setTowerHeight(models.get(i)[27].toString());
				}
				//引电设计单位
				if (StringUtils.isBlank(models.get(i)[28].toString())) {
					baseStation.setYdsjUnit(null);
				} else {
					baseStation.setYdsjUnit(models.get(i)[28].toString());
				}
				//引电设计出图
				if (StringUtils.isBlank(models.get(i)[29].toString())) {
					baseStation.setYdsjFinish(null);
				} else {
					if(models.get(i)[29].toString().equals("是")) {
						baseStation.setYdsjFinish(true);
					}
				}
				//引电单位
				if (StringUtils.isBlank(models.get(i)[30].toString())) {
					baseStation.setYdUnit(null);
				} else {
					baseStation.setYdUnit(models.get(i)[30].toString());
				}
				//引电方案制定
				if (StringUtils.isBlank(models.get(i)[31].toString())) {
					baseStation.setYdProgramFinish(null);
				} else {
					if(models.get(i)[31].toString().equals("是")) {
						baseStation.setYdProgramFinish(true);
					}
				}
				//方案制定时间
				if (StringUtils.isBlank(models.get(i)[32].toString())) {
					baseStation.setYdProgramTime(null);
				} else {
					baseStation.setYdProgramTime(sdfDate.parse(models.get(i)[32].toString()));
				}
				//引电完工
				if (StringUtils.isBlank(models.get(i)[33].toString())) {
					baseStation.setYdFinish(null);
				} else {
					if(models.get(i)[33].toString().equals("是")) {
						baseStation.setYdFinish(true);
					}
				}
				//引电方式
				if (StringUtils.isBlank(models.get(i)[34].toString())) {
					baseStation.setYdType(null);
				} else {
					baseStation.setYdType(models.get(i)[34].toString());
				}
				//供电户号
				if (StringUtils.isBlank(models.get(i)[35].toString())) {
					baseStation.setGdNo(null);
				} else {
					baseStation.setGdNo(models.get(i)[35].toString());
				}
				//配套安装完工
				if (StringUtils.isBlank(models.get(i)[36].toString())) {
					baseStation.setPtInstallFinish(null);
				} else {
					if(models.get(i)[36].toString().equals("是")) {
						baseStation.setPtInstallFinish(true);
					}
				}
				//动环施工单位
				if (StringUtils.isBlank(models.get(i)[37].toString())) {
					baseStation.setDhUnit(null);
				} else {
					baseStation.setDhUnit(models.get(i)[37].toString());
				}
				// 动环施工完成
				if (StringUtils.isBlank(models.get(i)[38].toString())) {
					baseStation.setDhFinish(null);
				} else {
					if(models.get(i)[38].toString().equals("是")) {
						baseStation.setDhFinish(true);
					}
				}
				//备注
				if (StringUtils.isBlank(models.get(i)[39].toString())) {
					baseStation.setMemo(null);
				} else {
					baseStation.setMemo(models.get(i)[39].toString());
				}
				//全部完工
				if (StringUtils.isBlank(models.get(i)[40].toString())) {
					baseStation.setTotalFinish(null);
				} else {
					if(models.get(i)[40].toString().equals("是")) {
						baseStation.setTotalFinish(true);
					}
				}
				//交付项
				if (StringUtils.isBlank(models.get(i)[41].toString())) {
					baseStation.setDelivery(null);
				} else {
					baseStation.setDelivery(models.get(i)[41].toString());
				}
				baseStationList.add(baseStation);
			} catch (Exception e) {
				e.printStackTrace();
				continue;
			}
		}
		
		return baseStationList;
	}
	/*
	public static HSSFWorkbook createBaseStationWorkbook(List<Object[]> baseStationList) {
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
		HSSFCell cell12 = row.createCell(12);
		HSSFCell cell13 = row.createCell(13);
		HSSFCell cell14 = row.createCell(14);
		HSSFCell cell15 = row.createCell(15);
		HSSFCell cell16 = row.createCell(16);
		HSSFCell cell17 = row.createCell(17);
		HSSFCell cell18 = row.createCell(18);
		HSSFCell cell19 = row.createCell(19);
		HSSFCell cell20 = row.createCell(20);
		HSSFCell cell21 = row.createCell(21);
		HSSFCell cell22 = row.createCell(22);
		HSSFCell cell23 = row.createCell(23);
		HSSFCell cell24 = row.createCell(24);
		HSSFCell cell25 = row.createCell(25);
		HSSFCell cell26 = row.createCell(26);
		HSSFCell cell27 = row.createCell(27);
		HSSFCell cell28 = row.createCell(28);
		HSSFCell cell29 = row.createCell(29);
		HSSFCell cell30 = row.createCell(30);
		HSSFCell cell31 = row.createCell(31);
		HSSFCell cell32 = row.createCell(32);
		HSSFCell cell33 = row.createCell(33);
		HSSFCell cell34 = row.createCell(34);
		HSSFCell cell35 = row.createCell(35);
		HSSFCell cell36 = row.createCell(36);
		HSSFCell cell37 = row.createCell(37);
		HSSFCell cell38 = row.createCell(38);
		HSSFCell cell39 = row.createCell(39);
		HSSFCell cell40 = row.createCell(40);
		HSSFCell cell41 = row.createCell(41);
		
		cell0.setCellValue("序号");
		cell1.setCellValue("需求编号");
		cell2.setCellValue("项目编号");
		cell3.setCellValue("站点编号");
		cell4.setCellValue("站名");
		cell5.setCellValue("区域");
		cell6.setCellValue("区域经理");
		cell7.setCellValue("工程批次");
		cell8.setCellValue("经度");
		cell9.setCellValue("纬度");
		cell10.setCellValue("选址类型");
		cell11.setCellValue("选址人");
		cell12.setCellValue("选址完成");
		cell13.setCellValue("选址完成时间");
		cell14.setCellValue("地勘单位");
		cell15.setCellValue("是否地勘");
		cell16.setCellValue("设计单位");
		cell17.setCellValue("是否设计");
		cell18.setCellValue("土建施工单位");
		cell19.setCellValue("进场");
		cell20.setCellValue("开工时间");
		cell21.setCellValue("基础完工");
		cell22.setCellValue("基础完工时间");
		cell23.setCellValue("铁塔单位");
		cell24.setCellValue("铁塔安装");
		cell25.setCellValue("铁塔安装时间");
		cell26.setCellValue("塔型");
		cell27.setCellValue("塔高");
		cell28.setCellValue("引电设计单位");
		cell29.setCellValue("引电设计出图");
		cell30.setCellValue("引电单位");
		cell31.setCellValue("引电方案制定");
		cell32.setCellValue("方案制定时间");
		cell33.setCellValue("引电完工");
		cell34.setCellValue("引电方式");
		cell35.setCellValue("供电户号");
		cell36.setCellValue("配套安装完工");
		cell37.setCellValue("动环施工单位");
		cell38.setCellValue("动环施工完成");
		cell39.setCellValue("备注");
		cell40.setCellValue("全部完工");
		cell41.setCellValue("交付项");
		for (int i = 0; i < baseStationList.size(); i++) {
			Object[] forestry = baseStationList.get(i);
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
			cell12 = row.createCell(12);
			cell13 = row.createCell(13);
			cell14 = row.createCell(14);
			cell15 = row.createCell(15);
			cell16 = row.createCell(16);
			cell17 = row.createCell(17);
			cell18 = row.createCell(18);
			cell19 = row.createCell(19);
			cell20 = row.createCell(20);
			cell21 = row.createCell(21);
			cell22 = row.createCell(22);
			cell23 = row.createCell(23);
			cell24 = row.createCell(24);
			cell25 = row.createCell(25);
			cell26 = row.createCell(26);
			cell27 = row.createCell(27);
			cell28 = row.createCell(28);
			cell29 = row.createCell(29);
			cell30 = row.createCell(30);
			cell31 = row.createCell(31);
			cell32 = row.createCell(32);
			cell33 = row.createCell(33);
			cell34 = row.createCell(34);
			cell35 = row.createCell(35);
			cell36 = row.createCell(36);
			cell37 = row.createCell(37);
			cell38 = row.createCell(38);
			cell39 = row.createCell(39);
			cell40 = row.createCell(40);
			cell41 = row.createCell(41);
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
				cell10.setCellValue(forestry[10].toString());
			}
			
			if(forestry[11] != null) {
				cell11.setCellValue(forestry[11].toString());
			}
			
			if(forestry[12] != null){
				if((Boolean)forestry[12]) {
					cell12.setCellValue("是");
				} else {
					cell12.setCellValue("否");
				}
			}else {
				cell12.setCellValue("否");
			}
			if(forestry[13] != null) {
				cell13.setCellValue(forestry[13].toString());
			}
			if(forestry[14] != null) {
				cell14.setCellValue(forestry[14].toString());
			}
			
			if(forestry[15] != null) {
				if((Boolean)forestry[15]) {
					cell15.setCellValue("是");
				} else {
					cell15.setCellValue("否");
				}
			}else {
				cell15.setCellValue("否");
			}
			if(forestry[16] != null) {
				cell16.setCellValue(forestry[16].toString());
			}
			
			if(forestry[17] != null) {
				if((Boolean)forestry[17]) {
					cell17.setCellValue("是");
				} else {
					cell17.setCellValue("否");
				}
			}else {
				cell17.setCellValue("否");
			}
			if(forestry[18] != null) {
				cell18.setCellValue(forestry[18].toString());
			}
			
			if(forestry[19] != null) {
				if((Boolean)forestry[19]) {
					cell19.setCellValue("是");
				} else {
					cell19.setCellValue("否");
				}
			}else {
				cell19.setCellValue("否");
			}
			
			if(forestry[20] != null) {
				cell20.setCellValue(forestry[20].toString());
			}
			
			if(forestry[21] != null) {
				if((Boolean)forestry[21]) {
					cell21.setCellValue("是");
				} else {
					cell21.setCellValue("否");
				}
			}else {
				cell21.setCellValue("否");
			}
			
			if(forestry[22] != null) {
				cell22.setCellValue(forestry[22].toString());
			}
			
			if(forestry[23] != null) {
				cell23.setCellValue(forestry[23].toString());
			}
			if(forestry[24] != null) {
				if((Boolean)forestry[24]) {
					cell24.setCellValue("是");
				} else {
					cell24.setCellValue("否");
				}
			}else {
				cell24.setCellValue("否");
			}
			
			if(forestry[25] != null) {
				cell25.setCellValue(forestry[25].toString());
			}
			if(forestry[26] != null) {
				cell26.setCellValue(forestry[26].toString());
			}
			
			if(forestry[27] != null) {
				cell27.setCellValue(forestry[27].toString());
			}
			if(forestry[28] != null) {
				cell28.setCellValue(forestry[28].toString());
			}
			if(forestry[29] != null) {
				if((Boolean)forestry[29]) {
					cell29.setCellValue("是");
				} else {
					cell29.setCellValue("否");
				}
			}else {
				cell29.setCellValue("否");
			}
			if(forestry[30] != null) {
				cell30.setCellValue(forestry[30].toString());
			}
			if(forestry[31] != null) {
				if((Boolean)forestry[31]) {
					cell31.setCellValue("是");
				} else {
					cell31.setCellValue("否");
				}
			}else {
				cell31.setCellValue("否");
			}
			if(forestry[32] != null) {
				cell32.setCellValue(forestry[32].toString());
			}
			if(forestry[33] != null) {
				if((Boolean)forestry[33]) {
					cell33.setCellValue("是");
				} else {
					cell33.setCellValue("否");
				}
			}else {
				cell33.setCellValue("否");
			}
			if(forestry[34] != null) {
				cell34.setCellValue(forestry[34].toString());
			}
			if(forestry[35] != null) {
				cell35.setCellValue(forestry[35].toString());
			}
			if(forestry[36] != null) {
				if((Boolean)forestry[36]) {
					cell36.setCellValue("是");
				} else {
					cell36.setCellValue("否");
				}
			} else {
				cell36.setCellValue("否");
			}
			if(forestry[37] != null) {
				cell37.setCellValue(forestry[37].toString());
			}
			if(forestry[38] != null) {
				if((Boolean)forestry[38]) {
					cell38.setCellValue("是");
				} else {
					cell38.setCellValue("否");
				}
			}else {
				cell38.setCellValue("否");
			}
			if(forestry[39] != null) {
				cell39.setCellValue(forestry[39].toString());
			}
			
			if(forestry[40] != null) {
				if((Boolean)forestry[40]) {
					cell40.setCellValue("是");
				} else {
					cell40.setCellValue("否");
				}
			}else {
				cell40.setCellValue("否");
			}
			if(forestry[41] != null) {
				cell41.setCellValue(forestry[41].toString());
			}
			//sheet.setColumnWidth(0, 6000);
		}
		return workBook;
	}
	*/
	public static HSSFWorkbook createContractWorkbook(List<BaseStation> baseStationList) {
		HSSFWorkbook workBook = new HSSFWorkbook();
		//创建sheet页
		HSSFSheet sheet = workBook.createSheet("合同信息");
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
		HSSFCell cell12 = row.createCell(12);
		HSSFCell cell13 = row.createCell(13);
		HSSFCell cell14 = row.createCell(14);
		HSSFCell cell15 = row.createCell(15);
		
		cell0.setCellValue("需求编号");
		cell1.setCellValue("项目编号");
		cell2.setCellValue("站名");
		cell3.setCellValue("区域");
		cell4.setCellValue("区域经理");
		cell5.setCellValue("工程批次");
		cell6.setCellValue("接收日期");
		cell7.setCellValue("合同金额");
		cell8.setCellValue("对方业主");
		cell9.setCellValue("期限");
		cell10.setCellValue("签订单位");
		cell11.setCellValue("人员姓名");
		cell12.setCellValue("合同签订人");
		cell13.setCellValue("是否录入系统");
		cell14.setCellValue("是否归档");
		cell15.setCellValue("备注");

		for (int i = 0; i < baseStationList.size(); i++) {
			BaseStation bs = baseStationList.get(i);
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
			cell12 = row.createCell(12);
			cell13 = row.createCell(13);
			cell14 = row.createCell(14);
			cell15 = row.createCell(15);

			cell0.setCellValue(bs.getRequirementNo());
			cell1.setCellValue(bs.getProjectNo());
			cell2.setCellValue(bs.getStationName());
			cell3.setCellValue(bs.getArea());
			cell4.setCellValue(bs.getAreaMgr());
			cell5.setCellValue(bs.getProjectBatchNo());
			
			Contract contract = bs.getContract();
			
			if (contract.getReceiveDate() != null) {
				cell6.setCellValue(sdfDate.format(contract.getReceiveDate()));
			}	
			if (contract.getValue() != null) {
				cell7.setCellValue(contract.getValue());
			}
			
			cell8.setCellValue(contract.getOwner());
			cell9.setCellValue(contract.getPeriod());
			cell10.setCellValue(contract.getSignUnit());
			cell11.setCellValue(contract.getName());
			cell12.setCellValue(contract.getSignName());
			if(contract.getIsImport() != null){
				if((Boolean)contract.getIsImport()) {
					cell13.setCellValue("是");
				} else {
					cell13.setCellValue("否");
				}
			}else {
				cell13.setCellValue("否");
			}
			if(contract.getIsArchive() != null){
				if((Boolean)contract.getIsArchive()) {
					cell14.setCellValue("是");
				} else {
					cell14.setCellValue("否");
				}
			}else {
				cell14.setCellValue("否");
			}
			cell15.setCellValue(contract.getMemo());
		}
			
			//sheet.setColumnWidth(0, 6000);
		
		return workBook;
	}
	
	public static List<Contract> objectToContract(List<Object[]> models) {
		List<Contract> contractList = new ArrayList<Contract>();
		for (int i = 0; i < models.size(); i++) {
			try {
				Contract contract = new Contract();
				if (StringUtils.isBlank(models.get(i)[0].toString())) {
					contract.setRequirementNo(null);
				} else {
					contract.setRequirementNo(models.get(i)[0].toString());
				}
				
				if (StringUtils.isBlank(models.get(i)[6].toString())) {
					contract.setReceiveDate(null);
				} else {
					contract.setReceiveDate(sdfDate.parse(models.get(i)[6].toString()));
				}
				
				//合同金额
				if (StringUtils.isBlank(models.get(i)[7].toString())) {
					contract.setValue(null);
				} else {
					contract.setValue(Integer.valueOf(models.get(i)[7].toString()));
				}
				//对方业主
				if (StringUtils.isBlank(models.get(i)[8].toString())) {
					contract.setOwner(null);
				} else {
					contract.setOwner(models.get(i)[8].toString());
				}
				//期限
				if (StringUtils.isBlank(models.get(i)[9].toString())) {
					contract.setPeriod(null);
				} else {
					contract.setPeriod(models.get(i)[9].toString());
				}
				//签订单位
				if (StringUtils.isBlank(models.get(i)[10].toString())) {
					contract.setSignUnit(null);
				} else {
					contract.setSignUnit(models.get(i)[10].toString());
				}
				//人员姓名
				if (StringUtils.isBlank(models.get(i)[11].toString())) {
					contract.setName(null);
				} else {
					contract.setName(models.get(i)[11].toString());
				}
				//合同签订人
				if (StringUtils.isBlank(models.get(i)[12].toString())) {
					contract.setSignName(null);
				} else {
					contract.setSignName(models.get(i)[12].toString());
				}
				//是否录入系统
				if (StringUtils.isBlank(models.get(i)[13].toString())) {
					contract.setIsImport(null);
				} else {
					if(models.get(i)[13].toString().equals("是")) {
						contract.setIsImport(true);
					}
				}
				//是否归档
				if (StringUtils.isBlank(models.get(i)[14].toString())) {
					contract.setIsArchive(null);
				} else {
					if(models.get(i)[14].toString().equals("是")) {
						contract.setIsArchive(true);
					}
				}
				//备注
				if (StringUtils.isBlank(models.get(i)[15].toString())) {
					contract.setMemo(null);
				} else {
					contract.setMemo(models.get(i)[15].toString());
				}
				contractList.add(contract);
			} catch (Exception e) {
				e.printStackTrace();
				continue;
			}
		}
		
		return contractList;
	}

	public static HSSFWorkbook createBaseStationsWorkbook(List<BaseStation> baseStationList) {
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
		HSSFCell cell12 = row.createCell(12);
		HSSFCell cell13 = row.createCell(13);
		HSSFCell cell14 = row.createCell(14);
		HSSFCell cell15 = row.createCell(15);
		HSSFCell cell16 = row.createCell(16);
		HSSFCell cell17 = row.createCell(17);
		HSSFCell cell18 = row.createCell(18);
		HSSFCell cell19 = row.createCell(19);
		HSSFCell cell20 = row.createCell(20);
		HSSFCell cell21 = row.createCell(21);
		HSSFCell cell22 = row.createCell(22);
		HSSFCell cell23 = row.createCell(23);
		HSSFCell cell24 = row.createCell(24);
		HSSFCell cell25 = row.createCell(25);
		HSSFCell cell26 = row.createCell(26);
		HSSFCell cell27 = row.createCell(27);
		HSSFCell cell28 = row.createCell(28);
		HSSFCell cell29 = row.createCell(29);
		HSSFCell cell30 = row.createCell(30);
		HSSFCell cell31 = row.createCell(31);
		HSSFCell cell32 = row.createCell(32);
		HSSFCell cell33 = row.createCell(33);
		HSSFCell cell34 = row.createCell(34);
		HSSFCell cell35 = row.createCell(35);
		HSSFCell cell36 = row.createCell(36);
		HSSFCell cell37 = row.createCell(37);
		HSSFCell cell38 = row.createCell(38);
		HSSFCell cell39 = row.createCell(39);
		HSSFCell cell40 = row.createCell(40);
		HSSFCell cell41 = row.createCell(41);
		
		cell0.setCellValue("序号");
		cell1.setCellValue("需求编号");
		cell2.setCellValue("项目编号");
		cell3.setCellValue("站点编号");
		cell4.setCellValue("站名");
		cell5.setCellValue("区域");
		cell6.setCellValue("区域经理");
		cell7.setCellValue("工程批次");
		cell8.setCellValue("经度");
		cell9.setCellValue("纬度");
		cell10.setCellValue("选址类型");
		cell11.setCellValue("选址人");
		cell12.setCellValue("选址完成");
		cell13.setCellValue("选址完成时间");
		cell14.setCellValue("地勘单位");
		cell15.setCellValue("是否地勘");
		cell16.setCellValue("设计单位");
		cell17.setCellValue("是否设计");
		cell18.setCellValue("土建施工单位");
		cell19.setCellValue("进场");
		cell20.setCellValue("开工时间");
		cell21.setCellValue("基础完工");
		cell22.setCellValue("基础完工时间");
		cell23.setCellValue("铁塔单位");
		cell24.setCellValue("铁塔安装");
		cell25.setCellValue("铁塔安装时间");
		cell26.setCellValue("塔型");
		cell27.setCellValue("塔高");
		cell28.setCellValue("引电设计单位");
		cell29.setCellValue("引电设计出图");
		cell30.setCellValue("引电单位");
		cell31.setCellValue("引电方案制定");
		cell32.setCellValue("方案制定时间");
		cell33.setCellValue("引电完工");
		cell34.setCellValue("引电方式");
		cell35.setCellValue("供电户号");
		cell36.setCellValue("配套安装完工");
		cell37.setCellValue("动环施工单位");
		cell38.setCellValue("动环施工完成");
		cell39.setCellValue("备注");
		cell40.setCellValue("全部完工");
		cell41.setCellValue("交付项");
		for (int i = 0; i < baseStationList.size(); i++) {
			BaseStation forestry = baseStationList.get(i);
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
			cell12 = row.createCell(12);
			cell13 = row.createCell(13);
			cell14 = row.createCell(14);
			cell15 = row.createCell(15);
			cell16 = row.createCell(16);
			cell17 = row.createCell(17);
			cell18 = row.createCell(18);
			cell19 = row.createCell(19);
			cell20 = row.createCell(20);
			cell21 = row.createCell(21);
			cell22 = row.createCell(22);
			cell23 = row.createCell(23);
			cell24 = row.createCell(24);
			cell25 = row.createCell(25);
			cell26 = row.createCell(26);
			cell27 = row.createCell(27);
			cell28 = row.createCell(28);
			cell29 = row.createCell(29);
			cell30 = row.createCell(30);
			cell31 = row.createCell(31);
			cell32 = row.createCell(32);
			cell33 = row.createCell(33);
			cell34 = row.createCell(34);
			cell35 = row.createCell(35);
			cell36 = row.createCell(36);
			cell37 = row.createCell(37);
			cell38 = row.createCell(38);
			cell39 = row.createCell(39);
			cell40 = row.createCell(40);
			cell41 = row.createCell(41);
			cell0.setCellValue(forestry.getId());
			cell1.setCellValue(forestry.getRequirementNo());
			if(forestry.getProjectNo() != null) {
				cell2.setCellValue(forestry.getProjectNo());
			}
			
			if(forestry.getStationNo() != null) {
				cell3.setCellValue(forestry.getStationNo());
			}
			
			if(forestry.getStationName() != null) {
				cell4.setCellValue(forestry.getStationName());
			}
			
			if(forestry.getArea() != null) {
				cell5.setCellValue(forestry.getArea());
			}
			
			if(forestry.getAreaMgr() != null) {
				cell6.setCellValue(forestry.getAreaMgr());
			}
			
			if(forestry.getProjectBatchNo() != null) {
				cell7.setCellValue(forestry.getProjectBatchNo());
			}
			
			if(forestry.getLongitude() != null) {
				cell8.setCellValue(forestry.getLongitude());
			}
			
			if(forestry.getLatitude() != null) {
				cell9.setCellValue(forestry.getLatitude());
			}
			
			if(forestry.getXzType() != null) {
				cell10.setCellValue(forestry.getXzType());
			}
			
			if(forestry.getXzName() != null) {
				cell11.setCellValue(forestry.getXzName());
			}
			
			if(forestry.getXzFinish() != null){
				if(forestry.getXzFinish()) {
					cell12.setCellValue("是");
				} else {
					cell12.setCellValue("否");
				}
			}else {
				cell12.setCellValue("否");
			}
			if(forestry.getXzFinishTime() != null) {
				cell13.setCellValue(sdfDate.format(forestry.getXzFinishTime()));
			}
			if(forestry.getDkUnit() != null) {
				cell14.setCellValue(forestry.getDkUnit());
			}
			
			if(forestry.getDkFinish() != null) {
				if(forestry.getDkFinish()) {
					cell15.setCellValue("是");
				} else {
					cell15.setCellValue("否");
				}
			}else {
				cell15.setCellValue("否");
			}
			if(forestry.getSjUnit() != null) {
				cell16.setCellValue(forestry.getSjUnit());
			}
			
			if(forestry.getSjFinish() != null) {
				if(forestry.getSjFinish()) {
					cell17.setCellValue("是");
				} else {
					cell17.setCellValue("否");
				}
			}else {
				cell17.setCellValue("否");
			}
			if(forestry.getTjsgUnit() != null) {
				cell18.setCellValue(forestry.getTjsgUnit());
			}
			
			if(forestry.getTjsgIn() != null) {
				if(forestry.getTjsgIn()) {
					cell19.setCellValue("是");
				} else {
					cell19.setCellValue("否");
				}
			}else {
				cell19.setCellValue("否");
			}
			
			if(forestry.getKgTime() != null) {
				cell20.setCellValue(sdfDate.format(forestry.getKgTime()));
			}
			
			if(forestry.getJcFinish() != null) {
				if(forestry.getJcFinish()) {
					cell21.setCellValue("是");
				} else {
					cell21.setCellValue("否");
				}
			}else {
				cell21.setCellValue("否");
			}
			
			if(forestry.getJcFinishTime() != null) {
				cell22.setCellValue(sdfDate.format(forestry.getJcFinishTime()));
			}
			
			if(forestry.getTowerUnit() != null) {
				cell23.setCellValue(forestry.getTowerUnit());
			}
			if(forestry.getTowerFinish() != null) {
				if(forestry.getTowerFinish()) {
					cell24.setCellValue("是");
				} else {
					cell24.setCellValue("否");
				}
			}else {
				cell24.setCellValue("否");
			}
			
			if(forestry.getTowerFinishTime() != null) {
				cell25.setCellValue(sdfDate.format(forestry.getTowerFinishTime()));
			}
			if(forestry.getTowerType() != null) {
				cell26.setCellValue(forestry.getTowerType());
			}
			
			if(forestry.getTowerHeight() != null) {
				cell27.setCellValue(forestry.getTowerHeight());
			}
			if(forestry.getYdsjUnit() != null) {
				cell28.setCellValue(forestry.getYdsjUnit());
			}
			if(forestry.getYdsjFinish() != null) {
				if(forestry.getYdsjFinish()) {
					cell29.setCellValue("是");
				} else {
					cell29.setCellValue("否");
				}
			}else {
				cell29.setCellValue("否");
			}
			if(forestry.getYdUnit() != null) {
				cell30.setCellValue(forestry.getYdUnit());
			}
			if(forestry.getYdProgramFinish() != null) {
				if(forestry.getYdProgramFinish()) {
					cell31.setCellValue("是");
				} else {
					cell31.setCellValue("否");
				}
			}else {
				cell31.setCellValue("否");
			}
			if(forestry.getYdProgramTime() != null) {
				cell32.setCellValue(sdfDate.format(forestry.getYdProgramTime()));
			}
			if(forestry.getYdFinish() != null) {
				if(forestry.getYdFinish()) {
					cell33.setCellValue("是");
				} else {
					cell33.setCellValue("否");
				}
			}else {
				cell33.setCellValue("否");
			}
			if(forestry.getYdType() != null) {
				cell34.setCellValue(forestry.getYdType());
			}
			if(forestry.getGdNo() != null) {
				cell35.setCellValue(forestry.getGdNo());
			}
			if(forestry.getPtInstallFinish() != null) {
				if(forestry.getPtInstallFinish()) {
					cell36.setCellValue("是");
				} else {
					cell36.setCellValue("否");
				}
			} else {
				cell36.setCellValue("否");
			}
			if(forestry.getDhUnit() != null) {
				cell37.setCellValue(forestry.getDhUnit());
			}
			if(forestry.getDhFinish() != null) {
				if(forestry.getDhFinish()) {
					cell38.setCellValue("是");
				} else {
					cell38.setCellValue("否");
				}
			}else {
				cell38.setCellValue("否");
			}
			if(forestry.getMemo() != null) {
				cell39.setCellValue(forestry.getMemo());
			}
			
			if(forestry.getTotalFinish() != null) {
				if(forestry.getTotalFinish()) {
					cell40.setCellValue("是");
				} else {
					cell40.setCellValue("否");
				}
			}else {
				cell40.setCellValue("否");
			}
			if(forestry.getDelivery() != null) {
				cell41.setCellValue(forestry.getDelivery());
			}
			//sheet.setColumnWidth(0, 6000);
		}
		return workBook;
	}
	
}
