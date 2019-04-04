(function () {
  "use strict";
  //路由功能，实现建议hash模式的路由
    var _router={
      _init:function($wrap){
        var that=this;
        this._initPath=(window.location.hash).substring(1);
        this._creatFrame($wrap,this._initPath);
        window.onhashchange=function(e){
          var _newPath=(e.newURL).substring(e.newURL.indexOf("#")+1)
          that._taggleFrame($wrap,_newPath)
        }
      },
      _taggleFrame($wrap,path){
        var _target=$wrap.find("div[data-index='"+path+"']");
        $wrap.children(".tab-pane").removeClass("active");
        if(_target.length>0){
          _target.toggleClass("active")
        }else{
          this._creatFrame($wrap,path)
        }
      },
      _creatFrame:function($wrap,path){
        var _str='<div class="tab-pane active" data-index="'+path+'">';
            _str+='<iframe src="'+path+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe>'
            _str+='</div>';
        $wrap.append(_str)
      }
    }
    _router._init($("#app-main-content"));
	  var treeviewMenu = $('.app-menu');
	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
    $('.app').toggleClass('sidenav-toggled');
    $(".app-header__logo").toggleClass('home-logo-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function(event) {
		event.preventDefault();
		if(!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});
  $("").trigger("click");
	// Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
  $("[data-toggle='tooltip']").tooltip();
  

})();
