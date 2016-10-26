package com.forestry.service.sys.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.forestry.dao.sys.BaseStationDao;
import com.forestry.dao.sys.ContractDao;
import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.Contract;
import com.forestry.service.sys.ContractService;

import core.service.BaseService;

@Service
public class ContractServiceImpl extends BaseService<Contract> implements ContractService{
	private ContractDao contractDao;

	@Resource
	public void setContractDao(ContractDao contractDao) {
		this.contractDao = contractDao;
		this.dao = contractDao;
	}

	@Resource
	private BaseStationDao baseStationDao;

	@Override
	public List<BaseStation> getBaseStationList(List<BaseStation> resultList) {
		for(BaseStation entity : resultList) {
			entity.setContract(contractDao.get(entity.getCid()));
		}
		// TODO Auto-generated method stub
		return resultList;
	}

}
