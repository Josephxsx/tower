package com.forestry.service.sys.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.forestry.dao.sys.BlueprintDao;
import com.forestry.model.sys.Blueprint;
import com.forestry.service.sys.BlueprintService;

import core.service.BaseService;

@Service
public class BlueprintServiceImpl extends BaseService<Blueprint> implements BlueprintService{
	private BlueprintDao blueprintDao;
	
	@Resource
	public void setBlueprintDao(BlueprintDao blueprintDao) {
		this.blueprintDao = blueprintDao;
		this.dao = blueprintDao;
	}

	@Override
	public int updateBlueprint(Integer id, String column, String value) {
		return blueprintDao.updateBlueprint(id, column, value);
	}

	@Override
	public int deleteByIds(Integer[] ids) {
		return blueprintDao.deleteByIds(ids);
	}
	
	
	
}
