## 项目说明

### 项目结构

### 前端路由

### 页面图标样式
页面已经引入fontawesome字体图标库，可访问[fontawesome字体图标库](http://fontawesome.dashgame.com/)添加或修改图标样式

## 项目功能组件


### 表格



### 分页
分页功能已经全局配置，只需在页面添加对应dom节点即可，分页的每次点击，将会向后端发送一次请求（url会携带上对应参数：/admin/auth/adminlog?pagesize=10&page=3），同时替换当前页面

	<div 
		class="fixed-table-pagination"
	    data-url="/admin/auth/adminlog"
	    data-toggle="table-pagination" 
	    data-table-id="my-table-wrap" 
	    data-page-size="25"
	    data-page-total="100"
	    data-page-index="1"
	   ></div>
	   

配置参数说明：

	data-toggle="table-pagination" 该标识表示所在标签为分页容器，将会自动进行初始化配置
    data-url：翻页时，跳转的路由地址
	data-table-id：分页功能对应表格的id(一个页面可能存在多个表格的情况)
	data-page-size：每页多少条
	data-page-total：总共条数
	data-page-index：当前第几页

### 表单
表单均采用form方式进行提交，选用html现有表单标签即可。

下面重点介绍下表单校验部分：  

表单校验采用nice validator,已全局配置完毕，页面中直接使用即可。详细介绍请参见[官方文档](https://validator.niceue.com/docs/custom-rules.html)  

对于type="text"的input标签，如果必填则添加data-rule="required;"属性即可：

		<input type="text" data-rule="required;">

如果需要其他校验规则，通过分号分割进行配置即可，更多用法请参见[内置规则和自定义规则](https://validator.niceue.com/docs/core-rules.html)

		<input type="text" data-rule="required;length(6~16)">

对于select标签 添加data-rule="required;"即可，

		<select class="form-control" name="_type" data-rule="required;">
          <option value="">请选择</option>
          <option value="number">数字</option>
          <option value="txt">文本</option>
          <option value="date">日期</option>
        </select>
对于type="radio"和type="checkbox"的input组件，只需要在一个一组选项内的任一个标签上添加data-rule="checked"即可（注意，不是data-rule="required;"）

		<div class="form-group animated-radio-button">
		<label for="sex" class="control-label col-xs-12 col-sm-2" >单选</label>
		<div class="col-xs-12 col-sm-4 form-control-label">
		    <label>
		        <input type="radio" name="sex" value="1" data-rule="checked"><span class="label-text">单选1</span>
		      </label>
		      <label>
		        <input type="radio" name="sex" value="2"><span class="label-text">单选2</span>
		      </label>
		      <label>
		        <input type="radio" disabled name="sex" value="3"><span class="label-text">单选3（禁用）</span>
		      </label>
		</div>
		</div>
		<div class="form-group animated-checkbox">
		<label for="ask" class="control-label col-xs-12 col-sm-2">多选</label>
		<div class="col-xs-12 col-sm-4 form-control-label">
		        <label>
		          <input type="checkbox" name="ask" value="1" data-rule="checked(2)"><span class="label-text">多选1</span>
		        </label>
		        <label>
		          <input type="checkbox" name="ask" value="2"><span class="label-text">多选2</span>
		        </label>
		        <label data-rule="">
		          <input type="checkbox" disabled name="ask" value="3"><span class="label-text">多选3(禁用)</span>
		        </label>
		        </div>
		</div>



### 可视化图表

对应页面引入js/plugins/echarts.min.js 文件，使用教程参见官网文档：[echart-demo](https://echarts.baidu.com/examples/)


### 时间选择控件

首先，对应页面引入js/plugins/flatpickr.min.js 文件。

其次，页面放入对应标签，注意，请在对应标签上添加class:"date-time-picker"

	<input 
	class="date-time-picker" 
	data-date-format="Y-m-d H:i"
	data-min-date="2019-4-1 00:00"
	data-max-date="2019-4-8 23:59"
	data-disable-time="false"
	data-default-date="2019-4-2 12:00"
	placeholder="请选择时间"
	name="s-time">

配置参数说明：

	data-date-format：时间格式化配置，默认为"Y-m-d H:i"
    data-min-date：控制选择的时间范围的最小日期，如果不需要，不配置即可，注意与data-date-format的格式相匹配
	data-min-date：控制选择的时间范围的最大日期，如果不需要，不配置即可，注意与data-date-format的格式相匹配
	data-disable-time：为true时，则只展示日期选择功能，同时请将data-date-format设置为：Y-m-d
	data-default-date：初始化时的默认值，不设置则显示placeholder中的内容

如果以上无法满足需求，请按照[官方文档](https://flatpickr.js.org/getting-started/)，自行进行初始化配置

### 文件上传控件

首先，对应页面引入js/plugins/flatpickr.min.js 文件。

其次，页面放入对应标签，注意，请在对应标签上添加class:"files-upload-wrap"

	<input 
      id="files-upload-1"
      class="files-upload-wrap" 
      data-default-imgurl="https://zhwimg.zuhaowan.com/images/gg_img/2019-04-16/5cb56d7d8ff8b.jpg"
      data-upload-url="/api/upload"
      data-drop-zone="true"
      data-accept="jpg,png,gif"
      data-extra-data='TOKEN=123&name=456'
	  data-max-size="1000"
      type="file">
配置参数说明：
    
	data-default-imgurl：初始化时的默认文件地址
	data-upload-url：上传文件的地址
	data-drop-zone：为true时，将展示拖拽区域
	data-accept：允许上传的文件类型
	data-extra-data：ajax异步上传时的附加参数，请用用&符进行拼接
    data-max-size：文件大小的上限，单位为kb

如果以上无法满足需求，请按照[官方文档](http://plugins.krajee.com/file-input)，自行进行初始化配置


### 弹窗/提示类
全局已引入layer.js, 详细使用教程参见官网文档：[layer官方文档](http://layer.layui.com/)

询问类：

	layer.confirm('确认退出？', {
      btn: ['确定', '取消'] //按钮
    }, function (index) {
      layer.close(index);//关闭弹窗
      //确定相关功能
    },function(index){
		layer.close(index);//关闭弹窗
		//取消相关功能
		})
弹窗提示类

	layer.alert("重置成功", {
	                icon: 6
	            })
toast提示类

   	layer.msg("没有更多了")

顶部Notification悬浮提示：

	layer.success("我是成功类的样式提示")

	layer.info("我是正常类的样式提示")

	layer.error("我是失败警告类的样式提示")


## 后续扩展

如果功能不满足需求，可在html页面中通过script标签自行引入对应文件，注意每个页面都需要引入 `backend.min.css` 和 `common_dep.js`这两个文件
