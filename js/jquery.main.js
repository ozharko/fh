function handleWindow() {
    var body = document.querySelector('body');

    if (window.innerWidth > body.clientWidth + 5) {
        body.classList.add('has-scrollbar');
        body.setAttribute('style', '--scroll-bar: ' + (window.innerWidth - body.clientWidth) + 'px');
    } else {
        body.classList.remove('has-scrollbar');
        body.setAttribute('style', '--scroll-bar: 0px');
    }
}

handleWindow();

// The resize isn't very necessary:
window.addEventListener('resize', handleWindow);

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

var options = {
    success: function(data) {
		  $('.tab.display .input').addClass('error');
		  
    }
},
mail = {
	clearForm: true,
	resetForm: true,
	beforeSubmit: function (formData, $form) {
		$(".modal .button").prop("disabled", true).addClass("loading");
	},
	success: function (response, statusText, xhr, $form) {
		$.fancybox.close();
		initInput();
	},
	complete: function (jqXhr, error, $form) {
		$(".modal .button").prop("disabled", false).removeClass("loading");
	}
};

jQuery(document).ready(function($) {
	initDot();
    initTabs();
    initPopup();
    initInput();
    initScroll();
    initGallery();
	 initBgImage();
	 initSendForm();
	 initNavigation();

    var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
	 if (mac) $('body').addClass('macOS');

	 myPlayer = jQuery('#player').YTPlayer( {
		onReady: function( player ) {
			var filters = {
				grayscale: 100
			}
			myPlayer.YTPApplyFilters(filters);
		}
	});

	initMap();
});

function initMap() {
	var pos;

	$('[data-pos]').click(function(event) {
		event.preventDefault();
		$('body').toggleClass('location-body');

		pos = $(this).data('pos').split(',');

		var map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: parseFloat(pos[0]),
				lng: parseFloat(pos[1])
			},
			scrollwheel: false,
			disableDefaultUI: true,
			zoom: 16,
			styles: [
				{
					 "featureType": "administrative",
					 "elementType": "labels.text.fill",
					 "stylers": [
						  {
								"color": "#444444"
						  }
					 ]
				},
				{
					 "featureType": "landscape",
					 "elementType": "all",
					 "stylers": [
						  {
								"color": "#f2f2f2"
						  }
					 ]
				},
				{
					 "featureType": "poi",
					 "elementType": "all",
					 "stylers": [
						  {
								"visibility": "off"
						  }
					 ]
				},
				{
					 "featureType": "road",
					 "elementType": "all",
					 "stylers": [
						  {
								"saturation": -100
						  },
						  {
								"lightness": 45
						  }
					 ]
				},
				{
					 "featureType": "road.highway",
					 "elementType": "all",
					 "stylers": [
						  {
								"visibility": "simplified"
						  }
					 ]
				},
				{
					 "featureType": "road.arterial",
					 "elementType": "labels.icon",
					 "stylers": [
						  {
								"visibility": "off"
						  }
					 ]
				},
				{
					 "featureType": "transit",
					 "elementType": "all",
					 "stylers": [
						  {
								"visibility": "off"
						  }
					 ]
				},
				{
					 "featureType": "water",
					 "elementType": "all",
					 "stylers": [
						  {
								"color": "#fdeb06"
						  },
						  {
								"visibility": "on"
						  }
					 ]
				}
		  ]
		});
	
		var image = {
			url: 'images/map.svg',
			size: new google.maps.Size(48, 48),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(-72, 36),
			scaledSize: new google.maps.Size(48, 48)
		}
		var beachMarker = new google.maps.Marker({
			position: {
				lat: parseFloat(pos[0]),
				lng: parseFloat(pos[1])
			},
			map: map,
			icon: image
		});
	});
}

function initNavigation() {
	$('.menu-icon').click(function(event) {
		event.preventDefault();
		if ($('body').hasClass('location-body')) {
			$('body').removeClass('location-body');
		} else {
			$('body').toggleClass('navigation');
			!$('body').hasClass('display') ? bodyScrollLock.clearAllBodyScrollLocks() : bodyScrollLock.disableBodyScroll($('#nav'));
		}
	});
}

function initDot() {	
	$('.doc strong').matchHeight();

	$('.doc strong').dotdotdot();
}

window.addEventListener('load', function() {
    var bLazy = new Blazy({
        success: function(ele) {
            $(ele).parent().addClass('loaded');
        }
    });

    $(document).on('click', '.callback', function(event) {
        event.preventDefault();
        $('.b24-widget-button-callback .b24-widget-button-social-tooltip').trigger('click');
    });
});

function initSendForm() {
	$(document).on('click', '.modal button', function() {
		setTimeout(function(){
			$('.modal form[data-option]').submit();
		},100);
	});
}

function initTabs() {
	$(document).on('click', '.tabs a, .extern-tab', function(event) {
		event.preventDefault();
		var _id = $(this).attr('href');
		$('.tab.display').removeClass('display');
		$('.tabs .active').removeClass('active');
		$('.tab[data-id="' + _id.substring(1) + '"]').addClass('display');
		$(this).parent().addClass('active');
		$(this).closest('li').index() == 0 ? $('.tabs span').removeClass('move') : $('.tabs span').addClass('move');
	});
	 
	 $(document).on('click', '.tabs span', function () {
		 var $this = $(this);
		 $this.closest('.tabs').find('li:not(.active) a').trigger('click');
	 });
}

function initScroll() {
    $(document).on('click', '.scroll-link', function(event) {
        event.preventDefault();
        var $block = $('[data-id="'+ $(this).attr('href') +'"]').offset().top;
        $('html, body').animate({scrollTop: $block}, 500);
    });
}

function initGallery() {
    $('.ticker').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        variableWidth: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 2000
	 });
	 
	 $('.ticker .item').matchHeight();

    $('.logos .list').slick({
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        autoplay: true,
        autoplaySpeed: 0,
        speed: 1000,
        cssEase: 'linear',
        mobileFirst: true,
        responsive: [{
            breakpoint: 768,
            settings: "unslick"
        }]
    });
}

function initBgImage() {
    $('.bg, [data-bg], [data-mobile-bg]').each(function(index, el) {
        var _src = $('> img:visible', this).attr('src');
        if ($(window).width() < 768 && $(this).is('[data-mobile-bg]')) _src = $(this).data('mobile-bg');
        else $(this).is('[data-bg]') ? _src = $(this).data('bg') : $('> img', this).hide();
        $(this).css('background-image', 'url(' + _src + ')');
    });
}

function initInput() {
    var defaultVal = '';
    var $inputs = $('.input input:not(:checkbox), .input textarea');

    $inputs.focus(function(event) {
        $(this).closest('.input').addClass('focus');
    }).blur(function(event) {
        $(this).closest('.input').removeClass('focus');
        var actionVal = $(this).val();
        actionVal != defaultVal ? $(this).closest('.row, .input').addClass('enter') : $(this).closest('.row, .input').removeClass('enter');
    }).keyup(function(event) {
        var actionVal = $(this).val();
        actionVal != defaultVal ? $(this).closest('.row, .input').addClass('enter') : $(this).closest('.row, .input').removeClass('enter');
    });
    $('.input input, .input textarea').each(function(index, el) {
        $(this).val() != '' ? $(this).closest('.row, .input').addClass('enter') : $(this).closest('.row, .input').removeClass('enter');
    });
    $('.number input').keydown(function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
            ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	 });
}

var $popupButton;

function initPopup() {
    $(document).on('click', '[data-popup]', function(event) {
        event.preventDefault();
        var $this = $(this),
            id = $this.data('id'),
            src = $this.attr('href'),
            type = $this.data('type');
        if (!src) src = $this.data('href');
        $popupButton = $this;
        showPopup(src, type, {
            afterLoad: function() {
                initInput();
					 initValidation();
					 $(".modal .button").prop("disabled", true);
				}
        });
    });
}

function showPopup(src, type, options) {
    return $.fancybox.open({
        src: src,
        type: type || "inline",
        opts: $.extend({}, {
            arrows: false,
            baseClass: "modal",
            toolbar: false,
            infobar: false,
            autoFocus: false,
            backFocus: false,
            touch: false,
            clickSlide : false,
            hideScrollbar: false,
            clickOutside: false,
            btnTpl: {
                smallBtn: "<button data-fancybox-close class=\"fancybox-button fancybox-close-small\"><svg xmlns=\"http://www.w3.org/2000/svg\"><use xlink:href=\"#icon-close\"></use></svg></button>"
            }
        }, options || {})
    });
}

function initValidation() {
    $("form").each(function(index, el) {
        var _options,
            $this = $(this);
        if ($this.hasClass("ignore")) return;
        if ($this.data("option")) _options = eval($this.data("option"));
        else _options = options;
        validateForm($this, {
            submitHandler: function(form) {
					if (!$(form).is('[data-default]')) {
						$(form).ajaxSubmit(_options);
                	return false;
					} else {
						form.submit();
						$.fancybox.close();
					}
            }
        });
    });
}

function validateForm($form, options = {}) {
    return $form.validate($.extend({}, {
        ignore: ".ignore, [type=\"hidden\"]",
        onclick: false,
        onkeyup: function(element) {
			$(element).valid();
        },
        focusInvalid: true,
        errorClass: "error",
        validClass: "success",
        success: "success",
        debug: true,
        errorElement: "span",
        highlight: function(element, errorClass, validClass) {
				$(element).closest(".input").addClass(errorClass).removeClass(validClass);
				initCheckValue();
        },
        unhighlight: function(element, errorClass, validClass) {
				$(element).closest(".input").removeClass(errorClass).addClass(validClass);
				initCheckValue();
        }
    }, options));
}

function initCheckValue() {
	var successFlag = false;
	$('.modal form[data-option] .input').each(function (index, element) {
		if ($(this).hasClass('success')) successFlag = true;
		else {
			successFlag = false;
			return false;
		}
	});

	successFlag ? $(".modal .button").prop("disabled", false) : $(".modal .button").prop("disabled", true);
}