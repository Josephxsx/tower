package com.forestry.dao.sys.impl;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.forestry.dao.sys.TjReportDao;
import com.forestry.model.sys.TjReport;

import core.dao.BaseDao;
@Repository
public class TjReportDaoImpl extends BaseDao<TjReport> implements TjReportDao{

	public TjReportDaoImpl() {
		super(TjReport.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public int updateReportLoc(Integer id, String fileName) {
		String queryStr  = "update tj_report set report_path = '" + fileName +
				"' where id = "+ id.toString();
		Query query = getSession().createSQLQuery(queryStr);
		int ret = query.executeUpdate();
		return ret;
	}

	@Override
	public int deleteBybsId(Integer[] ids) {
		StringBuilder sb = new StringBuilder("delete FROM tj_report where bs_id in ( ");
		int size = ids.length;
		for( int i = 0; i < size; i++ )
		{
		    sb.append(ids[i]).append(",");
		}
		sb.deleteCharAt(sb.toString().length() - 1);
		sb.append(" )" );
		Query query = getSession().createSQLQuery(sb.toString());
		return query.executeUpdate();
	}

}
