/**
 * 
 * Created by wmh on 20190411.
 * 实现hash模式的路由
 */
var _$router = {
  _init: function (options) {
    // 监听hash
    var that = this;
    window.onhashchange = function (e) {
      var _newPath = that._splitRouter((e.newURL).substring(e.newURL.indexOf("#") + 1));
      var _id = _newPath.query && _newPath.query.reftab ? _newPath.query.reftab : "0";
      (!!_id) && that._triggerClick(options, _id)
    }

    var url = this._splitRouter(window.location.hash.substring(1));
    if (options.sideBar.find("a[data-nav-id='" + url.query.reftab + "']").length > 0) {
      this._triggerClick(options, url.query.reftab)
    } else {
      //不存在直接重定向
      var firstMenu = this._getFirstMenu(options)
      var jumpUrl = firstMenu.url + (firstMenu.url.indexOf("?") > -1 ? "&" : "?") + "reftab=" + firstMenu.id;
      window.location.hash = "#" + jumpUrl;
    }
  },
  _triggerClick: function (options, id) {
    var $target = options.sideBar.find("a[data-nav-id='" + id + "']")
    var treeClass = "treeview-menu";
    var checkElement = $target.parents("." + treeClass);
    $target.trigger("click");
    if ((checkElement.is('.' + treeClass)) && (!checkElement.is(':visible'))) {
      checkElement.prev("a").trigger("click");
    }
  },
  _getFirstMenu: function (options) {
    var navIdArr = options.sideBar.find("a[data-nav-id]");
    for (var k = 0; k < navIdArr.length; k++) {
      var _href = navIdArr.eq(k).attr("href");
      var _id = navIdArr.eq(k).attr("data-nav-id");
      if (_id && _href !== "#" && !((/^javascript:/g).test(_href))) {
        return {
          id: _id,
          url: _href
        }
      }
    }
    return {}
  },
  _splitRouter: function (allPath) {
    var _allPath = typeof allPath == "string" ? allPath : window.location.hash.substring(1);
    var _allPathArr = _allPath.split("?");
    return {
      path: _allPathArr[0] ? _allPathArr[0] : "/",
      query: this._getSearchKey((_allPathArr[1] || "")),
      full: _allPath
    };
  },
  _getSearchKey: function (argStr) {
    var argObj = {},
      item = null,
      value = null,
      key = null,
      argArr = argStr.length > 0 ? argStr.split("&") : [];
    for (var i = 0, len = argArr.length; i < len; i++) {
      item = argArr[i].split("=");
      key = item[0];
      value = item[1];
      argObj[key] = value;
    }
    return argObj
  },
}

/**
 * http://git.oschina.net/hbbcs/bootStrap-addTabs
 * Created by joe on 2015-12-19.
 * Modified by wmh
 */

$.fn.addtabs = function (options) {
  var obj = $(this);
  options = $.extend({
    iframeWrap: null,
    content: '', //直接指定所有页面TABS内容
    close: true, //是否可以关闭
    monitor: 'body', //监视的区域
    nav: '.nav-addtabs',
    tab: '.tab-addtabs',
    iframeUse: true, //使用iframe还是ajax
    iframeHeight: $(window).height() - 50, //固定TAB中IFRAME高度,根据需要自己修改
    iframeForceRefresh: false, //点击后强制加载对应的iframe
    iframeForceRefreshTable: false, //点击后强制刷新对应的iframe中的table
    callback: function () {
      //关闭后回调函数
    }
  }, options || {});
  var navobj = $(options.nav);
  var tabobj = $(options.tab);
  $(options.monitor).on('click', '[data-nav-id]', function (e) {
    var _href = $(this).attr('href');
    // if ($(this).attr('href').indexOf("javascript:") !== 0) {
    if (_href !== "#" && !((/^javascript:/g).test(_href))) {
      if ($(this).is("a")) {
        e.preventDefault();
      }
      var id = $(this).attr('data-nav-id');
      var title = $(this).children("span").eq(0).text();
      var url = _href;
      var icon = $(this).children(".fa").attr("class");
      var content = "";
      var ajax = false;

      document.title = title;
      _add.call(this, {
        id: id,
        title: title,
        content: content,
        url: url,
        ajax: ajax,
        icon: icon
      });
    }
  });

  navobj.on('click', '.close-tab', function () {
    var id = $(this).prev("a").attr("aria-controls");
    _close(id);
    return false;
  });
  navobj.on('click', 'li[role=presentation]', function () {
    $("a[data-nav-id=" + $("a", this).attr("node-id") + "]").trigger("click");
  });
  var _calWidth = function () {
    var siblingsWidth = 0;
    navobj.siblings().each(function () {
      siblingsWidth += $(this).outerWidth();
    });
    navobj.width(navobj.parent().width() - siblingsWidth - 50);
  };
  _calWidth();
  $(window).resize(function () {
    _calWidth();
    _drop();
  });

  var _add = function (opts) {
    var id, tabid, conid, url;
    id = opts.id;
    tabid = 'tab_' + opts.id;
    conid = 'con_' + opts.id;
    url = opts.url;
    // url += (opts.url.indexOf("?") > -1 ? "&addtabs=1" : "?addtabs=1");

    var tabitem = $('#' + tabid, navobj);
    var conitem = $('#' + conid, tabobj);

    navobj.find("[role='presentation']").removeClass('active');
    tabobj.find("[role='tabpanel']").removeClass('active');

    //如果TAB不存在，创建一个新的TAB
    if (tabitem.length === 0) {
      //创建新TAB的title
      tabitem = $('<li role="presentation" id="' + tabid + '"><a href="' + url + '" node-id="' + opts.id + '" aria-controls="' + id + '" role="tab" data-toggle="tab"><i class="' + opts.icon + '"></i><span>' + opts.title + '</span></a></li>');
      //是否允许关闭
      if (options.close && $("li", navobj).length > 0) {
        tabitem.append(' <i class="close-tab fa fa-remove"></i>');
      }
      if (conitem.length === 0) {
        if (options.iframeWrap) {
          $("[role='tabpanel']").removeClass("show");
          var _str = '<div role="tabpanel" class="tab-pane show" id="' + conid + '" data-ifr-id="' + opts.id + '">';
          _str += '<iframe  src="' + opts.url + '" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe>'
          _str += '</div>';
          options.iframeWrap.append(_str)
        }
        tabobj.append(conitem);
      }
      //加入TABS
      if ($('.tabdrop li', navobj).length > 0) {
        $('.tabdrop ul', navobj).append(tabitem);
      } else {
        navobj.append(tabitem);
      }
    } else {
      $("[role='tabpanel']").removeClass("show");
      $("#" + conid).addClass("show")
      //强制刷新iframe
      if (options.iframeForceRefresh) {
        $("#" + conid + " iframe")[0].contentWindow.location.reload(true)
      }
    }
    //激活TAB
    tabitem.addClass('active');
    // conitem.addClass("active");
    _drop();
  };

  var _close = function (id) {
    var tabid = 'tab_' + id;
    var conid = 'con_' + id;
    var tabitem = $('#' + tabid, navobj);
    var conitem = $('#' + conid, tabobj);
    //如果关闭的是当前激活的TAB，激活他的前一个TAB
    if (obj.find("li.active").not('.tabdrop').attr('id') === tabid) {
      var prev = tabitem.prev().not(".tabdrop");
      var next = tabitem.next().not(".tabdrop");
      if (prev.length > 0) {
        prev.find('a').trigger("click");
      } else if (next.length > 0) {
        next.find('a').trigger("click");
      } else {
        $(">li:not(.tabdrop):last > a", navobj).trigger('click');
      }
    }
    //关闭TAB
    tabitem.remove();
    conitem.remove();
    _drop();
    options.callback();
  };

  var _drop = function () {
    navobj.refreshAddtabs();
  };
};
//刷新Addtabs
$.fn.refreshAddtabs = function () {
  var navobj = $(this);
  var dropdown = $(".tabdrop", navobj);
  if (dropdown.length === 0) {
    dropdown = $('<li class="dropdown pull-right hide tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;">' +
      '<i class="fa fa-align-justify"></i>' +
      ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>');
    dropdown.prependTo(navobj);
  }

  //检测是否有下拉样式
  if (navobj.parent().is('.tabs-below')) {
    dropdown.addClass('dropup');
  }

  var collection = 0;
  var maxwidth = navobj.width() - 65;

  var liwidth = 0;
  //检查超过一行的标签页
  var litabs = navobj.append(dropdown.find('li')).find('>li').not('.tabdrop');
  var totalwidth = 0;
  litabs.each(function () {
    totalwidth += $(this).outerWidth(true);
  });
  if (navobj.width() < totalwidth) {
    litabs.each(function () {
      liwidth += $(this).outerWidth(true);
      if (liwidth > maxwidth) {
        dropdown.find('ul').append($(this));
        collection++;
      }
    });
    if (collection > 0) {
      dropdown.removeClass('hide');
      if (dropdown.find('.active').length === 1) {
        dropdown.addClass('active');
      } else {
        dropdown.removeClass('active');
      }
    }
  } else {
    dropdown.addClass('hide');
  }

};

//页面主逻辑
$(function () {

  //点击左侧菜单
  $(document).on('click', '.sidebar-menu li a', function (e) {
    var _href = $(this).attr("href");
    if (!(_href.match(/^http/g) || _href.match(/^\/\//g))) {
      e.preventDefault();
      var _id = $(this).attr("data-nav-id");
      if (_id && _href !== "#" && !((/^javascript:/g).test(_href))) {
        window.location.hash = _href.indexOf("?") > -1 ? (_href + "&reftab=" + _id) : (_href + "?reftab=" + _id);
      }
    };
  });
  //全屏事件
  $(document).on('click', "[data-toggle='fullscreen']", function () {
    var doc = document.documentElement;
    if ($(document.body).hasClass("full-screen")) {
      $(document.body).removeClass("full-screen");
      document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
    } else {
      $(document.body).addClass("full-screen");
      doc.requestFullscreen ? doc.requestFullscreen() : doc.mozRequestFullScreen ? doc.mozRequestFullScreen() : doc.webkitRequestFullscreen ? doc.webkitRequestFullscreen() : doc.msRequestFullscreen && doc.msRequestFullscreen();
    }
  });
  //退出事件
  $(document).on('click', "[data-toggle='logOut']", function () {
    layer.confirm('确认退出？', {
      btn: ['确定', '取消'] //按钮
    }, function () {
      //做你想做的操作
      window.location.href = "//" + window.location.host;
    });
  });
  //顶部和路由初始化
  // $("#app-main-content").css("height",$(window).height()-$(".main-header").height()+"px")
  $(".nav-addtabs").addtabs({
    iframeWrap: $("#app-main-content")
  });
  _$router._init({
    sideBar: $('.sidebar-menu').eq(0)
  });
});