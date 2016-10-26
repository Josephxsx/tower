package com.forestry.dao.sys.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.forestry.dao.sys.ShareStationDao;
import com.forestry.model.sys.ShareStation;

import core.dao.BaseDao;

@Repository
public class ShareStationDaoImpl extends BaseDao<ShareStation> implements ShareStationDao{

	public ShareStationDaoImpl() {
		super(ShareStation.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Object[]> queryExportedShareStation(Integer[] ids) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT id,station_name,");
		queryStr.append("area,area_mgr,project_no,project_batch_no,longitude,latitude,");
		queryStr.append("share_station_name,belong_to,gz_finish,yd_finish FROM sharestation");
		if(ids[0] == 0){
			Query query = getSession().createSQLQuery(queryStr.toString());
			return query.list();
		} else {
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < ids.length; i++) {
				sb.append(ids[i] + ",");
			}
			queryStr.append(" where id in (" + sb.deleteCharAt(sb.toString().length() - 1).toString() + ")");
			Query query = getSession().createSQLQuery(queryStr.toString());
			return query.list();
		}
	}

	@Override
	public void updateByPK(ShareStation bs, String pk) {
		String queryStr  = "select id from sharestation where project_no =  '" + pk + "'";
		Query query = getSession().createSQLQuery(queryStr.toString());
		List<Object> list = query.list();
		
		if (list.size() == 0) {
			getSession().persist(bs);
		} else {
			//BaseStation bsInDB = (BaseStation)(list.get(0));
			//log.info(list.get(0));
			bs.setId((Integer)(list.get(0)));
			getSession().update(bs);
		}
		
	}

	@Override
	public List<String> getBatchNoGroup() {
		String queryStr  = "SELECT project_batch_no FROM sharestation group by project_batch_no";
		Query query = getSession().createSQLQuery(queryStr.toString());
		List<String> list = query.list();
		return list;
	}

	@Override
	public List<Object[]> getStatisticIndex(String batchNo) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("select area, count(*) as total, sum(gz_finish) as gzFinishNum, ");
		queryStr.append("sum(yd_finish) as ydFinishNum ");
		queryStr.append("FROM sharestation");
		if(StringUtils.isBlank(batchNo)){
			queryStr.append(" group by area");
		} else {
			queryStr.append(" where project_batch_no like '" + batchNo + "'  group by area");
		}
		Query query = getSession().createSQLQuery(queryStr.toString());
		return query.list();
	}

	@Override
	public List<Object[]> queryExportedShareStation(String stationName, String area, String projectBatchNo) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT id,station_name,");
		queryStr.append("area,area_mgr,project_no,project_batch_no,longitude,latitude,");
		queryStr.append("share_station_name,belong_to,gz_finish,yd_finish FROM sharestation");
		if(StringUtils.isBlank(stationName) && StringUtils.isBlank(area)
				&& StringUtils.isBlank(projectBatchNo)){
			Query query = getSession().createSQLQuery(queryStr.toString());
			return query.list();
		} else {
			StringBuilder sb = new StringBuilder();
			if (StringUtils.isNotBlank(stationName)) {
				sb.append(" station_name like '%" + stationName + "%' and ");
			}
			
			if (StringUtils.isNotBlank(area) && !area.equals("null")) {
				sb.append(" area like '%" + area + "%' and ");
			}
			
			if (StringUtils.isNotBlank(projectBatchNo) && !projectBatchNo.equals("null")) {
				sb.append(" project_batch_no like '%" + projectBatchNo + "%' and ");
			}
			sb.delete(sb.lastIndexOf("and"), sb.length() - 1);
			queryStr.append(" where " + sb.toString());
			Query query = getSession().createSQLQuery(queryStr.toString());
			return query.list();
		}
	}

}
