package com.forestry.service.sys;

import java.util.List;

import com.forestry.model.sys.ShareStation;

import core.service.Service;

public interface ShareStationService extends Service<ShareStation>{
	List<ShareStation> getShareStationList(List<ShareStation> resultList);
	List<Object[]> queryExportedShareStation(String stationName, String area, String projectBatchNo);

	List<Object[]> queryExportedShareStation(Integer[] ids);
	
	void updateByPK(ShareStation bs, String pk);
	
	List<String> getBatchNoGroup();
	
	List<Object[]> getStatisticIndex(String batchNo);
}
