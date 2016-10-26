package com.forestry.service.sys;

import java.util.List;

import com.forestry.model.sys.BaseStation;
import core.service.Service;
import core.support.QueryResult;

public interface BaseStationService extends Service<BaseStation> {
	List<BaseStation> getBaseStationList(List<BaseStation> resultList);
	
	List<Object[]> queryExportedBaseStation(Integer[] ids);
	
	List<BaseStation> queryExportedBaseStations(Integer[] ids);
	
	List<Object[]> queryExportedBaseStation(String stationName, String area, String projectBatchNo,
			String areaMgr, String tjsgUnit, String ydUnit);
	
	int deleteAll(String tableName);
	
	void updateByPK(BaseStation bs, String pk);
	
	List<String> getGroupByColumnName(String colName);
	
	List<Object[]> getStatisticIndex(String batchNo);
	
	QueryResult<Object[]> getXzFinishNotIn(String dateStr, BaseStation baseStation);

	QueryResult<Object[]> getInFinishNotWG(String dateStr, BaseStation baseStation);
	
	QueryResult<Object[]> getJcFinishNotTower(String dateStr, BaseStation baseStation);
	
	QueryResult<Object[]> getNoYdProgram(String dateStr, BaseStation baseStation);
	
	QueryResult<Object[]> getNoYdFinish(String dateStr, BaseStation baseStation);
	
	List<Integer> getBlueprintIds(Integer[] ids);
	
	List<Integer> getContractIds(Integer[] ids);
	
	List<Integer> getSubIds(Integer[] ids, String columnName);
	
	List<Object[]> getCurrentProgress();
	
	int updateStatusByColumnName(String requirementNo, String name, String value);
}
