﻿
/* chart 配置 */

/*备案信息统计分析*/
//图表1
if(document.getElementById('main1')){
    var statistics1 = echarts.init(document.getElementById('main1'));
    var statistics1Option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data:['备案数量','价格'],
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#333'
            },
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisLine: {
                    lineStyle: {
                        color: '#6eaaee' //坐标轴线线的颜色。
                    }
                },
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '备案数量',
                min: 0,
                max: 250,
                interval: 50,
                axisLine: {
                    lineStyle: {
                        color: '#6eaaee' //坐标轴线线的颜色。
                    }
                },
                axisLabel: {
                    formatter: '{value} KG',

                }
            },
            {
                type: 'value',
                name: '价格',
                min: 0,
                max: 25,
                interval: 5,
                axisLine: {
                    lineStyle: {
                        color: '#6eaaee' //坐标轴线线的颜色。
                    }
                },
                axisLabel: {
                    formatter: '{value} 元'
                }
            }
        ],
        series: [
            {
                name:'备案数量',
                type:'bar',

                data:[2.0, 19.9, 7.0, 23.2, 65.6, 76.7, 135.6, 162.2, 32.6, 80.0, 6.4, 3.3]
            },

            {
                name:'价格',
                type:'line',
                yAxisIndex: 1,
                color:'#fff',

                data:[8.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };
    statistics1.setOption(statistics1Option);
}

//图表2
if(document.getElementById('main2')){
    var statistics2 = echarts.init(document.getElementById('main2'));
    var statistics2Option = {
        title : {
            text: '备案数量增长率',
            x: 'center',
            align: 'right',
            textStyle: {
                fontSize:14,
                color: '#333'
            },
        },
        backgroundColor: '',
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['同比', '环比'],
            top: 'bottom',
            textStyle: {
                color: '#333'
            },
        },
        grid: {
            left: '3%',
            right: '4%',

            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            }

        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#aaa', '#ddd'],
                    type :'solid'
                }
            },
            name: '增长率(%)',
            type: 'value'


        },
        series: [{
            name: '同比',
            type: 'line',
            data: [42, 5, 3, 39, 55, 2, 6,42, 5, 3, 39, 55],
            color:'#6eaaee'
        }, {
            name: '环比',
            type: 'line',
            data: [32, 2, 4, 7, 3, 2, 7,32, 2, 4, 7, 3]
        }]
    };
    statistics2.setOption(statistics2Option);
}

//图表3
if(document.getElementById('main3')){
    var statistics3 = echarts.init(document.getElementById('main3'));
    var statistics3Option = {
        title : {
            text: '价格增长率',
            x: 'center',
            align: 'right',
            textStyle: {
                fontSize:14,
                color: '#333'
            }
        },
        backgroundColor: '',
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['环比','同比'],
            top: 'bottom',
            textStyle: {
                color: '#333'
            },
        },
        grid: {
            left: '3%',
            right: '4%',

            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            }

        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#aaa', '#ddd'],
                    type :'solid'
                }
            },
            name: '增长率(%)'

        },
        series: [ {
            name: '环比',
            type: 'line',
            data: [32, 2, 4, 7, 3, 2, 7, 4, 7, 3, 2, 7],
            color:'#6eaaee'
        },{
            name: '同比',
            type: 'line',
            data: [2, 5, 3, 39, 55, 2, 6, 3, 39, 55, 2, 6]
        }]
    };
    statistics3.setOption(statistics3Option);
}

/*赋码系统-赋码信息统计*/
/*食品-图表1*/
if(document.getElementById('coding-info1')){
    var codingInfo1 = echarts.init(document.getElementById('coding-info1'));
    var codingInfo1Option = {
        color: ['#c6e647'],
        textStyle:{
            fontSize:14
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
            }
        },
        grid: {
            left : '10',
            right: '8%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                name : '公\n司\n名\n称',
                type : 'category',
                data : ['德州香肠', '郎野蜂蜜', '大峰蛋糕'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 14
                    }
                }
            }
        ],
        yAxis : [
            {
                name:'数量',
                type : 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 14
                    }
                }
            }
        ],
        series : [
            {
                name:'数量',
                type:'bar',
                barWidth: '60%',
                data:[15000, 26000, 9652]
            }
        ]
    };
    codingInfo1.setOption(codingInfo1Option);
}


/*食品-图表2*/
if(document.getElementById('coding-info2')){
    var codingInfo2 = echarts.init(document.getElementById('coding-info2'));
    var codingInfo2Option = {
        title : {
            text: '食品赋码增长率',
            x: 'center',
            align: 'right',
            textStyle: {
                fontSize:14,
                color: '#333'
            },
        },
        backgroundColor: '',
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['同比', '环比'],
            bottom: '8%',
            textStyle: {
                color: '#333'
            },
        },
        grid: {
            left: '3%',
            right: '4%',

            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            }

        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#aaa', '#ddd'],
                    type :'solid'
                }
            },
            name: '增长率(%)',
            type: 'value'


        },
        series: [{
            name: '同比',
            type: 'line',
            data: [42, 5, 3, 39, 55, 2, 6,42, 5, 3, 39, 55],
            color:'#6eaaee'
        }, {
            name: '环比',
            type: 'line',
            data: [32, 2, 4, 7, 3, 2, 7,32, 2, 4, 7, 3]
        }]
    };
    codingInfo2.setOption(codingInfo2Option);
}

/*食用农产品-图表1*/
if(document.getElementById('coding-info3')){
    var codingInfo3 = echarts.init(document.getElementById('coding-info3'));
    var codingInfo3Option = {
        color: ['#c6e647'],
        textStyle:{
            fontSize:14
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
            }
        },
        grid: {
            left : '10',
            right: '8%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                name : '公\n司\n名\n称',
                type : 'category',
                data : ['黄金\n篮', '名利\n蔬菜', '康源\n蔬菜','润百\n合', '赢泰\n田园', '艾绿\n吉泰','金鼎\n种植'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 14
                    }
                }
            }
        ],
        yAxis : [
            {
                name:'数量',
                type : 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 14
                    }
                }
            }
        ],
        series : [
            {
                name:'数量',
                type:'bar',
                barWidth: '60%',
                data:[15000, 26000, 9652,12000, 16000, 10652, 8652]
            }
        ]
    };
    codingInfo3.setOption(codingInfo3Option);
}

/*食用农产品-图表2*/
if(document.getElementById('coding-info4')){
    var codingInfo4 = echarts.init(document.getElementById('coding-info4'));
    var codingInfo4Option = {
        title : {
            text: '食用农产品赋码增长率',
            x: 'center',
            align: 'right',
            textStyle: {
                fontSize:14,
                color: '#333'
            }
        },
        backgroundColor: '',
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['环比','同比'],
            bottom: '8%',
            textStyle: {
                color: '#333'
            },
        },
        grid: {
            left: '3%',
            right: '4%',

            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            }

        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#6eaaee'
                }
            },
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#aaa', '#ddd'],
                    type :'solid'
                }
            },
            name: '增长率(%)'

        },
        series: [ {
            name: '环比',
            type: 'line',
            data: [32, 2, 4, 7, 3, 2, 7, 4, 7, 3, 2, 7],
            color:'#6eaaee'
        },{
            name: '同比',
            type: 'line',
            data: [2, 5, 3, 39, 55, 2, 6, 3, 39, 55, 2, 6]
        }]
    };
    codingInfo4.setOption(codingInfo4Option);
}



//echart 解决不同屏幕适配
$(window).resize(function(){
    //备案信息统计分析
    if(document.getElementById('statistics1')) {
        statistics1.resize();
        statistics2.resize();
        statistics3.resize();
    }
    //赋码系统-赋码信息统计
    if(document.getElementById('coding-info1')){
        codingInfo1.resize();
        codingInfo2.resize();
        codingInfo3.resize();
        codingInfo4.resize();
    }

});

/* ====== chart 配置end */