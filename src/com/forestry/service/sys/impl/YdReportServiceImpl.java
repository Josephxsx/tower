package com.forestry.service.sys.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.forestry.dao.sys.BaseStationDao;
import com.forestry.dao.sys.YdReportDao;
import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.YdReport;
import com.forestry.service.sys.YdReportService;

import core.service.BaseService;
@Service
public class YdReportServiceImpl extends BaseService<YdReport> implements YdReportService{
	private YdReportDao ydReportDao;

	@Resource
	private BaseStationDao baseStationDao;
	
	@Resource
	public void setYdReportDao(YdReportDao ydReportDao) {
		this.ydReportDao = ydReportDao;
		this.dao = ydReportDao;
	}

	@Override
	public List<YdReport> getReportList(List<YdReport> resultList) {
		List<YdReport> reportList = new ArrayList<YdReport>();
		for (YdReport entity : resultList) {
		YdReport report = new YdReport();
		report.setId(entity.getId());
		report.setBsId(entity.getBsId());
		report.setRequirementNo(entity.getRequirementNo());
		report.setOpenDate(entity.getOpenDate());
		report.setCloseDate(entity.getCloseDate());
		report.setReportPath(entity.getReportPath());
		report.setBaseInfo(baseStationDao.get(entity.getBsId()));
		report.setHighLow(entity.getHighLow());
		report.setDirectTurn(entity.getDirectTurn());
		report.setElecUnit(entity.getElecUnit());
		report.setTransNo(entity.getTransNo());
		report.setInSky(entity.getInSky());
		report.setInGround(entity.getInGround());
		report.setNewPole(entity.getNewPole());
		report.setAccountNo(entity.getAccountNo());
		report.setAmmeterNo(entity.getAmmeterNo());
		report.setLowVolt(entity.getLowVolt());
		reportList.add(report);
	}
	return reportList;
	}

	@Override
	public int updateReportLoc(Integer id, String fileName) {
		return ydReportDao.updateReportLoc(id, fileName);
	}

	@Override
	public int deleteBybsId(Integer[] ids) {
		return ydReportDao.deleteBybsId(ids);
	}

	@Override
	public List<BaseStation> getBaseStationList(List<BaseStation> resultList) {
		for(BaseStation entity : resultList) {
			entity.setYdReport(ydReportDao.get(entity.getYdid()));
		}
		return resultList;
	}

}
