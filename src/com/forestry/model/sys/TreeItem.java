package com.forestry.model.sys;

import java.util.ArrayList;

public class TreeItem {
	private Integer id;
	private TreeItem parent;
	private TreeItem bigIcon;
	private TreeItem plugin;
	private Integer orderno;
	private String name;
	private Integer parentId;
	private TreeItem menuIcon;
	private Boolean enabled;
	private String code;
	private String url;
	private Boolean leaf;
	private Boolean expanded;
	private Boolean inframe;
	private ArrayList children;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public TreeItem getParent() {
		return parent;
	}
	public void setParent(TreeItem parent) {
		this.parent = parent;
	}
	public TreeItem getBigIcon() {
		return bigIcon;
	}
	public void setBigIcon(TreeItem bigIcon) {
		this.bigIcon = bigIcon;
	}
	public TreeItem getPlugin() {
		return plugin;
	}
	public void setPlugin(TreeItem plugin) {
		this.plugin = plugin;
	}
	public Integer getOrderno() {
		return orderno;
	}
	public void setOrderno(Integer orderno) {
		this.orderno = orderno;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public TreeItem getMenuIcon() {
		return menuIcon;
	}
	public void setMenuIcon(TreeItem menuIcon) {
		this.menuIcon = menuIcon;
	}
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Boolean getLeaf() {
		return leaf;
	}
	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}
	public Boolean getExpanded() {
		return expanded;
	}
	public void setExpanded(Boolean expanded) {
		this.expanded = expanded;
	}
	public Boolean getInframe() {
		return inframe;
	}
	public void setInframe(Boolean inframe) {
		this.inframe = inframe;
	}
	public ArrayList getChildren() {
		return children;
	}
	public void setChildren(ArrayList children) {
		this.children = children;
	}
	
	/*
    "parent": null,
    "bigIcon": null,
    "plugin": null,
    "orderno": 1000,
    "name": "进度管理",
    "parentId": null,
    "menuIcon": null,
    "enabled": true,
    "code": "progress",
    "url": "",
    "leaf": false,
    "expanded": true,
    "inframe": false,
    "children":
    */
}
