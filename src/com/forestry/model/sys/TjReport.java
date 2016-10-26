package com.forestry.model.sys;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.TjReportParameter;

@Entity
@Table(name = "tj_report")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)

public class TjReport extends TjReportParameter{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7056443763988072558L;
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id; // ID
	@Column(name = "requirement_no", length = 45, nullable = false)
	private String requirementNo; 
	@Column(name = "open_date", length = 45, nullable = false)
	private Date openDate;
	@Column(name = "close_date", length = 45, nullable = false)
	private Date closeDate;
	@Column(name = "tower_type", length = 45, nullable = false)
	private String towerType;
	@Column(name = "base_type", length = 45, nullable = false)
	private String baseType;
	@Column(name = "stub_length", length = 45, nullable = false)
	private String stubLength;
	@Column(name = "diam", length = 45, nullable = false)
	private String diam;
	@Column(name = "steel_brand", length = 45, nullable = false)
	private String steelBrand;
	@Column(name = "concrete_no", length = 45, nullable = false)
	private String concreteNo;
	@Column(name = "room_type", length = 45, nullable = false)
	private String roomType;
	@Column(name = "size", length = 45, nullable = false)
	private String size;
	@Column(name = "report_path", length = 256, nullable = false)
	private String reportPath;
	private BaseStation baseInfo;
	
	@Column(name = "bs_id")
	private Integer bsId;
	
	public Integer getBsId() {
		return bsId;
	}
	public void setBsId(Integer bsId) {
		this.bsId = bsId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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
	public String getTowerType() {
		return towerType;
	}
	public void setTowerType(String towerType) {
		this.towerType = towerType;
	}
	public String getBaseType() {
		return baseType;
	}
	public void setBaseType(String baseType) {
		this.baseType = baseType;
	}
	public String getStubLength() {
		return stubLength;
	}
	public void setStubLength(String stubLength) {
		this.stubLength = stubLength;
	}
	public String getDiam() {
		return diam;
	}
	public void setDiam(String diam) {
		this.diam = diam;
	}
	public String getSteelBrand() {
		return steelBrand;
	}
	public void setSteelBrand(String steelBrand) {
		this.steelBrand = steelBrand;
	}
	public String getConcreteNo() {
		return concreteNo;
	}
	public void setConcreteNo(String concreteNo) {
		this.concreteNo = concreteNo;
	}
	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
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
}
