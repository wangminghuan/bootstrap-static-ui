 // 侧边栏收起相关操作
 (function () {
   $('[data-toggle="sidebar"]').click(function (event) {
     event.preventDefault();
     $('.app').toggleClass('sidenav-toggled');
     $(".app-header__logo").toggleClass('home-logo-toggled');
   });
 })();
 //左侧菜单栏相关功能
 (function () {
   $(".app-menu .side-menu-item").click(function (e) {
     //获取点击的元素给其添加样式，讲其兄弟元素的样式移除
     $(this).addClass("active").siblings().removeClass("active");
     //包含二级菜单的选项展开
     var $expand = $(e.target).parent("[data-toggle='treeview']").length > 0 ? $(e.target).parent("[data-toggle='treeview']") : $(e.target);
     if ($expand.attr('data-toggle') === 'treeview') {
       var $parent = $expand.parent();
       var $child = $parent.children(".treeview-menu");
       if ($parent.hasClass("is-expanded")) {
         $parent.removeClass('is-expanded');
         $child.css("height", "0px")
       } else {
         var _height = $child.children("li").height() * $child.children("li").length;
         $child.css("height", (_height) + "px")
         $parent.addClass('is-expanded');
       }


     }
     //移除所有二级菜单的样式
     ($(this).parent().children(".is-expanded").children(".treeview-menu").find("li")).removeClass("active");
     $(this).siblings(".is-expanded").removeClass("is-expanded").children(".treeview-menu").css("height", "0px")
     //激活二级菜单的样式
     if ($(this).hasClass("is-expanded")) {
       $(e.target).parent("li").addClass("active");
     }

   });
 })();



 //侧边菜单mini模式时的交互效果
 (function () {
   $(".app-menu .treeview").hover(function () {
     if ($('body').hasClass("sidenav-toggled")) {
       var $child = $(this).children(".treeview-menu");
       var _height = $child.children("li").height() * $child.children("li").length;
       $child.css("height", (_height) + "px")
     }
   }, function () {
     if ($('body').hasClass("sidenav-toggled")) {
       $(this).children(".treeview-menu").css("height", "0")
     }
   })
 })();


 //路由功能，实现hash模式的路由
 (function () {
   var $treeviewMenu = $('.app-menu');
   var _router = {
     init: function ($wrap, $viewMenu) {
       var that = this;
       this._query = this.routerQuery();
       //重定向或初始化
       this.redirect($viewMenu, this._query, $wrap);
       //监听hash变化
       window.onhashchange = function (e) {
         var _newPath = (e.newURL).substring(e.newURL.indexOf("#") + 1)
         that.taggleFrame($wrap, _newPath)
       }
     },
     redirect: function ($viewMenu, _query, $wrap) {
       var $routerPath = [],
         $router = $viewMenu.find("a");
       for (var k = 0; k < $router.length; k++) {
         var _href = $router.eq(k).attr("href")
         if (_href.match(/^\//g) && $routerPath.indexOf(_href) == -1) {
           $routerPath.push(_href)
         }
       }
       if ($routerPath.indexOf(_query.full) == -1) {
         window.location.hash = "#" + $routerPath[0];
         this.initMenu($routerPath[0], $viewMenu)
       } else {
         this.initMenu(_query.full, $viewMenu);
         this.creatFrame($wrap, _query.full);
       }

     },
     initMenu: function (path, $viewMenu) {
       //阻止A标签的跳转，手动强制为hash模式
       $viewMenu.find("a").click(function (e) {
         e.preventDefault();
         var _href = $(this).attr("href")
         if (_href.match(/^\//g)) {
           window.location.hash = _href;
         }
       });
       var $menu = ($viewMenu.find("a[href='" + path + "']")).eq(0);
       if ($menu.parents(".treeview")) {
         $menu.parents(".treeview").eq(0).children("[data-toggle='treeview']").click()
       }
       $menu.click();
     },
     routerQuery: function () {
       var _allPath = (window.location.hash).substring(1);
       var _allPathArr = _allPath.split("?");
       return {
         path: _allPathArr[0] ? _allPathArr[0] : "/",
         query: this.getSearchKey((_allPathArr[1] || "")),
         full: _allPath
       };
     },
     getSearchKey: function (argStr) {
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
     taggleFrame($wrap, path) {
       //过滤search参数
       var _path = path.split("?")[0] ? path.split("?")[0] : path;
       var _target = $wrap.find("div[data-index='" + _path + "']");
       $wrap.children(".tab-pane").removeClass("active");
       if (_target.length > 0) {
         _target.toggleClass("active")
       } else {
         //初始化创建
         this.creatFrame($wrap, path)

       }
     },
     creatFrame: function ($wrap, path) {
       var _str = '<div class="tab-pane active" data-index="' + path + '">';
       _str += '<iframe src="' + path + '" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe>'
       _str += '</div>';
       $wrap.append(_str)
     }
   }
   //初始化操作
   _router.init($("#app-main-content"), $treeviewMenu);
 })();


 $('[data-toggle="popover"]').popover();

 //退出功能
 $('#logout-btn').click(function () {
   $("#myLogOutPop").modal({})
 })
 $("#confirmLogOut").click(function () {
   // 退出时的相关功能
   // do some thing...
   alert("退出成功！")
 })

 //  其他控件类初始化
 // 时间选择控件初始化
 if ($.fn.flatpickr) {
   $('.date-time-picker').flatpickr({
     enableTime: true,
     dateFormat: "Y-m-d H:i",
     defaultHour: 0,
     time_24hr: true
   });
 }

 