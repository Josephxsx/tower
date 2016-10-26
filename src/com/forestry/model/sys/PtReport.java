package com.forestry.model.sys;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.PtReportParameter;

@Entity
@Table(name = "pt_report")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)

public class PtReport extends PtReportParameter{
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id; // ID
	@Column(name = "bs_id")
	private Integer bsId;
	@Column(name = "requirement_no", length = 45, nullable = false)
	private String requirementNo; 
	@Column(name = "open_date", length = 45, nullable = false)
	private Date openDate;
	@Column(name = "close_date", length = 45, nullable = false)
	private Date closeDate;
	@Column(name = "report_path", length = 256, nullable = false)
	private String reportPath;
	private BaseStation baseInfo;
	
	@Column(name = "equip_type", length = 45, nullable = false)
	private String equipType;
	@Column(name = "switch_power", length = 45, nullable = false)
	private String switchPower;
	@Column(name = "new_module", length = 45, nullable = false)
	private String newModule;
	@Column(name = "battery", length = 45, nullable = false)
	private String battery;
	@Column(name = "earth_wire", length = 45, nullable = false)
	private String earthWire;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getBsId() {
		return bsId;
	}
	public void setBsId(Integer bsId) {
		this.bsId = bsId;
	}
	public String getRequirementNo() {
		return requirementNo;
	}
	public void setRequirementNo(String requirementNo) {
		this.requirementNo = requirementNo;
	}
	public Date getOpenDate() {
		return openDate;
	}
	public void setOpenDate(Date openDate) {
		this.openDate = openDate;
	}
	public Date getCloseDate() {
		return closeDate;
	}
	public void setCloseDate(Date closeDate) {
		this.closeDate = closeDate;
	}
	public String getReportPath() {
		return reportPath;
	}
	public void setReportPath(String reportPath) {
		this.reportPath = reportPath;
	}
	public BaseStation getBaseInfo() {
		return baseInfo;
	}
	public void setBaseInfo(BaseStation baseInfo) {
		this.baseInfo = baseInfo;
	}
	public String getEquipType() {
		return equipType;
	}
	public void setEquipType(String equipType) {
		this.equipType = equipType;
	}
	public String getSwitchPower() {
		return switchPower;
	}
	public void setSwitchPower(String switchPower) {
		this.switchPower = switchPower;
	}
	public String getNewModule() {
		return newModule;
	}
	public void setNewModule(String newModule) {
		this.newModule = newModule;
	}
	public String getBattery() {
		return battery;
	}
	public void setBattery(String battery) {
		this.battery = battery;
	}
	public String getEarthWire() {
		return earthWire;
	}
	public void setEarthWire(String earthWire) {
		this.earthWire = earthWire;
	}
	
}
