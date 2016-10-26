package com.forestry.service.sys.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.forestry.dao.sys.BaseStationDao;
import com.forestry.model.sys.BaseStation;
import com.forestry.service.sys.BaseStationService;

import core.service.BaseService;
import core.support.QueryResult;

@Service
public class BaseStationServiceImpl extends BaseService<BaseStation> implements BaseStationService{
	private BaseStationDao baseStationDao;

	@Resource
	public void setBaseStationDao(BaseStationDao baseStationDao) {
		this.baseStationDao = baseStationDao;
		this.dao = baseStationDao;
	}

	
	@Override
	public List<BaseStation> getBaseStationList(List<BaseStation> resultList) {
		List<BaseStation> baseStationList = new ArrayList<BaseStation>();
		for (BaseStation entity : resultList) {
			BaseStation station = new BaseStation();
			
			station.setId(entity.getId());
			station.setRequirementNo(entity.getRequirementNo());
			station.setArea(entity.getArea());
			station.setAreaMgr(entity.getAreaMgr());
			station.setDelivery(entity.getDelivery());
			station.setDhFinish(entity.getDhFinish());
			station.setDhUnit(entity.getDhUnit());
			station.setDkFinish(entity.getDkFinish());
			station.setDkUnit(entity.getDkUnit());
			station.setGdNo(entity.getGdNo());
			station.setJcFinish(entity.getJcFinish());
			station.setJcFinishTime(entity.getJcFinishTime());
			station.setLatitude(entity.getLatitude());
			station.setLongitude(entity.getLongitude());
			station.setMemo(entity.getMemo());
			station.setProjectNo(entity.getProjectNo());
			station.setProjectBatchNo(entity.getProjectBatchNo());
			station.setPtInstallFinish(entity.getPtInstallFinish());
			station.setSjFinish(entity.getSjFinish());
			station.setSjUnit(entity.getSjUnit());
			station.setStationName(entity.getStationName());
			station.setStationNo(entity.getStationNo());	
			station.setTjsgIn(entity.getTjsgIn());
			station.setKgTime(entity.getKgTime());
			station.setTjsgUnit(entity.getTjsgUnit());
			station.setTotalFinish(entity.getTotalFinish());
			station.setTowerFinish(entity.getTowerFinish());
			station.setTowerFinishTime(entity.getTowerFinishTime());
			station.setTowerHeight(entity.getTowerHeight());
			station.setTowerType(entity.getTowerType());
			station.setTowerUnit(entity.getTowerUnit());
			station.setXzFinish(entity.getXzFinish());
			station.setXzFinishTime(entity.getXzFinishTime());
			station.setXzName(entity.getXzName());
			station.setXzType(entity.getXzType());
			station.setYdFinish(entity.getYdFinish());
			station.setYdProgramFinish(entity.getYdProgramFinish());
			station.setYdProgramTime(entity.getYdProgramTime());
			station.setYdsjFinish(entity.getYdsjFinish());
			station.setYdsjUnit(entity.getYdsjUnit());
			station.setYdType(entity.getYdType());
			station.setYdUnit(entity.getYdUnit());
			station.setYdFinish(entity.getYdFinish());
			station.setBluePrint(entity.getBlueprint());
			station.setBpRequirementNo(entity.getBlueprint().getRequirementNo());
			baseStationList.add(station);
		}
		return baseStationList;
	}


	@Override
	public List<Object[]> queryExportedBaseStation(Integer[] ids) {
		return baseStationDao.queryExportedBaseStation(ids);
	}


	@Override
	public int deleteAll(String tableName) {
		return baseStationDao.deleteAll(tableName);
	}


	@Override
	public void updateByPK(BaseStation bs, String pk) {
		baseStationDao.updateByPK(bs, pk);
	}


	@Override
	public List<String> getGroupByColumnName(String colName) {
		return baseStationDao.getGroupByColumnName(colName);
	}


	@Override
	public List<Object[]> getStatisticIndex(String batchNo) {
		return baseStationDao.getStatisticIndex(batchNo);
	}


	@Override
	public QueryResult<Object[]> getXzFinishNotIn(String dateStr, BaseStation baseStation) {
		return baseStationDao.getXzFinishNotIn(dateStr, baseStation);
	}


	@Override
	public QueryResult<Object[]> getInFinishNotWG(String dateStr, BaseStation baseStation) {
		return baseStationDao.getInFinishNotWG(dateStr, baseStation);
	}


	@Override
	public QueryResult<Object[]> getJcFinishNotTower(String dateStr, BaseStation baseStation) {
		return baseStationDao.getJcFinishNotTower(dateStr, baseStation);
	}


	@Override
	public QueryResult<Object[]> getNoYdProgram(String dateStr, BaseStation baseStation) {
		return baseStationDao.getNoYdProgram(dateStr, baseStation);
	}


	@Override
	public QueryResult<Object[]> getNoYdFinish(String dateStr, BaseStation baseStation) {
		return baseStationDao.getNoYdFinish(dateStr, baseStation);
	}


	@Override
	public List<Integer> getBlueprintIds(Integer[] ids) {
		return baseStationDao.getBlueprintIds(ids);
	}


	@Override
	public List<Object[]> queryExportedBaseStation(String stationName, String area, String projectBatchNo,
			String areaMgr, String tjsgUnit, String ydUnit) {
		return baseStationDao.queryExportedBaseStation(stationName, area, projectBatchNo,
				 areaMgr, tjsgUnit, ydUnit);
	}


	@Override
	public List<Object[]> getCurrentProgress() {
		return baseStationDao.getCurrentProgress();
	}


	@Override
	public int updateStatusByColumnName(String requirementNo, String name, String value) {
		return baseStationDao.updateStatusByColumnName(requirementNo, name, value);
	}


	@Override
	public List<Integer> getContractIds(Integer[] ids) {
		return baseStationDao.getContractIds(ids);
	}


	@Override
	public List<BaseStation> queryExportedBaseStations(Integer[] ids) {
		return baseStationDao.queryExportedBaseStations(ids);
	}


	@Override
	public List<Integer> getSubIds(Integer[] ids, String columnName) {
		return baseStationDao.getSubIds(ids, columnName);
	}

}
