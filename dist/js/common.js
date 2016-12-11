"use strict";

function loadingCards() {
  var cnt = 3;
  var card = $(".loadingBlock").find(".card");

  $(card).slideUp(0);
  $(card[0]).addClass("addVisible");
  $(card[1]).addClass("addVisible");
  $(card[2]).addClass("addVisible");

  $(".loadingBtn").click(function (e) {
    if ($(this).parent(".loadingBlock").find(".card").length > cnt) {
      var _card = $(this).parent(".loadingBlock").find(".card");

      $(_card[cnt]).addClass("addVisible").slideDown();
      cnt++;
      $(_card[cnt]).addClass("addVisible").slideDown();
      cnt++;
      $(_card[cnt]).addClass("addVisible").slideDown();
      cnt++;

      return false;
    }

    return false;
  });
};

//anchor
function anchor() {
  //smoothscroll

  $(".anchor a[href^='#']").on("click", function (e) {
    e.preventDefault();
    $(document).off("scroll");
    var target = this.hash,
        menu = target,
        $target = $(target);
    $("html, body").stop().animate({
      "scrollTop": $target.offset().top
    }, 500, "swing", function () {
      window.location.hash = target;
      $('html,body').scrollTop($target.offset().top - 20);
    });
  });
}

//schedule
function schedule() {
  $(".sch-item a").each(function () {
    $(this).click(function () {
      if (!$(this).hasClass("disable")) {
        $(this).toggleClass("active");
      }
      return false;
    });
  });
}

//yandexMap
function yandexMap() {
  $("#map").each(function () {
    ymaps.ready(init);
    var myMap, myPlacemark;

    function init() {
      myMap = new ymaps.Map("map", {
        center: [55.83346556890804, 37.49583249999998],
        zoom: 16
      });
      myPlacemark = new ymaps.Placemark([55.83346556890804, 37.49583249999998], {
        hintContent: "ЭлектроМаркет",
        balloonContent: "Россия, Москва, Выборгская улица, 16к2 "
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
    }
  });
}

//textEllipse
function textEllipse() {
  $('.recall').each(function () {
    $(this).find(".text").dotdotdot({
      lastCharacter: {
        /*	Remove these characters from the end of the truncated text. */
        remove: [' ', ',', ';', '.', '!', '?', '-', "\u2014"],
        noEllipsis: []
      }
    });
  });
}
//film
function film() {
  $('.film .collapse').on('show.bs.collapse', function (e) {
    var actives = $('.film').find('.in, .collapsing');
    actives.each(function (index, element) {
      $(element).collapse('hide');
    });
  });
  $('.film.panel').on('show.bs.collapse', function (e) {
    $(this).find("footer").addClass("active");
    $(document).click(function (event) {
      if (!$(event.target).closest('.film.panel').length) {
        $('.film.panel a[aria-expanded="true"]').click();
      }
    });
  });
  $('.film.panel>div').mouseleave(function () {
    $('.film.panel a[aria-expanded="true"]').click();
  });
  $('.film.panel>div').hover(function () {
    $(this).find(".more").click();
  }, function () {
    $('.film.panel a[aria-expanded="true"]').click();
  });
  $('.film.panel').on('hidden.bs.collapse', function (e) {
    $(this).find("footer").removeClass("active");
  });
}

//calendar
function calendar() {
  $('.datepicker').datepicker();
}

//slider
function slider() {
  $('.slick-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
}

//main-menu
function menuResize() {
  $(window).clearQueue();
  if ($(document).width() > 750) {
    //resize    

    var length = $(".main-menu .navbar-nav>li").length;
    $(".main-menu .navbar-nav>li").removeClass("substyle");
    for (var i = length - 1; i > 1; i--) {
      if ($(".main-menu .navbar-nav>li").eq(i).offset().top > $(".main-menu .navbar-nav").offset().top) {
        $(".main-menu .navbar-nav>li").eq(i).addClass("substyle");
      }
    }

    $('.main-menu .dropdown').each(function () {
      $(this).hover(function () {
        if ($(this).hasClass("else")) {
          $(".main-menu .navbar-nav>li.substyle").appendTo($(".main-menu  .nav.navbar-nav"));
          $(".main-menu .navbar-nav>li.substyle").appendTo($(".main-menu  .else>ul"));
        } else {
          $(".main-menu  .else .substyle").remove();
        }
        $(this).find('>.dropdown-toggle').trigger('click');
        $(this).addClass("open");
      }, function () {
        $(".main-menu .else .substyle").appendTo($(".main-menu .nav.navbar-nav"));
        $(this).find('>.dropdown-toggle').trigger('click');
      });
    });

    $('.main-menu .dropdown-submenu').hover(function () {
      $(this).find('>.dropdown-toggle').trigger('click');
    });
  } else {
    $(".main-menu  .else .substyle").remove();
    $(".main-menu .navbar-nav>li").removeClass("substyle show");
  }
}
//popup
function popup() {
  $('.materialboxed').materialbox();
}

//main-menu
function menu() {
  $(".main-menu .nav").each(function () {
    var $nav = $(this);
    $nav.find("li").eq(0).addClass('else');
    $nav.find("li").each(function () {
      if ($(this).find(" > ul").length > 0) {
        $(this).find(">ul").addClass("dropdown-menu");
        $(this).addClass("dropdown");
        $(this).find("> a").addClass("dropdown-toggle");
        $(this).find("> a").attr({ "data-toggle": "dropdown", "role": "button", "aria-haspopup": "true", "aria-expanded": "false" });
      }
    });
    $nav.find(".dropdown-submenu").parent("li").addClass("submenu");
    $nav.find(">li:first-child").addClass("hidden-xs pull-right dropdown");
    $(".else>a").addClass("dropdown-toggle").attr({ "data-toggle": "dropdown", "role": "button", "aria-haspopup": "true", "aria-expanded": "false" });
  });
  setTimeout(function () {
    var length = $(".main-menu .navbar-nav>li").length;
    $(".main-menu .navbar-nav>li").removeClass("substyle");
    for (var i = length - 1; i > 1; i--) {
      if ($(".main-menu .navbar-nav>li").eq(i).offset().top > $(".main-menu .navbar-nav").offset().top) {
        $(".main-menu .navbar-nav>li").eq(i).addClass("substyle");
      }
    }
  }, 80);
  $(".submenu").hover(function () {
    $(this).addClass("open");
  }, function () {
    $(this).removeClass("open");
  });

  $(".select-submenu.nav").each(function () {
    var $nav = $(this);
    $nav.find("li").each(function () {
      if ($(this).find(" > ul").length > 0) {
        $(this).find(">ul").addClass("dropdown-menu");
        $(this).addClass("dropdown");
        $("<span class='mycaret'><span>").appendTo($(this).find(">a"));
        $(this).find("> a").addClass("dropdown-toggle");
        $(this).find("> a").attr({ "data-toggle": "dropdown", "role": "button", "aria-haspopup": "true", "aria-expanded": "false" });
      }
    });
    $nav.find(".dropdown-menu ul").addClass("submenu");
    $(".submenu").parent().addClass("sub-block");
    $(".sub-block.a").click(function () {
      return false;
    });
    $(".sub-block").hover(function () {
      $(this).addClass("open");
    }, function () {
      $(this).removeClass("open");
    });
    $(".main-menu .dropdown-menu").mouseleave(function () {
      $(this).parents(".dropdown.open").trigger("click");
    });
    $nav.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var $this = $(this).parents(".select-submenu"),
          $name = $(this).text();

      $this.find(">li>a").html($name + "<span class='mycaret'></span>");
    });
    $('.datepicker').each(function () {
      var $this = $(this).parents(".select-submenu");
      $(this).on('changeDate', function (event) {
        //$name = 
        var day = $(this).datepicker('getDate').getDate();
        var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        var selectedMonthName = months[$(this).datepicker('getDate').getMonth()];
        var year = $(this).datepicker('getDate').getFullYear();
        var $name = day + " " + selectedMonthName + " " + year;
        $this.find(">li>a").html($name + "<span class='mycaret'></span>");
        $this.find(">li>a").trigger("click");
        $this.find(">li").removeClass("open");
      });
    });
  });
}

//footer bottom
function footer() {
  $("body").css({ "padding-bottom": $("#footer").outerHeight() + parseInt($("#footer").css("margin-top")), "min-height": $(window).height() + 0 });
}
//resize
$(window).resize(function () {
  menuResize();
  textEllipse();
  footer();
  film();
});

$(document).ready(function () {
  menu();
  menuResize();
  slider();
  film();
  textEllipse();
  footer();
  yandexMap();
  schedule();
  anchor();
  popup();
  calendar();
  loadingCards();
});