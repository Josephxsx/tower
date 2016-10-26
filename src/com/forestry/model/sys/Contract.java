package com.forestry.model.sys;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.forestry.model.sys.param.ContractParameter;

@Entity
@Table(name = "contract")
@Cache(region = "all", usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contract extends ContractParameter{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7838773134859148846L;
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id; // ID
	@Column(name = "requirement_no", length = 45, nullable = false)
	private String requirementNo; 
	@Column(name = "receive_date", nullable = false)
	private Date receiveDate;
	@Column(name = "value")
	private Integer value; 
	@Column(name = "owner", length = 256, nullable = false)
	private String owner; 
	@Column(name = "period", length = 256, nullable = false)
	private String period;
	@Column(name = "sign_unit", length = 256, nullable = false)
	private String signUnit; 
	@Column(name = "name", length = 45, nullable = false)
	private String name; 
	@Column(name = "sign_name", length = 45, nullable = false)
	private String signName; 
	@Column(name = "is_import",  nullable = true)
	private Boolean isImport;
	@Column(name = "is_archive",  nullable = true)
	private Boolean isArchive;
	@Column(name = "memo", length = 256, nullable = true)
	private String memo;
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
	public Date getReceiveDate() {
		return receiveDate;
	}
	public void setReceiveDate(Date receiveDate) {
		this.receiveDate = receiveDate;
	}
	public Integer getValue() {
		return value;
	}
	public void setValue(Integer value) {
		this.value = value;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getSignUnit() {
		return signUnit;
	}
	public void setSignUnit(String signUnit) {
		this.signUnit = signUnit;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSignName() {
		return signName;
	}
	public void setSignName(String signName) {
		this.signName = signName;
	}
	public Boolean getIsImport() {
		return isImport;
	}
	public void setIsImport(Boolean isImport) {
		this.isImport = isImport;
	}
	public Boolean getIsArchive() {
		return isArchive;
	}
	public void setIsArchive(Boolean isArchive) {
		this.isArchive = isArchive;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	} 
}
