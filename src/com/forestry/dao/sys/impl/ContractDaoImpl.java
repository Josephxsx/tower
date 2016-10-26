package com.forestry.dao.sys.impl;

import org.springframework.stereotype.Repository;

import com.forestry.dao.sys.ContractDao;
import com.forestry.model.sys.Contract;
import core.dao.BaseDao;
@Repository
public class ContractDaoImpl extends BaseDao<Contract> implements ContractDao {
	public ContractDaoImpl() {
		super(Contract.class);
	}
}
