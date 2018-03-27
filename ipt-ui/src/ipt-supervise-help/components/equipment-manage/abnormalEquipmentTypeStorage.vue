<template>
  <ipt-modal>
    <span slot="modalTitle">损坏设备库存</span>
    <template slot="modalBody">
      <div class="table-container">
        <div class="thead-bg"></div>
        <div class="col-xs-12 table-box">
          <table class="table table-condensed">
            <thead>
            <tr>
              <th><span>序号</span></th>
              <th>设备类别</th>
              <th>设备型号</th>
              <th>单位</th>
              <th>库存数量</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody v-for="(option, index) in abnormalEquipmentTypeStorageList">
            <tr>
              <td><span>{{ index + 1 }}</span></td>
              <td>{{ option.equipmentTypeName }}</td>
              <td>{{ option.equipmentModelName }}</td>
              <td>{{ option.equipmentUnit }}</td>
              <td>{{ option.storageNum }}</td>
              <td><a class="look-link" @click="viewBtn(option)" data-toggle="modal"
                     data-target="#abnormalEquipmentModelView"> 详情 </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </ipt-modal>
</template>
<script>
  import {mapActions} from 'vuex'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      abnormalEquipmentTypeStorageList: {}
    },
    methods: {
      viewBtn: function (option) {
        this.findAbnormalEquipmentModelViewDetail({
          equipmentTypeId: option.equipmentTypeId,
          equipmentModelId: option.equipmentModelId
        })
      },
      ...mapActions({
        findAbnormalEquipmentModelViewDetail: 'findAbnormalEquipmentModelViewDetail'
      })
    }
  }
</script>
