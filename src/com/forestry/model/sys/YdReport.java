package com.forestry.model.sys;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.YdReportParameter;

@Entity
@Table(name = "yd_report")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class YdReport extends YdReportParameter {
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
	@Column(name = "hign_low", length = 45, nullable = false)
	private String highLow;
	@Column(name = "direct_turn", length = 45, nullable = false)
	private String directTurn;
	@Column(name = "elec_unit", length = 45, nullable = false)
	private String elecUnit;
	@Column(name = "trans_no", length = 45, nullable = false)
	private String transNo;
	@Column(name = "in_sky", length = 45, nullable = false)
	private String inSky;
	@Column(name = "in_ground", length = 45, nullable = false)
	private String inGround;
	@Column(name = "new_pole", length = 45, nullable = false)
	private String newPole;
	@Column(name = "account_no", length = 45, nullable = false)
	private String accountNo;
	@Column(name = "ammeter_no", length = 45, nullable = false)
	private String ammeterNo;
	@Column(name = "low_volt", length = 45, nullable = false)
	private String lowVolt;
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
	public String getHighLow() {
		return highLow;
	}
	public void setHighLow(String highLow) {
		this.highLow = highLow;
	}
	public String getDirectTurn() {
		return directTurn;
	}
	public void setDirectTurn(String directTurn) {
		this.directTurn = directTurn;
	}
	public String getElecUnit() {
		return elecUnit;
	}
	public void setElecUnit(String elecUnit) {
		this.elecUnit = elecUnit;
	}
	public String getTransNo() {
		return transNo;
	}
	public void setTransNo(String transNo) {
		this.transNo = transNo;
	}
	public String getInSky() {
		return inSky;
	}
	public void setInSky(String inSky) {
		this.inSky = inSky;
	}
	public String getInGround() {
		return inGround;
	}
	public void setInGround(String inGround) {
		this.inGround = inGround;
	}
	public String getNewPole() {
		return newPole;
	}
	public void setNewPole(String newPole) {
		this.newPole = newPole;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getAmmeterNo() {
		return ammeterNo;
	}
	public void setAmmeterNo(String ammeterNo) {
		this.ammeterNo = ammeterNo;
	}
	public String getLowVolt() {
		return lowVolt;
	}
	public void setLowVolt(String lowVolt) {
		this.lowVolt = lowVolt;
	}
	
}
