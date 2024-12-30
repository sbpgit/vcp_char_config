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
                that.prodModel = new JSONModel();
                that.oListModel = new JSONModel();
                that.prodModel1 = new JSONModel();
                that.prodModel1.setSizeLimit(5000);
                that.locModel.setSizeLimit(5000);
                that.oListModel.setSizeLimit(5000);
                this._oCore = sap.ui.getCore();

                if (!this._valueHelpDialogProd) {
                    this._valueHelpDialogProd = sap.ui.xmlfragment(
                        "demo.vcpcharconfig.view.ProdDialog",
                        this
                    );
                    this.getView().addDependent(this._valueHelpDialogProd);
                    //   that.getUsername()
                    // Declaring JSON Model and size limit
                    that.oModel = new JSONModel();
                    this.oModel.setSizeLimit(1000);
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
                //       this.attachDragDrop2();  TEMP COMP
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

            onAfterRendering: function () {
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
                that.oGroupView()
                //   sap.ui.core.BusyIndicator.show();
                // this.getModel("BModel").read("/getProdPredCheck", {
                //     success: function (oData) {
                //         //   sap.ui.core.BusyIndicator.hide();
                //         that.oAllProducts = oData.results;
                //         that.prodModel.setData(oData);
                //         that.oProdList.setModel(that.prodModel);
                //     },
                //     error: function (oData, error) {
                //         sap.ui.core.BusyIndicator.hide();
                //         MessageToast.show("error");
                //     },
                // });
                oGModel1 = this.getModel("oGModel");

                //   sap.ui.core.BusyIndicator.show();
                //today commented 26-12-24
                // this.getModel("BModel").read("/getProdPredCheck", {
                //     success: function (oData) {
                //         //  sap.ui.core.BusyIndicator.hide();
                //         that.prodModel.setData(oData);
                //         that.oProdList.setModel(that.prodModel);
                //     },
                //     error: function (oData, error) {
                //         sap.ui.core.BusyIndicator.hide();
                //         MessageToast.show("error");
                //     },
                // });
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

                            // Class IBP Characteristics
                            that.loadDataforClas();

                            //Class IBP Characteristics tab getting data from this function
                            that.loadIbpClassCharacteristics()

                            // PartialProductCharacteristics value help data
     // commented  26-12-24         //     that.oPartialProdChar();
                            //  sap.ui.core.BusyIndicator.hide();

                        },
                        error: function (oData, error) {
                            console.log(error)
                        },
                    });
                }
            },

            // this function for showing table data in IBP Class Characteristic and added 30k functionality (onInit)
            loadIbpClassCharacteristics: function () {
                that.oclassTable = [];
                var topCount = that.oGModel.getProperty("/MaxCount");
                //   sap.ui.core.BusyIndicator.show();
                that.getOwnerComponent().getModel("BModel").read("/getClass", {
                    // filters: aFilters,
                    urlParameters: {
                        "$skip": that.skip,
                        "$top": topCount
                    },
                    success: function (oData) {
                        if (topCount == oData.results.length) {
                            that.skip += parseInt(topCount);
                            that.oclassTable = that.oclassTable.concat(oData.results);
                            that.loadIbpClassCharacteristics();
                        } else {
                            that.skip = 0;
                            that.oclassTable = that.oclassTable.concat(oData.results);
                            that.byId("classSearch").setValue("")
                            var aModel = new JSONModel()
                            aModel.setData({
                                results: that.oclassTable
                            })
                            that.byId("classList").setModel(aModel)

                        }
                           sap.ui.core.BusyIndicator.hide();
                    },
                    error: function (err) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Error");
                    }
                });
            },

            // this function calls in 30k functionality (onInit)
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
                        if (topCount == oData.results.length) {
                            that.skip += parseInt(topCount);
                            that.oclassIbp = that.oclassIbp.concat(oData.results);
                            that.loadDataforClas();
                        } else {
                            that.skip = 0;
                            that.oclassIbp = that.oclassIbp.concat(oData.results);

                            that.byId("classSearch").setValue("")
                            let aItems = that.removeDuplicateforProdClas(that.oclassIbp, "PRODUCT_ID")
                            var aModel = new JSONModel()
                            aModel.setData({
                                aItems: aItems
                            })
                            sap.ui.getCore().byId("idClasProd").setModel(aModel)

                        }
                        //        sap.ui.core.BusyIndicator.hide();
                    },
                    error: function (err) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Error Loading Products Data");
                    }
                });
            },

            oPartialProdChar: function () {
                //   sap.ui.core.BusyIndicator.show();
                that.oParProd = [];
                var topCount = that.oGModel.getProperty("/MaxCount");
                this.getOwnerComponent().getModel("BModel").read("/getProducts", {
                    method: "GET",
                    urlParameters: {
                        "$skip": that.skip,
                        "$top": topCount
                    },
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();

                        if (topCount == oData.results.length) {
                            that.skip += parseInt(topCount);
                            that.oParProd = that.oParProd.concat(oData.results);
                            that.oPartialProdChar();
                        }
                        else {
                            that.skip = 0;
                            that.oParProd = that.oParProd.concat(oData.results);
                            let aProds = removeDuplicate(that.oParProd, 'PRODUCT_ID');
                            that.prodModel1.setData({
                                aResults3: aProds,
                            });
                            // that.oProdList1.setModel(that.prodModel1);
                            sap.ui.getCore().byId("prodSlctListAP").setModel(that.prodModel1);
                            function removeDuplicate(array, key) {
                                var check = new Set();
                                return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                            }

                        }

                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
            },

            // oPening Group Fragment
            onGroupMaintenance: function (oEv) {

                // var oTab = that.byId("Group").getItems()
                // if (oTab.length >= 9) {
                //     sap.m.MessageToast.show("Maximum Groups Created")
                //     return false;
                // }

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
                sap.ui.getCore().byId("oGroupName").setValue("")
                sap.ui.getCore().byId("oGroupName").setEnabled(true);
                sap.ui.getCore().byId("oWeightage").setValue("")

                that.groupDialog.open();
            },

            onGo: function () {
                if (that.sKey === "ClassIBP" || that.sKey === "") {
                    that.loadIbp();
                } else if (that.sKey === "CharacteristicPriority") {
                    that.onGetData();
                }
                else if (that.sKey === "PartialProducts") {
                    that.onGetData3();

                } else if (that.sKey === "IBPAttributes") {
                    that.onGetData2();

                }
            },

            onTabSelect: function (oEv) {
                var sKey = oEv.getSource().getSelectedKey();
                var cProd = that.byId("idCommon").getValue();
                //  that.oGroupView()
                //Loading SCM Relavent Class Data
                if (sKey === "ClassIBP" || sKey === "") {
                    that.sKey = "ClassIBP";
                    that.byId("idReset").setVisible(true);
                    that.loadIbp();
                }
                //Loading Prioritization Grouping Data
                else if (sKey === "PrioritizationGrouping") {
                   
                    that.sKey = sKey;
                    that.oGroupView()
                    that.byId("idReset").setVisible(false);
                }

                //Loading Characteristic Prioritization data
                else if (sKey === "CharacteristicPriority") {
                    that.sKey = sKey;
                    that.byId("idReset").setVisible(false);
                    if (cProd !== "") {
                        that.onGetData();
                        setTimeout(function(){
                            // that.onPrimarySearch();
                        },1000)
                        
                    }

                }
                //Loading PartialProducts data
                else if (sKey === "PartialProducts") {
                    that.sKey = sKey;
                    that.byId("idReset").setVisible(true);
                    if (cProd !== '') {
                        that.onGetData3();
                    }

                }
                //Loading IBP Attributes data
                else if (sKey === "IBPAttributes") {
                    that.sKey = sKey;
                    that.byId("idReset").setVisible(false);
                    if (cProd !== '') {
                        that.onGetData2();
                    }
                }
            },

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
                    sap.ui.getCore().byId("oDlg").setTitle("Update Weightage")
                    sap.ui.getCore().byId("gCreate").setVisible(false)
                    sap.ui.getCore().byId("gEdit").setVisible(true)
                    sap.ui.getCore().byId("oGroupName").setValue(gSelect.GROUP_NAME)
                    sap.ui.getCore().byId("oGroupName").setEnabled(false)
                    sap.ui.getCore().byId("oWeightage").setValue(gSelect.WEIGHTAGE)
                } else {

                    //   sap.ui.getCore().byId("oDlg").setTitle("Create Group Name")
                    sap.ui.getCore().byId("gCreate").setVisible(true)
                    sap.ui.getCore().byId("gEdit").setVisible(false)
                    sap.ui.getCore().byId("oGroupName").setValue("")
                    sap.ui.getCore().byId("oGroupName").setEnabled(true);
                    sap.ui.getCore().byId("oWeightage").setValue("")
                }

                that.groupDialog.open();
            },

            onEdit: function (oEvent) {
                //   var gSelect = oEvent.getSource().getBindingContext().getObject();
                var GROUP_NAME = sap.ui.getCore().byId("oGroupName").getValue(),
                    WEIGHTAGE = sap.ui.getCore().byId("oWeightage").getValue();
                if (WEIGHTAGE > 1) {
                    var customerGroupData = JSON.stringify([{
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
                            sap.m.MessageToast.show("Succesfully Updated")
                          //  that.onAfterRendering();
                            that.oGroupView()
                            that.onGCancel();
                            that.groupDialog.close();
                            sap.ui.getCore().byId("oGroupName").setValue("");
                            sap.ui.getCore().byId("oWeightage").setValue("");
                        },
                        error: function (oData, error) {
                            MessageToast.show("error");
                        },
                    });
                } else {
                    sap.m.MessageToast.show("Enter the Weightage more than 1");
                }

            },

            //Creating Groups
            onGroupCreate: function () {
                var oGroupName = sap.ui.getCore().byId("oGroupName").getValue(),
                    oWeightage = parseFloat(sap.ui.getCore().byId("oWeightage").getValue());

                const results = that.gData.filter(obj1 => obj1.GROUP_NAME == oGroupName || parseFloat(obj1.WEIGHTAGE) == oWeightage)
                if (results.length > 0 || oWeightage <= 1) {
                    MessageBox.alert("Group Name or Weightage is already taken Choose different")
                }
                else {

                    var customerGroupData = JSON.stringify([
                        {
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
                            sap.m.MessageToast.show("Succesfully created")
                            that.oGroupView()
                           // that.onAfterRendering();
                            that.onGCancel();
                            // that.groupDialog.close();
                            // sap.ui.getCore().byId("oGroupName").setValue("");
                            // sap.ui.getCore().byId("oWeightage").setValue("");
                        },
                        error: function (oData, error) {
                            MessageToast.show("error");
                        },
                    });
                }

            },

            onGroupDelete: function (oEvent) {
                var gSelect = oEvent.getSource().getBindingContext().getObject();
                var customerGroupData = JSON.stringify([{
                    "GROUP_NAME": gSelect.GROUP_NAME,
                    "WEIGHTAGE": gSelect.WEIGHTAGE
                }])
                MessageBox.confirm("Do you want to Delete this Group ?", {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (sAction) {
                        if (sAction === "YES") {
                            that.getOwnerComponent().getModel("BModel").callFunction("/modifyCustomerGroup", {
                                method: "GET",
                                urlParameters: {
                                    Flag: "D",
                                    customerGroupData: customerGroupData
                                },
                                success: function (oData) {
                                    sap.m.MessageToast.show("Group Deleted Succesfully.")
                                    that.oGroupView();
                                 //   that.onAfterRendering();
                                },
                                error: function (oData) {
                                    MessageToast.show("error");
                                },
                            });
                        }
                        else {
                            sap.m.MessageToast.show("Deletion Cancelled.")
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

            onGroupSearch: function () {
                var sQuery = that.byId("groupSearch").getValue(),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";

                if (sQuery !== "") {
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("GROUP_NAME", FilterOperator.Contains, sQuery),
                                new Filter("WEIGHTAGE", FilterOperator.Contains, sQuery),
                            ],
                            and: false,
                        })
                    );
                }
                that.byId("Group").getBinding("items").filter(oFilters);

            },

            oGroupView: function () {
                that.getOwnerComponent().getModel("BModel").read("/getCharacteristicGroups", {
                    success: function (oData) {
                        // oData.results.forEach((x, index) => {
                        //     x.WEIGHTAGE = parseFloat(x.WEIGHTAGE);
                        //     x.enabled = index !== 0; // Enable all rows except the first one
                        // });
                       
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
                            GROUP_NAME : "",
                            WEIGHTAGE  : ""
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

            // When click on Go, this below function exists for Characteristic priortization app
            onGetData: function () {

                if (that.byId("idCommon").getValue() != "") {
                    var sProd = that.byId("idCommon").getValue();
                } else {
                    var oPd = that.byId("idCommon").setValue(that.Product_Id);
                    var sProd = that.byId("idCommon").getValue()
                }

                if (sProd !== "") {
                    sap.ui.core.BusyIndicator.show();
                    this.getModel("BModel").read("/getCharGroupWeightage", {

                        filters: [
                            new Filter("PRODUCT_ID", FilterOperator.EQ, sProd)
                        ],
                        sorters: [new sap.ui.model.Sorter("WEIGHTAGE", true)],

                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            that.oSeq = oData.results
                            // that.oSecndData = [];
                            that.oSecndData = addSorterField(oData);

                            that.oPList = that.byId("Primarytable"),
                                that.oSList = that.byId("Secondarytable");

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
                                            el.WEIGHTAGE = 0;
                                        } else {
                                            el.WEIGHTAGE = -1;
                                        }
                                    }
                                });

                                return data;
                            }

                            for (var i = 0; i < that.oSecndData.length; i++) {
                                if (that.oSecndData[i].CHAR_TYPE === "P") {
                                    that.primaryData.push(that.oSecndData[i]);
                                } else {
                                    that.primaryData.push(that.oSecndData[i]);
                                }
                            }

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
                            UidFilModel.setData({
                                groupresults: that.oGroupNames
                            });
                           


                            that.byId("SelectOption").setModel(UidFilModel)
                            that.byId("SelectOption").getModel().refresh(true);
                            that.oPList.getModel().refresh(true);

                            var items = that.oPList.getItems();
                            for (let i = 0; i < items.length; i++) {

                                var data = that.finalpriData.filter(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);

                                if (data.length > 0) {
                                    items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data[0].GROUP_NAME);
                                }

                            }
                            that.onPrimarySearch();
                        },
                        error: function (oData, error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });

                } else {
                    MessageToast.show("Please select a Product");
                }
            },

            onSectoPrim: function (oEvent) {

                var oSelection = oEvent.getSource().getSelected()
                // oEvent.getSource().setSelected(true)
                var oCheckbox = oEvent.getSource().getBindingContext().getObject();
                var Data = JSON.parse(JSON.stringify(that.oSeq));
                Data = Data.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

                var temp = [];
                that.PrimarylistModel.setData({
                    results: temp,
                });
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

                    // for(var p=0 ;p<pData.length; )


                 //  changesData[0].GROUP_NAME = "DEFAULT";
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
                    //     console.log(that.oSeq);
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
                    that.oPosition = oCheckbox.SEQUENCE 

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
                    if (that.oPosition !== undefined) {
                        that.byId("Primarytable").setSelectedItem(that.byId("Primarytable").getItems()[that.oPosition], true);
                    }
                }


                // that.oDropDown.push(oCheckbox)

            },

            // oItemChange: function (oEvent) {

            //     var oSelectedItem = oEvent.getSource().getParent().getBindingContext().getObject();
            //     var selKey = oEvent.getSource().getSelectedKey();
            //     var Data = JSON.parse(JSON.stringify(that.oSeq));
            //     Data = Data.sort((a, b) => a.SEQUENCE - b.SEQUENCE);
            //     var groupW = that.oGroupNames.filter(el => el.GROUP_NAME === selKey);
            //     var index = Data.findIndex(el => el.SEQUENCE === oSelectedItem.SEQUENCE);
            //     var dataIndex ="";
            //     if(index + 1 === Data.length){
            //         dataIndex = "X";
            //     }
            //     var changesRecord = Data.splice(index, 1);
            //     var record = Data.filter(el => el.WEIGHTAGE <= groupW[0].WEIGHTAGE);
            //     var dropPlace = Data.filter(el => el.WEIGHTAGE >= groupW[0].WEIGHTAGE);
            //     changesRecord[0].GROUP_NAME = groupW[0].GROUP_NAME;
            //     changesRecord[0].WEIGHTAGE = groupW[0].WEIGHTAGE;
            //     var tempData = Data;
            //     var flag = "";
            //     var ArrayData = [];
            //     var newseq = 0;
            //     // for(var i = 0; i < Data.length; i++){

            //     //     if(i + 1 >= dropPlace.length){

            //     //         if(flag === ""){
            //     //         changesRecord[0].SEQUENCE = ArrayData.length + 1;                        
            //     //         ArrayData.push(changesRecord[0]);
            //     //         newseq = ArrayData.length + 1;
            //     //         Data[i].SEQUENCE = newseq;
            //     //         ArrayData.push(Data[i]);

            //     //         flag = "X";
            //     //     } else {
            //     //         newseq = ArrayData.length + 1;
            //     //         Data[i].SEQUENCE = newseq;
            //     //         ArrayData.push(Data[i]);
            //     //     }

            //     //     } else {
            //     //         ArrayData.push(Data[i]);
            //     //     }

            //     // }
            //     for (var i = 0; i < Data.length; i++) {
            //         if (Data[i].WEIGHTAGE >= groupW[0].WEIGHTAGE) {
            //             ArrayData.push(Data[i]);
            //         } else {
            //             flag = "X";
            //             changesRecord[0].SEQUENCE = ArrayData.length + 1
            //             that.oPosition = changesRecord[0].SEQUENCE - 1
            //             ArrayData.push(changesRecord[0]);
            //             dataIndex ="";
            //             var seqNoNew = ArrayData.length;

            //             var ARecord = tempData.splice(i);

            //             for (var a = 0; a < ARecord.length; a++) {
            //                 seqNoNew = seqNoNew + 1;
            //                 ARecord[a].SEQUENCE = seqNoNew;
            //                 ArrayData.push(ARecord[a]);
            //             }

            //         }

            //     }

            //     if(Data.length === dropPlace.length){
            //         ArrayData.push(changesRecord[0]);
            //     }

            //     // if(dataIndex === "X"){
            //     //     changesRecord[0].SEQUENCE = ArrayData.length + 1;
            //     //     ArrayData.push(changesRecord[0]);

            //     // }

            //     that.oSeq = ArrayData;

            //     that.UidFilModel = new sap.ui.model.json.JSONModel();
            //     that.UidFilModel.setData({
            //         groupresults: that.oGroupNames
            //     });

            //     that.byId("SelectOption").setModel(that.UidFilModel)

            //     if(that.byId("idPrimarySearch").getValue() !== ""){
            //         that.onPrimarySearch();
            //     } else {
            //     that.PrimarylistModel.setData({
            //         results: ArrayData,
            //     });
            //     that.oFinalData = ArrayData
            //     that.PrimarylistModel.setSizeLimit(5000);
            //     that.oPList.setModel(that.PrimarylistModel);




            //     var items = that.oPList.getItems();
            //     for (let i = 0; i < items.length; i++) {

            //         var data = that.oFinalData.filter(el => el.CHAR_NUM === items[i].getCells()[0].getBindingContext().getObject().CHAR_NUM);

            //         if (data.length > 0) {
            //             items[i].getCells()[3].getItems()[1].getItems()[0].setSelectedKey(data[0].GROUP_NAME);
            //             that.byId("Primarytable").setSelectedItem(that.byId("Primarytable").getItems()[that.oPosition], true);
            //         }

            //     }
            // }


            // },


            oItemChange: function (oEvent) {
                var oSelectedItem = oEvent.getSource().getParent().getBindingContext().getObject();
                var selKey = oEvent.getSource().getSelectedKey();
                var Data = JSON.parse(JSON.stringify(that.oSeq));
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


            onClsSelect: function (oEvent) {
                var oSeleItem = oEvent.getSource().getSelected()
                var oSelObject = oEvent.getSource().getBindingContext().getObject()
                that.clsResults.forEach(ele => {
                    if (oSelObject.CLASS_NAME === ele.CLASS_NAME) {
                        if (oSeleItem != true && ele.IBPCHAR_CHK) {
                            oEvent.getSource().setSelected(true)
                            MessageBox.warning("Selected Class Characteristics are already assigned as Primary..Please go to characteristics to remove them ")
                        }
                    }
                })


            },

            oAllSave: function () {
                const allData = that.oSeq
                sap.ui.core.BusyIndicator.show();
                that.getModel("BModel").callFunction("/changeToPrimaryNewMulti", {
                    method: "GET",
                    urlParameters: {
                        CharData: JSON.stringify(allData)
                    },
                    success: function (oData) {
                      //  sap.ui.core.BusyIndicator.hide();
                        that.onGetData();
                      //  that.onAfterRendering()
                        sap.m.MessageToast.show("Successfully updated..")
                        sap.ui.core.BusyIndicator.hide();
                    },
                    error: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Failed to changes the update");
                    },
                });

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
                                that.onGetData();
                                // MessageToast.show(oData.changeToPrimary);
                                MessageToast.show("Successfully changed the sequence");
                                //   that.byId("searchField").setValue("");
                                that.onCharSearch();
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
                var sId = oEvent.getParameter("id"),
                    oItem = oEvent.getParameter("selectedItems"),
                    aSelectedItems,
                    aODdata = [];
                if (sId.includes("LocS")) {
                    //  this.oProd = that.byId("LocSlctListCPS");
                    that.oSelectedLoc = oEvent.getParameter("selectedItems");
                    that.oSelect = that.oSelectedLoc[0].getTitle()
                    that.ForDownload();
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
                        this.oProd = that.byId("prodInput2");
                        var aSelectedProd = oEvent.getParameter("selectedItems");
                        that.oProd.setValue(aSelectedProd[0].getTitle());

                        that.authFlag = oEvent.getParameter("selectedItems")[0].getBindingContext().getObject().PREDICTION_CHK;
                        if (that.oProdList.getBinding("items")) {
                            that.oProdList.getBinding("items").filter([]);
                        }
                    }
                }
            },

            // Download functionality for Characteristic Prioritization tab

            oCharPrioritizDownload: function () {
                var topCount = that.oGModel.getProperty("/MaxCount");
                if (that.byId("idCommon").getValue() === "") {
                    that._valueHelpDialogLoc.open();
                    that.oLocList = sap.ui.getCore().byId("LocSlctListCPS");
                    that.oLocList.setNoDataText("...Loading");
                    that.oLocList.setBusy(true);
                    this.getModel("BModel").read("/getfactorylocdesc", {
                        urlParameters: {
                            "$apply": "groupby((DEMAND_LOC,DEMAND_DESC,PRODUCT_ID))",
                            "$skip": 0,
                            "$top": topCount
                        },
                        success: function (oData) {
                            that.oAllLocations = oData.results;
                            that.oLocList.setBusy(false);
                            let data = $.extend(true, [], oData.results);
                            let oLocs = removeDuplicate(data, 'DEMAND_LOC');
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
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });
                } else {
                    that._valueHelpDialogLoc.open();
                    that.oLocList.setModel(new JSONModel([]));
                }
            },


            ForDownload: function () {
                var oFilters = [];
                var arr = [];
                that.oLop = that.oAllLocations.filter(f => f.DEMAND_LOC == that.oSelect);
                that.oLop.forEach(f => {
                    oFilters.push(new Filter('PRODUCT_ID', FilterOperator.EQ, f.PRODUCT_ID))
                });
                this.getModel("BModel").read("/getUniqueHeader", {
                    filters: oFilters,
                    success: function (oData) {
                        that.oUniq = oData.results;
                        that.oLop = that.oLop.filter(item1 =>
                            !that.oUniq.some(item2 => item2.PRODUCT_ID === item1.PRODUCT_ID)
                        );
                        debugger;
                        if (that.oLop.length !== 0) {
                            that.onGetDataExcelDown()
                        } else {
                            sap.m.MessageToast.show("All Products for the selected Location have Unique ID's")
                        }
                    },
                    error: function () {
                        MessageToast.show("error");
                    },
                });
            },

            onGetDataExcelDown: function () {
                const sProd = that.oLop.map(product => product.PRODUCT_ID);
                let accumulatedData = []; // Array to store combined results from each request
                if (sProd.length > 0) {
                    sap.ui.core.BusyIndicator.show();
                    // Loop through each PRODUCT_ID in sProd
                    sProd.forEach((productId, index) => {
                        this.getModel("BModel").callFunction("/getSecondaryChar", {
                            method: "GET",
                            urlParameters: {
                                FLAG: "G",
                                PRODUCT_ID: productId // Send one product ID at a time
                            },
                            success: function (oData) {
                                if (oData.results.length === 0) {
                                    sap.m.MessageToast.show("All Products for the selected Location have Unique ID's")
                                    sap.ui.core.BusyIndicator.hide();
                                } else {
                                    // Concatenate the new data into accumulatedData
                                    accumulatedData.push(oData);
                                    var liLoc = [];
                                    // Check if all requests are complete
                                    if (accumulatedData.length == sProd.length) {
                                        sap.ui.core.BusyIndicator.hide();
                                        for (let i = 0; i < accumulatedData.length; i++) {
                                            for (let n = 0; n < accumulatedData[i].results.length; n++) {
                                                liLoc = liLoc.concat(accumulatedData[i].results[n]);
                                            }
                                        }
                                        that.oApData = liLoc

                                        var exportToExcel = function () {
                                            var aCols = [
                                                //  { label: 'DEMAND_LOC', property: 'DEMAND_DESC', width: 30 },
                                                { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
                                                { label: 'CHAR_NAME', property: 'CHAR_NAME', width: 30 },
                                                { label: 'CHAR_DESC', property: 'CHAR_DESC', width: 30 },
                                                { label: 'CHAR_NUM', property: 'CHAR_NUM', width: 30 },
                                                { label: 'CHAR_TYPE', property: 'CHAR_TYPE', width: 30 },
                                                { label: 'SEQUENCE', property: 'SEQUENCE', width: 30 }
                                            ];
                                            var oSettings = {
                                                workbook: {
                                                    columns: aCols,
                                                },

                                                dataSource: that.oApData,
                                                fileName: that.oSelect + ' Characteristic Prioritization.xlsx',
                                                worker: true
                                            };

                                            var oSheet = new sap.ui.export.Spreadsheet(oSettings);
                                            oSheet.build().then(function () {
                                                sap.m.MessageToast.show('Succesfully Download');
                                            }).finally(function () {
                                                oSheet.destroy();
                                            });
                                        };
                                        // Call the export function to download the Excel file
                                        exportToExcel();

                                    }
                                }
                            },
                            error: function () {
                                sap.ui.core.BusyIndicator.hide();
                                MessageToast.show("Error occurred while fetching data for product: " + productId);
                            }
                        });
                    });
                } else {
                    MessageToast.show("Please select a Product");
                }
            },

            oCharPrioritizDownload1: function () {
                // var oPrimarytable = that.byId("Primarytable").getModel().getData().results,
                //     oSecondarytable = that.byId("Secondarytable").getModel().getData().results;

                // // Combine both tables
                // var combinedData = oPrimarytable.concat(oSecondarytable);

                // Transform the combined data
                var transformedData = that.oApData.map(item => {
                    return {
                        PRODUCT_ID: item.PRODUCT_ID,
                        CHAR_NAME: item.CHAR_NAME,
                        CHAR_DESC: item.CHAR_DESC,
                        CHAR_NUM: item.CHAR_NUM,
                        CHAR_TYPE: item.CHAR_TYPE,
                        SEQUENCE: item.SEQUENCE
                    };
                });

                const resultArray = that.oAllLocations.map(locationEntry => {
                    const matchingProduct = transformedData.find(product => product.PRODUCT_ID === locationEntry.PRODUCT_ID);

                    if (matchingProduct) {
                        return {
                            ...matchingProduct,
                            location: locationEntry.DEMAND_LOC
                        };
                    }
                    return null;
                }).filter(item => item !== null);



                // Now, define the export function using sap.ui.export.Spreadsheet
                var exportToExcel = function () {
                    var aCols = [
                        //  { label: 'DEMAND_LOC', property: 'DEMAND_DESC', width: 30 },
                        { label: 'PRODUCT_ID', property: 'PRODUCT_ID', width: 30 },
                        { label: 'CHAR_NAME', property: 'CHAR_NAME', width: 30 },
                        { label: 'CHAR_DESC', property: 'CHAR_DESC', width: 30 },
                        { label: 'CHAR_NUM', property: 'CHAR_NUM', width: 30 },
                        { label: 'CHAR_TYPE', property: 'CHAR_TYPE', width: 30 },
                        { label: 'SEQUENCE', property: 'SEQUENCE', width: 30 }
                    ];
                    var oSettings = {
                        workbook: {
                            columns: aCols,
                        },

                        dataSource: resultArray,
                        fileName: 'Characteristic Prioritization.xlsx',
                        worker: true
                    };

                    var oSheet = new sap.ui.export.Spreadsheet(oSettings);
                    oSheet.build().then(function () {
                        sap.m.MessageToast.show('Succesfully Download');
                    }).finally(function () {
                        oSheet.destroy();
                    });
                };

                // Call the export function to download the Excel file
                exportToExcel();
            },


            // onGetDataExcelDown: function () {
            //     const sProd = that.oAllProducts.map(product => product.PRODUCT_ID);
            //     // if (sLoc !== "" && sProd !== "") {
            //     if (sProd !== "") {
            //         sap.ui.core.BusyIndicator.show();
            //         this.getModel("BModel").callFunction("/getSecondaryChar", {
            //             method: "GET",
            //             urlParameters: {
            //                 FLAG: "G",
            //                 // LOCATION_ID: sLoc,
            //                 PRODUCT_ID: sProd
            //             },
            //             success: function (oData) {
            //                 sap.ui.core.BusyIndicator.hide();

            //             },
            //             error: function (oData, error) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("error");
            //             },
            //         });

            //     } else {
            //         MessageToast.show("Please select a Product");
            //     }
            // },

            // Upload functionality for Characteristic Prioritization tab

            oCharPrioritiz: function (oEvent) {
                // if (that.byId("idCommon").getValue() === "") {
                //     sap.m.MessageToast.show("Please select product")
                //     return false;
                // }
                var oFileUploader = oEvent.getSource();
                var oFile = oEvent.getParameter("files")[0];

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

            },


            oCharPrioritizprocessExcelData: function (aData) {
                var aHeaders = aData[0];
                var aRows = aData.slice(1);
                var resultArray1 = [];
                var productSequenceMap = {};

                for (var i = 0; i < aRows.length; i++) {
                    var oObject = {};
                    aHeaders.forEach(function (sHeader, j) {
                        oObject[sHeader] = aRows[i][j];
                    });


                    var hasNonEmptyValue = Object.values(oObject).some(function (value) {
                        return value !== null && value !== undefined && value !== '';
                    });

                    //  verifying CHAR_TYPE Primary(p),Secondary(s) or not..
                    if (hasNonEmptyValue && oObject.CHAR_TYPE && oObject.CHAR_TYPE !== 'P' && oObject.CHAR_TYPE !== 'S') {
                        sap.m.MessageToast.show("Error: CHAR_TYPE must be either 'Primary(p)' or 'Secondary(s)'.");
                        return false;
                    }

                    // verifying if any duplicate seq found
                    if (hasNonEmptyValue) {
                        var productId = oObject.PRODUCT_ID;
                        var sequence = oObject.SEQUENCE;

                        if (!productSequenceMap[productId]) {
                            productSequenceMap[productId] = new Set();
                        }


                        if (productSequenceMap[productId].has(sequence)) {
                            sap.m.MessageToast.show("Error: Duplicate SEQUENCE value for PRODUCT_ID: " + productId);
                            return false;
                        }

                        productSequenceMap[productId].add(sequence);
                        resultArray1.push(oObject);
                    }
                }

                that.oUploadclassData = resultArray1;
                that.Product_Id = [];
                that.onSaveSeq12();
                return true;
            },

            onSaveSeq12: function (index, data) {
                var successCount = 0;
                that.count2 = that.oUploadclassData.length
                that.Product_Id = that.oUploadclassData[0].PRODUCT_ID;

                for (var i = 0; i < that.oUploadclassData.length; i++) {


                    var oEntry = {};
                    var oPrd = that.byId("idCommon").getValue()
                    if (oPrd != "") {
                        oEntry.product = oPrd
                    } else {
                        oEntry.product = that.oUploadclassData[i].PRODUCT_ID
                    }
                    //  oEntry.product = that.byId("idCommon").getValue();
                    oEntry.CharNo = that.oUploadclassData[i].CHAR_NUM;
                    oEntry.SEQUENCE = that.oUploadclassData[i].SEQUENCE;
                    oEntry.FLAG = "E";
                    oEntry.CHAR_TYPE = that.oUploadclassData[i].CHAR_TYPE;

                    that.getModel("BModel").callFunction("/changeToPrimary", {
                        method: "GET",
                        urlParameters: {
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
                                that.byId("searchField").setValue("");
                                //   that.onCharSearch();
                                that.onGetData()
                                MessageToast.show("Successfully changed the sequence");
                            }
                        },
                        error: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("Failed to changes the char");
                        },
                    });

                }
            },






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
                                    new Filter("DEMAND_LOC", FilterOperator.Contains, sQuery),
                                    new Filter("DEMAND_DESC", FilterOperator.Contains, sQuery),
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

                var text = "Active Planning Details exist. Would you like to continue? ";
                sap.m.MessageBox.show(
                    text, {

                    title: "Confirmation",
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.YES) {
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
                                        MessageToast.show("Updated Successfully");
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
                                        // for (var j = 0; j <= that.primaryData.length; j++) {
                                        //     for (var k = 0; k < that.primaryData.length; k++) {
                                        //         if (j === that.primaryData[k].SEQUENCE) {
                                        //             that.finalpriData.push(that.primaryData[k]);
                                        //             break;
                                        //         }
                                        //     }

                                        // }
                                        that.finalpriData = that.primaryData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

                                        that.finalSecData = [];
                                        that.finalSecData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);
                                        // for (var j = length; j <= oData.results.length; j++) {
                                        //     for (var k = 0; k < oData.results.length; k++) {
                                        //         if (j === oData.results[k].SEQUENCE) {
                                        //             that.finalSecData.push(oData.results[k]);
                                        //             break;
                                        //         }
                                        //     }

                                        // }


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

                                        that.searchlist = that.finalSecData;


                                        that.searchlist.forEach(function (row) {
                                            row.Char = row.CHAR_NAME + " - " + row.CHAR_DESC;
                                        }, that);

                                        that.SearchModel.setData({
                                            results: that.searchlist,
                                        });
                                        that.byId("searchField").setModel(that.SearchModel);

                                        var aData = that.oSList.getItems();
                                        if (that.oSelectedItem) {
                                            for (var i = 0; i < aData.length; i++) {
                                                if (that.oSelectedItem === aData[i].getCells()[1].getText()) {
                                                    aData[i].focus();
                                                    aData[i].setSelected(true);
                                                }
                                            }
                                        }
                                        that.oGModel.setProperty("/primFlag", "");
                                        that.byId("idText").setVisible(false);
                                        that.byId("idText").removeStyleClass("textColour");

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
                        }

                    }
                }
                );
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
            //CLASS IBP CHARACTERISTICS//


            /**
                   * Called when something is entered into the search field.
                   * @param {object} oEvent -the event information.
                   */
            handleSearch2: function (oEvent) {
                var sQuery =
                    oEvent.getParameter("value") || oEvent.getParameter("newValue"),
                    sId = oEvent.getParameter("id"),
                    oFilters = [];
                // Check if search filter is to be applied
                sQuery = sQuery ? sQuery.trim() : "";
                // if (sId.includes("idSearch")) {
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

            // getUsername: function () {
            //     var oModel = that.getOwnerComponent().getModel("BModel");
            //     var vuser = that.getUserDetails();
            //     var oEntry = {
            //         USERDATA: []
            //     };
            //     let oParamVals = {
            //         USEREMAIL: vuser
            //     };
            //     oEntry.USERDATA.push(oParamVals);
            //     oModel.callFunction("/genUserAppVisibility", {
            //         method: "GET",
            //         urlParameters: {
            //             FLAG: 'G',
            //             USERDATA: JSON.stringify(oEntry.USERDATA)
            //         },
            //         success: function (oData) {
            //             aResults1 = oData.results;

            //             if (aResults1.length > 0) {
            //                 var isUserLoggedIn = true;
            //             }
            //             if (isUserLoggedIn) {
            //                 if (aResults1[0].UPDATE_CHK == "disabled") {
            //                     that.byId("idupdate").setEnabled(false);
            //                 }
            //             }
            //             else {
            //                 that.byId("idupdate").setEnabled(false);
            //             }

            //         },
            //         error: function (error) {
            //             sap.m.MessageToast.show("error");
            //         },


            //     });
            // },


            onGetData3dup: function () {
                // that.getEnable();
                // that.oGModel.setProperty("/flag", "");
                that.byId("idSearch").setValue();
                //   that.onTableItemsSelect()
                var selectedItem = that.oGModel.getProperty("/sProd") //that.byId("idCommon").getValue();
                if (selectedItem !== "") {
                    sap.ui.core.BusyIndicator.show();

                    that.byId("idSaveBtn").setEnabled(true);

                    that.byId("idSearch").setValue("");
                    that.byId("prodList").removeSelections();
                    sap.ui.core.BusyIndicator.show();
                    that.loadArray = [];
                    var data = {
                        PRODUCT_ID: selectedItem
                    }, finalData = [];
                    finalData.push(data);
                    this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                        method: "GET",
                        urlParameters: {
                            Flag: "X",
                            PRODATA: JSON.stringify(finalData)
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            // if (oData.results.length === 0) {
                            //     MessageToast.show("No characteristics available for the selected product");
                            // }
                            // else {
                            //     that.loadArray = oData.results;
                            //     that.productChar = oData.results;
                            //     that.AvailChars = removeDuplicate(that.productChar, 'CHAR_NAME');
                            //     that.oListModel.setData({ results: that.AvailChars });
                            //     that.byId("prodList").setModel(that.oListModel);
                            //     function removeDuplicate(array, key) {
                            //         var check = new Set();
                            //         return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                            //     }
                            //     that.loadData(0, 1000);
                            // }
                        },
                        error: function (error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });
                }
                else {
                    that.byId("idSaveBtn").setEnabled(true);
                    MessageToast.show("Please select a product");
                }
            },

            // Partial Product Characteristics app save functionality
            onSaveChar: function () {
                var that = this;
                that.getEnable();
                // sap.ui.core.BusyIndicator.show();

                var finlData = [];
                // var selectedItems = that.selectedChars;
                var selectedItems = that.byId("prodList").getSelectedItems();

                var checkedItems = that.getView().byId("prodList").getSelectedItems();

                // Collect data based on selected items
                if (selectedItems.length === 0) {
                    finlData = that.oListModel.oData.results;

                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("Successfully saved");
                    return;
                } else {
                    for (var i = 0; i < selectedItems.length; i++) {
                        let sChar = selectedItems[i].getCells()[0].getText(),
                            sClassName = selectedItems[i].getCells()[3].getText();
                        let aData = that.loadArray.filter(f => f.CHAR_NAME === sChar && f.CLASS_NAME === sClassName);
                        if (aData.length > 0) {
                            aData.forEach(el => {
                                let initData = {
                                    PRODUCT_ID: that.oItem,
                                    CHAR_NAME: el.CHAR_NAME,
                                    CHAR_DESC: el.CHAR_DESC,
                                    CHAR_VAL: el.CHAR_VALUE,
                                    CHARVAL_DESC: el.CHARVAL_DESC,
                                    CHAR_NUM: el.CHAR_NUM,
                                    CHARVAL_NUM: el.CHARVAL_NUM,
                                    CLASS_NAME: el.CLASS_NAME,
                                    CLASS_DESC: el.CLASS_DESC,
                                };
                                finlData.push(initData);
                            });
                        }
                    }
                }

                // Show a warning dialog if there are checked items
                if (checkedItems.length > 0) {
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
                                        that.byId("idSearch").setValue();
                                        that.byId("prodList").getBinding("items").filter([]);
                                        sap.ui.core.BusyIndicator.hide();
                                        MessageToast.show("Successfully saved");
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
                }

            },

            // previous working functionality
            // onGetData: function () {
            //     // var sLoc = that.byId("idloc").getValue(),
            //     var sProd = that.byId("idCommon").getValue();
            //     this.getView().byId("idPrimarySearch").setValue("");
            //     this.getView().byId("searchField").setValue("");
            //     // if (sLoc !== "" && sProd !== "") {
            //     if (sProd !== "") {
            //         sap.ui.core.BusyIndicator.show();
            //         this.getModel("BModel").callFunction("/getSecondaryChar", {
            //             method: "GET",
            //             urlParameters: {
            //                 FLAG: "G",
            //                 // LOCATION_ID: sLoc,
            //                 PRODUCT_ID: sProd
            //             },
            //             success: function (oData) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 that.oPList = that.byId("Primarytable"),
            //                     that.oSList = that.byId("Secondarytable");

            //                 that.primaryData = [],
            //                     that.secData = [];


            //                 for (var i = 0; i < oData.results.length; i++) {
            //                     if (oData.results[i].CHAR_TYPE === "P") {
            //                         that.primaryData.push(oData.results[i]);
            //                     } else {
            //                         that.secData.push(oData.results[i]);
            //                     }
            //                 }

            //                 that.finalpriData = [];
            //                 that.finalpriData = that.primaryData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


            //                 that.finalSecData = [];
            //                 that.finalSecData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


            //                 that.oGModel = that.getModel("oGModel");
            //                 if (that.finalSecData.length !== 0) {
            //                     that.oGModel.setProperty("/secSeqSt", that.finalSecData[0].SEQUENCE);
            //                 } else {
            //                     that.oGModel.setProperty("/secSeqSt", 0);
            //                 }
            //                 that.PrimarylistModel.setData({
            //                     results: that.finalpriData,
            //                 });
            //                 that.PrimarylistModel.setSizeLimit(5000);
            //                 that.oPList.setModel(that.PrimarylistModel);

            //                 that.SeclistModel.setData({
            //                     results: that.finalSecData,
            //                 });
            //                 that.SeclistModel.setSizeLimit(5000);
            //                 that.oSList.setModel(new sap.ui.model.json.JSONModel())
            //                 that.oSList.setModel(that.SeclistModel);

            //                 that.searchlist = that.finalSecData;


            //                 that.searchlist.forEach(function (row) {
            //                     row.Char = row.CHAR_NAME + " - " + row.CHAR_DESC;
            //                 }, that);

            //                 that.SearchModel.setData({
            //                     results: that.searchlist,
            //                 });
            //                 that.byId("searchField").setModel(that.SearchModel);

            //                 var aData = that.oSList.getItems();
            //                 if (that.oSelectedItem) {
            //                     for (var i = 0; i < aData.length; i++) {
            //                         if (that.oSelectedItem === aData[i].getCells()[1].getText()) {
            //                             aData[i].focus();
            //                             aData[i].setSelected(true);
            //                         }
            //                     }
            //                 }
            //             },
            //             error: function (oData, error) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("error");
            //             },
            //         });

            //     } else {
            //         MessageToast.show("Please select a Product");
            //     }
            // },

            // Partial Product Characteristics app when click on go, this below function work
            onGetData3: function () {
                // that.getEnable();
                that.oGModel.setProperty("/flag", "");
                that.skip = 0;
                that.byId("idSearch").setValue();
                var selectedItem = that.byId("idCommon").getValue();
                if (selectedItem !== "") {
                    sap.ui.core.BusyIndicator.show();

                    that.byId("idSaveBtn").setEnabled(true);

                    that.byId("idSearch").setValue("");
                    //   that.byId("prodList").removeSelections();
                    sap.ui.core.BusyIndicator.show();
                    that.loadArray = [];
                    var data = {
                        PRODUCT_ID: selectedItem
                    }, finalData = [];
                    finalData.push(data);
                    this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                        method: "GET",
                        urlParameters: {
                            Flag: "X",
                            PRODATA: JSON.stringify(finalData)
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            if (oData.results.length === 0) {
                                MessageToast.show("No characteristics available for the selected product");
                            }
                            else {
                                that.loadArray = oData.results;
                                that.productChar = oData.results;
                                that.AvailChars = removeDuplicate(that.productChar, 'CHAR_NAME');
                                that.oListModel.setData({ results: that.AvailChars });
                                that.byId("prodList").setModel(that.oListModel);
                                function removeDuplicate(array, key) {
                                    var check = new Set();
                                    return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                                }
                                that.loadData1(0, 5000);
                            }
                            // that.byId("idCommon").setValue("");
                            var selectedItems = []
                            that.SeclistModel.setData({
                                results2: selectedItems,
                            });
                            that.SeclistModel.setSizeLimit(5000);
                            that.byId("Secondarytable2").setModel(that.SeclistModel);
                            that.loadData();
                        },
                        error: function (error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        },
                    });
                }
                else {
                    that.byId("idSaveBtn").setEnabled(true);
                    MessageToast.show("Please select a product");
                }
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


            // handleShowSelect: function (oEvent) {
            //     var toolbar = oEvent.getSource();
            //     if (toolbar.getText() === "Show Selected") {
            //         manageTableData(toolbar, toolbar.getText());
            //         toolbar.setText("Show All");
            //     } else {
            //         manageTableData(toolbar, toolbar.getText());
            //         toolbar.setText("Show Selected");
            //     }

            //     function manageTableData(params, key) {
            //         var table = that.byId("prodList")//params.getParent().getParent();
            //         var items = table.getSelectedItems()  //getItems(); // Get all items in the table
            //         if (key === "Show Selected") {
            //             // Filter items to show only selected
            //             items.forEach(function (item) {
            //                 if (!item.isSelected()) {
            //                     item.setVisible(false); // Hide unselected items
            //                 } else {
            //                     item.setVisible(true); // Show selected items
            //                 }
            //             });
            //         } else {
            //             // Show all items
            //             items.forEach(function (item) {
            //                 item.setVisible(true); // Show all items
            //             });
            //         }
            //     }
            // },

            //IBP Attributes app when click on go, this below function work
            onGetData2: async function () {
                that.oPList = that.byId("Primarytable2");
                that.oSList = that.byId("Secondarytable2");
                var sProd = that.byId("idCommon").getValue();
                var sData = await that.loadSelectedData();
                if (sProd !== "") {
                    sap.ui.core.BusyIndicator.show();
                    this.getModel("BModel").callFunction("/getPrimaryCharIBP", {
                        method: "GET",
                        urlParameters: {
                            FLAG: "G",
                            PRODUCT_ID: sProd
                        },
                        success: function (oData) {
                            sap.ui.core.BusyIndicator.hide();
                            var data = oData.results;
                            if (sData && sData.length > 0) {
                                var selectedData = [];
                                sData.forEach(el => {
                                    for (let index = 0; index < data.length; index++) {
                                        const item = data[index];
                                        if (item.PRODUCT_ID == el.PRODUCT_ID && item.CHAR_NUM == el.CHAR_NUM && item.CHAR_NAME == el.CHAR_NAME) {
                                            selectedData.push(item)
                                        }
                                    }
                                });

                                that.seqData = []
                                that.scendseqData = []
                                that.priData = selectedData.filter(el => el.CHAR_TYPE == "P");

                                that.seqData = that.priData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);

                                that.secData = selectedData.filter(el => el.CHAR_TYPE == "S");

                                that.scendseqData = that.secData.sort((a, b) => a.SEQUENCE - b.SEQUENCE);


                                that.oGModel = that.getModel("oGModel");
                                if (that.scendseqData.length !== 0) {
                                    that.oGModel.setProperty("/secSeqSt", that.scendseqData[0].SEQUENCE);
                                } else {
                                    that.oGModel.setProperty("/secSeqSt", 0);
                                }


                                that.PrimarylistModel.setData({
                                    results2: that.priData,
                                });
                                that.PrimarylistModel.setSizeLimit(5000);
                                that.oPList.setModel(that.PrimarylistModel);
                                that.SeclistModel.setData({
                                    results2: that.secData,
                                });
                                that.SeclistModel.setSizeLimit(5000);
                                that.oSList.setModel(that.SeclistModel);
                            } else {
                                that.priData = data.filter(el => el.CHAR_TYPE == "P");
                                that.secData = data.filter(el => el.CHAR_TYPE == "S");
                                that.PrimarylistModel.setData({
                                    results2: that.priData
                                });
                                that.PrimarylistModel.setSizeLimit(5000);
                                that.oPList.setModel(that.PrimarylistModel);
                                that.SeclistModel.setData({
                                    results2: that.secData
                                });
                                that.SeclistModel.setSizeLimit(5000);
                                that.oSList.setModel(that.SeclistModel);
                            }
                        },
                        error: function (error) {
                            sap.ui.core.BusyIndicator.hide();
                            MessageToast.show("error");
                        }
                    });
                } else {
                    MessageToast.show("Please select Product");
                }
            },

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
                if (that.byId("searchField2").getValue() !== "") {

                    var obj = that.byId("Secondarytable2").getItems()
                    for (var i = 0; i < obj.length; i++) {
                        results2.push(obj[i].getBindingContext().getObject())
                    }
                }

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
            onSave1: function () {
                var finlData = [], initData = {};
                initData = {
                    PRODUCT_ID: "AS_A61A",
                }
                finlData.push(initData);
                this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "C",
                        PRODATA: JSON.stringify(finlData)
                    },
                    success: function (oData) {
                        that.byId("idSearch").setValue();
                        that.byId("prodList").getBinding("items").filter([]);
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Successfully saved");
                        that.onGetData3();
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
            },
            loadData: function (skip, top) {
                var initData1 = {}, finlData1 = [];
                initData1 = {
                    PRODUCT_ID: that.oItem
                };
                finlData1.push(initData1)
                this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "Y",
                        PRODATA: JSON.stringify(finlData1)
                    },
                    success: function (oData) {
                        that.selectedChars = [];
                        if (oData.results.length === 0) {
                        } else {
                            that.selectedChars = oData.results;
                            let aDistinct = that.removeDuplicate(that.selectedChars, 'CHAR_NAME');
                            var tableData = that.byId("prodList").getItems();
                            if (that.oGModel3.getProperty("/flag") !== "X") {
                                for (var i = 0; i < tableData.length; i++) {
                                    for (var k = 0; k < aDistinct.length; k++) {
                                        if (tableData[i].getBindingContext().getProperty().PRODUCT_ID === aDistinct[k].PRODUCT_ID
                                            && tableData[i].getBindingContext().getProperty().CHAR_NAME === aDistinct[k].CHAR_NAME
                                            && tableData[i].getBindingContext().getProperty().CHAR_VALUE === aDistinct[k].CHAR_VALUE
                                            && tableData[i].getBindingContext().getProperty().CLASS_NAME === aDistinct[k].CLASS_NAME) {
                                            tableData[i].setSelected(true);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this),
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Failed to get data");
                    }
                });
            },
            loadData1: function () {
                that.data = []
                var topCount = 1000;
                this.getOwnerComponent().getModel("BModel").read("/getProducts", {
                    method: "GET",
                    urlParameters: {
                        "$skip": that.skip,
                        "$top": topCount
                    },
                    success: function (oData) {
                        if (topCount == oData.results.length) {
                            that.skip += topCount;
                            that.data = that.data.concat(oData.results);
                            that.loadData1();
                        } else {
                            that.skip = 0;
                            that.data = that.data.concat(oData.results);
                            if (oData.results.length > 0) {
                                sap.ui.core.BusyIndicator.hide();
                                that.data = oData.results;
                                let aProds = removeDuplicate(oData.results, 'PRODUCT_ID');
                                that.prodModel1.setData({
                                    aResults3: aProds,
                                });
                                that.oProdList1.setModel(that.prodModel1);

                                function removeDuplicate(array, key) {
                                    var check = new Set();
                                    return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
                                }
                            } else {
                                MessageToast.show("No Data Found");
                            }
                        }
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });
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
                            that.byId("idSearch").setValue();
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
                            var sProd = that.byId("prodInput2").getValue();
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
                                            results: that.primaryData,
                                        });
                                        that.PrimarylistModel.setSizeLimit(5000);
                                        that.oPList.setModel(that.PrimarylistModel);

                                        that.SeclistModel.setData({
                                            results: that.finalSecData,
                                        });
                                        that.SeclistModel.setSizeLimit(5000);
                                        that.oSList.setModel(that.SeclistModel);

                                        that.searchlist = that.SeclistModel;


                                        that.searchlist.forEach(function (row) {

                                            row.CHAR_NAME = row.CHAR_NAME + " - " + row.CHAR_DESC;

                                        }, that);


                                        that.byId("searchField2").setModel(that.SeclistModel);

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
                    oEntry.product = that.byId("prodInput2").getValue();
                    oEntry.CharNo = aData[i].getCells()[0].getText();
                    // oEntry.charName = aData[i].getCells()[1].getText();
                    oEntry.SEQUENCE = i + 1;
                    oEntry.FLAG = "E";
                    oEntry.CHAR_TYPE = "P";

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
                                that.byId("searchField2").setValue("");
                                that.onCharSearch();
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
                var sProd = that.byId("prodInput2").getValue();

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
                        aResults2 = oData.results;
                        // var  aResults4 = [{
                        //     "CREATE_CHK": "disabled",
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
                            // if(aResults2[0].UPDATE_CHK == "disabled"){
                            //     that.byId("idUpdate").setEnabled(false);
                            // }
                        }
                        else {
                            that.byId("idReset3").setEnabled(false);
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
                that.byId("idSearch").setValue();
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

            onSearch: function (oEvent) {
                var sQuery = that.byId("idSearch").getValue(),
                    oFilters = [];
                sQuery = sQuery ? sQuery.trim() : "";
                var tableLength = that.byId("idCommon").getValue();
                // if(tableLength !==""){
                if (sQuery !== "") {
                    that.oGModel.setProperty("/flag", "X");
                    oFilters.push(
                        new Filter({
                            filters: [
                                new Filter("CHAR_NAME", FilterOperator.Contains, sQuery),
                                new Filter("CHAR_DESC", FilterOperator.Contains, sQuery)
                            ],
                            and: false,
                        })
                    );
                }
                that.byId("prodList").getBinding("items").filter(oFilters);
                // }
                // else{
                //     sap.m.MessageToast.show("Please select a product");
                // }  
            },

            onResetPress: function () {
                if (that.sKey === "PartialProducts") {
                    that.loadArray = [];
                    that.byId("prodList").removeSelections();
                    that.byId("idSearch").setValue("");
                    that.byId("idCommon").setValue("");
                    that.oListModel.setData({ results: [] });
                    that.byId("prodList").setModel(that.oListModel);
                    that.byId("idSaveBtn").setEnabled(true);
                }
                else if (that.sKey === "ClassIBP" || that.sKey === "") {
                    that.onClearReset();

                }
            },


            // onSaveChar: function () {
            //     that.getEnable();
            //     sap.ui.core.BusyIndicator.show();
            //     var finlData = [];
            //     var selectedItems = that.selectedChars;
            //     var checkedItems = that.getView().byId("prodList").getSelectedItems();
            //     // var checkedItems = selectedItems.filter(function(item) {
            //     //     return item.getBindingContext().getProperty("checked") === true; // Assuming 'checked' is a property
            //     // });




            //     if(selectedItems.length == 0){
            //         finlData = that.oListModel.oData.results;
            //         MessageToast.show("Successfully saved");
            //     }


            //     if (selectedItems.length > 0) {
            //         var initData = {};
            //         for (var i = 0; i < selectedItems.length; i++) {
            //             //Get all char values of selected CHAR_NAME and CLASS_NAME
            //             let sChar = selectedItems[i].CHAR_NAME,
            //                 sClassName = selectedItems[i].CLASS_NAME;
            //             let aData = that.loadArray.filter(f => f.CHAR_NAME == sChar && f.CLASS_NAME == sClassName);
            //             if (aData.length > 0) {
            //                 aData.forEach(el => {
            //                     initData = {
            //                         PRODUCT_ID: that.oItem,
            //                         CHAR_NAME: el.CHAR_NAME,
            //                         CHAR_DESC: el.CHAR_DESC,
            //                         CHAR_VAL: el.CHAR_VALUE,
            //                         CHARVAL_DESC: el.CHARVAL_DESC,
            //                         CHAR_NUM: el.CHAR_NUM,
            //                         CHARVAL_NUM: el.CHARVAL_NUM,
            //                         CLASS_NAME: el.CLASS_NAME,
            //                         CLASS_DESC: el.CLASS_DESC,
            //                     }
            //                     finlData.push(initData);
            //                 });
            //             }

            //         }}

            //         this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
            //             method: "GET",
            //             urlParameters: {
            //                 Flag: "C",
            //                 PRODATA: JSON.stringify(finlData)
            //             },
            //             success: function (oData) {
            //                 that.byId("idSearch").setValue();
            //                 that.byId("prodList").getBinding("items").filter([]);
            //                 sap.ui.core.BusyIndicator.hide();
            //                 if (checkedItems.length >= 0) {
            //                     sap.m.MessageBox.warning("Active Planning Details exist. Would you like to continue?", {
            //                         title: "Warning",
            //                         actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
            //                         onClose: function (oAction) {
            //                             if (oAction === sap.m.MessageBox.Action.YES) {
            //                                 MessageToast.show("Successfully saved");

            //                             } else if (oAction === sap.m.MessageBox.Action.NO) {


            //                             }
            //                         }
            //                     });
            //                 }

            //                 that.onGetData3();
            //             },
            //             error: function (error) {
            //                 sap.ui.core.BusyIndicator.hide();
            //                 MessageToast.show("error");
            //             },
            //         });


            // else {
            //     sap.ui.core.BusyIndicator.hide();
            //     // MessageToast.show("Please select atleast one row");
            // }
            // },



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
                        this.loadData(iTotalRows, 1000); // Load the next 100 records
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

            // onTabSelect: function () {
            //     // if(Partial == "Partial"){
            //     //     that.onGetData3()
            //     // }

            //     // var ProdId1 = that.byId("idCommon").getValue();
            //     // var ProdId2 = that.byId("prodInput2").getValue();
            //     // var ProdId3 = that.byId("idCommon").getValue();
            //     // var ProdKey = that.byId("idIconTabBarFiori2").getSelectedKey()
            //     // var oModel = new sap.ui.model.json.JSONModel();
            //     // var Prod2Key = that.byId("idIconTabBarFiori2").getSelectedKey()

            //     // if (Partial == "info") {
            //     //     that.onGetData();
            //     // }
            //     // if (ProdId2 != "" && ProdKey == "notes") {
            //     //     that.onGetData2();
            //     // }
            //     // that.byId("idCommon").setValue("");
            //     // that.byId("Secondarytable").setModel(oModel);
            //     // that.byId("prodInput2").setValue("");
            //     // that.byId("Primarytable").setModel(oModel);
            //     // // that.byId("idCommon").setValue("");
            //     // that.byId("prodList").setModel(oModel);
            //     // that.byId("Primarytable2").setModel(oModel);
            //     // that.byId("Secondarytable2").setModel(oModel);
            // },

            onSaveChardup: function () {
                that.getEnable();
                sap.ui.core.BusyIndicator.show();
                var finlData = [];
                var selectedItems = that.selectedChars;
                // if(selectedItems.length == 0){
                //     finlData = that.oListModel.oData.results;
                //     MessageToast.show("Successfully saved");
                // }
                if (selectedItems.length > 0) {
                    var initData = {};
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
                }
                this.getOwnerComponent().getModel("BModel").callFunction("/getProductCharVal", {
                    method: "GET",
                    urlParameters: {
                        Flag: "C",
                        PRODATA: JSON.stringify(finlData)
                    },
                    success: function (oData) {
                        that.byId("idSearch").setValue();
                        that.byId("prodList").getBinding("items").filter([]);
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Successfully saved");
                        that.onGetData3();
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("error");
                    },
                });

                // else {
                //     sap.ui.core.BusyIndicator.hide();
                //     // MessageToast.show("Please select atleast one row");
                // }
            },

            removeDuplicateforProdClas: function (array, key) {
                var check = new Set();
                return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
            },

            ValueHelpForProdClas: function () {
                this.valueHelpClasProdDialog.open()
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
                    }else{
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
                that.byId("classList").getBinding("items").filter([])
                // var oFilters = []
                // sap.ui.getCore().byId("idClasProd").getBinding("items").filter([]);
                var oEv = oEvent.getSource()
                var oItem = oEvent.getParameters().selectedItem.getTitle()
                that.byId("idCommon").setValue(oItem)
                that.getOwnerComponent().getModel("BModel").read("/getIBPProdClass", {
                    filters: [
                        new Filter("PRODUCT_ID", FilterOperator.EQ, oItem)
                    ],
                    success: function (oData) {
                        oData.results = that.removeDuplicateforProdClas(oData.results, "CLASS_NAME")
                        that.oModel.setData({
                            results: oData.results,
                        });
                        var temp = JSON.stringify(oData.results)
                        that.clsResults = JSON.parse(temp);
                        that.byId("classList").setModel(that.oModel);
                    },
                    error: function (oData, error) {
                        console.log(error)
                    },
                });
            },

            loadIbp: function (oEvent) {

                var oItem = that.byId("idCommon").getValue(),
                    oFilters = [];
                if (oItem) {
                    var filter = new Filter("PRODUCT_ID", FilterOperator.EQ, oItem);
                    oFilters.push(filter);
                }

                that.getOwnerComponent().getModel("BModel").read("/getIBPProdClass", {
                    filters: oFilters,
                    success: function (oData) {
                        oData.results = that.removeDuplicateforProdClas(oData.results, "CLASS_NAME")
                        that.oModel.setData({
                            results: oData.results,
                        });
                        var temp = JSON.stringify(oData.results)
                        that.clsResults = JSON.parse(temp);
                        that.byId("classList").setModel(that.oModel);
                    },
                    error: function (oData, error) {
                        console.log(error)
                    },
                });
            },







            // oCharPrioritizDownload:function(){
            //     var oPrimarytable = that.byId("Primarytable").getModel().getData().results,
            //      oSecondarytable = that.byId("Primarytable").getModel().getData().results

            //     // Assuming `data` is your original data array
            //     var transformedData = oTableData.map(item => {
            //         return {
            //             CLASS_NAME: item.CLASS_NAME,
            //             CLASS_DESC: item.CLASS_DESC,
            //             CLASS_TYPE: item.CLASS_TYPE,
            //             CLASS_NUM: item.CLASS_NUM,
            //             IBPCHAR_CHK: item.IBPCHAR_CHK
            //             // IBPCHAR_CHK: item.IBPCHAR_CHK ? 'X' : ''
            //         };
            //     });

            //     // Now, define the export function using sap.ui.export.Spreadsheet
            //     var exportToExcel = function () {
            //         var aCols = [
            //             { label: 'CLASS_NAME', property: 'CLASS_NAME', width: 30 },
            //             { label: 'CLASS_DESC', property: 'CLASS_DESC', width: 30 },
            //             { label: 'CLASS_TYPE', property: 'CLASS_TYPE', width: 30 }
            //         ];
            //         var oSettings = {
            //             workbook: {
            //                 columns: aCols,

            //             },
            //             dataSource: transformedData,
            //             fileName: 'Class IBP Characteriestics.xlsx',
            //             worker: true
            //         };

            //         var oSheet = new sap.ui.export.Spreadsheet(oSettings);
            //         oSheet.build().then(function () {
            //             sap.m.MessageToast.show('Export complete');
            //         }).finally(function () {
            //             oSheet.destroy();
            //         });
            //     };

            //     // Call the export function to download the Excel file
            //     exportToExcel();
            // },

            //Class IBP Characteristics downloading data
            oDownloadClassesData: function () {
                var oTableData = that.byId("classList").getModel().getData().results

                // Assuming `data` is your original data array
                var transformedData = oTableData.map(item => {
                    return {
                        CLASS_NAME: item.CLASS_NAME,
                        CLASS_DESC: item.CLASS_DESC,
                        CLASS_TYPE: item.CLASS_TYPE,
                        CLASS_NUM: item.CLASS_NUM,
                        IBPCHAR_CHK: item.IBPCHAR_CHK
                        // IBPCHAR_CHK: item.IBPCHAR_CHK ? 'X' : ''
                    };
                });

                // Now, define the export function using sap.ui.export.Spreadsheet
                var exportToExcel = function () {
                    var aCols = [
                        { label: 'CLASS_NAME', property: 'CLASS_NAME', width: 30 },
                        { label: 'CLASS_DESC', property: 'CLASS_DESC', width: 30 },
                        { label: 'CLASS_TYPE', property: 'CLASS_TYPE', width: 30 },
                        { label: 'CLASS_NUM', property: 'CLASS_NUM', width: 30 },
                        { label: 'IBPCHAR_CHK', property: 'IBPCHAR_CHK', width: 30 }
                    ];

                    var oSettings = {
                        workbook: {
                            columns: aCols,

                        },
                        dataSource: transformedData,
                        fileName: 'Class IBP Characteriestics.xlsx',
                        worker: true
                    };

                    var oSheet = new sap.ui.export.Spreadsheet(oSettings);
                    oSheet.build().then(function () {
                        sap.m.MessageToast.show('Export complete');
                    }).finally(function () {
                        oSheet.destroy();
                    });
                };

                // Call the export function to download the Excel file
                exportToExcel();

            },


            uploadData: function (oEvent) {
                var oFileUploader = oEvent.getSource();
                var oFile = oEvent.getParameter("files")[0];

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
                that.onExcelUpdate();

            },

            // for excel uploading
            onExcelUpdate: function () {
                var oEntry = {
                    CLASSDATA: [],
                };
                var vRuleslist;

                var aClassData = this.oUploadclassData;

                for (var i = 0; i < aClassData.length; i++) {
                    let vIbpCheck = '';
                    var sIBPCHAR_CHK = aClassData[i].IBPCHAR_CHK;

                    // Validate that the IBPCHAR_CHK value is either "true" or "false"
                    if (sIBPCHAR_CHK.toLowerCase() !== "true" && sIBPCHAR_CHK.toLowerCase() !== "false") {
                        // If invalid, show an error message and stop the process
                        sap.m.MessageToast.show("Invalid value for IBPCHAR_CHK at row " + (i + 1) + ". Allowed strings are 'true' or 'false'.");
                        return;  // Stop further execution if invalid data is found
                    }

                    // Convert the valid 'true' or 'false' string to 'X' or empty string
                    vIbpCheck = (sIBPCHAR_CHK.toLowerCase() === "true") ? 'X' : '';

                    // Add the processed data to the update list
                    vRuleslist = {
                        CLASS_NUM: aClassData[i].CLASS_NUM,
                        IBPCHAR_CHK: vIbpCheck
                    };

                    // Push the formatted object to the update list
                    oEntry.CLASSDATA.push(vRuleslist);
                }

                // Show a confirmation dialog before making the service call
                sap.m.MessageBox.confirm(
                    "Are you sure you want to update the IBP Class?", {
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.YES) {
                            // If the user confirms, show a busy indicator and call the update function
                            sap.ui.core.BusyIndicator.show();

                            // Trigger the function to update data
                            this.getModel("BModel").callFunction("/updateIBPClass", {
                                method: "GET",
                                urlParameters: {
                                    CLASSDATA: JSON.stringify(oEntry.CLASSDATA)  // Pass the formatted data
                                },
                                success: function (oData) {
                                    // Hide the busy indicator and show a success message
                                    sap.ui.core.BusyIndicator.hide();
                                    that.onAfterRendering();
                                    sap.m.MessageToast.show("Updated Successfully");
                                },
                                error: function (error) {
                                    // Hide the busy indicator and show an error message if the update fails
                                    sap.ui.core.BusyIndicator.hide();
                                    sap.m.MessageToast.show("Update Failed");
                                }
                            });
                        }
                    }.bind(this) // Ensure the context is bound to 'this'
                });
            },


            // table level updating
            onClassUpdate: function () {
                var oEntry = {
                    CLASSDATA: [],
                },
                    vRuleslist;
                var aClassData = that.byId("classList").getItems();
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

                that.getModel("BModel").callFunction("/updateIBPClass", {
                    method: "GET",
                    urlParameters: {
                        CLASSDATA: JSON.stringify(oEntry.CLASSDATA)
                    },
                    success: function (oData) {

                        if (oData.updateIBPClass === "ERROR") {
                            MessageToast.show("Selected Product Characteristics Already Exist in Secondary")

                            that.onAfterRendering();
                            that.loadIbp()

                        }
                        else {
                            sap.m.MessageToast.show("Updated Successfully");

                            that.onAfterRendering();
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


            onClearReset: function () {
                that.byId("idCommon").setValue("");
                that.byId("classSearch").setValue("")
                this.getModel("BModel").read("/getClass ", {
                    success: function (oData) {
                        that.oModel.setData({
                            results: oData.results,
                        });
                        that.byId("classList").setModel(that.oModel);
                        sap.ui.core.BusyIndicator.hide();
                    },
                    error: function () {
                        MessageToast.show("Failed to get data");
                    },
                });
            },


        });
    });
