package com.forestry.model.sys;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.BlueprintParameter;

@Entity
@Table(name = "blueprint")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)

public class Blueprint extends BlueprintParameter {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8473303679316208316L;
	@Id
	@Column(name = "id")
	@GeneratedValue
	private Integer id; // ID
	@Column(name = "requirement_no", length = 45, nullable = false)
	private String requirementNo; 
	@Column(name = "dk_report", length = 256, nullable = false)
	private String dkReport;
	@Column(name = "tj_design", length = 256, nullable = false)
	private String tjDesign;
	@Column(name = "wx_design", length = 256, nullable = false)
	private String wxDesign;
	@Column(name = "tower_design", length = 256, nullable = false)
	private String towerDesign;
	@Column(name = "yd_design", length = 256, nullable = false)
	private String ydDesign;
	@OneToOne(mappedBy="blueprint")
	/*private BaseStation baseStation;
	public BaseStation getBaseStation() {
		return baseStation;
	}*/
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
	public String getDkReport() {
		return dkReport;
	}
	public void setDkReport(String dkReport) {
		this.dkReport = dkReport;
	}
	public String getTjDesign() {
		return tjDesign;
	}
	public void setTjDesign(String tjDesign) {
		this.tjDesign = tjDesign;
	}
	public String getWxDesign() {
		return wxDesign;
	}
	public void setWxDesign(String wxDesign) {
		this.wxDesign = wxDesign;
	}
	public String getTowerDesign() {
		return towerDesign;
	}
	public void setTowerDesign(String towerDesign) {
		this.towerDesign = towerDesign;
	}
	public String getYdDesign() {
		return ydDesign;
	}
	public void setYdDesign(String ydDesign) {
		this.ydDesign = ydDesign;
	}	
}
