var map, startExtent;
var BingMapsKey = 'AlduteqaR5NwBdOKa-xGt4mB-vQHrA7amfIi2qBDH154Km_k86Ot-6bOIfR3oXrR';
var allData = {};

require(["esri/map", "esri/graphicsUtils", "esri/virtualearth/VETiledLayer", "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/graphic", "esri/geometry/Extent", "esri/geometry/Point", "esri/Color", "esri/SpatialReference",
"esri/symbols/PictureMarkerSymbol", "esri/symbols/TextSymbol", "esri/symbols/Font", "esri/Color", "dojo/domReady!"],
      function (Map, graphicsUtils, VETiledLayer, Tiled, Dynamic, Graphic, Extent, Point, Color, SpatialReference, PictureMarkerSymbol, TextSymbol, Font, Color) {
          var pStr = getQueryString('p');
          var qStr = getQueryString('q');

          //var qStr = {
          //    "title": "my title",
          //    "node": 64,
          //    "points": [
          //      {
          //          "index": 1,
          //          "lat": 2,
          //          "long": 2
          //      },
          //      {
          //          "index": 2,
          //          "lat": 3,
          //          "long": 3
          //      },
          //      {
          //          "index": 3,
          //          "lat": 4,
          //          "long": 4
          //      }
          //    ]
          //};

          if (pStr) {
              console.log('data passed from map site');
              allData = JSON.parse(decodeURIComponent(pStr));
          } else if (qStr) {
              console.log('querying layers now');
              console.log(qStr);

              allData = queryLayers(qStr.points, qStr.title);

          } else {
              window.location = window.location.origin + '/floodmaps';
          }

          if (allData.extent) {
              startExtent = new Extent(allData.extent.xd, allData.extent.yd, allData.extent.xu, allData.extent.yu, new SpatialReference({ wkid: 102100 }));
              map = new Map("map", {
                  logo: false,
                  slider: false,
                  nav: false,
                  extent: startExtent,
                  showAttribution: false
              });

          } else {

              map = new Map("map", {
                  logo: false,
                  slider: false,
                  nav: false,
                  showAttribution: false
              });

          }




          // Add layers to map, get it loaded and ready to go
          addLayers();


          map.on("load", function () {
              console.log('we are now loaded');

              //diasble all navigation on the map
              map.hideZoomSlider();
              map.disableMapNavigation();

              // Add Points
              addPoints();

              updateTitle();


          });

          // Query for point data since there were too many points to pass directly
          function queryLayers(points, title) {
              var outData = {};
              //console.log('outData');
              //console.log('points', points);
              //console.log('title', title);

              return outData;
          }

          function addLayers() {

              var node = allData.node;
              var layerType = allData.layers;
              var visibleLayers = [];

              for (var i = 0; i < layerType.length; i++) {
                  var thisLayerType = layerType[i];

                  switch (thisLayerType.id) {
                      case "hybridLayer":
                          var layer = new VETiledLayer({
                              bingMapsKey: BingMapsKey,
                              mapStyle: VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS
                          });
                          layer.id = thisLayerType.id;
                          layer.name = 'Bing Hybird';
                          layer.class = 'bing';
                          visibleLayers.push(layer);
                          break;
                      case "roadsLayer":
                          var layer = new VETiledLayer({
                              bingMapsKey: BingMapsKey,
                              mapStyle: VETiledLayer.MAP_STYLE_ROAD
                          });
                          layer.id = thisLayerType.id;
                          layer.name = 'Bing Roads';
                          layer.class = 'bing';
                          visibleLayers.push(layer);
                          break;
                      case "aerialLayer":
                          var layer = new VETiledLayer({
                              bingMapsKey: BingMapsKey,
                              mapStyle: VETiledLayer.MAP_STYLE_AERIAL
                          });
                          layer.id = thisLayerType.id;
                          layer.name = 'Bing Aerial';
                          layer.class = 'bing';
                          visibleLayers.push(layer);
                          break;
                      case "dfirmLayer":
                          var parishLayer = { id: "0", parishName: node, layerOpacity: thisLayerType.o, layerFused: "", layerURL: "", layerType: "DFIRM" };

                          //set layer variable
                          parishLayer.layerURL = parishLayersDetails.Parishes[node - 1].DFIRM.url;
                          parishLayer.layerFused = parishLayersDetails.Parishes[node - 1].DFIRM.layerType;

                          if (parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate != "Preliminary") {
                              var date = "(Effective Date: " + parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate + ")";
                          }
                          else {
                              var date = "(Issued Date: " + parishLayersDetails.Parishes[node - 1].DFIRM.Date + ")";
                          }

                          if (parishLayer.layerFused == "Tiled") {
                              var layer = new Tiled(parishLayer.layerURL, { "opacity": parishLayer.layerOpacity, id: "parishLayer" + parishLayer.id, visible: true });
                          }
                          else {
                              var layer = new Dynamic(parishLayer.layerURL, { "opacity": parishLayer.layerOpacity, id: "parishLayer" + parishLayer.id, visible: true });
                          }
                          if (parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate != undefined && parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate != "" && parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate != "Preliminary") {
                              //The DFIRM Effective date is adopted (Future) 6 months before it is effective, so if today's date is earlier than the effective date,
                              // then it is only adopted.
                              if (new Date() < new Date(parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate)) {
                                  //future DFIRM
                                  layer.name = 'Future FIRM';
                                  layer.class = 'future';
                              } else {
                                  //effective DFIRM
                                  // I think this should have the EffectiveDate omitted, as it's already been read from the table and added
                                  layer.name = 'Effective FIRM (' + parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate + ')';
                                  layer.class = 'effective'
                              }
                          } else {
                              //preliminary DFIRM
                              layer.name = 'Preliminary FIRM (' + parishLayersDetails.Parishes[node - 1].DFIRM.Date + ')';
                              layer.class = 'preliminary';
                          }
                          layer.id = thisLayerType.id;

                          allData.layers[i].name = layer.name;
                          allData.layers[i].class = layer.class;
                          visibleLayers.push(layer);
                          break;
                      case "abfeLayer":
                          var parishLayer = { id: "1", parishName: node, layerOpacity: thisLayerType.o, layerFused: "", layerURL: "", layerType: "ABFE" };

                          //set layer variable
                          parishLayer.layerURL = parishLayersDetails.Parishes[node - 1].ABFE.url;
                          parishLayer.layerFused = parishLayersDetails.Parishes[node - 1].ABFE.layerType;

                          if (parishLayer.layerFused == "Tiled") {
                              var layer = new esri.layers.ArcGISTiledMapServiceLayer(parishLayer.layerURL, { "opacity": parishLayer.layerOpacity, id: "parishLayer" + parishLayer.id, visible: true });
                          }
                          else {
                              var layer = new esri.layers.ArcGISDynamicMapServiceLayer(parishLayer.layerURL, { "opacity": parishLayer.layerOpacity });
                          }

                          layer.id = thisLayerType.id;
                          layer.name = "ABFE";
                          layer.class = 'abfe';
                          visibleLayers.push(layer);

                          break;
                      case "effFirmLayer":
                          var parishLayer = { id: "2", parishName: node, layerOpacity: thisLayerType.o, layerFused: "", layerURL: "", layerType: "EFF_FIRM" };
                          parishLayer.layerURL = parishLayersDetails.Parishes[node - 1].FIRM.url;
                          parishLayer.layerFused = parishLayersDetails.Parishes[node - 1].FIRM.layerType;

                          if (parishLayer.layerFused == "Tiled") {
                              layer = new Tiled(parishLayer.layerURL, { "opacity": parishLayer.layerOpacity, id: "parishLayer" + parishLayer.id, visible: true });
                          }
                          else {
                              layer = new Dynamic(parishLayer.layerURL, { "opacity": parishLayer.layerOpacity, id: "parishLayer" + parishLayer.id, visible: true });
                          }
                          if (parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate != undefined && parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate != "" && parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate != "Preliminary") {
                              //The DFIRM Effective date is adopted (Future) 6 months before it is effective, so if today's date is earlier than the effective date,
                              // then it is only adopted.
                              if (new Date() < new Date(parishLayersDetails.Parishes[node - 1].DFIRM.EffectiveDate)) {
                                  //effective FIRM
                                  layer.name = 'Effective FIRM (' + parishLayersDetails.Parishes[node - 1].FIRM.Date + ')';
                                  layer.class = 'effective firm';
                              } else {
                                  //Historical FIRM
                                  layer.name = 'Historical FIRM';
                                  layer.class = 'historical firm';
                              }
                          } else {
                              //effective FIRM
                              layer.name = 'Effective FIRM (' + parishLayersDetails.Parishes[node - 1].FIRM.Date + ')';
                              layer.class = 'effective firm';
                          }

                          layer.id = thisLayerType.id;
                          allData.layers[i].name = layer.name;
                          allData.layers[i].class = layer.class;

                          visibleLayers.push(layer);
                          break;
                  }
                  //add layer, and by default it is visible
                  map.addLayer(layer);
              }


              // Reverse the order and then add all visible layers to Visible Layers list
              visibleLayers.reverse();
              visibleLayers.forEach(addVisibleLayer);

          } // END addLayers

          function clearGraphics() {
              if (map.graphics) { map.graphics.clear() };
          }

          function addPoints() {

              clearGraphics();

              // Preparing templates to be rendered.
              // Just need to call them and pass them some context
              var sourceTHead = $("#table-head").html();
              var tableHeadSource = Handlebars.compile(sourceTHead);

              var sourceTBody = $('#table-body').html();
              var tableBodySource = Handlebars.compile(sourceTBody);

              var layers = allData.layers;

              // For each Visible Layer (We're going to do this in reverse now so that the top-most layers is on top
              for (var a = layers.length - 1; a > 0; a--) {

                  var layer = layers[a];


                  if (layer.id == "abfeLayer") {

                  } else {

                      // Render table header
                      var html = tableHeadSource(layer);
                      $('#tabledata').append(html);

                      // Render start of table body
                      var html = tableBodySource(layer);
                      $('#tabledata').append(html);
                  }


                  var points = allData.points;

                  // Now process each point
                  for (var b = 0; b <= points.length - 1; b++) {

                      var point = points[b];

                      if (layer.id == "abfeLayer") {


                      } else {

                          var panels = point.panels;

                          // Process each panel of the current point
                          for (var c = 0; c <= panels.length - 1; c++) {
                              var panel = panels[c];

                              // mapping the general values to the panel specific values for rendering in the table
                              panel.lat = point.lat;
                              panel.long = point.long;
                              panel.elevation = point.elevation;
                              panel.index = point.index;
                              panel.bws13 = point.bws13;

                              // Add data to relevant table
                              addDataToTable(panel, layer);
                          }
                      }

                      // If the point has already been processed, we don't need to add it to the map again
                      if (allData.points[b].processed) {
                          // If it hasn't been processed, we will add the actual point graphic to the map
                      } else {
                          addPointToMap(point);
                          allData.points[b].processed = true;
                      }
                  }

              }


              if (allData.extent) {
                  // Do nothing if the extent is already determined
              } else {

                  if (allData.points.length > 2) {
                      var gExtent = graphicsUtils.graphicsExtent(map.graphics.graphics).expand(10);
                      map.setExtent(gExtent);
                  }
                  else {
                      var pSolo = map.graphics.graphics[0].geometry;
                      map.centerAndZoom(pSolo, 14);
                  }
              }
          } // END addPoints


          function addPointToMap(point) {
              var xloc = parseFloat(point.lat);
              var yloc = parseFloat(point.long);
              var pIndex = point.index.toString();

              addPointCoords(xloc, yloc, pIndex);
              var curPoint = new Point(yloc, xloc);

              var pinSymbol = new PictureMarkerSymbol('http://maps.lsuagcenter.com/floodmaps/images/pin8.png', 48, 48);
              pinSymbol.setOffset(0, 20);

              var textSymbolFont = new Font("14pt", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_BOLD, "Helvetica, Verdana, Geneva, Arial, sans-serif");
              var textSymbolColor = new Color("#FFFFFF");
              var textSymbol = new TextSymbol(pIndex, textSymbolFont, textSymbolColor);
              textSymbol.setOffset(0, 20);

              var pinGraphic = new Graphic(curPoint, pinSymbol);
              var textGraphic = new Graphic(curPoint, textSymbol);

              try {
                  console.log('adding graphic to map');
                  map.graphics.add(pinGraphic);
                  map.graphics.add(textGraphic);
              }
              catch (Error) {
                  console.log(Error);
                  window.alert('There was an error adding your points');
              }
          }






          // Adds flood zone data to proper table
          function addDataToTable(panel, layer) {

              var sourceTDataRow = $('#table-data-row').html();
              var tableDataRowSource = Handlebars.compile(sourceTDataRow);

              var sourceTDataRowPaper = $('#table-data-row-paper').html();
              var tableDataRowPaperSource = Handlebars.compile(sourceTDataRowPaper);

              // Only do this for the point data that is relative to the current Visible Layer we are processing
              if (panel.layer == layer.id) {
                  // if it's not digital, lets just tell them in the table that we couldn't read it
                  if (panel.digital == false) {
                      var html = tableDataRowPaperSource(panel);
                      var resultsDiv = layer.id + "-results";
                      $('#' + resultsDiv + ' tbody').append(html);
                  }
                      // If it's digital and we can get Zone, BFE, Panel data, then show it
                  else {
                      var html = tableDataRowSource(panel);
                      var resultsDiv = layer.id + "-results";
                      $('#' + resultsDiv + ' tbody').append(html);
                  }
              }
                  // If we aren't on the current processing layer, we will do nothing
              else {

              }
          }

          // Adds point to Point Coordinates table
          function addPointCoords(x, y, index) {
              var point = {};
              point.lat = x;
              point.long = y;
              point.index = index;


              var sourceCRow = $('#coord-data-row').html();
              var coordRowSource = Handlebars.compile(sourceCRow);

              var html = coordRowSource(point);
              $('#pointCoords tbody').append(html);
          }

          // Update title
          function updateTitle() {
              if (allData.title) {
                  dojo.byId("printTitle").innerHTML = unescape(allData.title);
              }
          }

          // Add Visible Layers to group list
          function addVisibleLayer(element, index, array) {
              var output = "<li class='list-group-item " + element.class + "'><span>" + element.name + "</span></li>";
              dojo.byId("visibleLayers").innerHTML = dojo.byId("visibleLayers").innerHTML + output;
          }

          // Simple getQueryString (Paco's version. Unchanged from original);
          function getQueryString(name) {
              name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
              var regexS = "[\\?&]" + name + "=([^&#]*)";
              var regex = new RegExp(regexS);
              var results = regex.exec(window.location.href);

              if (results == null) {
                  return "";
              }

              else {
                  return results[1];
              }
          }
      });