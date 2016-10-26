package com.forestry.dao.sys;

import com.forestry.model.sys.Blueprint;

import core.dao.Dao;

public interface BlueprintDao extends Dao<Blueprint>{
	int updateBlueprint(Integer id, String column, String value);
	int deleteByIds(Integer[] ids);
}
