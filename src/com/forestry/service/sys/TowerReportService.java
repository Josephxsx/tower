package com.forestry.service.sys;

import java.util.List;

import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.TowerReport;

import core.service.Service;


public interface TowerReportService extends Service<TowerReport>{
	List<TowerReport> getReportList(List<TowerReport> resultList);
	List<BaseStation> getBaseStationList(List<BaseStation> resultList);
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
