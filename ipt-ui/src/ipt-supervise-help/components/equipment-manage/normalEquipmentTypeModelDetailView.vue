<template>
  <ipt-modal>
    <span slot="modalTitle">完好设备库存详情</span>
    <template slot="modalBody">
      <div class="table-container">
        <div class="thead-bg"></div>
        <div class="col-xs-12 table-box">
          <table class="table table-condensed">
            <thead><tr><th><span>序号</span></th><th>重要产品类别</th><th>设备类别</th><th>设备型号</th><th>设备编号</th></tr></thead>
            <tbody>
            <tr v-for="(option, index) in normalEquipmentModelViewDetail">
              <td><span>{{ index + 1 }}</span></td>
              <td>{{ option.cateName }}</td>
              <td>{{ option.equipmentTypeName }}</td>
              <td>{{ option.equipmentModelName }}</td>
              <td>{{ option.equipmentCode }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </ipt-modal>
</template>
<script>
  import {mapGetters} from 'vuex'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    watch: {
      normalEquipmentModelViewDetail: {
        handler: function (newValue, oldValue) {
        },
        deep: true
      }
    },
    computed: mapGetters({
      normalEquipmentModelViewDetail: 'normalEquipmentModelViewDetail'
    })
  }
</script>
