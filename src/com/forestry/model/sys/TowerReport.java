package com.forestry.model.sys;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.TowerReportParameter;

@Entity
@Table(name = "tower_report")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)

public class TowerReport extends TowerReportParameter {
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
	@Column(name = "type", length = 45, nullable = false)
	private String type;
	@Column(name = "height", length = 45, nullable = false)
	private String height;
	@Column(name = "weight", length = 45, nullable = false)
	private String weight;
	@Column(name = "install_type", length = 45, nullable = false)
	private String installType;
	@Column(name = "plat_type", length = 45, nullable = false)
	private String platType;
	@Column(name = "plat_num", length = 45, nullable = false)
	private String platNum;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public String getInstallType() {
		return installType;
	}
	public void setInstallType(String installType) {
		this.installType = installType;
	}
	public String getPlatType() {
		return platType;
	}
	public void setPlatType(String platType) {
		this.platType = platType;
	}
	public String getPlatNum() {
		return platNum;
	}
	public void setPlatNum(String platNum) {
		this.platNum = platNum;
	}
	
	
}
