package com.forestry.service.sys.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.forestry.dao.sys.BaseStationDao;
import com.forestry.dao.sys.TjReportDao;
import com.forestry.dao.sys.TowerReportDao;
import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.TjReport;
import com.forestry.model.sys.TowerReport;
import com.forestry.service.sys.TowerReportService;

import core.service.BaseService;
@Service
public class TowerReportServiceImpl extends BaseService<TowerReport> implements TowerReportService{
	private TowerReportDao towerReportDao;
	
	@Resource
	private BaseStationDao baseStationDao;
	
	@Resource
	public void setTowerReportDao(TowerReportDao towerReportDao) {
		this.towerReportDao = towerReportDao;
		this.dao = towerReportDao;
	}
	@Override
	public List<TowerReport> getReportList(List<TowerReport> resultList) {
		List<TowerReport> reportList = new ArrayList<TowerReport>();
			for (TowerReport entity : resultList) {
			TowerReport report = new TowerReport();
			report.setId(entity.getId());
			report.setBsId(entity.getBsId());
			report.setRequirementNo(entity.getRequirementNo());
			report.setOpenDate(entity.getOpenDate());
			report.setCloseDate(entity.getCloseDate());
			report.setReportPath(entity.getReportPath());
			report.setBaseInfo(baseStationDao.get(entity.getBsId()));
			report.setType(entity.getType());
			report.setHeight(entity.getHeight());
			report.setWeight(entity.getWeight());
			report.setInstallType(entity.getInstallType());
			report.setPlatType(entity.getPlatType());
			report.setPlatNum(entity.getPlatNum());
			
			reportList.add(report);
		}
		return reportList;
	}

	

	@Override
	public int updateReportLoc(Integer id, String fileName) {
		return towerReportDao.updateReportLoc(id, fileName);
	}
	@Override
	public int deleteBybsId(Integer[] ids) {
		return towerReportDao.deleteBybsId(ids);
	}
	@Override
	public List<BaseStation> getBaseStationList(List<BaseStation> resultList) {
		for(BaseStation entity : resultList) {
			entity.setTowerReport(towerReportDao.get(entity.getTowerid()));
		}
		return resultList;
	}

}
