sap.ui.define([
    "demo/vcpcharconfig/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
    "sap/ui/model/FilterOperator",
    "demo/vcpcharconfig/Utils",
    "sap/ui/core/dnd/DragInfo",
    "sap/ui/core/dnd/DropInfo",
    "sap/ui/core/library",
    "sap/ui/model/Sorter",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/Dialog",
    'sap/ui/export/Spreadsheet',
    "sap/ui/Device",
    "sap/ui/core/Fragment"
],

    function (BaseController, JSONModel, MessageToast, Filter, MessageBox, FilterOperator, Utils, DragInfo, DropInfo, library, Sorter, Spreadsheet, Text, Button, Dialog, Device, Fragment) {
        "use strict";
        var that, oGModel, aResults;
        var aResults


        var that, oGModel1;
        var aResults1;


        var that, oGModel2;
        var aResults2


        var that, oGModel3;
        var aResults3
        var DropLayout = library.dnd.DropLayout;
        var DropPosition = library.dnd.DropPosition;

        return BaseController.extend("demo.vcpcharconfig.controller.Home", {
            onInit: function () {
                that = this;
                that.sKey = "";
                that.getEnable();
                this.PrimarylistModel = new JSONModel();
                this.SeclistModel = new JSONModel();
                this.SearchModel = new JSONModel();
                that.locModel = new JSONModel();
                that.oPartialLocModel = new JSONModel()
                that.prodModel = new JSONModel();
                that.oListModel = new JSONModel();
                that.prodModel1 = new JSONModel();
                that.prodModel1.setSizeLimit(5000);
                that.locModel.setSizeLimit(5000);
                that.oPartialLocModel.setSizeLimit(5000)
                that.oListModel.setSizeLimit(5000);
                this._oCore = sap.ui.getCore();



                if (!this._valueHelpDialogLoc) {
                    this._valueHelpDialogLoc = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.LocDialog",
                        this
                    );
                    this.getView().addDependent(this._valueHelpDialogLoc);
                    //   that.getUsername()
                    // Declaring JSON Model and size limit
                    that.oModel = new JSONModel();
                    this.oModel.setSizeLimit(10000);
                }

                if (!this._valueHelpDialogPartialLoc) {
                    this._valueHelpDialogPartialLoc = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.PartialtabLocation",
                        this
                    );
                    this.getView().addDependent(this._valueHelpDialogPartialLoc);
                    //   that.getUsername()
                    // Declaring JSON Model and size limit
                    that.oModel = new JSONModel();
                    this.oModel.setSizeLimit(10000);
                }


                if (!this._valueHelpDialogProd) {
                    this._valueHelpDialogProd = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.ProdDialog",
                        this
                    );
                    this.getView().addDependent(this._valueHelpDialogProd);
                    //   that.getUsername()
                    // Declaring JSON Model and size limit
                    that.oModel = new JSONModel();
                    this.oModel.setSizeLimit(10000);
                }
                if (!this.valueHelpClasProdDialog) {
                    this.valueHelpClasProdDialog = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.ClasProd",
                        this
                    );
                    this.getView().addDependent(this.valueHelpClasProdDialog);
                }
                if (!this.groupDialog) {
                    this.groupDialog = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.Group",
                        this
                    );
                    this.getView().addDependent(this.groupDialog);
                }

                that.oSelectedItem = "";

                // that.getUser2();
                this.attachDragDrop(); // TEMP COMMENT
                this._oCore = sap.ui.getCore();
                if (!this._valueHelpDialogProd3) {
                    this._valueHelpDialogProd3 = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.ProdDialog3",
                        this
                    );
                    this.getView().addDependent(this._valueHelpDialogProd3);
                }
                that.oSelectedItem = "";
                //  that.attachDragDrop2();  //TEMP COMP
                this._oCore = sap.ui.getCore();
                if (!this._valueHelpDialogProd2) {
                    this._valueHelpDialogProd2 = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.ProdDialog2",
                        this
                    );
                    this.getView().addDependent(this._valueHelpDialogProd2);
                }
                //   that.getEnable1();
                that.oGModel = that.getModel("oGModel");

            },
            attachDragDrop2: function () {
                var oListPrim = this.byId("Primarytable2");
                // adding drag and drop with first list
                oListPrim.addDragDropConfig(new DragInfo({
                    sourceAggregation: "items"
                }));

                oListPrim.addDragDropConfig(new DropInfo({
                    targetAggregation: "items",
                    dropPosition: DropPosition.Between,
                    dropLayout: DropLayout.Vertical,
                    drop: this.onDrop2.bind(this)
                }));

            },
            // function drop list items
            onDrop: function (oInfo) {
                var results = []

                oGModel = this.getModel("oGModel");
                oGModel.setProperty("/primFlag", "");
                var oDragged = oInfo.getParameter("draggedControl"),
                    oDropped = oInfo.getParameter("droppedControl"),
                    sInsertPosition = oInfo.getParameter("dropPosition");
                // if (that.byId("searchField").getValue() !== "") {

                //     var obj = that.byId("Secondarytable").getItems()
                //     for (var i = 0; i < obj.length; i++) {
                //         results.push(obj[i].getBindingContext().getObject())
                //     }
                // }
                // if (that.byId("idPrimarySearch").getValue() !== "") {

                //     var obj1 = that.byId("Primarytable").getItems()
                //     for (var j = 0; j < obj1.length; j++) {
                //         results.push(obj1[j].getBindingContext().getObject())
                //     }
                // }


                var oDragContainer = oDragged.getParent(),
                    oDropContainer = oInfo.getSource().getParent(),

                    oDragModel = oDragContainer.getModel(),
                    oDropModel = oDropContainer.getModel(),
                    oDragModelData = oDragModel.getData(),
                    oDropModelData = oDropModel.getData(),

                    iDragPosition = oDragContainer.indexOfItem(oDragged),
                    iDropPosition = oDropContainer.indexOfItem(oDropped);
                // var Flag = "";
                // if (oDragModelData.results[0].CHAR_TYPE === "P") {
                //     Flag = "X";
                // }
                if (that.authFlag !== "X") {
                    // remove the item
                    if (results.length > 0) {
                        oDragModelData.results = results
                    }
                    var oItem = oDragModelData.results[iDragPosition];
                    oDragModelData.results.splice(iDragPosition, 1);

                    if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
                        iDropPosition--;
                    }

                    if (sInsertPosition === "After") {
                        iDropPosition++;
                    }

                    // insert the control in target aggregation
                    oDropModelData.results.splice(iDropPosition, 0, oItem);

                    if (oDragModel !== oDropModel) {
                        var oChar_Type;
                        var iSeq = 0;
                        if (oItem.CHAR_TYPE === "S") {
                            iSeq = oItem.SEQUENCE;
                            oChar_Type = "P";

                        } else {
                            oChar_Type = "S"
                            iSeq = oItem.SEQUENCE;
                            oGModel.setProperty("/primFlag", "X");
                        }

                        that.getModel("BModel").callFunction("/changeToPrimary", {
                            method: "GET",
                            urlParameters: {
                                // LOCATION_ID: oItem.LOCATION_ID,
                                // LOCATION_ID: "",
                                PRODUCT_ID: oItem.PRODUCT_ID,
                                CHAR_NUM: oItem.CHAR_NUM,
                                SEQUENCE: iSeq,
                                CHAR_TYPE: oChar_Type,
                                GROUP_NAME: "",
                                FLAG: "C",
                            },
                            success: function (oData) {
                                sap.ui.core.BusyIndicator.hide();
                                that.byId("idPrimarySearch").setValue("");
                                that.onPrimarySearch();
                                that.byId("searchField").setValue("");
                                // that.onCharSearch();
                                that.onGetData();
                                if (oGModel.getProperty("/primFlag") === "X") {
                                    that.byId("idText").setVisible(true);
                                    that.byId("idText").addStyleClass("textColour");
                                }
                            },
                            error: function (oData) {
                                sap.ui.core.BusyIndicator.hide();
                                MessageToast.show("Failed to changes the char");
                            },
                        });
                    } else {
                        oDropModel.setData(oDropModelData);

                        if (oDropModelData.results[0].CHAR_TYPE === "P") {
                            var aData = this.byId("Primarytable").getItems();
                        } else if (oDropModelData.results[0].CHAR_TYPE === "S") {
                            var aData = this.byId("Secondarytable").getItems();
                        }

                        // for (var i = 0; i < aData.length; i++) {
                        //     if (oItem.CHAR_NAME === aData[i].getCells()[1].getText()) {
                        //         aData[i].focus();
                        //         aData[i].setSelected(true);
                        //     }
                        // }
                        that.oSelectedItem = oItem.CHAR_NAME
                        that.onSaveSeq(iDropPosition, aData);
                        that.onSaveSeq2(iDropPosition);
                    }
                } else if (that.authFlag === "X") {

                    // Getting the conformation popup before deleting		
                    var text = "Active Planning Details exist. Would you like to continue? \n If yes, please make sure to click on 'Update Primary Char.' button after changes are done.";
                    sap.m.MessageBox.show(
                        text, {

                        title: "Confirmation",
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.YES) {
                                that.authFlag = "";
                                // remove the item
                                if (results.length > 0) {
                                    oDragModelData.results = results
                                }
                                var oItem = oDragModelData.results[iDragPosition];
                                oDragModelData.results.splice(iDragPosition, 1);

                                if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
                                    iDropPosition--;
                                }

                                if (sInsertPosition === "After") {
                                    iDropPosition++;
                                }


                                // insert the control in target aggregation
                                oDropModelData.results.splice(iDropPosition, 0, oItem);

                                if (oDragModel !== oDropModel) {
                                    var oChar_Type;
                                    var iSeq = 0;
                                    if (oItem.CHAR_TYPE === "S") {
                                        iSeq = oItem.SEQUENCE;
                                        oChar_Type = "P";

                                    } else {
                                        oChar_Type = "S"
                                        iSeq = oItem.SEQUENCE;
                                        oGModel.setProperty("/primFlag", "X");
                                    }

                                    that.getModel("BModel").callFunction("/changeToPrimary", {
                                        method: "GET",
                                        urlParameters: {
                                            PRODUCT_ID: oItem.PRODUCT_ID,
                                            CHAR_NUM: oItem.CHAR_NUM,
                                            SEQUENCE: iSeq,
                                            CHAR_TYPE: oChar_Type,
                                            GROUP_NAME: "",
                                            FLAG: "C",
                                        },
                                        success: function (oData) {
                                            sap.ui.core.BusyIndicator.hide();
                                            that.byId("idPrimarySearch").setValue("");
                                            that.onPrimarySearch();
                                            that.byId("searchField").setValue("");
                                            that.onGetData();
                                            if (oGModel.getProperty("/primFlag") === "X") {
                                                that.byId("idText").setVisible(true);
                                                that.byId("idText").addStyleClass("textColour");
                                            }
                                        },
                                        error: function (oData) {
                                            sap.ui.core.BusyIndicator.hide();
                                            MessageToast.show("Failed to changes the char");
                                        },
                                    });
                                } else {
                                    oDropModel.setData(oDropModelData);

                                    if (oDropModelData.results[0].CHAR_TYPE === "P") {
                                        var aData = that.byId("Primarytable").getItems();
                                    } else if (oDropModelData.results[0].CHAR_TYPE === "S") {
                                        var aData = that.byId("Secondarytable").getItems();
                                    }
                                    that.oSelectedItem = oItem.CHAR_NAME
                                    that.onSaveSeq(iDropPosition, aData);
                                    that.onSaveSeq2(iDropPosition);
                                }

                            }

                        }
                    }
                    );

                }
            },

            /* Below function Called when Upload the excel sheet based on Id's */
            onPressBrowse: function (oEvent) {
                var sId = oEvent.getSource();
                if (sId.sId.includes("idMenuSCM")) {
                    that.byId("oSCMRelevent").openFilePicker(oEvent);
                    that.byId("oSCMRelevent").oBrowse.firePress(oEvent);
                } else if (sId.sId.includes("idMenuGroup")) {
                    that.byId("oGroupPrior").openFilePicker(oEvent);
                    that.byId("oGroupPrior").oBrowse.firePress(oEvent);
                }
                else if (sId.sId.includes("idMenuCharPrior")) {
                    that.byId("idoCharPrioritiz").openFilePicker(oEvent);
                    that.byId("idoCharPrioritiz").oBrowse.firePress(oEvent);
                }
                else if (sId.sId.includes("idMenuPartialProd")) {
                    that.byId("idoPartialProd").openFilePicker(oEvent);
                    that.byId("idoPartialProd").oBrowse.firePress(oEvent);
                }
                else if (sId.sId.includes("idMenuAttributes")) {
                    that.byId("idoAttribuets").openFilePicker(oEvent);
                    that.byId("idoAttribuets").oBrowse.firePress(oEvent);
                }

            },

            onAfterRendering: function () {
                that.cFlag = ""
                //   that.oPartialProduct = "Success"
                that.byId("idMenuSCM")._getButtonControl()._getArrowButton().setIcon("sap-icon://slim-arrow-up");
                that.byId("idMenuGroup")._getButtonControl()._getArrowButton().setIcon("sap-icon://slim-arrow-up");
                that.byId("idMenuCharPrior")._getButtonControl()._getArrowButton().setIcon("sap-icon://slim-arrow-up");
                that.byId("idMenuPartialProd")._getButtonControl()._getArrowButton().setIcon("sap-icon://slim-arrow-up");
                that.allData = []
                that.oCheckselected = []
                that.oDropDown = []
                // that.oSItemArr = []
                that.oGModel = that.getModel("oGModel");
                this.oProd = this.byId("idCommon");
                that._valueHelpDialogProd.setTitleAlignment("Center");
                that.skip = 0;
                this.oProdList = this._oCore.byId(
                    this._valueHelpDialogProd.getId() + "-list"
                );
                that.oGModel.setProperty("/refresh", "");
                //    that.oGroupView()
                oGModel1 = this.getModel("oGModel");
                that.oGModel3 = that.getOwnerComponent().getModel("oGModel");
                that.oGModel3.setProperty("/flag", "");
                this.oProdList1 = this._oCore.byId(
                    this._valueHelpDialogProd2.getId() + "-list"
                );
                if (that.sKey === "ClassIBP" || that.sKey === "") {
                    sap.ui.core.BusyIndicator.show();
                    that.getOwnerComponent().getModel("BModel").read("/getUserPreferences", {
                        filters: [
                            new Filter("PARAMETER", FilterOperator.EQ, "MAX_RECORDS")
                        ],
                        success: function (oData) {
                            that.oGModel.setProperty("/MaxCount", oData.results[0].PARAMETER_VALUE);

                            // that.loadIbpClassCharacteristics()
                            // Class IBP Characteristics, works for Configurable Product Value Help F4 BOX
                            that.loadDataforClas();

                        },
                        error: function (oData, error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show(error)
                        },
                    });
                }

            },


            // this function calls in 30k functionality (onInit) & works for Configurable Product Value Help F4 BOX
            loadDataforClas: function () {
                that.oclassIbp = [];
                var topCount = that.oGModel.getProperty("/MaxCount");
                //  sap.ui.core.BusyIndicator.show();
                that.getOwnerComponent().getModel("BModel").read("/getProducts", {
                    // filters: aFilters,
                    urlParameters: {
                        "$skip": that.skip,
                        "$top": topCount
                    },
                    success: function (oData) {
                        // sap.ui.core.BusyIndicator.show();
                        if (topCount == oData.results.length) {
                            that.skip += parseInt(topCount);
                            that.oclassIbp = that.oclassIbp.concat(oData.results);
                            that.loadDataforClas();
                        } else {
                            that.skip = 0;
                            that.oclassIbp = that.oclassIbp.concat(oData.results);

                            that.byId("classSearch").setValue("")
                            let aItems = that.removeDuplicateforProdClas(that.oclassIbp, "PRODUCT_ID")
                            that.oUsePartialDownload = aItems
                            var aModel = new JSONModel()
                            aModel.setData({
                                aItems: aItems
                            })
                            sap.ui.getCore().byId("idClasProd").setModel(aModel)
                        }
                        sap.ui.core.BusyIndicator.hide();

                    },
                    error: function (err) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Error Loading Products Data");
                    }
                });
            },

            validation: function () {
                that.releventCls = [];

                // that.groupsData = [];
                that.charPrioritize = [];
                that.partialProd = [];
                that.IBPAttributes = [];
                that.releventCls = that.clsResults

                /// Characteristic Priority Data
                // if(that.sKey === "CharacteristicPriority"){
                that.getModel("BModel").callFunction("/getCharGroupWeightage", {
                    urlParameters: {
                        PRODUCT_ID: that.oItem
                    },
                    // sorters: [new sap.ui.model.Sorter("WEIGHTAGE", true)],
                    success: function (oData) {
                        var oData = JSON.parse(oData.getCharGroupWeightage)
                        var oDat1 = oData.filter(item => item.CHAR_NUM !== null);
                        oDat1.forEach(el => {
                            if (el.GROUP_NAME !== "" && el.GROUP_NAME !== null) {
                                el.WEIGHTAGE = parseFloat(el.WEIGHTAGE); //parseFloat(el.GROUP_NAME.split('-')[1]);
                            } else {
                                if (el.CHAR_TYPE === "P") {
                                    el.GROUP_NAME = "";
                                    el.WEIGHTAGE = 1;
                                } else {
                                    el.GROUP_NAME = "";
                                    el.WEIGHTAGE = -1;
                                }
                            }
                        });
                        that.charPrioritize = oDat1;
                    },
                    error: function (oData, error) {
                        MessageToast.show("error");
                    },
                });

                // }

                // Partial Products Data
                // if(that.sKey === "PartialProducts"){


                // var data = {
                //     PRODUCT_ID: that.oItem
                // }, finalData = [];
                // finalData.push(data);
                // this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                //     method: "GET",
                //     urlParameters: {
                //         Flag: "X",
                //         PRODATA: JSON.stringify(finalData)
                //     },
                //     success: function (oData) {
                //         that.partialProd =removeDuplicate(oData.results, 'CHAR_NAME');
                //             function removeDuplicate(array, key) {
                //                 var check = new Set();
                //                 return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                //             }
                //     },
                //     error: function (error) {
                //         MessageToast.show("error");
                //     },
                // });

                // }
                that.partialFlag = "X";
                //   that.onGetData3(); TEMP COMP

                // IBP Attributes Data
                // if (that.sKey === "IBPAttributes") {

                // }
            },

            checkValidation: function () {
                if (that.byId("idCommon").getValue() !== "") {

                    if ((that.prev === "" || that.prev === "ClassIBP") && (that.prev !== that.sKey)) {
                        that.cReleventCls = [];
                        that.byId("classList").getItems().forEach(x => {
                            that.cReleventCls.push(x.getBindingContext().getObject())
                        })

                        const commonRelevent = that.releventCls.filter(obj1 =>
                            that.cReleventCls.some(obj2 => (obj1.CLASS_NUM === obj2.CLASS_NUM) && (obj1.IBPCHAR_CHK !== obj2.IBPCHAR_CHK))
                        );

                        if (commonRelevent.length > 0) {
                            that.cFlag = "X";
                        }
                        else {
                            that.cFlag = "";
                        }

                    }

                    if (that.prev === "PrioritizationGrouping" && that.prev !== that.sKey) {
                        that.cFlag = "";
                    }
                    if (that.prev === "CharacteristicPriority" && that.prev !== that.sKey) {
                        const commonCharPrior = that.charPrioritize.filter(obj1 =>
                            that.oSeq.some(obj2 => (obj1.CHAR_NUM === obj2.CHAR_NUM) && (obj1.CHAR_TYPE !== obj2.CHAR_TYPE))
                        );
                        if (commonCharPrior.length > 0) {
                            that.cFlag = "X";
                        }
                        else {
                            const commonCharPriorGroup = that.charPrioritize.filter(obj1 =>
                                that.oSeq.some(obj2 => (obj1.CHAR_NUM === obj2.CHAR_NUM) && (obj1.GROUP_NAME !== obj2.GROUP_NAME))
                            );
                            if (commonCharPriorGroup.length > 0) {
                                that.cFlag = "X";
                            }
                            else {
                                that.cFlag = "";
                            }

                        }
                    }
                    if (that.prev === "PartialProducts" && that.prev !== that.sKey) {

                        that.cPartialProd = [];
                        that.byId("prodList").getItems().forEach(x => {
                            if (x.getSelected() === true) {
                                x.getBindingContext().getObject().sel = true;
                            }
                            else {
                                x.getBindingContext().getObject().sel = false;
                            }
                            that.cPartialProd.push(x.getBindingContext().getObject())
                        })
                        const commonPartialProd = that.partialProd.filter(obj1 =>
                            that.cPartialProd.some(obj2 => (obj1.CHAR_NUM === obj2.CHAR_NUM) && (obj1.CLASS_NUM === obj2.CLASS_NUM) && (obj1.sel !== obj2.sel))
                        );
                        if (commonPartialProd.length > 0) {
                            that.cFlag = "X";
                        }
                        else {
                            that.cFlag = "";

                        }
                    }
                }
                else {
                    that.cFlag = "";
                }

            },

            onGo: function () {
                var oProd = that.byId("idCommon").getValue();
                if (oProd.length === 0) {
                    MessageToast.show("Please select product..")
                    return false;
                }
                if (that.sKey === "ClassIBP" || that.sKey === "") {
                    that.loadIbp();
                }
                else if (that.sKey === "PrioritizationGrouping") {
                    that.oGroupView()
                }
                else if (that.sKey === "CharacteristicPriority") {

                    if (that.byId("idCommon").getValue() != "") {

                        that.oGroupView();
                        that.onResetPress();
                        that.byId("idCommon").setValue(that.oItem);
                        setTimeout(function () {

                            that.CharPrior = [];
                            that.getModel("BModel").callFunction("/getCharGroupWeightage", {
                                urlParameters: {
                                    PRODUCT_ID: that.oItem
                                },
                                success: function (oData) {
                                    var oData = JSON.parse(oData.getCharGroupWeightage)
                                    var oDat1 = oData.filter(item => item.CHAR_NUM !== null);
                                    that.CharPrior = oDat1
                                    that.onGetData();
                                },
                                error: function (oData, error) {
                                    sap.ui.core.BusyIndicator.hide();
                                    MessageToast.show("error");
                                }
                            })
                        }, 10)
                    } else {
                        MessageToast.show("Please select product")
                    }
                }

                else if (that.sKey === "PartialProducts") {
                    sap.ui.core.BusyIndicator.show()
                    that.onGetData3();

                }
                //  else if (that.sKey === "IBPAttributes") {
                //     sap.ui.core.BusyIndicator.show()
                //     that.onGetData2();

                // }
            },

            onGroupEditValidation: function (oEv) {
                var oProd = that.byId("idCommon").getValue();
                var gSelect = oEv.getSource().getBindingContext().getObject();
                this.getModel("BModel").callFunction("/getCharGroupWeightage", {
                    urlParameters: {
                        PRODUCT_ID: oProd
                    },
                    // filters: [
                    //     new Filter("PRODUCT_ID", FilterOperator.EQ, oProd)
                    // ],
                    // sorters: [new sap.ui.model.Sorter("WEIGHTAGE", true)],

                    success: function (oData) {
                        var oData = JSON.parse(oData.getCharGroupWeightage)
                        var oDat1 = oData.filter(item => item.CHAR_NUM !== null);
                        const validGroups = oDat1.filter(obj1 => obj1.GROUP_NAME === gSelect.GROUP_NAME);
                        if (validGroups.length == 0) {
                            that.onGroupEdit(oEv);
                        }
                        else {
                            MessageBox.warning("Selected Group is already assigned to Prioritization. Please go to Characteristic Prioritization and remove assigned group.")
                        }
                    },
                    error: function (oData, error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
            },

            // oPening Group Fragment
            onGroupMaintenance: function (oEv) {
                var prod = that.byId("idCommon").getValue();
                if (prod !== "") {
                    if (!this.groupDialog) {
                        this.groupDialog = sap.ui.xmlfragment(
                            "demo.vcpcharconfig.view.Group",
                            this
                        );
                        this.getView().addDependent(this.groupDialog);
                    }
                    sap.ui.getCore().byId("oDlg").setTitle("Create Group Name")
                    sap.ui.getCore().byId("gCreate").setVisible(true)
                    sap.ui.getCore().byId("gEdit").setVisible(false)
                    var oPrd = that.byId("idCommon").getValue();
                    sap.ui.getCore().byId("oProduct").setValue(oPrd)
                    sap.ui.getCore().byId("oGroupName").setValue("")
                    sap.ui.getCore().byId("oGroupName").setEnabled(true);
                    sap.ui.getCore().byId("oWeightage").setValue("")

                    that.groupDialog.open();
                }
                else {
                    MessageToast.show("Please Select Product..")
                }
            },

            // Group Maintenance Functions
            onGroupEdit: function (oEv) {
                var gSelect = oEv.getSource().getBindingContext().getObject();

                if (!this.groupDialog) {
                    this.groupDialog = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.Group",
                        this
                    );
                    this.getView().addDependent(this.groupDialog);
                }

                if (typeof (gSelect) == "object") {
                    sap.ui.getCore().byId("oDlg").setTitle("Update Group Weightage")
                    sap.ui.getCore().byId("gCreate").setVisible(false)
                    sap.ui.getCore().byId("gEdit").setVisible(true)
                    // sap.ui.getCore().byId("oProduct").setVisible(false)
                    sap.ui.getCore().byId("oProduct").setValue(that.byId("idCommon").getValue())
                    sap.ui.getCore().byId("oGroupName").setValue(gSelect.GROUP_NAME)
                    sap.ui.getCore().byId("oGroupName").setEnabled(false)
                    sap.ui.getCore().byId("oWeightage").setValue(gSelect.WEIGHTAGE)
                } else {

                    //   sap.ui.getCore().byId("oDlg").setTitle("Create Group Name")
                    sap.ui.getCore().byId("gCreate").setVisible(true)
                    sap.ui.getCore().byId("gEdit").setVisible(false)
                    // sap.ui.getCore().byId("oProduct").setVisible(false)
                    sap.ui.getCore().byId("oProduct").setValue(that.byId("idCommon").getValue())
                    sap.ui.getCore().byId("oGroupName").setValue("")
                    sap.ui.getCore().byId("oGroupName").setEnabled(true);
                    sap.ui.getCore().byId("oWeightage").setValue("")
                }

                that.groupDialog.open();
            },

            onEdit: function (oEvent) {
                //   var gSelect = oEvent.getSource().getBindingContext().getObject();
                var oProd = that.byId("idCommon").getValue()
                var GROUP_NAME = sap.ui.getCore().byId("oGroupName").getValue(),
                    WEIGHTAGE = sap.ui.getCore().byId("oWeightage").getValue();
                if (WEIGHTAGE > 1) {
                    var customerGroupData = JSON.stringify([{
                        "PRODUCT_ID": oProd,
                        "GROUP_NAME": GROUP_NAME,
                        "WEIGHTAGE": WEIGHTAGE
                    }])
                    that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                        method: "GET",
                        urlParameters: {
                            Flag: "U",
                            customerGroupData: customerGroupData
                        },
                        success: function (oData) {
                            sap.m.MessageToast.show("Succesfully Updated");
                            that.oGModel.setProperty("/refresh", "X");
                            //  that.onAfterRendering();
                            that.oGroupView()
                            that.onGCancel();
                            that.groupDialog.close();
                            sap.ui.getCore().byId("oGroupName").setValue("");
                            sap.ui.getCore().byId("oWeightage").setValue("");
                            that.onResetPress();
                            that.byId("idCommon").setValue(oProd);
                        },
                        error: function (oData, error) {
                            MessageToast.show("error");
                        },
                    });
                } else {
                    sap.m.MessageToast.show("Enter the Weightage more than 1");
                }

            },

            oGroupDownload: function () {
                var oGProduct = that.byId("idCommon").getValue();
                if (!oGProduct) {
                    MessageToast.show("Select product for downlaod")
                    return false
                }
                var exportToExcel = function () {
                    var aCols = [
                        { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
                        { label: 'GROUP_NAME', property: 'GROUP_NAME', width: 30 },
                        { label: 'WEIGHTAGE', property: 'WEIGHTAGE', width: 30 }

                    ];
                    var oSettings = {
                        workbook: {
                            columns: aCols,
                        },

                        dataSource: that.oGroupNames,
                        fileName: 'Groups Data.xlsx',
                        worker: true
                    };

                    var oSheet = new sap.ui.export.Spreadsheet(oSettings);
                    oSheet.build().then(function () {
                        sap.m.MessageToast.show('Succesfully download');
                    }).finally(function () {
                        oSheet.destroy();
                    });
                };
                // Call the export function to download the Excel file
                exportToExcel();
            },


            onGroupUploadValidation: function (oEv) {
                //when uploading file, we downloaded data using below code
                that.getOwnerComponent().getModel("BModel").read("/getCharacteristicGroups", {
                    success: function (oData) {
                        that.oGpsdownload = oData.results;
                        //   that.oGroupUpload(oEv);
                        var oFileUploader = oEv.getSource();
                        var oFile = oEv.getParameter("files")[0];
                        var oFileName = oFile.name
                        if (oFileName.includes("Groups Data")) {
                            if (oFile) {
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    var data = e.target.result;
                                    var workbook = XLSX.read(data, { type: 'binary' });
                                    var firstSheetName = workbook.SheetNames[0];
                                    var worksheet = workbook.Sheets[firstSheetName];
                                    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                                    // Process the JSON data
                                    that.oGroupUpload(jsonData);
                                };
                                reader.readAsBinaryString(oFile);
                            }
                        } else {
                            MessageToast.show("Upload valid Groups file")
                            sap.ui.core.BusyIndicator.hide();
                            return false
                        }
                    },
                    error: function (oData, error) {
                        MessageToast.show("error");
                    },
                });
            },

            oGroupUpload: function (aData) {

                var header = aData[0];       // excel uploaded labels
                var excData = aData.slice(1); // excel uploaded data

                that.oGDel = [];
                var oExcel = []
                for (var i = 0; i < excData.length; i++) {
                    if (excData[i][0] != undefined) {
                        oExcel.push(excData[i])
                    }
                }
                // assigning properties from uploading file and stored into that.oGDel 
                for (var i = 0; i < oExcel.length; i++) {
                    //   if (excData[i].length != 0) {
                    var obj = {
                        PRODUCT_ID: oExcel[i][0],
                        GROUP_NAME: oExcel[i][1],
                        WEIGHTAGE: parseFloat(oExcel[i][2])
                    }
                    that.oGDel.push(obj)
                    //  }
                }
                that.excData = oExcel
                // var oProd = that.byId("idCommon").getValue();
                var oFinData = []
                for (var i = 0; i < that.oGDel.length; i++) {
                    //      if (that.oGDel[i].PRODUCT_ID != undefined) {
                    var obj = {
                        PRODUCT_ID: that.oGDel[i].PRODUCT_ID
                    }
                    oFinData.push(obj)
                    //    }
                }

                let oMatchedData = that.oGDel.filter(availChar =>
                    !that.oGpsdownload.some(partialData =>
                        partialData.PRODUCT_ID === availChar.PRODUCT_ID &&
                        partialData.GROUP_NAME === availChar.GROUP_NAME &&
                        parseFloat(partialData.WEIGHTAGE) === availChar.WEIGHTAGE
                    )
                );
                var finalData = removeDuplicateProd(oMatchedData, 'PRODUCT_ID');
                function removeDuplicateProd(array, key) {
                    var check = new Set();
                    return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                }
                var allprods = []
                for (var i = 0; i < finalData.length; i++) {
                    allprods.push(finalData[i].PRODUCT_ID)
                }
                that.oStoreddata = []
                for (var n = 0; n < allprods.length; n++) {
                    that.getModel("BModel").callFunction("/getCharGroupWeightage", {
                        urlParameters: {
                            PRODUCT_ID: allprods[n]
                        },
                        success: function (oData) {
                            var oData = JSON.parse(oData.getCharGroupWeightage)
                            var oDat1 = oData.filter(item => item.CHAR_NUM !== null);
                            that.oStoreddata = that.oStoreddata.concat(oDat1)
                            that.oGroupExcelData();
                        },
                        error: function (oData, error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });
                }

            },

            oGroupExcelData: function () {

                that.changes = [];
                that.resultArray1 = [];

                const validationErrors = []; // Store validation error messages

                const weightageSet = new Set(); // To track globally unique WEIGHTAGE
                const globalData = that.oGpsdownload //that.oGroupNames;

                that.excData.forEach((entry, index) => {
                    const [PRODUCT_ID, GROUP_NAME, WEIGHTAGE] = entry;
                    var chnageValidation = []
                    var obj = { PRODUCT_ID, GROUP_NAME, WEIGHTAGE }

                    // Check if all required fields are present
                    if (!PRODUCT_ID || !GROUP_NAME || WEIGHTAGE === undefined) {
                        validationErrors.push(
                            `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
                        );
                        chnageValidation.push(
                            `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
                        );
                        return;
                    }

                    // Validate WEIGHTAGE > 1
                    if (parseFloat(WEIGHTAGE) <= 1) {
                        validationErrors.push(
                            `WEIGHTAGE must be greater than 1 for PRODUCT_ID: ${PRODUCT_ID}, GROUP_NAME: ${GROUP_NAME}`
                        );
                        chnageValidation.push(
                            `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
                        );
                    }

                    if (isNaN(WEIGHTAGE)) {
                        validationErrors.push(
                            `WEIGHTAGE must be Integer for PRODUCT_ID: ${PRODUCT_ID}, GROUP_NAME: ${GROUP_NAME}, WEIGHTAGE:${WEIGHTAGE}`
                        );
                        chnageValidation.push(
                            `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
                        );
                    }


                    const dup = globalData.filter(obj1 =>
                        obj1.WEIGHTAGE === parseFloat(WEIGHTAGE)

                    )
                    if (dup.length > 0) {
                        validationErrors.push(
                            `Duplicate WEIGHTAGE found for PRODUCT_ID: ${PRODUCT_ID}, GROUP_NAME: ${GROUP_NAME}, WEIGHTAGE:${WEIGHTAGE}`
                        );
                        chnageValidation.push(
                            `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
                        );
                        return false;
                    }
                    const exstGroup = globalData.filter(obj1 =>
                        obj1.GROUP_NAME === GROUP_NAME && !isNaN(WEIGHTAGE)// &&  obj1.WEIGHTAGE !== parseFloat(WEIGHTAGE)

                    )
                    exstGroup.forEach(x => {
                        that.changes.push(x);
                    })
                    if (chnageValidation.length == 0) {
                        that.resultArray1.push(obj);
                    }

                });

                if (that.changes.length > 0) {
                    const assignedGroups = that.changes.filter(obj1 =>
                        // that.groupUploadValidData
                        that.oStoreddata.some(obj2 => obj1.GROUP_NAME === obj2.GROUP_NAME)
                    )

                    if (assignedGroups.length > 0) {
                        assignedGroups.forEach(x => {
                            validationErrors.push(
                                `Updation for this PRODUCT_ID: ${x.PRODUCT_ID}, GROUP_NAME: ${x.GROUP_NAME}, WEIGHTAGE:${x.WEIGHTAGE} already in Prioritazition`
                            );
                        })
                        if (that.resultArray1.length > 0) {
                            that.nonAssgn = that.resultArray1.filter(ele1 =>
                                assignedGroups.some(ele2 => ele1.GROUP_NAME !== ele2.GROUP_NAME)
                            )
                        }
                        const endData = that.changes.filter(cc =>
                            that.nonAssgn.some(dd => cc.GROUP_NAME === dd.GROUP_NAME)
                        )

                        that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                            method: "GET",
                            urlParameters: {
                                Flag: "D",
                                customerGroupData: JSON.stringify(endData)
                            },
                            success: function (oData) {
                                that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                                    method: "GET",
                                    urlParameters: {
                                        Flag: "C",
                                        customerGroupData: JSON.stringify(that.nonAssgn)
                                    },
                                    success: function (oData) {
                                        // if(validationErrors.length>0){
                                        //     MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n") + "Remaining Data Uploaded Successfully.");
                                        // }
                                        // MessageBox.alert("Found duplicates / non integer / already prioritized weightages from uploaded file."
                                        //     + ("\n") + " Remaining data uploaded successfully") 17-02-25 commented
                                        // sap.m.MessageToast.show("Data Uploaded Succesfully");
                                        that.oGModel.setProperty("/refresh", "X");
                                        that.missedObjects = [];
                                        that.missedObjects = that.oGroupNames.filter(groupItem =>
                                            !that.oGDel.some(delItem =>
                                                delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
                                                delItem.GROUP_NAME === groupItem.GROUP_NAME &&
                                                delItem.WEIGHTAGE === groupItem.WEIGHTAGE
                                            )
                                        );
                                        // Remove objects with empty PRODUCT_ID

                                        if (that.missedObjects.length > 1) {
                                            that.missedObjects = that.missedObjects.filter(obj => obj.PRODUCT_ID);
                                            that.onGroupDeleteValidation()
                                        }
                                        that.oGroupView()
                                    },
                                    error: function (oData, error) {
                                        MessageToast.show("error");
                                    },
                                });

                            },
                            error: function (oData, error) {
                                MessageToast.show("error");
                            },
                        });

                        // // MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n") + "Please remove from prioritization and upload again.");
                        // MessageBox.alert("Found Duplicates or Non Integer or already Prioritized Weightages from uploaded file."
                        //     + ("\n")+" Remaining Data Uploaded Successfully")
                        // // sap.m.MessageToast.show("Data Uploaded Succesfully");
                    }
                    else {
                        that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                            method: "GET",
                            urlParameters: {
                                Flag: "D",
                                customerGroupData: JSON.stringify(that.changes)
                            },
                            success: function (oData) {
                                that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                                    method: "GET",
                                    urlParameters: {
                                        Flag: "C",
                                        customerGroupData: JSON.stringify(that.resultArray1)
                                    },
                                    success: function (oData) {
                                        // if(validationErrors.length>0){
                                        //     MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n") + "Remaining Data Uploaded Successfully.");
                                        // }
                                        // MessageBox.alert("Found Duplicates / Non Integer / already Prioritized Weightages from uploaded file."
                                        //     + ("\n") + " Remaining Data Uploaded Successfully")
                                        // sap.m.MessageToast.show("Data Uploaded Succesfully");
                                        that.oGModel.setProperty("/refresh", "X");
                                        that.missedObjects = [];
                                        that.missedObjects = that.oGpsdownload.filter(groupItem =>
                                            !that.oGDel.some(delItem =>
                                                delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
                                                delItem.GROUP_NAME === groupItem.GROUP_NAME &&
                                                delItem.WEIGHTAGE === groupItem.WEIGHTAGE
                                            )
                                        );
                                        // Remove objects with empty PRODUCT_ID

                                        if (that.missedObjects.length > 1) {
                                            that.missedObjects = that.missedObjects.filter(obj => obj.PRODUCT_ID);
                                            that.onGroupDeleteValidation()
                                        }
                                        that.oGroupView()


                                    },
                                    error: function (oData, error) {
                                        MessageToast.show("error");
                                    },
                                });

                            },
                            error: function (oData, error) {
                                MessageToast.show("error");
                            },
                        });
                    }

                }
                else if (that.resultArray1.length == 0) {
                    MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n"));
                }
                else {
                    that.oExcelGroup();
                }
                //   that.oGroupNames
                // }

            },


            // onGroupUploadValidation: function (oEv) {
            //     var oProd = that.byId("idCommon").getValue();
            //     that.getModel("BModel").callFunction("/getCharGroupWeightage", {
            //         // urlParameters: {
            //         //     PRODUCT_ID: oProd
            //         // },

            //         success: function (oData) {
            //             var oData = JSON.parse(oData.getCharGroupWeightage)
            //             var oDat1 = oData.filter(item => item.CHAR_NUM !== null);
            //             that.groupUploadValidData = oDat1;
            //             that.oGroupUpload(oEv);
            //         },
            //         error: function (oData, error) {
            //             sap.ui.core.BusyIndicator.hide();
            //             MessageToast.show("error");
            //         },
            //     });
            // },

            // oGroupUpload: function (oEvent) {
            //     var oFileUploader = oEvent.getSource();
            //     var oFile = oEvent.getParameter("files")[0];
            //     var oFileName = oFile.name

            //     if (oFileName.includes("Groups Data")) {

            //         if (oFile) {
            //             var reader = new FileReader();
            //             reader.onload = function (e) {
            //                 var data = e.target.result;
            //                 var workbook = XLSX.read(data, { type: 'binary' });
            //                 var firstSheetName = workbook.SheetNames[0];
            //                 var worksheet = workbook.Sheets[firstSheetName];
            //                 var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            //                 // Process the JSON data
            //                 that.oGroupExcelData(jsonData);
            //             };
            //             reader.readAsBinaryString(oFile);
            //         }
            //     } else {
            //         MessageToast.show("Upload valid Groups file")
            //         sap.ui.core.BusyIndicator.hide();
            //         return false
            //     }

            // },


            // oGroupExcelData: function (aData) {
            //     // const mainData = that.oGroupNames;
            //     var header = aData[0];       // excel uploaded labels
            //     var excData = aData.slice(1); // excel uploaded data
            //     that.oGDel = [];

            //     // assigning properties from uploading file and stored into that.oGDel 
            //     for (var i = 0; i < excData.length; i++) {

            //         var obj = {
            //             PRODUCT_ID: excData[i][0],
            //             GROUP_NAME: excData[i][1],
            //             WEIGHTAGE: parseFloat(excData[i][2])
            //         }
            //         that.oGDel.push(obj)
            //     }

            //     // that.missedObjects = that.oGroupNames.filter(groupItem =>
            //     //     !that.oGDel.some(delItem =>
            //     //         delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
            //     //         delItem.GROUP_NAME === groupItem.GROUP_NAME &&
            //     //         delItem.WEIGHTAGE === groupItem.WEIGHTAGE
            //     //     )
            //     // );
            //     // // Remove objects with empty PRODUCT_ID

            //     // if (that.missedObjects.length > 1) {
            //     //     that.missedObjects = that.missedObjects.filter(obj => obj.PRODUCT_ID);
            //     //     that.onGroupDeleteValidation()
            //     // }


            //     that.changes = [];
            //     that.resultArray1 = [];

            //     const validationErrors = []; // Store validation error messages

            //     const weightageSet = new Set(); // To track globally unique WEIGHTAGE
            //     const globalData = that.oGroupNames;

            //     excData.forEach((entry, index) => {
            //         const [PRODUCT_ID, GROUP_NAME, WEIGHTAGE] = entry;
            //         var chnageValidation = []
            //         var obj = { PRODUCT_ID, GROUP_NAME, WEIGHTAGE }

            //         // Check if all required fields are present
            //         if (!PRODUCT_ID || !GROUP_NAME || WEIGHTAGE === undefined) {
            //             validationErrors.push(
            //                 `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
            //             );
            //             chnageValidation.push(
            //                 `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
            //             );
            //             return;
            //         }

            //         // Validate WEIGHTAGE > 1
            //         if (parseFloat(WEIGHTAGE) <= 1) {
            //             validationErrors.push(
            //                 `WEIGHTAGE must be greater than 1 for PRODUCT_ID: ${PRODUCT_ID}, GROUP_NAME: ${GROUP_NAME}`
            //             );
            //             chnageValidation.push(
            //                 `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
            //             );
            //         }

            //         if (isNaN(WEIGHTAGE)) {
            //             validationErrors.push(
            //                 `WEIGHTAGE must be Integer for PRODUCT_ID: ${PRODUCT_ID}, GROUP_NAME: ${GROUP_NAME}, WEIGHTAGE:${WEIGHTAGE}`
            //             );
            //             chnageValidation.push(
            //                 `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
            //             );
            //         }

            //         const dup = globalData.filter(obj1 =>
            //             obj1.WEIGHTAGE === parseFloat(WEIGHTAGE)

            //         )
            //         if (dup.length > 0) {
            //             validationErrors.push(
            //                 `Duplicate WEIGHTAGE found for PRODUCT_ID: ${PRODUCT_ID}, GROUP_NAME: ${GROUP_NAME}, WEIGHTAGE:${WEIGHTAGE}`
            //             );
            //             chnageValidation.push(
            //                 `Missing fields in entry at index ${index + 1}: ${JSON.stringify(entry)}`
            //             );
            //             return false;
            //         }
            //         const exstGroup = globalData.filter(obj1 =>
            //             obj1.GROUP_NAME === GROUP_NAME && !isNaN(WEIGHTAGE)// &&  obj1.WEIGHTAGE !== parseFloat(WEIGHTAGE)

            //         )
            //         exstGroup.forEach(x => {
            //             that.changes.push(x);
            //         })
            //         if (chnageValidation.length == 0) {
            //             that.resultArray1.push(obj);
            //         }

            //     });


            //     if (that.changes.length > 0) {
            //         const assignedGroups = that.changes.filter(obj1 =>
            //             that.groupUploadValidData.some(obj2 => obj1.GROUP_NAME === obj2.GROUP_NAME)
            //         )

            //         if (assignedGroups.length > 0) {
            //             assignedGroups.forEach(x => {
            //                 validationErrors.push(
            //                     `Updation for this PRODUCT_ID: ${x.PRODUCT_ID}, GROUP_NAME: ${x.GROUP_NAME}, WEIGHTAGE:${x.WEIGHTAGE} already in Prioritazition`
            //                 );
            //             })
            //             if (that.resultArray1.length > 0) {
            //                 that.nonAssgn = that.resultArray1.filter(ele1 =>
            //                     assignedGroups.some(ele2 => ele1.GROUP_NAME !== ele2.GROUP_NAME)
            //                 )
            //             }
            //             const endData = that.changes.filter(cc =>
            //                 that.nonAssgn.some(dd => cc.GROUP_NAME === dd.GROUP_NAME)
            //             )

            //             that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
            //                 method: "GET",
            //                 urlParameters: {
            //                     Flag: "D",
            //                     customerGroupData: JSON.stringify(endData)
            //                 },
            //                 success: function (oData) {
            //                     that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
            //                         method: "GET",
            //                         urlParameters: {
            //                             Flag: "C",
            //                             customerGroupData: JSON.stringify(that.nonAssgn)
            //                         },
            //                         success: function (oData) {
            //                             // if(validationErrors.length>0){
            //                             //     MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n") + "Remaining Data Uploaded Successfully.");
            //                             // }
            //                             // MessageBox.alert("Found duplicates / non integer / already prioritized weightages from uploaded file."
            //                             //     + ("\n") + " Remaining data uploaded successfully") 17-02-25 commented
            //                             // sap.m.MessageToast.show("Data Uploaded Succesfully");
            //                             that.oGModel.setProperty("/refresh", "X");
            //                             that.missedObjects = that.oGroupNames.filter(groupItem =>
            //                                 !that.oGDel.some(delItem =>
            //                                     delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
            //                                     delItem.GROUP_NAME === groupItem.GROUP_NAME &&
            //                                     delItem.WEIGHTAGE === groupItem.WEIGHTAGE
            //                                 )
            //                             );
            //                             // Remove objects with empty PRODUCT_ID

            //                             if (that.missedObjects.length > 1) {
            //                                 that.missedObjects = that.missedObjects.filter(obj => obj.PRODUCT_ID);
            //                                 that.onGroupDeleteValidation()
            //                             }
            //                             that.oGroupView()
            //                         },
            //                         error: function (oData, error) {
            //                             MessageToast.show("error");
            //                         },
            //                     });

            //                 },
            //                 error: function (oData, error) {
            //                     MessageToast.show("error");
            //                 },
            //             });

            //             // // MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n") + "Please remove from prioritization and upload again.");
            //             // MessageBox.alert("Found Duplicates or Non Integer or already Prioritized Weightages from uploaded file."
            //             //     + ("\n")+" Remaining Data Uploaded Successfully")
            //             // // sap.m.MessageToast.show("Data Uploaded Succesfully");
            //         }
            //         else {
            //             that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
            //                 method: "GET",
            //                 urlParameters: {
            //                     Flag: "D",
            //                     customerGroupData: JSON.stringify(that.changes)
            //                 },
            //                 success: function (oData) {
            //                     that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
            //                         method: "GET",
            //                         urlParameters: {
            //                             Flag: "C",
            //                             customerGroupData: JSON.stringify(that.resultArray1)
            //                         },
            //                         success: function (oData) {
            //                             // if(validationErrors.length>0){
            //                             //     MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n") + "Remaining Data Uploaded Successfully.");
            //                             // }
            //                             MessageBox.alert("Found Duplicates / Non Integer / already Prioritized Weightages from uploaded file."
            //                                 + ("\n") + " Remaining Data Uploaded Successfully")
            //                             // sap.m.MessageToast.show("Data Uploaded Succesfully");
            //                             that.oGModel.setProperty("/refresh", "X");
            //                             that.missedObjects = that.oGroupNames.filter(groupItem =>
            //                                 !that.oGDel.some(delItem =>
            //                                     delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
            //                                     delItem.GROUP_NAME === groupItem.GROUP_NAME &&
            //                                     delItem.WEIGHTAGE === groupItem.WEIGHTAGE
            //                                 )
            //                             );
            //                             // Remove objects with empty PRODUCT_ID

            //                             if (that.missedObjects.length > 1) {
            //                                 that.missedObjects = that.missedObjects.filter(obj => obj.PRODUCT_ID);
            //                                 that.onGroupDeleteValidation()
            //                             }
            //                             that.oGroupView()


            //                         },
            //                         error: function (oData, error) {
            //                             MessageToast.show("error");
            //                         },
            //                     });

            //                 },
            //                 error: function (oData, error) {
            //                     MessageToast.show("error");
            //                 },
            //             });
            //         }

            //     }
            //     else if (that.resultArray1.length == 0) {
            //         MessageBox.warning(validationErrors.join("\n") + ("\n") + ("\n"));
            //     }
            //     else {
            //         that.oExcelGroup();
            //     }


            // },


            oExcelGroup: function () {
                that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                    method: "GET",
                    urlParameters: {
                        Flag: "C",
                        customerGroupData: JSON.stringify(that.resultArray1)
                    },
                    success: function (oData) {
                        sap.m.MessageToast.show("Succesfully created");
                        that.oGModel.setProperty("/refresh", "X");
                        that.oGroupView()

                    },
                    error: function (oData, error) {
                        MessageToast.show("error");
                    },
                });
            },

            //Creating Groups
            onGroupCreate: function () {
                var oProd = that.byId("idCommon").getValue();
                var oGroupName = sap.ui.getCore().byId("oGroupName").getValue(),
                    oWeightage = parseFloat(sap.ui.getCore().byId("oWeightage").getValue());
                // if(that.gData.length === 0){

                // }

                const results = that.gData.filter(obj1 => obj1.GROUP_NAME == oGroupName || parseFloat(obj1.WEIGHTAGE) == oWeightage)
                if (results.length > 0) {
                    MessageBox.alert("Group Name or Weightage is already taken Choose different")
                }
                else if (oWeightage <= 1) {
                    MessageBox.alert("Weightage must be more than 1")
                }
                else {
                    var customerGroupData = JSON.stringify([
                        {
                            "PRODUCT_ID": oProd,
                            "GROUP_NAME": oGroupName,
                            "WEIGHTAGE": oWeightage
                        }
                    ])

                    that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                        method: "GET",
                        urlParameters: {
                            Flag: "C",
                            customerGroupData: customerGroupData
                        },
                        success: function (oData) {
                            sap.m.MessageToast.show("Succesfully created");
                            that.oGModel.setProperty("/refresh", "X");
                            that.oGroupView()
                            that.onGCancel();
                            that.onResetPress();
                            that.byId("idCommon").setValue(oProd);

                        },
                        error: function (oData, error) {
                            MessageToast.show("error");
                        },
                    });
                }

            },

            // Group Deleting Funtion
            onGroupDeleteValidation: function (oEv) {
                var oProd = that.byId("idCommon").getValue();
                if (oEv) {
                    var gSelect = []
                    gSelect.push(oEv.getSource().getBindingContext().getObject());
                } else {
                    var gSelect = that.missedObjects;
                }
                this.getModel("BModel").callFunction("/getCharGroupWeightage", {
                    urlParameters: {

                        PRODUCT_ID: oProd
                    },
                    // sorters: [new sap.ui.model.Sorter("WEIGHTAGE", true)],

                    success: function (oData) {
                        var oData = JSON.parse(oData.getCharGroupWeightage)
                        var oDat1 = oData.filter(item => item.CHAR_NUM !== null);
                        //    const validGroups = oData.results.filter(obj1 => obj1.GROUP_NAME === gSelect.GROUP_NAME);
                        const validGroups = oDat1.filter(obj1 =>
                            gSelect.some(obj2 =>
                                obj1.GROUP_NAME === obj2.GROUP_NAME &&
                                obj1.PRODUCT_ID === obj2.PRODUCT_ID
                            )
                        );

                        if (validGroups.length == 0) {
                            that.onGroupDelete(oEv);
                        }
                        else {
                            MessageBox.alert("Selected group is already assigned to prioritization. Please go to characteristic prioritization and remove assigned group.."
                                + ("\n") + " Would you like to update the remaining data..")
                            //   MessageBox.warning("Selected group is already assigned to prioritization. Please go to characteristic prioritization and remove assigned group.")
                        }
                    },
                    error: function (oData, error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
            },

            // Group Deleting Funtion
            onGroupDelete: function (oEvent) {
                var oProd = that.byId("idCommon").getValue();
                if (oEvent) {
                    var gSelect = []
                    gSelect.push(oEvent.getSource().getBindingContext().getObject());
                } else {
                    var gSelect = that.missedObjects;
                }
                //   var gSelect = oEvent.getSource().getBindingContext().getObject();
                // var gSelect = oEvent;
                // var customerGroupData = JSON.stringify([{
                //     "PRODUCT_ID": oProd,
                //     "GROUP_NAME": gSelect.GROUP_NAME,
                //     "WEIGHTAGE": gSelect.WEIGHTAGE
                // }])
                // based on array
                var customerGroupData = JSON.stringify(
                    gSelect.map(item => ({
                        "PRODUCT_ID": oProd,   // Keeping the same product ID for all
                        "GROUP_NAME": item.GROUP_NAME,
                        "WEIGHTAGE": item.WEIGHTAGE
                    }))
                );

                console.log(customerGroupData);

                MessageBox.confirm("Do you want to delete this group ?", {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (sAction) {
                        sap.ui.core.BusyIndicator.show();
                        if (sAction === "YES") {
                            that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                                method: "GET",
                                urlParameters: {
                                    Flag: "D",
                                    customerGroupData: customerGroupData
                                },
                                success: function (oData) {
                                    sap.m.MessageToast.show("Group deleted succesfully.");
                                    that.oGModel.setProperty("/refresh", "X");
                                    that.oGroupView();
                                    sap.ui.core.BusyIndicator.hide();
                                    that.onResetPress();
                                    that.byId("idCommon").setValue(oProd);
                                    //   that.onAfterRendering();
                                },
                                error: function (oData) {
                                    MessageToast.show("error");
                                    sap.ui.core.BusyIndicator.hide();
                                },
                            });
                        }
                        else {
                            sap.ui.core.BusyIndicator.hide();
                            sap.m.MessageToast.show("Deletion cancelled.")
                        }
                    },
                    dependentOn: this.getView()
                });

            },

            onGCancel: function () {
                that.groupDialog.close();
                sap.ui.getCore().byId("oGroupName").setValue("")
                sap.ui.getCore().byId("oWeightage").setValue("")
            },

            // After click by go data shown by this function
            oGroupView: function () {
                that.oGroupNames = [];
                var UidFilModel = new sap.ui.model.json.JSONModel();
                UidFilModel.setData({
                    groupresults: that.oGroupNames
                });
                var oProduct = that.byId("idCommon").getValue();

                that.byId("SelectOption").setModel(UidFilModel);
                sap.ui.core.BusyIndicator.show();

                that.getOwnerComponent().getModel("BModel").read("/getCharacteristicGroups", {
                    filters: [
                        new Filter("PRODUCT_ID", FilterOperator.EQ, oProduct)
                    ],

                    success: function (oData) {
                        that.cFlag = ""
                        sap.ui.core.BusyIndicator.hide();
                        that.gData = oData.results;
                        that.oGroupNames = oData.results
                        var aModel = new JSONModel();
                        oData.results.forEach(x => {
                            x.WEIGHTAGE = parseFloat(x.WEIGHTAGE)
                        })
                        aModel.setData({
                            results: oData.results
                        })
                        that.byId("Group").setModel(aModel);

                        // For group Dropdown function 
                        var UidFilModel = new sap.ui.model.json.JSONModel();
                        var obj = {
                            GROUP_NAME: "",
                            WEIGHTAGE: ""
                        }
                        that.oGroupNames.push(obj);
                        UidFilModel.setData({
                            groupresults: that.oGroupNames
                        });

                        that.byId("SelectOption").setModel(UidFilModel)
                    },
                    error: function (oData, error) {
                        MessageToast.show("error");
                    },
                });
            },

            // Grouping Tab search
            onGroupSearch: function (oEvent) {
                if (oEvent) {
                    // var sQuery = (oEvent.getParameter("value") || oEvent.getParameter("newValue")).toUpperCase();
                    var sQuery = (oEvent.getParameter("value") || oEvent.getParameter("newValue").toUpperCase())
                } else {
                    var sQuery = (that.byId("groupSearch").getValue()).toUpperCase();
                }
                //this.byId("idPrimarySearch").getValue(), // Fetch the search query
                var oFilters = []; // Array to store filters

                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : ""; // Trim the query to remove whitespace

                var Tempdata = JSON.parse(JSON.stringify(that.oGroupNames));

                var filterData = Tempdata.filter(el => el.GROUP_NAME.toUpperCase().includes(sQuery) || parseFloat(el.WEIGHTAGE) == (sQuery));
                var oGroupModel = new JSONModel()

                oGroupModel.setData({
                    results: filterData,
                });
                oGroupModel.setSizeLimit(5000);
                that.byId("Group").setModel(oGroupModel);

            },


            onTabSelect: async function (oEv) {
                // var selectedKey = oEvent.getParameter("selectedKey");
                // var oModel = that.getView().getModel("BModel");

                // // Update the model to track the selected tab
                // oModel.setProperty("/selectedTab", selectedKey);

                var sKey = oEv.getSource().getSelectedKey();
                that.prev = that.sKey;
                var cProd = that.byId("idCommon").getValue();
                that.sKey = sKey;

                try {
                    await that.checkValidation();

                    if (that.cFlag !== "X") {
                        //Loading SCM Relavent Class Data
                        if (sKey === "ClassIBP" || sKey === "") {
                            that.sKey = "ClassIBP";
                            that.byId("idReset").setVisible(true);
                            if (cProd !== "") {
                                that.loadIbp();
                                // that.handleSearch2();
                                that.handleSelectionForProdClas();
                            }
                            else {
                                that.loadIbp();
                            }
                        }
                        //Loading Prioritization Grouping Data
                        else if (sKey === "PrioritizationGrouping") {
                            that.getOwnerComponent().getModel("BModel").read("/getCharacteristicGroups", {
                                success: function (oData) {
                                    that.oAllGrData = oData.results
                                },
                                error: function (oData, error) {
                                    MessageToast.show("error");
                                },
                            });
                            that.sKey = sKey;
                            if (cProd !== "") {
                                that.CharPrior = [];
                                that.getOwnerComponent().getModel("BModel").read("/getCharacteristicGroups", {
                                    filters: [
                                        new Filter("PRODUCT_ID", FilterOperator.EQ, cProd)
                                    ],
                                    success: function (oData) {
                                        that.gData = oData.results;
                                        that.oGroupNames = oData.results
                                        var aModel = new JSONModel();
                                        oData.results.forEach(x => {
                                            x.WEIGHTAGE = parseFloat(x.WEIGHTAGE)
                                        })
                                        aModel.setData({
                                            results: oData.results
                                        })
                                        that.byId("Group").setModel(aModel);

                                        // For group Dropdown function 
                                        var UidFilModel = new sap.ui.model.json.JSONModel();
                                        var obj = {
                                            PRODUCT_ID: "",
                                            GROUP_NAME: "",
                                            WEIGHTAGE: ""
                                        }
                                        that.oGroupNames.push(obj);
                                        UidFilModel.setData({
                                            groupresults: that.oGroupNames
                                        });

                                        that.byId("SelectOption").setModel(UidFilModel)
                                    },
                                    error: function (oData, error) {
                                        MessageToast.show("error");
                                    },
                                });
                            }

                            else {
                                that.byId("Group").setModel(new JSONModel([]));
                            }

                        }

                        //Loading Characteristic Prioritization data
                        else if (sKey === "CharacteristicPriority") {

                            that.byId("idReset").setVisible(true);
                            that.sKey = sKey;

                            if (cProd !== "") {
                                that.onGo()
                            }
                            else {
                                that.byId("Primarytable").setModel(new JSONModel([]));
                            }
                        }
                        //Loading PartialProducts data
                        else if (sKey === "PartialProducts") {
                            that.sKey = sKey;
                            that.byId("idReset").setVisible(true);
                            that.byId("idReset").setVisible(true);
                            if (cProd !== '') {
                                that.onResetPress();
                                that.byId("idCommon").setValue(that.oItem);
                                setTimeout(() => {
                                    that.onGetData3();
                                }, 10)
                                that.onGetData3();
                            }
                            else {
                                that.byId("prodList").setModel(new JSONModel([]));
                            }

                        }
                        //Loading IBP Attributes data
                        else if (sKey === "IBPAttributes") {
                            that.sKey = sKey;
                            // that.byId("idReset").setVisible(false);
                            that.byId("idReset").setVisible(true);
                            if (cProd !== '') {
                                that.onGetData2();
                            }
                            else {
                                that.byId("Primarytable2").setModel(new JSONModel([]));
                                // that.byId("Secondarytable2").setModel(new JSONModel([]));
                            }
                        }
                    }
                    else {
                        MessageBox.confirm(" Unsaved Changes will be lost. Do you want to move next tab ?", {
                            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                            emphasizedAction: MessageBox.Action.NO,
                            onClose: function (sAction) {
                                if (sAction === sap.m.MessageBox.Action.YES) {
                                    const allData = that.oSeq
                                    // sap.ui.core.BusyIndicator.show();
                                    // that.getModel("BModel").callFunction("/changeToPrimaryNewMulti", {
                                    //     method: "GET",
                                    //     urlParameters: {
                                    //         CharData: JSON.stringify(allData)
                                    //     },
                                    //     success: function (oData) {
                                    //         sap.ui.core.BusyIndicator.hide();
                                    //         // that.onPressUpdate();
                                    //     },
                                    //     error: function (oData) {
                                    //         sap.ui.core.BusyIndicator.hide();
                                    //         MessageToast.show("Failed to changes the update");
                                    //     },
                                    // });
                                    that.cFlag = "";
                                    that.onGo();
                                }
                                else {
                                    // that.onGetData();
                                    if (that.prev === "") {
                                        that.prev = "ClassIBP"
                                    }
                                    that.sKey = that.prev;
                                    that.byId("idIconTabBarFiori2").setSelectedKey(that.prev)
                                }

                            },
                            dependentOn: this.getView()
                        });


                    }
                } catch (error) {
                    // Handle any errors thrown during await operations
                    //  MessageToast.show("Error")
                    console.log(error);
                }
            },

            // When click on Go, this below function exists for Characteristic priortization app
            onGetData: function () {
                //  console.log(new Date);
                if (that.byId("idCommon").getValue() != "") {
                    var sProd = that.byId("idCommon").getValue();
                } else {
                    var oPd = that.byId("idCommon").setValue(that.Product_Id);
                    var sProd = that.byId("idCommon").getValue()
                }

                if (sProd !== "") {
                    sap.ui.core.BusyIndicator.show();
                    that.getModel("BModel").callFunction("/getCharGroupWeightage", {
                        //   sorters: [new sap.ui.model.Sorter("WEIGHTAGE", true)],
                        urlParameters: {
                            PRODUCT_ID: sProd
                        },
                        success: function (oData) {
                            var oData = JSON.parse(oData.getCharGroupWeightage)
                            const filteredData = oData.filter(item => item.CHAR_NUM !== null);
                            that.oSeq = filteredData
                            that.cFlag = ""
                            sap.ui.core.BusyIndicator.hide();

                            // that.oSecndData = [];
                            that.oSecndData = addSorterField(filteredData);

                            that.oPList = that.byId("Primarytable"),
                                // that.oSList = that.byId("Secondarytable");

                                that.primaryData = [],
                                that.secData = [];

                            function addSorterField(params) {
                                let data = params;

                                // Step 1: Add WEIGHTAGE property
                                data.forEach(el => {
                                    if (el.GROUP_NAME !== "" && el.GROUP_NAME !== null) {
                                        el.WEIGHTAGE = parseFloat(el.WEIGHTAGE); //parseFloat(el.GROUP_NAME.split('-')[1]);
                                    } else {
                                        if (el.CHAR_TYPE === "P") {
                                            el.GROUP_NAME = "";
                                            el.WEIGHTAGE = 1;
                                        } else {
                                            el.GROUP_NAME = "";
                                            el.WEIGHTAGE = -1;
                                        }
                                    }
                                });

                                return data;
                            }

                            that.primaryData = that.oSecndData;

                            if (typeof (that.oSelectedItem) === "object") {
                                that.primaryData.unshift(that.oSelectedItem)
                            } else {
                                //Nothing
                            }

                            that.finalpriData = [];
                            that.finalpriData = that.primaryData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


                            that.finalSecData = [];
                            that.finalSecData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


                            that.oGModel = that.getModel("oGModel");
                            if (that.finalSecData.length !== 0) {
                                that.oGModel.setProperty("/secSeqSt", that.finalSecData[0].SEQUENCE);
                            } else {
                                that.oGModel.setProperty("/secSeqSt", 0);
                            }
                            // that.finalpriData = that.oGroupNames

                            // that.finalpriData[0].Group = that.oGroupNames;

                            that.PrimarylistModel.setData({
                                results: that.finalpriData,
                            });
                            that.PrimarylistModel.setSizeLimit(5000);
                            // that.oPList.setModel(null);
                            that.oPList.setModel(that.PrimarylistModel);
                            // var obj = {
                            //     GROUP_NAME : "",
                            //     WEIGHTAGE  : ''
                            // }
                            // that.oGroupNames.push(obj);
                            var UidFilModel = new sap.ui.model.json.JSONModel();
                            // that.UidFilModel.setData({});
                            // that.byId("SelectOption").setModel(that.UidFilModel);
                            UidFilModel.setData(null);
                            setTimeout(function () {
                                UidFilModel.setData({
                                    groupresults: that.oGroupNames
                                });

                                that.byId("SelectOption").setModel(UidFilModel)
                            }, 100)

                            that.byId("SelectOption").getModel().refresh(true);
                            that.oPList.getModel().refresh(true);

                            var items = that.oPList.getItems();

                            for (let i = 0; i < items.length; i++) {

                                var data = that.finalpriData.filter(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);

                                if (data.length > 0) {
                                    items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data[0].GROUP_NAME);
                                }

                            }

                        },
                        error: function (oData, error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });

                } else {
                    MessageToast.show("Please select a Product");
                    that.byId("Primarytable").setModel(new JSONModel([]));
                    sap.ui.core.BusyIndicator.hide();
                }
            },

            // 
            onSectoPrim: function (oEvent) {
                sap.ui.core.BusyIndicator.show();
                var oSelection = oEvent.getSource().getSelected()
                // oEvent.getSource().setSelected(true)
                var oCheckbox = oEvent.getSource().getBindingContext().getObject();
                var Data = JSON.parse(JSON.stringify(that.oSeq));
                Data = Data.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

                var temp = [];
                that.PrimarylistModel.setData({
                    results: temp,
                });
                that.oPList.setModel(null);
                that.oPList.setModel(that.PrimarylistModel);

                if (oSelection) {

                    var pData = Data.filter(el => el.CHAR_TYPE === "P");
                    var sData = Data.filter(el => el.CHAR_TYPE === "S");
                    ///////////////// 
                    pData.forEach((el, i) => {
                        el.SEQUENCE = i + 1;
                    })

                    //////////////////
                    var changesData = sData.filter(el => el.CHAR_NUM === oCheckbox.CHAR_NUM);
                    var seqIndex = sData.findIndex(el => el.CHAR_NUM === oCheckbox.CHAR_NUM);
                    sData.splice(seqIndex, 1);
                    if (pData.length > 0) {
                        var pseq = pData[pData.length - 1].SEQUENCE + 1;
                        for (var p = 0; p < pData.length; p++) {
                            if (pData[p].GROUP_NAME == "" && pData[p].WEIGHTAGE == 0) {
                                pData[p].GROUP_NAME = ""
                                pData[p].WEIGHTAGE = 1
                            }
                        }
                    } else {
                        var pseq = 1
                    }
                    changesData[0].SEQUENCE = pseq;
                    changesData[0].CHAR_TYPE = "P";
                    changesData[0].WEIGHTAGE = 1;

                    pData.push(changesData[0]);

                    for (var i = 0; i < sData.length; i++) {
                        pseq = pseq + 1;
                        sData[i].SEQUENCE = pseq;
                        pData.push(sData[i]);
                    }

                    that.oPosition = changesData[0].SEQUENCE
                    that.oSeq = pData;
                } else {
                    oEvent.getSource().setSelected(false);

                    var seqIndex = Data.findIndex(el => el.CHAR_NUM === oCheckbox.CHAR_NUM);

                    Data.splice(seqIndex, 1);


                    for (var i = seqIndex; i < Data.length; i++) {
                        Data[i].SEQUENCE = i + 1;
                    }
                    oCheckbox.GROUP_NAME = ""
                    oCheckbox.CHAR_TYPE = "S";
                    oCheckbox.WEIGHTAGE = -1;
                    oCheckbox.SEQUENCE = Data.length + 1;

                    Data.push(oCheckbox);

                    that.oSeq = Data;
                    that.oPosition = oCheckbox.SEQUENCE - 1

                }

                // For group Dropdown function 
                var UidFilModel = new sap.ui.model.json.JSONModel();

                UidFilModel.setData({
                    groupresults: that.oGroupNames
                });

                that.byId("SelectOption").setModel(UidFilModel)


                if (that.byId("idPrimarySearch").getValue() !== "") {
                    that.onPrimarySearch();
                } else {
                    that.PrimarylistModel.setData({
                        results: that.oSeq,
                    });
                    that.PrimarylistModel.setSizeLimit(5000);
                    that.oPList.setModel(that.PrimarylistModel);

                    that.oAllDat = that.oSeq


                    var items = that.oPList.getItems();
                    for (let i = 0; i < items.length; i++) {
                        var data = that.oAllDat.filter(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);

                        if (data.length > 0) {
                            items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data[0].GROUP_NAME);

                        }

                    }

                }
                setTimeout(function () {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].getCells()[0].getText() === oCheckbox.CHAR_NUM) {
                            items[i].setSelected(true)
                            break;
                            //    that.byId("Primarytable").setSelectedItem(that.byId("Primarytable").getItems()[that.oPosition], true);
                        }
                    }
                }, 100)
                sap.ui.core.BusyIndicator.hide();


            },


            ///new
            oItemChange: function (oEvent) {
                var oSelectedItem = oEvent.getSource().getParent().getBindingContext().getObject();
                var selKey = oEvent.getSource().getSelectedKey();
                var Data = JSON.parse(JSON.stringify(that.oSeq));
                Data.forEach(c => {
                    if (c.CHAR_TYPE === "P" && c.GROUP_NAME === "") {
                        c.WEIGHTAGE = 1
                    }
                })
                Data = Data.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

                var groupW = that.oGroupNames.find(el => el.GROUP_NAME === selKey);
                if (!groupW) return;

                var index = Data.findIndex(el => el.SEQUENCE === oSelectedItem.SEQUENCE);

                var changesRecord = Data.splice(index, 1)[0];
                changesRecord.GROUP_NAME = groupW.GROUP_NAME;
                changesRecord.WEIGHTAGE = groupW.WEIGHTAGE;

                Data.push(changesRecord);

                Data = Data.sort((a, b) => b.WEIGHTAGE - a.WEIGHTAGE);
                Data.forEach((item, i) => {
                    item.SEQUENCE = i + 1;
                });
                that.oPosition = changesRecord.SEQUENCE - 1

                // Update the model
                Data.forEach(c => {
                    if (c.CHAR_TYPE === "P" && c.GROUP_NAME === "") {
                        c.WEIGHTAGE = 1
                    }
                })
                that.oSeq = Data;
                that.PrimarylistModel.setData({
                    results: Data,
                });
                that.oFinalData = Data;
                that.PrimarylistModel.setSizeLimit(5000);
                that.oPList.setModel(that.PrimarylistModel);

                // Update dropdowns and table selection
                var items = that.oPList.getItems();
                for (let i = 0; i < items.length; i++) {
                    var data = that.oFinalData.find(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);
                    if (data) {
                        items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data.GROUP_NAME);
                    }
                }

                //    Set selected item in the table
                if (that.oPosition !== undefined) {
                    that.byId("Primarytable").setSelectedItem(that.byId("Primarytable").getItems()[that.oPosition], true);
                }
            },

            // Relevent class check validation function
            // onClsSelect: function (oEvent) {
            //     var oSeleItem = oEvent.getSource().getSelected()
            //     var oSelObject = oEvent.getSource().getBindingContext().getObject()
            //     //    if (oSelObject.IBPCHAR_CHK !== true) {
            //     sap.ui.core.BusyIndicator.show();
            //     var product = that.byId("idCommon").getValue();

            //     let vIbpCheck = '';
            //     if (oSelObject.IBPCHAR_CHK === true) {
            //         vIbpCheck = 'X';
            //     }

            //     that.getModel("BModel").callFunction("/verifyIBPClass", {
            //         method: "GET",
            //         urlParameters: {
            //             PRODUCT_ID: product,
            //             CLASS_NUM: oSelObject.CLASS_NUM
            //         },
            //         success: function (oData) {

            //             if (oData.verifyIBPClass === "ERROR") {
            //                 oEvent.getSource().setSelected(true)
            //                 MessageBox.warning("Selected Class Characteristics are already assigned as Primary. Please go to Characteristic Prioritization to remove them ")

            //                 // that.onAfterRendering();
            //                 that.onGo();
            //                 sap.ui.core.BusyIndicator.hide();

            //             } else {
            //                 sap.ui.core.BusyIndicator.hide();
            //             }
            //         },
            //         error: function (error) {
            //             sap.ui.core.BusyIndicator.hide();
            //             sap.m.MessageToast.show("Validation Failed");
            //             //  that.onBack();
            //         },
            //     });
            //     //     }

            // },


            oAllSave: function () {
                var product = that.byId("idCommon").getValue();
                if (product.length === 0) {
                    MessageToast.show("No data for update..")
                    return false;
                }
                const oInitialData = that.CharPrior
                const allData = that.oSeq

                const commonObjects = oInitialData.filter(obj1 =>
                    allData.some(obj2 => (obj1.CHAR_NUM === obj2.CHAR_NUM) && (obj1.CHAR_TYPE !== obj2.CHAR_TYPE))
                );
                ///// For Primary or Secondary Char Change in table...
                if (commonObjects.length > 0) {
                    MessageBox.confirm(" Active Planning Details exist for selected Product. Do you want to update the Primary Characteristics ?", {
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        emphasizedAction: MessageBox.Action.NO,
                        onClose: function (sAction) {
                            if (sAction === sap.m.MessageBox.Action.YES) {
                                const allData = that.oSeq
                                sap.ui.core.BusyIndicator.show();
                                that.getModel("BModel").callFunction("/changeToPrimaryNewMulti", {
                                    method: "GET",
                                    urlParameters: {
                                        CharData: JSON.stringify(allData)
                                    },
                                    success: function (oData) {
                                        sap.ui.core.BusyIndicator.hide();
                                        sap.m.MessageToast.show("Successfully updated..")
                                        that.onPressUpdate();
                                    },
                                    error: function (oData) {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageToast.show("Failed to changes the update");
                                    },
                                });
                            }
                            else {
                                that.onGetData();
                            }

                        },
                        dependentOn: this.getView()
                    });
                }
                /* when groups modified */
                else {
                    const changeGroups = oInitialData.filter(obj1 =>
                        allData.some(obj2 => (obj1.CHAR_NUM === obj2.CHAR_NUM) && (obj1.GROUP_NAME !== obj2.GROUP_NAME))
                    );
                    if (changeGroups.length > 0) {

                        MessageBox.confirm(" Active Planning Details exist for selected Product. Do you want to update the Primary Characteristics ?", {
                            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                            emphasizedAction: MessageBox.Action.NO,
                            onClose: function (sAction) {
                                if (sAction === sap.m.MessageBox.Action.YES) {
                                    const allData = that.oSeq
                                    sap.ui.core.BusyIndicator.show();
                                    that.getModel("BModel").callFunction("/changeToPrimaryNewMulti", {
                                        method: "GET",
                                        urlParameters: {
                                            CharData: JSON.stringify(allData)
                                        },
                                        success: function (oData) {
                                            that.charPrioritize = oData.results
                                            
                                            that.onPressUpdate()
                                            sap.m.MessageToast.show("Groups successfully updated..")
                                            sap.ui.core.BusyIndicator.hide();
                                        },
                                        error: function (oData) {
                                            sap.ui.core.BusyIndicator.hide();
                                            MessageToast.show("Failed to changes the update");
                                        },
                                    });
                                }
                                else {
                                    that.onGetData();
                                }
                            },
                        });
                    }
                    else {
                        MessageToast.show("No Changes are Done...")
                    }


                }
             

            },

            /**
        * 
        */
            onPressUpdate: function (oEvent) {
                //var oEntry = {};
                // var sLoc = that.byId("idloc").getValue(),
                var sProd = that.byId("idCommon").getValue();
                if (sProd === "") {
                    return MessageToast.show("Please select a Product");;
                }
                if (sProd !== "") {
                    sap.ui.core.BusyIndicator.show();
                    that.getModel("BModel").callFunction("/getSecondaryChar", {
                        method: "GET",
                        urlParameters: {
                            FLAG: "U",
                            // LOCATION_ID: sLoc,
                            PRODUCT_ID: sProd
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            that.oSeq = oData.results
                            // that.oSecndData = [];
                            that.oSecndData = addSorterField(oData);

                            that.oPList = that.byId("Primarytable"),
                                // that.oSList = that.byId("Secondarytable");

                                that.primaryData = [],
                                that.secData = [];

                            function addSorterField(params) {
                                let data = params.results;

                                // Step 1: Add WEIGHTAGE property
                                data.forEach(el => {
                                    if (el.GROUP_NAME !== "" && el.GROUP_NAME !== null) {
                                        el.WEIGHTAGE = parseFloat(el.WEIGHTAGE); //parseFloat(el.GROUP_NAME.split('-')[1]);
                                    } else {
                                        if (el.CHAR_TYPE === "P") {
                                            el.GROUP_NAME = "";
                                            el.WEIGHTAGE = 1;
                                        } else {
                                            el.GROUP_NAME = "";
                                            el.WEIGHTAGE = -1;
                                        }
                                    }
                                });

                                return data;
                            }

                            // for (var i = 0; i < that.oSecndData.length; i++) {
                            //     if (that.oSecndData[i].CHAR_TYPE === "P") {
                            //         that.primaryData.push(that.oSecndData[i]);
                            //     } else {
                            //         that.primaryData.push(that.oSecndData[i]);
                            //     }
                            // }

                            if (typeof (that.oSelectedItem) === "object") {
                                that.primaryData.unshift(that.oSelectedItem)
                            } else {
                                //Nothing
                            }

                            that.finalpriData = [];
                            that.finalpriData = that.primaryData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


                            // that.finalSecData = [];
                            // that.finalSecData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


                            that.oGModel = that.getModel("oGModel");
                            if (that.finalSecData.length !== 0) {
                                that.oGModel.setProperty("/secSeqSt", that.finalSecData[0].SEQUENCE);
                            } else {
                                that.oGModel.setProperty("/secSeqSt", 0);
                            }

                            that.PrimarylistModel.setData({
                                results: that.finalpriData,
                            });
                            that.PrimarylistModel.setSizeLimit(5000);
                            // that.oPList.setModel(null);
                            that.oPList.setModel(that.PrimarylistModel);

                            var UidFilModel = new sap.ui.model.json.JSONModel();

                            UidFilModel.setData(null);
                            setTimeout(function () {
                                UidFilModel.setData({
                                    groupresults: that.oGroupNames
                                });

                                that.byId("SelectOption").setModel(UidFilModel)
                            }, 100)

                            that.byId("SelectOption").getModel().refresh(true);
                            that.oPList.getModel().refresh(true);

                            var items = that.oPList.getItems();
                            for (let i = 0; i < items.length; i++) {

                                var data = that.finalpriData.filter(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);

                                if (data.length > 0) {
                                    items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data[0].GROUP_NAME);
                                }

                            }

                            try {
                                that.purgePredictionModels(sProd);
                            }
                            catch (ex) {
                                console.log(ex);
                            }

                        },
                        error: function (oData, error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });


                }
            },
            //Creating job
            purgePredictionModels: function (sProd) {
                sap.ui.core.BusyIndicator.show();
                that.getOwnerComponent().getModel("BModel").callFunction("/purgeTimeseriesModelsPredictions", {
                    method: "GET",
                    urlParameters: {
                        PRODUCT_ID: sProd
                    },
                    success: function (x) {
                        //create job here
                        let ajobData = JSON.parse(x.purgeTimeseriesModelsPredictions)
                        var aScheduleSEDT = that.getScheduleSEDT();
                        var JobName = "PURGE_TIMESERIES_MODELS_PREDICTIONS" + new Date().getTime();
                        var finalList = {
                            name: JobName,
                            description: JobName,
                            action: encodeURIComponent("/pal/purgePredictionModels"),
                            active: true,
                            httpMethod: "POST",
                            startTime: new Date(),
                            endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
                            createdAt: aScheduleSEDT.djSdate,
                            schedules: [{
                                data: JSON.stringify({
                                    vcRulesList: ajobData
                                }),
                                cron: '',
                                time: aScheduleSEDT.oneTime,
                                active: true,
                                startTime: new Date(),
                                endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
                            }]
                        };
                        that.getOwnerComponent().getModel("JModel").callFunction("/addJobCreation", {
                            method: "GET",
                            urlParameters: {
                                jobDetails: JSON.stringify(finalList)
                            },
                            success: function (oData) {
                                sap.m.MessageToast.show(oData.addJobCreation.jobId + ": Job Created");
                                sap.ui.core.BusyIndicator.hide();
                                // that.onGetData()
                                // setTimeout(function () {
                                // that.onGetData();

                                that.CharPrior = [];
                                that.prev = "";
                                that.getModel("BModel").callFunction("/getCharGroupWeightage", {
                                    urlParameters: {

                                        PRODUCT_ID: sProd
                                    },

                                    // filters: [
                                    //     new Filter("PRODUCT_ID", FilterOperator.EQ, that.byId("idCommon").getValue())
                                    // ],
                                    // sorters: [new sap.ui.model.Sorter("WEIGHTAGE", true)],

                                    success: function (oData) {
                                        var oData = JSON.parse(oData.getCharGroupWeightage)
                                        const oFilData = oData.filter(item => item.CHAR_NUM !== null);
                                        that.CharPrior = [];
                                        that.CharPrior = oFilData;
                                        that.charPrioritize = oFilData;
                                        that.onGetData();
                                    },
                                    error: function (oData, error) {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageToast.show("error");
                                    }
                                })
                                // }, 10)
                            },
                            error: function (_error) {
                                sap.ui.core.BusyIndicator.hide();
                                sap.m.MessageToast.show("Error While Creating Job!");
                            },
                        });
                    },
                    error: function (_x) {
                        sap.ui.core.BusyIndicator.hide();
                    },
                });

            },

            getScheduleSEDT: function () {
                var aScheduleSEDT = {};
                var dDate = new Date();
                // 07-09-2022-1                
                var idSchTime = dDate.setSeconds(dDate.getSeconds() + 5);
                // 07-09-2022-1
                var idSETime = dDate.setHours(dDate.getHours() + 4);
                idSchTime = new Date(idSchTime);
                idSETime = new Date(idSETime);
                //var onetime = idSchTime;
                var djSdate = new Date(),
                    djEdate = idSETime,
                    dsSDate = new Date(),
                    dsEDate = idSETime,
                    tjStime,
                    tjEtime,
                    tsStime,
                    tsEtime;

                djSdate = djSdate.toISOString().split("T");
                tjStime = djSdate[1].split(":");
                djEdate = djEdate.toISOString().split("T");
                tjEtime = djEdate[1].split(":");
                dsSDate = dsSDate.toISOString().split("T");
                tsStime = dsSDate[1].split(":");
                dsEDate = dsEDate.toISOString().split("T");
                tsEtime = dsEDate[1].split(":");

                var dDate = new Date().toLocaleString().split(" ");
                aScheduleSEDT.djSdate = djSdate[0] + " " + tjStime[0] + ":" + tjStime[1] + " " + "+0000";
                aScheduleSEDT.djEdate = djEdate[0] + " " + tjEtime[0] + ":" + tjEtime[1] + " " + "+0000";
                aScheduleSEDT.dsSDate = dsSDate[0] + " " + tsStime[0] + ":" + tsStime[1] + " " + "+0000";
                aScheduleSEDT.dsEDate = dsEDate[0] + " " + tsEtime[0] + ":" + tsEtime[1] + " " + "+0000";
                aScheduleSEDT.oneTime = idSchTime;

                return aScheduleSEDT;

            },



            onPrimarySearch: function (oEvent) {
                if (oEvent) {
                    var sQuery = (oEvent.getParameter("value") || oEvent.getParameter("newValue")).toUpperCase();
                } else {
                    var sQuery = (that.byId("idPrimarySearch").getValue()).toUpperCase();
                }
                //this.byId("idPrimarySearch").getValue(), // Fetch the search query
                var oFilters = []; // Array to store filters

                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : ""; // Trim the query to remove whitespace

                var Tempdata = JSON.parse(JSON.stringify(that.oSeq));

                var filterData = Tempdata.filter(el => el.CHAR_NAME.includes(sQuery));

                that.PrimarylistModel.setData({
                    results: filterData,
                });
                that.PrimarylistModel.setSizeLimit(5000);
                that.oPList.setModel(that.PrimarylistModel);

                var items = that.oPList.getItems();
                for (let i = 0; i < items.length; i++) {

                    var data = filterData.filter(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);

                    if (data.length > 0) {
                        items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data[0].GROUP_NAME);
                    }

                }

            },



            //    Drag & Drop functions     //// ==== WORKING COMMENTS ====== >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.  

            attachDragDrop: function () {
                var oListPrim = this.byId("Primarytable");
                // adding drag and drop with first list
                oListPrim.addDragDropConfig(new DragInfo({
                    sourceAggregation: "items"
                }));

                oListPrim.addDragDropConfig(new DropInfo({
                    targetAggregation: "items",
                    dropPosition: DropPosition.Between,
                    dropLayout: DropLayout.Vertical,
                    drop: this.onDrop.bind(this)
                }));

            },

            onDrop: function (oInfo) {

                var oSChar_Type = oInfo.getParameters().draggedControl.getCells()[4].getText();
                if (oSChar_Type === "P") {
                    sap.m.MessageToast.show("Drag & Drop works for only Secondary Characteristics")
                    return false

                }
                var results = []

                oGModel = this.getModel("oGModel");
                oGModel.setProperty("/primFlag", "");
                var oDragged = oInfo.getParameter("draggedControl"),
                    oDropped = oInfo.getParameter("droppedControl"),
                    sInsertPosition = oInfo.getParameter("dropPosition");

                if (that.byId("idPrimarySearch").getValue() !== "") {

                    var obj1 = that.byId("Primarytable").getItems()
                    for (var j = 0; j < obj1.length; j++) {
                        results.push(obj1[j].getBindingContext().getObject())
                    }
                }

                var oDragContainer = oDragged.getParent(),
                    oDropContainer = oInfo.getSource().getParent(),

                    oDragModel = oDragContainer.getModel(),
                    oDropModel = oDropContainer.getModel(),
                    oDragModelData = oDragModel.getData(),
                    oDropModelData = oDropModel.getData(),

                    iDragPosition = oDragContainer.indexOfItem(oDragged),
                    iDropPosition = oDropContainer.indexOfItem(oDropped);
                // var Flag = "";
                // if (oDragModelData.results[0].CHAR_TYPE === "P") {
                //     Flag = "X";
                // }
                if (that.authFlag !== "X") {
                    // remove the item
                    if (results.length > 0) {
                        oDragModelData.results = results
                    }
                    var oItem = oDragModelData.results[iDragPosition];
                    oDragModelData.results.splice(iDragPosition, 1);

                    if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
                        iDropPosition--;
                    }

                    if (sInsertPosition === "After") {
                        iDropPosition++;
                    }

                    // insert the control in target aggregation
                    oDropModelData.results.splice(iDropPosition, 0, oItem);

                    if (oDragModel !== oDropModel) {
                        var oChar_Type;
                        var iSeq = 0;
                        if (oItem.CHAR_TYPE === "S") {
                            iSeq = oItem.SEQUENCE;
                            oChar_Type = "P";

                        } else {
                            oChar_Type = "S"
                            iSeq = oItem.SEQUENCE;
                            oGModel.setProperty("/primFlag", "X");
                        }

                        that.getModel("BModel").callFunction("/changeToPrimary", {
                            method: "GET",
                            urlParameters: {
                                // LOCATION_ID: oItem.LOCATION_ID,
                                // LOCATION_ID: "",
                                PRODUCT_ID: oItem.PRODUCT_ID,
                                CHAR_NUM: oItem.CHAR_NUM,
                                SEQUENCE: iSeq,
                                CHAR_TYPE: oChar_Type,
                                GROUP_NAME: "",
                                FLAG: "C",
                            },
                            success: function (oData) {
                                sap.ui.core.BusyIndicator.hide();
                                that.byId("idPrimarySearch").setValue("");
                                that.onPrimarySearch();
                                // that.byId("searchField").setValue("");
                                // that.onCharSearch();
                                that.onGetData();
                                if (oGModel.getProperty("/primFlag") === "X") {
                                    that.byId("idText").setVisible(true);
                                    that.byId("idText").addStyleClass("textColour");
                                }
                            },
                            error: function (oData) {
                                sap.ui.core.BusyIndicator.hide();
                                MessageToast.show("Failed to changes the char");
                            },
                        });
                    } else {
                        oDropModel.setData(oDropModelData);

                        if (oDropModelData.results[0].CHAR_TYPE === "P") {
                            var aData = this.byId("Primarytable").getItems();
                        } else if (oDropModelData.results[0].CHAR_TYPE === "S") {
                            var aData = this.byId("Secondarytable").getItems();
                        }

                        // for (var i = 0; i < aData.length; i++) {
                        //     if (oItem.CHAR_NAME === aData[i].getCells()[1].getText()) {
                        //         aData[i].focus();
                        //         aData[i].setSelected(true);
                        //     }
                        // }
                        that.oSelectedItem = oItem.CHAR_NAME
                        that.onSaveSeq(iDropPosition, aData);
                        that.onSaveSeq2(iDropPosition);
                    }
                } else if (that.authFlag === "X") {

                    // Getting the conformation popup before deleting		
                    var text = "Active Planning Details exist. Would you like to continue? \n If yes, please make sure to click on 'Update Primary Char.' button after changes are done.";
                    sap.m.MessageBox.show(
                        text, {

                        title: "Confirmation",
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.YES) {
                                that.authFlag = "";
                                // remove the item
                                if (results.length > 0) {
                                    oDragModelData.results = results
                                }
                                var oItem = oDragModelData.results[iDragPosition];
                                oDragModelData.results.splice(iDragPosition, 1);

                                if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
                                    iDropPosition--;
                                }

                                if (sInsertPosition === "After") {
                                    iDropPosition++;
                                }


                                // insert the control in target aggregation
                                oDropModelData.results.splice(iDropPosition, 0, oItem);

                                if (oDragModel !== oDropModel) {
                                    var oChar_Type;
                                    var iSeq = 0;
                                    if (oItem.CHAR_TYPE === "S") {
                                        iSeq = oItem.SEQUENCE;
                                        oChar_Type = "P";

                                    } else {
                                        oChar_Type = "S"
                                        iSeq = oItem.SEQUENCE;
                                        oGModel.setProperty("/primFlag", "X");
                                    }

                                    that.getModel("BModel").callFunction("/changeToPrimary", {
                                        method: "GET",
                                        urlParameters: {
                                            PRODUCT_ID: oItem.PRODUCT_ID,
                                            CHAR_NUM: oItem.CHAR_NUM,
                                            SEQUENCE: iSeq,
                                            CHAR_TYPE: oChar_Type,
                                            GROUP_NAME: "",
                                            FLAG: "C",
                                        },
                                        success: function (oData) {
                                            sap.ui.core.BusyIndicator.hide();
                                            that.byId("idPrimarySearch").setValue("");
                                            that.onPrimarySearch();
                                            that.byId("searchField").setValue("");
                                            that.onGetData();
                                            if (oGModel.getProperty("/primFlag") === "X") {
                                                that.byId("idText").setVisible(true);
                                                that.byId("idText").addStyleClass("textColour");
                                            }
                                        },
                                        error: function (oData) {
                                            sap.ui.core.BusyIndicator.hide();
                                            MessageToast.show("Failed to changes the char");
                                        },
                                    });
                                } else {
                                    oDropModel.setData(oDropModelData);

                                    if (oDropModelData.results[0].CHAR_TYPE === "P") {
                                        var aData = that.byId("Primarytable").getItems();
                                    } else if (oDropModelData.results[0].CHAR_TYPE === "S") {
                                        var aData = that.byId("Secondarytable").getItems();
                                    }
                                    that.oSelectedItem = oItem.CHAR_NAME
                                    that.onSaveSeq(iDropPosition, aData);
                                    that.onSaveSeq2(iDropPosition);
                                }

                            }

                        }
                    }
                    );

                }
            },

            onSaveSeq: function (index, data) {
                var successCount = 0;
                that.count2 = data.length;
                var seq;
                if (data[0].getBindingContext().getObject().CHAR_TYPE === "S") {
                    seq = parseInt(that.oGModel.getProperty("/secSeqSt"));
                } else {
                    seq = 1;
                }

                for (var i = 0; i < data.length; i++) {
                    // for(var i=0; i<that.count; i++){
                    var oEntry = {};

                    // oEntry.Location = that.byId("idloc").getValue();
                    oEntry.product = that.byId("idCommon").getValue();
                    oEntry.CharNo = data[i].getCells()[0].getText();
                    // oEntry.charName = data[i].getCells()[1].getText();
                    oEntry.SEQUENCE = seq + i;
                    oEntry.FLAG = "E";
                    oEntry.CHAR_TYPE = data[i].getBindingContext().getObject().CHAR_TYPE;
                    //     oEntry.GROUP_NAME = 

                    that.getModel("BModel").callFunction("/changeToPrimary", {
                        method: "GET",
                        urlParameters: {
                            // LOCATION_ID: oEntry.Location,
                            // LOCATION_ID: "",
                            PRODUCT_ID: oEntry.product,
                            CHAR_NUM: oEntry.CharNo,
                            SEQUENCE: oEntry.SEQUENCE,
                            CHAR_TYPE: oEntry.CHAR_TYPE,
                            GROUP_NAME: "",
                            FLAG: oEntry.FLAG,
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            if (oData.changeToPrimary) {
                                successCount = successCount + 1;
                            }

                            if (successCount + 1 === that.count2) {
                                that.onGetData2();
                                // MessageToast.show(oData.changeToPrimary);
                                MessageToast.show("Successfully changed the sequence");
                                //   that.byId("searchField").setValue("");
                                //     that.onCharSearch();
                                // that.onGetData2();
                                // that.onSaveChardup();
                            }
                        },
                        error: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Failed to changes the char");
                        },
                    });

                }
            },

            handleSelection: function (oEvent) {
                that.oItem1 = oEvent.getParameters().selectedItem.getTitle();
                var sId = oEvent.getParameter("id"),
                    oItem = oEvent.getParameter("selectedItems"),
                    aSelectedItems,
                    aODdata = [];
                if (sId.includes("LocS")) {
                    //  this.oProd = that.byId("LocSlctListCPS");
                    that.oSelectedLoc = oEvent.getParameter("selectedItems");
                    that.oSelect = that.oSelectedLoc[0].getTitle()
                    that.ForDownload();
                } else if (sId.includes("oPartialLoc")) {
                    that.oSelectedLoc = oEvent.getParameter("selectedItems");
                    that.oSelect = that.oSelectedLoc[0].getTitle()
                    that.ForPartialDownload();
                }
                if (that.byId("idIconTabBarFiori2").mProperties.selectedKey == "") {
                    that.byId("idIconTabBarFiori2").mProperties.selectedKey = "info"
                }
                if (that.byId("idIconTabBarFiori2").mProperties.selectedKey == "info") {
                    if (sId.includes("prod")) {
                        this.oProd = that.byId("idCommon");
                        var aSelectedProd = oEvent.getParameter("selectedItems");
                        that.oProd.setValue(aSelectedProd[0].getTitle());

                        that.authFlag = oEvent.getParameter("selectedItems")[0].getBindingContext().getObject().PREDICTION_CHK;
                        if (that.oProdList.getBinding("items")) {
                            that.oProdList.getBinding("items").filter([]);
                        }

                    }
                }
                else if (that.byId("idIconTabBarFiori2").mProperties.selectedKey == "notes") {
                    if (sId.includes("prod")) {
                        this.oProd = that.byId("idCommon");
                        var aSelectedProd = oEvent.getParameter("selectedItems");
                        that.oProd.setValue(aSelectedProd[0].getTitle());

                        that.authFlag = oEvent.getParameter("selectedItems")[0].getBindingContext().getObject().PREDICTION_CHK;
                        if (that.oProdList.getBinding("items")) {
                            that.oProdList.getBinding("items").filter([]);
                        }
                    }
                }
                that.oLocList = sap.ui.getCore().byId("LocSlctListCPS");
                that.oLocList.getBinding("items").filter([]);
            },


            // Download functionality for Characteristic Prioritization tab
            oCharPrioritizDownload: function () {
                var topCount = that.oGModel.getProperty("/MaxCount");
                that.oLocList = sap.ui.getCore().byId("LocSlctListCPS");

                if (!that.oLocList.getModel()) {
                    that._valueHelpDialogLoc.open();
                    that.oLocList.setNoDataText("...Loading");
                    that.oLocList.setBusy(true);
                    this.getModel("BModel").read("/getfactorylocdesc", {
                        urlParameters: {
                            // "$apply": "groupby((DEMAND_LOC,DEMAND_DESC,PRODUCT_ID))",
                            "$apply": "groupby((FACTORY_LOC,LOCATION_DESC,PRODUCT_ID))",
                            "$skip": 0,
                            "$top": topCount
                        },
                        success: function (oData) {
                            that.oAllLocations = oData.results;
                            that.oLocList.setBusy(false);
                            let data = $.extend(true, [], oData.results);
                            let oLocs = removeDuplicate(data, 'FACTORY_LOC');
                            //  let oLocs = removeDuplicate(data, 'DEMAND_LOC');
                            that.locModel.setData({
                                results: oLocs
                            });
                            that.oLocList.setModel(that.locModel)
                            that.oLocList.getBinding("items").filter([]);
                            function removeDuplicate(array, key) {
                                var check = new Set();
                                return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                            }
                        },
                        error: function (oData, error) {
                            that.oLocList.setBusy(false);
                            that.oLocList.setNoDataText("No Data");
                            MessageToast.show("error");
                        },
                    });
                } else {
                    that._valueHelpDialogLoc.open();
                    // that.oLocList.setModel(new JSONModel([]));
                }
            },

            /* this function executes based on select location in Characteristics Prioritazation tab, 
             and function  called in handleSelection function */

            // ForDownload1: function () {
            //     var oFilters = [];
            //     var arr = [];
            //     // that.oLop = that.oAllLocations.filter(f => f.DEMAND_LOC == that.oSelect);
            //     that.oLop = that.oAllLocations.filter(f => f.FACTORY_LOC == that.oSelect);
            //     that.oLop.forEach(f => {
            //         oFilters.push(new Filter('PRODUCT_ID', FilterOperator.EQ, f.PRODUCT_ID))
            //     });

            //     sap.ui.core.BusyIndicator.show();
            //     this.getModel("BModel").read("/getUniqueHeader", {
            //         filters: oFilters,
            //         success: function (oData) {
            //             that.oUniq = oData.results;
            //             that.oLop = that.oLop.filter(item1 =>
            //                 !that.oUniq.some(item2 => item2.PRODUCT_ID === item1.PRODUCT_ID)
            //             );
            //             if (that.oLop.length !== 0) {
            //                 that.onGetDataExcelDown()
            //             } else {
            //                 sap.m.MessageToast.show("All Products for the selected Location have Unique ID's")
            //                 sap.ui.core.BusyIndicator.hide();
            //             }
            //         },
            //         error: function () {
            //             MessageToast.show("error");
            //             sap.ui.core.BusyIndicator.hide();
            //         },
            //     });
            // },

            ForDownload: function () {
                var oFilters = [];
                var arr = [];
                that.oCharprData = [];
                // that.oLop = that.oAllLocations.filter(f => f.DEMAND_LOC == that.oSelect);
                that.oLop = that.oAllLocations.filter(f => f.FACTORY_LOC == that.oSelect);
                that.oLop.forEach(f => {
                    oFilters.push(new Filter('PRODUCT_ID', FilterOperator.EQ, f.PRODUCT_ID))
                });
                var topCount = that.oGModel.getProperty("/MaxCount");
                sap.ui.core.BusyIndicator.show();
                that.getModel("BModel").read("/getUniqueHeader", {
                    filters: oFilters,
                    urlParameters: {
                        "$skip": that.skip,
                        "$top": topCount
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        that.cFlag = ""
                        if (topCount == oData.results.length) {
                            that.skip += (topCount);
                            that.oCharprData = that.oCharprData.concat(oData.results);
                            that.ForDownload();
                        } else {
                            that.skip = 0;
                            that.oCharprData = that.oCharprData.concat(oData.results);
                            that.oLop = that.oLop.filter(item1 =>
                                !that.oCharprData.some(item2 => item2.PRODUCT_ID === item1.PRODUCT_ID)
                            );
                            if (that.oLop.length !== 0) {
                                that.onExportCharPriotData()
                            } else {
                                sap.m.MessageToast.show("All Products for the selected Location have Unique ID's")
                                sap.ui.core.BusyIndicator.hide();
                            }
                        }
                    },
                    error: function (oData, error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Error While getting data");
                    },

                });
            },

            /* Download data of Characteristic Prioritazation Data */
            onExportCharPriotData: function () {
                const sProd = that.oLop.map(product => product.PRODUCT_ID);
                const oProds = []
                if (sProd.length === 1) {
                    oProds.push(sProd)
                } else {
                    oProds.push(JSON.stringify(sProd))
                }
                let accumulatedData = [];
                sap.ui.core.BusyIndicator.show({
                    text: "Processing data, please wait..."
                });

                this.getModel("BModel").callFunction("/getSecondaryChar", {
                    method: "GET",
                    urlParameters: {
                        FLAG: "D",
                        PRODUCT_ID: oProds
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        if (oData.results.length === 0) {
                            sap.m.MessageToast.show("No data download for selected Location products")
                            sap.ui.core.BusyIndicator.hide();
                        } else {
                            // Concatenate the new data into accumulatedData
                            accumulatedData = oData.results
                            //  accumulatedData.push(oData.results);
                            var oDownloadData = accumulatedData.sort((a, b) => a.PRODUCT_ID.localeCompare(b.PRODUCT_ID));
                            var liLoc = [];
                            // var oModel = that.getOwnerComponent().getModel("oDataModel");
                            // accumulatedData = oModel.getData();
                            // Check if all requests are complete
                            if (oDownloadData.length != sProd.length) {
                                liLoc = oDownloadData.flatMap(item => item);
                                that.oApData = liLoc
                                //Export csv formate
                                that.downloadFastCSV(that.oApData, that.oSelect + ' Characteristic Prioritization.xlsx')
                                // sap.ui.core.BusyIndicator.hide();
                                // var exportToExcel = function () {
                                //     var aCols = [
                                //         { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
                                //         { label: 'CHAR_NAME', property: 'CHAR_NAME', width: 30 },
                                //         { label: 'CHAR_DESC', property: 'CHAR_DESC', width: 30 },
                                //         { label: 'CHAR_NUM', property: 'CHAR_NUM', width: 30 },
                                //         { label: 'CHAR_TYPE', property: 'CHAR_TYPE', width: 30 },
                                //         { label: 'SEQUENCE', property: 'SEQUENCE', width: 30 }
                                //     ];
                                //     var oSettings = {
                                //         workbook: {
                                //             columns: aCols,
                                //         },

                                //         dataSource: that.oApData,
                                //         fileName: that.oSelect + ' Characteristic Prioritization.xlsx',
                                //         worker: true
                                //     };

                                //     var oSheet = new sap.ui.export.Spreadsheet(oSettings);
                                //     oSheet.build().then(function () {
                                //         sap.m.MessageToast.show('Succesfully download');
                                //     }).finally(function () {
                                //         oSheet.destroy();
                                //     });
                                // };
                                // // Call the export function to download the Excel file
                                // exportToExcel();

                            }
                        }
                    },
                    error: function () {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Error occurred while fetching data for product:");
                    }
                    //     });
                });

            },

            // download csv formate
            downloadFastCSV: function (jsonData, fileName) {
                sap.ui.core.BusyIndicator.hide();
                try {
                    if (jsonData.length === 0) {
                        return false;
                    }

                    that.getView().setBusy(true);

                    // Get headers from the first data object and remove metadata
                    const sampleItem = { ...jsonData[0] };
                    if (sampleItem.__metadata) delete sampleItem.__metadata;
                    //  const headers = Object.keys(sampleItem);
                    const headers = [
                        'PRODUCT_ID',
                        'CHAR_NAME',
                        'CHAR_DESC',
                        'CHAR_NUM',
                        'CHAR_TYPE',
                        'SEQUENCE'
                    ];
                    // Create CSV header row
                    let csvContent = headers.join(",") + "\r\n";

                    const chunkSize = 10000;
                    let processedCount = 0;
                    const processNextChunk = () => {
                        const chunk = jsonData.slice(processedCount, processedCount + chunkSize);
                        let chunkContent = '';

                        // Process the current chunk
                        for (let i = 0; i < chunk.length; i++) {
                            const row = [];
                            for (let j = 0; j < headers.length; j++) {
                                let value = chunk[i][headers[j]];

                                // Handle null or undefined values
                                if (value === null || value === undefined) {
                                    value = "";
                                }
                                // Preserve leading zeros for CHAR_NUM
                                else if (headers[j] === "CHAR_NUM") {
                                    value = '="' + value + '"';
                                }
                                // Escape values with special characters
                                else if (typeof value === 'string') {
                                    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                                        value = value.replace(/"/g, '""');
                                        value = `"${value}"`;
                                    }
                                }

                                row.push(value);
                            }
                            chunkContent += row.join(",") + "\r\n";
                        }

                        // Append this chunk's content to the CSV
                        csvContent += chunkContent;

                        processedCount += chunk.length;

                        // Continue processing or finish
                        if (processedCount < jsonData.length) {
                            setTimeout(processNextChunk, 0); // Continue with next chunk
                        } else {
                            // All data processed, download the CSV file
                            // Create Blob from the CSV string
                            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

                            // Create download link
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;

                            // Ensure the filename has .csv extension
                            if (!fileName.toLowerCase().endsWith('.csv')) {
                                fileName += '.csv';
                            }
                            a.download = fileName;

                            document.body.appendChild(a);
                            a.click();

                            // Clean up
                            setTimeout(() => {
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                                that.getView().setBusy(false);
                            }, 100);
                        }
                    };

                    // Start processing
                    setTimeout(processNextChunk, 0);

                    return true;
                } catch (error) {
                    that.getView().setBusy(false);
                    console.error("Error in downloadFastCSV:", error);
                    return false;
                }
            },

            // Upload functionality for Characteristic Prioritization tab

            oCharPrioritiz: function (oEvent) {

                var temp = [];
                that.PrimarylistModel.setData({
                    results: temp,
                });
                that.oPList = that.byId("Primarytable");
                that.oPList.setModel(null);
                that.oPList.setModel(that.PrimarylistModel);

                var oFileUploader = oEvent.getSource();
                var oFile = oEvent.getParameter("files")[0];
                var oFileName = oFile.name
                sap.ui.core.BusyIndicator.show();
                if (oFileName.includes("Characteristic Prioritization")) {
                    if (oFile) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            var data = e.target.result;
                            var workbook = XLSX.read(data, { type: 'binary' });
                            var firstSheetName = workbook.SheetNames[0];
                            var worksheet = workbook.Sheets[firstSheetName];
                            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                            // Process the JSON data
                            that.oCharPrioritizprocessExcelData(jsonData);
                        };

                        reader.readAsBinaryString(oFile);
                    }
                } else {
                    MessageToast.show("Upload valid Characteristic Prioritization file")
                    sap.ui.core.BusyIndicator.hide();
                    return false
                }

            },

            oCharPrioritizprocessExcelData: function (aData) {
                var that = this;
                var aHeaders = aData[0];
                var aRows = aData.slice(1);
                var productDataMap = {}; // Store data grouped by PRODUCT_ID
                var batchSizeLimit = 20000; // Max batch size
                var allBatches = []; // Store all batches

                // Grouping data by PRODUCT_ID
                for (var i = 0; i < aRows.length; i++) {
                    var oObject = {};
                    aHeaders.forEach(function (sHeader, j) {
                        oObject[sHeader] = aRows[i][j];
                    });

                    var hasMandatoryFields = oObject.PRODUCT_ID && oObject.CHAR_NUM && oObject.CHAR_NAME &&
                        oObject.CHAR_DESC && oObject.CHAR_TYPE;
                    var hasNonEmptyValue = Object.values(oObject).some(value => value !== null && value !== undefined && value !== '');

                    if (!hasMandatoryFields || !hasNonEmptyValue) {
                        sap.m.MessageToast.show("Error: All mandatory fields must be filled with valid data.");
                        sap.ui.core.BusyIndicator.hide();
                        return false;
                    }

                    if (hasNonEmptyValue && oObject.CHAR_TYPE && oObject.CHAR_TYPE !== 'P' && oObject.CHAR_TYPE !== 'S') {
                        sap.m.MessageToast.show("Error: CHAR_TYPE must be either 'Primary(p)' or 'Secondary(s)'.");
                        sap.ui.core.BusyIndicator.hide();
                        return false;
                    }

                    var productId = oObject.PRODUCT_ID;
                    if (!productDataMap[productId]) {
                        productDataMap[productId] = [];
                    }
                    productDataMap[productId].push(oObject);
                }

                // Process data into batches ensuring total does not exceed 30K
                var currentBatch = [];
                var currentBatchSize = 0;
                var allProductIds = Object.keys(productDataMap);
                var batchProductIds = new Set();

                for (var i = 0; i < allProductIds.length; i++) {
                    var productId = allProductIds[i];
                    var productData = productDataMap[productId];
                    var productSize = productData.length;

                    if (currentBatchSize + productSize > batchSizeLimit) {
                        if (currentBatch.length > 0) {
                            allBatches.push({ products: Array.from(batchProductIds), data: currentBatch });
                        }
                        currentBatch = [];
                        currentBatchSize = 0;
                        batchProductIds.clear();
                    }

                    currentBatch = currentBatch.concat(productData);
                    currentBatchSize += productSize;
                    batchProductIds.add(productId);
                }

                if (currentBatch.length > 0) {
                    allBatches.push({ products: Array.from(batchProductIds), data: currentBatch });
                }

                // Function to upload batches recursively
                function uploadBatch(batchIndex) {
                    if (batchIndex >= allBatches.length) {
                        sap.m.MessageToast.show("All data uploaded successfully.");
                        return;
                    }

                    var batch = allBatches[batchIndex];
                    var batchData = batch.data;


                    sap.ui.core.BusyIndicator.show();
                    that.getModel("BModel").callFunction("/changeToPrimaryNewMulti", {
                        method: "GET",
                        urlParameters: {
                            CharData: JSON.stringify(batchData)
                        },
                        success: function () {
                            sap.ui.core.BusyIndicator.hide();
                            uploadBatch(batchIndex + 1);
                        },
                        error: function () {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Failed to upload batch.");
                        }
                    });
                }

                uploadBatch(0); // Start uploading batches
            },

            prodGroups: function (val1) {

                var Array1 = [];
                var dArray = [];
                // var Total = 100;
                for (let i = 0; i < val1.length; i++) {
                    var index = dArray.indexOf(val1[i].PRODUCT_ID);
                    if (index === -1) {
                        val1[i].visible = false;
                        var obj1 = {
                            PRODUCT: val1[i].PRODUCT_ID,
                            children: [val1[i]],
                            visible: true
                        }
                        dArray.push(val1[i].PRODUCT_ID)
                        Array1.push(obj1)
                    }
                    else {
                        val1[i].visible = false;
                        Array1[index].children.push(val1[i])
                    }
                }
                return Array1;
            },

            onCancel: function () {
                // Close the dialog
                //this.byId("yourDialogId").close();
                that.valueHelpClasUploadFrag.close()
            },

            onSelect: function (oEvent) {
                if (oEvent.getSource().getSelected() === true) {
                    const oExcel = oEvent.getSource().getBindingContext().getObject().FLAG = "E"
                } else {
                    const oExcel = delete (oEvent.getSource().getBindingContext().getObject().FLAG)
                }
            },

            onProceed: function (oEvent) {
                var oExcelData = sap.ui.getCore().byId("tree").getModel().getData()
                var ofinalUpload = [];
                sap.ui.getCore().byId("tree").getModel().getData().forEach(g => {
                    if (g.FLAG) {
                        g.children.forEach(j => {
                            ofinalUpload.push(j);
                        })
                    }
                });

                //  that.oSeq = ofinalUpload

                that.getModel("BModel").callFunction("/changeToPrimaryNewMulti", {
                    method: "GET",
                    urlParameters: {
                        CharData: JSON.stringify(ofinalUpload)
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        //    that.onPressUpdate();
                    },
                    error: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Failed to changes the update");
                    },
                });
                //   that.oAllsave(); // function for Groups Up

            },

            // oCharPrioritizprocessExcelData: function (aData) {
            //     var aHeaders = aData[0];
            //     var aRows = aData.slice(1);
            //     var resultArray1 = [];
            //     var productSequenceMap = {};

            //     for (var i = 0; i < aRows.length; i++) {
            //         var oObject = {};
            //         aHeaders.forEach(function (sHeader, j) {
            //             oObject[sHeader] = aRows[i][j];
            //         });

            //         // checking in object all values must have valid data
            //         var hasMandatoryFields = oObject.PRODUCT_ID && oObject.CHAR_NUM && oObject.CHAR_NAME &&
            //             oObject.CHAR_DESC && oObject.CHAR_TYPE && oObject.SEQUENCE !== undefined;

            //         var hasNonEmptyValue = Object.values(oObject).some(function (value) {
            //             return value !== null && value !== undefined && value !== '';
            //         });

            //         // Check if mandatory fields are valid
            //         if (!hasMandatoryFields || !hasNonEmptyValue) {
            //             sap.m.MessageToast.show("Error: All mandatory fields must be filled with valid data.");
            //             return false;
            //         }

            //         //  verifying CHAR_TYPE Primary(p),Secondary(s) or not..
            //         if (hasNonEmptyValue && oObject.CHAR_TYPE && oObject.CHAR_TYPE !== 'P' && oObject.CHAR_TYPE !== 'S') {
            //             sap.m.MessageToast.show("Error: CHAR_TYPE must be either 'Primary(p)' or 'Secondary(s)'.");
            //             return false;
            //         }


            //         // verifying if any duplicate seq found

            //         if (hasNonEmptyValue) {
            //             var productId = oObject.PRODUCT_ID;
            //             var sequence = oObject.SEQUENCE;

            //             if (!productSequenceMap[productId]) {
            //                 productSequenceMap[productId] = new Set();
            //             }
            //             if (productSequenceMap[productId].has(sequence)) {
            //                 sap.m.MessageToast.show("Error: Duplicate SEQUENCE value for PRODUCT_ID: " + productId);
            //                 return false;
            //             }

            //             productSequenceMap[productId].add(sequence);
            //             resultArray1.push(oObject);
            //         }
            //     }

            //     that.oUploadclassData1 = resultArray1;

            //     var pData = that.oUploadclassData1.filter(el => el.CHAR_TYPE === "P");
            //     var sData = that.oUploadclassData1.filter(el => el.CHAR_TYPE === "S");

            //     that.oUploadclassData = pData.concat(sData)

            //     that.oUploadclassData.forEach((el, i) => {
            //         el.SEQUENCE = i + 1;
            //     })

            //     that.oAllPrds
            //     that.Product_Id = [];

            //     // Loop through the oUploadclassData array
            //     that.oUploadclassData.forEach(uploadData => {
            //         // Find a matching object in the oAllPrds array
            //         const matchedPrd = that.oAllPrds.find(prd =>
            //             prd.PRODUCT_ID === uploadData.PRODUCT_ID &&
            //             prd.CHAR_NUM === uploadData.CHAR_NUM &&
            //             prd.CHAR_NAME === uploadData.CHAR_NAME
            //         );

            //         // If a match is found, add GROUP_NAME and WEIGHTAGE to the uploadData object
            //         if (matchedPrd) {
            //             uploadData.GROUP_NAME = matchedPrd.GROUP_NAME;
            //             uploadData.WEIGHTAGE = matchedPrd.WEIGHTAGE;
            //         }

            //         if (uploadData.CHAR_TYPE === 'S') {
            //             uploadData.GROUP_NAME = ""
            //             uploadData.WEIGHTAGE = null;
            //         }
            //     });


            //     that.oUploadclassData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //     that.PrimarylistModel.setData({
            //         results:  that.oUploadclassData,
            //     });
            //  //   that.oFinalData = Data;
            //     that.PrimarylistModel.setSizeLimit(5000);
            //     that.oPList.setModel(that.PrimarylistModel);

            //     var items = that.oPList.getItems();
            //     for (let i = 0; i < items.length; i++) {
            //         var data = that.oUploadclassData.find(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);
            //         if (data) {
            //             items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data.GROUP_NAME);
            //         }
            //     }

            //     // for upload used below function
            //     // that.onSaveSeq12();
            //     return true;
            // },


            // Characteristic Uploaded functionality

            // oCharPrioritizprocessExcelData: function (aData) {
            //     var aHeaders = aData[0];
            //     var aRows = aData.slice(1);
            //     var resultArray1 = [];
            //     var productSequenceMap = {};

            //     for (var i = 0; i < aRows.length; i++) {
            //         var oObject = {};
            //         aHeaders.forEach(function (sHeader, j) {
            //             oObject[sHeader] = aRows[i][j];
            //         });

            //         // checking in object all values must have valid data
            //         var hasMandatoryFields = oObject.PRODUCT_ID && oObject.CHAR_NUM && oObject.CHAR_NAME &&
            //             oObject.CHAR_DESC && oObject.CHAR_TYPE && oObject.SEQUENCE !== undefined;

            //         var hasNonEmptyValue = Object.values(oObject).some(function (value) {
            //             return value !== null && value !== undefined && value !== '';
            //         });

            //         // Check if mandatory fields are valid
            //         if (!hasMandatoryFields || !hasNonEmptyValue) {
            //             sap.m.MessageToast.show("Error: All mandatory fields must be filled with valid data.");
            //             return false;
            //         }

            //         // verifying CHAR_TYPE Primary(p), Secondary(s) or not..
            //         if (hasNonEmptyValue && oObject.CHAR_TYPE && oObject.CHAR_TYPE !== 'P' && oObject.CHAR_TYPE !== 'S') {
            //             sap.m.MessageToast.show("Error: CHAR_TYPE must be either 'Primary(p)' or 'Secondary(s)'.");
            //             return false;
            //         }

            //         // verifying if any duplicate seq found
            //         if (hasNonEmptyValue) {
            //             var productId = oObject.PRODUCT_ID;
            //             var sequence = oObject.SEQUENCE;

            //             if (!productSequenceMap[productId]) {
            //                 productSequenceMap[productId] = new Set();
            //             }
            //             if (productSequenceMap[productId].has(sequence)) {
            //                 sap.m.MessageToast.show("Error: Duplicate SEQUENCE value for PRODUCT_ID: " + productId);
            //                 return false;
            //             }

            //             productSequenceMap[productId].add(sequence);
            //             resultArray1.push(oObject);
            //         }
            //     }

            //     that.oUploadclassData1 = resultArray1;

            //     // Filter and sort data by CHAR_TYPE and SEQUENCE
            //     var pData = that.oUploadclassData1
            //         .filter(el => el.CHAR_TYPE === "P")
            //         .sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //     var sData = that.oUploadclassData1
            //         .filter(el => el.CHAR_TYPE === "S")
            //         .sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //     // Concatenate P data first, then S data
            //     that.oUploadclassData = [...pData, ...sData];

            //     // Reassign SEQUENCE values based on the new order
            //     that.oUploadclassData.forEach((el, i) => {
            //         el.SEQUENCE = i + 1;
            //     });

            //     // Update GROUP_NAME and WEIGHTAGE properties
            //     that.oUploadclassData.forEach(uploadData => {
            //         const matchedPrd = that.oAllPrds.find(prd =>
            //             prd.PRODUCT_ID === uploadData.PRODUCT_ID &&
            //             prd.CHAR_NUM === uploadData.CHAR_NUM &&
            //             prd.CHAR_NAME === uploadData.CHAR_NAME
            //         );

            //         if (matchedPrd) {
            //             uploadData.GROUP_NAME = matchedPrd.GROUP_NAME;
            //             uploadData.WEIGHTAGE = matchedPrd.WEIGHTAGE;
            //         }

            //         if (uploadData.CHAR_TYPE === 'S') {
            //             uploadData.GROUP_NAME = "";
            //             uploadData.WEIGHTAGE = null;
            //         }
            //     });

            //     // Set the sorted data to the model
            //     that.PrimarylistModel.setData({
            //         results: that.oUploadclassData,
            //     });

            //     that.PrimarylistModel.setSizeLimit(5000);
            //     that.oPList.setModel(that.PrimarylistModel);

            //     // Bind the GROUP_NAME values to the table items
            //     var items = that.oPList.getItems();
            //     for (let i = 0; i < items.length; i++) {
            //         var data = that.oUploadclassData.find(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);
            //         if (data) {
            //             items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data.GROUP_NAME);
            //         }
            //     }

            //     return true;
            // },

            // onSaveSeq12: function (index, data) {
            //     that.Product_Id = that.oUploadclassData[0].PRODUCT_ID;
            //     that.getModel("BModel").callFunction("/updateCharConfig", {
            //         method: "GET",
            //         urlParameters: {
            //             CHARDATA: JSON.stringify(that.oUploadclassData)
            //         },
            //         success: function (oData) {

            //             that.onGetData()
            //             sap.ui.core.BusyIndicator.hide();
            //             MessageToast.show("Succesfully uploaded")

            //         },
            //         error: function (oData) {
            //             sap.ui.core.BusyIndicator.hide();
            //             MessageToast.show("Failed to changes the char");
            //         },
            //     });


            //     // for (var i = 0; i < that.oUploadclassData.length; i++) {


            //     //     var oEntry = {};
            //     //     var oPrd = that.byId("idCommon").getValue()
            //     //     if (oPrd != "") {
            //     //         oEntry.product = oPrd
            //     //     } else {
            //     //         oEntry.product = that.oUploadclassData[i].PRODUCT_ID
            //     //     }
            //     //     //  oEntry.product = that.byId("idCommon").getValue();
            //     //     oEntry.CharNo = that.oUploadclassData[i].CHAR_NUM;
            //     //     oEntry.SEQUENCE = that.oUploadclassData[i].SEQUENCE;
            //     //   //  oEntry.FLAG = "E";
            //     //     oEntry.CHAR_TYPE = that.oUploadclassData[i].CHAR_TYPE;

            //     //     // that.getModel("BModel").callFunction("/changeToPrimary", {
            //     //     //     method: "GET",
            //     //     //     urlParameters: {
            //     //     //         PRODUCT_ID: oEntry.product,
            //     //     //         CHAR_NUM: oEntry.CharNo,
            //     //     //         SEQUENCE: oEntry.SEQUENCE,
            //     //     //         CHAR_TYPE: oEntry.CHAR_TYPE,
            //     //     //         GROUP_NAME: "",
            //     //     //         FLAG: oEntry.FLAG,
            //     //     //     },
            //     //     that.getModel("BModel").callFunction("/updateCharConfig", {
            //     //              method: "GET",
            //     //              urlParameters:{
            //     //                 CHARDATA:  JSON.stringify(oEntry.USERDATA)
            //     //              },

            //     //         success: function (oData) {
            //     //             sap.ui.core.BusyIndicator.hide();
            //     //             if (oData.changeToPrimary) {
            //     //                 successCount = successCount + 1;
            //     //             }
            //     //             if (successCount + 1 === that.count2) {
            //     //                 that.byId("searchField").setValue("");
            //     //                 //   that.onCharSearch();
            //     //                 that.onGetData()
            //     //                 MessageToast.show("Successfully changed the sequence");
            //     //             }
            //     //         },
            //     //         error: function (oData) {
            //     //             sap.ui.core.BusyIndicator.hide();
            //     //             MessageToast.show("Failed to changes the char");
            //     //         },
            //     //     });

            //     // }
            // },


            /**
           * This function is called when click on Value help on Input box.
           * In this function based in sId will open the dialogs.
           * @param {object} oEvent -the event information.
           */
            handleValueHelp: function (oEvent) {
                var sId = oEvent.getParameter("id");
                // Loc Dialog
                if (sId.includes("oLoc")) {
                    that._valueHelpDialogLoc.open();
                    // Prod Dialog
                }
                else
                    if (sId.includes("prod")) {
                        // if (that.byId("idloc").getValue()) {
                        // service to get the products based of location

                        that._valueHelpDialogProd.open();


                        // } else {
                        //     MessageToast.show("Select Location");
                        // }
                    }
            },

            /**
             * Called when 'Close/Cancel' button in any dialog is pressed.
             * In this function based in sId will close the dialogs.
             */
            handleClose: function (oEvent) {
                var sId = oEvent.getParameter("id");

                if (sId.includes("prod")) {
                    that._oCore
                        .byId(this._valueHelpDialogProd.getId() + "-searchField")
                        .setValue("");
                    if (that.oProdList.getBinding("items")) {
                        that.oProdList.getBinding("items").filter([]);
                    }
                }
                that.oLocList = sap.ui.getCore().byId("LocSlctListCPS");
                //  that.oLocList.getBinding("items").filter([]);
            },

            /**
             * Called when something is entered into the search field.
             * @param {object} oEvent -the event information.
             */
            handleSearch1: function (oEvent) {
                var sQuery =
                    oEvent.getParameter("value") || oEvent.getParameter("newValue"),
                    sId = oEvent.getParameter("id"),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";

                if (sId.includes("LocS")) {
                    if (sQuery !== "") {
                        oFilters.push(
                            new Filter({
                                filters: [
                                    new Filter("FACTORY_LOC", FilterOperator.Contains, sQuery),
                                    new Filter("LOCATION_DESC", FilterOperator.Contains, sQuery),
                                    // new Filter("DEMAND_LOC", FilterOperator.Contains, sQuery),
                                    // new Filter("DEMAND_DESC", FilterOperator.Contains, sQuery),
                                ],
                                and: false,
                            })
                        );
                    }
                    that.oLocList = sap.ui.getCore().byId("LocSlctListCPS")
                    that.oLocList.getBinding("items").filter(oFilters);
                    if (that.oLocList.getItems().length == 0) {
                        that.oLocList.setNoDataText("No Data");
                    }
                }

                if (sId.includes("prod")) {
                    if (sQuery !== "") {
                        oFilters.push(
                            new Filter({
                                filters: [
                                    new Filter("PRODUCT_ID", FilterOperator.Contains, sQuery),
                                    new Filter("PROD_DESC", FilterOperator.Contains, sQuery),
                                ],
                                and: false,
                            })
                        );
                    }
                    that.oProdList.getBinding("items").filter(oFilters);
                }
            },



            /**
           * This function is called when selection on dialogs list.
           * Selections will be made based on sId.
           * @param {object} oEvent -the event information.
           */

            // getUser2: function () {
            //     var oModel = this.getOwnerComponent().getModel("BModel");
            //     var vUser = this.getUserDetails();
            //     var oEntry = {
            //         USERDATA: []
            //     };
            //     let oParamVals = {
            //         USEREMAIL: vUser
            //     };
            //     oEntry.USERDATA.push(oParamVals);
            //     oModel.callFunction("/genUserAppVisibility", {
            //         method: "GET",
            //         urlParameters: {
            //             FLAG: 'G',
            //             USERDATA: JSON.stringify(oEntry.USERDATA)
            //         },
            //         success: function (oData) {
            //             aResults = oData.results;
            //             if (aResults.length > 0) {
            //                 var isUserLoggedIn = true;
            //             }

            //             if (isUserLoggedIn) {
            //                 if (aResults[0].UPDATE_CHK === "disabled") {
            //                     that.byId("idUpdate2").setEnabled(false);
            //                 }
            //                 if (aResults[0].DELETE_CHK === "disabled") {
            //                     that.byId("idReset2").setEnabled(false);
            //                 }
            //             }
            //             else {
            //                 that.byId("idUpdate2").setEnabled(false);
            //                 that.byId("idReset2").setEnabled(false);
            //             }

            //         },
            //         error: function (oData, error) {
            //             MessageToast.show("error");
            //         }
            //     });
            // },



            onPrimarySearch12: function () {
                var sQuery = that.byId("idPrimarySearch").getValue(),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";

                if (sQuery !== "") {
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("CHAR_NAME", FilterOperator.Contains, sQuery),

                            ],
                            and: false,
                        })
                    );
                }
                that.byId("Primarytable").getBinding("items").filter(oFilters);


            },




            onCharSearch: function (oEvent) {
                var sQuery = that.byId("searchField").getValue(),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";

                if (sQuery !== "") {
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("CHAR_NAME", FilterOperator.Contains, sQuery),
                                // new Filter("CHAR_DESC", FilterOperator.Contains, sQuery),
                            ],
                            and: false,
                        })
                    );
                }
                that.byId("Secondarytable").getBinding("items").filter(oFilters);

                // var sQuery = that.byId("searchField").getValue(),
                //     aData = this.byId("Secondarytable").getItems();
                // sQuery = sQuery ? sQuery.trim() : "";
                // if (sQuery === "") {
                //     aData[0].focus();
                //     aData[0].setSelected(true);

                // } else {

                //     sQuery = sQuery.split("-")[0].trim();
                //     // sQuery = sQuery ? sQuery.trim() : "";

                //     for (var i = 0; i < aData.length; i++) {
                //         if (sQuery === aData[i].getCells()[1].getText()) {
                //             aData[i].focus();
                //             aData[i].setSelected(true);
                //         }
                //     }
                // }
            },

            onSuggest: function (event) {
                var sValue = event.getParameter("suggestValue"),
                    aFilters = [];
                aFilters = [
                    new Filter([
                        new Filter("Char", function (sText) {
                            return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                        }),
                        // new Filter("CHAR_DESC", function (sText) {
                        //     return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                        // })
                    ], false)
                ];
                if (that.byId("idIconTabBarFiori2").mProperties.selectedKey == "info") {
                    this.byId("searchField").getBinding("suggestionItems").filter(aFilters);
                    this.byId("searchField").suggest();
                }
                else if (that.byId("idIconTabBarFiori2").mProperties.selectedKey == "notes") {
                    this.byId("searchField2").getBinding("suggestionItems").filter(aFilters);
                    this.byId("searchField2").suggest();
                }
            },



            onNavPress: function () {
                if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
                    var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
                    // generate the Hash to display 
                    var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
                        target: {
                            semanticObject: "VCPDocument",
                            action: "Display"
                        }
                    })) || "";
                    //Generate a  URL for the second application
                    var url = window.location.href.split('#')[0] + hash;
                    //Navigate to second app
                    sap.m.URLHelper.redirect(url, true);
                }
            },

            //Reset the data
            onReset1: function () {
                // var sLoc = that.byId("idloc").getValue(),
                var text = "Active Planning Details exist. Would you like to continue?";
                sap.m.MessageBox.show(
                    text, {
                    title: "Confirmation",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.YES) {
                            var sProd = that.byId("idCommon").getValue();
                            that.oSelectedItem = "";
                            if (sProd !== "") {
                                that.getModel("BModel").callFunction("/getSecondaryChar", {
                                    method: "GET",
                                    urlParameters: {
                                        FLAG: "R",
                                        // LOCATION_ID: sLoc,
                                        PRODUCT_ID: sProd
                                    },
                                    success: function (oData) {
                                        sap.ui.core.BusyIndicator.hide();
                                        that.oPList = that.byId("Primarytable"),
                                            that.oSList = that.byId("Secondarytable");

                                        that.primaryData = [],
                                            that.secData = [];

                                        for (var i = 0; i < oData.results.length; i++) {
                                            if (oData.results[i].CHAR_TYPE === "P") {
                                                that.primaryData.push(oData.results[i]);
                                            } else {
                                                that.secData.push(oData.results[i]);
                                            }
                                        }


                                        that.finalpriData = [];
                                        that.finalpriData = that.primaryData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


                                        that.finalSecData = [];
                                        that.finalSecData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

                                        that.PrimarylistModel.setData({
                                            results: that.finalpriData,
                                        });
                                        that.PrimarylistModel.setSizeLimit(5000);
                                        that.oPList.setModel(that.PrimarylistModel);

                                        that.SeclistModel.setData({
                                            results: that.finalSecData,
                                        });
                                        that.SeclistModel.setSizeLimit(5000);
                                        that.oSList.setModel(that.SeclistModel);

                                        that.searchlist = that.finalSecData;//that.SeclistModel;


                                        that.searchlist.forEach(function (row) {

                                            row.CHAR_NAME = row.CHAR_NAME + " - " + row.CHAR_DESC;

                                        }, that);


                                        that.byId("searchField").setModel(that.SeclistModel);
                                        MessageToast.show("Reload Successfull");

                                    },
                                    error: function (oData, error) {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageToast.show("error");
                                    },
                                });
                            } else {
                                MessageToast.show("Please select Product");
                            }
                        }

                    }
                }
                );
            },



            //CLASS IBP CHARACTERISTICS//


            /**
                   * Called when something is entered into the search field.
                   * @param {object} oEvent -the event information.
                   */
            handleSearch2: function (oEvent) {


                // if(oEvent !== undefined){
                var sQuery = oEvent.getParameter("value") || oEvent.getParameter("newValue")
                var sId = oEvent.getParameter("id");
                // }
                // else{
                //     var sQuery = that.byId("idCommon").getValue();
                // }
                var oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";
                // if (sId.includes("idPartialSearch")) {
                if (sQuery !== "") {
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("CLASS_NAME", FilterOperator.Contains, sQuery),
                                new Filter("CLASS_DESC", FilterOperator.Contains, sQuery)
                            ],
                            and: false,
                        })
                    );
                }
                that.byId("classList").getBinding("items").filter(oFilters);

            },

            // Service changed
            onSaveChar: function () {
                var that = this;
                //    that.getEnable();

                var finlData = [];
                // var selectedItems = that.selectedChars;
                var selectedItems = that.byId("prodList").getSelectedItems();

                var checkedItems = that.getView().byId("prodList").getSelectedItems();

                // Collect data based on selected items
                if (selectedItems.length === 0) {

                    let initData = {
                        PRODUCT_ID: that.oItem,
                        CHAR_NAME: "",
                        CHAR_VALUE: "",
                        CHAR_NUM: "",
                        CLASS_NAME: ""

                    };
                    finlData.push(initData);
                } else {
                    for (var i = 0; i < selectedItems.length; i++) {
                        let sChar = selectedItems[i].getCells()[0].getText(),
                            sClassName = selectedItems[i].getCells()[3].getText();
                        //   that.loadArray = that.loadArray.map(({ selected, ...item }) => item);
                        // that.loadArray.forEach(item => {
                        //     item.SELECTED = item.SELECTED === "true";
                        // });

                        let aData = that.loadArray.filter(f => f.CHAR_NAME === sChar && f.CLASS_NAME === sClassName);
                        if (aData.length > 0) {
                            aData.forEach(el => {
                                let initData = {
                                    PRODUCT_ID: that.oItem,
                                    CHAR_NAME: el.CHAR_NAME,
                                    CHAR_DESC: el.CHAR_DESC,
                                    CHAR_VALUE: el.CHAR_VALUE,
                                    CHARVAL_DESC: el.CHARVAL_DESC,
                                    CHAR_NUM: el.CHAR_NUM,
                                    CHARVAL_NUM: el.CHARVAL_NUM,
                                    CLASS_NAME: el.CLASS_NAME,
                                    CLASS_DESC: el.CLASS_DESC,
                                    SELECTED: true
                                };
                                finlData.push(initData);
                            });
                        }
                    }
                }
                // finlData = removeDuplicate(finlData, 'CHAR_VALUE');
                // function removeDuplicate(array, key) {
                //     var check = new Set();
                //     return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                // }

                // Show a warning dialog if there are checked items
                //    if (checkedItems.length > 0) {
                sap.m.MessageBox.warning("Partial Products Configuration has already been used in planning. Any modification would lead to discrepancies and needs reprocessing. Would you like to continue with the change?", {
                    title: "Warning",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.YES) {
                            // Save data only if user clicked "Yes"
                            that.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                                method: "GET",
                                urlParameters: {
                                    Flag: "C",
                                    PRODATA: JSON.stringify(finlData)
                                },
                                success: function (oData) {
                                    // if(oData.getProductCharVal === "Not saved"){
                                    //     MessageToast.show("Update failed");
                                    //     // that.byId("prodList").getBinding("items").filter([]);
                                    //     return false
                                    // }
                                    that.oPreviousSelection = [];
                                    that.partialProd = [];
                                    that.byId("idPartialSearch").setValue();
                                    that.byId("prodList").getBinding("items").filter([]);
                                    sap.ui.core.BusyIndicator.hide();
                                    MessageToast.show("Successfully saved");
                                    that.partialFlag = "X";
                                    that.cFlag = "";
                                    //   that.oSave()
                                    that.onGetData3();
                                },
                                error: function (error) {
                                    sap.ui.core.BusyIndicator.hide();
                                    MessageToast.show("Error occurred while saving.");
                                }
                            });
                        } else if (oAction === sap.m.MessageBox.Action.NO) {
                            // Do nothing or handle cancellation
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Operation canceled. No changes were saved.");
                        }
                    }
                });
                //  }
                // else {
                //     // If no items are checked, directly save the data
                //     that.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                //         method: "GET",
                //         urlParameters: {
                //             Flag: "C",
                //             PRODATA: JSON.stringify(finlData)
                //         },
                //         success: function (oData) {
                //             that.byId("idSearch").setValue();
                //             that.byId("prodList").getBinding("items").filter([]);
                //             sap.ui.core.BusyIndicator.hide();
                //             MessageToast.show("Successfully saved");
                //             that.onGetData3(); 
                //         },
                //         error: function (error) {
                //             sap.ui.core.BusyIndicator.hide();
                //             MessageToast.show("Error occurred while saving.");
                //         }
                //     });
                // }
            },


            // Partial Product Characteristics app save functionality
            // onSaveChar: function () {
            //     var that = this;
            //     var oProd = that.byId("idCommon").getValue();
            //     if (oProd.length === 0) {
            //         MessageToast.show("No data for update..")
            //         return false;
            //     }
            //     that.getEnable();
            //     that.oStore = [];
            //     // if (that.oAllfalse = "F") {
            //     //     that.oPreviousSelection = [];
            //     //     that.oAllfalse = ""
            //     // }
            //     // if (that.unselected.length > 0) {
            //     //     that.oPreviousSelection = that.oPreviousSelection.filter(groupItem =>
            //     //         !that.unselected.some(delItem =>
            //     //             delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
            //     //             delItem.CHAR_NUM === groupItem.CHAR_NUM &&
            //     //             delItem.CHAR_NAME === groupItem.CHAR_NAME
            //     //         )
            //     //     );
            //     // }
            //     // that.oPreviousSelection = that.oPreviousSelection.filter(obj => obj.CHAR_NUM);
            //     // sap.ui.core.BusyIndicator.show();

            //     var finlData = [];
            //     if (that.oPreviousSelection.length > 1) {
            //         finlData = that.oPreviousSelection
            //     }
            //     // var selectedItems = that.selectedChars;
            //     var selectedItems = that.byId("prodList").getSelectedItems();

            //     var checkedItems = that.getView().byId("prodList").getSelectedItems();

            //     // Collect data based on selected items
            //     if (selectedItems.length === 0) {
            //         // finlData = that.oListModel.oData.results;
            //         // sap.ui.core.BusyIndicator.hide();
            //         let initData = {
            //             PRODUCT_ID: that.oItem,
            //             CHAR_NAME: "",
            //             CHAR_VALUE: "",
            //             CHAR_NUM: "",
            //             CLASS_NAME: ""

            //         };
            //         finlData.push(initData);

            //         //   return;
            //     } else {
            //         for (var i = 0; i < selectedItems.length; i++) {
            //             let sChar = selectedItems[i].getCells()[0].getText(),
            //                 sClassName = selectedItems[i].getCells()[3].getText();
            //             let aData = that.loadArray.filter(f => f.CHAR_NAME === sChar && f.CLASS_NAME === sClassName);
            //             if (aData.length > 0) {
            //                 aData.forEach(el => {
            //                     let initData = {
            //                         PRODUCT_ID: that.oItem,
            //                         CHAR_NAME: el.CHAR_NAME,
            //                         CHAR_DESC: el.CHAR_DESC,
            //                         CHAR_VALUE: el.CHAR_VALUE.trim(),
            //                         CHARVAL_DESC: el.CHARVAL_DESC,
            //                         CHAR_NUM: el.CHAR_NUM,
            //                         CHARVAL_NUM: el.CHARVAL_NUM.trim(),
            //                         CLASS_NAME: el.CLASS_NAME,
            //                         CLASS_DESC: el.CLASS_DESC,
            //                     };
            //                     finlData.push(initData);
            //                 });
            //             }
            //             finlData = finlData.filter(obj => obj.CHAR_NUM);
            //         }
            //     }
            //     // var oAlfinal = [];
            //     // var abj = {}
            //     // for (var i = 0; i < finlData.length; i++) {
            //     //     abj.PRODUCT_ID = finlData[i].PRODUCT_ID
            //     //     abj.CHAR_NUM = finlData[i].CHAR_NUM
            //     //     oAlfinal.push(abj)
            //     // }

            //     // Show a warning dialog if there are checked items
            //     //       if (checkedItems.length > 0) {
            //     sap.m.MessageBox.warning("Partial Products Configuration has already been used in planning. Any modification would lead to discrepancies and needs reprocessing. Would you like to continue with the change?", {
            //         title: "Warning",
            //         actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
            //         onClose: function (oAction) {
            //             if (oAction === sap.m.MessageBox.Action.YES) {
            //                 // Save data only if user clicked "Yes"
            //                 that.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
            //                     method: "GET",
            //                     urlParameters: {
            //                         Flag: "C",
            //                         PRODATA: JSON.stringify(finlData)
            //                     },
            //                     success: function (oData) {
            //                         that.oPreviousSelection = [];

            //                         that.oPartialSelected = oData.results
            //                         for (var i = 0; i < that.oPartialSelected.length; i++) {
            //                             delete that.oPartialSelected[i].__metadata
            //                         }
            //                         that.partialProd = [];
            //                         that.byId("idPartialSearch").setValue();
            //                         that.byId("prodList").getBinding("items").filter([]);
            //                         sap.ui.core.BusyIndicator.hide();
            //                         MessageToast.show("Successfully saved");
            //                         that.partialFlag = "X";
            //                         that.cFlag = "";
            //                         //   that.oSave()
            //                         that.onGetData3();
            //                     },
            //                     error: function (error) {
            //                         sap.ui.core.BusyIndicator.hide();
            //                         MessageToast.show("Error occurred while saving.");
            //                     }
            //                 });
            //             } else if (oAction === sap.m.MessageBox.Action.NO) {
            //                 // Do nothing or handle cancellation
            //                 that.onGetData3();
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("Operation canceled. No changes were saved.");
            //             }
            //         }
            //     });
            //     //       }

            // },

            /*  ===============> All functions of Partial Product Characteristics  <======================
            
              /* Partial Product Characteristics app when click on go, this below function work
                  ====================> Partial Production Tab <======================*/


            onGetData31: function () {
                var table = that.byId("prodList");
                var tableItems = table.getItems();
                that.oStore = [];
                // Reset all selections
                tableItems.forEach(item => item.setSelected(false));
                // that.getEnable();
                that.oGModel.setProperty("/flag", "");
                that.skip = 0;
                that.byId("idPartialSearch").setValue();
                var selectedItem = that.byId("idCommon").getValue();
                if (selectedItem !== "") {
                    sap.ui.core.BusyIndicator.show();

                    that.byId("idSaveBtn").setEnabled(true);

                    that.byId("idPartialSearch").setValue("");
                    //   that.byId("prodList").removeSelections();
                    sap.ui.core.BusyIndicator.show();
                    that.loadArray = [];
                    that.AvailChars = [];
                    var data = {
                        PRODUCT_ID: selectedItem
                    }, finalData = [];
                    finalData.push(data);
                    sap.ui.core.BusyIndicator.show();
                    that.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                        method: "GET",
                        urlParameters: {
                            Flag: "X",
                            PRODATA: JSON.stringify(finalData)
                        },
                        success: function (oData) {
                            var ogetData = JSON.parse(oData.getProductCharVal)
                            //  that.Loadflag = true
                            that.cFlag = ""
                            sap.ui.core.BusyIndicator.hide();
                            ogetData.forEach(el => {
                                el.CHARVAL_NUM = el.CHARVAL_NUM.trim()
                                el.CHAR_VALUE = el.CHAR_VALUE.trim()
                            })

                            if (ogetData.length === 0) {
                                MessageToast.show("No characteristics available for the selected product");
                            }
                            else {
                                that.loadArray = ogetData;
                                //   that.partialProd = oData.results;
                                that.productChar = ogetData;
                                that.AvailChars = removeDuplicate(that.productChar, 'CHAR_NAME');
                                that.oListModel.setData({ results: that.AvailChars });
                                that.byId("prodList").setModel(that.oListModel);
                                function removeDuplicate(array, key) {
                                    var check = new Set();
                                    return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                                }
                            }

                            //       that.loadData();
                        },
                        error: function (error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });
                }
                else {
                    sap.ui.core.BusyIndicator.hide();
                    that.byId("idSaveBtn").setEnabled(true);
                    //    MessageToast.show("Please select a product");
                }
            },


            onGetData3: function () {
                var table = that.byId("prodList");
                var tableItems = table.getItems();
                that.oStore = [];
                // Reset all selections
                //   tableItems.forEach(item => item.setSelected(false));
                that.oGModel.setProperty("/flag", "");
                that.skip = 0;
                that.byId("idPartialSearch").setValue("");
                var selectedItem = that.byId("idCommon").getValue();
                if (selectedItem !== "") {
                    sap.ui.core.BusyIndicator.show();

                    that.byId("idSaveBtn").setEnabled(true);

                    that.byId("idPartialSearch").setValue("");
                    sap.ui.core.BusyIndicator.show();
                    that.loadArray = [];
                    that.AvailChars = [];
                    var data = {
                        PRODUCT_ID: selectedItem
                    }, finalData = [];
                    finalData.push(data);
                    sap.ui.core.BusyIndicator.show();
                    that.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                        method: "GET",
                        urlParameters: {
                            Flag: "X",
                            PRODATA: JSON.stringify(finalData)
                        },
                        success: function (oData) {
                            var ogetData = JSON.parse(oData.getProductCharVal);
                            that.cFlag = "";
                            sap.ui.core.BusyIndicator.hide();
                            ogetData.forEach(el => {
                                el.CHARVAL_NUM = el.CHARVAL_NUM.trim();
                                el.CHAR_VALUE = el.CHAR_VALUE.trim();
                            });

                            if (ogetData.length === 0) {
                                MessageToast.show("No characteristics available for the selected product");
                            } else {
                                that.loadArray = ogetData;
                                that.productChar = ogetData;
                                that.AvailChars = removeDuplicate(that.productChar, 'CHAR_NAME');
                                that.oListModel.setData({ results: that.AvailChars });
                                that.byId("prodList").setModel(that.oListModel);

                                // Function to remove duplicates
                                function removeDuplicate(array, key) {
                                    var check = new Set();
                                    return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                                }

                                // Set selected rows based on "selected" property in ogetData
                                // tableItems.forEach(item => {
                                //     var itemData = item.getBindingContext().getObject(); // Get row data
                                //     var matchedItem = ogetData.find(data => 
                                //         data.PRODUCT_ID === itemData.PRODUCT_ID &&
                                //         data.CLASS_NAME === itemData.CLASS_NAME &&
                                //         data.CHAR_NAME === itemData.CHAR_NAME
                                //     );
                                //     if (matchedItem && matchedItem.selected === true) {
                                //         item.setSelected(true); // Set row as selected
                                //     }
                                // });
                            }
                        },
                        error: function (error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Error");
                        },
                    });
                } else {
                    sap.ui.core.BusyIndicator.hide();
                    that.byId("idSaveBtn").setEnabled(true);
                }
            },


            loadData: function (skip, top) {
                var initData1 = {}, finlData1 = [];
                initData1 = {
                    PRODUCT_ID: that.oItem
                };
                finlData1.push(initData1);
                //     finlData1 = that.oUsePartialDownload
                that.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "Y",
                        PRODATA: JSON.stringify(finlData1)
                    },
                    success: function (oData) {
                        var ogetData = JSON.parse(oData.getProductCharVal)
                        that.unselected = []
                        that.oPreviousSelection = ogetData //oData.results

                        that.selectedChars = [];
                        if (ogetData.length === 0) {
                            sap.ui.core.BusyIndicator.hide();
                            that.partialProd = [];
                            that.partialFlag = "";
                            return;
                        }

                        that.selectedChars = ogetData;
                        let aDistinct = that.removeDuplicate(that.selectedChars, 'CHAR_NAME');
                        that.forDownattr = aDistinct
                        //  that.oSave()
                        var table = that.byId("prodList");
                        var tableItems = table.getItems();


                        // Apply new selections based on aDistinct
                        if (that.oGModel3.getProperty("/flag") !== "X") {
                            tableItems.forEach(item => {
                                var context = item.getBindingContext().getProperty();
                                for (var k = 0; k < aDistinct.length; k++) {
                                    if (context.PRODUCT_ID === aDistinct[k].PRODUCT_ID &&
                                        context.CHAR_NAME === aDistinct[k].CHAR_NAME &&
                                        context.CHAR_VALUE === aDistinct[k].CHAR_VALUE &&
                                        context.CLASS_NAME === aDistinct[k].CLASS_NAME) {
                                        item.setSelected(true);
                                        break;
                                    }
                                }
                            });
                            if (that.partialFlag === "X") {
                                // setTimeout(function () {
                                that.partialProd = [];
                                that.byId("prodList").getItems().forEach(x => {
                                    if (x.getSelected() === true) {
                                        x.getBindingContext().getObject().sel = true;
                                    }
                                    else {
                                        x.getBindingContext().getObject().sel = false;
                                    }
                                    that.partialProd.push(x.getBindingContext().getObject())
                                })
                                that.partialFlag = "";
                                // }, 2000);
                            }
                            // if (that.oCheked ===  false) {
                            //     tableItems.forEach(item => item.setSelected(false));
                            // }
                        }

                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this),
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Failed to get data");
                    }
                });
            },

            // this function works for when selecting partial products it converted to secondary chars and showing in scm attributes
            oSave: function () {

                var oFin = that.forDownattr

                var oAlfinal = [];
                for (var i = 0; i < oFin.length; i++) {
                    var abj = {}
                    abj.PRODUCT_ID = oFin[i].PRODUCT_ID
                    abj.CHAR_NUM = oFin[i].CHAR_NUM
                    oAlfinal.push(abj)
                }
                this.getOwnerComponent().getModel("BModel").callFunction("/changeToSecondary", {
                    method: "GET",
                    urlParameters: {
                        ProdData: JSON.stringify(oAlfinal)
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this),
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Failed to get data");
                    }
                });
            },


            // onTableItemsSelect: function (oEvent) {
            //     var Allselect = oEvent.getParameters().selectAll
            //     var oList = oEvent.getParameters().listItems.length
            //     var oTbaLength = that.byId("prodList").getItems().length
            //     // if (oList === oTbaLength) {
            //     //     if (Allselect === false) {
            //     //         that.oAllfalse = "F"
            //     //     }

            //     // }
            //     // var oEntry = {};
            //     // const item = oEvent.getParameters().listItem;
            //     // const bindingContext = item.getBindingContext();


            //     // const sPath = bindingContext.sPath;
            //     // const checked = item.getSelected();
            //     // const oObject = bindingContext.getObject();
            //     // that.unselected.push(oObject)

            //     if (oEvent.getParameter("selectAll")) {
            //         that.fullChars = that.AvailChars;
            //         that.selectedChars = [];
            //         for (var i = 0; i < that.AvailChars.length; i++) {
            //             oEntry = {
            //                 PRODUCT_ID: that.oItem,
            //                 CHAR_NAME: that.AvailChars[i].CHAR_NAME,
            //                 CHAR_DESC: that.AvailChars[i].CHAR_DESC,
            //                 CLASS_NAME: that.AvailChars[i].CLASS_NAME,
            //                 CLASS_DESC: that.AvailChars[i].CLASS_DESC
            //             }
            //             that.selectedChars.push(oEntry);
            //         }
            //         sap.ui.core.BusyIndicator.hide();
            //     }
            //     else {
            //         that.selectedChars = [];
            //         var selected = oEvent.getParameters().selected;
            //         if (selected) {
            //             oEntry = {
            //                 PRODUCT_ID: that.oItem,
            //                 CHAR_NAME: oEvent.getParameters().listItem.getCells()[0].getText(),
            //                 CHAR_DESC: oEvent.getParameters().listItem.getCells()[0].getTitle(),
            //                 CLASS_NAME: oEvent.getParameters().listItem.getCells()[3].getText(),
            //                 CLASS_DESC: oEvent.getParameters().listItem.getCells()[3].getTitle()
            //             }
            //             that.selectedChars.push(oEntry);
            //             sap.ui.core.BusyIndicator.hide();
            //         }
            //         else {
            //             var unSelectAll = oEvent.getParameters().listItems;
            //             if (unSelectAll.length === that.AvailChars.length) {
            //                 that.selectedChars = [];
            //             }
            //             else {
            //                 that.selectedChars = [];
            //                 var selectedId = oEvent.getParameters().listItem.getCells()[0].getText();
            //                 that.selectedChars = removeElementById(that.selectedChars, selectedId);
            //                 function removeElementById(array, idToRemove) {
            //                     return array.filter(function (obj) {
            //                         return obj.CHAR_NAME !== idToRemove;
            //                     });
            //                 }
            //             }
            //             sap.ui.core.BusyIndicator.hide();
            //         }
            //     }
            // },


            onTableItemsSelect: function (oEvent) {
                var oEntry = {};
                if (oEvent.getParameter("selectAll")) {
                    that.fullChars = that.AvailChars;
                    that.selectedChars = [];
                    for (var i = 0; i < that.AvailChars.length; i++) {
                        oEntry = {
                            PRODUCT_ID: that.oItem,
                            CHAR_NAME: that.AvailChars[i].CHAR_NAME,
                            CHAR_DESC: that.AvailChars[i].CHAR_DESC,
                            CLASS_NAME: that.AvailChars[i].CLASS_NAME,
                            CLASS_DESC: that.AvailChars[i].CLASS_DESC
                        }
                        that.selectedChars.push(oEntry);
                    }
                    sap.ui.core.BusyIndicator.hide();
                }
                else {
                    that.selectedChars = [];
                    var selected = oEvent.getParameters().selected;
                    if (selected) {
                        oEntry = {
                            PRODUCT_ID: that.oItem,
                            CHAR_NAME: oEvent.getParameters().listItem.getCells()[0].getText(),
                            CHAR_DESC: oEvent.getParameters().listItem.getCells()[0].getTitle(),
                            CLASS_NAME: oEvent.getParameters().listItem.getCells()[3].getText(),
                            CLASS_DESC: oEvent.getParameters().listItem.getCells()[3].getTitle()
                        }
                        that.selectedChars.push(oEntry);
                        sap.ui.core.BusyIndicator.hide();
                    }
                    else {
                        var unSelectAll = oEvent.getParameters().listItems;
                        if (unSelectAll.length === that.AvailChars.length) {
                            that.selectedChars = [];
                        }
                        else {
                            that.selectedChars = [];
                            var selectedId = oEvent.getParameters().listItem.getCells()[0].getText();
                            that.selectedChars = removeElementById(that.selectedChars, selectedId);
                            function removeElementById(array, idToRemove) {
                                return array.filter(function (obj) {
                                    return obj.CHAR_NAME !== idToRemove;
                                });
                            }
                        }
                        sap.ui.core.BusyIndicator.hide();
                    }
                }
            },

            onSearch: function (oEvent) {
                var sQuery = oEvent.getParameter("value") || oEvent.getParameter("newValue");
                var oTable = that.byId("prodList");
                var oBinding = oTable.getBinding("items");
                var oFilters = [];

                // Store the selected items' CHAR_NAME values before filtering
                var aSelectedContexts = oTable.getSelectedItems().map(item => item.getBindingContext().getObject().CHAR_NAME);

                // Apply filter if query is not empty
                sQuery = sQuery ? sQuery.trim() : "";
                if (sQuery !== "") {
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("CHAR_NAME", FilterOperator.Contains, sQuery),
                                new Filter("CHAR_DESC", FilterOperator.Contains, sQuery)
                            ],
                            and: false
                        })
                    );
                }
                //  that.byId("prodList").getBinding("items").filter(oFilters);
                oBinding.filter(oFilters);
                // var tableItems = oTable.getItems();

                // aSelectedContexts.forEach(function (item) {
                //     tableItems.forEach(function (tableItem) {
                //         var context = tableItem.getBindingContext();
                //         if (context) {
                //             var rowData = context.getProperty();
                //             if (rowData.CHAR_NAME == item) {
                //                 tableItem.setSelected(true);  // Select the matching row
                //             }
                //         }
                //     });
                // });

            },

            // oPartiaDownload: function () {
            //     that.AvailChars
            //     that.selectedChars

            //     that.AvailChars.forEach(availChar => {
            //         const isSelected = that.selectedChars.some(selectedChar =>
            //             selectedChar.PRODUCT_ID === availChar.PRODUCT_ID &&
            //             selectedChar.CHAR_NAME === availChar.CHAR_NAME &&
            //             selectedChar.CLASS_NAME === availChar.CLASS_NAME
            //         );
            //         //  availChar.SELECTED = isSelected; // Assign true or false
            //         availChar.SELECTED = isSelected.toString().toUpperCase();
            //     });
            //     var oGProduct = that.byId("idCommon").getValue();
            //     if (!oGProduct) {
            //         MessageToast.show("Select product for downlaod")
            //         return false
            //     }
            //     var exportToExcel = function () {
            //         var aCols = [
            //             { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
            //             { label: 'CHAR_NAME', property: 'CHAR_NAME', width: 30 },
            //             { label: 'CLASS_NAME', property: 'CLASS_NAME', width: 30 },
            //             { label: 'SELECTED', property: 'SELECTED', width: 30 }
            //         ];
            //         var oSettings = {
            //             workbook: {
            //                 columns: aCols,
            //             },
            //             dataSource: that.AvailChars,
            //             fileName: 'Partial Products.xlsx',
            //             worker: true
            //         };

            //         var oSheet = new sap.ui.export.Spreadsheet(oSettings);
            //         oSheet.build().then(function () {
            //             sap.m.MessageToast.show('Succesfully download');
            //         }).finally(function () {
            //             oSheet.destroy();
            //         });
            //     };
            //     // Call the export function to download the Excel file
            //     exportToExcel();
            // },


            /* Download & upload functionalities for Partial Products */

            oSaved_Data: function () {
                this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "A",
                        PRODATA: JSON.stringify("")
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        that.oAllselectedChars = oData.results

                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
            },

            // oPartiaDownload: function () {
            //     sap.ui.core.BusyIndicator.show();
            //     this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
            //         method: "GET",
            //         urlParameters: {
            //             Flag: "A",
            //             PRODATA: JSON.stringify("{}")
            //         },
            //         success: function (oData) {
            //             sap.ui.core.BusyIndicator.hide();
            //             var ogetDowndata = JSON.parse(oData.getProductCharVal)
            //             if (ogetDowndata.length === 0) {
            //                 MessageToast.show("No data for download");
            //             }
            //             else {

            //                 var oAlldndata = []
            //                 var oAlldndata = [];
            //                 for (var i = 0; i < ogetDowndata.length; i++) {
            //                     var customerGrpObj =
            //                     {
            //                         "PRODUCT_ID": ogetDowndata[i].PRODUCT_ID,
            //                         "CHAR_NAME": ogetDowndata[i].CHAR_NAME,
            //                         "CLASS_NAME": ogetDowndata[i].CLASS_NAME,
            //                         "SELECTED": ogetDowndata[i].selected.toUpperCase(),
            //                         "CHARVAL_NUM": ogetDowndata[i].CHARVAL_NUM,
            //                         "CHARVAL_DESC": ogetDowndata[i].CHARVAL_DESC,
            //                         "CHAR_DESC": ogetDowndata[i].CHAR_DESC,
            //                         "CHAR_NUM": ogetDowndata[i].CHAR_NUM,
            //                         "CHAR_VALUE": ogetDowndata[i].CHAR_VALUE,
            //                         "CLASS_DESC": ogetDowndata[i].CLASS_DESC
            //                         //    "CLASS_NUM": ogetDowndata[i].CLASS_NUM
            //                         // "IBPCHAR_CHK": ogetDowndata[i].IBPCHAR_CHK
            //                     }
            //                     oAlldndata.push(customerGrpObj)
            //                 }
            //                 var akeys = ["PRODUCT_ID", "CHAR_NAME"];
            //                 let aItems = that.removeDupScmrelevent(oAlldndata, akeys);
            //                 sap.ui.core.BusyIndicator.hide();
            //                 var exportToExcel = function () {
            //                     var aCols = [
            //                         { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
            //                         { label: 'CHAR_NAME', property: 'CHAR_NAME', width: 30 },
            //                         { label: 'CLASS_NAME', property: 'CLASS_NAME', width: 30 },
            //                         { label: 'SELECTED', property: 'SELECTED', width: 30 },
            //                         { label: 'CHARVAL_NUM', property: 'CHARVAL_NUM', width: 30 },
            //                         { label: 'CHARVAL_DESC', property: 'CHARVAL_DESC', width: 30 },
            //                         { label: 'CHAR_NUM', property: 'CHAR_NUM', width: 30 },
            //                         { label: 'CHAR_DESC', property: 'CHAR_DESC', width: 30 },
            //                         { label: 'CHAR_VALUE', property: 'CHAR_VALUE', width: 30 },
            //                         { label: 'CLASS_DESC', property: 'CLASS_DESC', width: 30 }
            //                         //    { label: 'CLASS_NUM', property: 'CLASS_NUM', width: 30 },
            //                         //     { label: 'IBPCHAR_CHK', property: 'IBPCHAR_CHK', width: 30 }
            //                     ];
            //                     var oSettings = {
            //                         workbook: {
            //                             columns: aCols,
            //                         },
            //                         dataSource: aItems,
            //                         fileName: 'Partial Products.xlsx',
            //                         worker: true
            //                     };

            //                     var oSheet = new sap.ui.export.Spreadsheet(oSettings);
            //                     oSheet.build().then(function () {
            //                         sap.m.MessageToast.show('Succesfully download');
            //                     }).finally(function () {
            //                         oSheet.destroy();
            //                     });
            //                 };
            //                 //  Call the export function to download the Excel file
            //                 exportToExcel();


            //             }
            //         },
            //         error: function (error) {
            //             sap.ui.core.BusyIndicator.hide();
            //             MessageToast.show("error");
            //         },
            //     });

            // },

            //// ============> working perfect <=====================/////////


            // Download functionality for Characteristic Prioritization tab

            oPartiaDownload: function () {
                var topCount = that.oGModel.getProperty("/MaxCount");
                that.oPartialLoclist = sap.ui.getCore().byId("oPartialLoc");

                if (!that.oPartialLoclist.getModel()) {
                    that._valueHelpDialogPartialLoc.open();
                    that.oPartialLoclist.setNoDataText("...Loading");
                    that.oPartialLoclist.setBusy(true);
                    this.getModel("BModel").read("/getfactorylocdesc", {
                        urlParameters: {
                            // "$apply": "groupby((DEMAND_LOC,DEMAND_DESC,PRODUCT_ID))",
                            "$apply": "groupby((FACTORY_LOC,LOCATION_DESC,PRODUCT_ID))",
                            "$skip": 0,
                            "$top": topCount
                        },
                        success: function (oData) {
                            that.oPartialLocs = oData.results;
                            that.oPartialLoclist.setBusy(false);
                            let data = $.extend(true, [], oData.results);
                            let oLocs = removeDuplicate(data, 'FACTORY_LOC');
                            //  let oLocs = removeDuplicate(data, 'DEMAND_LOC');
                            that.oPartialLocModel.setData({
                                results: oLocs
                            });
                            that.oPartialLoclist.setModel(that.oPartialLocModel)
                            that.oPartialLoclist.getBinding("items").filter([]);
                            function removeDuplicate(array, key) {
                                var check = new Set();
                                return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                            }
                        },
                        error: function (oData, error) {
                            that.oPartialLoclist.setBusy(false);
                            that.oPartialLoclist.setNoDataText("No Data");
                            MessageToast.show("error");
                        },
                    });
                } else {
                    that._valueHelpDialogPartialLoc.open();
                    // that.oLocList.setModel(new JSONModel([]));
                }
            },

            /* this function executes based on select location in Partial Products tab, 
             and its called in handleSelection */
            ForPartialDownload: function () {
                var oFilters = [];
                var arr = [];
                // that.oLop = that.oAllLocations.filter(f => f.DEMAND_LOC == that.oSelect);
                var oPartailLocs = that.oPartialLocs.filter(f => f.FACTORY_LOC == that.oSelect);
                let Location = removeDuplicate(oPartailLocs, 'FACTORY_LOC');
                function removeDuplicate(array, key) {
                    var check = new Set();
                    return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                }

                //    sap.ui.core.BusyIndicator.show();
                var sProd = {
                    LOCATION_ID: Location[0].FACTORY_LOC
                }
                const oProd = []
                oProd.push(sProd)

                let accumulatedData = [];
                sap.ui.core.BusyIndicator.show({
                    text: "Processing data, please wait..."
                });

                that.getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "A",
                        PRODATA: JSON.stringify(oProd)
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        var ogetDowndata = JSON.parse(oData.getProductCharVal)
                        ogetDowndata.sort((a, b) => a.PRODUCT_ID.localeCompare(b.PRODUCT_ID));

                        if (ogetDowndata.length === 0) {
                            MessageToast.show("No data for download");
                        }
                        else {

                            var oAlldndata = []
                            var oAlldndata = [];
                            for (var i = 0; i < ogetDowndata.length; i++) {
                                var customerGrpObj =
                                {
                                    "LOCATION_ID": ogetDowndata[i].LOCATION_ID,
                                    "PRODUCT_ID": ogetDowndata[i].PRODUCT_ID,
                                    "CHAR_NAME": ogetDowndata[i].CHAR_NAME,
                                    "CLASS_NAME": ogetDowndata[i].CLASS_NAME,
                                    "SELECTED": ogetDowndata[i].selected.toUpperCase(),
                                    "CHARVAL_NUM": ogetDowndata[i].CHARVAL_NUM,
                                    "CHARVAL_DESC": ogetDowndata[i].CHARVAL_DESC,
                                    "CHAR_DESC": ogetDowndata[i].CHAR_DESC,
                                    "CHAR_NUM": ogetDowndata[i].CHAR_NUM,
                                    "CHAR_VALUE": ogetDowndata[i].CHAR_VALUE,
                                    "CLASS_DESC": ogetDowndata[i].CLASS_DESC
                                    //    "CLASS_NUM": ogetDowndata[i].CLASS_NUM
                                    // "IBPCHAR_CHK": ogetDowndata[i].IBPCHAR_CHK
                                }
                                oAlldndata.push(customerGrpObj)
                            }
                            var akeys = ["PRODUCT_ID", "CHAR_NAME"];
                            let aItems = that.removeDupScmrelevent(oAlldndata, akeys);
                            sap.ui.core.BusyIndicator.hide();
                            var exportToExcel = function () {
                                var aCols = [
                                    { label: 'LOCATION_ID', property: 'LOCATION_ID', width: 30 },
                                    { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
                                    { label: 'CHAR_NAME', property: 'CHAR_NAME', width: 30 },
                                    { label: 'CLASS_NAME', property: 'CLASS_NAME', width: 30 },
                                    { label: 'SELECTED', property: 'SELECTED', width: 30 },
                                    { label: 'CHARVAL_NUM', property: 'CHARVAL_NUM', width: 30 },
                                    { label: 'CHARVAL_DESC', property: 'CHARVAL_DESC', width: 30 },
                                    { label: 'CHAR_NUM', property: 'CHAR_NUM', width: 30 },
                                    { label: 'CHAR_DESC', property: 'CHAR_DESC', width: 30 },
                                    { label: 'CHAR_VALUE', property: 'CHAR_VALUE', width: 30 },
                                    { label: 'CLASS_DESC', property: 'CLASS_DESC', width: 30 }
                                ];
                                var oSettings = {
                                    workbook: {
                                        columns: aCols,
                                    },
                                    dataSource: aItems,
                                    fileName: 'Partial Products.xlsx',
                                    worker: true
                                };

                                var oSheet = new sap.ui.export.Spreadsheet(oSettings);
                                oSheet.build().then(function () {
                                    sap.m.MessageToast.show('Succesfully download');
                                }).finally(function () {
                                    oSheet.destroy();
                                });
                            };
                            //  Call the export function to download the Excel file
                            exportToExcel();
                        }
                    },
                    error: function (e) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Error occurred while fetching data for product:");
                    }
                    //     });
                });

            },


            /* uploading functionality for Partial products */
            oPartialUpload: function (oEvent) {
                var oFileUploader = oEvent.getSource();
                var oFile = oEvent.getParameter("files")[0];
                var oFilename = oFile.name

                if (oFilename.includes("Partial Products")) {
                    if (oFile) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            var workbook = XLSX.read(data, { type: 'binary' });
                            var firstSheetName = workbook.SheetNames[0];
                            var worksheet = workbook.Sheets[firstSheetName];
                            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                            // Process the JSON data
                            that.oPartialProd(jsonData);
                        };
                        reader.readAsBinaryString(oFile);
                    }
                } else {
                    MessageToast.show("Upload valid Partial Products characteristics file")
                    sap.ui.core.BusyIndicator.hide();
                    return false;
                }
            },


            oPartialProd: function (aData) {

                var aHeaders = aData[0];
                var aRows = aData.slice(1);
                var hasEmptyValue = false;
                var errorMessages = [];

                for (var i = 0; i < aRows.length; i++) {
                    var oObject = {};
                    aHeaders.forEach(function (sHeader, j) {
                        oObject[sHeader] = aRows[i][j];
                    });

                    aHeaders.forEach(function (sHeader, j) {
                        var value = aRows[i][j];
                        if (value === null || value === undefined || value === "") {
                            hasEmptyValue = true;
                            errorMessages.push(
                                `Empty value found at Row ${i + 2}, Column: ${sHeader || `Column ${j + 1}`}`
                            );
                            return false;
                        }
                    });
                }

                if (hasEmptyValue) {
                    // Show all error messages in a consolidated manner
                    MessageToast.show(errorMessages.join("\n"), {
                        duration: 5000 // Adjust duration as needed
                    });
                }

                that.oPartialData = aRows
                var oPartialProdData = [];
                //   creating array for excel uploaded data
                for (var i = 0; i < that.oPartialData.length; i++) {

                    var customerGrpObj =
                    {
                        "LOCATION_ID": that.oPartialData[i][0],
                        "PRODUCT_ID": that.oPartialData[i][1],
                        "CHAR_NAME": that.oPartialData[i][2],
                        "CLASS_NAME": that.oPartialData[i][3],
                        "SELECTED": that.oPartialData[i][4].toUpperCase(),
                        "CHARVAL_NUM": that.oPartialData[i][5],
                        "CHARVAL_DESC": that.oPartialData[i][6],
                        "CHAR_NUM": that.oPartialData[i][7],
                        "CHAR_DESC": that.oPartialData[i][8],
                        "CHAR_VALUE": that.oPartialData[i][9],
                        "CLASS_DESC": that.oPartialData[i][10],
                    }

                    oPartialProdData.push(customerGrpObj)
                }
                that.oPartiData = oPartialProdData
                var sProd = {
                    LOCATION_ID: oPartialProdData[0].LOCATION_ID
                }
                const oProd = []
                oProd.push(sProd)
                // based on uploaded location we get Data 
                sap.ui.core.BusyIndicator.show();
                that.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "A",
                        PRODATA: JSON.stringify(oProd)
                    },
                    success: function (oData) {
                        //   sap.ui.core.BusyIndicator.hide();
                        var ogetDowndata = JSON.parse(oData.getProductCharVal)

                        if (ogetDowndata.length === 0) {
                            MessageToast.show("No data for download");
                            sap.ui.core.BusyIndicator.hide();
                        }
                        else {


                            var oMain = ogetDowndata //Downloaded data
                            var oUploaddata = that.oPartiData // Uploaded data

                            // this loop gets the chnged data
                            var oDuplicates = []
                            oDuplicates = oUploaddata.filter(groupItem =>
                                !oMain.some(delItem =>
                                    delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
                                    delItem.CLASS_NAME === groupItem.CLASS_NAME &&
                                    delItem.CHAR_NAME === groupItem.CHAR_NAME &&
                                    delItem.selected.toUpperCase() === groupItem.SELECTED
                                )
                            );

                            var oAllprds1 = []
                            oAllprds1 = oUploaddata.filter(groupItem =>
                                oDuplicates.some(delItem =>
                                    delItem.PRODUCT_ID === groupItem.PRODUCT_ID

                                )
                            );
                            var oTrueProducts = oAllprds1.filter(item => item.SELECTED === "TRUE");
                            // this line gets if selected = false
                            var oFalseProducts = oAllprds1.filter(item => item.SELECTED === "FALSE");


                            oDuplicates = oDuplicates.filter(item => item.SELECTED !== "FALSE");


                            var oChangedData = []
                            oChangedData = oMain.filter(groupItem =>
                                oTrueProducts.some(delItem =>
                                    delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
                                    delItem.CHAR_NUM === groupItem.CHAR_NUM &&
                                    delItem.CHAR_NAME === groupItem.CHAR_NAME
                                )
                            )
                            for (var i = 0; i < oChangedData.length; i++) {
                                for (var n = 0; n < oTrueProducts.length; n++) {
                                    if (oChangedData[i].PRODUCT_ID === oTrueProducts[n].PRODUCT_ID &&
                                        oChangedData[i].CHAR_NUM === oTrueProducts[n].CHAR_NUM &&
                                        oChangedData[i].CHAR_NAME === oTrueProducts[n].CHAR_NAME
                                    ) {
                                        oChangedData[i].SELECTED = oTrueProducts[n].SELECTED
                                    }
                                }
                            }
                            oChangedData = oChangedData.map(({ selected, ...item }) => item);

                            oChangedData = oChangedData.concat(oFalseProducts)
                            oChangedData.forEach(item => {
                                item.SELECTED = item.SELECTED === "TRUE";
                            });

                            oChangedData.forEach(el => {
                                el.CHARVAL_NUM = el.CHARVAL_NUM.trim()
                                el.CHAR_VALUE = el.CHAR_VALUE.trim()
                            })
                            that.oFinalPartialData = oChangedData
                            that.oPUpload()

                        }
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });



            },

            oPUpload: function () {
                var table = that.byId("prodList");
                var tableItems = table.getItems();

                // Reset all selections
                tableItems.forEach(item => item.setSelected(false));
                var finlData = [];
                if (that.oFinalPartialData.length === 0) {
                    let initData = {
                        PRODUCT_ID: that.oItem,
                        CHAR_NAME: "",
                        CHAR_VALUE: "",
                        CHAR_NUM: "",
                        CLASS_NAME: ""

                    };
                    finlData.push(initData);
                } else {
                    finlData = that.oFinalPartialData
                }
                sap.ui.core.BusyIndicator.show();
                this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "C",
                        PRODATA: JSON.stringify(finlData)
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        that.partialFlag = "X";
                        that.onGetData3();
                        MessageToast.show("Uploaded succesfully");

                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
            },


            //// ============> working perfect <=====================/////////

            oSCMAttribute: function (aData) {
                var aHeaders = aData[0];
                var aRows = aData.slice(1);
                var hasEmptyValue = false;
                var errorMessages = [];

                for (var i = 0; i < aRows.length; i++) {
                    var oObject = {};
                    aHeaders.forEach(function (sHeader, j) {
                        oObject[sHeader] = aRows[i][j];
                    });

                    aHeaders.forEach(function (sHeader, j) {
                        var value = aRows[i][j];
                        if (value === null || value === undefined || value === "") {
                            hasEmptyValue = true;
                            errorMessages.push(
                                `Empty value found at Row ${i + 2}, Column: ${sHeader || `Column ${j + 1}`}`
                            );
                            return false;
                        }
                    });
                }

                if (hasEmptyValue) {
                    // Show all error messages in a consolidated manner
                    MessageToast.show(errorMessages.join("\n"), {
                        duration: 5000 // Adjust duration as needed
                    });
                }

                that.oSCMAttr = aRows
                var oSCMProdData = [];
                for (var i = 0; i < that.oSCMAttr.length; i++) {

                    var customerGrpObj =
                    {
                        "PRODUCT_ID": that.oSCMAttr[i][0],
                        "CHAR_NUM": that.oSCMAttr[i][1],
                        // "CHAR_NAME": that.oSCMAttr[i][1],
                        // "CLASS_NAME": that.oSCMAttr[i][2],
                        "SELECTED": that.oSCMAttr[i][4]
                    }
                    oSCMProdData.push(customerGrpObj)
                }

                oSCMProdData.forEach(item => {
                    if (item.SELECTED.toLowerCase() === "true") {
                        item.CHAR_TYPE = "P";
                    } else if (item.SELECTED.toLowerCase() === "false") {
                        item.CHAR_TYPE = "S";
                    }
                });

                that.prData = oSCMProdData.filter(el => el.CHAR_TYPE == "P");
                that.scData = oSCMProdData.filter(el => el.CHAR_TYPE == "S");

                that.oAlld = that.prData.concat(that.scData);

                that.oAlld.forEach((item, i) => {
                    item.SEQUENCE = i + 1;
                    delete (item.SELECTED)
                });

                that.oSCMatt = that.oAlld;
                that.osmAttribute();
            },

            osmAttribute: function () {
                sap.ui.core.BusyIndicator.show();
                this.getOwnerComponent().getModel("BModel").callFunction("/changeToPrimaryIBPMulti", {
                    method: "GET",
                    urlParameters: {
                        CharData: JSON.stringify(that.oSCMatt)
                    },
                    success: function (oData) {
                        that.partialFlag = "X";
                        that.onGetData2();
                        MessageToast.show("Uploaded succesfully");
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
            },

            handleShowSelect: function (oEvent) {
                var button = oEvent.getSource();
                var table = this.byId("prodList");
                var binding = table.getBinding("items");

                if (button.getText() === "Show Selected") {
                    // Change the button text to "Show All"
                    button.setText("Show All");

                    // Get the selected items
                    var selectedItems = table.getSelectedItems();

                    // Check if any items are selected
                    if (selectedItems.length === 0) {
                        sap.m.MessageToast.show("No items selected");
                        return;
                    }

                    // Create an array of filters for selected items
                    var filters = selectedItems.map(function (item) {
                        // Retrieve the binding context for the selected item
                        var context = item.getBindingContext();
                        return new sap.ui.model.Filter({
                            path: "CHAR_NAME",
                            operator: sap.ui.model.FilterOperator.EQ,
                            value1: context.getProperty("CHAR_NAME"),
                        });
                    });

                    var combinedFilter = new sap.ui.model.Filter({
                        filters: filters,
                        and: false,
                    });

                    binding.filter(combinedFilter);

                } else {

                    button.setText("Show Selected");
                    // Remove all filters to show all items
                    binding.filter([]);
                }
            },

            onResetPressIBP: function () {
                that.byId("Primarytable2").setModel(new JSONModel([]));
                sap.ui.core.BusyIndicator.show();
            },


            // SCM Attributes Download functionality

            // onGetData2: async function () {
            //     var table = that.byId("Primarytable2");
            //     // var tableItems = table.getItems();
            //     // // Reset all selections
            //     // tableItems.forEach(item => item.setSelected(false));
            //     //  that.onResetPressIBP();
            //     that.ops = [];
            //     that.oPList = that.byId("Primarytable2");
            //     var sProd = that.byId("idCommon").getValue();
            //     var sData = await that.loadSelectedData();
            //     that.oSelctdata = sData;


            //     if (sProd !== "") {
            //         sap.ui.core.BusyIndicator.show();

            //         this.getModel("BModel").callFunction("/getPrimaryCharIBP", {
            //             method: "GET",
            //             urlParameters: {
            //                 FLAG: "G",
            //                 PRODUCT_ID: sProd
            //             },
            //             success: function (oData) {

            //                 that.partialFlag = "X";
            //                 that.cFlag = ""
            //                 var data = oData.results;
            //                 that.oAttr = data
            //                 if (sData && sData.length > 0) {
            //                     var selectedData = [];
            //                     sData.forEach(el => {
            //                         for (let index = 0; index < data.length; index++) {
            //                             const item = data[index];
            //                             if (item.PRODUCT_ID == el.PRODUCT_ID && item.REF_CHAR_NUM == el.CHAR_NUM) {
            //                                 item.CHAR_NAME = el.CHAR_NAME;
            //                                 item.CHAR_DESC = el.CHAR_DESC;
            //                                 selectedData.push(item);
            //                             }
            //                         }
            //                     });

            //                     let filteredData = selectedData.filter((item, index, array) => {
            //                         // Check if there's a 'P' charType for the same refCharnum
            //                         let hasP = array.some(el => el.REF_CHAR_NUM === item.REF_CHAR_NUM && el.CHAR_TYPE === "P");

            //                         // Keep the item if charType is "P" or if no "P" exists for this refCharnum
            //                         return item.CHAR_TYPE === "P" || !hasP;
            //                     });

            //                      var oMultichar = [];
            //                     // if (that.MultiChardata) {
            //                     //     for (let i = 0; i < selectedData.length; i++) {
            //                     //         if (selectedData[i].PRODUCT_ID === that.MultiChardata.PRODUCT_ID &&
            //                     //             selectedData[i].REF_CHAR_NUM === that.MultiChardata.CHAR_NUM.split("_")[0]) {
            //                     //             oMultichar.push(selectedData[i])
            //                     //             delete (selectedData[i])
            //                     //         }
            //                     //     }
            //                     // }

            //                     // oMultichar = filteredData.filter(el => el.CHAR_NUM === that.MultiChardata.CHAR_NUM)
            //                     // var oAllmain = selectedData.concat(oMultichar)


            //                     let oAllData = removeDuplicate(filteredData, 'CHAR_NAME');
            //                     function removeDuplicate(array, key) {
            //                         var check = new Set();
            //                         return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
            //                     }

            //                     var osData = oAllData;
            //                     that.seqData = [];
            //                     that.scendseqData = [];
            //                     that.priData = osData.filter(el => el.CHAR_TYPE == "P");
            //                     that.seqData = that.priData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //                     that.secData = osData.filter(el => el.CHAR_TYPE == "S");
            //                     that.scendseqData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //                     that.ops = that.seqData.concat(that.secData);
            //                     sap.ui.core.BusyIndicator.hide();

            //                     // First, bind an empty model to the table to avoid issues with initial empty data
            //                     var emptyModel = new sap.ui.model.json.JSONModel({
            //                         results2: []
            //                     });
            //                     that.oPList.setModel(emptyModel);

            //                     // Update the table model with the actual data
            //                     that.PrimarylistModel.setData({
            //                         results2: that.ops
            //                     });
            //                     that.PrimarylistModel.setSizeLimit(5000);
            //                     that.oPList.setModel(that.PrimarylistModel);

            //                     // Reset all selections before applying new ones
            //                     // var tableItems = that.oPList.getItems();
            //                     // tableItems.forEach(function (item) {
            //                     //     item.setSelected(false);  // Reset all selections
            //                     // });

            //                     // Apply selection logic based on your condition
            //                     // that.ops.forEach(function (item) {
            //                     //     tableItems.forEach(function (tableItem) {
            //                     //         var context = tableItem.getBindingContext();
            //                     //         if (context) {
            //                     //             var rowData = context.getProperty();
            //                     //             if (rowData.PRODUCT_ID == item.PRODUCT_ID && rowData.REF_CHAR_NUM == item.CHAR_NUM) {
            //                     //                 tableItem.setSelected(true);  // Select the matching row
            //                     //             }
            //                     //         }
            //                     //     });
            //                     // });
            //                 } else {
            //                     //     that.partialFlag = "X";
            //                     that.priData = data.filter(el => el.CHAR_TYPE == "P");
            //                     that.seqData = that.priData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //                     that.secData = data.filter(el => el.CHAR_TYPE == "S");
            //                     that.scendseqData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //                     that.ops = that.seqData.concat(that.secData);
            //                     that.PrimarylistModel.setData({
            //                         results2: that.ops
            //                     });
            //                     that.PrimarylistModel.setSizeLimit(5000);
            //                     that.oPList.setModel(that.PrimarylistModel);
            //                 }
            //                 sap.ui.core.BusyIndicator.hide();
            //             },
            //             error: function (error) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("Error");
            //             }
            //         });
            //     }
            //     else {
            //         MessageToast.show("Please select Product");
            //     }
            // },




            // onIBPatbs_Checkbox: function (oEvent) {
            //     var selectedCount = 0;
            //     var table = that.byId("Primarytable2");
            //     var items = table.getItems();

            //     for (var i = 0; i < items.length; i++) {
            //         var cell = items[i].getCells()[3];
            //         if (cell.getSelected()) {
            //             selectedCount++;
            //         }
            //     }
            //     if (selectedCount >= 11) {
            //         oEvent.getSource().setSelected(false)
            //         MessageToast.show("Select Primary Characteristics less than or equal to 10")
            //         return false;
            //     }
            //     that.oSelctdata

            //     that.oIBPcbox = {};
            //     var oSelection = oEvent.getSource().getSelected()
            //     var oCheckbox = oEvent.getSource().getBindingContext().getObject();
            //     if (oSelection) {
            //         var iSeq = selectedCount
            //         var oChar_Type = "P"
            //         that.oIBPcbox = {
            //             PRODUCT_ID: oCheckbox.PRODUCT_ID,
            //             CHAR_NUM: oCheckbox.CHAR_NUM,
            //             SEQUENCE: iSeq,
            //             CHAR_TYPE: oChar_Type,
            //         }
            //         that.getModel("BModel").callFunction("/changeToPrimaryIBP", {
            //             method: "GET",
            //             urlParameters: {
            //                 PRODUCT_ID: oCheckbox.PRODUCT_ID,
            //                 CHAR_NUM: oCheckbox.CHAR_NUM,
            //                 SEQUENCE: iSeq,
            //                 CHAR_TYPE: oChar_Type,
            //                 FLAG: "C",
            //             },
            //             success: function (oData) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 this.byId("idPrimarySearch2").setValue("");
            //                 this.onPrimarySearch2();
            //                 //  this.byId("searchField").setValue("");
            //                 // this.onCharSearch2();
            //                 this.onGetData2();
            //                 MessageToast.show("Updated successfully")
            //             }.bind(this),
            //             error: function (oData) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("Failed to change the char");
            //             },
            //         });

            //     } else {
            //         var iSeq = 0
            //         var oChar_Type = "S"
            //         that.oIBPcbox = {
            //             PRODUCT_ID: oCheckbox.PRODUCT_ID,
            //             CHAR_NUM: oCheckbox.CHAR_NUM,
            //             SEQUENCE: iSeq,
            //             CHAR_TYPE: oChar_Type,
            //         }
            //         this.getModel("BModel").callFunction("/changeToPrimaryIBP", {
            //             method: "GET",
            //             urlParameters: {
            //                 PRODUCT_ID: oCheckbox.PRODUCT_ID,
            //                 CHAR_NUM: oCheckbox.CHAR_NUM,
            //                 SEQUENCE: iSeq,
            //                 CHAR_TYPE: oChar_Type,
            //                 FLAG: "C",
            //             },
            //             success: function (oData) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 this.byId("idPrimarySearch2").setValue("");
            //                 this.onPrimarySearch2();
            //                 //     this.byId("searchField").setValue("");
            //                 // this.onCharSearch2();
            //                 this.onGetData2();
            //                 MessageToast.show("Updated successfully")
            //             }.bind(this),
            //             error: function (oData) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("Failed to change the char");
            //             },
            //         });
            //     }


            //     // this.getModel("BModel").callFunction("/changeToPrimaryIBP", {
            //     //     method: "GET",
            //     //     urlParameters: {
            //     //         PRODUCT_ID: oItem.PRODUCT_ID,
            //     //         CHAR_NUM: oItem.CHAR_NUM,
            //     //         SEQUENCE: iSeq,
            //     //         CHAR_TYPE: oChar_Type,
            //     //         FLAG: "C",
            //     //     },
            //     //     success: function (oData) {
            //     //         sap.ui.core.BusyIndicator.hide();
            //     //         this.byId("idPrimarySearch2").setValue("");
            //     //         this.onPrimarySearch2();
            //     //         this.byId("searchField").setValue("");
            //     //         // this.onCharSearch2();
            //     //         this.onGetData2();
            //     //     }.bind(this),
            //     //     error: function (oData) {
            //     //         sap.ui.core.BusyIndicator.hide();
            //     //         MessageToast.show("Failed to change the char");
            //     //     },
            //     // });
            // },

            // ====> SCM ATTRIBUTES COMMENTED <===== ///
            // onIBPatbs_Checkbox: function (oEvent) {
            //     var aData = this.byId("Primarytable2").getItems();
            //     that.oTabCount = aData.length;
            //     var oCheckbox = oEvent.getSource().getBindingContext().getObject();
            //     that.MultiChardata = oCheckbox
            //     var successCount = 0;
            //     var selectedCount = 0;
            //     var table = that.byId("Primarytable2");
            //     var items = table.getItems();

            //     for (var i = 0; i < items.length; i++) {
            //         var cell = items[i].getCells()[3];
            //         if (cell.getSelected()) {
            //             selectedCount++;
            //         }
            //     }
            //     if (selectedCount >= 11) {
            //         oEvent.getSource().setSelected(false)
            //         MessageToast.show("Already Primary Characteristics selections are 10")
            //         return false;
            //     }
            //     var oPS = [];

            //     for (var i = 0; i < aData.length; i++) {
            //         var oEntry = {};
            //         oEntry.PRODUCT_ID = that.byId("idCommon").getValue();
            //         oEntry.CHAR_NUM = aData[i].getCells()[0].getText();
            //         oEntry.SEQUENCE = i + 1;
            //         if (aData[i].getCells()[3].getSelected() === true) {
            //             oEntry.CHAR_TYPE = "P";
            //         } else {
            //             oEntry.CHAR_TYPE = "S";
            //         }
            //         oPS.push(oEntry)
            //     }

            //     oPS = oPS.filter(item => !(item.PRODUCT_ID === oCheckbox.PRODUCT_ID && item.CHAR_NUM === oCheckbox.CHAR_NUM));


            //     var oPData = oPS.filter(el => el.CHAR_TYPE === "P")
            //     var oSData = oPS.filter(el => el.CHAR_TYPE === "S")
            //     var oSelection = oEvent.getSource().getSelected()

            //     if (oSelection) {
            //         oCheckbox.SEQUENCE = oPData.length + 1
            //         oCheckbox.CHAR_TYPE = "P"

            //         delete (oCheckbox.__metadata)
            //         delete (oCheckbox.CHAR_NAME)
            //         delete (oCheckbox.CHAR_DESC)
            //         delete (oCheckbox.REF_CHAR_NUM)

            //         oPData.push(oCheckbox)
            //     } else {
            //         oCheckbox.SEQUENCE = oSData.length + 1
            //         oCheckbox.CHAR_TYPE = "S"

            //         delete (oCheckbox.__metadata)
            //         delete (oCheckbox.CHAR_NAME)
            //         delete (oCheckbox.CHAR_DESC)
            //         delete (oCheckbox.REF_CHAR_NUM)

            //         oSData.push(oCheckbox)
            //     }
            //     var oMainData = oPData.concat(oSData)

            //     oMainData = oMainData.map(item => ({
            //         PRODUCT_ID: item.PRODUCT_ID || item.product,
            //         CHAR_NUM: item.CHAR_NUM || item.CharNo,
            //         SEQUENCE: item.SEQUENCE || item.SEQUENCE,
            //         CHAR_TYPE: item.CHAR_TYPE || item.CHAR_TYPE
            //     }));


            //     oMainData.forEach((item, i) => {
            //         item.SEQUENCE = i + 1;
            //     });

            //     for (var i = 0; i < oMainData.length; i++) {

            //         that.getModel("BModel").callFunction("/changeToPrimaryIBP", {
            //             method: "GET",
            //             urlParameters: {
            //                 PRODUCT_ID: oMainData[i].PRODUCT_ID,
            //                 CHAR_NUM: oMainData[i].CHAR_NUM,
            //                 SEQUENCE: oMainData[i].SEQUENCE,
            //                 CHAR_TYPE: oMainData[i].CHAR_TYPE,
            //                 FLAG: "C",
            //             },
            //             success: function (oData) {

            //                 if (oData.changeToPrimaryIBP) {
            //                     successCount = successCount + 1;
            //                 }
            //                 if (successCount === that.oTabCount) {
            //                     sap.ui.core.BusyIndicator.hide();
            //                     //   this.byId("idPrimarySearch2").setValue("");
            //                     //  this.onPrimarySearch2();
            //                     MessageToast.show("Successfully updated");
            //                     sap.ui.core.BusyIndicator.hide();
            //                     that.onGetData2();

            //                 }
            //             },
            //             error: function (oData) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("Failed to changes the char");
            //             },
            //         });
            //     }

            // },






            // oItemChange: function (oEvent) {
            //     var oSelectedItem = oEvent.getSource().getParent().getBindingContext().getObject();
            //     var selKey = oEvent.getSource().getSelectedKey();
            //     var Data = JSON.parse(JSON.stringify(that.oSeq));
            //     Data.forEach(c => {
            //         if (c.CHAR_TYPE === "P" && c.GROUP_NAME === "") {
            //             c.WEIGHTAGE = 1
            //         }
            //     })
            //     Data = Data.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

            //     var groupW = that.oGroupNames.find(el => el.GROUP_NAME === selKey);
            //     if (!groupW) return;

            //     var index = Data.findIndex(el => el.SEQUENCE === oSelectedItem.SEQUENCE);

            //     var changesRecord = Data.splice(index, 1)[0];
            //     changesRecord.GROUP_NAME = groupW.GROUP_NAME;
            //     changesRecord.WEIGHTAGE = groupW.WEIGHTAGE;

            //     Data.push(changesRecord);

            //     Data = Data.sort((a, b) => b.WEIGHTAGE - a.WEIGHTAGE);
            //     Data.forEach((item, i) => {
            //         item.SEQUENCE = i + 1;
            //     });
            //     that.oPosition = changesRecord.SEQUENCE - 1

            //     // Update the model
            //     Data.forEach(c => {
            //         if (c.CHAR_TYPE === "P" && c.GROUP_NAME === "") {
            //             c.WEIGHTAGE = 1
            //         }
            //     })
            //     that.oSeq = Data;
            //     that.PrimarylistModel.setData({
            //         results: Data,
            //     });
            //     that.oFinalData = Data;
            //     that.PrimarylistModel.setSizeLimit(5000);
            //     that.oPList.setModel(that.PrimarylistModel);

            //     // Update dropdowns and table selection
            //     var items = that.oPList.getItems();
            //     for (let i = 0; i < items.length; i++) {
            //         var data = that.oFinalData.find(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);
            //         if (data) {
            //             items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data.GROUP_NAME);
            //         }
            //     }

            //     //    Set selected item in the table
            //     if (that.oPosition !== undefined) {
            //         that.byId("Primarytable").setSelectedItem(that.byId("Primarytable").getItems()[that.oPosition], true);
            //     }
            // },



            loadSelectedData: function () {
                // that.byId("prodInput2").setValue("");
                var sProd = that.byId("idCommon").getValue();

                var promise = new Promise((resolve, reject) => {
                    let arr = [];
                    arr.push({ PRODUCT_ID: sProd })
                    this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                        method: "GET",
                        urlParameters: {
                            Flag: "Y",
                            PRODATA: JSON.stringify(arr)
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            var data = that.removeDuplicate(oData.results, 'CHAR_NAME');
                            if (data.length > 0) {
                                resolve(data)
                            } else {
                                resolve([]);
                            }
                        },
                        error: function (err) {
                            reject(err);
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Failed to get data");
                        }
                    })
                })
                return promise;
            },

            onDrop2: function (oInfo) {
                var oSChar_Type = oInfo.getParameters().draggedControl.getCells()[3].getSelected();
                if (oSChar_Type === false) {
                    sap.m.MessageToast.show("Drag & Drop works for only Primary Characteristics")
                    return false

                }
                var results2 = [];
                // that.byId("idPrimarySearch2").setValue("");
                // that.byId("searchField2").setValue("");
                var oDragged = oInfo.getParameter("draggedControl"),
                    oDropped = oInfo.getParameter("droppedControl"),
                    sInsertPosition = oInfo.getParameter("dropPosition");


                var oDragContainer = oDragged.getParent(),
                    oDropContainer = oInfo.getSource().getParent();
                if (that.byId("idPrimarySearch2").getValue() !== "") {

                    var obj = that.byId("Primarytable2").getItems()
                    for (var i = 0; i < obj.length; i++) {
                        results2.push(obj[i].getBindingContext().getObject())
                    }
                }
                // if (that.byId("searchField2").getValue() !== "") {

                //     var obj = that.byId("Secondarytable2").getItems()
                //     for (var i = 0; i < obj.length; i++) {
                //         results2.push(obj[i].getBindingContext().getObject())
                //     }
                // }

                var oDragModel = oDragContainer.getModel(),
                    oDropModel = oDropContainer.getModel();



                var oDragModelData = oDragModel.getData(),
                    oDropModelData = oDropModel ? oDropModel.getData() : null,

                    iDragPosition = oDragContainer.indexOfItem(oDragged),
                    iDropPosition = oDropContainer.indexOfItem(oDropped);

                var Flag = "";
                if (oDragModelData.results2[0].CHAR_TYPE === "S") {
                    var length = this.byId("Primarytable2").getItems().length;
                    if (length >= 10) {
                        Flag = "X";
                    }
                }

                if (that.authFlag !== "X") {
                    if (!Flag) {
                        // If drop model is undefined, initialize it
                        if (!oDropModel) {
                            oDropModel = new sap.ui.model.json.JSONModel({ results2: [] });
                            oDropContainer.setModel(oDropModel);
                            oDropModelData = oDropModel.getData();
                        }

                        // If drop model data is undefined, initialize it as an empty array
                        if (!oDropModelData) {
                            oDropModelData = { results2: [] };
                            oDropModel.setData(oDropModelData);
                        }

                        // Ensure results2 array is initialized
                        if (!oDropModelData.results2) {
                            oDropModelData.results2 = [];
                        }

                        // Remove the item from the drag model
                        if (results2.length > 0) {
                            oDragModelData.results2 = results2
                        }
                        var oItem = oDragModelData.results2[iDragPosition];
                        that.removedItem = [];
                        that.removedItem = oItem

                        oDragModelData.results2.splice(iDragPosition, 1);

                        if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
                            iDropPosition--;
                        }

                        if (sInsertPosition === "After") {
                            iDropPosition++;
                        }

                        // Insert the control in the target aggregation
                        oDropModelData.results2.splice(iDropPosition, 0, oItem);

                        if (oDragModel !== oDropModel) {
                            var oChar_Type;
                            var iSeq = 0;

                            if (oItem.CHAR_TYPE === "S") {
                                oChar_Type = "P";
                                iSeq = oDropModelData.results2.length;
                            } else {
                                oChar_Type = "S";
                                iSeq = iDragPosition + 1;
                            }
                            sap.ui.core.BusyIndicator.show();
                            this.getModel("BModel").callFunction("/changeToPrimaryIBP", {
                                method: "GET",
                                urlParameters: {
                                    PRODUCT_ID: oItem.PRODUCT_ID,
                                    CHAR_NUM: oItem.CHAR_NUM,
                                    SEQUENCE: iSeq,
                                    CHAR_TYPE: oChar_Type,
                                    FLAG: "C",
                                },
                                success: function (oData) {
                                    sap.ui.core.BusyIndicator.hide();
                                    this.byId("idPrimarySearch2").setValue("");
                                    this.onPrimarySearch2();
                                    this.byId("searchField").setValue("");
                                    // this.onCharSearch2();
                                    this.onGetData2();
                                }.bind(this),
                                error: function (oData) {
                                    sap.ui.core.BusyIndicator.hide();
                                    MessageToast.show("Failed to change the char");
                                },
                            });
                        } else {
                            oDropModel.setData(oDropModelData);
                            var aData = this.byId("Primarytable2").setModel(oDropModel).getItems();
                            // if (oDropModelData.results2[0].CHAR_TYPE === "P") {
                            //     var aData = this.byId("Primarytable2").getItems();
                            // } else if (oDropModelData.results2[0].CHAR_TYPE === "S") {
                            //     var aData = this.byId("Secondarytable2").getItems();
                            // }
                            this.oSelectedItem = oItem.CHAR_NAME;
                            this.onSaveSeq(iDropPosition, aData);
                            this.onSaveSeq2(iDropPosition);
                        }
                    } else {
                        MessageToast.show("Please remove existing IBP Characteristics to add new");
                    }
                } else {
                    var text = "Active Planning Details exist. Would you like to continue? \n If yes, please make sure to click on 'Reload Char.' button after changes are done";
                    sap.m.MessageBox.show(
                        text, {
                        title: "Confirmation",
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.YES) {
                                this.authFlag = "";

                                if (!Flag) {
                                    // If drop model is undefined, initialize it
                                    if (!oDropModel) {
                                        oDropModel = new sap.ui.model.json.JSONModel({ results2: [] });
                                        oDropContainer.setModel(oDropModel);
                                        oDropModelData = oDropModel.getData();
                                    }

                                    // If drop model data is undefined, initialize it as an empty array
                                    if (!oDropModelData) {
                                        oDropModelData = { results2: [] };
                                        oDropModel.setData(oDropModelData);
                                    }

                                    // Ensure results2 array is initialized
                                    if (!oDropModelData.results2) {
                                        oDropModelData.results2 = [];
                                    }

                                    // Remove the item from the drag model
                                    if (results2.length > 0) {
                                        oDragModelData.results2 = results2
                                    }
                                    var oItem = oDragModelData.results2[iDragPosition];
                                    oDragModelData.results2.splice(iDragPosition, 1);

                                    if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
                                        iDropPosition--;
                                    }

                                    if (sInsertPosition === "After") {
                                        iDropPosition++;
                                    }

                                    // Insert the control in the target aggregation
                                    oDropModelData.results2.splice(iDropPosition, 0, oItem);

                                    if (oDragModel !== oDropModel) {
                                        var oChar_Type;
                                        var iSeq = 0;

                                        if (oItem.CHAR_TYPE === "S") {
                                            oChar_Type = "P";
                                            iSeq = oDropModelData.results2.length;
                                        } else {
                                            oChar_Type = "S";
                                            iSeq = iDragPosition + 1;
                                        }
                                        sap.ui.core.BusyIndicator.show();
                                        this.getModel("BModel").callFunction("/changeToPrimaryIBP", {
                                            method: "GET",
                                            urlParameters: {
                                                PRODUCT_ID: oItem.PRODUCT_ID,
                                                CHAR_NUM: oItem.CHAR_NUM,
                                                SEQUENCE: iSeq,
                                                CHAR_TYPE: oChar_Type,
                                                FLAG: "C",
                                            },
                                            success: function (oData) {
                                                sap.ui.core.BusyIndicator.hide();
                                                this.byId("idPrimarySearch2").setValue("");
                                                // this.onPrimarySearch2();
                                                this.byId("searchField2").setValue("");
                                                this.onCharSearch2();
                                                this.onGetData2();
                                            }.bind(this),
                                            error: function (oData) {
                                                sap.ui.core.BusyIndicator.hide();
                                                MessageToast.show("Failed to change the char");
                                            },
                                        });
                                    } else {
                                        oDropModel.setData(oDropModelData);
                                        var aData = this.byId("Primarytable2").setModel(oDropModel).getItems();
                                        // if (oDropModelData.results2[0].CHAR_TYPE === "P") {
                                        //     var aData = this.byId("Primarytable2").getItems();
                                        // } else if (oDropModelData.results2[0].CHAR_TYPE === "S") {
                                        //     var aData = this.byId("Secondarytable2").getItems();
                                        // }
                                        // this.byId("Primarytable2").getItems();
                                        // that.byId("Primarytable2").setModel(oDropModelData).getItems();
                                        this.oSelectedItem = oItem.CHAR_NAME;
                                        this.onSaveSeq(iDropPosition, aData);
                                        this.onSaveSeq2(iDropPosition);
                                    }
                                } else {
                                    MessageToast.show("Please remove existing IBP Characteristics to add new");
                                }
                            }
                        }.bind(this)
                    });
                }
            },

            onIbpData: function () {
                that.getEnable();
                sap.ui.core.BusyIndicator.show();
                var selectedItems = that.selectedChars;
                if (selectedItems.length > 0) {
                    var finlData = [], initData = {};
                    for (var i = 0; i < selectedItems.length; i++) {
                        //Get all char values of selected CHAR_NAME and CLASS_NAME
                        let sChar = selectedItems[i].CHAR_NAME,
                            sClassName = selectedItems[i].CLASS_NAME;
                        let aData = that.loadArray.filter(f => f.CHAR_NAME == sChar && f.CLASS_NAME == sClassName);
                        if (aData.length > 0) {
                            aData.forEach(el => {
                                initData = {
                                    PRODUCT_ID: that.oItem,
                                    CHAR_NAME: el.CHAR_NAME,
                                    CHAR_DESC: el.CHAR_DESC,
                                    CHAR_VAL: el.CHAR_VALUE,
                                    CHARVAL_DESC: el.CHARVAL_DESC,
                                    CHAR_NUM: el.CHAR_NUM,
                                    CHARVAL_NUM: el.CHARVAL_NUM,
                                    CLASS_NAME: el.CLASS_NAME,
                                    CLASS_DESC: el.CLASS_DESC,
                                }
                                finlData.push(initData);
                            });
                        }

                    }
                    this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                        method: "GET",
                        urlParameters: {
                            Flag: "C",
                            PRODATA: JSON.stringify(finlData)
                        },
                        success: function (oData) {
                            that.byId("idPartialSearch").setValue();
                            that.byId("prodList").getBinding("items").filter([]);
                            sap.ui.core.BusyIndicator.hide();
                            //   MessageToast.show("Successfully saved");
                            //    that.onGetData3();
                        },
                        error: function (error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });
                }
                else {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("Please select atleast one row");
                }
            },

            onReset: function () {
                // var sLoc = that.byId("idloc").getValue(),

                var text = "Active Planning Details exist. Would you like to continue?";
                sap.m.MessageBox.show(
                    text, {

                    title: "Confirmation",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.YES) {
                            that.onGetData2();
                            var sProd = that.byId("idCommon").getValue();
                            that.oSelectedItem = "";
                            if (sProd !== "") {
                                that.getModel("BModel").callFunction("/getPrimaryCharIBP", {
                                    method: "GET",
                                    urlParameters: {
                                        FLAG: "R",
                                        // LOCATION_ID: sLoc,
                                        PRODUCT_ID: sProd
                                    },
                                    success: function (oData) {
                                        sap.ui.core.BusyIndicator.hide();
                                        that.oPList = that.byId("Primarytable2"),
                                            that.oSList = that.byId("Primarytable2");

                                        that.primaryData = [],
                                            that.secData = [];

                                        for (var i = 0; i < oData.results.length; i++) {
                                            if (oData.results[i].CHAR_TYPE === "P") {
                                                that.primaryData.push(oData.results[i]);
                                            } else {
                                                that.secData.push(oData.results[i]);
                                            }
                                        }


                                        that.finalSecData = that.secData;


                                        that.PrimarylistModel.setData({
                                            results: that.primaryData,
                                        });
                                        that.PrimarylistModel.setSizeLimit(5000);
                                        that.oPList.setModel(that.PrimarylistModel);

                                        that.SeclistModel.setData({
                                            results: that.finalSecData,
                                        });
                                        that.SeclistModel.setSizeLimit(5000);
                                        that.oSList.setModel(that.SeclistModel);

                                        // that.searchlist = that.SeclistModel;


                                        // that.searchlist.forEach(function (row) {

                                        //     row.CHAR_NAME = row.CHAR_NAME + " - " + row.CHAR_DESC;

                                        // }, that);


                                        //    that.byId("searchField2").setModel(that.SeclistModel);

                                    },
                                    error: function (oData, error) {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageToast.show("error");
                                    },
                                });
                            } else {
                                MessageToast.show("Please select Product");
                            }
                        }

                    }
                }
                );
            },

            /**
           * This function is called when click on Value help on Input box.
           * In this function based in sId will open the dialogs.
           * @param {object} oEvent -the event information.
           */
            handleValueHelp2: function (oEvent) {
                var sId = oEvent.getParameter("id");

                if (sId.includes("prod")) {

                    that._valueHelpDialogProd.open();

                }
            },


            handleClose2: function (oEvent) {
                var sId = oEvent.getParameter("id");

                if (sId.includes("prod")) {
                    that._oCore
                        .byId(this._valueHelpDialogProd3.getId() + "-searchField")
                        .setValue("");
                    if (that.oProdList.getBinding("items")) {
                        that.oProdList.getBinding("items").filter([]);
                    }
                }
            },

            onDrop3: function (oInfo) {
                var oDragged = oInfo.getParameter("draggedControl"),
                    oDropped = oInfo.getParameter("droppedControl"),
                    sInsertPosition = oInfo.getParameter("dropPosition");

                var oDragContainer = oDragged.getParent(),
                    oDropContainer = oInfo.getSource().getParent(),

                    oDragModel = oDragContainer.getModel(),
                    oDropModel = oDropContainer ? oDropContainer.getModel() : null,
                    oDragModelData = oDragModel.getData(),
                    oDropModelData = oDropModel ? oDropModel.getData() : null,

                    iDragPosition = oDragContainer.indexOfItem(oDragged),
                    iDropPosition = oDropped ? oDropContainer.indexOfItem(oDropped) : 0;

                // Log for debugging
                console.log("oDragContainer:", oDragContainer);
                console.log("oDropContainer:", oDropContainer);
                console.log("oDragModel:", oDragModel);
                console.log("oDropModel:", oDropModel);
                console.log("oDragModelData:", oDragModelData);
                console.log("oDropModelData:", oDropModelData);

                // If drop model has no data, initialize it as an empty array
                if (!oDropModelData) {
                    oDropModelData = [];
                }

                // Get the dragged item data
                var oDraggedData = oDragModelData.results2[iDragPosition];

                // Store the dragged data in an object
                var oStoredData = {
                    draggedItem: oDraggedData
                };

                // Remove the dragged item from the original model
                oDragModelData.results2.splice(iDragPosition, 1);

                // Insert the stored data into the drop model at the correct position
                if (sInsertPosition === "Before") {
                    if (oDropModelData.length === 0) {
                        oDropModelData.splice(iDropPosition, 0, oStoredData.draggedItem);
                    } else {
                        oDropModelData.results2.splice(iDropPosition, 0, oStoredData.draggedItem);
                    }
                } else if (sInsertPosition === "After") {
                    if (oDropModelData.length === 0) {
                        oDropModelData.splice(iDropPosition, 0, oStoredData.draggedItem);
                    } else {
                        oDropModelData.results2.splice(iDropPosition, 0, oStoredData.draggedItem);
                    }
                } else {
                    // Default to adding at the drop position
                    if (oDropModelData.length === 0) {
                        oDropModelData.splice(iDropPosition, 0, oStoredData.draggedItem);
                    } else {
                        oDropModelData.results2.splice(iDropPosition, 0, oStoredData.draggedItem);
                    }
                }

                // Update the models with the new data
                oDragModel.setData(oDragModelData);
                if (oDropModel) {
                    oDropModel.setData(oDropModelData);
                } else {
                    //  var oModel = that.byId("Primarytable2")
                    that.PrimarylistModel.setData({
                        results2: oDropModelData,
                    });
                    that.PrimarylistModel.setSizeLimit(5000);
                    that.byId("Primarytable2").setModel(that.PrimarylistModel)
                    // oModel.setData
                    // // If drop container has no model, create a new JSONModel and set it
                    // var oNewDropModel = new sap.ui.model.json.JSONModel(oDropModelData);
                    // oDropContainer.setModel(oNewDropModel);
                }
            },

            onSaveSeq2: function (index) {
                var aData = this.byId("Primarytable2").getItems();
                that.count = aData.length;
                // that.count = index + 2;
                var successCount = 0;


                for (var i = 0; i < aData.length; i++) {
                    // for(var i=0; i<that.count; i++){
                    var oEntry = {};

                    // oEntry.Location = that.byId("idloc").getValue();
                    oEntry.product = that.byId("idCommon").getValue();
                    oEntry.CharNo = aData[i].getCells()[0].getText();
                    // oEntry.charName = aData[i].getCells()[1].getText();
                    oEntry.SEQUENCE = i + 1;
                    oEntry.FLAG = "E";
                    if (aData[i].getCells()[3].getSelected() === true) {
                        oEntry.CHAR_TYPE = "P";
                    } else {
                        oEntry.CHAR_TYPE = "S";
                    }


                    that.getModel("BModel").callFunction("/changeToPrimaryIBP", {
                        method: "GET",
                        urlParameters: {
                            // LOCATION_ID: oEntry.Location,
                            PRODUCT_ID: oEntry.product,
                            CHAR_NUM: oEntry.CharNo,
                            SEQUENCE: oEntry.SEQUENCE,
                            CHAR_TYPE: oEntry.CHAR_TYPE,
                            FLAG: oEntry.FLAG,
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            if (oData.changeToPrimary) {
                                successCount = successCount + 1;
                            }

                            if (successCount === that.count) {
                                // MessageToast.show(oData.changeToPrimary);
                                MessageToast.show("Successfully changed the sequence");
                                //  that.byId("searchField2").setValue("");
                                //  that.onCharSearch();
                                // that.onGetData2();

                            }
                        },
                        error: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Failed to changes the char");
                        },
                    });

                }
            },

            onPrimarySearch2: function () {
                var sQuery = that.byId("idPrimarySearch2").getValue(),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";

                if (sQuery !== "") {
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("CHAR_NAME", FilterOperator.Contains, sQuery),
                            ],
                            and: false,
                        })
                    );
                }
                that.byId("Primarytable2").getBinding("items").filter(oFilters);

            },

            onCharSearch2: function (oEvent) {
                var sQuery = that.byId("searchField2").getValue(),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";

                if (sQuery !== "") {
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("CHAR_NAME", FilterOperator.Contains, sQuery),
                                // new Filter("CHAR_DESC", FilterOperator.Contains, sQuery),
                            ],
                            and: false,
                        })
                    );
                }
                that.byId("Secondarytable2").getBinding("items").filter(oFilters);

            },

            onPressUpdate2: function (oEvent) {
                //var oEntry = {};
                // var sLoc = that.byId("idloc").getValue(),
                var sProd = that.byId("idCommon").getValue();

                // if (sLoc !== "" && sProd !== "") {
                var text = "Active Planning Details exist. Would you like to continue?";
                sap.m.MessageBox.show(
                    text, {

                    title: "Confirmation",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose2: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.YES) {
                            if (sProd !== "") {

                                sap.ui.core.BusyIndicator.show();
                                that.getModel("BModel").callFunction("/getPrimaryCharIBP", {
                                    method: "GET",
                                    urlParameters: {
                                        FLAG: "U",
                                        // LOCATION_ID: sLoc,
                                        PRODUCT_ID: sProd
                                    },
                                    success: function (oData) {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageToast.show("Updated Successfully");
                                        that.oPList = that.byId("Primarytable2"),
                                            that.oSList = that.byId("Secondarytable2");

                                        that.primaryData = [],
                                            that.secData = [];

                                        for (var i = 0; i < oData.results.length; i++) {
                                            if (oData.results[i].CHAR_TYPE === "P") {
                                                that.primaryData.push(oData.results[i]);
                                            } else {
                                                that.secData.push(oData.results[i]);
                                            }
                                        }

                                        that.finalSecData = that.secData;

                                        that.PrimarylistModel.setData({
                                            results2: that.primaryData,
                                        });
                                        that.PrimarylistModel.setSizeLimit(5000);
                                        that.oPList.setModel(that.PrimarylistModel);

                                        that.SeclistModel.setData({
                                            results2: that.finalSecData,
                                        });
                                        that.SeclistModel.setSizeLimit(5000);
                                        that.oSList.setModel(that.SeclistModel);

                                        that.searchlist = that.finalSecData;


                                        that.searchlist.forEach(function (row) {
                                            row.Char = row.CHAR_NAME + " - " + row.CHAR_DESC;
                                        }, that);

                                        that.SearchModel.setData({
                                            results2: that.searchlist,
                                        });
                                        that.byId("searchField2").setModel(that.SearchModel);

                                        var aData = that.oSList.getItems();
                                        if (that.oSelectedItem) {
                                            for (var i = 0; i < aData.length; i++) {
                                                if (that.oSelectedItem === aData[i].getCells()[1].getText()) {
                                                    aData[i].focus();
                                                    aData[i].setSelected(true);
                                                }
                                            }
                                        }

                                    },
                                    error: function (oData, error) {
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageToast.show("error");
                                    },
                                });

                            } else {
                                MessageToast.show("Please select Product");
                            }
                        }

                    }
                }
                );


            },

            getEnable: function () {
                var oModel = that.getOwnerComponent().getModel("BModel");
                var vUser = "Test" //that.getUser();
                var oEntry = {
                    USERDATA: []
                };
                let oParamVals = {
                    USEREMAIL: vUser
                };
                oEntry.USERDATA.push(oParamVals);
                oModel.callFunction("/genUserAppVisibility", {
                    method: "GET",
                    urlParameters: {
                        FLAG: 'G',
                        USERDATA: JSON.stringify(oEntry.USERDATA)
                    },
                    success: function (oData) {
                        aResults2 = oData.results;
                        // var  aResults2 = [{
                        //     "CREATE_CHK": "enabled",
                        //     "UPDATE_CHK": "disabled",
                        //     "DELETE_CHK": "enabled",
                        //     "READ_CHK": "disabled"
                        // }]

                        if (aResults2.length > 0) {
                            var isUserLoggedIn = true;
                        }
                        if (isUserLoggedIn) {
                            if (aResults2[0].DELETE_CHK === "disabled") {
                                that.byId("idReset3").setEnabled(false);
                            }
                            if (aResults2[0].UPDATE_CHK == "disabled") {
                                that.byId("idupdate").setEnabled(false);
                            }
                        }
                        else {
                            //    that.byId("idReset3").setEnabled(false);
                        }
                    },
                    error: function (oData, error) {
                        MessageToast.show("error");
                    },
                });
            },

            //PARTIAL PRPDUCTS//

            handleValueHelp3: function (oEvent) {
                var sId = oEvent.getParameter("id");
                // Prod Dialog
                if (sId.includes("idCommon")) {
                    // that.oProdList1.removeSelections();
                    that._valueHelpDialogProd2.open();
                    // Prod Desc Dialog
                }
            },
            /**
               * Called when 'Close/Cancel' button in any dialog is pressed.
               * In this function based in sId will close the dialogs.
               */
            handleClose3: function (oEvent) {
                var sId = oEvent.getParameter("id");
                // Prod Dialog
                if (sId.includes("prodSlct")) {
                    that._oCore
                        .byId(this._valueHelpDialogProd2.getId() + "-searchField")
                        .setValue("");
                    if (that.oProdList1.getBinding("items")) {
                        that.oProdList1.getBinding("items").filter([]);
                    }
                }
            },

            handleSelection3: function (oEvent) {
                that.oItem = oEvent.getParameters().selectedItem.getTitle();
                this.oProd3 = that.byId("idCommon");
                that.oProd3.setValue(that.oItem);
                that.byId("idPartialSearch").setValue();
                if (that.oProdList1.getBinding("items")) {
                    that.oProdList1.getBinding("items").filter([]);
                }
            },

            handleSearch3: function (oEvent) {
                var sQuery =
                    oEvent.getParameter("value") || oEvent.getParameter("newValue"),
                    sId = oEvent.getParameter("id"),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";
                // Product
                if (sId.includes("prodSlct")) {
                    if (sQuery !== "") {
                        oFilters.push(
                            new Filter({
                                filters: [
                                    new Filter("PRODUCT_ID", FilterOperator.Contains, sQuery),
                                    new Filter("PROD_DESC", FilterOperator.Contains, sQuery)
                                ],
                                and: false,
                            })
                        );
                    }
                    that.oProdList1.getBinding("items").filter(oFilters);

                }
            },

            onResetPress: function () {
                if (that.sKey === "PartialProducts") {
                    that.loadArray = [];
                    that.byId("prodList").removeSelections();
                    that.byId("idPartialSearch").setValue("");
                    that.byId("idCommon").setValue("");
                    that.oListModel.setData({ results: [] });
                    that.byId("prodList").setModel(that.oListModel);
                    that.byId("idSaveBtn").setEnabled(true);
                }
                else if (that.sKey === "ClassIBP" || that.sKey === "") {
                    // that.onClearReset();
                    that.byId("idCommon").setValue("");
                    that.byId("classSearch").setValue("");
                    that.byId("classList").setModel(new JSONModel([]));

                } else if (that.sKey === "CharacteristicPriority" || that.sKey === "") {

                    that.byId("idCommon").setValue("");
                    that.byId("idPrimarySearch").setValue("");
                    that.byId("Primarytable").setModel(new JSONModel([]));

                } else {
                    that.byId("idCommon").setValue("");
                    that.byId("groupSearch").setValue("");
                    that.byId("Primarytable2").setModel(new JSONModel([]));
                    that.byId("Group").setModel(new JSONModel([]));
                    that.byId("Primarytable").setModel(new JSONModel([]));
                }
            },

            removeDuplicate(array, key) {
                var check = new Set();
                return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
            },

            onTableScroll: function (oEvent) {
                if (oEvent.getParameters().reason !== "Change") {
                    // Get the table control
                    var oTable = oEvent.getSource();
                    // Get the number of visible rows
                    var iVisibleRows = oTable.getItems().length;
                    // Get the number of total rows
                    var iTotalRows = oTable.getGrowingInfo().total;;
                    if (iVisibleRows >= iTotalRows) {
                        // Load more data when reaching the bottom of the table
                        // this.loadData(iTotalRows, 1000); // Load the next 100 records
                    }
                }
            },

            onNavPress: function () {
                if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
                    var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
                    // // generate the Hash to display 
                    var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
                        target: {
                            semanticObject: "VCPDocument",
                            action: "Display"
                        }
                    })) || "";
                    // //Generate a  URL for the second application
                    var url = window.location.href.split('#')[0] + hash;
                    // //Navigate to second app
                    sap.m.URLHelper.redirect(url, true);
                }
            },


            selectedItems: function () {
                var tableData = that.byId("prodList").getItems();
                for (var i = 0; i < tableData.length; i++) {
                    for (var k = 0; k < that.productChar.length; k++) {
                        if (tableData[i].getBindingContext().getProperty().PRODUCT_ID === that.productChar[k].PRODUCT_ID
                            && tableData[i].getBindingContext().getProperty().CHAR_NAME === that.productChar[k].CHAR_NAME
                            && tableData[i].getBindingContext().getProperty().CHAR_VALUE === that.productChar[k].CHAR_VALUE
                            && tableData[i].getBindingContext().getProperty().CLASS_NAME === that.productChar[k].CLASS_NAME) {
                            tableData[i].setSelected(true);
                            break;
                        }
                    }
                }
            },

            getUser: function () {
                let vUser;
                if (sap.ushell.Container) {
                    let email = sap.ushell.Container.getService("UserInfo").getUser().getEmail();
                    vUser = (email) ? email : "";
                }
                return vUser;
            },

            getEnable1: function () {
                var oModel = this.getOwnerComponent().getModel("BModel");
                var vUser = "Testing" //this.getUser();
                var oEntry = {
                    USERDATA: []
                };
                let oParamVals = {
                    USEREMAIL: vUser
                };
                oEntry.USERDATA.push(oParamVals);
                oModel.callFunction("/genUserAppVisibility", {
                    method: "GET",
                    urlParameters: {
                        FLAG: 'G',
                        USERDATA: JSON.stringify(oEntry.USERDATA)
                    },
                    success: function (oData) {

                        aResults3 = oData.results
                        if (aResults3.length > 0) {
                            var isUserLoggedIn = true;
                        }

                        if (isUserLoggedIn) {
                            if (aResults3[0].CREATE_CHK == "disabled") {
                                that.byId("idSaveBtn").setEnabled(true);
                            }
                            else {
                                that.byId("idSaveBtn").setEnabled(true);
                            }
                        }
                        else {
                            that.byId("idSaveBtn").setEnabled(true);

                        }
                    },
                    error: function (oData, error) {
                        MessageToast.show("error");
                    },
                });
            },

            removeDuplicateforProdClas: function (array, key) {
                var check = new Set();
                return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
            },

            ValueHelpForProdClas: function () {
                this.valueHelpClasProdDialog.open()
                this.valueHelpClasProdDialog.setBusy(true);
                setTimeout(() => {
                    this.valueHelpClasProdDialog.setBusy(false)
                }, 1000)
                sap.ui.getCore().byId("idClasProd").getBinding("items").filter([])
                // sap.ui.getCore().byId("idClasProd").getAggregation("_dialog").getContent()[1].removeSelections()
                // sap.ui.getCore().byId("idClasProd").getItems()[0].setSelected(true)
                sap.ui.getCore().byId("idClasProd").clearSelection(true)

            },

            handleSearchforClasProd: function (oEvent) {
                var sQuery =
                    oEvent.getParameter("value") || oEvent.getParameter("newValue"),
                    sId = oEvent.getParameter("id"),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";
                // Product
                if (sId.includes("idClasProd")) {
                    if (sQuery !== "") {
                        oFilters.push(
                            new Filter({
                                filters: [
                                    new Filter("PRODUCT_ID", FilterOperator.Contains, sQuery),
                                    new Filter("PROD_DESC", FilterOperator.Contains, sQuery)
                                ],
                                and: false,
                            })
                        );
                    } else {
                        that.oProdList.getBinding("items").filter([]);
                    }
                    //  that.oProdList.getBinding("items").filter(oFilters);


                    that.oProdList = sap.ui.getCore().byId("idClasProd")
                    that.oProdList.getBinding("items").filter(oFilters);
                    if (that.oProdList.getItems().length == 0) {
                        that.oProdList.setNoDataText("No Data");
                    }
                    //    sap.ui.getCore().byId("idClasProd").getBinding("items").filter(oFilters);

                }
            },


            handleSelectionForProdClas: function (oEvent) {

                if (oEvent !== undefined) {
                    //   var oEv = oEvent.getSource()
                    that.oItem = oEvent.getParameters().selectedItem.getTitle()
                }
                else {
                    that.oItem = that.byId("idCommon").getValue();
                }

                that.byId("idCommon").setValue(that.oItem)
                that.validation();

            },


            /* /////////////////// SCM Relevent manual updating function starts ////////////////////////// */
            onClassUpdate: function () {
                var aClassData = that.byId("classList").getItems();
                if (aClassData.length === 0) {
                    MessageToast.show("No data for update..")
                    return false;
                }
                var oEntry = {
                    CLASSDATA: [],
                },
                    vRuleslist;

                var product = that.byId("idCommon").getValue();
                for (var i = 0; i < aClassData.length; i++) {
                    let vIbpCheck = '';
                    if (aClassData[i].getCells()[4].getSelected() === true) {
                        vIbpCheck = 'X';
                    }
                    else {

                    }
                    vRuleslist = {
                        CLASS_NUM: aClassData[i].getCells()[0].getText(),
                        IBPCHAR_CHK: vIbpCheck,
                        PRODUCT_ID: product
                    };
                    oEntry.CLASSDATA.push(vRuleslist);
                }
                sap.ui.core.BusyIndicator.show();
                that.getModel("BModel").callFunction("/updateIBPClass", {
                    method: "GET",
                    urlParameters: {
                        CLASSDATA: JSON.stringify(oEntry.CLASSDATA)
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        if (oData.updateIBPClass === "ERROR") {
                            MessageToast.show("Selected Product Characteristics Already Exist in Secondary")
                        }
                        else {
                            sap.m.MessageToast.show("Updated Successfully");
                            that.loadIbp()
                        }

                        // that.onBack();
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        sap.m.MessageToast.show("Update Failed");
                        //  that.onBack();
                    },
                });
            },

            /* /////////////////// SCM Relevent manual updating function ends ////////////////////////// */

            loadIbp: function (oEvent) {
                that.oModel.setData({
                    results: [],
                });

                that.byId("classList").setModel(that.oModel);
                var oItem = that.byId("idCommon").getValue(),
                    oFilters = [];
                that.ocIbp = [];
                var topCount = that.oGModel.getProperty("/MaxCount");
                if (oItem) {
                    var filter = new Filter("PRODUCT_ID", FilterOperator.EQ, oItem);
                    oFilters.push(filter);
                }
                if (oItem) {
                    sap.ui.core.BusyIndicator.show();
                    that.getOwnerComponent().getModel("BModel").read("/getIBPProdClass", {
                        filters: oFilters,
                        urlParameters: {
                            "$skip": that.skip,
                            "$top": topCount
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            that.cFlag = ""
                            if (topCount == oData.results.length) {
                                that.skip += (topCount);
                                that.ocIbp = that.ocIbp.concat(oData.results);
                                that.loadIbp();
                            } else {
                                that.skip = 0;
                                that.ocIbp = that.ocIbp.concat(oData.results);
                                that.byId("classSearch").setValue("")
                                var oBinddata = that.removeDuplicateforProdClas(that.ocIbp, "CLASS_NAME")
                                that.oModel.setData({
                                    results: oBinddata,
                                });
                                that.oModel.setSizeLimit(oData.results.length)
                                var temp = JSON.stringify(oData.results)
                                that.clsResults = JSON.parse(temp);
                                that.byId("classList").setModel(that.oModel);
                                //   that.getEnable();

                                that.releventCls = that.clsResults
                                //   that.validation();
                            }


                        },
                        error: function (oData, error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Error While getting data");
                        },
                    });
                } else {
                    //  that.onClearReset()
                    that.onResetPress()
                }
            },



            oDownloadClassesData: function () {
                var that = this;
                sap.ui.core.BusyIndicator.show({
                    text: "Processing data, please wait..."
                });

                that.loadIbpClassCharacteristics().then(function () {
                    // Transform the data after it is fully loaded
                    var transformedData = that.oSCMreleventData.map(item => {
                        return {
                            PRODUCT_ID: item.PRODUCT_ID,
                            CLASS_NAME: item.CLASS_NAME,
                            CLASS_DESC: item.CLASS_DESC,
                            CLASS_TYPE: item.CLASS_TYPE,
                            CLASS_NUM: item.CLASS_NUM,
                            IBPCHAR_CHK: String(item.IBPCHAR_CHK).toUpperCase()
                        };
                    });

                    // Export to Excel
                    var aCols = [
                        { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
                        { label: 'CLASS_NAME', property: 'CLASS_NAME', width: 30 },
                        { label: 'CLASS_DESC', property: 'CLASS_DESC', width: 30 },
                        { label: 'CLASS_TYPE', property: 'CLASS_TYPE', width: 30 },
                        { label: 'CLASS_NUM', property: 'CLASS_NUM', width: 30 },
                        { label: 'IBPCHAR_CHK', property: 'IBPCHAR_CHK', width: 30 }
                    ];

                    sap.ui.core.BusyIndicator.hide();
                    var oSettings = {
                        workbook: { columns: aCols },
                        dataSource: transformedData,
                        fileName: 'Class IBP Characteristics.xlsx',
                        worker: true
                    };

                    var oSheet = new sap.ui.export.Spreadsheet(oSettings);
                    oSheet.build().then(function () {
                        sap.m.MessageToast.show('Export complete');
                    }).finally(function () {
                        oSheet.destroy();
                    });
                }).catch(function (error) {
                    sap.ui.core.BusyIndicator.hide();
                    sap.m.MessageBox.error("Error: " + error.message);
                });
            },



            loadIbpClassCharacteristics: function () {
                var that = this;
                return new Promise(function (resolve, reject) {
                    that.byId("classSearch").setValue("");
                    that.oclassTable = [];
                    var topCount = that.oGModel.getProperty("/MaxCount");

                    function fetchData() {
                        that.getOwnerComponent().getModel("BModel").read("/getIBPProdClass", {
                            urlParameters: {
                                "$skip": that.skip,
                                "$top": topCount
                            },
                            success: function (oData) {
                                that.cFlag = "";
                                if (topCount == oData.results.length) {
                                    that.skip += parseInt(topCount);
                                    that.oclassTable = that.oclassTable.concat(oData.results);
                                    fetchData();
                                } else {
                                    that.skip = 0;
                                    that.oclassTable = that.oclassTable.concat(oData.results);

                                    var akeys = ["PRODUCT_ID", "CLASS_NAME"];
                                    let aItems = that.removeDupScmrelevent(that.oclassTable, akeys);
                                    that.oSCMreleventData = aItems;

                                    resolve();
                                }
                            },
                            error: function (err) {
                                sap.ui.core.BusyIndicator.hide();
                                MessageToast.show("Error");
                                reject(err);
                            }
                        });
                    }

                    fetchData(); // Start fetching data
                });
            },




            // this function for showing table data in IBP Class Characteristic and added 30k functionality (onInit)
            // loadIbpClassCharacteristics: function () {
            //     that.byId("classSearch").setValue("")
            //     that.oclassTable = [];
            //     var topCount = that.oGModel.getProperty("/MaxCount");
            //     that.getOwnerComponent().getModel("BModel").read("/getIBPProdClass", {
            //         urlParameters: {
            //             "$skip": that.skip,
            //             "$top": topCount
            //         },
            //         success: function (oData) {
            //             that.cFlag = ""
            //             if (topCount == oData.results.length) {
            //                 that.skip += parseInt(topCount);
            //                 that.oclassTable = that.oclassTable.concat(oData.results);
            //                 that.loadIbpClassCharacteristics();
            //             } else {
            //                 that.skip = 0;
            //                 that.oclassTable = that.oclassTable.concat(oData.results);
            //                 var arry = that.oclassTable

            //                 var akeys = ["PRODUCT_ID", "CLASS_NAME"]
            //                 let aItems = that.removeDupScmrelevent(that.oclassTable, akeys);

            //                 that.oSCMreleventData = aItems
            //             }
            //             sap.ui.core.BusyIndicator.hide();
            //         },
            //         error: function (err) {
            //             sap.ui.core.BusyIndicator.hide();
            //             MessageToast.show("Error");
            //         }
            //     });
            // },

            removeDupScmrelevent: function (array, keys) {
                const filtered = array.filter(
                    (s => o =>
                        (k => !s.has(k) && s.add(k))
                            (keys.map(k => o[k]).join('|'))
                    )
                        (new Set)
                );
                return filtered;
            },



            /* /////////////////// SCM Relevent Upload functionality starts ////////////////////////// */

            uploadData: function (oEvent) {
                //  sap.ui.core.BusyIndicator.show();
                sap.ui.core.BusyIndicator.show({
                    text: "Processing data, please wait..."
                });
                that.loadIbpClassCharacteristics();
                var oFileUploader = oEvent.getSource();
                var oFile = oEvent.getParameter("files")[0];
                var oFileName = oFile.name

                if (oFileName.includes("Class IBP Characteristics")) {

                    if (oFile) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            var workbook = XLSX.read(data, { type: 'binary' });
                            var firstSheetName = workbook.SheetNames[0];
                            var worksheet = workbook.Sheets[firstSheetName];
                            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                            // Process the JSON data
                            that.processExcelData(jsonData);
                        };
                        reader.readAsBinaryString(oFile);
                    }
                }
                else {
                    MessageToast.show("Upload valid Class IBP Characteriestics file")
                    sap.ui.core.BusyIndicator.hide();
                    return false
                }
            },

            processExcelData: function (aData) {
                var aHeaders = aData[0];
                var aRows = aData.slice(1);
                var resultArray1 = aRows.map(function (aRow) {
                    var oObject = {};
                    aHeaders.forEach(function (sHeader, i) {
                        oObject[sHeader] = aRow[i];
                    });
                    return oObject;
                }).filter(function (oObject) {
                    // Keep rows that have at least one non-empty value
                    return Object.values(oObject).some(function (value) {
                        return value !== null && value !== undefined && value !== ''; // If any value is not empty, keep the row
                    });
                });

                that.oUploadclassData = resultArray1;
                that.uploadSCMRelevent();
            },

            uploadSCMRelevent: function () {
                that.oUniq12 = [];
                var oFilters = [];
                that.oAPD = that.oUploadclassData
                that.oAPD.forEach(f => {
                    oFilters.push(new Filter('PRODUCT_ID', FilterOperator.EQ, f.PRODUCT_ID))
                });
                var topCount = that.oGModel.getProperty("/MaxCount");
                that.getOwnerComponent().getModel("BModel").read("/getUniqueHeader", {
                    filters: oFilters,
                    urlParameters: {
                        "$skip": that.skip,
                        "$top": topCount
                    },
                    success: function (oData) {
                        if (topCount == oData.results.length) {
                            that.skip += parseInt(topCount);
                            that.oUniq12 = that.oUniq12.concat(oData.results);
                            that.uploadSCMRelevent();
                        } else {
                            that.skip = 0;
                            that.oUniq12 = that.oUniq12.concat(oData.results);
                            that.oAPD = that.oAPD.filter(item1 =>
                                !that.oUniq12.some(item2 => item2.PRODUCT_ID === item1.PRODUCT_ID)
                            );

                            that.oAPD.forEach(check => {
                                if (check.IBPCHAR_CHK === "NULL" || check.IBPCHAR_CHK === "") {
                                    check.IBPCHAR_CHK = "FALSE"
                                }
                            })

                            that.oSCMreleventData.forEach(check1 => {
                                if (check1.IBPCHAR_CHK === null || check1.IBPCHAR_CHK === "") {
                                    check1.IBPCHAR_CHK = "FALSE"
                                }
                            })

                            const oChangedData = that.oSCMreleventData.filter(groupItem =>
                                !that.oUploadclassData.some(delItem =>
                                    delItem.PRODUCT_ID === groupItem.PRODUCT_ID &&
                                    delItem.CLASS_NUM === groupItem.CLASS_NUM &&
                                    delItem.IBPCHAR_CHK === groupItem.IBPCHAR_CHK.toString().toUpperCase() &&
                                    delItem.CLASS_NAME === groupItem.CLASS_NAME &&
                                    delItem.CLASS_TYPE === groupItem.CLASS_TYPE
                                )
                            );

                            var oAllChangedata = that.oUploadclassData.filter(gl =>
                                oChangedData.some(el =>
                                    el.PRODUCT_ID === gl.PRODUCT_ID &&
                                    el.CLASS_NUM === gl.CLASS_NUM &&
                                    el.CLASS_NAME === gl.CLASS_NAME &&
                                    el.CLASS_TYPE === gl.CLASS_TYPE
                                )
                            );


                            that.inActiveData = oAllChangedata.filter(groupItem =>
                                !that.oUniq12.some(delItem =>
                                    delItem.PRODUCT_ID === groupItem.PRODUCT_ID
                                )
                            );

                            that.oActiveData = that.oUniq12.filter(groupItem =>
                                oAllChangedata.some(delItem =>
                                    delItem.PRODUCT_ID === groupItem.PRODUCT_ID
                                )
                            );

                            if (that.oAPD.length !== 0) {
                                that.onExcelUpdate()
                            } else {
                                sap.m.MessageToast.show("Selected Products have Unique ID's")
                                sap.ui.core.BusyIndicator.hide();
                            }
                        }
                        //    sap.ui.core.BusyIndicator.hide();
                    },
                    error: function (err) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Error");
                    }
                });
            },

            // for excel uploading
            onExcelUpdate: function () {
                var oEntry = {
                    CLASSDATA: [],
                };
                var vRuleslist;

                var aClassData = that.inActiveData  //that.oAPD //this.oUploadclassData;


                for (var i = 0; i < aClassData.length; i++) {
                    let vIbpCheck = '';
                    var sIBPCHAR_CHK = aClassData[i].IBPCHAR_CHK //String(aClassData[i].IBPCHAR_CHK).toUpperCase();

                    // Validate that the IBPCHAR_CHK value is either "true" or "false"
                    if (sIBPCHAR_CHK.toString().toUpperCase() !== "TRUE" && sIBPCHAR_CHK.toString().toUpperCase() !== "FALSE") {
                        // If invalid, show an error message and stop the process
                        sap.m.MessageToast.show("Invalid value for IBPCHAR_CHK at row " + (i + 1) + ". Allowed strings are 'true' or 'false'.");
                        return;  // Stop further execution if invalid data is found
                    }

                    // Convert the valid 'true' or 'false' string to 'X' or empty string
                    vIbpCheck = (sIBPCHAR_CHK.toString().toUpperCase() === "TRUE") ? 'X' : '';

                    // Add the processed data to the update list
                    vRuleslist = {
                        PRODUCT_ID: aClassData[i].PRODUCT_ID,
                        CLASS_NUM: aClassData[i].CLASS_NUM,
                        IBPCHAR_CHK: vIbpCheck
                    };

                    // Push the formatted object to the update list
                    oEntry.CLASSDATA.push(vRuleslist);
                }
                var allProds = []
                var oCurrentprods = []
                allProds = that.oUploadclassData
                oCurrentprods = oEntry.CLASSDATA



                sap.ui.core.BusyIndicator.hide();
                var oExistingprods = that.removeDuplicateforProdClas(that.oActiveData, "PRODUCT_ID")

                const productIds = oExistingprods.map(product => product.PRODUCT_ID).join(", ");

                if (productIds.length === 0 && oEntry.CLASSDATA.length === 0) {
                    // MessageBox.information("No changes in uploaded file..")
                    var confirmationMessage = `No changes in uploaded file..`;

                }
                if (productIds.length === 0 && oEntry.CLASSDATA.length > 0) {

                    var confirmationMessage = ` Would you like to update the products..?`;
                }
                if (productIds.length > 0 && oEntry.CLASSDATA.length > 0) {
                    var confirmationMessage = `Products have already existing active plan..\n\n`;
                    confirmationMessage += `${productIds}` //.join("\n"); // Join the product IDs with a newline
                    confirmationMessage += `\n\n Would you like to update the remaining products..?`;
                }
                if (productIds.length > 0 && oEntry.CLASSDATA.length === 0) {
                    var confirmationMessage = `Products have already existing active plan..`;

                }

                if (oEntry.CLASSDATA.length > 0) {
                    sap.m.MessageBox.confirm(confirmationMessage, {
                        // "Are you sure you want to update the IBP Class?", {
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.YES) {
                                sap.ui.core.BusyIndicator.show();
                                that.getModel("BModel").callFunction("/updateIBPClass", {
                                    method: "GET",
                                    urlParameters: {
                                        CLASSDATA: JSON.stringify(oEntry.CLASSDATA)
                                    },
                                    success: function (oData) {
                                        sap.ui.core.BusyIndicator.hide();
                                        that.loadIbp();
                                        sap.m.MessageToast.show("Updated Successfully");
                                    },
                                    error: function (error) {
                                        sap.ui.core.BusyIndicator.hide();
                                        sap.m.MessageToast.show("Update Failed");
                                    }
                                });
                            }
                        }.bind(this) // Ensure the context is bound to 'this'
                    });
                } else {
                    MessageBox.alert(confirmationMessage)
                }
            },

            /* //////////////////// SCM Relevent Upload functionality ends //////////////////////////////*/

            onClearReset: function () {
                that.byId("idCommon").setValue("");
                that.byId("classSearch").setValue("")
                var aModel = new JSONModel()
                aModel.setData({
                    results: that.forRest
                })
                aModel.setSizeLimit(that.forRest.length)
                that.byId("classList").setModel(aModel)

            },

            // Previous working functionalities 
            // oAttributeDownload: function () {
            //     that.oPList = that.byId("Primarytable2");
            //     that.oAttr

            //     that.ops.forEach(op => {
            //         const matchingAttr = that.oAttr.find(attr =>
            //             attr.PRODUCT_ID === op.PRODUCT_ID &&
            //             attr.CHAR_NAME === op.CHAR_NAME &&
            //             attr.CHAR_NUM === op.CHAR_NUM
            //         );

            //         if (matchingAttr) {
            //             // Assign CHAR_TYPE from that.oAttr to that.ops
            //             op.CHAR_TYPE = matchingAttr.CHAR_TYPE;

            //             // Add SELECTED property based on CHAR_TYPE
            //             op.SELECTED = matchingAttr.CHAR_TYPE === "P";
            //         } else {
            //             // Default CHAR_TYPE and SELECTED if no match found
            //             op.CHAR_TYPE = "S";
            //             op.SELECTED = FALSE;
            //         }
            //     });

            //     var oGProduct = that.byId("idCommon").getValue();
            //     if (!oGProduct) {
            //         MessageToast.show("Select product for downlaod")
            //         return false
            //     }
            //     var exportToExcel = function () {
            //         var aCols = [
            //             { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
            //             { label: 'CHAR_NUM', property: 'CHAR_NUM', width: 30 },
            //             { label: 'CHAR_NAME', property: 'CHAR_NAME', width: 30 },
            //             { label: 'CHAR_DESC', property: 'CHAR_DESC', width: 30 },
            //             { label: 'SELECTED', property: 'SELECTED', width: 30 }

            //         ];
            //         var oSettings = {
            //             workbook: {
            //                 columns: aCols,
            //             },

            //             dataSource: that.ops, //sData,
            //             fileName: 'SCM IBP Attributes.xlsx',
            //             worker: true
            //         };

            //         var oSheet = new sap.ui.export.Spreadsheet(oSettings);
            //         oSheet.build().then(function () {
            //             sap.m.MessageToast.show('Succesfully Download');
            //         }).finally(function () {
            //             oSheet.destroy();
            //         });
            //     };

            //     exportToExcel();

            // },

            // oAttributeUpload: function (oEvent) {
            //     var oFileUploader = oEvent.getSource();
            //     var oFile = oEvent.getParameter("files")[0];
            //     var oFilename = oFile.name
            //     if (oFilename.includes("SCM IBP Attributes")) {
            //         if (oFile) {
            //             var reader = new FileReader();

            //             reader.onload = function (e) {
            //                 var data = e.target.result;
            //                 var workbook = XLSX.read(data, { type: 'binary' });
            //                 var firstSheetName = workbook.SheetNames[0];
            //                 var worksheet = workbook.Sheets[firstSheetName];
            //                 var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            //                 // Process the JSON data
            //                 that.oSCMAttribute(jsonData);
            //             };

            //             reader.readAsBinaryString(oFile);
            //         }
            //     } else {
            //         MessageToast.show("Upload valid SCM Attributes file")
            //         sap.ui.core.BusyIndicator.hide();
            //         return false
            //     }

            // },


        });
    });

