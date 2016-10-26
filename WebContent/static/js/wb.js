var Wb = {
    dateFormat: "Y-m-d H:i:s.u",
    nullImage: "wb/images/null.gif",
    maxInt: 2147483647,
    encode: window.Ext ? Ext.encode: null,
    decode: window.Ext ? Ext.decode: null,
    apply: window.Ext ? Ext.apply: null,
    applyIf: window.Ext ? Ext.applyIf: null,
    promptWindows: {},
    toString: function(e) {
        return Object.prototype.toString.call(e)
    },
    each: function(e, t, n) {
        if (Wb.toString(e) === "[object Array]") {
            var r, i = e.length;
            if (n !== true) {
                for (r = 0; r < i; r++) {
                    if (t(e[r], r) === false) {
                        return r
                    }
                }
            } else {
                for (r = i - 1; r > -1; r--) {
                    if (t(e[r], r) === false) {
                        return r
                    }
                }
            }
        } else {
            var s;
            for (s in e) {
                if (e.hasOwnProperty(s)) {
                    if (t(s, e[s]) === false) {
                        return false
                    }
                }
            }
        }
        return true
    },
    indexOf: function(e, t) {
        if (!e) return - 1;
        var n, r;
        r = e.length;
        for (n = 0; n < r; n++) if (e[n] === t) return n;
        return - 1
    },
    propVal: function(e, t, n) {
        if (typeof n == "undefined") n = null;
        t = t.split(".");
        for (var r = 0; r < t.length; r++) {
            if (typeof e[t[r]] == "undefined") return n;
            e = e[t[r]]
        }
        return e
    },
    dom: function(e) {
        return document.getElementById(e)
    },
    emptyFn: function() {},
    isEmpty: function(e) {
        return e === null || e === undefined || e.length === 0
    },
    init: function(e) {
        Wb.defineConsoleMethods();
        Wb.maskTimeout = e.mask === undefined ? 1500 : e.mask;
        if (e.zo == -1) Wb.zoneOffset = -1;
        else Wb.zoneOffset = -e.zo - (new Date).getTimezoneOffset();
        Wb.theme = e.theme || "classic";
        Wb.editTheme = e.editTheme || "default";
        Wb.isNeptune = Wb.theme == "neptune";
        if (window.Ext) {
            Ext.setGlyphFontFamily("FontAwesome");
            Ext.QuickTips.init();
            if (e.timeout !== undefined) {
                Ext.Ajax.timeout = e.timeout;
                Ext.data.Connection.prototype.timeout = e.timeout;
                Ext.data.proxy.Server.prototype.timeout = e.timeout;
                Ext.data.JsonP.timeout = e.timeout;
                Ext.form.Basic.prototype.timeout = Math.round(e.timeout / 1e3)
            }
            Ext.getDoc().on("keydown",
            function(e, t) {
                if (e.getKey() == e.BACKSPACE && (!Wb.isEditor(t) || t.disabled || t.readOnly)) e.stopEvent()
            });
            window.onbeforeunload = function() {
                if (Wb.unloadEvents) {
                    var e, t, n = 0;
                    Wb.each(Wb.unloadEvents,
                    function(r, i) {
                        t = i();
                        if (Wb.isValue(t)) {
                            if (n === 0) e = t;
                            n++
                        }
                    });
                    if (n == 1) return e;
                    else if (n > 1) return Wb.format(Str.itemsInfo, e, n)
                }
            }
        }
    },
    defineConsoleMethods: function() {
        window.Cs = {
            info: function() {
                if (window.console && console.info) console.info.apply(console, arguments)
            },
            warn: function() {
                if (window.console && console.warn) console.warn.apply(console, arguments)
            },
            error: function() {
                if (window.console && console.error) console.error.apply(console, arguments)
            },
            log: function() {
                if (window.console && console.log) console.log.apply(console, arguments)
            }
        }
    },
    request: function(e) {
        var t, n, r = Wb.getBool(e.showMask, true),
        i = e.success,
        s = e.failure;
        n = Ext.apply({},
        e.params, Wb.getValue(e.out));
        if (!Ext.Object.isEmpty(n)) e.params = n;
        t = Ext.applyIf({
            success: function() {
                if (r) Wb.unmask(t.mask, t.message);
                Ext.callback(i, t.scope, arguments)
            },
            failure: function(e) {
                if (r) Wb.unmask(t.mask, t.message);
                if (Wb.getBool(t.showError, true)) Wb.except(e);
                Ext.callback(s, t.scope, arguments)
            }
        },
        e);
        if (r) Wb.mask(t.mask, t.message);
        return Ext.Ajax.request(t)
    },
    toLocal: function(e) {
        if (Wb.zoneOffset != -1 && e) return Ext.Date.add(e, Ext.Date.MINUTE, Wb.zoneOffset);
        else return e
    },
    showIconMessage: function(e, t, n, r, i) {
        if (Ext.isString(t)) {
            t = Ext.String.ellipsis(t, 3e3);
            t = t.replace(/([^<]\/)|(\\)/g, "$&<wbr>")
        }
        return Ext.Msg.show({
            title: e,
            msg: t,
            buttons: Ext.Msg.OK,
            fn: n,
            icon: i,
            animateTarget: r
        })
    },
    info: function(e, t, n) {
        return Wb.showIconMessage(Str.information, e, t, n, Ext.Msg.INFO)
    },
    warn: function(e, t, n) {
        return Wb.showIconMessage(Str.warning, e, t, n, Ext.Msg.WARNING)
    },
    error: function(e, t, n) {
        return Wb.showIconMessage(Str.error, e, t, n, Ext.Msg.ERROR)
    },
    except: function(e, t, n) {
        var r, i;
        if (e instanceof Ext.form.action.Submit) {
            switch (e.failureType) {
            case "client":
                r = Str.clientInvalid;
                break;
            case "connect":
                r = Str.connectFailure;
                break;
            case "load":
                r = Str.loadFailure;
                break;
            default:
                i = e.result ? e.result.value: null;
                if (Ext.String.startsWith(i, "$WBE201")) {
                    Wb.login();
                    return
                } else if (Ext.String.startsWith(i, "$WBE202")) {
                    Wb.login(true);
                    return
                } else {
                    if (i) r = i;
                    else r = e.response.responseText || Str.unknowError
                }
            }
        } else {
            i = e.responseText;
            switch (e.status) {
            case 0:
                r = Str.serverNotResp;
                break;
            case 400:
                r = Str.e400;
                break;
            case 401:
                Wb.login(i && i.indexOf("verify") != -1);
                return;
            case 403:
                r = Str.e403;
                break;
            case 404:
                r = Str.e404;
                break;
            default:
                r = i || Str.unknowError
            }
        }
        return Wb.error(r, t, n)
    },
    confirm: function(e, t, n) {
        return Ext.Msg.show({
            title: Str.confirm,
            msg: e,
            buttons: Ext.Msg.OKCANCEL,
            fn: function(e) {
                var n, r;
                if (Ext.isArray(t)) {
                    n = t[0];
                    if (t.length > 1) r = t[1]
                } else n = t;
                if (e == "ok") n();
                else if (r) r()
            },
            icon: Ext.Msg.QUESTION,
            animateTarget: n
        })
    },
    confirmDo: function(e, t, n, r, i) {
        if (!Ext.isArray(e)) {
            e = e ? [e] : []
        }
        var s, o, u = e.length;
        if (!r) r = Str.del;
        if (u === 0) {
            Wb.warn(Wb.format(Str.selectRecord, r));
            return null
        } else {
            o = e[0];
            if (!n) n = o.fields.items[0].name;
            if (u == 1) {
                s = Wb.format(Str.singleConfirm, r, Wb.propVal(o.data, n))
            } else {
                s = Wb.format(Str.manyConfirm, r, Wb.propVal(o.data, n), u)
            }
            return Wb.confirm(s, t, i)
        }
    },
    choose: function(e, t, n) {
        return Ext.Msg.show({
            title: Str.confirm,
            msg: e,
            buttons: Ext.Msg.YESNOCANCEL,
            fn: t,
            icon: Ext.MessageBox.QUESTION,
            animateTarget: n
        })
    },
    login: function(e) {
        if (window.top != window && window.top.Wb) {
            window.top.Wb.login(e);
            return
        }
        if (Wb.loginWin) Wb.loginWin.show();
        var t, n = {
            changeVC: function() {
                n.verifyImage.setSrc("m?xwl=sys/session/get-verify-image&" + Wb.getId())
            }
        };
        Wb.loginWin = t = new Ext.window.Window({
            title: "登录",
            height: 240,
            width: 448,
            layout: "absolute",
            modal: true,
            iconCls: "key_icon",
            minButtonWidth: 88,
            buttonAlign: "center",
            resizable: false,
            autoShow: true,
            onEnter: function() {
                if (!Wb.verify(t)) return;
                Wb.request({
                    url: "m?xwl=sys/session/verify",
                    out: t,
                    message: Str.processLogin,
                    showError: false,
                    success: function(e) {
                        if (n.saveNameCheck.getValue()) Wb.setCookie("sys.username", n.username.getValue());
                        t.close()
                    },
                    failure: function(t) {
                        if (e) n.changeVC();
                        Wb.except(t,
                        function() {
                            var e = t.responseText;
                            switch (e) {
                            case Str.vcInvalid:
                            case Str.vcExpired:
                                if (!n.verifyCode.hidden) n.verifyCode.focus(true, true);
                                break;
                            case Str.passwordInvalid:
                                n.password.focus(true, true);
                                break;
                            default:
                                n.username.focus(true, true);
                                break
                            }
                        })
                    }
                })
            },
            buttons: [{
                text: Str.login,
                iconCls: "accept_icon",
                handler: function() {
                    t.onEnter()
                }
            },
            {
                text: Str.reset,
                iconCls: "refresh_icon",
                handler: function() {
                    Wb.reset(t)
                }
            }],
            listeners: {
                destroy: function() {
                    delete Wb.loginWin
                },
                show: function() {
                    var e = Wb.getCookie("sys.username");
                    n.saveNameCheck.setValue( !! e);
                    if (Wb.isEmpty(e)) n.username.focus(false, 20);
                    else {
                        n.username.setValue(e);
                        n.password.focus(false, 20)
                    }
                },
                beforerender: function(t) {
                    Wb.getRefer(t, n);
                    if (e) n.verifyImage.src = "m?xwl=sys/session/get-verify-image";
                    else {
                        n.username.y += 10;
                        n.password.y += 20;
                        n.verifyCode.hidden = true;
                        n.verifyImage.hidden = true
                    }
                }
            },
            items: [{
                xtype: "textfield",
                allowBlank: false,
                fieldStyle: "padding-left:28px;background-image:url(assets/images/app/user.gif);background-repeat:no-repeat;background-position:left center;",
                labelAlign: "right",
                itemId: "username",
                fieldLabel: Str.username,
                x: 16,
                y: 32,
                width: 296
            },
            {
                xtype: "textfield",
                allowBlank: false,
                fieldStyle: "padding-left:28px;background-image:url(assets/images/app/password.gif);background-repeat:no-repeat;background-position:left center;",
                labelAlign: "right",
                itemId: "password",
                inputType: "password",
                fieldLabel: Str.password,
                x: 16,
                y: 64,
                width: 296
            },
            {
                xtype: "textfield",
                allowBlank: false,
                fieldStyle: "padding-left:28px;background-image:url(assets/images/app/check.gif);background-repeat:no-repeat;background-position:left center;",
                labelAlign: "right",
                itemId: "verifyCode",
                fieldLabel: Str.verifyCode,
                x: 16,
                y: 96,
                width: 200
            },
            {
                xtype: "image",
                title: Str.clickChangeVC,
                style: "cursor:pointer;",
                alt: Str.verifyCode,
                itemId: "verifyImage",
                x: 222,
                y: 97,
                width: 90,
                height: 20,
                listeners: {
                    afterrender: {
                        single: true,
                        fn: function(e) {
                            e.mon(e.el, "click",
                            function() {
                                n.changeVC();
                                n.verifyCode.focus(true, true)
                            })
                        }
                    }
                }
            },
            {
                xtype: "image",
                src: "assets/images/app/login.gif",
                x: 328,
                y: 20,
                width: 95,
                height: 122
            },
            {
                xtype: "checkbox",
                itemId: "saveNameCheck",
                boxLabel: Str.saveUserName,
                x: 120,
                y: 128,
                width: 192,
                listeners: {
                    change: function(e, t) {
                        if (!t) Ext.util.Cookies.clear("sys.username")
                    }
                }
            }]
        })
    },
    mask: function(e, t) {
        var n, r = Ext.getBody();
        if (Ext.isFunction(e)) e = e();
        if (!e) e = r;
        if (!Wb.isValue(t)) t = Str.processing;
        if (!e.maskMsgs) e.maskMsgs = [];
        e.maskMsgs.push(t);
        e.mask(Ext.Array.unique(e.maskMsgs).join("<br>"), null, null, Wb.maskTimeout);
        if (e == r) {
            n = (r.$cache || r.getCache()).data;
            if (n.maskShimEl) n.maskShimEl.setStyle("zIndex", 90001);
            if (n.maskEl) n.maskEl.setStyle("zIndex", 90001);
            if (n.maskMsg) n.maskMsg.setStyle("zIndex", 90001)
        }
    },
    unmask: function(e, t) {
        var n, r;
        if (e) {
            if (Ext.isFunction(e)) e = e()
        } else e = Ext.getBody();
        if (!Wb.isValue(t)) t = Str.processing;
        r = e.maskMsgs;
        if (r && r.length > 0) {
            n = r.length;
            Ext.Array.remove(r, t);
            if (r.length === n) throw new Error('The component has no mask with message "' + t + '".');
            if (r.length === 0) e.unmask();
            else e.mask(Ext.Array.unique(r).join("<br>"), null, null, Wb.maskTimeout)
        } else throw new Error("The component has no mask.")
    },
    equals: function(e, t) {
        if (!e) e = "";
        if (!t) t = "";
        return e == t
    },
    uniqueName: function(e, t) {
        var n = t,
        r = 1;
        while (n in e) n = t + r++;
        return n
    },
    getFileSize: function(e) {
        if (e >= 1048576) return Wb.format(e / 1048576, "0,000.#") + " MB";
        else return Wb.format(Math.ceil(e / 1024), "0,000") + " KB"
    },
    getNode: function(e, t) {
        if (t === undefined) t = 0;
        while (e && e.getDepth() > t) {
            e = e.parentNode
        }
        return e
    },
    turnTab: function(e) {
        var t = e,
        n = t,
        r = [];
        Ext.suspendLayouts();
        try {
            while (t = t.ownerCt) {
                if (t instanceof Ext.tab.Panel) r.push(n);
                n = t
            }
            while (t = r.pop()) {
                t.ownerCt.setActiveTab(t)
            }
        } finally {
            Ext.resumeLayouts(true)
        }
    },
    prompt: function(e) {
        function t() {
            if (!Wb.promptPickList) Wb.promptPickList = {};
            if (!Wb.promptSaveList) Wb.promptSaveList = {};
            o.queryBy(function(e) {
                var t = e.pickKeyname,
                n, r, i;
                if (e.saveKeyname) Wb.promptSaveList[e.saveKeyname] = e.getValue();
                if (t && e instanceof Ext.form.field.ComboBox) {
                    n = Wb.promptPickList[t];
                    r = e.getValue();
                    if (Wb.isEmpty(r)) return;
                    if (!n) {
                        Wb.promptPickList[t] = [r];
                        e.store.add({
                            field1: r,
                            field2: r
                        })
                    } else {
                        i = Wb.indexOf(n, r);
                        if (i != -1) {
                            n.splice(i, 1);
                            e.store.removeAt(i)
                        }
                        n.unshift(r);
                        e.store.insert(0, {
                            field1: r,
                            field2: r
                        })
                    }
                }
                return false
            })
        }
        function n(e, t) {
            var n;
            if (e.items.getCount() > 0 && t !== null) {
                if (t) e.down("#" + t).focus(true, true);
                else n = e.query("field")[0];
                if (n && n.focus) n.focus(true, true)
            }
        }
        function r(e) {
            Wb.each(e,
            function(e) {
                if (!e.id) e.id = Wb.getId();
                if (!Wb.getBool(e.allowBlank, true)) {
                    if (e.fieldLabel) e.fieldLabel = "* " + e.fieldLabel
                }
                if (Wb.promptPickList && e.pickKeyname && (Wb.isEmpty(e.store) || Ext.isArray(e.store))) e.store = Ext.Array.merge(Wb.promptPickList[e.pickKeyname] || [], e.store || []);
                if (e.readOnly) {
                    e.selectOnFocus = true
                }
                if (e.items && Ext.isArray(e.items)) r(e.items)
            })
        }
        function i(e) {
            Wb.each(e,
            function(e) {
                if (Wb.promptSaveList && e.saveKeyname && Wb.promptSaveList[e.saveKeyname] !== undefined) Ext.getCmp(e.id).setValue(Wb.promptSaveList[e.saveKeyname]);
                if (e.items && Ext.isArray(e.items)) i(e.items)
            })
        }
        if (e.windowName) {
            var s = Wb.promptWindows[e.windowName];
            if (s) {
                if (e.resetScrollbar) s.body.dom.scrollTop = 0;
                s.setTitle(e.title);
                s.setIconCls(e.iconCls);
                s.handler = e.handler;
                Wb.activePrompt = s;
                s.show();
                n(s, e.defaultFocus);
                return s
            }
        }
        var o, u, a, f;
        f = Ext.apply({},
        e);
        delete f.defaults;
        delete f.listeners;
        f = Ext.apply({
            width: 500,
            minWidth: 100,
            minHeight: 100,
            maximizable: true,
            resizable: true,
            overflowX: "hidden",
            overflowY: "auto",
            bodyPadding: "2 10 10 10",
            modal: true,
            dialog: true,
            layout: "anchor",
            items: u,
            defaults: {
                labelWidth: 100,
                labelAlign: "right",
                xtype: "textfield",
                margin: "8 0 0 0",
                anchor: "-16"
            },
            listeners: {
                close: function() {
                    Wb.activePrompt = null
                },
                ok: function() {
                    t();
                    Ext.callback(o.handler, o, [Wb.getValue(o), o])
                }
            }
        },
        f);
        if (Wb.getBool(f.autoReset, e.windowName)) f.listeners.hide = function(e) {
            Wb.reset(e)
        };
        if (e.windowName) f.closeAction = "hide";
        Ext.apply(f.defaults, e.defaults);
        Ext.apply(f.listeners, e.listeners);
        u = f.items;
        if (!Ext.isArray(u)) u = [u];
        r(u);
        a = f.defaultFocus;
        delete f.defaultFocus;
        if (f.isUpload) {
            f.items = {
                xtype: "form",
                itemId: "form",
                layout: f.layout,
                border: false,
                overflowX: "hidden",
                overflowY: "auto",
                defaults: f.defaults,
                bodyStyle: "background:transparent;",
                items: f.items
            };
            delete f.defaults;
            delete f.overflowX;
            f.layout = "fit";
            delete f.overflowY
        }
        o = new Ext.window.Window(f);
        Wb.activePrompt = o;
        o.show();
        if (!e.win) o.setHeight(Math.min(o.getHeight(), Ext.Element.getViewportHeight() - 8));
        Ext.suspendLayouts();
        try {
            i(u)
        } finally {
            Ext.resumeLayouts(true)
        }
        n(o, a);
        if (f.windowName) {
            Wb.promptWindows[f.windowName] = o;
            if (f.destroyOn) f.destroyOn.mon(f.destroyOn, "destroy",
            function() {
                o.destroy();
                delete Wb.promptWindows[f.windowName]
            })
        }
        return o
    },
    promptText: function(e, t, n) {
        var r = Ext.apply({},
        n),
        i,
        s;
        i = r.allowBlank;
        s = r.value;
        if (r.allowBlank) delete r.allowBlank;
        if (r.value) delete r.value;
        return new Ext.window.Window(Ext.apply({
            title: e,
            autoShow: true,
            modal: true,
            maximizable: true,
            layout: "fit",
            iconCls: "edit_icon",
            dialog: true,
            width: 500,
            height: 300,
            resizable: true,
            defaultFocus: "text",
            listeners: {
                ok: function(e) {
                    if (t) t(e.getComponent("text").getValue(), e)
                }
            },
            items: [{
                allowBlank: r.value === undefined ? true: r.value,
                itemId: "text",
                xtype: "textarea",
                value: s || ""
            }]
        },
        n))
    },
    getValue: function(e, t) {
        var n = {};
        if (!e) return n;
        Ext.suspendLayouts();
        try {
            function r(e) {
                var r = e.itemId;
                if (r && e.getValue && (!t || Wb.indexOf(t, r) != -1) && !n.hasOwnProperty(r)) {
                    if (e instanceof Ext.form.field.File) n["$" + r] = e.removeFile ? 1 : 0;
                    else n[r] = e.getValue()
                }
                return false
            }
            if (!Ext.isArray(e)) e = [e];
            if (t && !Ext.isArray(t)) t = [t];
            Wb.each(e,
            function(e) {
                r(e);
                if (e.queryBy) e.queryBy(r)
            })
        } finally {
            Ext.resumeLayouts(true)
        }
        return n
    },
    getVal: function(e, t) {
        if (!e) return undefined;
        if (!t) {
            if (Ext.isArray(e)) t = e[0].itemId;
            else t = e.itemId
        }
        return Wb.getValue(e, t)[t]
    },
    setValue: function(e, t) {
        if (!e) return;
        Ext.suspendLayouts();
        try {
            function n(e) {
                var n = e.itemId;
                if (n && t.hasOwnProperty(n) && e.setValue) {
                    if (e instanceof Ext.form.field.File) e.inputEl.dom.value = t[n] ? Str.hasFile: "";
                    else {
                        var r = t[n];
                        if (Ext.isObject(r)) {
                            if (e.nestField !== undefined) {
                                r = r[e.nestField]
                            } else if (e.valueField !== undefined) {
                                r = r[e.valueField]
                            }
                        }
                        e.setValue(r)
                    }
                }
                return false
            }
            if (!Ext.isArray(e)) e = [e];
            Wb.each(e,
            function(e) {
                n(e);
                if (e.queryBy) e.queryBy(n)
            })
        } finally {
            Ext.resumeLayouts(true)
        }
    },
    setVal: function(e, t, n) {
        var r = {};
        r[t] = n;
        Wb.setValue(e, r)
    },
    reset: function(e, t) {
        if (!e) return;
        Ext.suspendLayouts();
        try {
            function n(e) {
                var n = e.itemId;
                if (n && e.reset && (!t || Wb.indexOf(t, n) != -1)) {
                    e.reset()
                }
                return false
            }
            if (!Ext.isArray(e)) e = [e];
            if (t && !Ext.isArray(t)) t = [t];
            Wb.each(e,
            function(e) {
                n(e);
                if (e.queryBy) e.queryBy(n)
            })
        } finally {
            Ext.resumeLayouts(true)
        }
    },
    getRefer: function(e, t) {
        function n(e) {
            var n = e.itemId;
            if (n) t[n] = e;
            return false
        }
        if (!t) t = {};
        if (e && !Ext.isArray(e)) e = [e];
        Wb.each(e,
        function(e) {
            n(e);
            if (e.queryBy) e.queryBy(n)
        });
        return t
    },
    highlight: function(e, t) {
        var n;
        if (e.isNode) {
            n = e.getOwnerTree().view.getNode(e);
            if (n) {
                n = Ext.fly(n)
            }
        } else n = e;
        if (n) {
            if (e.isHighlighting) return;
            e.isHighlighting = true;
            if (t) {
                n.highlight("ff0000", {
                    duration: 1500,
                    callback: function() {
                        delete e.isHighlighting
                    }
                })
            } else {
                n.highlight(null, {
                    duration: 1500,
                    callback: function() {
                        delete e.isHighlighting
                    }
                })
            }
        }
    },
    verifyGrid: function(e) {
        var t, n, r, i, s, o = true,
        u = e.bindTable || e,
        a = Wb.findEditing(u);
        if (!a) return true;
        a.completeEdit();
        i = u.columns;
        n = i.length;
        s = u.store;
        s.each(function(e) {
            for (t = 0; t < n; t++) {
                r = i[t];
                if ((r.editor && r.editor.allowBlank === false || r.field && r.field.allowBlank === false) && Wb.isEmpty(e.get(r.dataIndex))) {
                    o = false;
                    a.startEdit(e, r);
                    if (a.activeEditor) a.activeEditor.field.validate();
                    return false
                }
            }
        });
        return o
    },
    verify: function(e) {
        function r(e) {
            if (e.validate && !e.hidden && !e.disabled && !e.validate() && !n) n = e;
            return false
        }
        var t, n;
        if (Ext.isArray(e)) t = e;
        else t = [e];
        Ext.suspendLayouts();
        try {
            Wb.each(t,
            function(e) {
                r(e);
                if (e.queryBy) {
                    e.queryBy(r)
                }
            })
        } finally {
            Ext.resumeLayouts(true)
        }
        if (n) {
            Wb.turnTab(n);
            n.focus(true, true);
            return false
        } else return true
    },
    setRecord: function(e, t) {
        Wb.each(t,
        function(t, n) {
            e.set(t, n)
        });
        e.commit();
        return e
    },
    quoteRegexp: function(e) {
        return e.replace(/[.?*+\^$\[\]\\(){}|\-]/g, "\\$&")
    },
    isValue: function(e) {
        return e !== null && e !== undefined
    },
    findEditing: function(e) {
        var t = e.bindTable || e;
        return t.findPlugin("cellediting") || t.findPlugin("rowediting")
    },
    remove: function(e, t, n) {
        var r = Ext.isArray(e),
        i = r && e[0] instanceof Ext.data.Model;
        if (r && !i) {
            Ext.Array.remove(e, t);
            return
        }
        n = Wb.getBool(n, true);
        if (t && !Ext.isArray(t)) t = [t];
        Ext.suspendLayouts();
        try {
            if (e instanceof Ext.tree.Panel || e instanceof Ext.data.TreeStore) {
                e = e.bindTable || e;
                if (!t) t = Wb.reverse(e.getSelection());
                if (t.length === 0) return;
                var s, o, u;
                if (n) {
                    s = t[t.length - 1];
                    o = s.parentNode;
                    u = s;
                    while (true) {
                        u = u.nextSibling;
                        if (Wb.indexOf(t, u) == -1) break
                    }
                    if (!u) {
                        u = s;
                        while (true) {
                            u = u.previousSibling;
                            if (Wb.indexOf(t, u) == -1) break
                        }
                    }
                    if (!u && o) u = o
                }
                Wb.each(t,
                function(e) {
                    e.remove()
                });
                if (n) {
                    if (u && (u.parentNode || e.rootVisible)) e.setSelection(u)
                }
            } else if (e instanceof Ext.grid.Panel || e instanceof Ext.data.Store) {
                e = e.bindTable || e;
                var a, f, l = Wb.findEditing(e);
                if (l) l.completeEdit();
                if (!t) t = e.getSelection();
                if (t.length === 0) return;
                if (n) a = e.store.indexOf(t[0]);
                if (e instanceof Ext.grid.property.Grid) e.removeProperty(t[0].data.name);
                else {
                    e.store.remove(t);
                    Wb.refreshRowNum(e)
                }
                if (n) {
                    f = e.store.getCount() - 1;
                    if (a > f) a = f;
                    if (a > -1) e.setSelection(a)
                }
            } else if (r) {
                if (e[0] instanceof Ext.data.Model) {
                    Wb.each(e,
                    function(e) {
                        e.remove()
                    })
                }
            } else {
                Wb.each(t,
                function(t) {
                    e.remove(t)
                })
            }
        } finally {
            Ext.resumeLayouts(true)
        }
    },
    setModified: function(e) {
        if (!e.isModified) {
            e.isModified = true;
            if (!Ext.String.startsWith(e.title, "*")) e.setTitle("*" + e.title)
        }
        return e
    },
    unModified: function(e) {
        if (e.isModified) {
            e.isModified = false;
            e.setTitle(e.title.substring(1))
        }
    },
    setTitle: function(e, t) {
        var n = Wb.isEmpty(e.title) ? "": String(e.title),
        r = n.indexOf(" - ");
        if (r != -1) n = n.substring(0, r);
        if (Wb.isEmpty(t)) e.setTitle(n);
        else e.setTitle(n + " - " + t)
    },
    parseBool: function(e, t) {
        if (Wb.isValue(e) || t === undefined) {
            return ! (e === false || e == "false" || e === 0 || e == "0" || e === null || e === undefined)
        } else return t
    },
    getBool: function(e, t) {
        return !! (e === undefined ? t: e)
    },
    reload: function(e, t, n) {
        if (e instanceof Ext.grid.Panel || e instanceof Ext.data.Store) {
            var r = e.store || e,
            i = t || {};
            i.params = Ext.apply({},
            i.params, r.lastOptions.params);
            r.reload(i)
        } else {
            e = e.bindTable || e;
            if (e.isRefreshing) return;
            e.isRefreshing = true;
            if (!n) n = {};
            var s, o, u = e.getSelection()[0],
            a = n.field || e.displayField;
            if (u) s = u.getPath(a, n.separator || "\n");
            e.store.load({
                callback: function(r, i, o) {
                    if (e.isRefreshing) delete e.isRefreshing;
                    if (o && s) e.selectPath(s, a, n.separator || "\n", t)
                }
            })
        }
    },
    verifyName: function(e) {
        var t, n, r = e.length;
        for (n = 0; n < r; n++) {
            t = e.charAt(n);
            if (! (t >= "a" && t <= "z" || t >= "A" && t <= "Z" || t == "_" || n > 0 && t >= "0" && t <= "9")) return Wb.format(Str.invalidChar, t)
        }
        return true
    },
    verifyFile: function(e) {
        var t, n, r = e.length,
        i = '/:*?"<>|';
        for (n = 0; n < r; n++) {
            t = e.charAt(n);
            if (i.indexOf(t) != -1) return Wb.format(Str.invalidChar, t)
        }
        return true
    },
    htmlRender: function(e) {
        return Wb.htmlEncode(e)
    },
    getDoc: function(e) {
        try {
            return e.contentWindow.document || e.contentDocument || window.frames[e.id].document
        } catch(t) {
            return null
        }
    },
    relayEvent: function(e) {
        try {
            var t = this,
            n = Ext.Element.getTrueXY(t),
            r = e.getXY(),
            i = Ext.EventManager.getPageXY(e.browserEvent);
            e.xy = [n[0] + i[0], n[1] + i[1]];
            e.injectEvent(t);
            e.xy = r
        } catch(s) {}
    },
    insertIframe: function(e, t) {
        var n, r = Wb.getId();
        t = Wb.getBool(t, true);
        e.update('<iframe scrolling="auto" id="' + r + '" name="' + r + '" frameborder="0" width="100%" height="100%"></iframe>');
        e.iframe = e.el.down("iframe");
        n = e.iframe.dom;
        e.iframe.submit = function(r, i, s) {
            if (e.isSubmiting) return;
            e.isSubmiting = true;
            if (t) Wb.mask(e, Str.loading);
            Wb.submit(r, i, n.id, s)
        };
        e.iframe.getDoc = function() {
            return Wb.getDoc(n)
        };
        n.onload = function() {
            if (!e.isSubmiting) return;
            delete e.isSubmiting;
            if (t) Wb.unmask(e, Str.loading);
            var r = e.iframe.getDoc();
            if (r) {
                Ext.EventManager.on(r, {
                    mousedown: Wb.relayEvent,
                    mousemove: Wb.relayEvent,
                    mouseup: Wb.relayEvent,
                    click: Wb.relayEvent,
                    dblclick: Wb.relayEvent,
                    scope: n
                })
            }
        };
        e.mon(e, "beforedestroy",
        function(e) {
            var t, r;
            t = e.iframe.getDoc();
            try {
                if (t) {
                    for (r in t) {
                        if (t.hasOwnProperty && t.hasOwnProperty(r)) {
                            delete t[r]
                        }
                    }
                    n.src = "about:blank";
                    t.write("");
                    t.clear();
                    t.close()
                }
                e.iframe.destroy()
            } catch(i) {}
        });
        return e.iframe
    },
    getFilename: function(e) {
        if (Wb.isEmpty(e)) return "";
        var t = Math.max(e.lastIndexOf("/"), e.lastIndexOf("\\"));
        if (t == -1) return e;
        else return e.substring(t + 1)
    },
    extractFileExt: function(e) {
        if (!Wb.isEmpty(e)) {
            var t = e.lastIndexOf(".");
            if (t != -1) return e.substring(t + 1)
        }
        return ""
    },
    getError: function(e, t) {
        if (e) {
            var n = "#WBE" + t + ":",
            r = n.length;
            if (e.substring(0, r) == n) return e.substring(r)
        }
        return null
    },
    select: function(e) {
        var t = e.getOwnerTree(),
        n = [];
        if (!t) return;
        Ext.suspendLayouts();
        e.bubble(function(e) {
            if (t.rootVisible || e.parentNode) n.push(e)
        });
        Wb.each(n,
        function(e) {
            e.expand()
        },
        null, true);
        t.setSelection(e);
        Ext.resumeLayouts(true)
    },
    mimicClick: function(e, t, n, r, i) {
        var s = this;
        if (i.getKey() == i.ENTER) {
            if (s.hasListeners.itemclick) s.fireEventArgs("itemclick", arguments);
            else s.fireEventArgs("itemdblclick", arguments);
            i.stopEvent()
        }
    },
    getLang: function(e) {
        var t = {};
        Wb.each(e,
        function(e, n) {
            t[e] = n[Str.lang]
        });
        return t
    },
    getModifiedTitle: function(e, t) {
        if (!e) return null;
        var n, r = 0,
        i;
        e.items.each(function(e) {
            if (e.isModified) {
                if (!i) i = e;
                if (!n) n = e.title.substring(1);
                r++
            }
        });
        if (t && i) e.setActiveTab(i);
        if (r > 1) return Wb.format(Str.itemsInfo, n, r);
        else if (r == 1) return '"' + n + '" ';
        else return null
    },
    fromPanel: function(e, t) {
        var n = t.target,
        r = e.id;
        if (n.id == r + "-innerCt") return true;
        if (n.id == r + "-body") {
            if (t.getX() > e.getX() + e.body.dom.clientWidth || t.getY() > e.getY() + e.body.dom.clientHeight) return false;
            else return true
        }
        return false
    },
    copy: function(e) {
        function t(e) {
            var n, r = e.data,
            i = {},
            s = ["allowDrag", "allowDrop", "children", "depth", "id", "index", "isFirst", "isLast", "loaded", "loading", "parentId", "root"];
            if (r.id) i.id = Wb.getId();
            Wb.each(r,
            function(e, t) {
                if (Wb.indexOf(s, e) == -1) i[e] = t
            });
            if (!e.isLeaf() && e.isLoaded()) {
                n = e.childNodes;
                i.children = [];
                Wb.each(n,
                function(e) {
                    i.children.push(t(e))
                })
            }
            return i
        }
        return Ext.clone(t(e))
    },
    append: function(e, t, n, r) {
        var i, s = [];
        if (!Ext.isArray(e)) e = [e];
        Ext.suspendLayouts();
        try {
            Wb.each(e,
            function(e) {
                if (n) e = Wb.copy(e);
                i = t.appendChild(e);
                i.commit();
                s.push(i)
            });
            if (Wb.getBool(r, true)) {
                t.expand();
                t.getOwnerTree().setSelection(s)
            }
        } finally {
            Ext.resumeLayouts(true)
        }
        return s
    },
    insertBefore: function(e, t, n, r) {
        var i = t.parentNode,
        s, o = [];
        if (!Ext.isArray(e)) e = [e];
        Ext.suspendLayouts();
        try {
            Wb.each(e,
            function(e) {
                if (n) e = Wb.copy(e);
                s = i.insertBefore(e, t);
                s.commit();
                o.push(s)
            });
            if (Wb.getBool(r, true)) t.getOwnerTree().setSelection(o)
        } finally {
            Ext.resumeLayouts(true)
        }
        return o
    },
    insertAfter: function(e, t, n, r) {
        var i = t.nextSibling,
        s = t.parentNode,
        o, u = [];
        if (!Ext.isArray(e)) e = [e];
        Ext.suspendLayouts();
        try {
            Wb.each(e,
            function(e) {
                if (n) e = Wb.copy(e);
                if (i) o = s.insertBefore(e, i);
                else o = s.appendChild(e);
                o.commit();
                u.push(o)
            });
            if (Wb.getBool(r, true)) t.getOwnerTree().setSelection(u)
        } finally {
            Ext.resumeLayouts(true)
        }
        return u
    },
    expand: function(e, t) {
        var n = e.bindTable || e,
        r = n.getSelection(),
        i;
        if (r.length === 0) {
            i = n.getRootNode();
            if (n.rootVisible) r.push(i);
            else {
                if (t) i.collapseChildren(true);
                else i.expandChildren(true);
                return
            }
        }
        Wb.each(r,
        function(e) {
            if (t) e.collapse(true);
            else e.expand(true)
        })
    },
    collapse: function(e) {
        var t = e.bindTable || e;
        Wb.expand(t, true)
    },
    isModal: function() {
        var e = false;
        Ext.WindowMgr.each(function(t) {
            if (t.modal && t.isVisible()) {
                e = true;
                return false
            }
        });
        return e || Ext.getBody().isMasked()
    },
    getId: function() {
        if (!Wb.id) Wb.id = (new Date).getTime();
        return "wb" + Wb.id++
    },
    getTreeTools: function(e) {
        var t = [];
        if (!e) e = {};
        if (Wb.getBool(e.refresh, true)) t.push({
            type: "refresh",
            tooltip: Str.refresh,
            callback: function(e) {
                Wb.reload(e)
            }
        });
        if (Wb.getBool(e.expand, true)) t.push({
            type: "expand",
            tooltip: Str.expandSelected,
            callback: function(e) {
                Wb.expand(e)
            }
        });
        if (Wb.getBool(e.collapse, true)) t.push({
            type: "collapse",
            tooltip: Str.collapseSelected,
            callback: function(e) {
                Wb.collapse(e)
            }
        });
        if (e.search) t.push({
            type: "search",
            tooltip: Str.toggleSearch,
            callback: function(e) {
                var t = e.getDockedComponent("_searchNodeBar"),
                n = e.displayField;
                if (t) t.setVisible(!t.isVisible());
                else t = e.addDocked({
                    xtype: "toolbar",
                    itemId: "_searchNodeBar",
                    dock: "top",
                    searchHandler: function() {
                        var r = t.getComponent("combo").getValue().toLowerCase(),
                        i = e.getRootNode().findChildBy(function(e) {
                            if (r === (e.data[n] || "").toLowerCase()) return true
                        },
                        e, true);
                        if (i) Wb.select(i);
                        else Wb.warn(Wb.format(Str.notFound, r))
                    },
                    items: [{
                        xtype: "combo",
                        itemId: "combo",
                        flex: 1,
                        displayField: "text",
                        queryMode: "local",
                        store: {
                            fields: ["text"]
                        },
                        doQuery: function(t) {
                            var r, i = this,
                            s = [],
                            o = e.rootVisible;
                            e.getRootNode().cascadeBy(function(e) {
                                if (!o && e.getDepth() === 0) return;
                                r = e.data[n] || "";
                                if (r.toLowerCase().indexOf(t) != -1) s.push({
                                    text: r
                                })
                            });
                            i.store.loadData(s);
                            if (s.length) i.expand();
                            else i.collapse();
                            i.doAutoSelect();
                            return true
                        },
                        listeners: {
                            specialkey: function(e, n) {
                                if (n.getKey() == n.ENTER && !e.isExpanded) {
                                    t.searchHandler();
                                    n.stopEvent()
                                }
                            },
                            select: function() {
                                t.searchHandler()
                            }
                        }
                    },
                    {
                        iconCls: "seek_icon",
                        tooltip: Str.search,
                        handler: function() {
                            t.searchHandler()
                        }
                    }]
                })[0];
                if (t.isVisible()) t.getComponent("combo").focus(false, true)
            }
        });
        return t
    },
    save: function(e) {
        var t = e.store,
        n = e.getValue(),
        r;
        t.clearFilter();
        r = t.findRecord("field1", n);
        if (r) t.remove(r);
        t.insert(0, {
            field1: n
        })
    },
    reverse: function(e) {
        Ext.Array.sort(e,
        function(e, t) {
            return t.getDepth() - e.getDepth()
        });
        return e
    },
    selFirst: function(e) {
        var t, n;
        if (e instanceof Ext.tree.Panel || e instanceof Ext.data.TreeStore) {
            t = e.bindTable || e;
            n = t.getRootNode();
            if (!t.rootVisible) n = n.firstChild;
            if (n && !t.selFirstDone) {
                t.selFirstDone = true;
                t.setSelection(n)
            }
        } else if (e instanceof Ext.grid.Panel || e instanceof Ext.data.Store) {
            t = e.bindTable || e;
            if (t.store && t.store.getCount() > 0) t.setSelection(0)
        }
    },
    getInfo: function(e, t) {
        var n;
        if (Ext.isArray(e)) n = e;
        else n = e.getSelection();
        if (!t) t = "text";
        if (n.length) {
            if (n.length == 1) return n[0].get(t);
            else return Wb.format(Str.itemsInfo, n[0].get(t), n.length)
        } else return ""
    },
    getSection: function(e, t, n) {
        var r = 0,
        i = 0;
        for (r = 0; r < n; r++) {
            i = e.indexOf(t, i);
            if (i == -1) return "";
            i++
        }
        return e.substring(i)
    },
    download: function(e, t, n) {
        var r = Wb.getFrame(),
        i = Wb.getForm(Ext.apply({
            _jsonresp: 1
        },
        t), n);
        i.action = e;
        i.method = "POST";
        i.target = r.id;
        i.submit()
    },
    update: function(e, t, n) {
        var r;
        e.fields.each(function(n) {
            r = n.name;
            if (t.hasOwnProperty(r)) e.set(r, t[r])
        });
        if (Wb.getBool(n, true)) e.commit()
    },
    add: function(e, t, n, r, i) {
        var s, o, u = e.bindTable || e,
        a = Wb.findEditing(u),
        f = u.store;
        if (a) a.completeEdit();
        s = f.indexOf(u.getSelection()[0]);
        if (n) {
            if (s == -1) {
                if (n == "before") n = "first";
                else if (n == "after") n = "last"
            }
        } else n = "last";
        if (!t) t = {};
        switch (n) {
        case "first":
            s = 0;
            o = f.insert(s, t);
            break;
        case "before":
            o = f.insert(s, t);
            break;
        case "after":
            s++;
            o = f.insert(s, t);
            break;
        case "last":
            s = f.getCount();
            o = f.insert(s, t);
            break;
        case "add":
            o = f.add(t);
            s = f.indexOf(o[0]);
            break
        }
        if (s < f.getCount() - 1) {
            Wb.refreshRowNum(u)
        }
        if (Wb.getBool(i, true)) {
            Wb.each(o,
            function(e) {
                e.commit()
            })
        }
        u.setSelection(o);
        if (a && r !== undefined) {
            a.startEdit(o[0], r)
        }
        return o
    },
    addEdit: function(e, t) {
        return Wb.add(e, t, "last", 1, false)
    },
    refreshRowNum: function(e) {
        var t = e.bindTable || e;
        if (!Wb.hasRowNumber(t)) return;
        var n, r = 1,
        i = t.store,
        s = t.view.el.query("div[class~=x-grid-cell-inner-row-numberer]"),
        o = (i.currentPage - 1) * i.pageSize;
        Wb.each(s,
        function(e) {
            n = r + o;
            if (n !== e.innerHTML) e.innerHTML = n;
            r++
        })
    },
    insert: function(e, t) {
        return Wb.edit(e, t, true)
    },
    edit: function(e, t, n) {
        var r, i, s, o, u, a, f = e.bindTable || e;
        if (!n) {
            u = f.getSelection()[0];
            if (!u) {
                Wb.warn(Wb.format(Str.selectRecord, Str.modify));
                return
            }
        }
        if (!t) t = {};
        if (t.title === undefined) t.title = n ? Str.add: Str.modify;
        if (t.iconCls === undefined) t.iconCls = n ? "record_add_icon": "record_edit_icon";
        s = function(e, r) {
            if (t.beforerequest && Ext.callback(t.beforerequest, r.appScope, [e, r]) === false) return;
            var i = Wb.apply(n ? {}: Wb.getData(u, true), t.params, e),
            s;
            s = {
                url: t.url,
                params: i,
                showError: false,
                failure: function(n, i, s) {
                    Wb.except(a ? i: n,
                    function() {
                        if (Wb.getBool(t.autoFocus, true) && n.responseText) {
                            var e, i, s = n.responseText.indexOf(" ");
                            if (s > 0 && s < 100) {
                                e = n.responseText.substring(0, s);
                                try {
                                    i = r.down("field[fieldLabel=* " + e + "]");
                                    if (!i) i = r.down("field[fieldLabel=" + e + "]");
                                    if (i && i.focus) i.focus(true, true)
                                } catch(o) {}
                            }
                        }
                    });
                    if (t.failure) Ext.callback(t.failure, r.appScope, [e, r, a ? s: n.responseText])
                },
                success: function(s, o, l) {
                    var c, h = a ? l: s.responseText;
                    if (Ext.String.startsWith(h, "{") && Ext.String.endsWith(h, "}")) c = Wb.decode(h);
                    else c = {};
                    if ("success" in c) {
                        if (c.success == true) {
                            if (n) Wb.add(f, Wb.applyIf(c, i), t.addPosition);
                            else Wb.update(u, Wb.applyIf(c, i));
                            r.close();
                            Ext.callback(t.success, r.appScope, [e, r, h])
                        } else {
                            Wb.error(c.message)
                        }
                    } else {
                        if (n) Wb.add(f, Wb.applyIf(c, i), t.addPosition);
                        else Wb.update(u, Wb.applyIf(c, i));
                        r.close();
                        Ext.callback(t.success, r.appScope, [e, r, h])
                    }
                }
            };
            if (a) {
                s.form = r.getComponent("form");
                Wb.upload(s)
            } else Wb.request(s)
        };
        if (t.win) {
            i = e.bindEditWin;
            if (!i) {
                i = t.win;
                if (i instanceof Ext.window.Window) {
                    i.closeAction = "hide";
                    e.mon(e, "destroy",
                    function() {
                        i.destroy();
                        delete e.bindEditWin
                    });
                    e.bindEditWin = i
                } else {
                    i = new Ext.window.Window(i)
                }
            }
            a = !!i.down("filefield");
            i.editHandler = function() {
                var e = this;
                s(Wb.getValue(e), e)
            };
            i.isNew = n;
            i.editData = Wb.apply({},
            t.params, n ? null: u.data);
            i.show();
            if (!n) {
                if (t.titleField) Wb.setTitle(i, u.data[t.titleField]);
                Wb.setValue(i, Wb.apply({},
                t.params, u.data))
            }
        } else {
            o = [];
            if (t.firstItems) {
                Wb.each(t.firstItems,
                function(e) {
                    o.push(e)
                })
            }
            Wb.each(f.columns,
            function(e) {
                var t = e.dataIndex;
                if (e.editor) {
                    r = Wb.apply({
                        fieldLabel: e.text,
                        itemId: t
                    },
                    e.editor);
                    o.push(r)
                } else if (e.blobEditor) {
                    a = true;
                    if (n) {
                        r = Wb.apply({
                            fieldLabel: e.text,
                            itemId: t
                        },
                        e.blobEditor)
                    } else {
                        r = {
                            xtype: "fieldcontainer",
                            fieldLabel: e.text,
                            layout: "hbox",
                            items: [Wb.apply({
                                flex: 1,
                                itemId: t
                            },
                            e.blobEditor), {
                                xtype: "button",
                                text: Str.del1,
                                margin: "0 0 0 3",
                                bindFieldName: t,
                                handler: function(e) {
                                    var t = e.ownerCt.getComponent(e.bindFieldName);
                                    t.reset();
                                    t.removeFile = true
                                }
                            }]
                        }
                    }
                    o.push(r)
                }
            });
            if (t.lastItems) {
                Wb.each(t.lastItems,
                function(e) {
                    o.push(e)
                })
            }
            i = Wb.prompt(Wb.apply({
                items: o,
                isUpload: a,
                handler: s
            },
            t));
            if (!n) {
                if (t.titleField) Wb.setTitle(i, u.data[t.titleField]);
                Wb.setValue(i, Wb.apply({},
                t.params, u.data))
            }
        }
        return i
    },
    del: function(e, t) {
        var n = e.bindTable || e,
        r = n.getSelection();
        Wb.confirmDo(r,
        function() {
            Wb.request({
                url: t.url,
                failure: t.failure,
                params: Wb.apply({
                    destroy: Wb.getData(r, true)
                },
                t.params),
                success: function(e) {
                    var i = e.responseText;
                    if (Ext.String.startsWith(i, "{") && Ext.String.endsWith(i, "}")) respObj = Wb.decode(i);
                    else respObj = {};
                    if ("success" in respObj) {
                        if (respObj.success == true) {
                            Wb.remove(n, r);
                            Ext.callback(t.success, n, [n])
                        } else {
                            Wb.error(respObj.message)
                        }
                    } else {
                        Wb.remove(n, r);
                        Ext.callback(t.success, n, [n])
                    }
                }
            })
        },
        t.titleField)
    },
    handle: function(e, t) {
        var n = e.bindTable || e,
        r = n.getSelection();
        Wb.confirmDo(r,
        function() {
            Wb.request({
                url: t.url,
                failure: t.failure,
                params: Wb.apply({
                    data: Wb.getData(r, true)
                },
                t.params),
                success: function(e) {
                    var r = Wb.decode(e.responseText);
                    if (r.success == true) {
                        Ext.callback(t.success, n, [n])
                    } else {
                        Wb.error(r.message)
                    }
                }
            })
        },
        t.titleField, t.verb ? t.verb: "处理")
    },
    getData: function(e, t) {
        var n, r = [],
        i = Ext.isArray(e);
        if (!i) e = [e];
        Wb.each(e,
        function(e) {
            if (t) {
                n = Ext.apply({},
                e.data);
                Wb.each(e.data,
                function(e, t) {
                    n["#" + e] = t
                });
                Wb.each(e.modified,
                function(e, t) {
                    n["#" + e] = t
                })
            } else {
                n = e.data
            }
            r.push(n)
        });
        return i ? r: r[0]
    },
    sync: function(e) {
        var t, n, r, i, s = e.store || e.grid.store;
        if (s.bindTable) {
            t = Wb.findEditing(s.bindTable);
            if (t) t.completeEdit()
        }
        n = s.getRemovedRecords();
        r = s.getUpdatedRecords();
        i = s.getNewRecords();
        if (!e.params) e.params = {};
        Ext.apply(e.params, {
            destroy: Wb.getData(n, true),
            update: Wb.getData(r, true),
            create: Wb.getData(i)
        });
        if (e.store) delete e.store;
        if (e.grid) delete e.grid;
        Wb.request(e)
    },
    syncCreate: function(e, t, n) {
        var r = 0,
        i = e.store || e;
        if (t) Wb.each(i.getNewRecords(),
        function(e) {
            Wb.update(e, t[r++], false)
        });
        if (Wb.getBool(n, true)) i.commitChanges()
    },
    reject: function(e) {
        var t = e.bindTable || e,
        n = Wb.findEditing(t);
        if (n) n.cancelEdit();
        t.store.rejectChanges();
        Wb.refreshRowNum(t)
    },
    hasRowNumber: function(e) {
        var t = false,
        n = e.bindTable || e,
        r = n.columns;
        if (!r) return false;
        Wb.each(r,
        function(e) {
            if (e.xtype == "rownumberer") {
                t = true;
                return false
            }
        });
        return t
    },
    progress: function(e, t, n) {
        if (e > 1) e = 1;
        else if (e < 0) e = 0;
        if (e === 0) Ext.Msg.show({
            msg: t || Str.processing,
            progressText: "0%",
            width: 300,
            closable: false,
            progress: true,
            animateTarget: n
        });
        else Ext.Msg.updateProgress(e, Math.round(100 * e) + "%")
    },
    upload: function(e) {
        var t, n = (new Date).getTime(),
        r = e.form;
        t = Ext.apply({
            isUpload: true
        },
        {
            showError: Wb.getBool(e.showError, true),
            showMask: Wb.getBool(e.showMask, true),
            params: Ext.apply(Wb.getValue(e.out), e.params, Wb.getValue(r)),
            progressId: n,
            url: e.url + (e.url.indexOf("?") != -1 ? "&": "?") + "_jsonresp=1&uploadId=" + n
        },
        e);
        delete t.form;
        r.form.submit(t)
    },
    getFrame: function() {
        if (!Wb.iframe) {
            var e = document.createElement("iframe"),
            t = "ifm" + Wb.getId();
            Ext.fly(e).set({
                id: t,
                name: t,
                cls: Ext.baseCSSPrefix + "hide-display",
                src: Ext.SSL_SECURE_URL
            });
            document.body.appendChild(e);
            if (document.frames) document.frames[t].name = t;
            e.onload = function() {
                var e, t, n, r;
                try {
                    r = Wb.getDoc(Wb.iframe);
                    if (r) {
                        if (r.body) {
                            if ((n = r.body.firstChild) && /pre/i.test(n.tagName)) {
                                e = n.textContent || n.innerText
                            } else if (n = r.getElementsByTagName("textarea")[0]) {
                                e = n.value
                            } else {
                                e = r.body.textContent || r.body.innerText
                            }
                            if (e) {
                                e = Wb.decode(e);
                                if (!e.success) {
                                    t = e.value;
                                    if (Ext.String.startsWith(t, "$WBE201")) Wb.login();
                                    else if (Ext.String.startsWith(t, "$WBE202")) Wb.login(true);
                                    else Wb.error(t)
                                }
                            }
                        }
                    }
                } catch(i) {
                    if (e) Wb.error(e);
                    else Wb.error(Str.serverNotResp)
                }
            };
            Wb.iframe = e
        }
        return Wb.iframe
    },
    getForm: function(e, t) {
        var n, r = Wb.defaultForm;
        if (r) {
            while (r.childNodes.length !== 0) r.removeChild(r.childNodes[0])
        } else {
            r = document.createElement("FORM");
            Wb.defaultForm = r;
            document.body.appendChild(r)
        }
        if (e) {
            Wb.each(e,
            function(e, t) {
                n = document.createElement("input");
                n.setAttribute("name", e);
                n.setAttribute("type", "hidden");
                if (Ext.isArray(t) || Ext.isObject(t)) t = Wb.encode(t);
                else if (Ext.isDate(t)) t = Wb.dateToStr(t);
                n.setAttribute("value", Wb.isEmpty(t) ? "": t);
                r.appendChild(n)
            })
        }
        if (t) r.encoding = "multipart/form-data";
        else r.encoding = "application/x-www-form-urlencoded";
        return r
    },
    submit: function(e, t, n, r, i) {
        var s = Wb.getForm(t, i);
        s.action = e;
        s.method = r || "POST";
        s.target = n || "_blank";
        s.submit()
    },
    toLine: function(e, t) {
        var n;
        if (e) n = e.replace(/\r?\n/g, " ");
        else return "";
        if (t) return Ext.String.ellipsis(n, t);
        else return n
    },
    numValidator: function(e, t) {
        return function(n) {
            var r = this.getValue();
            if (Wb.isEmpty(r)) return true;
            var i, s = String(r);
            if (Ext.String.startsWith(s, "-")) s = s.substring(1);
            if (s.indexOf(".") != -1) i = s.split(".");
            else if (s.indexOf(",") != -1) i = s.split(",");
            else i = [s, ""];
            if (i[0].length + i[1].length > e || i[1].length > t) return Wb.format(Str.invalidValue, n);
            else return true
        }
    },
    strToDate: function(e) {
        if (!e) return undefined;
        if (e.indexOf(".") == -1) return Ext.Date.parse(e, "Y-m-d H:i:s");
        else return Ext.Date.parse(e, Wb.dateFormat)
    },
    dateToStr: function(e) {
        return Wb.format(e, Wb.dateFormat)
    },
    dateToText: function(e, t) {
        var n, r = Ext.form.field.Date.prototype.format,
        i = Ext.form.field.Time.prototype.format;
        if (!e) return "";
        if (Ext.isString(e)) e = Wb.strToDate(e);
        if (t === true) n = i;
        else if (t === false) n = r;
        else if (t === null) n = r + " " + i;
        else {
            if (Wb.format(e, "Hisu") === "000000000") n = r;
            else n = r + " " + i
        }
        return Wb.format(e, n)
    },
    kv: function(e, t) {
        var n = Wb.find(t, "K", e);
        return n ? n.V: ""
    },
    kvRenderer: function(e, t, n, r, i) {
        var s = this.headerCt.getGridColumns();
        var o = s[i].keyItems;
        if (typeof o == "string") {
            o = Wb.decode(o)
        }
        return Wb.kv(e, o)
    },
    format: function(e) {
        if (Ext.isDate(e)) return Ext.Date.format.apply(this, arguments);
        else if (Ext.isNumber(e)) return Ext.util.Format.number.apply(this, arguments);
        else return Ext.String.format.apply(this, arguments)
    },
    getTag: function(e, t) {
        var n = e.store || e;
        return n.proxy.reader.rawData[t]
    },
    getColumns: function(e) {
        if (!e) return null;
        var t = e.store || e;
        if (t) {
            var n = t.proxy.reader.rawData.columns;
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                if (typeof i.renderer != "undefined") {
                    i.renderer = Wb[i.renderer]
                }
            }
            return n
        } else return null
    },
    getColumn: function(e, t) {
        var n, r = e.bindTable || e;
        if (Wb.isEmpty(r.columns)) n = Wb.getColumns(r);
        else n = r.columns;
        if (Ext.isString(t)) return Wb.find(n, "dataIndex", t);
        else return n[t] || null
    },
    loadColumns: function(e, t) {
        var n, r = e.bindTable || e;
        if (t || Wb.isEmpty(r.columns)) {
            n = Wb.getColumns(r.store);
            if (n) r.reconfigure(null, n)
        }
    },
    autoLoadColumns: function(e) {
        if (e) {
            var t = e.headerCt.getGridColumns();
            if ((!e.loadColumns || e.loadColumns == "auto") && Wb.isEmpty(t)) {
                Wb.loadColumns(e)
            } else if (e.loadColumns == "reload") Wb.loadColumns(e, true)
        }
    },
    timeRenderer: function(e) {
        return Wb.dateToText(e, true)
    },
    blobRenderer: function(e, t, n, r, i) {
        var s = this,
        o = s.id,
        u = Wb.getColumn(s, i),
        a = Wb.encode(u ? u.dataIndex || "": ""),
        f = [];
        if (s.uploadBlob && (!s.ifUploadBlob || s.ifUploadBlob(a) !== false)) {
            f.push("<a href='javascript:Wb.call(\"" + o + '","uploadBlob",' + a + "," + r + ")'>" + Str.upload + "</a>")
        }
        if (s.downloadBlob && e && (!s.ifDownloadBlob || s.ifDownloadBlob(a) !== false)) {
            f.push("<a href='javascript:Wb.call(\"" + o + '","downloadBlob",' + a + "," + r + ")'>" + Str.download + "</a>")
        }
        if (s.removeBlob && e && (!s.ifRemoveBlob || s.ifRemoveBlob(a) !== false)) {
            f.push("<a href='javascript:Wb.call(\"" + o + '","removeBlob",' + a + "," + r + ")'>" + Str.del1 + "</a>")
        }
        if (f.length) return f.join("&nbsp;&nbsp;");
        else return e
    },
    getIcon: function(e, t) {
        if (Wb.isEmpty(t)) t = "";
        else t = " title=" + Wb.encode(t);
        return '<span class="wb_icon ' + e + '"' + t + "></span>"
    },
    call: function(e, t) {
        var n = Ext.getCmp(e);
        n[t].apply(n, [].slice.call(arguments, 2))
    },
    setBox: function(e, t) {
        var n = false,
        r = e.getLocalX(),
        i = e.getLocalY(),
        s = e.width,
        o = e.height,
        u = t.getLocalX(),
        a = t.getLocalY(),
        f = t.width,
        l = t.height;
        if (r !== u) {
            t.setLocalX(r);
            n = true
        }
        if (i != a) {
            t.setLocalY(i);
            n = true
        }
        if (s != f) {
            t.setWidth(s);
            n = true
        }
        if (o != l) {
            t.setHeight(o);
            n = true
        }
        return n
    },
    find: function(e, t, n) {
        var r = null;
        if (Ext.isArray(e)) {
            if (e[0] instanceof Ext.data.Model) {
                Wb.each(e,
                function(e) {
                    if (e.data[t] === n) {
                        r = e;
                        return false
                    }
                })
            } else {
                Wb.each(e,
                function(e) {
                    if (e[t] === n) {
                        r = e;
                        return false
                    }
                })
            }
        } else if (e) {
            e.each(function(e) {
                if (e.data[t] === n) {
                    r = e;
                    return false
                }
            })
        } else return null;
        return r
    },
    namePart: function(e) {
        if (Wb.isEmpty(e)) return "";
        var t = e.indexOf("=");
        if (t == -1) return e;
        else return e.substring(0, t)
    },
    valuePart: function(e) {
        if (Wb.isEmpty(e)) return "";
        var t = e.indexOf("=");
        if (t == -1) return "";
        else return e.substring(t + 1)
    },
    getSelText: function() {
        if (window.getSelection) return window.getSelection().toString();
        else if (document.selection && document.selection.createRange) return document.selection.createRange().text;
        else return ""
    },
    pluck: function(e, t) {
        var n, r = e.length,
        i = [];
        for (n = 0; n < r; n++) i.push(e[n].data[t]);
        return i
    },
    clearSelText: function() {
        if (document.selection) {
            document.selection.empty()
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges()
        }
    },
    monEnter: function(e, t) {
        var n = e.getKeyMap();
        n.on(13,
        function(n, r) {
            var i = e,
            s = r.target;
            if (i.el.isMasked() || Ext.getBody().isMasked()) return;
            if (s && s.type == "textarea") return;
            r.stopEvent();
            t(e)
        })
    },
    isEditor: function(e) {
        return e.tagName == "INPUT" && (e.type == "text" || e.type == "password") || e.tagName == "TEXTAREA"
    },
    setCookie: function(e, t) {
        Ext.util.Cookies.set(e, t, Ext.Date.add(new Date, Ext.Date.MONTH, 1))
    },
    getCookie: function(e) {
        return Ext.util.Cookies.get(e)
    },
    setChecked: function(e, t) {
        t = !!t;
        e.data.checked = t;
        var n, r = Ext.fly(Ext.fly(e.getOwnerTree().view.id + "-record" + e.id));
        if (!r) return;
        n = r.down("input[type=button]");
        if (t) {
            r.dom.style.removeProperty("text-decoration");
            r.dom.style.setProperty("color", "blue");
            if (n) n.addCls("x-tree-checkbox-checked")
        } else {
            r.dom.style.setProperty("text-decoration", "line-through");
            r.dom.style.setProperty("color", "gray");
            if (n) n.removeCls("x-tree-checkbox-checked")
        }
    },
    show: function(e) {
        var t = new Ext.window.Window(e);
        return t.show()
    },
    sort: function(e, t, n) {
        var r = Wb.getBool(n, true);
        return e.sort(function(e, n) {
            var i, s;
            if (t) {
                i = e ? e[t] : "";
                s = n ? n[t] : ""
            } else {
                i = e || "";
                s = n || ""
            }
            if (Ext.isString(i)) i = i.toUpperCase();
            if (Ext.isString(s)) s = s.toUpperCase();
            if (r) return i.localeCompare(s);
            else {
                if (i > s) return 1;
                else if (i < s) return - 1;
                else return 0
            }
        })
    },
    optMain: function(e) {
        if (!e) return null;
        var t, n, r = [],
        i = ["container", "panel", "form", "tabpanel", "fieldset"];
        Wb.each(e,
        function(e, s) {
            if (s && !s.ownerCt && s instanceof Ext.container.Container && !(s instanceof Ext.window.Window)) {
                if (s.itemId == "main") {
                    n = s;
                    return false
                }
                t = Wb.indexOf(i, s.xtype);
                if (t == -1) t = 9;
                r.push([s, t])
            }
        });
        if (n) return n;
        r.sort(function(e, t) {
            return e[1] - t[1]
        });
        return r.length ? r[0][0] : null
    },
    open: function(PortalConfigs) {
        if (PortalConfigs.reloadCard) {
            PortalConfigs.url = Wb.toUrl(PortalConfigs.reloadCard.bindFile);
            PortalConfigs.reload = true
        }
        if (PortalConfigs.download) {
            Wb.download(PortalConfigs.url, PortalConfigs.params);
            return
        }
        if (window.top != window && window.top.Wb) {
            return window.top.Wb.open(PortalConfigs)
        }
        var PortalVars = {};
        PortalVars.xwlCall = Ext.String.startsWith(PortalConfigs.url, "m?xwl=");
        if (PortalConfigs.isModule === undefined) {
            PortalVars.isModule = true;
            PortalConfigs.url.indexOf(".") == -1
        } else PortalVars.isModule = PortalConfigs.isModule;
        if (PortalVars.xwlCall) PortalVars.path = PortalConfigs.url.substring(6) + ".xwl";
        else PortalVars.path = PortalConfigs.url;
        PortalVars.hasHome = Wb.hasNS("sys.home");
        PortalVars.hasIde = Wb.hasNS("sys.ide");
        if (!PortalConfigs.newWin && (Wb.isValue(PortalConfigs.container) || PortalVars.hasHome || PortalVars.hasIde)) {
            if (PortalConfigs.container === false) PortalVars.tab = null;
            else if (PortalConfigs.container) PortalVars.tab = PortalConfigs.container;
            else if (PortalVars.hasIde) PortalVars.tab = Ide.fileTab;
            else PortalVars.tab = sys.home.tab;
            if (PortalVars.tab) {
                if (PortalConfigs.newTab === false || !PortalConfigs.newTab && !PortalConfigs.params) {
                    if (PortalConfigs.reloadCard) PortalVars.card = PortalConfigs.reloadCard;
                    else {
                        PortalVars.card = null;
                        PortalVars.tab.items.each(function(e) {
                            if (e.bindFile == PortalVars.path && e.lastPortalConfigs && !e.lastPortalConfigs.params) {
                                PortalVars.card = e;
                                return false
                            }
                        })
                    }
                    if (PortalVars.card) {
                        if (PortalConfigs.reload) {
                            if (Wb.unloadEvents) delete Wb.unloadEvents[PortalVars.card.id];
                            Ext.applyIf(PortalConfigs, PortalVars.card.lastPortalConfigs);
                            Ext.Object.clear(PortalVars.card.lastPortalVars);
                            PortalVars.card.lastPortalVars = PortalVars;
                            Ext.Object.clear(PortalVars.card.lastPortalConfigs);
                            PortalVars.card.lastPortalConfigs = PortalConfigs;
                            PortalVars.card.removeAll(true)
                        } else {
                            if (!PortalConfigs.notActiveCard) PortalVars.tab.setActiveTab(PortalVars.card);
                            return PortalVars.card
                        }
                    }
                }
                if (!PortalVars.card) {
                    PortalVars.cardConfig = {
                        iconCls: PortalConfigs.iconCls,
                        title: Ext.String.ellipsis(PortalConfigs.title, 20),
                        closable: true,
                        lastPortalVars: PortalVars,
                        lastPortalConfigs: PortalConfigs,
                        hideMode: Ext.isIE ? "offsets": "display",
                        xtype: "panel",
                        hasParams: !!PortalConfigs.params,
                        bindFile: PortalVars.path,
                        border: false,
                        layout: "fit",
                        listeners: {
                            destroy: function(e) {
                                if (Wb.unloadEvents) delete Wb.unloadEvents[e.id]
                            },
                            beforeclose: function(e) {
                                if (Wb.unloadEvents) {
                                    if (Wb.unloadEvents[e.id] && e.confirmClose !== false) {
                                        var t = Wb.unloadEvents[e.id]();
                                        if (Wb.isValue(t)) {
                                            Wb.confirm(t + "<br><br>" + Str.confirmClose,
                                            function() {
                                                e.confirmClose = false;
                                                e.close()
                                            });
                                            return false
                                        }
                                    } else delete Wb.unloadEvents[e.id]
                                }
                            }
                        }
                    };
                    if (PortalConfigs.tooltip || PortalVars.cardConfig.title !== PortalConfigs.title) {
                        PortalVars.cardConfig.tabConfig = {
                            tooltip: PortalConfigs.tooltip || PortalConfigs.title
                        }
                    }
                    PortalVars.card = PortalVars.tab.add(PortalVars.cardConfig)
                }
                if (!PortalConfigs.notActiveCard) PortalVars.tab.setActiveTab(PortalVars.card)
            }
            if (PortalConfigs.frameOnly) return PortalVars.card;
            if (PortalVars.tab && (PortalConfigs.useIFrame || !PortalVars.isModule || PortalConfigs.useIFrame === undefined && PortalVars.card.iframe)) {
                if (!PortalVars.card.iframe) {
                    Wb.insertIframe(PortalVars.card, PortalConfigs.mask)
                }
                PortalVars.card.iframe.submit(PortalConfigs.url, PortalConfigs.params, PortalConfigs.method)
            } else {
                var doRequest = function() {
                    if (Ext.String.endsWith(PortalVars.path, ".xwl")) PortalVars.requestUrl = "m?xwl=" + PortalVars.path.slice(0, -4);
                    else PortalVars.requestUrl = PortalVars.path;
                    return Wb.request({
                        url: PortalVars.requestUrl + (PortalVars.requestUrl.indexOf("?") == -1 ? "?xwlt=1": "&xwlt=1"),
                        mask: PortalVars.card,
                        timeout: -1,
                        showError: false,
                        showMask: PortalConfigs.mask,
                        params: PortalConfigs.params,
                        callback: function(e, t, n) {
                            if (PortalVars.card) {
                                delete PortalVars.card.request;
                                if (!t) {
                                    if (!PortalVars.card.notShowError && PortalConfigs.showError !== false) Wb.except(n);
                                    if (!PortalVars.card.isClosing) {
                                        PortalVars.card.close()
                                    }
                                }
                            } else if (!t && PortalConfigs.showError !== false) Wb.except(n);
                            if (!t && PortalConfigs.failure) {
                                Ext.callback(PortalConfigs.failure, PortalVars.card, [{},
                                n.responseText])
                            }
                        },
                        success: function(PortalResp) {
                            if (PortalResp.responseText) {
                                if (PortalResp.responseText.substring(0, 10) == "(function(" && PortalResp.responseText.slice( - 3) == "();") {
                                    PortalVars.appScope = eval(PortalResp.responseText.slice(0, -2) + "{}, PortalConfigs.contextOwner||PortalVars.card||null);\n//@ sourceURL=" + window.location.href + "/" + PortalVars.path);
                                    PortalVars.entry = Wb.optMain(PortalVars.appScope);
                                    if (PortalVars.card) PortalVars.card.appScope = PortalVars.appScope;
                                    if (PortalVars.card && PortalVars.entry) PortalVars.card.add(PortalVars.entry);
                                    if (PortalConfigs.success) {
                                        Ext.callback(PortalConfigs.success, PortalVars.card, [PortalVars.appScope, PortalResp.responseText])
                                    }
                                } else {
                                    PortalVars.card.add({
                                        xtype: "container",
                                        autoScroll: true,
                                        style: "font-size:13px;line-height:20px;",
                                        padding: 8,
                                        html: Wb.encodeHtml(PortalResp.responseText)
                                    });
                                    if (PortalConfigs.success) {
                                        Ext.callback(PortalConfigs.success, PortalVars.card, [{},
                                        PortalResp.responseText])
                                    }
                                }
                            } else {
                                if (PortalConfigs.success) {
                                    Ext.callback(PortalConfigs.success, PortalVars.card, [{},
                                    ""])
                                }
                            }
                        }
                    })
                };
                if (PortalVars.tab) {
                    if (PortalVars.card.iframe) {
                        PortalVars.card.fireEvent("beforedestroy", PortalVars.card);
                        PortalVars.card.mun(PortalVars.card, "beforedestroy");
                        delete PortalVars.card.iframe
                    }
                    PortalVars.card.update("");
                    PortalVars.card.request = doRequest(PortalVars.card);
                    PortalVars.card.mon(PortalVars.card, "close",
                    function(e) {
                        e.isClosing = true;
                        if (e.request) {
                            var t = e.request.xhr;
                            if (t) {
                                e.notShowError = true;
                                t.abort()
                            }
                        }
                    })
                } else doRequest()
            }
            if (PortalVars.tab) return PortalVars.card
        } else {
            if (Ext.util.Format.uppercase(PortalConfigs.method) == "GET" && !PortalConfigs.params) {
                window.open(PortalConfigs.url)
            } else {
                Wb.submit(PortalConfigs.url, PortalConfigs.params, null, PortalConfigs.method)
            }
        }
    },
    run: function(e) {
        var t = Ext.apply({
            container: false,
            isModule: true
        },
        e);
        Wb.open(t)
    },
    onUnload: function(e, t) {
        if (!Wb.unloadEvents) Wb.unloadEvents = {};
        Wb.unloadEvents[t ? t.id: Wb.getId()] = e
    },
    toUrl: function(e) {
        if (Ext.String.endsWith(e, ".xwl")) return "m?xwl=" + e.slice(0, -4);
        else return e
    },
    close: function(e) {
        if (window.top != window && window.top.Wb) {
            window.top.Wb.close(e);
            return
        }
        var t = Wb.hasNS("sys.home"),
        n = Wb.hasNS("sys.ide");
        if (t || n) {
            var r = t ? sys.home.tab: Ide.fileTab,
            i = r.getActiveTab();
            if (Ext.isBoolean(e)) {
                Ext.suspendLayouts();
                r.items.each(function(t) {
                    if (e || !e && t != i) {
                        t.close()
                    }
                });
                Ext.resumeLayouts(true)
            } else {
                if (e) i = r.child("[bindFile=" + e + "]");
                if (i) {
                    i.close()
                }
            }
        }
    },
    encodeHtml: function(e) {
        if (!Wb.isValue(e)) return "";
        if (Ext.isString(e)) return Ext.htmlEncode(e).replace(/\r?\n/g, "<br>");
        else return e
    },
    addLink: function(e, t, n) {
        function a() {
            var t = e[i++];
            if (typeof t === "string") {
                return {
                    url: t,
                    type: t.slice( - 3).toLowerCase() == ".js" ? "js": "css"
                }
            } else return t
        }
        function f() {
            s++;
            if (s >= o) t();
            else if (n) c()
        }
        function l() {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                this.onreadystatechange = function() {};
                s++;
                if (s >= o) t();
                else if (n) c()
            }
        }
        function c() {
            var e, r = a();
            if (!Wb.loadedLinks) Wb.loadedLinks = {};
            if (Wb.loadedLinks[r.url]) {
                f();
                return
            } else Wb.loadedLinks[r.url] = true;
            if ((r.type || "js").toLowerCase() == "js") {
                e = document.createElement("script");
                e.type = "text/javascript";
                e.src = r.url
            } else {
                e = document.createElement("link");
                e.rel = "stylesheet";
                e.href = r.url
            }
            u[0].appendChild(e);
            if (!t && !n) return;
            if (e.readyState) e.onreadystatechange = l;
            else e.onload = f
        }
        if (!e || e.length === 0) return;
        var r, i = 0,
        s = 0,
        o = e.length,
        u = document.getElementsByTagName("head");
        if (n) c();
        else {
            for (r = 0; r < o; r++) c()
        }
    },
    ns: function(e) {
        var t, n, r, i, s = e.split(".");
        i = window;
        n = s.length;
        for (t = 0; t < n; t++) {
            r = s[t];
            if (!i[r]) i[r] = {};
            i = i[r]
        }
        return i
    },
    hasNS: function(e) {
        var t, n, r, i, s = e.split(".");
        i = window;
        n = s.length;
        for (t = 0; t < n; t++) {
            r = s[t];
            if (!i[r]) return false;
            i = i[r]
        }
        return true
    },
    recordActivity: function(e) {
        if (e.stopRecNav) return;
        var t;
        if (e instanceof Ext.tab.Panel) {
            t = e.getActiveTab();
            if (t) t = t.id;
            else return
        } else {
            t = e.getSelection()[0];
            if (t) t = t.getPath("text", "\n");
            else return
        }
        if (e.backList.length > 49) e.backList.splice(0, 1);
        e.backList.push(t)
    },
    navigate: function(e, t) {
        if (e instanceof Ext.tree.Panel) {
            e.selectPath(t, "text", "\n")
        } else {
            t = Ext.getCmp(t);
            if (t) e.setActiveTab(t);
            else return false
        }
        return true
    },
    back: function(e) {
        if (e.backList.length < 2) return;
        var t = e.backList.pop();
        if (t) {
            if (e.forwardList.length > 49) e.forwardList.splice(0, 1);
            e.forwardList.push(t)
        } else return;
        e.stopRecNav = true;
        while (e.backList.length > 0 && !Wb.navigate(e, e.backList[e.backList.length - 1])) {
            e.backList.pop()
        }
        e.stopRecNav = false
    },
    forward: function(e) {
        var t;
        e.stopRecNav = true;
        while (t = e.forwardList.pop()) {
            if (Wb.navigate(e, t)) break
        }
        e.stopRecNav = false;
        if (t) {
            if (e.backList.length > 49) e.backList.splice(0, 1);
            e.backList.push(t)
        }
    },
    setNavigate: function(e, t, n) {
        e.backList = [];
        e.forwardList = [];
        if (e instanceof Ext.tree.Panel) {
            e.mon(e, "selectionchange",
            function() {
                var e = this;
                Wb.recordActivity(e)
            })
        } else {
            e.mon(e, "tabchange",
            function() {
                var e = this;
                Wb.recordActivity(e)
            })
        }
        t.navComp = e;
        t.mon(t, "click",
        function(e) {
            Wb.back(e.navComp)
        });
        n.navComp = e;
        n.mon(n, "click",
        function(e) {
            Wb.forward(e.navComp)
        })
    },
    getExcel: function(e, t, n) {
        function c() {
            var e, t, n = s.store.proxy.reader.getFields();
            for (e in n) {
                t = n[e];
                l.add(t.name, t.type ? t.type.type: "")
            }
        }
        function h(e, t) {
            var i, s, o;
            for (i in t) {
                s = t[i];
                if (n && s.hidden) continue;
                if (s.type == "rowNumber") {
                    r.xwl_numText = s.text == "&#160;" ? "": s.text;
                    r.xwl_numWidth = s.width
                } else {
                    o = {
                        align: s.align,
                        dataIndex: s.dataIndex,
                        format: s.excelFormat,
                        ptFormat: s.printFormat,
                        jsFormat: s.format,
                        type: l.get(s.dataIndex),
                        width: s.width,
                        hidden: s.hidden,
                        headerAlign: s.headerAlign,
                        wrap: s.autoWrap,
                        text: s.text == "&#160;" ? "": s.text
                    };
                    if (s.keyName) f[s.dataIndex] = s.keyName;
                    if (s.items && s.items.length > 0) {
                        o.columns = [];
                        h(o.columns, s.items.items)
                    }
                    e.push(o)
                }
            }
            return e
        }
        var r = {},
        i = [],
        s = e,
        o,
        u,
        a = s.store.proxy,
        f = {},
        l = new Ext.util.HashMap;
        o = s.store.proxy.reader.rawData;
        if (!o) return;
        o = o.returnResult;
        if (o !== undefined) {
            Wb.message(Str.result + ": " + o);
            return
        }
        Ext.apply(r, a.allParams);
        r.xwl_url = a.url || a.api.read;
        r.xwl_dateformat = Ext.form.field.Date.prototype.format;
        r.xwl_timeformat = Ext.form.field.Time.prototype.format;
        r.xwl_thousandSeparator = Ext.util.Format.thousandSeparator;
        r.xwl_decimalSeparator = Ext.util.Format.decimalSeparator;
        r.xwl_sheet = s.exportSheetname;
        if (s.exportTitle == "-") r.xwl_title = "";
        else r.xwl_title = s.exportTitle || s.title;
        r.xwl_file = s.exportFilename || r.xwl_title;
        r.xwl_feature = s.featureType;
        u = s.store.groupers.items;
        r.xwl_group = u.length > 0 ? u[0].property: "";
        c();
        r.xwl_meta = Wb.encode(h(i, s.columns));
        r.__keyMap = Wb.encode(f);
        if (t) {
            r.start = 0;
            r.limit = Wb.maxInt
        }
        if (n) Wb.submit("main?xwl=preview", r);
        else Wb.download("downloadUrl", r)
    }
};Ext.apply(Wb, {
    show_mc: function(e, t, n, r, i, s, o) {
        if (e instanceof Object) {
            return e.mc
        } else {
            var u = app.grid1.columns[i].getEditor().store.getById(e);
            if (u) {
                return u.data.mc
            } else {
                return e
            }
        }
    },
    show_bool: function(e, t, n, r, i, s, o) {
        return e ? "是": "否"
    },
    show_cjdw: function(e, t, n, r, i, s, o) {
        return e ? e.dwmc: ""
    },
    show_files: function(e, t, n, r, i, s, o) {
        var u = "";
        var a;
        for (var f = 0; f < e.length; f++) {
            a = e[f];
            u += '<a href="../new_towerinfo/downloadDrawing/' + a.id + '">' + a.filename + "</a><br>"
        }
        return u
    },
    show_wgbgs: function(e, t, n, r, i, s, o) {
        var u = "";
        var a;
        var f;
        for (var l = 0; l < e.length; l++) {
            a = e[l];
            f = a.lx;
            var c;
            if (f == "yd") {
                c = "引电"
            }
            if (f == "tt") {
                c = "铁塔"
            }
            if (f == "tj") {
                c = "土建"
            }
            if (f == "pt") {
                c = "配套"
            }
            u += '<a href="../wgbg/download/' + a.id + '">' + c + "</a>&nbsp;"
        }
        return u
    },
    show_tower: function(e, t, n, r, i, s, o) {
        return e.zm
    },
    show_qyjl: function(e, t, n, r, i, s, o) {
        return e.displayName
    }
});
var Str = {
    add: "添加",
    back: "后退",
    cancel: "取消",
    classic: "经典",
    clickChangeVC: "更换验证码",
    clientInvalid: "客户端数据无效。",
    close: "关闭",
    closeAll: "关闭全部",
    closeOthers: "关闭其他",
    collapseSelected: "选择节点全部收缩",
    confirm: "确认",
    confirmClose: "确定要关闭吗？",
    connectFailure: "连接服务器失败。",
    currentModuleList: "当前模块列表",
    dataSaved: "数据已经成功保存。",
    del: "删除",
    del1: "删除",
    displayName: "显示名称",
    download: "下载",
    e400: "无效的请求。",
    e403: "禁止访问请求的资源。",
    e404: "没有找到请求的资源。",
    email: "电子邮件",
    emptyHint: "(空)",
    error: "错误",
    expandSelected: "选择节点全部展开",
    falseStr: "否",
    file: "文件",
    fileUpload: "文件上传",
    find: "查找",
    forbidden: "您没有权限访问 “{0}({1})”。",
    forward: "前进",
    gray: "灰色",
    gridMethodNotFound: '表格方法 "{0}" 没有找到。',
    hasFile: "(文件)",
    inconsistentPwd: "两次密码输入不一致。",
    information: "信息",
    invalidChar: '无效的字符 "{0}"',
    invalidName: '无效的名称 "{0}"',
    invalidPwd: "密码无效。",
    invalidPwdLen: "密码长度不能少于6位。",
    invalidValue: '无效的值 "{0}"。',
    itemExist: '"{0}" 已经存在。',
    itemsInfo: '"{0}" 等 {1} 项',
    lang: "zh",
    language: "语言",
    loadFailure: "加载失败。",
    loading: "加载中，请稍候...",
    login: "登录",
    loginTimes: "登录次数",
    logout: "注销",
    logoutSuccess: "已经成功注销，点击返回。",
    manyConfirm: "确定要{0} “{1}” 等 {2} 条记录吗？",
    modify: "修改",
    myAccount: "我的帐户",
    myApp: "我的应用",
    neptune: "海王星",
    notFound: '没有找到 "{0}"。',
    ok: "确定",
    password: "密码",
    passwordConfirm: "密码确认",
    passwordInvalid: "密码无效。",
    permit: "允许",
    processLogin: "正在登录中，请稍候...",
    processing: "处理中，请稍候...",
    prohibit: "禁止",
    recordsPerPage: "每页记录数",
    refresh: "刷新",
    refreshApps: "刷新应用列表",
    refreshPage: "刷新当前页面",
    refreshWindow: "刷新当前窗口吗？",
    reset: "重置",
    saveDesktop: "保存桌面",
    saveUserName: "保存用户名称",
    search: "搜索",
    selectRecord: "请选择要{0}的记录。",
    serverNotResp: "服务器没有响应，请检查后重试。",
    singleConfirm: "确定要{0} “{1}” 吗？",
    theme: "界面方案",
    toggleSearch: "显示/隐藏搜索框",
    trueStr: "是",
    unknowError: "未知错误。",
    updateNotUnique: "记录更新不唯一。",
    upload: "上传",
    userNotExist: '用户名称 "{0}" 不存在。',
    username: "用户名称",
    vcExpired: "验证码已经过期。",
    vcInvalid: "验证码无效。",
    verifyCode: "验证码",
    warning: "警告",
    expCurToExcel: "导出当前至Excel",
    expAllToExcel: "导出全部至Excel"
};window.ctxPath = function() { / () / .exec("");
    /^http:\/\/.*?(\/.*?)\/.*$/.exec(location.href);
    return RegExp.$1
} ();
var TP = {
    show_tjwgbg: function(e, t, n, r, i, s, o) {
        var u = t.column.dataIndex;
        var a = n.data.wgbgs;
        var f = Wb.find(a, "lx", "tj");
        if (f) {
            return f[u]
        }
    },
    show_ttwgbg: function(e, t, n, r, i, s, o) {
        var u = t.column.dataIndex;
        var a = n.data.wgbgs;
        var f = Wb.find(a, "lx", "tt");
        if (f) {
            return f[u]
        }
    },
    show_ydwgbg: function(e, t, n, r, i, s, o) {
        var u = t.column.dataIndex;
        var a = n.data.wgbgs;
        var f = Wb.find(a, "lx", "yd");
        if (f) {
            return f[u]
        }
    },
    show_ptwgbg: function(e, t, n, r, i, s, o) {
        var u = t.column.dataIndex;
        var a = n.data.wgbgs;
        var f = Wb.find(a, "lx", "pt");
        if (f) {
            return f[u]
        }
    }
}