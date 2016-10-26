package com.forestry.model.sys.param;

import core.extjs.ExtJSBaseParameter;

public class BaseStationParameter extends ExtJSBaseParameter{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2251509794472970977L;
	private String $like_stationName;
	private String $eq_area;
	private String $eq_areaMgr;
	private String $eq_projectBatchNo;
	private String $eq_tjsgUnit;
	private String $eq_ydUnit;
	private String $like_requirementNo;
	
	
	public String get$like_requirementNo() {
		return $like_requirementNo;
	}
	public void set$like_requirementNo(String $like_requirementNo) {
		this.$like_requirementNo = $like_requirementNo;
	}
	public String get$eq_areaMgr() {
		return $eq_areaMgr;
	}
	public void set$eq_areaMgr(String $eq_areaMgr) {
		this.$eq_areaMgr = $eq_areaMgr;
	}
	public String get$eq_tjsgUnit() {
		return $eq_tjsgUnit;
	}
	public void set$eq_tjsgUnit(String $eq_tjsgUnit) {
		this.$eq_tjsgUnit = $eq_tjsgUnit;
	}
	public String get$eq_ydUnit() {
		return $eq_ydUnit;
	}
	public void set$eq_ydUnit(String $eq_ydUnit) {
		this.$eq_ydUnit = $eq_ydUnit;
	}
	public String get$like_stationName() {
		return $like_stationName;
	}
	public void set$like_stationName(String $like_stationName) {
		this.$like_stationName = $like_stationName;
	}
	public String get$eq_area() {
		return $eq_area;
	}
	public void set$eq_area(String $eq_area) {
		this.$eq_area = $eq_area;
	}
	public String get$eq_projectBatchNo() {
		return $eq_projectBatchNo;
	}
	public void set$eq_projectBatchNo(String $eq_projectBatchNo) {
		this.$eq_projectBatchNo = $eq_projectBatchNo;
	}
	
}
