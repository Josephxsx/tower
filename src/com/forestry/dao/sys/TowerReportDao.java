package com.forestry.dao.sys;

import com.forestry.model.sys.TowerReport;

import core.dao.Dao;

public interface TowerReportDao extends Dao<TowerReport>{
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
