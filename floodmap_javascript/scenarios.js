function updateGrid() {
    var groundH = $('#ground').height();
    var sceneH = $('#scene').height();
    unit = (sceneH - groundH) / 10;
    $('.grid-unit').css({ height: unit + 'px' });
    $('#unitOutput').html(unit);
}


function houseSwap() {
    var $house = $(this);
    $('.houseChoice img').css({ borderColor: '#bdc3c7' });
    $house.css({ borderColor: '#55a9e1' });

    if ($house.attr('src').indexOf("slabongrade") != -1) {
        $('.adjustmentControls').removeClass('show-me').addClass('no-show');
        $('#bighouse').attr('src', $(this).attr('src').replace('-t', ''));
    } else {
        $('.adjustmentControls').removeClass('no-show').addClass('show-me');
        $('#bighouse').attr('src', $(this).attr('src').replace('-t', ''));

        if ($house.attr('src').indexOf("crawlspace") != -1) {
            $('#floorAdjust').val(2);
        } else {
            $('#floorAdjust').val(6);
        }
    }
}

function showDepth() {
    updateGrid();
    if ($('#bfe').val().length && $('#ge').val().length) {

        var bfe = $('#bfe').val();
        var ge = $('#ge').val();
        bfe = parseFloat(bfe)
        ge = parseFloat(ge);
        var geR = bfe - (bfe - ge);

        console.log('bfe: ' + bfe);
        console.log('ge: ' + ge);

        if (bfe <= ge) {
            $('#noWater').css('display', 'block');
        } else {
            $('#noWater').css('display', 'none');
        }

        $('.geVal').html(ge);
        $('#geOutput').html(ge);
        $('.bfeVal').html(bfe);
        $('#bfeOutput').html(bfe);
        $('.ge, .bfe').css({ display: 'block' });

        var height = (bfe - ge) * unit;
        $('#heightOutput').html(height);

        if (ge < 0) {
            var offsetB = ge - Math.ceil(ge);
            $('#offsetB').html(offsetB);
        }
        else {
            var offsetB = ge - Math.floor(ge);
            $('#offsetB').html(offsetB);
        }

        if (offsetB > 0) {
            var offset = 50 - (offsetB * unit);
        }
        else if (offsetB < 0) {
            var offset = 50 - unit - (offsetB * unit);
            geR = geR - 1;
        }
        else {
            var offset = 50;
        }

        $('#gridBase').html(geR);
        $('.yvalue1').html(parseInt(geR) + 1);
        $('.yvalue2').html(parseInt(geR) + 2);
        $('.yvalue3').html(parseInt(geR) + 3);
        $('.yvalue4').html(parseInt(geR) + 4);
        $('.yvalue5').html(parseInt(geR) + 5);
        $('.yvalue6').html(parseInt(geR) + 6);
        $('.yvalue7').html(parseInt(geR) + 7);
        $('.yvalue8').html(parseInt(geR) + 8);
        $('.yvalue9').html(parseInt(geR) + 9);

        $('#offsetOutput').html(offset);
        if (height > 0) {
            $('.water').css({ height: height + 'px', display: 'block' })
            $('.grid-total').css({ bottom: offset + 'px' });
        }
        else {
            $('.water').css({ height: '0px', display: 'none' })
        }



    }
}


$(document).ready(function () {
    updateGrid();
    $(window).resize(function () {
        showDepth();
    });
    $('#ge').on("focusout", showDepth);
    $('#bfe').on("focusout", showDepth);
    $('.houseChoice img').on("click", houseSwap);

    $(".mathButton").on("click", function () {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.text() == "+") {
            var he = $('#bighouse').css("bottom");
            $('#bighouse').css({ bottom: parseFloat(he) + 12 + 'px' });
            var newVal = parseFloat(oldValue) + 0.25;
        } else {
            var newVal = parseFloat(oldValue) - 0.25;
            var he = $('#bighouse').css("bottom");
            $('#bighouse').css({ bottom: parseFloat(he) - 12 + 'px' });
        }
        $button.parent().find("input").val(newVal);
    });
});