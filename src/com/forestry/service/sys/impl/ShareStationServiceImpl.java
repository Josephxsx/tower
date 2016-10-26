package com.forestry.service.sys.impl;

import com.forestry.service.sys.ShareStationService;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.forestry.dao.sys.ShareStationDao;
import com.forestry.model.sys.ShareStation;
import core.service.BaseService;

@Service
public class ShareStationServiceImpl extends BaseService<ShareStation> implements ShareStationService {
	private ShareStationDao shareStationDao;

	public ShareStationDao getShareStationDao() {
		return shareStationDao;
	}
	@Resource
	public void setShareStationDao(ShareStationDao shareStationDao) {
		this.shareStationDao = shareStationDao;
		this.dao = shareStationDao;
	}

	@Override
	public List<ShareStation> getShareStationList(List<ShareStation> resultList) {
		List<ShareStation> shareStationList = new ArrayList<ShareStation>();
		for (ShareStation entity : resultList) {
			ShareStation station = new ShareStation();
			
			station.setId(entity.getId());
			station.setArea(entity.getArea());
			station.setAreaMgr(entity.getAreaMgr());
			station.setLatitude(entity.getLatitude());
			station.setLongitude(entity.getLongitude());
			station.setProjectNo(entity.getProjectNo());
			station.setProjectBatchNo(entity.getProjectBatchNo());
			station.setStationName(entity.getStationName());
			station.setShareStationName(entity.getShareStationName());
			station.setBelongTo(entity.getBelongTo());
			station.setGzFinish(entity.getGzFinish());
			station.setYdFinish(entity.getYdFinish());
			shareStationList.add(station);
		}
		return shareStationList;
	}

	@Override
	public List<Object[]> queryExportedShareStation(Integer[] ids) {
		return shareStationDao.queryExportedShareStation(ids);
	}

	@Override
	public void updateByPK(ShareStation bs, String pk) {
		shareStationDao.updateByPK(bs, pk);
		
	}
	@Override
	public List<String> getBatchNoGroup() {
		return shareStationDao.getBatchNoGroup();
	}
	@Override
	public List<Object[]> getStatisticIndex(String batchNo) {
		return shareStationDao.getStatisticIndex(batchNo);
	}
	@Override
	public List<Object[]> queryExportedShareStation(String stationName, String area, String projectBatchNo) {
		return shareStationDao.queryExportedShareStation(stationName, area, projectBatchNo);
	}
}
