package com.forestry.dao.sys;

import com.forestry.model.sys.TjReport;

import core.dao.Dao;

public interface TjReportDao extends Dao<TjReport>{
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
