package com.forestry.service.sys;

import java.util.List;

import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.TjReport;

import core.service.Service;

public interface TjReportService extends Service<TjReport>{
	List<TjReport> getReportList(List<TjReport> resultList);
	List<BaseStation> getBaseStationList(List<BaseStation> resultList);
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
