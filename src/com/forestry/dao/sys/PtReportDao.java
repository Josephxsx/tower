package com.forestry.dao.sys;

import com.forestry.model.sys.PtReport;

import core.dao.Dao;

public interface PtReportDao extends Dao<PtReport>{
	int updateReportLoc(Integer id, String fileName);
	int deleteBybsId(Integer[] ids);
}
