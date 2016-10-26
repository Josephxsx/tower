package com.forestry.dao.sys;

import com.forestry.model.sys.YdReport;

import core.dao.Dao;

public interface YdReportDao extends Dao<YdReport>{
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
