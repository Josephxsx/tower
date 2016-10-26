<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
<title>全流程进度管理系统</title>
<link rel="stylesheet" href="/towerprog/assets/app-2bc226cb76907953613d3daaf02002c5.css"/>
<script src="/towerprog/assets/app-18a1989b7efb080f4ea2390a5eeeffa2.js" type="text/javascript" ></script>

</head>
<body>
<script language="javascript" type="text/javascript">
Ext.onReady(function(contextOptions,contextOwner){
    Wb.ns("sys.home");
    var app = sys.home;
    app.contextOwner = contextOwner;
    window.app = app;
    Wb.init({
        zo: -1
    });
    app.searchBar = app._searchBar = {
        appScope: app,
        xtype: "toolbar",
        hidden: true,
        itemId: "searchBar",
        items: [{
            appScope: app,
            xtype: "combo",
            displayField: "title",
            enterKeyTriggerClick: true,
            triggerCls: "x-form-search-trigger",
            valueField: "fullPath",
            listConfig: {
                itemTpl: [
                    '<div>{fullPath}</div>'
                ]
            },
            itemId: "combo",
            flex: 1,
            onTriggerClick: function(e) {
                app.tree.selectPath('/Root/' + this.getValue(), 'text');
            },
            listeners: {
                beforequery: function(plan, options) {
                    if (plan.query.indexOf('/') != -1 || plan.query.indexOf('\\') != -1) {
                        plan.combo.collapse();
                        return false;
                    }
                },
                select: function(combo, records, options) {
                    combo.onTriggerClick();
                }
            },
            store: {
                appScope: app,
                url: "m?xwl=sys/portal/home/find",
                fields: ['path', 'title', {
                    name: 'fullPath',
                    convert: function(v, rec) {
                        var data = rec.data;
                        if (data.path)
                            return data.path.substring(1) + '/' + data.title;
                        else return data.title;
                    }
                }]
            }
        }]
    };
    app.viewport1 = app._viewport1 = new Ext.container.Viewport({
        appScope: app,
        layout: "border",
        itemId: "viewport1",
        listeners: {
            afterrender: function(viewport, options) {
                Wb.setNavigate(app.tab, app.backBtn, app.forwardBtn);


                //Wb.open({url: 'm?xwl=progress/update', title: '进度更新', iconCls: 'level_up_icon'});
            }
        },
        items: [{
            appScope: app,
            xtype: "toolbar",
            region: "north",
            enableOverflow: true,
            itemId: "toolbar1",
            border: false,
            items: [
                " ", {
                    appScope: app,
                    xtype: "label",
                    text: "全流程进度管理系统",
                    itemId: "titleLabel"
                },
                " ", {
                    appScope: app,
                    text: "系统管理员",
                    glyph: 0xf007,
                    itemId: "userBtn"
                    // listeners: {
                    //     click: function(item, e, options) {
                    //         Wb.run({
                    //             url: 'account'
                    //         });
                    //     }
                    // }
                }, {
                    appScope: app,
                    xtype: "label",
                    itemId: "msgLabel",
                    flex: 1
                }, {
                    appScope: app,
                    glyph: 0xf060,
                    itemId: "backBtn",
                    tooltip: Str.back
                }, {
                    appScope: app,
                    glyph: 0xf061,
                    itemId: "forwardBtn",
                    tooltip: Str.forward
                }, {
                    appScope: app,
                    glyph: 0xf021,
                    overflowText: Str.refreshPage,
                    itemId: "refreshPageBtn",
                    tooltip: Str.refreshPage,
                    listeners: {
                        click: function(item, e, options) {
                            var card = app.tab.getActiveTab();
                            if (card) {
                                Wb.open({
                                    reloadCard: card
                                });
                            }
                        }
                    }
                }, {
                    appScope: app,
                    glyph: 0xf16a,
                    overflowText: Str.refreshApps,
                    itemId: "refreshModulesBtn",
                    tooltip: Str.refreshApps,
                    listeners: {
                        click: function(item, e, options) {
                            Wb.reload(app.tree);
                        }
                    }
                }, {
                    appScope: app,
                    glyph: 0xf002,
                    overflowText: Str.find,
                    itemId: "findModuleBtn",
                    tooltip: Str.find,
                    listeners: {
                        click: function(item, e, options) {
                            app.searchBar.setVisible(app.searchBar.hidden);
                            app.combo.focus(false, true);
                        }
                    }
                }, {
                    appScope: app,
                    glyph: 0xf0c7,
                    overflowText: Str.saveDesktop,
                    itemId: "saveBtn",
                    tooltip: Str.saveDesktop,
                    listeners: {
                        click: function(item, e, options) {
                            var pages = [],
                                activePage = app.tab.getActiveTab();
                            app.tab.items.each(function(item) {
                                pages.push({
                                    url: item.bindFile,
                                    params: item.lastPortalConfigs.params
                                });
                            });
                            Wb.request({
                                url: 'm?xwl=sys/portal/home/save-desktop',
                                params: {
                                    treeWidth: app.tree.getWidth(),
                                    treeCollapsed: app.tree.collapsed,
                                    pages: pages,
                                    active: app.tab.items.indexOf(activePage)
                                },
                                success: function(resp) {
                                    app.saveBtn.el.highlight();
                                }
                            });
                        }
                    }
                },
                "-", {
                    appScope: app,
                    glyph: 0xf1fc,
                    overflowText: Str.theme,
                    itemId: "themeMenu",
                    tooltip: Str.theme,
                    listeners: {
                        menushow: function(item, menu, options) {
                            app[Wb.theme + 'Item'].setChecked(true);
                        }
                    },
                    menu: {
                        listeners: {
                            click: function(menu, item, e, options) {
                                var theme = item.itemId.slice(0, -4);
                                Wb.request({
                                    url: 'm?xwl=sys/portal/home/set-theme',
                                    params: {
                                        theme: theme
                                    },
                                    success: function() {
                                        Wb.confirm(Str.refreshWindow, function() {
                                            location.reload();
                                        });
                                    }
                                });
                            }
                        },
                        items: [{
                            appScope: app,
                            text: Str.classic,
                            itemId: "classicItem",
                            group: "theme",
                            checked: true
                        }, {
                            appScope: app,
                            text: Str.gray,
                            itemId: "grayItem",
                            group: "theme",
                            checked: false
                        }, {
                            appScope: app,
                            text: Str.neptune,
                            itemId: "neptuneItem",
                            group: "theme",
                            checked: false
                        }]
                    }
                }, {
                    appScope: app,
                    glyph: 0xf022,
                    overflowText: Str.close,
                    itemId: "closeMeu",
                    tooltip: Str.close,
                    menu: {
                        items: [{
                            appScope: app,
                            text: Str.close,
                            itemId: "closeCurrentItem",
                            listeners: {
                                click: function(item, e, options) {
                                    Wb.close();
                                }
                            }
                        }, {
                            appScope: app,
                            text: Str.closeOthers,
                            itemId: "closeOthersItem",
                            listeners: {
                                click: function(item, e, options) {
                                    Wb.close(false);
                                }
                            }
                        }, {
                            appScope: app,
                            text: Str.closeAll,
                            itemId: "closeAllItem",
                            listeners: {
                                click: function(item, e, options) {
                                    Wb.close(true);
                                }
                            }
                        }]
                    }
                }, {
                    appScope: app,
                    glyph: 0xf17a,
                    overflowText: Str.currentModuleList,
                    itemId: "winmenu",
                    tooltip: Str.currentModuleList,
                    menu: {
                        listeners: {
                            click: function(menu, item, e, options) {
                                if (item.cardId)
                                    app.tab.setActiveTab(Ext.getCmp(item.cardId));
                            },
                            beforeshow: function(menu, options) {
                                var items = [];
                                app.tab.items.each(function(card) {
                                    items.push({
                                        iconCls: card.iconCls,
                                        icon: card.icon,
                                        text: card.title,
                                        cardId: card.id,
                                        tooltip: card.title == card.tab.tooltip ? '' : card.tab.tooltip
                                    });
                                });
                                menu.removeAll(true);
                                if (items.length === 0)
                                    items.push({
                                        text: Str.emptyHint
                                    });
                                Wb.sort(items, 'text');
                                menu.add(items);
                            }
                        },
                        items: [{
                            appScope: app,
                            itemId: "item1"
                        }]
                    }
                },
                "-", {
                    appScope: app,
                    overflowText: Str.logout,
                    itemId: "logoutBtn",
                    iconCls: "logout_icon",
                    tooltip: Str.logout,
                    listeners: {
                        click: function(item, e, options) {
                            Wb.request({
                                url: ctxPath +'/login/logout',
                                success: function(resp) {
                                    window.location.replace(ctxPath +'/login/index');
                                }
                            });
                        }
                    }
                }
            ]
        }, {
            appScope: app,
            xtype: "treepanel",
            region: "west",
            rootVisible: false,
            tbar: app.searchBar,
            collapsible: true,
            width: 200,
            split: true,
            itemId: "tree",
            displayField: "name",
            header: false,
            collapsed: false,
            listeners: {
                itemclick: function(view, record, item, index, e, options) {
                    if (record.isLeaf()) {
                        var data = record.data,
                            pageLink = {
                                url: ctxPath +'/page/'+data.code,
                                title: data.name,
                                iconCls: data.iconCls,
                                useIFrame: data.inframe
                            };
                        if (data.pageLink) {
                            Ext.apply(pageLink, Wb.decode(data.pageLink)); //使用自定义的配置覆盖系统默认配置
                        }
                        Wb.open(pageLink);
                    } else {
                        if (record.isExpanded())
                            record.collapse();
                        else record.expand();
                    }
                },
                itemkeydown: Wb.mimicClick
            },
            store: {
                appScope: app,
                url: ctxPath +"/main/moduleTreedata",
                fields: ['name', 'code', 'url', 'inframe', 'pageLink'],
                listeners: {
                    load: function(store, node, records, successful, options) {
                        // app.tree.selectPath('progress/importjz.xwl', 'progress', '/root');
                    },
                    beforeload: function(store, operation, options) {
                        operation.params.path = operation.node.data.path;
                    }
                }
            }
        }, {
            appScope: app,
            xtype: "tabpanel",
            bodyStyle: "background-color:#787878;",
            region: "center",
            plugins: 'tabreorderer',
            itemId: "tab",
            listeners: {
                afterrender: function(tab, options) {
                    tab.mon(tab.tabBar.el, 'dblclick', function() {
                        var card = tab.getActiveTab(),
                            url = card.bindFile;
                        if (!card.hasParams) {
                            if (Ext.String.endsWith(url, '.xwl'))
                                url = 'm?xwl=' + url.slice(0, -4);
                            window.open(url);
                        }
                    }, tab);
                    var card, tabItems = "[]";
                    if (tabItems) {
                        tabItems = Wb.decode(tabItems);
                        if (tabItems.length) {
                            Wb.each(tabItems, function(item) {
                                card = Wb.open(Wb.apply(item, {
                                    frameOnly: true,
                                    notActiveCard: true
                                }));
                                card.notLoaded = true;
                            });
                            app.tab.setActiveTab(parseInt('0', 10));
                        }
                    }
                },
                tabchange: function(tab, newCard, oldCard, options) {
                    if (newCard && newCard.notLoaded) {
                        newCard.notLoaded = false;
                        Wb.open({
                            reloadCard: newCard,
                            frameOnly: false,
                            notActiveCard: false
                        });
                    }
                }
            }
        }]
    });
});
</script>
</body>
</html>