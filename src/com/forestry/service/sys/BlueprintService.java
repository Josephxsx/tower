package com.forestry.service.sys;

import com.forestry.model.sys.Blueprint;

import core.service.Service;

public interface BlueprintService extends Service<Blueprint>{
	int updateBlueprint(Integer id, String column, String value);
	int deleteByIds(Integer[] ids);
}
