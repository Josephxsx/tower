package com.forestry.model.sys;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.BaseStationParameter;
import com.forestry.model.sys.param.ForestryTypeParameter;

@Entity
@Table(name = "basestation")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//@JsonIgnoreProperties(value = { "maxResults", "firstResult", "topCount", "sortColumns", "cmd", "queryDynamicConditions", "sortedConditions", "dynamicProperties", "success", "message", "sortColumnsString", "forestrys",
//		"attachments"})
public class BaseStation  extends BaseStationParameter {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id; // ID
	@Column(name = "requirement_no", length = 45, nullable = false)
	private String requirementNo; 
	@Column(name = "project_no", length = 45, nullable = true)
	private String projectNo; 
	@Column(name = "station_no", length = 45, nullable = true)
	private String stationNo;
	@Column(name = "station_name", length = 45, nullable = true)
	private String stationName;
	@Column(name = "area", length = 45, nullable = true)
	private String area;
	@Column(name = "area_mgr", length = 45, nullable = true)
	private String areaMgr;
	@Column(name = "project_batch_no", length = 45, nullable = true)
	private String projectBatchNo;
	@Column(name = "longitude", length = 45, nullable = true)
	private String longitude;
	@Column(name = "latitude", length = 45, nullable = true)
	private String latitude;
	@Column(name = "xz_type", length = 45, nullable = true)
	private String xzType;
	@Column(name = "xz_name", length = 45, nullable = true)
	private String xzName;
	@Column(name = "xz_finish",  nullable = true)
	private Boolean xzFinish;
	@Column(name = "xz_finish_time",  nullable = true)
	private Date xzFinishTime;
	@Column(name = "dk_unit", length = 45, nullable = true)
	private String dkUnit;
	@Column(name = "dk_finish",  nullable = true)
	private Boolean dkFinish;
	@Column(name = "sj_unit", length = 45, nullable = true)
	private String sjUnit;
	@Column(name = "sj_finish",  nullable = true)
	private Boolean sjFinish;
	@Column(name = "tjsg_unit", length = 45, nullable = true)
	private String tjsgUnit;
	@Column(name = "tjsg_in",  nullable = true)
	private Boolean tjsgIn;
	@Column(name = "jc_finish",  nullable = true)
	private Boolean jcFinish;
	@Column(name = "jc_finish_time",  nullable = true)
	private Date jcFinishTime;
	@Column(name = "tower_unit", length = 45, nullable = true)
	private String towerUnit;
	@Column(name = "tower_finish",  nullable = true)
	private Boolean towerFinish;
	@Column(name = "tower_finish_time",  nullable = true)
	private Date towerFinishTime;
	@Column(name = "tower_type", length = 45, nullable = true)
	private String towerType;
	@Column(name = "tower_height", length = 45, nullable = true)
	private String towerHeight;
	@Column(name = "ydsj_unit", length = 45, nullable = true)
	private String ydsjUnit;
	@Column(name = "ydsj_finish",  nullable = true)
	private Boolean ydsjFinish;
	@Column(name = "yd_unit", length = 45, nullable = true)
	private String ydUnit;
	@Column(name = "yd_program_finish",  nullable = true)
	private Boolean ydProgramFinish;
	@Column(name = "yd_program_time",  nullable = true)
	private Date ydProgramTime;
	@Column(name = "yd_finish",  nullable = true)
	private Boolean ydFinish;
	@Column(name = "yd_type", length = 45, nullable = true)
	private String ydType;
	@Column(name = "gd_no", length = 45, nullable = true)
	private String gdNo;
	@Column(name = "pt_install_finish",  nullable = true)
	private Boolean ptInstallFinish;
	@Column(name = "dh_unit", length = 45, nullable = true)
	private String dhUnit;
	@Column(name = "dh_finish",  nullable = true)
	private Boolean dhFinish;
	@Column(name = "memo", length = 200, nullable = true)
	private String memo;
	@Column(name = "total_finish",  nullable = true)
	private Boolean totalFinish;
	@Column(name = "delivery", length = 200, nullable = true)
	private String delivery;
	@Column(name = "kg_time",  nullable = true)
	private Date kgTime;
	
	@Column(name = "cid",  nullable = true)
	private Integer cid;
	private Contract contract;
	
	@Column(name = "ydid",  nullable = true)
	private Integer ydid;
	private YdReport ydReport;
	
	@Column(name = "tjid",  nullable = true)
	private Integer tjid;
	private TjReport tjReport;
	
	@Column(name = "towerid",  nullable = true)
	private Integer towerid;
	private TowerReport towerReport;
	
	@Column(name = "ptid",  nullable = true)
	private Integer ptid;
	private PtReport ptReport;

	public Integer getYdid() {
		return ydid;
	}
	public void setYdid(Integer ydid) {
		this.ydid = ydid;
	}
	public YdReport getYdReport() {
		return ydReport;
	}
	public void setYdReport(YdReport ydReport) {
		this.ydReport = ydReport;
	}
	public Integer getTjid() {
		return tjid;
	}
	public void setTjid(Integer tjid) {
		this.tjid = tjid;
	}
	public TjReport getTjReport() {
		return tjReport;
	}
	public void setTjReport(TjReport tjReport) {
		this.tjReport = tjReport;
	}
	public Integer getTowerid() {
		return towerid;
	}
	public void setTowerid(Integer towerid) {
		this.towerid = towerid;
	}
	public TowerReport getTowerReport() {
		return towerReport;
	}
	public void setTowerReport(TowerReport towerReport) {
		this.towerReport = towerReport;
	}
	public Integer getPtid() {
		return ptid;
	}
	public void setPtid(Integer ptid) {
		this.ptid = ptid;
	}
	public PtReport getPtReport() {
		return ptReport;
	}
	public void setPtReport(PtReport ptReport) {
		this.ptReport = ptReport;
	}
	public Integer getCid() {
		return cid;
	}
	public void setCid(Integer cid) {
		this.cid = cid;
	}
	public Contract getContract() {
		return contract;
	}
	public void setContract(Contract contract) {
		this.contract = contract;
	}

	@OneToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name="bp_id")
	private Blueprint blueprint = new Blueprint();
	public Blueprint getBlueprint() {
		return blueprint;
	}
	public void setBluePrint(Blueprint blueprint) {
		this.blueprint = blueprint;
	}
	
	private String bpRequirementNo;
 	
	public String getBpRequirementNo() {
		return bpRequirementNo;
	}
	public void setBpRequirementNo(String bpRequirementNo) {
		this.bpRequirementNo = bpRequirementNo;
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
	public String getProjectNo() {
		return projectNo;
	}
	public void setProjectNo(String projectNo) {
		this.projectNo = projectNo;
	}
	public String getStationNo() {
		return stationNo;
	}
	public void setStationNo(String stationNo) {
		this.stationNo = stationNo;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getAreaMgr() {
		return areaMgr;
	}
	public void setAreaMgr(String areaMgr) {
		this.areaMgr = areaMgr;
	}
	public String getProjectBatchNo() {
		return projectBatchNo;
	}
	public void setProjectBatchNo(String projectBatchNo) {
		this.projectBatchNo = projectBatchNo;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getXzType() {
		return xzType;
	}
	public void setXzType(String xzType) {
		this.xzType = xzType;
	}
	public String getXzName() {
		return xzName;
	}
	public void setXzName(String xzName) {
		this.xzName = xzName;
	}
	public Boolean getXzFinish() {
		return xzFinish;
	}
	public void setXzFinish(Boolean xzFinish) {
		this.xzFinish = xzFinish;
	}
	public Date getXzFinishTime() {
		return xzFinishTime;
	}
	public void setXzFinishTime(Date xzFinishTime) {
		this.xzFinishTime = xzFinishTime;
	}
	public String getDkUnit() {
		return dkUnit;
	}
	public void setDkUnit(String dkUnit) {
		this.dkUnit = dkUnit;
	}
	public Boolean getDkFinish() {
		return dkFinish;
	}
	public void setDkFinish(Boolean dkFinish) {
		this.dkFinish = dkFinish;
	}
	public String getSjUnit() {
		return sjUnit;
	}
	public void setSjUnit(String sjUnit) {
		this.sjUnit = sjUnit;
	}
	public Boolean getSjFinish() {
		return sjFinish;
	}
	public void setSjFinish(Boolean sjFinish) {
		this.sjFinish = sjFinish;
	}
	public String getTjsgUnit() {
		return tjsgUnit;
	}
	public void setTjsgUnit(String tjsgUnit) {
		this.tjsgUnit = tjsgUnit;
	}
	public Boolean getTjsgIn() {
		return tjsgIn;
	}
	public void setTjsgIn(Boolean tjsgIn) {
		this.tjsgIn = tjsgIn;
	}
	public Boolean getJcFinish() {
		return jcFinish;
	}
	public void setJcFinish(Boolean jcFinish) {
		this.jcFinish = jcFinish;
	}
	public Date getJcFinishTime() {
		return jcFinishTime;
	}
	public void setJcFinishTime(Date jcFinishTime) {
		this.jcFinishTime = jcFinishTime;
	}
	public String getTowerUnit() {
		return towerUnit;
	}
	public void setTowerUnit(String towerUnit) {
		this.towerUnit = towerUnit;
	}
	public Boolean getTowerFinish() {
		return towerFinish;
	}
	public void setTowerFinish(Boolean towerFinish) {
		this.towerFinish = towerFinish;
	}
	public Date getTowerFinishTime() {
		return towerFinishTime;
	}
	public void setTowerFinishTime(Date towerFinishTime) {
		this.towerFinishTime = towerFinishTime;
	}
	public String getTowerType() {
		return towerType;
	}
	public void setTowerType(String towerType) {
		this.towerType = towerType;
	}
	public String getTowerHeight() {
		return towerHeight;
	}
	public void setTowerHeight(String towerHeight) {
		this.towerHeight = towerHeight;
	}
	public String getYdsjUnit() {
		return ydsjUnit;
	}
	public void setYdsjUnit(String ydsjUnit) {
		this.ydsjUnit = ydsjUnit;
	}
	public Boolean getYdsjFinish() {
		return ydsjFinish;
	}
	public void setYdsjFinish(Boolean ydsjFinish) {
		this.ydsjFinish = ydsjFinish;
	}
	public String getYdUnit() {
		return ydUnit;
	}
	public void setYdUnit(String ydUnit) {
		this.ydUnit = ydUnit;
	}
	public Boolean getYdProgramFinish() {
		return ydProgramFinish;
	}
	public void setYdProgramFinish(Boolean ydProgramFinish) {
		this.ydProgramFinish = ydProgramFinish;
	}
	public Date getYdProgramTime() {
		return ydProgramTime;
	}
	public void setYdProgramTime(Date ydProgramTime) {
		this.ydProgramTime = ydProgramTime;
	}
	public Boolean getYdFinish() {
		return ydFinish;
	}
	public void setYdFinish(Boolean ydFinish) {
		this.ydFinish = ydFinish;
	}
	public String getYdType() {
		return ydType;
	}
	public void setYdType(String ydType) {
		this.ydType = ydType;
	}
	public String getGdNo() {
		return gdNo;
	}
	public void setGdNo(String gdNo) {
		this.gdNo = gdNo;
	}
	public Boolean getPtInstallFinish() {
		return ptInstallFinish;
	}
	public void setPtInstallFinish(Boolean ptInstallFinish) {
		this.ptInstallFinish = ptInstallFinish;
	}
	public String getDhUnit() {
		return dhUnit;
	}
	public void setDhUnit(String dhUnit) {
		this.dhUnit = dhUnit;
	}
	public Boolean getDhFinish() {
		return dhFinish;
	}
	public void setDhFinish(Boolean dhFinish) {
		this.dhFinish = dhFinish;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public Boolean getTotalFinish() {
		return totalFinish;
	}
	public void setTotalFinish(Boolean totalFinish) {
		this.totalFinish = totalFinish;
	}
	public String getDelivery() {
		return delivery;
	}
	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}
	public Date getKgTime() {
		return kgTime;
	}
	public void setKgTime(Date kgTime) {
		this.kgTime = kgTime;
	}	
}
