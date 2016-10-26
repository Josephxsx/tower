package com.forestry.service.sys;

import java.util.List;

import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.PtReport;

import core.service.Service;

public interface PtReportService extends Service<PtReport>{
	List<PtReport> getReportList(List<PtReport> resultList);
	List<BaseStation> getBaseStationList(List<BaseStation> resultList);
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
