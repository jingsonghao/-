//【树形插件 调用】
jQuery(function ($) {
    $('#tree1').ace_tree({
        dataSource: treeDataSource,//数据来源
        multiSelect: false,
        'open-icon': 'icon-minus',
        'close-icon': 'icon-plus',
        'selectable': true,
    });
    $('#tree2').ace_tree({
        dataSource: treeDataSourcetwo,//数据来源
        multiSelect: false,
        'open-icon': 'icon-minus',
        'close-icon': 'icon-plus',
        'selectable': true,
    });
});