/**
 * @描述: 大数据审核监测 --> 节点数据监测 --> 屠宰场
 * @作者: Guo Ze Qiang
 * @日期: 2017/11/23
 * @时间: 13:12
 */
export default {
  getAbattoirInfoTableData (params, cb) { //屠宰场基本信息
    return new Promise(function (resolve) {
      resolve({
        'totalRecords': 60,
        'currentPage': 1,
        'totalPages': 12,
        'status': 200,
        'msg': '获取列表成功',
        'data': [
          {
            'enterpriseId': 1,
            'enterpriseNo': 'A10010',
            'enterpriseName': '宁夏润百禾现代农业科技有限公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '孙晓燕',
            'businessAddress': '宁夏莱城区口镇太平村',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 2,
            'enterpriseNo': 'A10011',
            'enterpriseName': '宁夏仙农业园蔬牧业有限责任公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '潘林香',
            'businessAddress': '宁夏凤城西大街1号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 3,
            'enterpriseNo': 'A10012',
            'enterpriseName': '家家悦超市',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '董立新',
            'businessAddress': '宁夏莱城区文化南路8号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 4,
            'enterpriseNo': 'A10013',
            'enterpriseName': '银座超市',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '杨经理',
            'businessAddress': '雪野旅游区航空路8号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 5,
            'enterpriseNo': 'A10014',
            'enterpriseName': '顺成超市',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '房经理',
            'businessAddress': '宁夏钢铁集团金鼎实业有限公司',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 6,
            'enterpriseNo': 'A10015',
            'enterpriseName': '营昊超市',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '陈经理',
            'businessAddress': '莱城区杨庄镇万兴路1号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 7,
            'enterpriseNo': 'A10016',
            'enterpriseName': '金鼎配送中心',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '田群',
            'businessAddress': '宁夏凤城西大街1号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 9,
            'enterpriseNo': 'A10017',
            'enterpriseName': '宁夏大千农牧有限公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '高锡坤',
            'businessAddress': '宁夏莱城区文化南路8号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 10,
            'enterpriseNo': 'A10018',
            'enterpriseName': '宁夏五福茶叶有限公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '刘老板',
            'businessAddress': '雪野旅游区航空路8号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 11,
            'enterpriseNo': 'A10019',
            'enterpriseName': '宁夏万兴食品有限公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '李经理',
            'businessAddress': '宁夏莱城区文化南路47号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 12,
            'enterpriseNo': 'A10021',
            'enterpriseName': '宁夏玉林农产品发展有限公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '王学长',
            'businessAddress': '宁夏莱城区汶阳东大街45号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 13,
            'enterpriseNo': 'A10022',
            'enterpriseName': '宁夏泰顺斋食品有限公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '蒋风铃',
            'businessAddress': '宁夏莱城区牛泉镇庞家庄村河东218号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 14,
            'enterpriseNo': 'A10023',
            'enterpriseName': '宁夏朗野蜂业有限公司',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '韩老板',
            'businessAddress': '莱城区杨庄镇万兴路1号',
            'phone': '12345678998',
            'fax': '010-963258'
          },
          {
            'enterpriseId': 15,
            'enterpriseNo': 'A10024',
            'enterpriseName': '家乐福连锁超市',
            'certificateNumber': 'S1001B123456789',
            'regionName': '宁夏',
            'recordDate': '2017-12-7',
            'legalPerson': '王欢',
            'businessAddress': '莱城区杨庄镇万兴路1号',
            'phone': '12345678998',
            'fax': '010-963258'
          }
        ]
      })
    })
  },
  getAbattoirEnterOperatorInfoTableData (params, cb) { //屠宰场进场经营者（货主、买主）基本信息
    return new Promise(function (resolve) {
      resolve({})
    })
  },
  getAbattoirLivePigEnterInfoTableData (params, cb) { //屠宰场生猪进场信息
    return new Promise(function (resolve) {
      resolve({})
    })
  },
  getAbattoirButcherQuarantineInfoTableData (params, cb) { //屠宰场屠宰检疫检验信息
    return new Promise(function (resolve) {
      resolve({
        'totalRecords': 60,
        'currentPage': 1,
        'totalPages': 12,
        'status': 200,
        'msg': '获取列表成功',
        'data': [
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          },
          {
            'slaughterFacCode': '屠宰场编码',
            'slaughterFacName': '屠宰场名称',
            'sellerCode': '货主编码',
            'sellerName': '货主名称',
            'originQuarantineCode': '生猪产地检疫证号',
            'inNum': '头数',
            'samplingNum': '采样头数',
            'sampleCode': '采样样品编号',
            'inspector': '检验员',
            'quarantineDate': '检疫日期',
            'positiveNum': '阳性头数',
            'animalProductQuarantineCode': '动物产品检疫合格证号',
            'meatProductQuarantineCode': '肉品品质检验证号'
          }
        ]
      })
    })
  },
  getAbattoirMeatTradingInfoTableData (params, cb) { //屠宰场肉品交易信息
    return new Promise(function (resolve) {
      resolve({})
    })
  }
}
