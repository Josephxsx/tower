package com.forestry.service.sys;

import java.util.List;

import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.YdReport;

import core.service.Service;

public interface YdReportService extends Service<YdReport>{
	List<YdReport> getReportList(List<YdReport> resultList);
	List<BaseStation> getBaseStationList(List<BaseStation> resultList);
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
