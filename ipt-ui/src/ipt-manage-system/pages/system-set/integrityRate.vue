<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>系统设置</a></li>
      <li class="active jsh-active">诚信评级管理</li>
    </ol>
    <div class="main">
      <!--search 组件-->
      <div class="shadow-boxs">
        <!--search 搜索框 组件-->
        <div class="r-search search2">
          <form class="form form-inline">
            <div class="form-group">
              <label>诚信评级:</label>
              <select type="text" class="form-control search-01 select-form" placeholder="">
                <option>全部</option>
                <option>优秀</option>
                <option>良好</option>
                <option>较差</option>
                <option>黑名单</option>
              </select>
            </div>
            <div class="form-group my-group">
              <button type="button" class="btn btn-search"> 查询</button>
            </div>
          </form>
        </div>
      </div>
      <!--table 组件-->
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <div class="table-container">
            <div class="thead-bg"></div>
            <div class="col-xs-12 table-box">
              <table class="table table-condensed">
                <thead>
                <tr>
                  <th>
                    序号
                  </th>
                  <th>
                    诚信评级
                  </th>
                  <th>
                    上限分值
                  </th>
                  <th>
                    下限分值
                  </th>
                  <th>
                    操作
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    1
                  </td>
                  <td>
                    优秀
                  </td>
                  <td>
                    100
                  </td>
                  <td>
                    86
                  </td>
                  <td>
                    <a class="edit-link" data-toggle="modal" data-target="#user-add-modal">编辑</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    2
                  </td>
                  <td>
                    良好
                  </td>
                  <td>
                    85
                  </td>
                  <td>
                    71
                  </td>
                  <td>
                    <a class="edit-link" data-toggle="modal" data-target="#user-add-modal">编辑</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    3
                  </td>
                  <td>
                    较差
                  </td>
                  <td>
                    70
                  </td>
                  <td>
                    60
                  </td>
                  <td>
                    <a class="edit-link" data-toggle="modal" data-target="#user-add-modal">编辑</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    4
                  </td>
                  <td>
                    黑名单
                  </td>
                  <td>
                    60
                  </td>
                  <td>
                    0
                  </td>
                  <td>
                    <a class="edit-link" data-toggle="modal" data-target="#user-add-modal">编辑</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <nav aria-label="Page navigation" class="pull-right">
            <ul class="pagination pagination-sm">
              <li class="previous disabled">
                <span aria-hidden="true">«</span>
              </li>
              <li class="active "><a>1</a></li>
              <li><a>2</a></li>
              <li><a>3</a></li>
              <li><a>4</a></li>
              <li><a>5</a></li>
              <li class="next">
                <a aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <!--模态框-->
        <div class="modal fade" id="user-add-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title myModalLabel">添加用户</h4>
              </div>
              <div class="modal-body form-control-content row">
                <div class="modal-left col-xs-12">
                  <!--search 组件-->
                  <div class="shadow-boxs">
                    <!--search 搜索框 组件-->
                    <div class="r-search search2">
                      <form class="form form-inline">
                        <div class="form-group">
                          <label>上限分值：</label>
                          <input type="text" class="form-control search-01" placeholder="">
                          <label>下限分值：</label>
                          <input type="text" class="form-control search-01" placeholder="">
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="edit btn btn-reset" data-dismiss="modal">取消</button>
                <button type="button" class="edit btn btn-search" data-dismiss="modal">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
