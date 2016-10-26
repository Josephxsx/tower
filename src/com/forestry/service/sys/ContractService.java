package com.forestry.service.sys;

import java.util.List;

import com.forestry.model.sys.BaseStation;
import com.forestry.model.sys.Contract;

import core.service.Service;

public interface ContractService extends Service<Contract>{
	List<BaseStation> getBaseStationList(List<BaseStation> resultList);
}
