var res;




$(document).ready(function () {

    res = new responsive();
    res.initApp();

    //$(".floodmap_details_trigger").click(function () {
    //    $(".floodmap_right_content").removeClass("bottomSpacer");
    //});

    //$(".floodmap_settings_trigger").click(function () {
    //    $(".floodmap_right_content").removeClass("bottomSpacer");
    //});

    //$(".floodmap_legend_trigger").click(function () {
    //    $(".floodmap_right_content").addClass("bottomSpacer");
    //});

    //$(".floodmap_print_trigger").click(function () {
    //    $(".floodmap_right_content").removeClass("bottomSpacer");
    //});

    //$(".floodmap_points_trigger").click(function () {
    //    $(".floodmap_right_content").addClass("bottomSpacer");
    //});


    // Detect whether device supports orientationchange event, otherwise fall back to
    // the resize event.



    $(".moreInfoLink").click(function () {
        $(".floodmap_disclaimer").css("display", "block");
        $(".floodmap_disclaimerheader").css("display", "block");
        $(".disclaimer-popup").css("display", "none");
        $("#modal2").css("display", "none");
    });

    $(".layerQuestion").click(function () {
        var htmlString = "";
        switch (this.parentElement.id) {
            case "dfirmDIV":
                if (currentParish.DFIRM.EffectiveDate != undefined && currentParish.DFIRM.EffectiveDate != "" && currentParish.DFIRM.EffectiveDate != "Preliminary") {
                    //The DFIRM Effective date is adopted (Future) 6 months before it is effective, so if today's date is earlier than the effective date,
                    // then it is only adopted.
                    if (new Date() < new Date(currentParish.DFIRM.EffectiveDate)) {
                        //future DFIRM
                        htmlString = "<p><strong>" + currentParish.name + " Future DFIRM </p>"
                            + "<p> Effective Date : </strong> " + currentParish.DFIRM.EffectiveDate + "</p>"
                            + $("#Future_DFIRM").html() + "<br/>";
                    } else {
                        //effective DFIRM
                        htmlString = "<p><strong>" + currentParish.name + " Effective DFIRM </p>"
                            + "<p> Effective Date : </strong> " + currentParish.DFIRM.EffectiveDate + "</p>"
                            + $("#Effective_FIRM").html() + "<br/>";

                    }
                } else {
                    //preliminary DFIRM
                    htmlString = "<p><strong>" + currentParish.name + " Preliminary DFIRM </p>"
                            + "<p> Effective Date : </strong> " + currentParish.DFIRM.EffectiveDate + "</p>"
                            + $("#Preliminary_DFIRM").html() + "<br/>";
                    
                }

                    $("#floodmap_layerInfo").html(htmlString);
                break;
            case "pdfirmDIV":
                htmlString = "<p><strong>" + currentParish.name + " Partial Map Revision Preliminary DFIRM </p>"
                    + "<p> Effective Date : </strong> " + currentParish.PDFIRM.Date + "</p>"
                    + $("#Preliminary_DFIRM").html();
                $("#floodmap_layerInfo").html(htmlString);
                break;
            case "firmDIV":
                if (currentParish.DFIRM.EffectiveDate != undefined && currentParish.DFIRM.EffectiveDate != "" && currentParish.DFIRM.EffectiveDate != "Preliminary") {
                    //The DFIRM Effective date is adopted (Future) 6 months before it is effective, so if today's date is earlier than the effective date,
                    // then it is only adopted.
                    if (new Date() < new Date(currentParish.DFIRM.EffectiveDate)) {
                        //effective FIRM
                        htmlString = "<p><strong>" + currentParish.name + " Effective FIRM </strong></p>"
                            + $("#Effective_FIRM").html() + "<br/>";
                    } else {
                        //Historical FIRM
                        htmlString = "<p><strong>" + currentParish.name + " Historical FIRM </strong></p>"
                            + $("#Historical_FIRM").html() + "<br/>";

                    }
                } else {
                    //effective FIRM
                    htmlString = "<p><strong>" + currentParish.name + " Effective FIRM </strong></p>"
                        + $("#Effective_FIRM").html() + "<br/>";
                }
                
                $("#floodmap_layerInfo").html(htmlString);
                break;
            case "abfeDIV":
                htmlString = "<p><strong>" + currentParish.name + " ABFE</strong></p>"
                    + $("#ABFE").html();
                $("#floodmap_layerInfo").html(htmlString);
                break;
        }
        $(".floodmap_layerInfo").css("display", "block");
        $(".floodmap_layerInfoheader").css("display", "block");
        //$(".panelcontent-layers").hide();
        //$(".layers-header").hide();
        $("#modal2").css("display", "none");
    });



    $("#dropdown-icon").click(function () {
        $("#dropdown").toggle();

        if ($(this).hasClass('dropdown-icon-active')) {
            $("#dropdown-icon").removeClass('dropdown-icon-active');
            //$("#dropdown-icon").addClass("backgroundRemoval");
        }
        else {
            $("#dropdown-icon").addClass('dropdown-icon-active');
            //$("#dropdown-icon").removeClass("backgroundRemoval");
        }

    });






    $(".floodmap_points_trigger").click(function () {

        if ($(this).hasClass('dropdown-icon-active')) {
            $("nav .floodmap_nav a.floodmap_points_trigger").removeClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_points_trigger").addClass("backgroundRemoval");
            $(".panelcontent-points").hide();
            $(".points-header").hide();
            $("#modal").css("display", "none");
        }
        else {
            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $(this).addClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_points_trigger").removeClass("backgroundRemoval");
            $(".panelcontent-points").toggle();
            $(".points-header").toggle();

            $(".panelcontent-layers").hide();
            $(".layers-header").hide();

            $(".panelcontent-events").hide();
            $(".events-header").hide();

            $(".panelcontent-legend").hide();
            $(".legend-header").hide();

            $(".panelcontent-print").hide();
            $(".print-header").hide();

            $(".floodmap_search").hide();
            $("#dropdown").hide();
            $("#dropdown-icon").removeClass("dropdown-icon-active");
            $("#modal").css("display", "block");
        }
    });



    $(".floodmap_settings_trigger").click(function () {

        if ($(this).hasClass('dropdown-icon-active')) {
            $("nav .floodmap_nav a.floodmap_settings_trigger").removeClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_settings_trigger").addClass("backgroundRemoval");
            $(".panelcontent-layers").hide();
            $(".layers-header").hide();

            $("#modal").css("display", "none");
        }
        else {
            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $(this).addClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_settings_trigger").removeClass("backgroundRemoval");
            $(".panelcontent-layers").toggle();
            $(".layers-header").toggle();

            $(".panelcontent-points").hide();
            $(".points-header").hide();

            $(".panelcontent-events").hide();
            $(".events-header").hide();

            $(".panelcontent-legend").hide();
            $(".legend-header").hide();

            $(".panelcontent-print").hide();
            $(".print-header").hide();

            $(".floodmap_search").hide();
            $("#dropdown").hide();
            $("#dropdown-icon").removeClass("dropdown-icon-active");
            $("#modal").css("display", "block");
        }
    });


    $(".floodmap_details_trigger").click(function () {

        if ($(this).hasClass('dropdown-icon-active')) {
            $("nav .floodmap_nav a.floodmap_details_trigger").removeClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_details_trigger").addClass("backgroundRemoval");
            $(".panelcontent-events").hide();
            $(".events-header").hide();

            $("#modal").css("display", "none");
        }
        else {
            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $(this).addClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_details_trigger").removeClass("backgroundRemoval");
            $(".panelcontent-events").toggle();
            $(".events-header").toggle();

            $(".panelcontent-points").hide();
            $(".points-header").hide();

            $(".panelcontent-layers").hide();
            $(".layers-header").hide();

            $(".panelcontent-legend").hide();
            $(".legend-header").hide();

            $(".panelcontent-print").hide();
            $(".print-header").hide();

            $(".floodmap_search").hide();
            $("#dropdown").hide();
            $("#dropdown-icon").removeClass("dropdown-icon-active");
            $("#modal").css("display", "block");
        }
    });


    $(".floodmap_legend_trigger").click(function () {

        if ($(this).hasClass('dropdown-icon-active')) {
            $("nav .floodmap_nav a.floodmap_legend_trigger").removeClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_legend_trigger").addClass("backgroundRemoval");
            $(".panelcontent-legend").hide();
            $(".legend-header").hide();

            $("#modal").css("display", "none");
        }
        else {
            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $(this).addClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_legend_trigger").removeClass("backgroundRemoval");
            $(".panelcontent-legend").toggle();
            $(".legend-header").toggle();

            $(".panelcontent-points").hide();
            $(".points-header").hide();

            $(".panelcontent-layers").hide();
            $(".layers-header").hide();

            $(".panelcontent-events").hide();
            $(".events-header").hide();

            $(".panelcontent-print").hide();
            $(".print-header").hide();

            $(".floodmap_search").hide();
            $("#dropdown").hide();
            $("#dropdown-icon").removeClass("dropdown-icon-active");
            $("#modal").css("display", "block");

        }
    });


    $(".floodmap_print_trigger").click(function () {

        if ($(this).hasClass('dropdown-icon-active')) {
            $("nav .floodmap_nav a.floodmap_print_trigger").removeClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_print_trigger").addClass("backgroundRemoval");
            $(".panelcontent-print").hide();
            $(".print-header").hide();

            $("#modal").css("display", "none");
        }
        else {
            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $(this).addClass('dropdown-icon-active');
            //$("nav .floodmap_nav a.floodmap_print_trigger").removeClass("backgroundRemoval");
            $(".panelcontent-print").toggle();
            $(".print-header").toggle();

            $(".panelcontent-points").hide();
            $(".points-header").hide();

            $(".panelcontent-layers").hide();
            $(".layers-header").hide();

            $(".panelcontent-events").hide();
            $(".events-header").hide();

            $(".panelcontent-legend").hide();
            $(".legend-header").hide();

            $(".floodmap_search").hide();
            $("#dropdown").hide();
            $("#dropdown-icon").removeClass("dropdown-icon-active");
            $("#modal").css("display", "block");
        }
    });


    $(".floodmap_search_trigger").click(function () {

        if ($(this).hasClass('dropdown-icon-active')) {
            $("a.floodmap_search_trigger").removeClass('dropdown-icon-active');
            //$("a.floodmap_search_trigger").addClass("backgroundRemoval");
            $(".floodmap_search").hide();
            $("#modal").css("display", "none");
        }
        else {
            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $(this).addClass('dropdown-icon-active');
            //$("a.floodmap_search_trigger").removeClass("backgroundRemoval");
            $(".floodmap_search").toggle();
            $(".panelcontent-print").hide();
            $(".print-header").hide();

            $(".panelcontent-points").hide();
            $(".points-header").hide();

            $(".panelcontent-layers").hide();
            $(".layers-header").hide();

            $(".panelcontent-events").hide();
            $(".events-header").hide();

            $(".panelcontent-legend").hide();
            $(".legend-header").hide();

            $(".floodmap_disclaimer").hide();
            $(".floodmap_disclaimerheader").hide();

            $(".floodmap_layerInfo").hide();
            $(".floodmap_layerInfoheader").hide();

            $(".floodmap_info").hide();
            $(".floodmap_infoheader").hide();
            $("#dropdown").hide();
            $("#dropdown-icon").removeClass("dropdown-icon-active");
            $("#modal").css("display", "block");
        }
    });




    $("#icon-searchbtn").click(function () {
        $('.floodmap_infoheader').css("display", "none");
        $('.floodmap_info').css("display", "none");

        $('.floodmap_searchbutton').addClass('dropdown-icon-active');
        $('.floodmap_search').css("display", "block");
    });


    $("#icon-printbtn").click(function () {
        $('.floodmap_infoheader').css("display", "none");
        $('.floodmap_info').css("display", "none");

        $('.floodmap_print_trigger').addClass('dropdown-icon-active');
        $('.print-header').css("display", "block");
        $('.panelcontent-print').css("display", "block");
    });


    $("#icon-keybtn").click(function () {
        $('.floodmap_infoheader').css("display", "none");
        $('.floodmap_info').css("display", "none");

        $('.floodmap_legend_trigger').addClass('dropdown-icon-active');
        $('.legend-header').css("display", "block");
        $('.panelcontent-legend').css("display", "block");
    });


    $("#icon-calendarbtn").click(function () {
        $('.floodmap_infoheader').css("display", "none");
        $('.floodmap_info').css("display", "none");

        $('.floodmap_details_trigger').addClass('dropdown-icon-active');
        $('.events-header').css("display", "block");
        $('.panelcontent-events').css("display", "block");
    });



    $("#icon-layersbtn").click(function () {
        $('.floodmap_infoheader').css("display", "none");
        $('.floodmap_info').css("display", "none");

        $('.floodmap_settings_trigger').addClass('dropdown-icon-active');
        $('.layers-header').css("display", "block");
        $('.panelcontent-layers').css("display", "block");
    });



    $("#icon-map-markerbtn").click(function () {
        $('.floodmap_infoheader').css("display", "none");
        $('.floodmap_info').css("display", "none");

        $('.floodmap_points_trigger').addClass('dropdown-icon-active');
        $('.points-header').css("display", "block");
        $('.panelcontent-points').css("display", "block");
    });

});







function layersPanel() {
    $('.layers-header').css("display", "block");
    $('.panelcontent-layers').css("display", "block");
    $('.floodmap_settings_trigger').addClass('dropdown-icon-active');
    $('#floodmapSelectDiv').css("display", "none");
}










function responsive() {
    var flmap = this;

    flmap.collapse = false;



    // Navigation button functionality
    this.setBindings = function () {

        $(".floodmap_close").click(function () {
            $(".floodmap_button").removeClass('dropdown-icon-active');
            if ($(this).hasClass('floodmap_hide')) $(this).hide();
            $('.floodmap_right_content').hide();
            $('.panelheader-wrap').hide();
            if (flmap.collapse) flmap.setActiveTab(null);
            $("#modal").css("display", "none");
        });


        $(".floodmap_searchclose").click(function () {
            $(".floodmap_search_trigger").removeClass('dropdown-icon-active');
            if ($(this).hasClass('floodmap_hide')) $(this).hide();
            $(this).parent().hide();
            if (flmap.collapse) flmap.setActiveTab(null);
            $("#modal").css("display", "none");
        });

        $(".floodmap_selectclose").click(function () {
            //$(".floodmap_search_trigger").removeClass('dropdown-icon-active');
            if ($(this).hasClass('floodmap_hide')) $(this).hide();
            $(this).parent().hide();
            if (flmap.collapse) flmap.setActiveTab(null);
            $("#modal").css("display", "none");
        });

        $(".floodmap_disclaimerpopupclose").click(function () {
            $(".disclaimer-popup").css("display", "none");
            $("#modal2").css("display", "none");
        });


        $(".floodmap_infoclose").click(function () {
            if ($(this).hasClass('floodmap_hide')) $(this).hide();
            $('.floodmap_info').hide();
            $('.floodmap_infoheader').hide();
            if (flmap.collapse) flmap.setActiveTab(null);
            $(".floodmap_infobutton").removeClass('floodmap_infobutton_active');
            $("#modal").css("display", "none");
        });

        $(".floodmap_disclaimerclose").click(function () {
            if ($(this).hasClass('floodmap_hide')) $(this).hide();
            $('.floodmap_disclaimer').hide();
            $('.floodmap_disclaimerheader').hide();
            if (flmap.collapse) flmap.setActiveTab(null);
            $(".floodmap_layersbutton").removeClass('floodmap_disclaimerbutton_active');
            $("#modal").css("display", "none");
        });

        $(".floodmap_layerInfoclose").click(function () {
            if ($(this).hasClass('floodmap_hide')) $(this).hide();
            $('.floodmap_layerInfo').hide();
            $('.floodmap_layerInfoheader').hide();
            if (flmap.collapse) flmap.setActiveTab(null);
            $(".floodmap_button").removeClass('dropdown-icon-active');
            $("#modal").css("display", "none");
        });


        $(".floodmap_info_trigger").click(function (e) {
            e.preventDefault();
            if (flmap.collapse) {
                flmap.setActiveTab(null);
                $(".floodmap_right_content").hide();
                $('.panelheader-wrap').hide();
                $("#modal").css("display", "none");
            }
            $(".floodmap_info").css("display", "block");
            $(".floodmap_infoheader").css("display", "block");
            $(".floodmap_button").removeClass('floodmap_button_active');
            $(".floodmap_searchbutton").removeClass('floodmap_searchbutton_active');
            $(".floodmap_disclaimerbutton").removeClass('floodmap_disclaimerbutton_active');
            $(".floodmap_right_content").css("display", "none");
            $('.panelheader-wrap').css("display", "none");
            $(".floodmap_search").css("display", "none");
            $(".floodmap_disclaimer").css("display", "none");
            $(".floodmap_disclaimerheader").css("display", "none");

            $(".floodmap_layerInfo").css("display", "none");
            $(".floodmap_layerInfoheader").css("display", "none");

            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $('#dropdown').css("display", "none");
            $('#dropdown-icon').removeClass('dropdown-icon-active');
            $("#modal").css("display", "block");
            return false;
        });





        $(".floodmap_disclaimer_trigger").click(function (e) {
            e.preventDefault();
            if (flmap.collapse) {
                flmap.setActiveTab(null);
                $(".floodmap_right_content").hide();
                $('.panelheader-wrap').hide();
                $("#modal").css("display", "none");
            }
            $(".floodmap_disclaimer").css("display", "block");
            $(".floodmap_disclaimerheader").css("display", "block");

            $(".floodmap_layerInfo").css("display", "none");
            $(".floodmap_layerInfoheader").css("display", "none");

            $(".floodmap_button").removeClass('floodmap_button_active');
            $(".floodmap_searchbutton").removeClass('floodmap_searchbutton_active');
            $(".floodmap_infobutton").removeClass('floodmap_infobutton_active');
            $(".floodmap_right_content").css("display", "none");
            $('.panelheader-wrap').css("display", "none");
            $(".floodmap_search").css("display", "none");
            $(".floodmap_info").css("display", "none");
            $(".floodmap_infoheader").css("display", "none");
            $('.floodmap_button').removeClass('dropdown-icon-active');
            $('.floodmap_searchbutton').removeClass('dropdown-icon-active');
            $('#dropdown').css("display", "none");
            $('#dropdown-icon').removeClass('dropdown-icon-active');
            $("#modal").css("display", "block");
            return false;

        });

        $(".floodmap_button").click(function (e) {
            $(".floodmap_info").css("display", "none");
            $(".floodmap_infoheader").css("display", "none");
            $(".floodmap_search").css("display", "none");
            $(".floodmap_disclaimer").css("display", "none");
            $(".floodmap_disclaimerheader").css("display", "none");

            $(".floodmap_layerInfo").css("display", "none");
            $(".floodmap_layerInfoheader").css("display", "none");

            $(".floodmap_searchbutton").removeClass('floodmap_searchbutton_active');
            $(".floodmap_infobutton").removeClass('floodmap_infobutton_active');
            $(".floodmap_disclaimerbutton").removeClass('floodmap_disclaimerbutton_active');
        });


    };









    this.setActiveTab = function (tab) {

        $(".floodmap_infobutton").click(function () {
            $(this).toggleClass('floodmap_infobutton_active');
        });
        $(".floodmap_disclaimerbutton").click(function () {
            $(this).toggleClass('floodmap_disclaimerbutton_active');
        });
    };


    this.initApp = function () {
        flmap.setBindings();

        //init info
        $(".floodmap_description").show();
        if (!(flmap.collapse)) flmap.setActiveTab(".floodmap_details_trigger");
    };

}





//$(window).bind("orientationchange", function () {
//    if (Math.abs(window.orientation) === 90) {
//        //alert('change1');
//        $('#container').css('transform', 'rotate(-90deg)', '-ms-transform', 'rotate(-90deg)', '-webkit-transform', 'rotate(-90deg)');
//    }
//    else {
//        //alert('change2');
//        $('#container').css('transform', '', '-ms-transform', '', '-webkit-transform', '');
//    }

//});