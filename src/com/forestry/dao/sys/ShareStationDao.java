package com.forestry.dao.sys;

import java.util.List;

import com.forestry.model.sys.ShareStation;

import core.dao.Dao;

public interface ShareStationDao extends Dao<ShareStation>{
	List<Object[]> queryExportedShareStation(Integer[] ids);
	List<Object[]> queryExportedShareStation(String stationName, String area, String projectBatchNo);

	void updateByPK(ShareStation bs, String pk);
	
	List<String> getBatchNoGroup();
	
	List<Object[]> getStatisticIndex(String batchNo);
}

