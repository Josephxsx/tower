package com.forestry.dao.sys.impl;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.forestry.dao.sys.BlueprintDao;
import com.forestry.model.sys.Blueprint;

import core.dao.BaseDao;

@Repository
public class BlueprintDaoImpl extends BaseDao<Blueprint> implements BlueprintDao {

	public BlueprintDaoImpl() {
		super(Blueprint.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public int updateBlueprint(Integer id, String column, String value) {
		String queryStr  = "update blueprint set " + column + " = '" + value +
				"' where id = "+ id.toString();
		Query query = getSession().createSQLQuery(queryStr);
		int ret = query.executeUpdate();
		return ret;
	}

	@Override
	public int deleteByIds(Integer[] ids) {
		StringBuilder sb = new StringBuilder("delete FROM blueprint where id in ( ");
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
