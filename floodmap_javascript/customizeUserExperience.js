
//check for floodMapSettings Cookie, if exists, then setup usability, if not, create it to store settings
var floodMapSettings = JSON.parse(getCookie("floodMapSettings"));
if (!floodMapSettings) {
    //alert("This site saves cookies to your machine for a customized Experience.");
    //gonna save settings as json for future expansion
    // we can add whatever settings we want to store for future settings
    var customSettings = new Object();
    customSettings.hideDisclaimer = true;
    customSettings.hideSearch = true;

    //since only the disclaimer is being turned off, going to save the cookie for only 1 day.
    //  that way, they will at least see the discaimer once each time they visit the site
    setCookie("floodMapSettings", JSON.stringify(customSettings), 1);
}
else {

    //alert(floodMapSettings.hideDisclaimer);
    if (floodMapSettings.hideDisclaimer) {
        $('.disclaimer-popup').hide();
        $('#modal2').hide();
    }
    if (floodMapSettings.hideSearch) {
        $('.floodmap_search').hide();
        $('#modal').hide();
    }
}

//cookie functions used to save information for customized usability
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start === -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start === -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end === -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

//end cookie functions

//Handlers for redirect from la_floodmaps
//splits query params into pairs
function getQueryVariable(variable) {
    var locR = window.location.search.substring(1);
    var params = locR.split('&');
    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function removeParameter(parameter) {
    //Get Query String from url
    fullQString = window.location.search.substring(1);

    paramCount = 0;
    queryStringComplete = "";

    if (fullQString.length > 0) {
        //Split Query String into separate parameters
        paramArray = fullQString.split("&");

        //Loop through params, check if parameter exists.  
        for (i = 0; i < paramArray.length; i++) {
            currentParameter = paramArray[i].split("=");
            if (currentParameter[0] == parameter) //Parameter already exists in current url
            {
                //don't include existing (will be appended to end of url)
            }
            else //Existing unrelated parameter
            {
                queryStringComplete = "?";
                if (paramCount > 0)
                    queryStringComplete = queryStringComplete + "&";

                queryStringComplete = queryStringComplete + paramArray[i];
                paramCount++;
            }
        }
    }

    window.location = self.location.protocol + '//' + self.location.host + self.location.pathname + queryStringComplete;
}

function redirectRunOnce() {
    sessionStorage['redirected'] = true;
    $('.redirect-text').css('display', 'none');
}


var origParamIn = getQueryVariable('orig');

if (!origParamIn) {
    if (sessionStorage['origParam']) {
        var origParam = sessionStorage['origParam'];
    }
} else {
    sessionStorage['origParam'] = origParamIn;
    var origParam = sessionStorage['origParam'];
    removeParameter('orig');
}



if (sessionStorage['redirected'] !== "true") {
    if ((origParam == "la_floodmaps") || (origParam == "la_floodmaps/")) {

        //$('header').css('border-bottom', "5px solid #da5600");

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

        $('.redirect-text').css('display', 'block');
        $('.floodmap_info').css('z-index', '1020');
    }
}

// End redirect handler functions