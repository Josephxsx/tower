package com.forestry.service.sys.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.forestry.dao.sys.BaseStationDao;
import com.forestry.dao.sys.PtReportDao;
import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.PtReport;
import com.forestry.service.sys.PtReportService;

import core.service.BaseService;

@Service
public class PtReportServiceImpl extends BaseService<PtReport> implements PtReportService{
	private PtReportDao ptReportDao;

	@Resource
	private BaseStationDao baseStationDao;
	
	@Resource
	public void setPtReportDao(PtReportDao ptReportDao) {
		this.ptReportDao = ptReportDao;
		this.dao = ptReportDao;
	}

	@Override
	public List<PtReport> getReportList(List<PtReport> resultList) {
		List<PtReport> reportList = new ArrayList<PtReport>();
		for (PtReport entity : resultList) {
		PtReport report = new PtReport();
		report.setId(entity.getId());
		report.setBsId(entity.getBsId());
		report.setRequirementNo(entity.getRequirementNo());
		report.setOpenDate(entity.getOpenDate());
		report.setCloseDate(entity.getCloseDate());
		report.setReportPath(entity.getReportPath());
		report.setBaseInfo(baseStationDao.get(entity.getBsId()));
		report.setEquipType(entity.getEquipType());
		report.setSwitchPower(entity.getSwitchPower());
		report.setBattery(entity.getBattery());
		report.setNewModule(entity.getNewModule());
		report.setEarthWire(entity.getEarthWire());
		reportList.add(report);
	}
	return reportList;
	}

	@Override
	public int updateReportLoc(Integer id, String fileName) {
		return ptReportDao.updateReportLoc(id, fileName);
	}

	@Override
	public int deleteBybsId(Integer[] ids) {
		return ptReportDao.deleteBybsId(ids);
	}

	@Override
	public List<BaseStation> getBaseStationList(List<BaseStation> resultList) {
		for(BaseStation entity : resultList) {
			entity.setPtReport(ptReportDao.get(entity.getPtid()));
		}
		return resultList;
	}

}
