import axios from 'axios'
import utils from '@/utils'
import {setTokenParams} from '@/utils/auth'
import fetch from '@/utils/fetch'
import {MessageBox} from 'element-ui'

export default {
  getMenuList(params) {
    return fetch({
      url: '/admin/menu/getUserMenuList',
      method: 'get',
      params: params
    }).then(data => {
      return Promise.resolve(data)
    }, () => {
      return Promise.resolve({
        "status": 200,
        "msg": "操作成功",
        "data": [
          {
            "resourcesId": 1,
            "parentId": 0,
            "icon": "fa-desktop",
            "menuName": "平台首页",
            "menuUrl": "/cityPlatform",
            "childrens": []
          },
          {
            "resourcesId": 2,
            "parentId": 0,
            "icon": "fa-gears",
            "menuName": "追溯管理系统",
            "menuUrl": "javascript:void(0);",
            "childrens": [
              {
                "resourcesId": 3,
                "parentId": 2,
                "icon": "",
                "menuName": "系统首页",
                "menuUrl": "/traceBack/retrospectManages",
                "childrens": []
              },
              {
                "resourcesId": 4,
                "parentId": 2,
                "icon": "",
                "menuName": "经营主体管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 5,
                    "parentId": 4,
                    "icon": "",
                    "menuName": "信息备案管理",
                    "menuUrl": "/traceBack/filling",
                    "childrens": []
                  },
                  {
                    "resourcesId": 72,
                    "parentId": 4,
                    "icon": "",
                    "menuName": "备案信息审核",
                    "menuUrl": "/traceBack/fillingAudit",
                    "childrens": []
                  },
                  {
                    "resourcesId": 6,
                    "parentId": 4,
                    "icon": "",
                    "menuName": "备案信息统计",
                    "menuUrl": "/traceBack/fileStatistics",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 7,
                "parentId": 2,
                "icon": "",
                "menuName": "追溯信息管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 8,
                    "parentId": 7,
                    "icon": "",
                    "menuName": "追溯链条合成",
                    "menuUrl": "/traceBack/chainSynthesis",
                    "childrens": []
                  },
                  {
                    "resourcesId": 9,
                    "parentId": 7,
                    "icon": "",
                    "menuName": "追溯信息查询",
                    "menuUrl": "/traceBack/circulation",
                    "childrens": []
                  },
                  {
                    "resourcesId": 73,
                    "parentId": 7,
                    "icon": "",
                    "menuName": "剔除信息恢复",
                    "menuUrl": "/traceBack/deleteRecover",
                    "childrens": []
                  },
                  {
                    "resourcesId": 74,
                    "parentId": 7,
                    "icon": "",
                    "menuName": "剔除信息统计",
                    "menuUrl": "/traceBack/deleteStatistics",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 10,
                "parentId": 2,
                "icon": "",
                "menuName": "运行报告管理",
                "menuUrl": "/traceBack/runningReport",
                "childrens": []
              }
            ]
          },
          {
            "resourcesId": 11,
            "parentId": 0,
            "icon": "fa-binoculars",
            "menuName": "监管辅助系统",
            "menuUrl": "javascript:void(0);",
            "childrens": [
              {
                "resourcesId": 12,
                "parentId": 11,
                "icon": "",
                "menuName": "系统首页",
                "menuUrl": "/superviseHelp/superviseSystem",
                "childrens": []
              },
              {
                "resourcesId": 13,
                "parentId": 11,
                "icon": "",
                "menuName": "工作考核管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 14,
                    "parentId": 13,
                    "icon": "",
                    "menuName": "综合性考核",
                    "menuUrl": "/superviseHelp/check/totalExamine",
                    "childrens": []
                  },
                  {
                    "resourcesId": 15,
                    "parentId": 13,
                    "icon": "",
                    "menuName": "考核指标管理",
                    "menuUrl": "/superviseHelp/investigateManagementTarget",
                    "childrens": []
                  },
                  {
                    "resourcesId": 16,
                    "parentId": 13,
                    "icon": "",
                    "menuName": "考核指标类别管理",
                    "menuUrl": "/superviseHelp/check/examineTypeManage",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 17,
                "parentId": 11,
                "icon": "",
                "menuName": "企业诚信管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 18,
                    "parentId": 17,
                    "icon": "",
                    "menuName": "诚信行为记录",
                    "menuUrl": "/superviseHelp/creditArchives/integrityRecord",
                    "childrens": []
                  },
                  {
                    "resourcesId": 19,
                    "parentId": 17,
                    "icon": "",
                    "menuName": "信用档案管理",
                    "menuUrl": "/superviseHelp/creditArchives/creditArchives",
                    "childrens": []
                  },
                  {
                    "resourcesId": 20,
                    "parentId": 17,
                    "icon": "",
                    "menuName": "黑名单管理",
                    "menuUrl": "/superviseHelp/blackList",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 21,
                "parentId": 11,
                "icon": "",
                "menuName": "问题发现管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 22,
                    "parentId": 21,
                    "icon": "",
                    "menuName": "问题项管理",
                    "menuUrl": "/superviseHelp/questionManage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 23,
                    "parentId": 21,
                    "icon": "",
                    "menuName": "问题报告管理",
                    "menuUrl": "/superviseHelp/questionReport",
                    "childrens": []
                  },
                  {
                    "resourcesId": 24,
                    "parentId": 21,
                    "icon": "",
                    "menuName": "问题信息统计",
                    "menuUrl": "/superviseHelp/questionCount",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 25,
                "parentId": 11,
                "icon": "",
                "menuName": "应急事件管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 26,
                    "parentId": 25,
                    "icon": "",
                    "menuName": "应急事件处理",
                    "menuUrl": "/superviseHelp/emergencyHandle",
                    "childrens": []
                  },
                  {
                    "resourcesId": 27,
                    "parentId": 25,
                    "icon": "",
                    "menuName": "应急事件报告",
                    "menuUrl": "/superviseHelp/emergencyRecord",
                    "childrens": []
                  },
                  {
                    "resourcesId": 28,
                    "parentId": 25,
                    "icon": "",
                    "menuName": "应急预案管理",
                    "menuUrl": "/superviseHelp/emergencyPlan",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 75,
                "parentId": 11,
                "icon": "",
                "menuName": "跨城市应急事件管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 76,
                    "parentId": 75,
                    "icon": "",
                    "menuName": "跨城市应急事件处理",
                    "menuUrl": "/superviseHelp/emergencyPlanCross",
                    "childrens": []
                  },
                  {
                    "resourcesId": 77,
                    "parentId": 75,
                    "icon": "",
                    "menuName": "跨城市应急事件报告",
                    "menuUrl": "/superviseHelp/emergencyPlanReport",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 29,
                "parentId": 11,
                "icon": "",
                "menuName": "视频集中管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 30,
                    "parentId": 29,
                    "icon": "",
                    "menuName": "监控视频",
                    "menuUrl": "/superviseHelp/monitorVideo",
                    "childrens": []
                  },
                  {
                    "resourcesId": 31,
                    "parentId": 29,
                    "icon": "",
                    "menuName": "监控记录",
                    "menuUrl": "/superviseHelp/videoRecord",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 32,
                "parentId": 11,
                "icon": "",
                "menuName": "设备管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 33,
                    "parentId": 32,
                    "icon": "",
                    "menuName": "设备入库管理",
                    "menuUrl": "/superviseHelp/equipmentManage/equipmentManage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 34,
                    "parentId": 32,
                    "icon": "",
                    "menuName": "设备调整管理",
                    "menuUrl": "/superviseHelp/equipmentManage/equipmentAdjust",
                    "childrens": []
                  },
                  {
                    "resourcesId": 35,
                    "parentId": 32,
                    "icon": "",
                    "menuName": "设备维护管理",
                    "menuUrl": "/superviseHelp/equipmentManage/equipmentRepair",
                    "childrens": []
                  },
                  {
                    "resourcesId": 36,
                    "parentId": 32,
                    "icon": "",
                    "menuName": "设备库存管理",
                    "menuUrl": "/superviseHelp/equipmentManage/equipmentStorage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 37,
                    "parentId": 32,
                    "icon": "",
                    "menuName": "设备监控管理",
                    "menuUrl": "/superviseHelp/equipmentManage/equipmentMonitor",
                    "childrens": []
                  }
                ]
              }
            ]
          },
          {
            "resourcesId": 38,
            "parentId": 0,
            "icon": "fa-barcode",
            "menuName": "赋码系统",
            "menuUrl": "javascript:void(0);",
            "childrens": [
              {
                "resourcesId": 39,
                "parentId": 38,
                "icon": "",
                "menuName": "系统首页",
                "menuUrl": "/codingSystem/odeCodeSystem",
                "childrens": []
              },
              {
                "resourcesId": 40,
                "parentId": 38,
                "icon": "",
                "menuName": "赋码审批管理",
                "menuUrl": "/codingSystem/approvalManage",
                "childrens": []
              },
              {
                "resourcesId": 41,
                "parentId": 38,
                "icon": "",
                "menuName": "赋码信息统计",
                "menuUrl": "/codingSystem/infoStatistics",
                "childrens": []
              }
            ]
          },
          {
            "resourcesId": 42,
            "parentId": 0,
            "icon": "fa-bar-chart",
            "menuName": "大数据分析系统",
            "menuUrl": "javascript:void(0);",
            "childrens": [
              {
                "resourcesId": 43,
                "parentId": 42,
                "icon": "",
                "menuName": "系统首页",
                "menuUrl": "/dataStatistics/bigDataFirst",
                "childrens": []
              },
              {
                "resourcesId": 44,
                "parentId": 42,
                "icon": "",
                "menuName": "大数据报表分析",
                "menuUrl": "/dataStatistics/ropAnaly/reportAnalysis",
                "childrens": []
              },
              {
                "resourcesId": 45,
                "parentId": 42,
                "icon": "",
                "menuName": "大数据挖掘展示",
                "menuUrl": "/dataStatistics/excavateShow",
                "childrens": []
              },
              {
                "resourcesId": 46,
                "parentId": 42,
                "icon": "",
                "menuName": "大数据审核监测",
                "menuUrl": "/dataStatistics/reviewMonitor",
                "childrens": []
              }
            ]
          },
          {
            "resourcesId": 47,
            "parentId": 0,
            "icon": "fa-gears",
            "menuName": "后台管理系统",
            "menuUrl": "javascript:void(0);",
            "childrens": [
              {
                "resourcesId": 49,
                "parentId": 47,
                "icon": "",
                "menuName": "组织权限管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 50,
                    "parentId": 49,
                    "icon": "",
                    "menuName": "用户管理",
                    "menuUrl": "/manageSystem/orgManage/userManage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 51,
                    "parentId": 49,
                    "icon": "",
                    "menuName": "角色管理",
                    "menuUrl": "/manageSystem/orgManage/roleManage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 52,
                    "parentId": 49,
                    "icon": "",
                    "menuName": "权限管理",
                    "menuUrl": "/manageSystem/orgManage/permissionManage",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 53,
                "parentId": 47,
                "icon": "",
                "menuName": "门户管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 54,
                    "parentId": 53,
                    "icon": "",
                    "menuName": "信息发布",
                    "menuUrl": "/manageSystem/homeManage/infoPublish",
                    "childrens": []
                  },
                  {
                    "resourcesId": 55,
                    "parentId": 53,
                    "icon": "",
                    "menuName": "公众留言反馈",
                    "menuUrl": "/manageSystem/homeManage/leaveMessage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 56,
                    "parentId": 53,
                    "icon": "",
                    "menuName": "追溯企业",
                    "menuUrl": "/manageSystem/homeManage/backEnterprise",
                    "childrens": []
                  },
                  {
                    "resourcesId": 57,
                    "parentId": 53,
                    "icon": "",
                    "menuName": "电商链接",
                    "menuUrl": "/manageSystem/homeManage/ecommerceLinks",
                    "childrens": []
                  },
                  {
                    "resourcesId": 86,
                    "parentId": 53,
                    "icon": "",
                    "menuName": "模板管理",
                    "menuUrl": "/manageSystem/homeManage/templateManage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 87,
                    "parentId": 53,
                    "icon": "",
                    "menuName": "栏目管理",
                    "menuUrl": "//manageSystem/homeManage/channelManage",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 58,
                "parentId": 47,
                "icon": "",
                "menuName": "追溯信息",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 59,
                    "parentId": 58,
                    "icon": "",
                    "menuName": "流通节点数据管理",
                    "menuUrl": "/manageSystem/circulationNodeData",
                    "childrens": []
                  },
                  {
                    "resourcesId": 60,
                    "parentId": 58,
                    "icon": "",
                    "menuName": "重要产品类别管理",
                    "menuUrl": "/manageSystem/productType",
                    "childrens": []
                  },
                  {
                    "resourcesId": 61,
                    "parentId": 58,
                    "icon": "",
                    "menuName": "流通节点类别管理",
                    "menuUrl": "/manageSystem/circulationNode",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 62,
                "parentId": 47,
                "icon": "",
                "menuName": "系统设置",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 63,
                    "parentId": 62,
                    "icon": "",
                    "menuName": "设备类别管理",
                    "menuUrl": "/manageSystem/systemSet/equipmentType",
                    "childrens": []
                  },
                  {
                    "resourcesId": 64,
                    "parentId": 62,
                    "icon": "",
                    "menuName": "设备型号管理",
                    "menuUrl": "/manageSystem/systemSet/equipmentModel",
                    "childrens": []
                  },
                  {
                    "resourcesId": 65,
                    "parentId": 62,
                    "icon": "",
                    "menuName": "设备监控管理",
                    "menuUrl": "/manageSystem/systemSet/equipmentMonitorOption",
                    "childrens": []
                  },
                  {
                    "resourcesId": 78,
                    "parentId": 62,
                    "icon": "",
                    "menuName": "诚信行为类型管理",
                    "menuUrl": "/manageSystem/systemSet/credibilityTypeManage",
                    "childrens": []
                  },
                  {
                    "resourcesId": 79,
                    "parentId": 62,
                    "icon": "",
                    "menuName": "诚信评级管理",
                    "menuUrl": "/manageSystem/systemSet/credibilityGradeManage",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 66,
                "parentId": 47,
                "icon": "",
                "menuName": "接口管理",
                "menuUrl": "/manageSystem/interfaceManage",
                "childrens": []
              },
              {
                "resourcesId": 67,
                "parentId": 47,
                "icon": "",
                "menuName": "日志管理",
                "menuUrl": "javascript:void(0);",
                "childrens": [
                  {
                    "resourcesId": 68,
                    "parentId": 67,
                    "icon": "",
                    "menuName": "用户操作日志",
                    "menuUrl": "/manageSystem/userOperationLog",
                    "childrens": []
                  },
                  {
                    "resourcesId": 69,
                    "parentId": 67,
                    "icon": "",
                    "menuName": "系统运行日志",
                    "menuUrl": "/manageSystem/systemRunLog",
                    "childrens": []
                  },
                  {
                    "resourcesId": 70,
                    "parentId": 67,
                    "icon": "",
                    "menuName": "日志设置项管理",
                    "menuUrl": "/manageSystem/logSettingManage",
                    "childrens": []
                  }
                ]
              },
              {
                "resourcesId": 71,
                "parentId": 47,
                "icon": "",
                "menuName": "菜单管理",
                "menuUrl": "/manageSystem/menuManage",
                "childrens": []
              }
            ]
          }
        ]
      })
    })
  },
  handleImageAdded(file, Editor, cursorLocation) {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('root', 'editor')
    axios.post('/fileupload/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      let data = response.data
      if (response.status === 200 && data && data.status === 200) {
        Editor.insertEmbed(cursorLocation, 'image', data.data.filepath)
      }
    })
  },
  getToken(params) {
    if (params.username && params.password) {
      let encodeParams = utils.StringUtil.encode(params.username) + '/' + utils.StringUtil.encode(params.password)
      return fetch({
        url: '/home-web/webLogin/' + encodeParams,
        method: 'get'
      }).then(data => {
        if (data.status !== 200) {
          MessageBox.confirm(data.msg, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
          return Promise.reject(new Error(data.msg))
        }
        setTokenParams(encodeParams)
        return Promise.resolve(data)
      })
    }
    return new Promise(function (resolve, reject) {
      reject(new Error('参数有误：' + JSON.stringify(params)))
    })
  },
  getTokenByEncode(params) {
    if (params) {
      return fetch({
        url: '/home-web/webLogin/' + params,
        method: 'get'
      }).then(data => {
        if (data.status !== 200) {
          return Promise.reject(new Error("请重新登陆"))
        }
        return Promise.resolve(data)
      })
    }
    return new Promise(function (resolve, reject) {
      reject(new Error('请重新登陆'))
    })
  },
  getLoginUser(params) {
    return fetch({
      url: '/admin/user/getLoginUser',
      method: 'get'
    })
  }
}
