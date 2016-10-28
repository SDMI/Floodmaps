<!DOCTYPE html>
<html>
<head>
    <script src="floodmap_javascript/modernizr.custom.18796.js"></script>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <link rel="apple-touch-icon" href="images/icon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="images/icon-72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="images/icon@2x.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="images/icon-72@2x.png" />
    <link rel="shortcut icon" type="image/x-icon" href="images/icon-72.png">
    <title>LA Floodmaps</title>

    <%--Current References--%>
    <%--<link rel="stylesheet" type="text/css" href="http://js.arcgis.com/3.10/js/dojo/dijit/themes/tundra/tundra.css" />--%>
    <%--<link rel="stylesheet" href="http://js.arcgis.com/3.10/js/esri/css/esri.css">--%>
    <%--<link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.13/dijit/themes/tundra/tundra.css">
    <link rel="stylesheet" href="//js.arcgis.com/3.13/esri/css/esri.css">--%>


    <link rel="stylesheet" href="https://js.arcgis.com/3.17/esri/css/esri.css">
    <link rel='stylesheet' type='text/css' href='floodmap_style/font-awesome.css' />
    <link rel="stylesheet" type="text/css" href="floodmap_style/page.css" />
    <link rel='stylesheet' type='text/css' href="fancyBox/jquery.fancybox.css" />
    <link rel="stylesheet" type="text/css" href="slider/css/slider.css" />
    <style type="text/css">
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {


            .panelheader-wrap h2 {
                margin-top: 3px !Important;
            }

            @media all and (min-width: 768px) {
                .panelheader-legend {
                    width: 587px;
                    right: 22px;
                }

                .panelcontent-legend {
                    width: 630px !Important;
                    padding: 0 !Important;
                }
            }
            /*.panelheader-wrap {
                width: 304px;
            }
            .panelheader-wrap h2 {
                margin-left:20px;
            }*/
        }

        .fancybox-custom .fancybox-skin {
            -webkit-box-shadow: 0 0 50px #222;
            -moz-box-shadow: 0 0 50px #222;
            box-shadow: 0 0 50px #222;
        }

        /* DEMO ONLY for this short page - remove in live code */
        /*body { min-height: 540px; }*/
    </style>

    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-43366216-1', 'lsuagcenter.com');
        ga('send', 'pageview');

    </script>

   
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.2/jquery.xdomainrequest.min.js"></script>
    
         
    <script src="https://js.arcgis.com/3.17/"></script>
    <%--<script type="text/javascript" src="http://js.arcgis.com/3.10compact/"></script>--%>
    <%--<script src="//js.arcgis.com/3.13/"></script>--%>
    <script src="slider/js/bootstrap-slider.js"></script>
    <script src="floodmap_javascript/ParishFloodLayersGaia.js"></script>
    <script src="floodmap_javascript/esri.symbol.MultiLineTextSymbol.js"></script>
    <script src="floodmap_javascript/floodMap.js"></script>
    <script src="floodmap_javascript/respond.js"></script>
    <script src="floodmap_javascript/customizeUserExperience.js"></script>
    <script src="floodmap_javascript/page.js"></script>
   

    <meta name="description" content="Louisiana FloodMaps Portal" />
</head>
<body>
    <div class="disclaimer-popup" style="display: block;">
        <h1 style="font-size: 20px; color: #00ccff; text-transform: uppercase;">Welcome to Louisiana's Flood Maps!</h1>
        <h1 style="font-size: 20px;">Use this site to:</h1>
        <ul style="margin-left: 20px;">
            <li>Find flood risk* at your place</li>
            <li>See how risk* has changed</li>
            <li>See if risk* is about to change (new map)</li>
            <li>Estimate 100-year flood depth in your building</li>
        </ul>
        <br />
        <p style="font-style: italic; font-size: 12px; width: 100%; padding-bottom: 20px;">* Defined as flood zone and Base Flood Elevation (BFE) depicted on the Flood Insurance Rate Map (FIRM)</p>

        <%--        <h1 style="font-size:20px;">Disclaimer</h1>
        <p style="border-bottom:solid 1px #fff; padding-bottom:20px;">While the floodplain data that is shown on this map is the same, this map is not an official FEMA Flood Insurance Rate Map (FIRM). This Interactive Mapping Tool is not intended for insurance rating purposes and is for information only. Locating property on the Aerial/Roads Hybrid view is more accurate than geocoding the address. Please contact your local floodplain administrator for more information or to view an official copy of the Flood Insurance Rate Map (FIRM). <a href="#" class="moreInfoLink">Disclaimer and Disabilities</a></p>

        <h1 style="font-size:20px;">Note to users with Disabilities</h1>
        <p style="border-bottom:solid 1px #fff; padding-bottom:20px;">Alternate text does not appear on pages with the maps as the maps convey spatial data and have various layers of data which can be selected or de-selected individually. For information about a specific location, you may use the search function to enter your address, or select a parish. You can then simply click on the map and generate a information window with details about underlying map layers</p>
        <br />--%>
        <div style="width: 100%; float: left;">
            <a href="http://www.lsuagcenter.com/en/family_home/home/design_construction/Laws+Licenses+Permits/Getting+a+Permit/Your+Flood+Zone/flood_maps/TipsUsingFloodMapsPortal.htm" class="tipsToolsNav" target="_blank">Tips, Tools and Navigation Aids</a><br />
            <a href="#" class="moreInfoLink" style="line-height: 40px;">Disclaimer and Disabilities Notice</a>
        </div>
        <div style="width: 100%; float: left;">
            <div class='floodmap_disclaimerpopupclose'>Close</div>
        </div>
        <div id="modal2" onclick="return false;" style="display: block;"></div>
    </div>

    <div id="container">

        <div id='mapDiv' class='floodmap_map tundra'>

            <%--<div id="fancybox-loading"></div>--%>
            <div id="loadingImg">
                <div id="spinner"></div>
                <div id="acquiring"></div>
                <%--<img src="images/loading4.gif" width="50" height="50" />--%>
            </div>
        </div>

        <!-- On Search Popup choice Panel to inform user on proposed vs. effective map-->
        <div id="floodmapSelectDiv" class='floodmap_select floodmap_overlay' style="display: none; background-color: rgb(255, 254, 223) !Important; z-index: 1010;">
            <div class='floodmap_selectclose floodmap_no_margin floodmap_hide'></div>

            <h2 style="text-align: center; font-size: 20px; margin-bottom: 15px;">This
                <%--<label id="parishSelectDiv"></label> Parish--%> <span class="preliminary" style="display: none;">Preliminary</span> <span class="future" style="display: none;">Future</span> FIRM is:</h2>
            <div style="width: 100%; margin-left: auto; margin-right: auto;">
                <div style="line-height: 23px; margin-bottom: 20px; font-size: 12px;">
                    <%--<strong>A <span class="preliminary" style="display: none;">Preliminary</span> <span class="future" style="display: none;">Future</span> FIRM is:</strong>--%>
                    <ul style="padding-left: 30px; list-style: disc; margin-bottom: 10px;">
                        <li>sometimes used for development permits</li>
                        <li>possibly required for mitigation projects</li>
                        <li>the most up-to-date flood risk information</li>
                        <li>never used for rating insurance</li>
                    </ul>

                    <div id="futureFIRMTag" class="future" style="line-height: 23px; margin-bottom: 10px; font-size: 12px; display: none;">
                        <strong>This FIRM becomes Effective on <span id="futureFIRMDate">[Date]</span></strong>
                    </div>

                </div>

                <div style="line-height: 23px; margin-bottom: 10px; font-size: 12px;">
                    <strong>Use the Layers tool to select the Effective FIRM</strong>
                </div>
                <input id="Button1" type="button" onclick="layersPanel()" value="OK" />

            </div>

        </div>

        <div id="floodmapSearchSuggestionsDiv" class='floodmap_search_suggestions floodmap_overlay' style="display: none">
        </div>

        <div id="floodmapSearchDiv" class='floodmap_search floodmap_overlay' style="display: block;">
            <div class='floodmap_searchclose floodmap_no_margin floodmap_hide'>
            </div>
            <div class="inner-content">
                <div class='floodmap_location_bar floodmap_handle'>
                    <input id="txtAddress" type="text" />
                    <%--<span class='floodmap_location_button floodmap_icon floodmap_search_icon'></span>--%>

                    <p style="text-align: center; line-height: 0; margin-top: 26px;">OR</p>


                    <div id="selectwrrap">
                        <select id="parishes" name="parishes">
                            <option value="0">-- Select Parish --</option>
                        </select>
                    </div>
                    <%--<button type="submit" name="Go" value="Go" onclick="reloadFIPS (parishes.value)" class="ui-button-primary" title="Locate Parish">Go</button>--%>
                </div>
            </div>
        </div>

        <div class="middlepanel-header floodmap_disclaimerheader" style="display: none;">
            <h1>About this App</h1>
            <div class="floodmap_disclaimerclose floodmap_no_margin floodmap_hide"></div>
        </div>
        <div class="floodmap_disclaimer floodmap_overlay">
            <p style="text-align: center; font-size: 18px; text-shadow: 1px 1px #ccc;">
                <br />
                Version 1.0
            </p>
            <p>
                Use this online tool to study flood and wind hazards at your site or to explore how flood maps are changing in your parish.
            </p>
            <div id="logos-wrap">
                <div id="agcenter-logo2" title="LSU AgCenter"></div>
                <div id="dotd-logo2" title="LA DOTD"></div>
            </div>

            <h2>Disclaimer</h2>
            <p>
                While the floodplain data that is shown on this map is the same, this map is not an official FEMA Flood Insurance Rate Map (FIRM). This Interactive Mapping Tool is not intended for insurance rating purposes and is for information only. Locating property on the Aerial/Roads Hybrid view is more accurate than geocoding the address. Please contact your local floodplain administrator for more information or to view an official copy of the Flood Insurance Rate Map (FIRM).
            </p>
            <h2>Note to users with Disabilities</h2>
            <p>
                <em>Alternate text does not appear on pages with the maps as the maps convey spatial data and have various layers of data which can be selected or de-selected individually. For information about a specific location, the ‘Identify Feature Properties’ function may be used to click on the map and generate a information window with details about underlying map layers</em>
            </p>
            <h2>Development Team</h2>
            <p style="font-size: 12px; padding-left: 20px;">
                <strong>Henry Capello Jr. - SDMI</strong><br />
                <span>Information Systems Program Manager, GIS, Web Applications & Cyber Security</span><br />
                <strong>David Lamb - LSU AgCenter</strong><br />
                <span>GIS Analyst</span><br />
                <strong>Andrew Garcia - LSU AgCenter</strong><br />
                <span>IT Analyst</span><br />
                <strong>Callen Cranfield - LSU AgCenter</strong><br />
                <span>IT Analyst</span>
            </p>
            <br />
            <p style="text-align: center;">&copy; LSUAgCenter 2016</p>
        </div>

        <div class="middlepanel-header floodmap_layerInfoheader" style="display: none;">
            <h1>Layer Info</h1>
            <div class="floodmap_layerInfoclose floodmap_no_margin floodmap_hide"></div>
        </div>
        <div class="floodmap_layerInfo floodmap_overlay">
            <div id="floodmap_layerInfo">
                <p>
                    Layer Info
                </p>
            </div>

        </div>

        <div class="middlepanel-header floodmap_infoheader" style="display: none;">
            <h1>Flood Map Guide</h1>
            <div class='floodmap_infoclose floodmap_no_margin floodmap_hide'></div>
        </div>
        <div class='floodmap_info floodmap_overlay'>

            <div class="redirect-text"
                style="display: none; border: 1px solid rgb(250, 242, 204); background-color: rgb(252,248, 227); color: rgb(51,51,51); width: 100%; padding: 20px 10px 10px 10px; margin-top: 10px; box-sizing: border-box;">

                <p>
                    You have been redirected to the new LA Floodmaps portal at LSU AgCenter.
                </p>
                <p>
                    Use the guide below to help familiarize yourself with this new system.
                    <br />
                    If you need the guide again, it can be found in the top-right corner by clicking the Info icon <span class="icon-info-sign" style="font-size: 130%;"></span>
                </p>

                <p>
                    Update your bookmark (Ctrl + D)
                    <span
                        style="text-shadow: none; border: none; cursor: pointer; color: #5897a7; font-size: inherit; position: absolute; top: 5px; right: 25px;"
                        onclick="redirectRunOnce()">Stop Reminding Me
                        <span class="icon-remove" style="font-size: inherit;"></span>
                    </span>
                </p>


            </div>

            <p class="contact-help" style="margin-top: 5px;">
                Please report any issues to <a href="mailto:FloodMaps@agcenter.lsu.edu">FloodMaps@agcenter.lsu.edu</a>
            </p>

            <h1>Navigation</h1>
            <ul id="iconKey">
                <li class='icon-search' id="icon-searchbtn"></li>
                <li>
                    <h3>Search</h3>
                    Use this tool to select a parish or to locate an address or coordinates (latitude, longitude).</li>
                <li class='icon-print' id="icon-printbtn"></li>
                <li>
                    <h3>Print</h3>
                    Use this tool to capture your map-view and point-data on a printable page.  Click “Print” to print the page or “e-mail” to send a link that will recreate the image.</li>
                <li class='icon-key' id="icon-keybtn"></li>
                <li>
                    <h3>Legend</h3>
                    Use this tool to interpret the colors and symbols on the different versions of the flood maps.</li>
                <li class='icon-calendar' id="icon-calendarbtn"></li>
                <li>
                    <h3>Events</h3>
                    View information about events, meetings and dates related to delivery and finalization of a proposed FIRM.</li>
                <li class="zocial-buffer" id="icon-layersbtn"></li>
                <li>
                    <h3>Layers</h3>
                    Use this tool to turn flood maps on and off, adjust transparency, and choose the background map (Roads, Aerial, or Hybrid). The Layers tool displays all the versions of the FIRM that are in our system for the selected parish and opens a window to find Community Contacts.</li>
                <li class='icon-map-marker' id="icon-map-markerbtn"></li>
                <li>
                    <h3>Points</h3>
                    Use this tool to view information about the points represented by your pins.  This information can be viewed for each pin, also, by clicking on the head of the pin. Point info for flood maps is read only from digital maps. Additional information for each point is pulled from the US Geological Survey (LIDAR ground elevation) and the LSU AgCenter (Basic Wind Speed for the residential building code in Louisiana), and DOTD (Community Contacts)</li>
            </ul>


            <%--        <table id="iconKey">
            <tbody>
            <tr>
                <td><li class='icon-search' id="icon-searchbtn"><span>Search</span></li></td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non lacus non orci dictum bibendum non ac mauris. Quisque odio nunc, rutrum vitae magna eget, congue sodales libero.</td>
            </tr>
            <tr>
                <td><li class='icon-print' id="icon-printbtn"><span>Print</span></li></td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non lacus non orci dictum bibendum non ac mauris. Quisque odio nunc, rutrum vitae magna eget, congue sodales libero.</td>
            </tr>
            <tr>
                <td><li class='icon-key' id="icon-keybtn"><span>Legend</span></li></td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non lacus non orci dictum bibendum non ac mauris. Quisque odio nunc, rutrum vitae magna eget, congue sodales libero.</td>
            </tr>
            <tr>
                <td><li class='icon-calendar' id="icon-calendarbtn"><span>Events</span></li></td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non lacus non orci dictum bibendum non ac mauris. Quisque odio nunc, rutrum vitae magna eget, congue sodales libero.</td>
            </tr>
            <tr>
                <td><li class="zocial-buffer" id="icon-layersbtn"><span>Layers</span></li></td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non lacus non orci dictum bibendum non ac mauris. Quisque odio nunc, rutrum vitae magna eget, congue sodales libero.</td>
            </tr>
            <tr>
                <td><li class='icon-map-marker' id="icon-map-markerbtn"><span>Points</span></li></td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non lacus non orci dictum bibendum non ac mauris. Quisque odio nunc, rutrum vitae magna eget, congue sodales libero.</td>
            </tr>
            </tbody>
        </table>--%>
            <h1>Flood Maps</h1>
            <p>The most widely distributed flood map product in the United States is the Flood Insurance Rate Map (FIRM) of the National Flood Insurance Program (NFIP). FIRMS have been furnished predominantly as paper maps, which are still being used in many communities. FEMA now provides FIRMS in digital form; these work well in map-layering systems and enable information from the map to be read electronically. <a href="https://msc.fema.gov/webapp/wcs/stores/servlet/info?storeId=10001&catalogId=10001&langId=-1&content=productFIRM&title=NFIP%2520Flood%2520Maps&parent=productInfo&parentTitle=Product%2520Information">Read more about how FIRMs are made and used</a>.</p>
            <div id="Effective_FIRM">
                <h2>Effective FIRM</h2>
                <p>is the FIRM that is used to rate NFIP flood insurance policies. Older FIRMs were delivered as paper products; newer FIRMs are delivered as true digital products. For older FIRMs we display a scanned image of the paper map that has been processed somewhat to improve the alignment of features shown on the map (such as road intersections) with their position as determined by high resolution imagery. Use the Legend “FIRM (Scanned paper or gray-scale).”  For newer FIRMs we display the data as it is provided to us by FEMA. Use the Legend “Effective FIRM (Digital).</p>
            </div>
            <div id="Preliminary_DFIRM">
                <h2>Preliminary FIRM</h2>
                <p>is a FIRM presented to a community as part of the production or revision process. FEMA provides the Preliminary FIRM and the underlying Flood Insurance Study (FIS) to communities for review and comment, and considers those comments when producing the final product. The Preliminary FIRM becomes a Future FIRM when FEMA issues a Letter of Final Determination (LFD). The Preliminary and Future FIRMs are never used for rating flood insurance, but may be used by the community for regulating development. Preliminary FIRMs present the most up-to-date flood risk information until they are replaced by their Future FIRM. Use the legend “Proposed FIRM (Digital)”</p>
            </div>
            <div id="Future_DFIRM">
                <h2>Future FIRM</h2>
                <p>is the FIRM that was delivered to the community as a Preliminary FIRM and, after review and expiration of comment and appeals periods, has been adopted by the community and/or determined by FEMA to become the next Effective FIRM. The Future FIRM will become the Effective FIRM on the Study Effective Date (SED), which is six months after the date of the Letter of Final Determination (LFD). LFD and SED are shown in the 'Events' tool.  The Future FIRM is not used for insurance until the Study Effective Date; it may be used by the community for regulating development. Future FIRMs present the most up-to-date flood risk information. Use the Legend “Proposed FIRM (Digital)”</p>
            </div>
            <div id="Historical_FIRM">
                <h2>Historical FIRM</h2>
                <p>is the FIRM that was retired when the Future FIRM became the new Effective FIRM. Historical FIRMs that were issued originally as paper products are displayed as scans of the paper map. Historical FIRMs that were issued as digital products are shown in gray-scale, but remain fully digital.  Use the Legend “FIRM – (Scanned paper or gray-scale). On this site we show only the most recent Historical FIRM.  Earlier historical FIRMs for the community may be available at the <a href="http://msc.FEMA.gov">FEMA Map Service Center(http://msc.FEMA.gov)</a>.</p>
            </div>
            <%--            <div id="Effective_DFIRM">
                <h2>Effective DFIRM</h2>
                <p>is the DFIRM that is currently being used to rate NFIP flood insurance policies. It is a true digital product, not a scanned image of a paper product. When the community adopts a DFIRM, the prior FIRM is archived for presentation on the Web site.</p>
            </div>--%>


            <div id="ABFE">
                <h2>Advisory Base Flood Elevation (ABFE)</h2>
                <p>is a temporary Base Flood Elevation issued by FEMA after a disaster for use during recovery, while the FIRM is being revised to reflect risks discovered in the disaster event. ABFEs are never used for rating insurance. They may be used by the community to regulate some or all development. ABFEs were issued across coastal Louisiana following hurricanes Katrina and Rita and communities were required by the state to adopt ABFEs as a regulatory standard for rebuilding or forfeit hazard mitigation funding. ABFEs are retired by the next revised FIRM.</p>
            </div>
            <%--            <div id="FIRM_Info">
                <p>At any given time <strong>either</strong> a FIRM <strong>or</strong> a DFIRM will be the 'Effective' version, not both. The effective FIRM or DFIRM is always used for rating NFIP flood insurance policies. In most cases, the effective FIRM, whether paper or digital, is used as a standard for regulating development in the floodplain; however, there are exceptions.</p>
                <br />
                <p><a href="http://msc.fema.gov/webapp/wcs/stores/servlet/info?storeId=10001&amp;catalogId=10001&amp;langId=-1&amp;content=productFIRM&amp;title=NFIP%20Flood%20Maps&amp;parent=productInfo&amp;parentTitle=Product%20Information" target="blank">Read more about how FIRMs are made and used</a></p>
            </div>--%>
            <h1>Credits</h1>
            <p style="font-size: 11px;"><strong>1.</strong> <span style="font-style: italic;"><strong>Ground Elevation </strong>is provided by USGS's elevation web service. If unable to find elevation at the specified point, the service returns an extremely large, negative value (-1.79769313486231E+308).</span></p>
            <p style="font-size: 11px;"><strong>2.</strong> <span style="font-style: italic;"><strong>BWS </strong>is provided by the LSU AgCenter's basic wind speed web service developed from the map used in the Louisiana residential building code. Louisiana adopted the map from the 2012 International Residential Code effective Jan. 1, 2013. Previously the wind-speed standard was that from the 2003 code.</span></p>
            <p style="font-size: 11px;"><strong>3.</strong> <span style="font-style: italic;"><strong>Community Contacts </strong>information is maintained and provided by a service of the La Department of Transportation and Development, Office of Floodplain Regulations.</span></p>

        </div>


    </div>


    <!-- START HEADER -->
    <header>
        <div class='floodmap_title_bar' id="currentParish">
            LA Floodmaps
        </div>
    </header>
    <!-- END HEADER -->
    <!-- START NAV -->


    <div id="right-nav">
        <%--            <a href='#' title="Search Address" class='floodmap_search_trigger floodmap_searchbutton floodmap_float_right'>
                <span class='icon-search'></span><span class="icon-text">Search</span>
                <span class='floodmap_icon_text'>Search Address</span>
            </a>--%>

        <div id="dropdown-icon"><span class='icon-info-sign'></span><span class="icon-text">Info</span></div>

        <div id="dropdown" style="display: none;">

            <a title="Interactive Flood Mapping Site Disclaimer" class="floodmap_disclaimer_trigger floodmap_disclaimerbutton floodmap_float_right">
                <span class="icon-question-sign" style="color: #333 !Important"></span>&nbsp;&nbsp;&nbsp;About this App
                    <span class='floodmap_icon_text'>Interactive Flood Mapping Site Disclaimer</span>
            </a>

            <a title="Interactive Flood Mapping Site Info" class='floodmap_info_trigger floodmap_infobutton floodmap_float_right'>
                <span class="icon-file-alt" style="color: #333 !Important;"></span>&nbsp;&nbsp;&nbsp;Flood Map Guide
                <span class='floodmap_icon_text'>Interactive Flood Mapping Site Info</span>
            </a>

            <a href="http://www.lsuagcenter.com/en/family_home/home/design_construction/Laws+Licenses+Permits/Getting+a+Permit/Your+Flood+Zone/flood_maps/TipsUsingFloodMapsPortal.htm" target="_blank" title="Interactive Flood Mapping Site Info" class='floodmap_infobutton floodmap_float_right'>
                <span class="icon-lightbulb" style="color: #333 !Important;"></span>&nbsp;&nbsp;&nbsp;Tips, Tools and Navigation Aids
                <span class='floodmap_icon_text'>Interactive Flood Mapping Site Tips, Tools and Navigation Aids</span>
            </a>
        </div>
    </div>

    <nav>

        <div class='floodmap_nav'>

            <!-- float right elements are displayed in reverse order -->
            <a title="Your Map Points" class='floodmap_points_trigger floodmap_trigger floodmap_button' data-panel='floodmap_points'>
                <span class='icon-map-marker'></span>
                <span class="icon-text">Points</span>
                <span class='floodmap_icon_text'>Your Map Points</span>
            </a>

            <a title="Flood Map Layers" class='floodmap_settings_trigger floodmap_trigger floodmap_button' data-panel='floodmap_settings'>
                <span class="zocial-buffer"></span>
                <span class="icon-text">Layers</span>
                <span class='floodmap_icon_text'>Flood Map Layers</span>
            </a>

            <a title="Events & Meetings" class='floodmap_details_trigger floodmap_trigger floodmap_button' data-panel='floodmap_meetings'>
                <span class='icon-calendar'></span>
                <span class="icon-text">Events</span>
                <span class='floodmap_icon_text'>Events & Meetings</span>
            </a>


            <a title="Flood Map Legend" class='floodmap_legend_trigger floodmap_trigger floodmap_button' data-panel='floodmap_legend'>
                <span class='icon-key'></span>
                <span class="icon-text">Legend</span>
                <span class='floodmap_icon_text'>Flood Map Legend</span>
            </a>

            <a title="Print Your Data" class='floodmap_trigger floodmap_print_trigger floodmap_button' data-panel='floodmap_print'>
                <span class='icon-print'></span>
                <span class="icon-text">Print</span>
                <span class='floodmap_icon_text'>Print Your Data</span>
            </a>

        </div>

        <span class="feedback"><a href="../../forms/feedback/general" target="_blank">Feedback?</a></span>

    </nav>

    <div id="left-nav">

        <a title="Search Address" class='floodmap_search_trigger floodmap_searchbutton floodmap_float_right'>
            <span class='icon-search'></span><span class="icon-text">Search</span>
            <span class='floodmap_icon_text'>Search Address</span>
        </a>
    </div>

    <!-- END NAV -->
    <div class='floodmap_container_main'>
        <!--        <div class='floodmap_center_content floodmap_right'>
            <div id='mapDiv' class='floodmap_map tundra'></div>
        </div>-->
        <div id="agcenter-logo" title="LSU AgCenter"></div>
        <div id="dotd-logo" title="DOTD"></div>
    </div>

    <div class="panelheader-wrap events-header">
        <h2>Events</h2>
        <div class='floodmap_close floodmap_hide'>
        </div>
    </div>
    <div class='floodmap_right_content panelcontent-events bottomSpacer'>
        <div class='*floodmap_panel_container floodmap_container'>
            <div class='floodmap_meetings floodmap_panel floodmap_panel_meetings'>
                <div id="meetings" class="meetings_events">
                    <span style="margin: 10px 5px 0 5px">Select any parish from Layers tab</span>
                </div>
                <%--<h3>Events:</h3>
                --%>
                <div id="events" class="meetings_events">
                    <span style="margin: 10px 5px 0 5px"></span>
                </div>
            </div>
        </div>
    </div>

    <div class="panelheader-wrap panelheader-legend legend-header">
        <h2>Legend</h2>
        <div class='floodmap_close floodmap_hide'>
        </div>
    </div>
    <div class='floodmap_right_content panelcontent-legend bottomSpacer'>
        <div class='*floodmap_panel_container floodmap_container'>
            <div id='floodmap_legendDiv' class='floodmap_legend floodmap_panel floodmap_panel_legend'>
                <div style="width: 100%; float: left;">
                    <a href="legend.htm" target="_blank" style="float: right;" class="legendPrint" title="Print Legend">Print Legend</a>
                </div>
                <h3>Effective FIRM (Digital)</h3>
                <ul>
                    <%--<li class="dfirmlegendicon1">All flood hazard lines coded as SFHA / FLOOD ZONE BOUNDARY. Lines coded as OTHER BOUNDARY indicate different source citations, apparent limits, or end of spatial extent and are not symbolized.</li>--%>
                    <li class="dfirmlegendicon2">The Limit of Study line is used to indicate the terminus of a 1- percent-annual-chance floodplain of a stream or backwater area that has not been independently studied by detailed analyses, or of a stream that has been studied by detailed methods.</li>
                    <li class="firmlegendicon9">Base Flood Elevation Line; Elevation in Feet*</li>
                    <li class="dfirmlegendicon3">1-percent-annual-chance Flood Hazard Area (Zones A, AE, AO, AH, AR, A99, V, and VE)</li>
                    <li class="dfirmlegendicon8">Floodway Area</li>
                    <li class="notshaded">Flood Zone X</li>
                    <li class="notshaded">0.2-percent-annual-chance Flood Hazard Area (shaded Zone X)</li>
                    <li class="notshaded">Flood Zone X: Area with Reduced Flood Risk due to Levee</li>
                    <li class="dfirmlegendicon5">Zone D Area Not Included</li>
                    <li style="padding-left: 0;">*Referenced to the North American Vertical Datum of 1988.</li>
                    <%--<li class="dfirmlegendicon9">Floodway symbol and note for the following special floodway types: Area of Special Consideration Density Fringe Area</li>--%>
                    <%--<li class="dfirmlegendicon10">Future-Conditions 1% Annual Chance Flood Hazard</li>--%>
                    <%--<li class="dfirmlegendicon11">Zone Designation (A, AE, AO, AH, AR, A99, D, V, and VE)</li>
                    <li class="dfirmlegendicon12">Zone designation with Static BFE</li>--%>
                    <%--<li class="dfirmlegendicon13">Zone designation with Depth.</li>
                    <li class="dfirmlegendicon14">Zone designation with Depth and Velocity.</li>--%>
                    <%--<li class="dfirmlegendicon15">Zone X – Protected by Accredited Levee</li>--%>
                </ul>

                <h3 style="margin-top: 50px;">Proposed FIRM (Digital)</h3>
                <p style="font-style: italic;">Used for Preliminary FIRM and Future FIRM</p>
                <ul>
                    <%--<li class="pdfirmlegendicon1">All flood hazard lines coded as SFHA / FLOOD ZONE BOUNDARY. Lines coded as OTHER BOUNDARY indicate different source citations, apparent limits, or end of spatial extent and are not symbolized.</li>--%>
                    <li class="pdfirmlegendicon2">The Limit of Study line is used to indicate the terminus of a 1- percent-annual-chance floodplain of a stream or backwater area that has not been independently studied by detailed analyses, or of a stream that has been studied by detailed methods.</li>
                    <li class="firmlegendicon9">Base Flood Elevation Line; Elevation in Feet*</li>
                    <li class="pdfirmlegendicon3">1-percent-annual-chance Flood Hazard Area (Zones A, AE, AO, AH, AR, A99, V, and VE)</li>
                    <li class="pdfirmlegendicon8">Floodway Area</li>
                    <li class="notshaded">Flood Zone X</li>
                    <li class="notshaded">0.2-percent-annual-chance Flood Hazard Area (shaded Zone X)</li>
                    <li class="notshaded">Flood Zone X: Area with Reduced Flood Risk due to Levee</li>
                    <li class="pdfirmlegendicon5">Zone D Area Not Included</li>
                    <li class="pdfirmlegendseclusion">Seclusion Area: <span class="pdfirmseclusionNote">The levee, dike or other structure that impacts flood  hazard areas inside this boundary has not been shown to comply with Section 65.10 of the NFIP Regulations. As such, these FIRM panels will be revised at a later date to update the flood hazard information associated with this structure.</span></li>
                    <li style="padding-left: 0;">*Referenced to the North American Vertical Datum of 1988.</li>

                    <%--<li class="pdfirmlegendicon9">Floodway symbol and note for the following special floodway types: Area of Special Consideration Density Fringe Area</li>--%>
                    <%--<li class="pdfirmlegendicon10">Future-Conditions 1% Annual Chance Flood Hazard</li>--%>
                    <%--<li class="pdfirmlegendicon11">Zone Designation (A, AE, AO, AH, AR, A99, D, V, and VE)</li>
                    <li class="pdfirmlegendicon12">Zone designation with Static BFE</li>--%>
                    <%--<li class="pdfirmlegendicon13">Zone designation with Depth.</li>
                    <li class="pdfirmlegendicon14">Zone designation with Depth and Velocity.</li>--%>
                    <%--<li class="pdfirmlegendicon15">Zone X – Protected by Accredited Levee</li>--%>
                </ul>
                <h3 style="margin-top: 50px;">FIRM (Scanned paper or Grayscale)</h3>
                <p style="font-style: italic;">May be an Effective FIRM or Historical FIRM</p>
                <ul>
                    <li class="firmlegendicon1">SPECIAL FLOOD HAZARD AREAS INUNDATED BY 100-YEAR FLOOD:
				<ul style="margin-top: 30px;">
                    <li style="padding-left: 0; margin-left: -85px;">ZONE A - No base flood elevations determined.</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE AE - Base flood elevation determined</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE AH - Flood depths of 1 to 3 feet (usually areas of ponding); base flood elevations determined</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE AO - Flood depths of 1 to 3 feet (usually sheet flow on sloping terrain); average depths determined. For areas of alluvial fan flooding; velocities also determined.</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE A99 - To be protected from 100-year flood by federal flood protection system under construction; no base flood elevations determined.</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE V - Coastal flood with velocity hazard (wave action); no base flood elevations determined.</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE VE - Coastal flood with velocity hazard (wave action); base flood elevations determined.</li>
                </ul>
                    </li>
                    <li class="firmlegendicon2">FLOODWAY AREAS IN ZONE AE</li>
                    <li class="firmlegendicon3">OTHER FLOOD AREAS:
				<ul style="margin-top: 30px;">
                    <li style="padding-left: 0; margin-left: -85px;">ZONE X - Areas of 500-year flood; or 100-year flood with average depths of less than 1 foot or with drainage areas less than 1 square mile; and areas protected by levees from 100-year flood.</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE B - Areas of 500-year flood as listed on older maps.</li>
                </ul>
                    </li>
                    <li class="firmlegendicon4">OTHER AREAS:
				<ul style="margin-top: 30px;">
                    <li style="padding-left: 0; margin-left: -85px;">ZONE X - Areas determined to be outside 500-year floodplain.</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE C - Areas determined to be outside 500-year floodplain as listed on older maps.</li>
                    <li style="padding-left: 0; margin-left: -85px;">ZONE D - Areas in whichflood hazards are undetermined.</li>
                </ul>
                    </li>
                    <li class="firmlegendicon5">Floodplain Boundary</li>
                    <li class="firmlegendicon6">Floodway Boundary</li>
                    <li class="firmlegendicon7">Zone D Boundary</li>
                    <li class="firmlegendicon8">Boundary Dividing Special Flood Hazard Zones.</li>
                    <li class="firmlegendicon9">Base Flood Elevation Line; Elevation in Feet*</li>
                    <li class="firmlegendicon10">Cross Section Line</li>
                    <li class="firmlegendicon11">Base Flood Elevation in Feet Where Uniform Within Zone*</li>
                    <li class="firmlegendicon12">Elevation Reference Mark</li>
                    <li class="firmlegendicon13">Stream Distance Marker (shown at approximate 5000 foot intervals)</li>
                    <li style="padding-left: 0;">*Referenced to the National Geodetic Vertical Datum of 1929 on older maps.</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="panelheader-wrap print-header">
        <h2>Print</h2>
        <div class='floodmap_close floodmap_hide'>
        </div>
    </div>
    <div class='floodmap_right_content panelcontent-print'>
        <div class='*floodmap_panel_container floodmap_container'>
            <div class='floodmap_print floodmap_panel floodmap_panel_print'>
                <input id="txtPrintTitle" style="width: 16em; padding: 3px;" class="toolDivText dijit dijitReset dijitLeft dijitTextBox" placeholder="Title Your Map" onkeypress='return searchKeyPress(event,this);' />
                <button id="btnPreview" class="ui-button-primary" type="button" onclick="newPrint();" title="Preview Map">
                    <%--<button id="btnPreview" class="ui-button-primary" type="button" onclick="openPreview()" title="Preview Map">--%>
                    Preview</button>
            </div>
        </div>
    </div>

    <div class="panelheader-wrap points-header">
        <h2>Points</h2>
        <div class='floodmap_close floodmap_hide'>
        </div>
    </div>
    <div class='floodmap_right_content panelcontent-points bottomSpacer'>
        <div class='*floodmap_panel_container floodmap_container'>
            <div class='floodmap_points floodmap_panel floodmap_panel_points'>

                <a id="floodInsStudyText_ob-Link">Flood Insurance Study Text</a>
                <%-- <div id="documents">
                <p>
                    <a href="http://www.fema.gov/media/fhm/firm/ot_firm.htm" title="What's my new Zone and Base Flood Elevation?" target="_blank">What's my new Zone and Base Flood Elevation?</a>
                </p>
               <p>
                    <a href="http://www.fema.gov/region-vi/region-6-contact-us" title="Map Questions?" target="_blank">Map Questions?</a>
                </p>
            </div>--%>

                <br />
                <div id="mapPoints">
                    <h4>Click Map to add Point</h4>
                </div>
                <div id="clearPoints">
                </div>
                <%--<a id="floodInsStudyText">Flood Insurance Study Text</a>--%>
            </div>
        </div>
    </div>

    <div class="panelheader-wrap layers-header">
        <h2>Layers</h2>
        <div class='floodmap_close floodmap_hide'>
        </div>
    </div>
    <div class='floodmap_right_content panelcontent-layers'>
        <div class='*floodmap_panel_container floodmap_container'>
            <div class='floodmap_settings floodmap_panel floodmap_panel_settings'>

                <%-- <div id="selectwrrap">
			<select id="parishes" name="parishes">
				<option value="0">-- Select Parish --</option>
			</select>
		</div>
		<button type="submit" name="Go" value="Go" onclick="reloadFIPS (parishes.value)" class="ui-button-primary" title="Locate Parish">Go</button>--%>
                <div id="layersWrap format">
                    <h2 id="layersTitle" style="display: none;"></h2>
                    <div id="layersContainer">
                        <div id="pdfirmDIV" style="display: none;">
                            <div class="icon-question layerQuestion">?</div>
                            <input type="checkbox" id="cbPDFIRM" onchange="checkedChanged(this);" class="css-checkbox lrg" />
                            <label id="lblPDFIRM" for="cbPDFIRM" class="css-label lrg web-two-style">Preliminary DFIRM</label>
                            <div id="pdfirmDIV_slider" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region:'bottom'" style="background-color: #EEEEEE;"></div>
                            <div class="slider-track"></div>
                        </div>
                        <div id="dfirmDIV" style="display: none;">
                            <div class="icon-question layerQuestion">?</div>
                            <input type="checkbox" id="cbDFIRM" onchange="checkedChanged(this);" class="css-checkbox lrg" />
                            <label id="lblDFIRM" for="cbDFIRM" class="css-label lrg web-two-style">DFIRM</label>
                            <div id="dfirmDIV_slider" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region:'bottom'" style="background-color: #EEEEEE;"></div>
                            <div class="slider-track"></div>
                        </div>
                        <div id="abfeDIV" style="display: none;">
                            <div class="icon-question layerQuestion">?</div>
                            <input type="checkbox" id="cbABFE" onchange="checkedChanged(this);" class="css-checkbox lrg" />
                            <label for="cbABFE" class="css-label lrg web-two-style">ABFE</label>
                        </div>
                        <div id="firmDIV" style="display: none;">
                            <div class="icon-question layerQuestion">?</div>
                            <input type="checkbox" id="cbFIRM" onchange="checkedChanged(this);" class="css-checkbox lrg" />
                            <label id="lblScannedFIRM" for="cbFIRM" class="css-label lrg web-two-style">Effective FIRM</label>
                            <div id="firmDIV_slider" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region:'bottom'" style="background-color: #EEEEEE;"></div>
                            <div class="slider-track"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<h2 align="center">Basemaps</h2>-->
            <div id="basemapButtons">
                <div>
                    <fieldset id="radioset">
                        <legend></legend>
                        <input id="rdbStreet" name="baseLayers" value="roadsLayer" type="radio" onclick="toggleBaseLayers(this.value);" />
                        <label for="rdbStreet" class="radiostyle roads basemap-active" title="Roads Base Layer">Roads </label>
                        <input id="rdbAerial" name="baseLayers" value="aerialLayer" type="radio" onclick="toggleBaseLayers(this.value);" />
                        <label for="rdbAerial" class="radiostyle aerial" title="Aerial Base Layer">Aerial </label>
                        <input id="rdbHybrid" name="baseLayers" value="hybridLayer" type="radio" onclick="toggleBaseLayers(this.value);" />
                        <label for="rdbHybrid" class="radiostyle hybrid" title="Hybrid Base Layer">Hybrid </label>
                    </fieldset>
                </div>
            </div>
            <a href="http://www.lsuagcenter.com/floodmaps" class="greyBoxBtn fancybox fancybox.iframe">View State Map Index</a>
        </div>
    </div>

    <div id="modal" onclick="return false;" style="display: none;"></div>

    <!-- START FOOTER -->
    <footer style="padding: 0px;">
        <div style="text-align: center;">
            <span class="copyright pull-left">&copy; LSUAgCenter 2016</span>
            <span class="map-updates"><a target="_blank" href="http://apps.lsuagcenter.com/floodzone/Map-Update-Signup.html">Sign up for map updates</a></span>
            <span class="feedback pull-right"><a href="../../forms/feedback/general" target="_blank">Feedback?</a></span>
        </div>
    </footer>
    <!-- START FOOTER -->
    

    <script src="fancyBox/jquery.fancybox.pack.js"></script>
    <script type="text/javascript">
    
        $(document).ready(function () {
            $('.fancybox').fancybox();

            if (jQuery.support.leadingWhitespace) {
                //$("<link rel='stylesheet' type='text/css' href='floodmap_style/page.css' />").appendTo('head');
            }
            else {
                $("<link rel='stylesheet' type='text/css' href='floodmap_style/pageIE7-8.css' />").appendTo('head');
            }
        });

    </script>
    <script type="text/javascript">var djConfig = { parseOnLoad: true };</script>
    <%--<script type='text/javascript' src="floodmap_javascript/customizeUserExperience.js"></script>
    <script type='text/javascript' src='floodmap_javascript/page.js'></script>--%>

</body>
</html>
