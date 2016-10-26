package com.forestry.service.sys.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.forestry.dao.sys.BaseStationDao;
import com.forestry.dao.sys.TjReportDao;
import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.TjReport;
import com.forestry.service.sys.TjReportService;

import core.service.BaseService;
@Service
public class TjReportServiceImpl extends BaseService<TjReport> implements TjReportService {

	private TjReportDao tjReportDao;
	
	@Resource
	private BaseStationDao baseStationDao;
	
	@Resource
	public void setTjReportDao(TjReportDao tjReportDao) {
		this.tjReportDao = tjReportDao;
		this.dao = tjReportDao;
	}

	@Override
	public List<TjReport> getReportList(List<TjReport> resultList) {
		List<TjReport> reportList = new ArrayList<TjReport>();
		//HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		//String imagePath = request.getContextPath();
		for (TjReport entity : resultList) {
			TjReport report = new TjReport();
			report.setId(entity.getId());
			report.setBsId(entity.getBsId());
			report.setRequirementNo(entity.getRequirementNo());
			report.setOpenDate(entity.getOpenDate());
			report.setCloseDate(entity.getCloseDate());
			report.setTowerType(entity.getTowerType());
			report.setBaseType(entity.getBaseType());
			report.setStubLength(entity.getStubLength());
			report.setDiam(entity.getDiam());
			report.setSteelBrand(entity.getSteelBrand());
			report.setConcreteNo(entity.getConcreteNo());
			report.setRoomType(entity.getRoomType());
			report.setSize(entity.getSize());
			report.setReportPath(entity.getReportPath());
			report.setBaseInfo(baseStationDao.get(entity.getBsId()));
			reportList.add(report);
		}
		return reportList;
	}

	@Override
	public int updateReportLoc(Integer id, String fileName) {
		return tjReportDao.updateReportLoc(id, fileName);
	}

	@Override
	public int deleteBybsId(Integer[] ids) {
		return tjReportDao.deleteBybsId(ids);
	}

	@Override
	public List<BaseStation> getBaseStationList(List<BaseStation> resultList) {
		for(BaseStation entity : resultList) {
			entity.setTjReport(tjReportDao.get(entity.getTjid()));
		}
		return resultList;
	}
}
