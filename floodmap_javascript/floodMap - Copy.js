var map, veTileLayer, parishLayersDetails, url, seclusionTaskUrl, loading;
var BingMaps;
var layer;
var info = [];
var d;
var points = [];
var date_urls = [];
var layerData = [];
require(["esri/map", "esri/virtualearth/VETiledLayer", "dojo/dom", "esri/tasks/query", "esri/tasks/QueryTask", "dojo/on", "dijit/form/HorizontalSlider", "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "esri/dijit/InfoWindow", "esri/geometry/Point", "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleLineSymbol",
         "esri/Color", "esri/InfoTemplate", "esri/graphic", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "esri/geometry/webMercatorUtils", "esri/dijit/Search", "dojo/domReady!"
], function (Map, VETiledLayer, dom, Query, QueryTask, on, HorizontalSlider, IdentifyTask, IdentifyParameters, InfoWindow, Point, PictureMarkerSymbol, SimpleLineSymbol, Color, InfoTemplate, Graphic, ArcGISDynamicMapServiceLayer, FeatureLayer, GraphicsLayer, webMercatorUtils,Search) {
    map = new Map("mapDiv", {
        center: [-90, 30.75],
        zoom: 9,
        basemap: "topo",
        spatialReference: { "wkid": 102100 }
    });
	var search = new Search({
            map: map
         }, "txtAddress");
         search.startup();
    BingMaps = VETiledLayer;
    veTileLayer = new VETiledLayer({
        bingMapsKey: 'AlxmW2CNBpgf0s_8jyZw5my77_BEqsB4znzcaSbZI6YPqyKseZ5U4yXBEnV7KY7c',
        mapStyle: VETiledLayer.MAP_STYLE_ROAD
    });
    map.addLayer(veTileLayer);
    var query = new Query();
    var queryTask = new QueryTask("http://terra2.agcenter.lsu.edu/arcgis/rest/services/DEV/BaseServices/MapServer/0");
    query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
    query.where = "1=1";
    query.outFields = ["*"];
    query.returnGeometry = true;
    query.orderByFields = ["PARISH"];
    queryTask.execute(query);
    queryTask.on("complete", getParish);
    queryTask.on("error", parishError);

    function getParish(p) {
        parishLayersDetails = p.featureSet.features;
        $.each(parishLayersDetails, function (key, value) {
            $('#parishes')
                .append($("<option></option>")
                           .attr("value", key)
                           .text(value.attributes.PARISH));
        });
    }

    function parishError(error) {
        alert(error);
    }

    $('#parishes').change(function () {
        showLoading("Loading Maps...");
        reloadFIPS($('#parishes').val());
    });

    function reloadFIPS(p) {        
        $(".floodmap_searchclose").click();
        var ext = parishLayersDetails[p].geometry;
        map.setExtent(ext.getExtent(), true);
        if (parishLayersDetails[p].attributes.DFIRM_URL != "") {
            url = parishLayersDetails[p].attributes.DFIRM_URL;
            addLayer(url);
        }        
    }

    var click = false;

    function changeopacity(val, v) {
        var a = val.split("_");
        a = parseInt(a[1]) + 1;
        var o = v / 10;
        var layer = map.getLayer(map.layerIds[a]);
        layer.setOpacity(o);
    }

    map.on("click", excuteIdentify);
    map.on("update-start", function(){
        showLoading("Loading")
    });
    /*map.on("zoom", showLoading("Loading"));*/
    map.on("update-end", hideLoading);

    function excuteIdentify(evt) {        
        var identifyParams = new IdentifyParameters();
        var identify = new IdentifyTask(url);
        map.graphics.on("click", function (e) {
            click = true;
        });
        var mapClick = evt.mapPoint;
        if (!click) {
            showLoading("Getting Layer information");
            var json = new Object();
            identifyParams.geometry = evt.mapPoint;
            identifyParams.mapExtent = map.extent;
            identifyParams.tolerance = 0;
            identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.returnGeometry = true;
            identify.execute(identifyParams, compl);
            function compl(e) {
                var cont = [];
                for (var i = 0 ; i < layerData.length ; i++) {
                    for (var j = 0 ; j < e.length; j++) {
                        if (layerData[i].Id < e[j].layerId) {
                            if (!isValid(cont[i])) {
                                cont[i] = {};
                            }
                            if (e[j].displayFieldName == 'FLD_AR_ID' || e[j].displayFieldName == 'Fld_Ar_ID') {
                                if (!isValid(cont[i].zone)) {
                                    cont[i].zone = e[j].feature.attributes.FLD_ZONE;
                                    if (e[j].feature.attributes.STATIC_BFE != "-9999") {
                                        cont[i].zone += " ,EL = " + e[j].feature.attributes.STATIC_BFE;
                                    }
                                }
                            }
                            if (e[j].displayFieldName == "FIRM_ID" || e[j].displayFieldName == "Firm_ID") {
                                if (!isValid(cont[i].panel)) {
                                    cont[i].panel = e[j].feature.attributes.FIRM_PAN;
                                    cont[i].date = e[j].feature.attributes.EFF_DATE;
                                }
                            }
                        }
                    }
                    try {
                        if (!isValid(cont[i].panel)) {
                            cont[i].panel = "No Digital data."
                        }
                        if (!isValid(cont[i].zone)) {
                            cont[i].zone = "Read from map."
                        }
                    }
                    catch (ex) { }
                    if (e[i].layerName == "S_Seclusion_Ar") {
                        json.secl = true;
                    }
                }
                json.cont = cont;
                var s_elev = getElevation(mapClick, json);
                var s_cid = getCIDInfo(mapClick, json);
                var s_wind = getBasicWindSpeed(mapClick, json);
                $.when(s_wind, s_cid, s_elev).then(function () {
                    var length = map.graphics.graphics.length;
                    var attr = { "ID": length, "Information": cont };
                    var sms = new esri.symbol.PictureMarkerSymbol('images/pin8.png', 48, 48);
                    sms.setOffset(0, 20);
                    var infotemp = new InfoTemplate("Point", getInfoContent(mapClick, json));
                    var graphic = new Graphic(evt.mapPoint, sms, attr, infotemp);
                    map.graphics.add(graphic);
                    hideLoading();
                });		
            }
        }
        else {
            click = false;
        }  
    }

    function getParent(i) {
        if (d.layers[i].parentLayer != null) {
            var id = d.layers[i].parentLayer.id;
            id = getParent(id);
            return id;
        }
        else {
            return i;
        }
    }

    function addLayer(url) {        
        $('#layersContainer').empty();
        $.getJSON(url + "/layers?f=pjson").done(function (dat) {
            d = dat;
            info = [];
            var total = map.layerIds.length;
            var layerIds = JSON.stringify(map.layerIds);
            for (var i = 0 ; i < total  ; i++) {
                var ids = JSON.parse(layerIds);
                if (ids[i] != "layer0" && ids[i] != "layer1") {
                    map.removeLayer(map.getLayer(ids[i]));
                }
            }
            var types = [];
            if (dat.layers.length) {
                for (var i = 0 ; i < dat.layers.length; i++) {
                    if (dat.layers[i].parentLayer == null) {
                        types.push(i);
                        var subLayers = dat.layers[i].subLayers;
                        for (var k = 0 ; k < 1; k++) {
                            var layer_date = subLayers[k].name.split("|");
                            var count = layer_date.length;
                            layerData.push({ "Name": dat.layers[i].name, "Date": layer_date[count - 1], "Id": i });
                        }
                    }
                }
            }
            for (var i = 0; i < types.length; i++) {
                for (var j = 0 ; j < dat.layers[types[i] + 1].subLayers.length; j++) {
                    if (dat.layers[types[i] + 1].subLayers[j].name == "s_firm_pan" || dat.layers[types[i] + 1].subLayers[j].name == "S_FIRM_PAN") {
                        var lyr = { name: dat.layers[types[i] + 1].name, id: dat.layers[types[i] + 1].subLayers[j].id }
                        date_urls.push(lyr);
                    }
                }
            }
            map.graphics.clear();
            var count = 0;
            for (var i = d.layers.length - 1 ; i >= 0; i--) {
                if (d.layers[i].parentLayer == null && d.layers[i].subLayers.length > 0) {
                    info.push(i);
                    count++;
                    var visible = [];
                    for (var j = i ; j < d.layers.length; j++) {
                        if (d.layers[j].defaultVisibility && (d.layers[j].subLayers.length <= 0)) {
                            visible.push(j);

                        }
                        if ((j != i) && (d.layers[j].parentLayer == null))
                            break;
                    }
                    var checked = "checked";
                    var l = new ArcGISDynamicMapServiceLayer(url);
                    l.setVisibleLayers(visible);
                    l.setOpacity(0.5);
                    map.addLayer(l);
                    if (i != 0) {
                        l.hide();
                        checked = "";
                    }
                    var subLayers = "";
                    if (d.layers[i].subLayers.length > 0) {
                        subLayers += "<ul>";
                        for (var k = 0 ; k < d.layers[i].subLayers.length ; k++) {
                            subLayers += '<li><input type="checkbox" ' + checked + ' class="sublayer sublayer_' + count + ' css-checkbox lrg" value="' + count + '_' + d.layers[i].subLayers[k].id + '"  /><label class="sublayer css-label lrg web-two-style">' + d.layers[i].subLayers[k].name + '</label></li>';
                        }
                        subLayers += "</ul>";
                    }
                    var date = new Date();
                    var id = date.getTime().toString();
                    /*       var string = '<div class="checkbox"><label><input type="checkbox" ' + checked + ' class="layer" value="' + count + '" />' + d.layers[i].name + '</label>' + subLayers + '</div>';
                           string += '<div class="row"><div class="col-lg-12"><div id="' + id + '"></div></div></div>'; */
                    var slider = '<div style="width:100%"><input name="slide_' + count + '" type="text" id="' + id + '" value="" data-slider-min="0" data-slider-max="10" data-slider-step="1" data-slider-value="5" data-slider-orientation="horizontal" data-slider-selection="after" data-slider-tooltip="hide"></div>';
                    var string = '<div class="layerFIRM"><div class="icon-question layerQuestion">?</div><input type="checkbox" ' + checked + ' class="layers css-checkbox lrg" value="' + count + '" /><label class="layer css-label lrg web-two-style">' + d.layers[i].name + '</label><div class="subdiv">' + subLayers + '</div>' + slider + '</div>';
                    $('#layersContainer').prepend(string);                   
                /*    var slider = new HorizontalSlider({
                        name: "slide_" + count,
                        value: 5,
                        minimum: 0,
                        maximum: 10,
                        intermediateChanges: true,
                        discreteValues: 11,
                        showButtons: true,
                        style: "width:100%;",
                        onChange: function (value) {
                            changeopacity(this.name, value);
                        }
                    }, id).startup(); */
                    $('#' + id).slider().on('slide', function (ev) {
                        var name = $(this).attr('name');
                        changeopacity(name, ev.value);
                    });
                } 
            }
            $('.sublayer.css-label').click(function () {
                var check = $(this).parent().find(".sublayer")[0];
                var val = (check.value).split("_");
                var ret = check.checked;
                check.checked = !ret;
                var layer = map.getLayer(map.layerIds[parseInt(val[0]) + 1]);
                var visible = layer.visibleLayers;
                var data = d.layers[parseInt(val[1])].subLayers;
                var lid = [];
                for (var i = 0 ; i < data.length ; i++) {
                    if (d.layers[data[i].id].defaultVisibility && (d.layers[data[i].id].subLayers.length <= 0)) {
                        lid.push(data[i].id);
                    }
                }
                if (!ret) {
                    for (var i = 0 ; i < lid.length ; i++) {
                        if (visible.indexOf(parseInt(lid[i])) < 0)
                            visible.push(parseInt(lid[i]));
                    }
                }
                else {
                    for (var i = 0 ; i < lid.length ; i++) {
                        if (visible.indexOf(parseInt(lid[i])) >= 0)
                            visible.splice(visible.indexOf(parseInt(lid[i])), 1);
                    }
                }
                layer.setVisibleLayers(visible);
            });
            $('.layer.css-label').click(function () {
                var check = $(this).parent().find(".layers")[0];
                var val = parseInt(check.value);
                var ret = check.checked;
                check.checked = !ret;
                var layer = map.getLayer(map.layerIds[val + 1]);
                if (!ret) {
                    layer.show();
                    $('.sublayer_' + val).prop("checked", true);
                    $('.click_' + val).removeClass('hide');
                }
                else {
                    layer.hide();
                    $('.sublayer_' + val).prop("checked", false);
                    $('.click_' + val).addClass('hide');
                }
            });          
        });        
    }

    function getInfoContent(click, j) {
        var highPanel = false;
        //reference for graphic attributes:
        //attributes = Title, Xval, Yval, DFIRMFloodZone, FIRMFloodZone, Elevation, WindSpeed, Panel};
        var infoTemplateContent = "<table><tbody>";
        infoTemplateContent += "<tr class='child'><td><span style='text-decoration: underline; font-weight: bold;'>Community Name:</span><span> " + j.communityName + "</span><br /><br /></td></tr>"
        for (var k = 0 ; k < j.cont.length; k++) {
            var eff_date = isValid(j.cont[k].date) ? "Effective(" + j.cont[k].date + ")" : "";
            infoTemplateContent += '<tr class="child"><td><span style="text-decoration: underline;font-weight: bold;">' + layerData[k].Name + ':' + eff_date + '</span> <br>';
            infoTemplateContent += '<span style="margin-left:20px;text-decoration: underline;font-weight: bold;">Flood Zone:</span><span>' + j.cont[k].zone + '</span><br>';
            infoTemplateContent += '<span style="margin-left:20px;text-decoration: underline;font-weight: bold;">FIRM Panel ID:</span><span>&nbsp;' + j.cont[k].panel + '</span>';
        }
        if (isValid(j.secl)) {
            infoTemplateContent += '<br/><tr class="child"><td><span style="color: red; text-decoration: none; font-weight: normal;">In Seclusion Area </span>';
            infoTemplateContent += '<span class="info-seclusion" style="font-weight:bold;"><span class="icon-question-sign"></span><span class="info-hover">The levee, dike or other structure that impacts flood  hazard areas inside this boundary has not been shown to comply with Section 65.10 of the NFIP Regulations. As such, these FIRM panels will be revised at a later date to update the flood hazard information associated with this structure.</span></span></td></tr><br/>';
        }
        infoTemplateContent += "<tr class='child'><td><span style='text-decoration: underline; font-weight: bold;'>Ground Elevation:</span><span> " + j.elev + "</span></td></tr>"
        infoTemplateContent += "<tr class='child'><td><span style='text-decoration: underline; font-weight: bold;'>IRC Wind Speed:</span><span> " + j.BWS + "</span></td></tr>"
        var lat = click.x;
        var lon = click.y;
        infoTemplateContent += "<tr class='child'><td><span style='text-decoration: underline; font-weight: bold;'>IBC Wind Speed:</span><span><label onclick='getATCspeed(" + lat + "," + lon + ")' style='cursor:pointer;font-weight:600; color:#0CF;'>&nbsp;&nbsp;Display</label></span><br /><br /></td></tr>";
        infoTemplateContent += "</tbody></table>";
        return infoTemplateContent;
    }
    hideLoading();
});

function remove_graph(i) {
    var num = parseInt(i);
    for (var graphic in map.graphics.graphics) {
        graphic = parseInt(graphic);
        try {
            if (i == map.graphics.graphics[graphic].attributes.ID) {
                map.graphics.remove(map.graphics.graphics[graphic]);
            }
        }
        catch (e) { }
    }
    $('.graphic_' + i).remove();
}

function toggleBaseLayers(baseLayer) {
    switch (baseLayer) {
        case "aerialLayer":
            veTileLayer.setMapStyle(BingMaps.MAP_STYLE_AERIAL);
            veTileLayer.refresh();
            //Date: 4/9/2013
            //Purpose: Added toggle states for buttons 
            $("label.roads").removeClass("basemap-active");
            $("label.hybrid").removeClass("basemap-active");
            $("label.aerial").addClass("basemap-active");
            break;
        case "hybridLayer":
            veTileLayer.setMapStyle(BingMaps.MAP_STYLE_AERIAL_WITH_LABELS);
            veTileLayer.refresh();
            currentBaseMapView = "hybridLayer";
            //Date: 4/9/2013
            //Purpose: Added toggle states for buttons 
            $("label.roads").removeClass("basemap-active");
            $("label.aerial").removeClass("basemap-active");
            $("label.hybrid").addClass("basemap-active");
            break;
        default:
            veTileLayer.setMapStyle(BingMaps.MAP_STYLE_ROAD);
            veTileLayer.refresh();
            //Date: 4/9/2013
            //Purpose: Added toggle states for buttons 
            $("label.roads").addClass("basemap-active");
            $("label.aerial").removeClass("basemap-active");
            $("label.hybrid").removeClass("basemap-active");
            break;
    }
}

function getCIDInfo(click, json) {
    showLoading("Getting Community information");
    var geo = click.x + "," + click.y;
    //console.log(geo);
    var URL = "http://terra2.agcenter.lsu.edu/arcgis/rest/services/DEV/BaseServices/MapServer/2/query";
    var params = {
        geometry: geo,
        geometryType: 'esriGeometryPoint',
        sr: click.spatialReference.wkid,
        tolerance: 0,
        returnGeometry: false,
        maxAllowableOffset: '',
        f: 'JSON',
        outFields: '*'
    };

    var d = $.ajax({
        async: false,
        url: URL,
        dataType: 'jsonp',
        data: params
    }).done(function (data, status) {
        //console.log(data);

        if (data.features[0].attributes.CID_Place !== "" && data.features[0].attributes.CID_Place !== " ") {
            //console.log('COMMUNITY CID FROM QUERY: ' + data.features[0].attributes.CID_Place);
            json.communityCID = data.features[0].attributes.CID_Place;
            json.communityName = data.features[0].attributes.PlaceName;
            json.parishCID = data.features[0].attributes.CID_Parish;
        } else {
            json.communityCID = null;
            json.parishCID = communityName = data.features[0].attributes.CID_Parish;
            json.communityName = communityName = data.features[0].attributes.PlaceName;

        }
    });
    return d;
}

function getATCspeed(x,y) {
    var atc_winspeedURL = "HTTPS://www.atcouncil.org/windspeedapi/getwindspeed";
    var apiKey = "d8bf894354b86b4e667931e0eb08d7f9";
    var pointJSON = new Object();
    pointJSON.x = x;
    pointJSON.y = y;
    pointJSON.spatialReference = "{'wkid':" + map.spatialReference.wkid + "}";
    var point = new esri.geometry.Point(pointJSON);
    var pointMeters = esri.geometry.webMercatorToGeographic(point);
    //var apiKey = "d677575de9dbe489efc930c1b1578b03"
    var QueryURL = atc_winspeedURL + "/" + apiKey + "/" + pointMeters.y.toFixed(4) + "/" + pointMeters.x.toFixed(4);
    $.ajax({
        url: QueryURL,
        jsonp: 'false',
        jsonpCallback: 'callback',
        dataType: 'jsonp',
        success: function (jsonp) {
            var a = jsonp, t = "";
            t += "<div class='windspeed-wrap'><table><tr><td colspan='2' style='background-color:#000;'><h2>WindSpeed Data from ATC</h2></td></tr><tr>   <td colspan='2'><div style='font-size:16px; font-weight:600; margin-top:10px; margin-bottom:10px;'><span>ASCE 7-10 Wind Speeds</br>(" + a["ASCE_7-10_Wind_Speeds"] + "):<br /></div></td></tr><tr>   <td><strong>Risk_Category_I:</strong></td><td>" + a.Risk_Category_I + "</td></tr><tr>   <td><strong>Risk_Category_II:</strong></td><td>" + a.Risk_Category_II + "</td></tr><tr>   <td><strong>Risk_Category_III_IV:</strong></td><td>" + a.Risk_Category_III_IV + "</td></tr><tr>   <td><strong>MRI_100_Year:</strong></td><td>" + a.MRI_100_Year + "</td></tr><tr>   <td><strong>MRI_10_Year:</strong></td><td>" + a.MRI_10_Year + "</td></tr><tr>   <td><strong>MRI_25_Year:</strong></td><td>" + a.MRI_25_Year + "</td></tr><tr>   <td><strong>MRI_50_Year:</strong></td><td>" + a.MRI_50_Year + "</td></tr>",
            t += '<tr><td colspan="2"><div style="font-size:16px; font-weight:600; margin-top:10px; margin-bottom:10px;"><span><strong>ASCE 7-05:</strong> ' + a["ASCE_7-05"] + "<br/><span><strong>ASCE 7-93:</strong> " + a["ASCE_7-93"] + '</td></tr></table></div><span style="width: 100%; float: left; background-color: #000;"><a href="http://www.atcouncil.org/windspeed/index.php" class="ATC_Hyperlink" target="_blank" style="color:#fff; text-align:center; width:100%; float: left; margin-top:10px; padding-bottom:10px;">Applied Technology Council (ATC) wind speed website.</a></span></div>',
            $.fancybox({
                content: t,
                autoScale: !0,
                transitionIn: "elastic",
                transitionOut: "elastic",
                speedIn: 500,
                speedOut: 300,
                autoDimensions: !0,
                centerOnScroll: !0
            })
        }
    });
}

function getBasicWindSpeed(click, json) {
    showLoading('Acquiring<br/>Basic Wind Speeds');
    var geo = click.x + "," + click.y; //-91.2537198,30.3943588
    var identifyWindspeedRestURL = 'http://maps.lsuagcenter.com/ArcGIS/rest/services/LAWinds/LABWS13/MapServer/identify?&callback=?';
    var identifyParam = {
        geometry: geo,
        geometryType: 'esriGeometryPoint',
        sr: click.spatialReference.wkid,
        layers: 'all',
        time: '',
        layerTimeOptions: '',
        layerdefs: '',
        tolerance: 0,
        mapExtent: map.extent.xmin + ',' + map.extent.ymin + ',' + map.extent.xmax + ',' + map.extent.ymax,
        imageDisplay: map.width + ',' + map.height + ',' + '96',
        returnGeometry: false,
        maxAllowableOffset: '',
        f: 'JSON'
    };
    //get windspeed from identify rest service on selected map service url
    var d = $.ajax({
        async: false,
        url: identifyWindspeedRestURL,
        dataType: 'jsonp',
        data: identifyParam
    }).done(function (data, status, jqXHR) {
        //console.log(data);
        try {
            json.speed = parseInt(data.results[0].attributes.Speed) + " mph";
            json.speed13 = parseInt(data.results[1].attributes.BWS);
            switch (json.speed13) {
                case 90:
                    json.speed13 = json.speed13 + " mph";
                    break;
                case 99:
                    var speedLowEnd = json.speed13 - 8;
                    json.speed13 = speedLowEnd + '-' + json.speed13 + " mph";
                    break;
                default:
                    var speedLowEnd = json.speed13 - 9;
                    json.speed13 = speedLowEnd + '-' + json.speed13 + " mph";
                    break;
            }
            json.BWS13 = json.speed13;
            json.BWS = json.speed;
        }
        catch (error) {
            json.speed = "N/A";
            json.speed13 = "N/A"
            json.BWS13 = "('13) " + json.speed13;
            json.BWS = "('06-'12) " + json.speed;
            //alert("Error getting Windspeed or CID " + error.message);
        }
    });
    return d;
}

function getElevation(click, json) {  
    showLoading('Acquiring<br/>Ground Elevation');
 //   showLoading();

    var pointMeters = esri.geometry.webMercatorToGeographic(click); //have to convert point from web mercator to geographic
    var e = pointMeters.x.toFixed(4);
    //console.log(e);
    var t = pointMeters.y.toFixed(4);
    //console.log(t);

    var d = $.ajax({
        type: "GET", //GET or POST or PUT or DELETE verb
        timeout: 5000,
        url: "http://ned.usgs.gov/epqs/pqs.php", // Location of the service
        data: {
            units: "feet",
            output: "json",
            x: e,
            y: t
        }, //Data sent to server
        success: function (jsonData) {
            if (jsonData !== "Service is Unavailable") {
                var r = jsonData.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation.toFixed(1);
                json.elev = r + " ft";
            }
            else {
                json.elev = 'Service is Unavailable';
            }
        },
        error: function (err) {
            json.elev = "USGS Service Not Responding";
        } // When Service call fails
    });
    return d;
}

function isValid(val) {
    if (val != undefined && val != "" && val != null && val != "Null") {
        return true;
    }
    else {
        return false;
    }
}

function showLoading(v) {
    $('#loadingImg').css('display', 'block');
    $('#acquiring').html(v);
}

function hideLoading() {
    $('#loadingImg').css('display', 'none');
}