package com.forestry.dao.sys.impl;

import java.math.BigInteger;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;
import com.forestry.dao.sys.BaseStationDao;
import com.forestry.model.sys.BaseStation;

import core.dao.BaseDao;
import core.support.QueryResult;

@Repository
public class BaseStationDaoImpl extends BaseDao<BaseStation> implements BaseStationDao {
	private static final Logger log = Logger.getLogger(BaseStationDaoImpl.class);

	public BaseStationDaoImpl() {
		super(BaseStation.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Object[]> queryExportedBaseStation(Integer[] ids) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT id,requirement_no,project_no,station_no,station_name,");
		queryStr.append("area,area_mgr,project_batch_no,longitude,latitude,xz_type,xz_name,");
		queryStr.append("xz_finish,xz_finish_time,dk_unit,dk_finish,sj_unit,sj_finish,");
		queryStr.append("tjsg_unit,tjsg_in,kg_time,jc_finish,jc_finish_time,tower_unit,tower_finish,");
		queryStr.append("tower_finish_time,tower_type,tower_height,ydsj_unit,");
		queryStr.append("ydsj_finish,yd_unit,yd_finish,yd_program_time,yd_program_finish,");
		queryStr.append("yd_type,gd_no,pt_install_finish,dh_unit,dh_finish,memo,");
		queryStr.append("total_finish,delivery FROM basestation");
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
	public int deleteAll(String tableName) {
		String queryStr  = "truncate table " + tableName;
		Query query = getSession().createSQLQuery(queryStr);
		int ret = query.executeUpdate();
		return ret;
	}

	@Override
	public void updateByPK(BaseStation bs, String pk) {
		String queryStr  = "select id from basestation where requirement_no =  '" + pk + "'";
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
	public List<String> getGroupByColumnName(String colName) {
		StringBuilder sb = new StringBuilder("SELECT ");
		sb.append(colName);
		sb.append(" FROM basestation group by ");
		sb.append(colName);
		Query query = getSession().createSQLQuery(sb.toString());
		List<String> list = query.list();
		return list;
	}

	@Override
	public List<Object[]> getStatisticIndex(String batchNo) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("select area, count(*) as total, sum(xz_finish) as xzFinishNum, ");
		queryStr.append("sum(dk_finish) as dkFinishNum ,sum(sj_finish) as sjFinishNum ,");
		queryStr.append("sum(tjsg_in) as inFinishNum ,sum(jc_finish) as jcFinishNum ,");
		queryStr.append("sum(tower_finish) as towerFinishNum ,sum(ydsj_finish) as ydsjFinishNum,");
		queryStr.append("sum(yd_program_finish) as ydProgFinishNum ,sum(yd_finish) as ydFinishNum,");
		queryStr.append("sum(pt_install_finish) as ptFinishNum ,sum(dh_finish) as dhFinishNum, ");
		queryStr.append("sum(total_finish) as totalFinishNum ");
		queryStr.append("FROM basestation");
		if(StringUtils.isBlank(batchNo)){
			queryStr.append(" group by area");
		} else {
			queryStr.append(" where project_batch_no like '" + batchNo + "'  group by area");
		}
		Query query = getSession().createSQLQuery(queryStr.toString());
		return query.list();
	}

	@Override
	public QueryResult<Object[]> getXzFinishNotIn(String dateStr, BaseStation baseStation) {
		
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT area_mgr, area, station_name,xz_name, xz_finish_time,");
		if (StringUtils.isBlank(dateStr)) {
			queryStr.append("DATEDIFF(now(), xz_finish_time) as delay_date, ");
		} else {
			queryStr.append("DATEDIFF('" + dateStr + "', xz_finish_time) as delay_date, ");

		}
		queryStr.append("project_batch_no, memo FROM basestation where xz_finish = 1 and isNull(tjsg_in)");
		Query query = getSession().createSQLQuery(queryStr.toString());
		query.setFirstResult(baseStation.getFirstResult());
		query.setMaxResults(baseStation.getMaxResults());
		
		String totalSql = "select count(*) from basestation where xz_finish = 1 and isNull(tjsg_in)";
		Query queryTotal = getSession().createSQLQuery(totalSql);
		Long totalCount = new Long(((BigInteger)queryTotal.uniqueResult()).longValue());
		QueryResult<Object[]> qr = new QueryResult<Object[]>();
		qr.setTotalCount(totalCount);
		List<Object[]> resultList = query.list();
		qr.setResultList(resultList);
		return qr;
	}

	@Override
	public QueryResult<Object[]> getInFinishNotWG(String dateStr, BaseStation baseStation) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT area_mgr, area, station_name, kg_time,");
		if (StringUtils.isBlank(dateStr)) {
			queryStr.append("DATEDIFF(now(), kg_time) as delay_date, ");
		} else {
			queryStr.append("DATEDIFF('" + dateStr + "', kg_time) as delay_date, ");

		}
		queryStr.append("project_batch_no, memo FROM basestation where tjsg_in = 1 and isNull(jc_finish)");
		Query query = getSession().createSQLQuery(queryStr.toString());
		query.setFirstResult(baseStation.getFirstResult());
		query.setMaxResults(baseStation.getMaxResults());
		String totalSql = "select count(*) from basestation where tjsg_in = 1 and isNull(jc_finish)";
		Query queryTotal = getSession().createSQLQuery(totalSql);
		Long totalCount = new Long(((BigInteger)queryTotal.uniqueResult()).longValue());
		QueryResult<Object[]> qr = new QueryResult<Object[]>();
		qr.setTotalCount(totalCount);
		List<Object[]> resultList = query.list();
		qr.setResultList(resultList);
		return qr;
	}

	@Override
	public QueryResult<Object[]> getJcFinishNotTower(String dateStr, BaseStation baseStation) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT area_mgr, area, station_name, tower_unit, jc_finish_time,");
		if (StringUtils.isBlank(dateStr)) {
			queryStr.append("DATEDIFF(now(), jc_finish_time) as delay_date, ");
		} else {
			queryStr.append("DATEDIFF('" + dateStr + "', jc_finish_time) as delay_date, ");

		}
		queryStr.append("project_batch_no, memo FROM basestation where jc_finish = 1 and isNull(tower_finish) and DATEDIFF(now(), jc_finish_time) > 25");
		Query query = getSession().createSQLQuery(queryStr.toString());
		query.setFirstResult(baseStation.getFirstResult());
		query.setMaxResults(baseStation.getMaxResults());
		String totalSql = "select count(*) from basestation where jc_finish = 1 and isNull(tower_finish) and DATEDIFF(now(), jc_finish_time) > 25";
		Query queryTotal = getSession().createSQLQuery(totalSql);
		Long totalCount = new Long(((BigInteger)queryTotal.uniqueResult()).longValue());
		QueryResult<Object[]> qr = new QueryResult<Object[]>();
		qr.setTotalCount(totalCount);
		List<Object[]> resultList = query.list();
		qr.setResultList(resultList);
		return qr;
	}

	@Override
	public QueryResult<Object[]> getNoYdProgram(String dateStr, BaseStation baseStation) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT area_mgr, area, station_name, yd_unit, tower_finish_time,");
		if (StringUtils.isBlank(dateStr)) {
			queryStr.append("DATEDIFF(now(), tower_finish_time) as delay_date, ");
		} else {
			queryStr.append("DATEDIFF('" + dateStr + "', tower_finish_time) as delay_date, ");

		}
		queryStr.append("project_batch_no, memo FROM basestation where tower_finish = 1 and isNull(yd_program_finish)");
		Query query = getSession().createSQLQuery(queryStr.toString());
		query.setFirstResult(baseStation.getFirstResult());
		query.setMaxResults(baseStation.getMaxResults());
		String totalSql = "select count(*) from basestation where tower_finish = 1 and isNull(yd_program_finish)";
		Query queryTotal = getSession().createSQLQuery(totalSql);
		Long totalCount = new Long(((BigInteger)queryTotal.uniqueResult()).longValue());
		QueryResult<Object[]> qr = new QueryResult<Object[]>();
		qr.setTotalCount(totalCount);
		List<Object[]> resultList = query.list();
		qr.setResultList(resultList);
		return qr;
	}

	@Override
	public QueryResult<Object[]> getNoYdFinish(String dateStr, BaseStation baseStation) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT area_mgr, area, station_name, yd_unit, yd_program_time,");
		if (StringUtils.isBlank(dateStr)) {
			queryStr.append("DATEDIFF(now(), yd_program_time) as delay_date, ");
		} else {
			queryStr.append("DATEDIFF('" + dateStr + "', yd_program_time) as delay_date, ");

		}
		queryStr.append("project_batch_no, memo FROM basestation where yd_program_finish = 1 and isNull(yd_finish)");
		Query query = getSession().createSQLQuery(queryStr.toString());
		query.setFirstResult(baseStation.getFirstResult());
		query.setMaxResults(baseStation.getMaxResults());
		String totalSql = "select count(*) from basestation where yd_program_finish = 1 and isNull(yd_finish)";
		Query queryTotal = getSession().createSQLQuery(totalSql);
		Long totalCount = new Long(((BigInteger)queryTotal.uniqueResult()).longValue());
		QueryResult<Object[]> qr = new QueryResult<Object[]>();
		qr.setTotalCount(totalCount);
		List<Object[]> resultList = query.list();
		qr.setResultList(resultList);
		return qr;
	}

	@Override
	public List<Integer> getBlueprintIds(Integer[] ids) {
		StringBuilder sb = new StringBuilder("SELECT bp_id FROM basestation where id in ( ");
		int size = ids.length - 1;
		for( int i = 0; i < size; i++ )
		{
		    sb.append(ids[i]).append(", ");
		}
		sb.append(ids[size]).append(" )" );
		Query query = getSession().createSQLQuery(sb.toString());
		List<Integer> list = query.list();
		return list;
	}

	@Override
	public List<Object[]> queryExportedBaseStation(String stationName, String area, String projectBatchNo,
			String areaMgr, String tjsgUnit, String ydUnit) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT id,requirement_no,project_no,station_no,station_name,");
		queryStr.append("area,area_mgr,project_batch_no,longitude,latitude,xz_type,xz_name,");
		queryStr.append("xz_finish,xz_finish_time,dk_unit,dk_finish,sj_unit,sj_finish,");
		queryStr.append("tjsg_unit,tjsg_in,kg_time,jc_finish,jc_finish_time,tower_unit,tower_finish,");
		queryStr.append("tower_finish_time,tower_type,tower_height,ydsj_unit,");
		queryStr.append("ydsj_finish,yd_unit,yd_finish,yd_program_time,yd_program_finish,");
		queryStr.append("yd_type,gd_no,pt_install_finish,dh_unit,dh_finish,memo,");
		queryStr.append("total_finish,delivery FROM basestation");
		if(StringUtils.isBlank(stationName) && StringUtils.isBlank(area)
				&& StringUtils.isBlank(projectBatchNo)
				&& StringUtils.isBlank(areaMgr)
				&& StringUtils.isBlank(tjsgUnit)
				&& StringUtils.isBlank(ydUnit)){
			Query query = getSession().createSQLQuery(queryStr.toString());
			return query.list();
		} else {
			StringBuilder sb = new StringBuilder();
			if (StringUtils.isNotBlank(stationName)) {
				sb.append(" station_name like '%" + stationName + "%' and ");
			}
			
			if (StringUtils.isNotBlank(area) && !area.equals("null")) {
				sb.append(" area ='" + area + "' and ");
			}
			
			if (StringUtils.isNotBlank(projectBatchNo) && !projectBatchNo.equals("null")) {
				sb.append(" project_batch_no ='" + projectBatchNo + "' and ");
			}
			if (StringUtils.isNotBlank(areaMgr) && !areaMgr.equals("null")) {
				sb.append(" area_mgr ='" + areaMgr + "' and ");
			}
			if (StringUtils.isNotBlank(tjsgUnit) && !tjsgUnit.equals("null")) {
				sb.append(" tjsg_unit ='" + tjsgUnit + "' and ");
			}
			if (StringUtils.isNotBlank(ydUnit) && !ydUnit.equals("null")) {
				sb.append(" yd_unit ='" + ydUnit + "' and ");
			}
			if (sb.length() > 0) {
				sb.delete(sb.lastIndexOf("and"), sb.length() - 1);
				queryStr.append(" where " + sb.toString());
			}		
			Query query = getSession().createSQLQuery(queryStr.toString());
			return query.list();
		}
	}

	@Override
	public List<Object[]> getCurrentProgress() {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT ");
		queryStr.append("(SELECT group_concat(station_name) FROM forestry.basestation where xz_finish = 1 and DATEDIFF(now(), xz_finish_time) = 0) as xz,");
		queryStr.append("(SELECT group_concat(station_name) FROM forestry.basestation where jc_finish = 1 and DATEDIFF(now(), jc_finish_time) = 0) as jc,");
		queryStr.append("(SELECT group_concat(station_name) FROM forestry.basestation where tower_finish = 1 and DATEDIFF(now(), tower_finish_time) = 0) as tower ");
		queryStr.append("from dual");
		Query query = getSession().createSQLQuery(queryStr.toString());
		return query.list();
	}

	@Override
	public int updateStatusByColumnName(String requirementNo, String name, String value) {
		String queryStr  = "update basestation set " + name + " = " + value +
				" where requirement_no = '"+ requirementNo +"'";
		Query query = getSession().createSQLQuery(queryStr);
		int ret = query.executeUpdate();
		return ret;
	}

	@Override
	public List<Integer> getContractIds(Integer[] ids) {
		StringBuilder sb = new StringBuilder("SELECT cid FROM basestation where id in ( ");
		int size = ids.length - 1;
		for( int i = 0; i < size; i++ )
		{
		    sb.append(ids[i]).append(", ");
		}
		sb.append(ids[size]).append(" )" );
		Query query = getSession().createSQLQuery(sb.toString());
		List<Integer> list = query.list();
		return list;
	}

	@Override
	public List<BaseStation> queryExportedBaseStations(Integer[] ids) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("SELECT * FROM basestation");
		if(ids[0] == 0){
			Query query = getSession().createSQLQuery(queryStr.toString()).addEntity(BaseStation.class);
			return query.list();
		} else {
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < ids.length; i++) {
				sb.append(ids[i] + ",");
			}
			queryStr.append(" where id in (" + sb.deleteCharAt(sb.toString().length() - 1).toString() + ")");
			Query query = getSession().createSQLQuery(queryStr.toString()).addEntity(BaseStation.class);
			return query.list();
		}
	}

	@Override
	public List<Integer> getSubIds(Integer[] ids, String columnName) {
		StringBuilder sb = new StringBuilder("SELECT " + columnName + " FROM basestation where id in ( ");
		int size = ids.length - 1;
		for( int i = 0; i < size; i++ )
		{
		    sb.append(ids[i]).append(", ");
		}
		sb.append(ids[size]).append(" )" );
		Query query = getSession().createSQLQuery(sb.toString());
		List<Integer> list = query.list();
		return list;
	}
}
