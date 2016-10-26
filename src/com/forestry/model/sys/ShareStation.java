package com.forestry.model.sys;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.ShareStationParameter;
@Entity
@Table(name = "sharestation")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)

public class ShareStation extends ShareStationParameter {

	/**
	 * 
	 */
	private static final long serialVersionUID = 602266641940866296L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id; // ID
	@Column(name = "project_no", length = 45, nullable = true)
	private String projectNo; 
	@Column(name = "station_name", length = 45, nullable = true)
	private String stationName;
	@Column(name = "share_station_name", length = 45, nullable = true)
	private String shareStationName;
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
	@Column(name = "belong_to", length = 45, nullable = true)
	private String belongTo;
	@Column(name = "gz_finish",  nullable = true)
	private Boolean gzFinish;
	@Column(name = "yd_finish",  nullable = true)
	private Boolean ydFinish;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getProjectNo() {
		return projectNo;
	}
	public void setProjectNo(String projectNo) {
		this.projectNo = projectNo;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public String getShareStationName() {
		return shareStationName;
	}
	public void setShareStationName(String shareStationName) {
		this.shareStationName = shareStationName;
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
	public String getBelongTo() {
		return belongTo;
	}
	public void setBelongTo(String belongTo) {
		this.belongTo = belongTo;
	}
	public Boolean getGzFinish() {
		return gzFinish;
	}
	public void setGzFinish(Boolean gzFinish) {
		this.gzFinish = gzFinish;
	}
	public Boolean getYdFinish() {
		return ydFinish;
	}
	public void setYdFinish(Boolean ydFinish) {
		this.ydFinish = ydFinish;
	}
	
}
