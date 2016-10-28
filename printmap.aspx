<%@ Page Language="C#" AutoEventWireup="true" CodeFile="printMap.aspx.cs" Inherits="printMap" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>LA Flood Map</title>
    <meta http-equiv="X-UA-Compatible" content="IE=8,edge" />
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<%--    <script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>
    <script src="floodmap_javascript/qunit.js"></script>
    <script src="floodmap_javascript/jquery.shareemail.js"></script>--%>
    <style>
        html, body, div, span {
            margin: 0;
            padding: 0;
            border: 0;
        }

        input[type=button] {
            color: #fff;
            padding: 7px 11px 7px 11px;
            border: solid 1px #0CF;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
            border-radius: 5px;
            -webkit-text-shadow: 1px 1px #00B6FF;
            -moz-text-shadow: 1px 1px #00B6FF;
            text-shadow: 1px 1px #00B6FF;
            font-weight: bold;
            font-size: 16px;
            /* Old browsers */
            background: -moz-linear-gradient(top, #87e7ff 0%, #00ccff 100%);
            /* FF3.6+ */
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#87e7ff), color-stop(100%,#00ccff));
            /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(top, #87e7ff 0%,#00ccff 100%);
            /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(top, #87e7ff 0%,#00ccff 100%);
            /* Opera 11.10+ */
            background: -ms-linear-gradient(top, #87e7ff 0%,#00ccff 100%);
            /* IE10+ */
            background: linear-gradient(to bottom, #87e7ff 0%,#00ccff 100%);
            /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#87e7ff', endColorstr='#00ccff',GradientType=0 );
            cursor: pointer;
        }

        #btnPrint {
            float: right;
            right: 16px;
            /*margin-right: 8px;*/
        }

        #MapImage {
            width: 800px;
        }

        #printMap_header {
            width: 802px;
            height: 94px;
            margin-bottom: 20px;
            margin-top: 20px;
            padding-right:2em;
            position:absolute;
            text-align: center;
        }
    </style>
</head>
<body style="margin-right: auto; margin-left: auto; width: 800px;">
    <div id="printMap_header">
        <span style="width: 200px; float: right; margin-top: -7px; background-color: #fff; height: 40px;">
            <input style="float: right; margin-left: 10px; margin-right: 6px;" class="st_email" type="button" value="Email" onclick="Sendit();" />
            <input id="btnPrint" type="button" value="Print" onclick="window.print();" />

            <!-- AddThis Button BEGIN -->
<%--            <div class="addthis_toolbox addthis_default_style addthis_32x32_style" style="float: right;">
            <a class="addthis_button_print addthis_button_preferred_1"></a>
            <a class="addthis_button_email addthis_button_preferred_2"></a>--%>
            <!--<a class="addthis_button_preferred_3"></a>-->
            <!--<a class="addthis_button_preferred_4"></a>-->
            <!--<a class="addthis_button_compact"></a>-->
            <!--<a class="addthis_counter addthis_bubble_style"></a>-->
<%--            </div>
            <script type="text/javascript">var addthis_config = { "data_track_addressbar": true };</script>
            <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52fd79e9436ed0b6"></script>--%>
            <!-- AddThis Button END -->

        </span>
    </div>
    <form id="form1" runat="server">
        <asp:Label ID="Label1" runat="server" Text="" Visible="false"></asp:Label>

        <asp:Image ID="MapImage" runat="server" AlternateText="Printed Map Image" ImageUrl="" />

    </form>

    <%--<div style="
    width: 520px;
    height: 30px;
    background-color: #fff;
    position: absolute;
    top: 70em;
    font-size: 11px;
    margin-left: 21px;
">*<b> BFE</b> = Base Flood Elevation (<b>**</b> Some BFEs cannot be read from the data. <a href="Documents/ShowMe-BFE.pdf"> Find out how to determine BFE</a>)<p></p></div>--%>

              <script type="text/javascript">
                  //$(function () {
                  //    module('Core');

                  //    test('basic requirements', function () {
                  //        expect(3);

                  //        ok($.fn.shareEmail, 'shareEmail');

                  //        ok($.fn.shareEmail.defaults, 'shareEmail defaults');

                  //        $('.st_email').shareEmail();

                  //        // @todo not sure why this is failing but the plugin does what we want so just need to fix test
                  //        var expectedElement = $.tmpl($.fn.shareEmail.defaults.template, $.fn.shareEmail.defaults).appendTo($('<span></span>')).html();

                  //        equals($('.st_email').html(), expectedElement);
                  //    });

                  //});


                  function Sendit() {
                      var url = document.URL;
                      var subject = "LA Flood Map - has been shared with you";
                      //var address = escape("");
                      var bodytext = "LA Flood Map Source: ";
                      //alert(url);
                      //bodytext += url;
                      location.href = "mailto:" + "&subject=" + subject + "&body=" + bodytext + encodeURIComponent(url);
                  }

      </script>
</body>
</html>
