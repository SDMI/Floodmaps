//This file has to be updated whenever a flood map (DFIRM or FIRM) is published to ArcGIS server as a service in order to show it on the flood maps website.
// The default Parish object Template
//======================================================================================================================================================================
//                "FIPS": 22001,
//                "name": "Acadia",
//                "host": "LSU AgCenter",
//                "extension": { "xmin": -92.64972948614063, "ymin": 30.071131857398434, "xmax": -92.16221117559375, "ymax": 30.47625270700781 },
//                "DFIRM":
//                            {
//                                "id": 0,
//                                "exist": "false",
//                                "layerType": "Tiled",
//                                "url": ""                                
//                            },
//                "ABFE":
//                            {
//                                "id": 1,
//                                "exist": "false",
//                                "layerType": "Tiled",
//                                "url": ""
//                            },
//                "FIRM":
//                            {
//                                "id": 2,
//                                "exist": "false",
//                                "layerType": "Dynamic",
//                                "url": ""
//                            },

//                "queryTaskLayer": "",
//                "FIRMPanelLayer": "",
//                "meetings": ["Scoping Meeting: TBD", "Scoping Meeting Follow Up:TBD", "Final Community Officials Meeting: TBD", "Flood Map Open House Meeting: TBD"],
//                "events": ["Preliminary DFIRM and FIS delivery: TBD", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
//                "documents": ["http://maps.lsuagcenter.com/la_floodmaps/documents/fis/"]
//=======================================================================================================================================================================================
//An email will be sent from GIS Analyst when he/she publish any maps to ArcGIS server as a service
//The format of the email will look like.
//================================================================================================
//********Subject: DFIRM map has Published to ArcGIS server**********
//***********************************************************************
// "FIPS":<Parish FIPS code>
// "name":"<Parish Name>"
// "DFIRM": url="<Some URL to Map Service>"
// "EffectiveDate": "mm/dd/yyyy"
// "queryTaskLayer": "<queryTaskLayerURL>",
// "FIRMPanelLayer": "<FIRMPanelLayerURL>"

//********OR***********
//================================================================================================
//********Subject: FIRM map has Published to ArcGIS server**********
//***********************************************************************
// "FIPS":<Parish FIPS code>
// "name":"<Parish Name>"
// "FIRM": url="<Some URL to Map Service>"

//Search for the parish that has <Parish FIPS Code> (from the email) then change the attributes that mentioned in the email.
//and also change 'exist' attribute to true.
//For example, the above mentioned template should look like
//======================================================================================================================================================================
//                "FIPS": 22001,
//                "name": "Acadia",
//                "host": "LSU AgCenter",
//                "extension": { "xmin": -92.64972948614063, "ymin": 30.071131857398434, "xmax": -92.16221117559375, "ymax": 30.47625270700781 },
////DFIRMs are used for both preliminary maps and effective maps. The program uses the Effective Date to determine if it is Preliminary
//                "DFIRM":
//                            {
//                                "id": 0,
//                                "exist": "true",
//                                "layerType": "Tiled",
//                                "url": "<Some URL to Map Service>",
//                                "EffectiveDate":"mm/dd/yyyy or Preliminary"
//                                ,"Date":"mm/dd/yyyy" //
//                            },
//                "ABFE":
//                            {
//                                "id": 1,
//                                "exist": "false",
//                                "layerType": "Tiled",
//                                "url": "<Some URL to Map Service>"
//                            },
//                "FIRM":
//                            {
//                                "id": 2,
//                                "exist": "true",
//                                "layerType": "Dynamic",
//                                "url": "<Some URL to Map Service>"
//                            },
////Partial DFIRMS (PDFIRM) are used when there is a current DFIRM and you are adding a partial map revision
//                "PDFIRM":
//                            {
//                                "id": 3,
//                                "exist": "true",
//                                "layerType": "Tiled",
//                                "url": "<Some URL to Map Service>",
//                                "EffectiveDate":"Preliminary, or PMR Issued, or Draft Preliminary",
//                                "Date": "mm/dd/yyyy"
//                            },
//                "pmrQueryTaskLayer": "<preliminaryQueryTaskLayerURL>",
//                "queryTaskLayer": "<queryTaskLayerURL>",
//                "FIRMPanelLayer": "<FIRMPanelLayerURL>",
//                "meetings": ["Scoping Meeting: TBD", "Scoping Meeting Follow Up:TBD", "Final Community Officials Meeting: TBD", "Flood Map Open House Meeting: TBD"],
//                "events": ["Preliminary DFIRM and FIS delivery: TBD", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
//                "documents": ["http://maps.lsuagcenter.com/la_floodmaps/documents/fis/"]
//****************************************************************************************************************************************************************************************
//*****************NOTES**************************************//
// If any parish has Effective Data available to download on  //
// FEMA MSC Center, its EFFECTIVE DFIRM map is created and published
// to ArcGIS Server. In that case this effective DFIRM layer is displayed as ADOPTED DFIRM
// until Effective Date and Effecetive FIRM as Effective. Once Effective Date has reached ADOTED DFIRM 
// becomes EFFECTIVE DFIRM and Effective FIRM becomes ARCHIVED FIRM.       

var parishLayersDetails = {
  "Parishes":
      [
         //{
      //    "FIPS": 220330,
      //    "name": "East Baton Rouge_TEST_Symbology",
      //    "host": "LSU AgCenter",
      //    "extension": { "xmin": -91.33205675664844, "ymin": 30.310084494117184, "xmax": -90.84453844610156, "ymax": 30.71520534372656 },
      //    "DFIRM":
      //                {
      //                    "id": 3,
      //                    "exist": "true",
      //                    "layerType": "Tiled",
      //                    "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/TEST_EBR_EFF_DFIRM/MapServer",
      //                    "EffectiveDate": "06/19/2012"
      //                },
      //    "PDFIRM":
      //                {
      //                    "id": 0,
      //                    "exist": "true",
      //                    "layerType": "Tiled",
      //                    "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/TEST_EBR_PRE_DFIRM_PMR/MapServer",
      //                    "EffectiveDate": "Preliminary",
      //                    "Date": "06/20/2013"
      //                },
      //    "ABFE":
      //                {
      //                    "id": 1,
      //                    "exist": "false",
      //                    "layerType": "Tiled",
      //                    "url": ""
      //                },
      //    "FIRM":
      //                {
      //                    "id": 2,
      //                    "exist": "true",
      //                    "layerType": "Dynamic",
      //                    "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/EBR_ARCH_FIRM/MapServer"

      //                },

      //    "pmrQueryTaskLayer": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/TEST_EBR_PRE_DFIRM_PMR/MapServer/10",
      //    "pmrFIRMPanelLayer": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/TEST_EBR_PRE_DFIRM_PMR/MapServer/12",
      //    "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/TEST_EBR_EFF_DFIRM/MapServer/10",
      //    "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/TEST_EBR_EFF_DFIRM/MapServer/13",
      //    "meetings": ["CCO Meeting: 09/19/2006", "PMR CCO Meeting for EBR and Cities of Central and Zachary: 11/22/2010"],
      //    "events": ["Preliminary DFIRM and FIS delivery: 08/14/2006", "90 Day Community Appeal Start Date: 11/16/2006", "90 Day Community Appeal End Date: 02/14/2007", "Letter of Final Determination Date: 11/02/2007", "Study Effective Date: 05/02/08", "PMR 90 Day Community Appeal Start Date: 06/08/2010", "PMR 90 Day Community End Date: 09/05/2011", "PMR Effective Date: 06/19/2012"],
      //    "documents": ["http://maps.lsuagcenter.com/la_floodmaps/documents/fis/EastBatonRouge_FIS.pdf"]

      //},
          //{
          //    "FIPS": 220010,
          //    "name": "Acadia_testDFIRM",
          //    "host": "LSU AgCenter",
          //    "extension": { "xmin": -92.64972948614063, "ymin": 30.071131857398434, "xmax": -92.16221117559375, "ymax": 30.47625270700781 },
          //    "DFIRM":
          //                {
          //                    "id": 0,
          //                    "exist": "true",
          //                    "layerType": "Dynamic",
          //                    "url": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/new_symbology_template_eff_Acadia/MapServer",
          //                    "EffectiveDate": "11/26/2010"
          //                },
          //    "ABFE":
          //                {
          //                    "id": 1,
          //                    "exist": "false",
          //                    "layerType": "Tiled",
          //                    "url": ""
          //                },
          //    "FIRM":
          //                {
          //                    "id": 2,
          //                    "exist": "true",
          //                    "layerType": "Dynamic",
          //                    "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Acadia_EFF_FIRM/MapServer"
          //                },
          //    "PDFIRM":
          //                {
          //                    "id": 3,
          //                    "exist": "true",
          //                    "layerType": "Dynamic",
          //                    "url": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/new_symbology_template_pre_Acadia/MapServer",
          //                    "EffectiveDate": "Preliminary",
          //                    "Date":"11/26/2012"
          //                },
          //    "pmrQueryTaskLayer": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/new_symbology_template_pre_Acadia/MapServer/10",
          //    "pmrFIRMPanelLayer": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/new_symbology_template_pre_Acadia/MapServer/12",
          //    "queryTaskLayer": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/new_symbology_template_eff_Acadia/MapServer/10",
          //    "FIRMPanelLayer": "http://gaia.agcenter.lsu/ArcGIS/rest/services/LAFloodMaps/new_symbology_template_eff_Acadia/MapServer/12",
          //    "meetings": ["CCO Meeting: 11/20/2008"],
          //    "events": ["Preliminary DFIRM and FIS delivery: 07/31/2008", "90 Day Community Appeal Start Date: 09/06/2009", "90 Day Community Appeal End Date: 12/05/2009", "Letter of Final Determination Date: 05/26/2010", "Study Effective Date: 11/26/2010"],
          //    "documents": ["http://maps.lsuagcenter.com/la_floodmaps/documents/fis/acadia_FIS.pdf"]

          //},
          {
            "FIPS": 22001,
            "name": "Acadia",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.64972948614063, "ymin": 30.071131857398434, "xmax": -92.16221117559375, "ymax": 30.47625270700781 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Acadia_EFF_DFIRM/MapServer",
                          "EffectiveDate": "11/26/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Acadia_EFF_FIRM/MapServer",
                          "Date": "11/5/1980-1/20/1999"
                        },

            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Acadia_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Acadia_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 11/20/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/31/2008", "90 Day Community Appeal Start Date: 09/06/2009", "90 Day Community Appeal End Date: 12/05/2009", "Letter of Final Determination Date: 05/26/2010", "Study Effective Date: 11/26/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Acadia_FIS.pdf"]

          },
          {
            "FIPS": 22003,
            "name": "Allen",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.36109423223438, "ymin": 30.250346334937497, "xmax": -92.38605761114063, "ymax": 31.060588034156247 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Allen_EFF_DFIRM/MapServer",
                          "EffectiveDate": "03/17/2011"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Allen_ARCH_FIRM/MapServer",
                          "Date": "10/12/1982-1/3/1990"
                        },

            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Allen_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Allen_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 12/09/2008"],
            "events": ["Preliminary DFIRM issued Date: 09/30/2009", "90 Day Community Appeal Start Date: 06/25/2009", "90 Day Community Appeal End Date: 09/23/2009", "Letter of Final Determination Date: 09/17/2010", "Current Effective FIRM Date: 03/17/2011 "],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Allen_FIS.pdf"]

          },
          {
            "FIPS": 22005,
            "name": "Ascension",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.12468981328907, "ymin": 30.006243856910153, "xmax": -90.63717150274219, "ymax": 30.41479793405859 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Ascension_EFF_DFIRM/MapServer",
                          "EffectiveDate": "08/16/2007"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Ascension_ARCH_FIRM/MapServer",
                          "Date": "Varies" //"6/1/1978-1/20/1993"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Ascension_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Ascension_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 12/09/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 02/03/2006", "90 Day Community Appeal Start Date: 04/20/2006", "90 Day Community Appeal End Date: 07/19/2006", "Letter of Final Determination Date: 02/16/2007", "Study Effective Date: 08/16/2007"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Ascension_FIS.pdf"]

          },
          {
            "FIPS": 22007,
            "name": "Assumption",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.53805040899219, "ymin": 29.477870138648434, "xmax": -90.56301378789844, "ymax": 30.288111837867184 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Assumption_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "7/28/2009"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Assumption_EFF_FIRM/MapServer",
                          "Date": "11/05/1997"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["CCO Meeting: 09/23/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/28/2009", "90 Day Community Appeal Start Date: 03/02/2010", "90 Day Community Appeal End Date: 05/31/2010", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Assumption_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22009,
            "name": "Avoyelles",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.48218798223438, "ymin": 30.658213766578122, "xmax": -91.50715136114063, "ymax": 31.468455465796872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Avoyelles_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "09/30/2009"

                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Avoyelles_EFF_FIRM/MapServer",
                          "Date": "5/26/1976-6/16/1980"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Avoyelles_PRE_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Avoyelles_PRE_DFIRM/MapServer/13",
            "meetings": ["Final Community Officials Meeting: 11/17/2009", "Flood Map Open House Meeting: 02/08/2010"],
            "events": ["Preliminary DFIRM issued: 09/30/2009", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Avoyelles_FIS.pdf"]

          },
          {
              "FIPS": 22011,
              "name": "Beauregard",
              "host": "LSU AgCenter",
              "extension": { "xmin": -93.83762621465625, "ymin": 30.255152853492184, "xmax": -92.8625895935625, "ymax": 31.065394552710934 },
              "DFIRM":
                          {
                              "id": 0,
                              "exist": "true",
                              "layerType": "Dynamic",
                              "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Beauregard_PRE_01292016/MapServer",
                              "femaSchemaVersion": 2,
                              "EffectiveDate": "Preliminary",
                              "Date": "02/29/2016"
                          },
              "ABFE":
                         {
                             "id": 1,
                             "exist": "true",
                             "layerType": "Dynamic",
                             "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloodMaps/Calcasieu_ABFE/MapServer"
                         },
              "FIRM":
                          {
                              "id": 2,
                              "exist": "true",
                              "layerType": "Tiled",
                              "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Beauregard_EFF_DFIRM/MapServer",
                              "Date": "02/18/2011", //"4/16/1976-4/21/1999"
                              "hybrid": true,                              
                              "qtFloodLayerURL": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Beauregard_EFF_DFIRM/MapServer/10",
                              "qtPanelLayerURL": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Beauregard_EFF_DFIRM/MapServer/13"

                          },
              "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Beauregard_PRE_01292016/MapServer/2",
              "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Beauregard_PRE_01292016/MapServer/3",
              "meetings": ["Community Officials Meeting: 06/16/2008", "Flood Map Open House Meeting: 06/25/2008"],
              "events": ["Preliminary DFIRM and FIS delivery: 04/30/2008", "90 Day Community Appeal Start Date: 10/31/2008", "90 Day Community Appeal End Date: 01/29/2009", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
              "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/st_tammany_FIS_pre.pdf"]

          },
          //{
          //  "FIPS": 22011,
          //  "name": "Beauregard",
          //  "host": "LSU AgCenter",
          //  "extension": { "xmin": -93.83762621465625, "ymin": 30.255152853492184, "xmax": -92.8625895935625, "ymax": 31.065394552710934 },
          //  "DFIRM":
          //  {
          //    "id": 0,
          //    "exist": "true",
          //    "layerType": "Tiled",
          //    "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Beauregard_EFF_DFIRM/MapServer",
          //    "EffectiveDate": "11/26/2010"
          //  },
          //  "ABFE":
          //  {
          //    "id": 1,
          //    "exist": "false",
          //    "layerType": "Tiled",
          //    "url": ""
          //  },
          //  "FIRM":
          //  {
          //    "id": 2,
          //    "exist": "true",
          //    "layerType": "Dynamic",
          //    "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Beauregard_EFF_FIRM/MapServer",
          //    "Date": "Varies" //"10/19/1982-10/16/1992"

          //  },
          //  "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Beauregard_EFF_DFIRM/MapServer/10",
          //  "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Beauregard_EFF_DFIRM/MapServer/13",
          //  "meetings": ["CCO Meeting: 06/24/2009"],
          //  "events": ["Preliminary DFIRM issued Date: 05/04/2009", "90 Day Community Appeal Start Date: 10/13/2009", "90 Day Community Appeal End Date: 01/13/10", "Letter of Final Determination Date: 05/26/2010", "Study Effective Date: 11/26/2010"],
          //  "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Beauregard_FIS.pdf"]

          //},
          {
            "FIPS": 22013,
            "name": "Bienville",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.32058214727344, "ymin": 32.17364040232031, "xmax": -92.83306383672656, "ymax": 32.578761251929684 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bienville_EFF_DFIRM/MapServer",
                          "EffectiveDate": "07/03/2006"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Bienville_ARCH_FIRM/MapServer",
                          "Date": "Varies" //"10/15/1985-3/1/1986"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bienville_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bienville_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 07/08/2005"],
            "events": ["Letter of Final Determination Date: 01/3/2006", "Study Effective Date: 07/03/2006"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Bienville_FIS.pdf"]

          },
          {
            "FIPS": 22015,
            "name": "Bossier",
            "host": "LSU AgCenter",
            "extension": { "xmin": -94.06971239629688, "ymin": 32.24573818064062, "xmax": -93.09467577520313, "ymax": 33.05597987985937 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bossier_EFF_DFIRM/MapServer",
                          "EffectiveDate": "03/19/2013"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Bossier_ARCH_FIRM/MapServer",
                          "Date": "Varies" //"6/26/1977-9/26/2008"
                        },
            //Removed PDFIRM 5/16/2013. LFD was issued on 9/19/2012, and PMR was incorporated into EFF_DFIRM
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bossier_PMR_DFIRM/MapServer",
            //                "EffectiveDate": "PMR Issued",
            //                "Date":"1/31/11"
            //            },

            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bossier_PMR_DFIRM/MapServer/10",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bossier_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Bossier_EFF_DFIRM/MapServer/13",
            "meetings": ["PMR CCO Meeting:03/29/2011"],
            "events": ["Study Effective Date: 03/19/2013",
                       "PMR LFD: 09/19/2012",
                       "PMR 90 Day Community Appeal End Date: 12/12/2011",
                       "PMR 90 Day Community Appeal Start Date: 09/14/2011",
                       "PMR Preliminary DFIRM Issue: 01/31/2011"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Bossier_FIS.pdf"]

          },
          {
            "FIPS": 22017,
            "name": "Caddo",
            "host": "LSU AgCenter",
            "extension": { "xmin": -94.29905199590625, "ymin": 32.21964565134375, "xmax": -93.3240153748125, "ymax": 33.0298873505625 },
            "DFIRM": //became effective
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Caddo_EFF_DFIRM/MapServer",
                          "EffectiveDate": "05/19/2014"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Caddo_Hybrid_EFF_FIRM/MapServer",
                          "Date": "Varies", //"6/16/1980-4/6/2000"
                          "hybrid": true,
                          "qtFloodLayerURL": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Caddo_Hybrid_EFF_FIRM/MapServer/10",
                          "qtPanelLayerURL": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Caddo_Hybrid_EFF_FIRM/MapServer/11"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Caddo_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Caddo_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 09/21/2011"],
            "events": ["Letter of Final Determination Date: 12/19/2013", "Study Effective Date: 05/19/2014"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Caddo_FIS.pdf"]

          },
          {
              "FIPS": 22019,
              "name": "Calcasieu",
              "host": "LSU AgCenter",
              "extension": { "xmin": -93.81428026739063, "ymin": 29.85827174997656, "xmax": -92.83924364629688, "ymax": 30.66851344919531 },
              "DFIRM":
                          {
                              "id": 0,
                              "exist": "true",
                              "layerType": "Dynamic",
                              "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Calcasieu_PRE_20160229/MapServer",
                              "femaSchemaVersion": 2,
                              "EffectiveDate": "Preliminary",
                              "Date": "02/29/2016"
                          },
              "ABFE":
                         {
                             "id": 1,
                             "exist": "true",
                             "layerType": "Dynamic",
                             "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloodMaps/Calcasieu_ABFE/MapServer"
                         },
              "FIRM":
                          {
                              "id": 2,
                              "exist": "true",
                              "layerType": "Tiled",
                              "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Calcasieu_EFF_DFIRM/MapServer",
                              "Date": "02/18/2011", //"4/16/1976-4/21/1999"
                              "hybrid": true,                              
                              "qtFloodLayerURL": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Calcasieu_EFF_DFIRM/MapServer/11",
                              "qtPanelLayerURL": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Calcasieu_EFF_DFIRM/MapServer/14"

                          },
              "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Calcasieu_PRE_20160229/MapServer/2",
              "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Calcasieu_PRE_20160229/MapServer/3",
              "meetings": ["Community Officials Meeting: 06/16/2008", "Flood Map Open House Meeting: 06/25/2008"],
              "events": ["Preliminary DFIRM and FIS delivery: 04/30/2008", "90 Day Community Appeal Start Date: 10/31/2008", "90 Day Community Appeal End Date: 01/29/2009", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
              "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/st_tammany_FIS_pre.pdf"]

          },
          //{
          //  "FIPS": 22019,
          //  "name": "Calcasieu",
          //  "host": "LSU AgCenter",
          //  "extension": { "xmin": -93.81428026739063, "ymin": 29.85827174997656, "xmax": -92.83924364629688, "ymax": 30.66851344919531 },            
          //  "DFIRM":
          //              {
          //                "id": 0,
          //                "exist": "true",
          //                "layerType": "Tiled",
          //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Calcasieu_EFF_DFIRM/MapServer",
          //                "EffectiveDate": "2/18/2011"
          //              },
          //  "ABFE":
          //              {
          //                "id": 1,
          //                "exist": "true",
          //                "layerType": "Dynamic",
          //                "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloodMaps/Calcasieu_ABFE/MapServer"
          //              },
          //  "FIRM":
          //              {
          //                "id": 2,
          //                "exist": "true",
          //                "layerType": "Dynamic",
          //                "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Calcasieu_EFF_FIRM/MapServer",
          //                "Date": "Varies" //"9/29/1978-9/21/1998"
          //              },
          //  "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Calcasieu_EFF_DFIRM/MapServer/11",
          //  "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Calcasieu_EFF_DFIRM/MapServer/14",
          //  "meetings": ["CCO Meeting: 06/18/2008", "Final Community Officials Meeting: 06/18/2008", "Flood Map Open House Meeting: 06/24/2008"],
          //  "events": ["Preliminary DFIRM and FIS delivery: 04/30/2008", "90 Day Community Appeal Start Date: 10/31/2008", "90 Day Community Appeal End Date: 01/29/2009", "Letter of Final Determination Date: 07/19/2010", "Study Effective Date: 02/18/2011"],
          //  "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Calcasieu_FIS.pdf"]

          //},
          {
            "FIPS": 22021,
            "name": "Caldwell",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.34211229864063, "ymin": 31.894175680640622, "xmax": -91.85459398809375, "ymax": 32.29929653025 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Caldwell_EFF_DFIRM/MapServer",
                          "EffectiveDate": "09/05/2012"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Caldwell_EFF_FIRM/MapServer",
                          "Date": "Varies" //"4/3/1978-11/1/2010"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Caldwell_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Caldwell_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 02/23/2011"],
            "events": ["Preliminary DFIRM and FIS delivery: 01/07/20011", "90 Day Community Appeal Start Date: N/A", "90 Day Community Appeal End Date: N/A", "Letter of Final Determination Date: 03/05/2012", "Study Effective Date: 09/05/2012"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Caldwell_FIS.pdf"]

          },
          {
            "FIPS": 22023,
            "name": "Cameron",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.604166742, "ymin": 29.353587301734372, "xmax": -92.62913012090625, "ymax": 30.163829000953122 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Cameron_EFF_DFIRM/MapServer",
                          "EffectiveDate": "11/16/2012"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Cameron_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Cameron_EFF_FIRM/MapServer",
                          "Date": "Varies" //"9/4/1970-4/16/1991"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Cameron_EFF_DFIRM/MapServer/9",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Cameron_EFF_DFIRM/MapServer/12",
            "meetings": ["Scoping Meeting: 02/14/2006", "Final Community Officials Meeting: 04/29/2008", "Flood Map Open House Meeting: 05/13/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 03/28/2008", "90 Day Community Appeal Start Date: 12/18/2008", "90 Day Community Appeal End Date: 03/19/2009", "Letter of Final Determination Date: 05/16/2012", "Study Effective Date: 11/16/2012"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Cameron_FIS.pdf"]

          },
          {
            "FIPS": 22025,
            "name": "Catahoula",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.31189989629688, "ymin": 31.215769918921872, "xmax": -91.33686327520313, "ymax": 32.02601161814062 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": "",
                          "Date": "9/9/9999"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Catahoula_EFF_FIRM/MapServer",
                          "Date": "1988-2005" //"4/5/1988-4/19/2005"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["N/A"],
            "events": ["Preliminary DFIRM and FIS delivery: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Catahoula_FIS.pdf"]

          },
          {
            "FIPS": 22027,
            "name": "Claiborne",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.47919725957813, "ymin": 32.52863612985937, "xmax": -92.50416063848438, "ymax": 33.33887782907812 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": "",
                          "Date": "9/9/9999"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Claiborne_EFF_FIRM/MapServer",
                          "Date": "1980-1992" //"2/21/1975-1/1/1992"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["Not currently being mapped."],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Claiborne-Homer_FIS.pdf"]

          },
          {
            "FIPS": 22029,
            "name": "Concordia",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.11414599004688, "ymin": 30.98437038278906, "xmax": -91.13910936895313, "ymax": 31.801478537085934 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Concordia_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "01/21/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Concordia_EFF_FIRM/MapServer",
                          "Date": "1977-1994" //"6/3/1977-6/2/1994"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Concordia_PRE_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Concordia_PRE_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 03/24/2010", "Flood Map Open House Meeting: 06/24/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 01/21/2010", "90 Day Community Appeal Start Date: 11/24/2010", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: 02/22/2011", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Concordia_Parish_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22031,
            "name": "De Soto",
            "host": "LSU AgCenter",
            "extension": { "xmin": -94.23176073614063, "ymin": 31.637370260718747, "xmax": -93.25672411504688, "ymax": 32.4476119599375 },
            "DFIRM": //this is actually effective DFIRM, but to keep the object name for all parishes same PRE_DFIRM is used
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/De_Soto_EFF_DFIRM/MapServer",
                          "EffectiveDate": "12/16/03"

                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/DeSoto_ARCH_FIRM/MapServer",
                          "Date": "Varies" //"3/23/1982-1/1/1992"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/De_Soto_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/De_Soto_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 12/03/2002"],
            "events": ["Letter of Final Determination Date: 06/16/2003", "Study Effective Date: 12/16/2003"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/DeSoto_FIS.pdf"]

          },
          {
            "FIPS": 22033,
            "name": "East Baton Rouge",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.33205675664844, "ymin": 30.310084494117184, "xmax": -90.84453844610156, "ymax": 30.71520534372656 },
            "DFIRM":
                        {
                          "id": 3,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/EBR_EFF_DFIRM/MapServer",
                          "EffectiveDate": "06/19/2012"
                        },
            //                "DFIRM":
            //                            {
            //                                "id": 0,
            //                                "exist": "true",
            //                                "layerType": "Tiled",
            //                                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/EBR_EFF_DFIRM/MapServer",
            //                                "EffectiveDate": "05/02/2008"
            //                            },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/EBR_ARCH_FIRM/MapServer",
                          "Date": "Date Varies"  //"10/19/1973-2/5/2008"

                        },


            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/EBR_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/EBR_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 09/19/2006", "PMR CCO Meeting for EBR and Cities of Central and Zachary: 11/22/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 08/14/2006", "90 Day Community Appeal Start Date: 11/16/2006", "90 Day Community Appeal End Date: 02/14/2007", "Letter of Final Determination Date: 11/02/2007", "Study Effective Date: 05/02/08", "PMR 90 Day Community Appeal Start Date: 06/08/2010", "PMR 90 Day Community End Date: 09/05/2011", "PMR Effective Date: 06/19/2012"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/EBR_FIS.pdf"]

          },
          {
            "FIPS": 22035,
            "name": "East Carroll",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.49135851446094, "ymin": 32.5355025849375, "xmax": -91.00384020391406, "ymax": 32.94062343454687 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": "",
                          "EffectiveDate": "",
                          "Date": "9/9/9999"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/East_Carroll_EFF_FIRM/MapServer",
                          "Date": "1979-1994" //"10/16/1979-11/15/1985"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["N/A"],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22037,
            "name": "East Feliciana",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.31969713750781, "ymin": 30.648600729468747, "xmax": -90.83217882696094, "ymax": 31.053721579078122 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/East_Feliciana_EFF_DFIRM/MapServer",
                          "EffectiveDate": "04/03/2012"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/East_Feliciana_EFF_FIRM/MapServer",
                          "Date": "Varies" // "12/4/1979-6/4/1980"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/East_Feliciana_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/East_Feliciana_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 09/24/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/31/2009", "90 Day Community Appeal Start Date: 03/03/2010", "90 Day Community Appeal End Date: 06/01/2010", "Letter of Final Determination Date: 10/03/2011", "Study Effective Date: 04/03/2012"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/East_Feliciana_FIS.pdf"]

          },
          {
            "FIPS": 22039,
            "name": "Evangeline",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.61951708379688, "ymin": 30.554530294898434, "xmax": -92.13199877325, "ymax": 30.95965114450781 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Evangeline_EFF_DFIRM/MapServer",
                          "EffectiveDate": "09/03/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Evangeline_EFF_FIRM/MapServer",
                          "Date": "Varies" // "6/25/1976-9/1/2008"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Evangeline_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Evangeline_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 12/09/2008", "Flood Map Open House Meeting: 06/02/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 08/29/2008", "90 Day Community Appeal Start Date: 07/30/2009", "90 Day Community Appeal End Date: 10/28/2009", "Letter of Final Determination Date: 03/03/2010", "Study Effective Date: 09/03/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Evangeline_FIS.pdf"]

          },
          {
            "FIPS": 22041,
            "name": "Franklin",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.1374919373125, "ymin": 31.743113668921872, "xmax": -91.16245531621875, "ymax": 32.55335536814062 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Franklin_EFF_DFIRM/MapServer",
                          "EffectiveDate": "09/02/2011"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Franklin_EFF_FIRM/MapServer",
                          "Date": "Varies" //"9/1/1978-9/1/1986"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Franklin_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Franklin_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 02/18/2010", "Flood Map Open House Meeting: 03/25/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 11/20/2009", "90 Day Community Appeal Start Date: 07/07/2010", "90 Day Community Appeal End Date: 10/05/2010", "Letter of Final Determination Date: 03/02/2011", "Study Effective Date: 09/02/2011"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Franklin_FIS.pdf"]

          },
          {
            "FIPS": 22043,
            "name": "Grant",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.05347704473438, "ymin": 31.175944479468747, "xmax": -92.07844042364063, "ymax": 31.986186178687497 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Grant_FUT_20160616/MapServer",
                          "EffectiveDate": "06/16/2016"                          
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Grant_EFF_FIRM/MapServer",
                          "Date": "1982-1995" //"5/4/1982-11/16/1995"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Grant_FUT_20160616/MapServer/4",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Grant_FUT_20160616/MapServer/5",
            "meetings": ["N/A"],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Grant_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22045,
            "name": "Iberia",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.18555712285938, "ymin": 29.328868063453122, "xmax": -91.21052050176563, "ymax": 30.139109762671872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Iberia_EFF_DFIRM/MapServer",
                          "EffectiveDate": "12/02/2011"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Iberia_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Iberia_Hybrid_HIST_FIRM/MapServer",
                          "Date": "Varies" // "6/30/1976-10/16/2003"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Iberia_EFF_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Iberia_EFF_DFIRM/MapServer/14",
            "meetings": ["Scoping Meeting: 03/31/2005", "Scoping Meeting Follow Up:08/03/2005", "Final Community Officials Meeting: 04/01/2008", "Flood Map Open House Meeting: 04/10/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 02/19/2008", "90 Day Community Appeal Start Date: 02/23/2009", "90 Day Community Appeal End Date: 05/04/2009", "Letter of Final Determination Date: 06/02/2011", "Study Effective Date: 12/02/2011"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Iberia_FIS.pdf"]

          },
          {
            "FIPS": 22047,
            "name": "Iberville",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.79897570196094, "ymin": 29.931056173804684, "xmax": -90.82393908086719, "ymax": 30.741297873023434 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Iberville_EFF_DFIRM/MapServer",
                          "EffectiveDate": "11/06/2013"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.agcenter.lsu.edu/ArcGIS/rest/services/LAFloods/Iberville_EFF_FIRM/MapServer",
                          "Date": "Date Varies" //"2/15/1978-8/5/1991"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Iberville_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Iberville_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 12/08/2008", "Flood Map Open House Meeting: 3/23-3/25/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 09/30/2008", "90 Day Community Appeal Start Date: 02/23/2009", "90 Day Community Appeal End Date: 05/04/2009", "Letter of Final Determination Date: 05/06/2013", "Study Effective Date: 11/06/2013"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Iberville_FIS.pdf"]

          },
          {
            "FIPS": 22049,
            "name": "Jackson",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.83169054571094, "ymin": 32.09398952341406, "xmax": -92.34417223516406, "ymax": 32.499110373023434 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jackson_EFF_FIRM/MapServer",
                          "Date": "1985" // "7/11/1975-10/15/1985"
                        },
            "queryTaskLayer": "",
            "meetings": ["N/A"],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22051,
            "name": "Jefferson",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.58344149175586, "ymin": 29.27994457102148, "xmax": -89.60840487066211, "ymax": 30.09018627024023 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Jefferson_PRE_02152016/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "02/15/2016"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jefferson_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jefferson_EFF_FIRM/MapServer",
                          "Date": "1995" //"8/14/1970-3/23/1995"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Jefferson_PRE_02152016/MapServer/3",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Jefferson_PRE_02152016/MapServer/5",
            "meetings": [], // old preDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/09/2012", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Jefferson_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22053,
            "name": "Jefferson Davis",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.09398912969531, "ymin": 30.060145529273434, "xmax": -92.60647081914844, "ymax": 30.46526637888281 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Jefferson_Davis_EFF_DFIRM/MapServer",
                          "EffectiveDate": "07/22/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jefferson_Davis_EFF_FIRM/MapServer",
                          "Date": "Varies" //"4/15/1981-6/15/1988"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Jefferson_Davis_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Jefferson_Davis_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 11/20/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/31/2008", "90 Day Community Appeal Start Date: 04/30/2009", "90 Day Community Appeal End Date: 07/29/2009", "Letter of Final Determination Date: 01/22/2010", "Study Effective Date: 07/22/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Jefferson_Davis_FIS.pdf"]

          },
          {
            "FIPS": 22055,
            "name": "Lafayette",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.33043932500781, "ymin": 30.008990438941403, "xmax": -91.84292101446094, "ymax": 30.414111288550778 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Lafayette_PRE_12192014/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "12/19/2014"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Dynamic",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Lafayette_EFF_FIRM/MapServer",
                          "Date": "1996-2010" //"9/30/1980-1/20/1999"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Lafayette_PRE_12192014/MapServer/3",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Lafayette_PRE_12192014/MapServer/5",
            "meetings": ["Scoping Meeting: 07/14/2004", "Scoping Meeting Follow Up:8/27/2004", "Final Community Officials Meeting: 12/18/2007", "Flood Map Open House Meeting: 02/21/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 09/28/2007", "90 Day Community Appeal Start Date: 10/20/2010", "90 Day Community Appeal End Date: 01/18/2011", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Lafayette_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22057,
            "name": "Lafourche",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.36020922246875, "ymin": 28.911387594703125, "xmax": -89.41013598028125, "ymax": 30.53187099314062 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lafourche_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "7/30/2008"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Lafourche_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Lafourche_EFF_FIRM/MapServer",
                          "Date": "1975-1992" //"7/11/1975-5/4/1992"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lafourche_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lafourche_PRE_DFIRM/MapServer/14",
            "meetings": ["Scoping Meeting: 12/08/2004", "Final Community Officials Meeting: 11/19/2008", "Flood Map Open House Meeting: 01/14/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/30/2008", "90 Day Community Appeal Start Date: 07/02/2009", "90 Day Community Appeal End Date: 09/30/2009", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Lafourche_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22059,
            "name": "La Salle",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.6428630310625, "ymin": 31.226756247046872, "xmax": -91.66782640996875, "ymax": 32.03699794626562 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": "",
                          "EffectiveDate": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/La_Salle_EFF_FIRM/MapServer",
                          "Date": "1985-1997" //"4/3/1979-3/1/1987"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["N/A"],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22061,
            "name": "Lincoln",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.8955485779375, "ymin": 32.39954677439062, "xmax": -92.40803026739063, "ymax": 32.804667624 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lincoln_EFF_DFIRM/MapServer",
                          "EffectiveDate": "04/02/2009"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Lincoln_ARCH_FIRM/MapServer",
                          "Date": "Varies" //"6/15/1981-11/22/1999"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lincoln_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lincoln_EFF_DFIRM/MapServer/13",
            "meetings": ["Final Community Officials Meeting: 05/07/2007"],
            "events": ["Preliminary DFIRM and FIS delivery: 03/30/2007", "90 Day Community Appeal Start Date: 07/06/2007", "90 Day Community Appeal End Date: 10/04/2007", "Letter of Final Determination Date: 10/02/2008", "Study Effective Date: 04/02/2009"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Lincoln_FIS.pdf"]

          },
          {
            "FIPS": 22063,
            "name": "Livingston",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.98736071172656, "ymin": 30.243479879859372, "xmax": -90.49984240117969, "ymax": 30.648600729468747 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Livingston_EFF_DFIRM/MapServer",
                          "EffectiveDate": "04/03/2012"
                        },
            "ABFE":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Livingston_EFF_FIRM/MapServer",
                          "Date": "Varies" //"12/2/1980-8/23/2001"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Livingston_EFF_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Livingston_EFF_DFIRM/MapServer/14",
            "meetings": ["Scoping Meeting: 07/12/2006", "Final Community Officials Meeting: 03/04/2008", "Flood Map Open House Meeting: 03/04/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 01/31/2008", "90 Day Community Appeal Start Date: 05/09/2008", "90 Day Community Appeal End Date: 08/06/2008", "Letter of Final Determination Date: 10/03/2011", "Study Effective Date: 04/03/2012"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Livingston_FIS.pdf"]

          },
          {
            "FIPS": 22065,
            "name": "Madison",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.51401781621875, "ymin": 32.17638698435156, "xmax": -91.02649950567188, "ymax": 32.581507833960934 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Madison_EFF_DFIRM/MapServer",
                          "EffectiveDate": "06/19/2012"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Madison_EFF_FIRM/MapServer",
                          "Date": "Varies" // "7/12/1977-3/4/1988"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Madison_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Madison_EFF_DFIRM/MapServer/13",
            "meetings": ["Final Community Officials Meeting: 02/19/2010", "Flood Map Open House Meeting: 04/21/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 11/24/2009", "90 Day Community Appeal Start Date: 8/17/2011", "90 Day Community Appeal End Date: 11/15/2011", "Letter of Final Determination Date: 12/19/2012", "Study Effective Date: 06/19/2012"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Madison_FIS.pdf"]

          },
          {
            "FIPS": 22067,
            "name": "Morehouse",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.26383471075, "ymin": 32.486064108375, "xmax": -91.28879808965625, "ymax": 33.29630580759375 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Morehouse_FUT_20160706/MapServer",
                          "EffectiveDate": "07/06/2016",                          
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Morehouse_EFF_FIRM/MapServer",
                          "Date": "1978-2007" //"6/27/1978-4/1/2007"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Morehouse_FUT_20160706/MapServer/4",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Morehouse_FUT_20160706/MapServer/5",
            "meetings": ["Final Community Officials Meeting: 03/23/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 01/25/2010", "90 Day Community Appeal Start Date: 11/25/2010", "90 Day Community Appeal End Date: 03/23/2011", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Morehouse_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22069,
            "name": "Natchitoches",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.53824877325, "ymin": 31.344859274390622, "xmax": -92.56321215215625, "ymax": 32.15510097360937 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Natchitoches_EFF_07062015/MapServer",
                          "EffectiveDate": "07/06/2015",
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Natchitoches_EFF_FIRM/MapServer",
                          "Date": "1982-1992" //"6/29/1982-12/8/1998"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Natchitoches_EFF_07062015/MapServer/6",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Natchitoches_EFF_07062015/MapServer/8",
            "meetings": ["CCO Meeting: 06/23/2009", "Flood Map Open House Meeting: 10/01/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 05/21/2009", "90 Day Community Appeal Start Date: 10/13/2009", "90 Day Community Appeal End Date: 01/14/2010", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Natchitoches_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22071,
            "name": "Orleans",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.14553331914844, "ymin": 29.858958395484372, "xmax": -89.65801500860156, "ymax": 30.264079245093747 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Orleans_PRE_12012014/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "12/01/2014"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Orleans_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Orleans_EFF_FIRM/MapServer",
                          "Date": "1984" //"10/19/1971-3/1/1984"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "Date": "11/09/12"
            //            },

            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Orleans_PRE_12012014/MapServer/3",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Orleans_PRE_12012014/MapServer/5",
            "meetings": [],
            //old preliminary and FIS delivery date was 11/13/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/09/12", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Orleans_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22073,
            "name": "Ouachita",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.41832995000781, "ymin": 32.26153102732031, "xmax": -91.93081163946094, "ymax": 32.666651876929684 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Ouachita_EFF_01202016/MapServer",
                          "EffectiveDate": "01/20/2016"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Ouachita_EFF_FIRM/MapServer",
                          "Date": "1994" //"12/1/1978-3/15/1994"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Ouachita_EFF_01202016/MapServer/6",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Ouachita_EFF_01202016/MapServer/8",
            "meetings": ["Final Community Officials Meeting: 11/18/2009", "Flood Map Open House Meeting: 01/14/2010"],
            "events": ["Preliminary DFIRM issued date: 08/07/2009", "90 Day Community Appeal Start Date: 07/08/2010", "90 Day Community Appeal End Date: 10/06/10", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Ouachita_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22075,
            "name": "Plaquemines",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.47357821050586, "ymin": 28.56720653391211, "xmax": -88.52350496831836, "ymax": 30.187689932349602 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Plaquemines_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "11/09/12"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Plaquemines_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Plaquemines_EFF_FIRM/MapServer",
                          "Date": "1993" //"5/1/1985-9/30/1993"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Plaquemines_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "DateIssued": "11/09/12"
            //            },
            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Plaquemines_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Plaquemines_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Plaquemines_PRE_DFIRM/MapServer/14",
            "meetings": [],
            //old PreDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/09/2012", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Plaquemines_FIS_PRE.pdf"]

          },
          {
            "FIPS": 22077,
            "name": "Pointe Coupee",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.84154772344531, "ymin": 30.546977194312497, "xmax": -91.35402941289844, "ymax": 30.952098043921872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/PointCoupee_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "5/29/2009"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/PointeCoupee_EFF_FIRM/MapServer",
                          "Date": "1995" //"4/15/1980-11/16/1995"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/PointCoupee_PRE_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/PointCoupee_PRE_DFIRM/MapServer/13",
            "meetings": ["Final Community Officials Meeting: 08/25/2009", "Flood Map Open House Meeting: 10/14/2009"],
            "events": ["Preliminary DFIRM Issued Date: 05/29/2009", "90 Day Community Appeal Start Date: 01/28/2010", "90 Day Community Appeal End Date: 04/28/2010", "Letter of Final Determination Date: TBD", "Date of Current FIRM:11/16/1995"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Pointe_Coupee_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22079,
            "name": "Rapides",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.00953173223438, "ymin": 30.76807704782812, "xmax": -92.03449511114063, "ymax": 31.578318747046872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Rapides_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "07/31/2007"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Rapides_EFF_FIRM/MapServer",
                          "Date": "1981-1999" //"7/17/1978-11/22/1999"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Rapides_PRE_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Rapides_PRE_DFIRM/MapServer/13",
            "meetings": ["Final Community Officials Meeting: 09/24/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/31/2007", "90 Day Community Appeal Start Date: 01/17/2008", "90 Day Community Appeal End Date: 04/15/2008", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22081,
            "name": "Red River",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.61583971563281, "ymin": 31.869456442359372, "xmax": -93.12832140508594, "ymax": 32.27457729196875 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Red_River_EFF_FIRM/MapServer",
                          "Date": "1981-1985" //"7/2/1981-5/15/1985"
                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["Scoping Meeting: TBD", "Scoping Meeting Follow Up:TBD", "Final Community Officials Meeting: TBD", "Flood Map Open House Meeting: TBD"],
            "events": ["Preliminary DFIRM and FIS delivery: TBD", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Red_River-Coushatta_FIS.pdf"]

          },
          {
            "FIPS": 22083,
            "name": "Richland",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.0276286560625, "ymin": 32.20316615915625, "xmax": -91.54011034551563, "ymax": 32.60828700876562 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Richland_EFF_DFIRM/MapServer",
                          "EffectiveDate": "09/18/2013"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Richland_EFF_FIRM/MapServer",
                          "Date": "Varies" //"10/9/1979-3/9/1999"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Richland_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Richland_EFF_DFIRM/MapServer/13",
            "meetings": ["Final Community Officials Meeting: 02/18/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 11/23/2009", "90 Day Community Appeal Start Date: 05/20/2010", "90 Day Community Appeal End Date: 08/19/2010", "Letter of Final Determination Date: 03/18/2013", "Study Effective Date: 09/18/2013"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Richland_FIS.pdf"]

          },
          {
            "FIPS": 22085,
            "name": "Sabine",
            "host": "LSU AgCenter",
            "extension": { "xmin": -94.0600993591875, "ymin": 31.105906637671872, "xmax": -93.08506273809375, "ymax": 31.916148336890622 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Sabine_EFF_FIRM/MapServer",
                          "Date": "1991" //"3/15/1982-8/5/1991"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["Scoping Meeting: TBD", "Scoping Meeting Follow Up:TBD", "Final Community Officials Meeting: TBD", "Flood Map Open House Meeting: TBD"],
            "events": ["Preliminary DFIRM and FIS delivery: TBD", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Sabine_FIS_FIRM.pdf"]

          },
          {
            "FIPS": 22087,
            "name": "St. Bernard",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.01850390020313, "ymin": 29.568507345679684, "xmax": -89.04346727910938, "ymax": 30.378749044898434 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/St_Bernard_PRE_09292015/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "09/29/2015"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Bernard_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Bernard_EFF_FIRM/MapServer",
                          "Date": "1987" //"8/31/1973-3/4/1987"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Bernard_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "Date": "11/09/12"
            //            },
            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Bernard_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/St_Bernard_PRE_09292015/MapServer/3",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/St_Bernard_PRE_09292015/MapServer/5",
            "meetings": [],
            //old PreDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/09/2012", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/St_Bernard_FIS_PRE.pdf"]

          },
          {
            "FIPS": 22089,
            "name": "St. Charles",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.57176851812305, "ymin": 29.758536489966793, "xmax": -90.08425020757617, "ymax": 30.16365733957617 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Charles_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "11/09/12"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Charles_ABFE_plus_Rita/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Charles_EFF_FIRM/MapServer",
                          "Date": "1992" //"5/2/1983-6/16/1992"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Charles_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "Date": "11/09/12"
            //            },
            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Charles_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Charles_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Charles_PRE_DFIRM/MapServer/14",
            "meetings": [],
            // old PreDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/09/2012", "90 Day Community Appeal Start Date: TBP", "90 Day Community Appeal End Date: TBP", "Letter of Final Determination Date: TBP", "Study Effective Date: TBP"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/St_Charles_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22091,
            "name": "St. Helena",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.967447992, "ymin": 30.62456813669531, "xmax": -90.47992968145313, "ymax": 31.029688986304684 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Helena_EFF_DFIRM/MapServer",
                          "EffectiveDate": "04/02/2013"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Helena_EFF_FIRM/MapServer",
                          "Date": "Varies" //"3/20/1979-9/27/1991"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Helena_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Helena_EFF_DFIRM/MapServer/13",
            "meetings": ["Scoping Meeting: TBD"],
            "events": ["Study Effective Date: 04/02/2013",
                       "Letter of Final Determination Date: 10/02/2012",
                       "Preliminary DFIRM and FIS issue: 03/14/2011"
            ],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/St_Helena_FIS.pdf"]

          },
          {
            "FIPS": 22093,
            "name": "St. James",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.94032549444141, "ymin": 29.907881887916012, "xmax": -90.69656633916797, "ymax": 30.11215892649023 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_James_EFF_DFIRM/MapServer",
                          "EffectiveDate": "07/04/2011"

                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_James_EFF_FIRM/MapServer",
                          "Date": "Varies" //"1/24/1978-7/13/1982"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_James_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_James_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting :8/20/09"],
            "events": ["Preliminary DFIRM and FIS delivery : 6/10/2009", "90 Day Community Appeal Start Date : 3/25/2010", "90 Day Community Appeal End Date : 6/23/10", "Letter of Final Determination Date : 01/04/2011", "Study Effective Date : 07/4/2011"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/St_James_FIS.pdf"]

          },
          {
            "FIPS": 22095,
            "name": "St. John the Baptist",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.79201006475391, "ymin": 29.95165553903906, "xmax": -90.30449175420704, "ymax": 30.360209616187497 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_John_the_Baptist_EFF_DFIRM/MapServer",
                          "EffectiveDate": "11/04/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_John_the_Baptist_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_John_the_Baptist_ARCH_FIRM/MapServer",
                          "Date": "Varies" //"7/16/1980-2/2/1983"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_John_the_Baptist_EFF_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_John_the_Baptist_EFF_DFIRM/MapServer/14",
            "meetings": ["Scoping Meeting: 08/09/2005", "Final Community Officials Meeting: 10/15/2008", "Flood Map Open House Meeting: 12/02/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/30/2008", "90 Day Community Appeal Start Date: 04/29/2009", "90 Day Community Appeal End Date: 07/28/2009", "Letter of Final Determination Date: 05/04/2010", "Study Effective Date: 11/04/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/St_John_The_Baptist_FIS.pdf"]

          },
          {
            "FIPS": 22097,
            "name": "St. Landry",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.50278734746875, "ymin": 30.185801657203122, "xmax": -91.527750726375, "ymax": 30.996043356421872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Landry_EFF_DFIRM/MapServer",
                          "EffectiveDate": "08/05/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Landry_EFF_FIRM/MapServer",
                          "Date": "Varies" //"6/25/1976-10/16/1991"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Landry_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Landry_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 11/21/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 09/30/2008", "90 Day Community Appeal Start Date: 06/24/2009", "90 Day Community Appeal End Date: 09/23/2009", "Letter of Final Determination Date: 02/05/2010", "Study Effective Date: 08/05/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/St_Landry_FIS.pdf"]

          },
          {
            "FIPS": 22099,
            "name": "St. Martin",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.04479479375782, "ymin": 29.69347682810156, "xmax": -91.07799791875782, "ymax": 30.49822536325781 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Martin_EFF_DFIRM/MapServer",
                          "EffectiveDate": "11/04/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Martin_EFF_FIRM/MapServer",
                          "Date": "Varies" //"7/16/1980-12/19/1997"
                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Martin_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Martin_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 12/08/2008", "Flood Map Open House Meeting: 06/29/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 09/30/2008", "90 Day Community Appeal Start Date: 06/24/2009", "90 Day Community Appeal End Date: 09/23/2009", "Letter of Final Determination Date: 05/04/2010", "Study Effective Date: 11/04/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/St_Martin_FIS.pdf"]

          },
          {
            "FIPS": 22101,
            "name": "St. Mary",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.90403246465625, "ymin": 29.229991110328122, "xmax": -90.9289958435625, "ymax": 30.040232809546872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/St_Mary_PRE_06302015/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "06/30/2015"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Mary_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Mary_EFF_FIRM/MapServer",
                          "Date": "1978-1999" //"12/15/1978-6/30/1999"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/St_Mary_PRE_06302015/MapServer/6",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/St_Mary_PRE_06302015/MapServer/8",
            "meetings": ["Scoping Meeting: 03/31/2005", "Scoping Meeting Follow Up:08/03/2005", "Final Community Officials Meeting: 04/28/2008", "Flood Map Open House Meeting: 05/06/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 03/31/2008", "For information on the Base Flood Elevations (BFE) changes, <a href='https://www.floodmaps.fema.gov/fhm/Scripts/bfe_srch.asp?state=LA' target='blank'>Click here</a>", "90 Day Community Appeal Dates: <label class='link' onClick='showCommunityAppealDates(\"22101\");'> Vary</label>"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22103,
            "name": "St. Tammany",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.4016520935625, "ymin": 30.040232809546872, "xmax": -89.42661547246875, "ymax": 30.850474508765622 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Tammany_PRE_HFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "04/30/2008"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Tammany_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Tammany_EFF_HFIRM/MapServer",
                          "Date": "1980-1999", //"4/16/1976-4/21/1999"
                          "hybrid": true,
                          "qtFloodLayerURL": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Tammany_EFF_HFIRM/MapServer/11",
                          "qtPanelLayerURL": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Tammany_EFF_HFIRM/MapServer/14"

                        },
            "queryTaskLayer": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Tammany_PRE_HFIRM/MapServer/11",
            "FIRMPanelLayer": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Tammany_PRE_HFIRM/MapServer/14",
            "meetings": ["Community Officials Meeting: 06/16/2008", "Flood Map Open House Meeting: 06/25/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 04/30/2008", "90 Day Community Appeal Start Date: 10/31/2008", "90 Day Community Appeal End Date: 01/29/2009", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/st_tammany_FIS_pre.pdf"]

          },
          {
            "FIPS": 22105,
            "name": "Tangipahoa",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.86445116582813, "ymin": 30.217387350562497, "xmax": -89.88941454473438, "ymax": 31.027629049781247 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Tangipahoa_EFF_DFIRM/MapServer",
                          "EffectiveDate": "07/22/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Tangipahoa_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Tangipahoa_EFF_FIRM/MapServer",
                          "Date": "Varies" //"6/28/1977-8/23/2000"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Tangipahoa_EFF_DFIRM/MapServer/12",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Tangipahoa_EFF_DFIRM/MapServer/15",
            "meetings": ["Scoping Meeting: 02/09/2006", "Final Community Officials Meeting: 03/05/2008", "Flood Map Open House Meeting: 03/05/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 01/25/2008", "Letter of Final Determination Date: 01/22/2010", "Study Effective Date: 07/22/2010", "For information on the Base Flood Elevations (BFE) changes, <a href='https://www.floodmaps.fema.gov/fhm/Scripts/bfe_srch.asp?state=LA' target='blank'>Click here</a>", "90 Day Community Appeal Dates: <label class='link' onClick='showCommunityAppealDates(\"22105\");'> Vary</label>", "Study Effective Date: 07/22/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Tangipahoa_FIS.pdf"]

          },
          {
            "FIPS": 22107,
            "name": "Tensas",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.80446886602344, "ymin": 31.617457540992184, "xmax": -90.82943224492969, "ymax": 32.427699240210934 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Tensas_EFF_FIRM/MapServer",
                          "Date": "1978-1982" //"4/3/1978-3/16/1982"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["Scoping Meeting: TBD", "Scoping Meeting Follow Up:TBD", "Final Community Officials Meeting: TBD", "Flood Map Open House Meeting: TBD"],
            "events": ["Preliminary DFIRM and FIS delivery: TBD", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22109,
            "name": "Terrebonne",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.34166979375781, "ymin": 28.97387233591406, "xmax": -90.36663317266406, "ymax": 29.78411403513281 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Terrebonne_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "07/30/2008"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Terrebonne_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Terrebonne_EFF_FIRM/MapServer",
                          "Date": "1992" //"11/20/1970-4/2/1992"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Terrebonne_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Terrebonne_PRE_DFIRM/MapServer/14",
            "meetings": ["Final Community Officials Meeting: 11/19/2008", "Flood Map Open House Meeting: 02/02/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/30/2008", "90 Day Community Appeal Start Date: 06/24/2009", "90 Day Community Appeal End Date: 09/22/2009", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Terrebonne_FIS_Pre.pdf"]

          },
          {
            "FIPS": 22111,
            "name": "Union",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.86670946660938, "ymin": 32.43250575876562, "xmax": -91.89167284551563, "ymax": 33.24274745798437 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Union_EFF_DFIRM/MapServer",
                          "EffectiveDate": "07/04/2011"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Union_EFF_FIRM/MapServer",
                          "Date": "Varies" //"3/23/1982-11/22/1999"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Union_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Union_EFF_DFIRM/MapServer/13",
            "meetings": ["Final Community Officials Meeting: 02/14/2010", "Flood Map Open House Meeting: 04/13/2010"],
            "events": ["Preliminary DFIRM and FIS delivery: 11/30/2009", "90 Day Community Appeal Start Date: 04/22/2010", "90 Day Community Appeal End Date: 07/21/2010", "Letter of Final Determination Date: 01/04/2011", "Study Effective Date: 07/04/2011"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Union_FIS.pdf"]

          }, {
            "FIPS": 22113,
            "name": "Vermilion",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.7527263123125, "ymin": 29.393412741187497, "xmax": -91.77768969121875, "ymax": 30.203654440406247 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Vermilion_EFF_DFIRM/MapServer",
                          "EffectiveDate": "01/19/2011"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloodMaps/Vermillion_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Vermilion_Hybrid_ARCH_FIRM/MapServer",
                          "Date": "Varies" //"6/30/1976-10/16/2003"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Vermilion_EFF_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Vermilion_EFF_DFIRM/MapServer/14",
            "meetings": ["Scoping Meeting: 02/08/2006", "Final Community Officials Meeting: 04/01/2008", "Flood Map Open House Meeting: 04/09/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 02/29/2008", "90 Day Community Appeal Start Date: 04/18/2008", "90 Day Community Appeal End Date: 07/21/2008", "Letter of Final Determination Date: 07/19/2011", "Study Effective Date: 01/19/2011"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Vermilion_FIS.pdf"]

          },
          {
            "FIPS": 22115,
            "name": "Vernon",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.70167040410938, "ymin": 30.680186422828122, "xmax": -92.72663378301563, "ymax": 31.490428122046872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Vernon_PRE_20160523/MapServer",
                          "femaSchemaVersion": 2,
                          "Date": "05/23/2016"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Vernon_EFF_DFIRM/MapServer",
                          "hybrid": true,
                          "qtFloodLayerURL": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Vernon_EFF_DFIRM/MapServer/10",
                          "qtPanelLayerURL": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Vernon_EFF_DFIRM/MapServer/13",
                          "EffectiveDate": "03/03/2011"

                        },
            "queryTaskLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Vernon_PRE_20160523/MapServer/2",
            "FIRMPanelLayer": "http://terra2.agcenter.lsu.edu/arcgis/rest/services/LAFloodMaps/Vernon_PRE_20160523/MapServer/3",
            "meetings": ["CCO Meeting: 06/23/2009", "Flood Map Open House Meeting: 10/19/2009"],
            "events": ["Preliminary DFIRM and FIS delivery: 06/04/2009", "90 Day Community Appeal Start Date: 12/22/2009", "90 Day Community Appeal End Date: 03/22/2010", "Letter of Final Determination Date: 07/19/2010", "Study Effective Date: 03/03/2011"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Vernon_FIS.pdf"]

          },
          {
            "FIPS": 22117,
            "name": "Washington",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.51632189336719, "ymin": 30.446726950171872, "xmax": -89.54128527227344, "ymax": 31.256968649390622 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Washington_EFF_DFIRM/MapServer",
                          "EffectiveDate": "12/03/2009"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Washington_EFF_FIRM/MapServer",
                          "Date": "Varies" //"9/28/1979-2/17/1989"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Washington_EFF_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Washington_EFF_DFIRM/MapServer/14",
            "meetings": ["CCO Meeting: 08/02/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 07/17/2008", "90 Day Community Appeal Start Date: 11/12/2008", "90 Day Community Appeal End Date: 02/10/2009", "Letter of Final Determination Date: 06/03/2009", "Study Effective Date: 12/03/2009"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Washington_FIS.pdf"]

          },
          {
            "FIPS": 22119,
            "name": "Webster",
            "host": "LSU AgCenter",
            "extension": { "xmin": -93.80054735723438, "ymin": 32.31165614939062, "xmax": -92.82551073614063, "ymax": 33.12189784860937 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Webster_EFF_DFIRM/MapServer",
                          "EffectiveDate": "03/02/2010"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Webster_EFF_FIRM/MapServer",
                          "Date": "Varies" //"9/18/1979-3/3/1992"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Webster_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Webster_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 11/14/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 08/29/2008", "90 Day Community Appeal Start Date: 02/12/2009", "90 Day Community Appeal End Date: 05/12/2009", "Letter of Final Determination Date: 09/02/2009", "Study Effective Date: 03/02/2010"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Webster_FIS.pdf"]

          },
          {
            "FIPS": 22121,
            "name": "West Baton Rouge",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.52981066289844, "ymin": 30.288111837867184, "xmax": -91.04229235235156, "ymax": 30.69323268747656 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/WBR_EFF_DFIRM/MapServer",
                          "EffectiveDate": "07/16/2014"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/WBR_EFF_FIRM/MapServer",
                          "Date": "Varies" //"8/15/1977-9/7/2000"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/WBR_EFF_DFIRM/MapServer/10",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/WBR_EFF_DFIRM/MapServer/13",
            "meetings": ["CCO Meeting: 03/06/2009", "Open House Meeting: 07/29/09"],
            "events": ["Preliminary DFIRM and FIS delivery: 12/09/2008", "90 Day Community Appeal Start Date: 05/21/2009", "90 Day Community Appeal End Date: 08/19/2009", "Letter of Final Determination Date: 01/16/2014", "Study Effective Date: 07/16/2014"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/West_Baton_Rouge_FIS.pdf"]

          },
          {
            "FIPS": 22123,
            "name": "West Carroll",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.69048571172656, "ymin": 32.57532802439062, "xmax": -91.20296740117969, "ymax": 32.980448874 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/West_Carroll_EFF_FIRM/MapServer",
                          "Date": "1987-2010" //"3/1/1987-3/1/2010"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["N/A"],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22125,
            "name": "West Feliciana",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.66370653692188, "ymin": 30.638987692359372, "xmax": -91.176188226375, "ymax": 31.044108541968747 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/West_Feliciana_EFF_FIRM/MapServer",
                          "Date": "1977-1979" //"5/2/1977-2/13/1979"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["N/A"],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 22127,
            "name": "Winn",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.92026781621875, "ymin": 31.74242702341406, "xmax": -92.43274950567188, "ymax": 32.147547873023434 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Tiled",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Winn_EFF_FIRM/MapServer",
                          "Date": "1987-1989" //"7/1/1987 – 7/24/1989"

                        },
            "queryTaskLayer": "",
            "FIRMPanelLayer": "",
            "meetings": ["N/A"],
            "events": ["N/A"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          },
          {
            "FIPS": 220550,
            "name": "Lafayette 09/06/2011",
            "host": "LSU AgCenter",
            "extension": { "xmin": -92.33043932500781, "ymin": 30.008990438941403, "xmax": -91.84292101446094, "ymax": 30.414111288550778 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lafayette_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "09/06/2011"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "false",
                          "layerType": "Dynamic",
                          "url": ""
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Lafayette_EFF_FIRM/MapServer",
                          "Date": "1996-2010" //"9/30/1980-1/20/1999"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lafayette_PRE_DFIRM/MapServer/12",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Lafayette_PRE_DFIRM/MapServer/15",
            "meetings": ["Scoping Meeting: 07/14/2004", "Scoping Meeting Follow Up:8/27/2004", "Final Community Officials Meeting: 12/18/2007", "Flood Map Open House Meeting: 02/21/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 09/28/2007", "90 Day Community Appeal Start Date: 10/20/2010", "90 Day Community Appeal End Date: 01/18/2011", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Lafayette_FIS_Pre.pdf"]

          },
          {
            "FIPS": 220510,
            "name": "Jefferson 10/30/2008",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.58344149175586, "ymin": 29.27994457102148, "xmax": -89.60840487066211, "ymax": 30.09018627024023 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Jefferson_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "10/30/08"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jefferson_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jefferson_EFF_FIRM/MapServer",
                          "Date": "1995" //"8/14/1970-3/23/1995"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Jefferson_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Jefferson_PRE_DFIRM/MapServer/14",
            "meetings": [], // old preDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 10/30/2008", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/08_Jefferson_FIS_Pre.pdf"]

          },
          {
            "FIPS": 220511,
            "name": "Jefferson 06/19/2013",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.58344149175586, "ymin": 29.27994457102148, "xmax": -89.60840487066211, "ymax": 30.09018627024023 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Jefferson_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "06/19/2013"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jefferson_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Jefferson_EFF_FIRM/MapServer",
                          "Date": "1995" //"8/14/1970-3/23/1995"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Jefferson_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Jefferson_PRE_DFIRM/MapServer/14",
            "meetings": [], // old preDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/09/2012", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Jefferson_FIS_Pre.pdf"]

          },
          {
            "FIPS": 220710,
            "name": "Orleans 11/13/2008",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.14553331914844, "ymin": 29.858958395484372, "xmax": -89.65801500860156, "ymax": 30.264079245093747 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Orleans_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "11/13/08"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Orleans_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Orleans_EFF_FIRM/MapServer",
                          "Date": "1984" //"10/19/1971-3/1/1984"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "Date": "11/09/12"
            //            },

            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Orleans_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Orleans_PRE_DFIRM/MapServer/14",
            "meetings": [],
            //old preliminary and FIS delivery date was 11/13/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/13/2008", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/08_Orleans_FIS_Pre.pdf"]

          },
          {
            "FIPS": 220711,
            "name": "Orleans 11/09/2012",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.14553331914844, "ymin": 29.858958395484372, "xmax": -89.65801500860156, "ymax": 30.264079245093747 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "11/09/12"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Orleans_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Orleans_EFF_FIRM/MapServer",
                          "Date": "1984" //"10/19/1971-3/1/1984"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "Date": "11/09/12"
            //            },

            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Orleans_PRE_DFIRM/MapServer/14",
            "meetings": [],
            //old preliminary and FIS delivery date was 11/13/2008
            "events": ["Preliminary DFIRM and FIS delivery: 11/09/12", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/Orleans_FIS_Pre.pdf"]

          },
          {
            "FIPS": 220750,
            "name": "Plaquemines 10/30/2008",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.47357821050586, "ymin": 28.56720653391211, "xmax": -88.52350496831836, "ymax": 30.187689932349602 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Plaquemines_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "10/30/08"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Plaquemines_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/Plaquemines_EFF_FIRM/MapServer",
                          "Date": "1993" //"5/1/1985-9/30/1993"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Plaquemines_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "DateIssued": "11/09/12"
            //            },
            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/Plaquemines_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Plaquemines_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_Plaquemines_PRE_DFIRM/MapServer/14",
            "meetings": [],
            //old PreDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 10/30/2008", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/08_Plaquemines_FIS_PRE.pdf"]

          },
          {
            "FIPS": 220870,
            "name": "St. Bernard 10/30/2008",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.01850390020313, "ymin": 29.568507345679684, "xmax": -89.04346727910938, "ymax": 30.378749044898434 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_St_Bernard_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "10/30/08"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Bernard_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Bernard_EFF_FIRM/MapServer",
                          "Date": "1987" //"8/31/1973-3/4/1987"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Bernard_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "Date": "11/09/12"
            //            },
            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Bernard_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_St_Bernard_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_St_Bernard_PRE_DFIRM/MapServer/14",
            "meetings": [],
            //old PreDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 10/30/2008", "90 Day Community Appeal Start Date: TBD", "90 Day Community Appeal End Date: TBD", "Letter of Final Determination Date: TBD", "Study Effective Date: TBD"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/08_St_Bernard_FIS_PRE.pdf"]

          },
          {
            "FIPS": 220890,
            "name": "St. Charles 10/30/2008",
            "host": "LSU AgCenter",
            "extension": { "xmin": -90.57176851812305, "ymin": 29.758536489966793, "xmax": -90.08425020757617, "ymax": 30.16365733957617 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Tiled",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_St_Charles_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "10/30/08"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Charles_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Charles_EFF_FIRM/MapServer",
                          "Date": "1992" //"5/2/1983-6/16/1992"

                        },
            //"PDFIRM":
            //            {
            //                "id": 3,
            //                "exist": "true",
            //                "layerType": "Tiled",
            //                "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Charles_Draft_DFIRM/MapServer",
            //                "EffectiveDate": "Draft Preliminary",
            //                "Date": "11/09/12"
            //            },
            //"pmrQueryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Charles_Draft_DFIRM/MapServer/11",
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_St_Charles_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/08_St_Charles_PRE_DFIRM/MapServer/14",
            "meetings": [],
            // old PreDFIRM date 10/30/2008
            "events": ["Preliminary DFIRM and FIS delivery: 10/30/2008", "90 Day Community Appeal Start Date: TBP", "90 Day Community Appeal End Date: TBP", "Letter of Final Determination Date: TBP", "Study Effective Date: TBP"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/08_St_Charles_FIS_Pre.pdf"]

          },
          {
            "FIPS": 221010,
            "name": "St. Mary 03/31/2008",
            "host": "LSU AgCenter",
            "extension": { "xmin": -91.90403246465625, "ymin": 29.229991110328122, "xmax": -90.9289958435625, "ymax": 30.040232809546872 },
            "DFIRM":
                        {
                          "id": 0,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Mary_PRE_DFIRM/MapServer",
                          "EffectiveDate": "Preliminary",
                          "Date": "03/31/2008"
                        },
            "ABFE":
                        {
                          "id": 1,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Mary_ABFE/MapServer"
                        },
            "FIRM":
                        {
                          "id": 2,
                          "exist": "true",
                          "layerType": "Dynamic",
                          "url": "http://maps.lsuagcenter.com/ArcGIS/rest/services/LAFloods/St_Mary_EFF_FIRM/MapServer",
                          "Date": "1978-1999" //"12/15/1978-6/30/1999"

                        },
            "queryTaskLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Mary_PRE_DFIRM/MapServer/11",
            "FIRMPanelLayer": "http://gaia.agcenter.lsu.edu/ArcGIS/rest/services/LAFloodMaps/St_Mary_PRE_DFIRM/MapServer/14",
            "meetings": ["Scoping Meeting: 03/31/2005", "Scoping Meeting Follow Up:08/03/2005", "Final Community Officials Meeting: 04/28/2008", "Flood Map Open House Meeting: 05/06/2008"],
            "events": ["Preliminary DFIRM and FIS delivery: 03/31/2008", "For information on the Base Flood Elevations (BFE) changes, <a href='https://www.floodmaps.fema.gov/fhm/Scripts/bfe_srch.asp?state=LA' target='blank'>Click here</a>", "90 Day Community Appeal Dates: <label class='link' onClick='showCommunityAppealDates(\"22101\");'> Vary</label>"],
            "documents": ["http://maps.lsuagcenter.com/floodmaps/Documents/FIS/"]

          }
      ]
};