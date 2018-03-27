<template>
  <ipt-modal>
    <span slot="modalTitle">监控设备详情</span>
    <template slot="modalBody">
      <div class="shadow-boxs row devices" style="margin: 10px;">
        <div v-for="option in enterpriseEquipmentList" class="col-lg-4 pull-left"
             style="text-align:center; padding:10px;">
          <img :src="img.equipmentPicture" alt="设备">
          <p>设备类别：{{ option.equipmentTypeName }}</p>
          <p>设备型号：{{ option.equipmentModelName }}</p>
          <p>设备编号：{{ option.equipmentCode }}</p>
          状态：{{ option.equipmentMonitorName }}
          <img v-if="option.monitorStatus == NORMAL.value" :src="img.equipmentUsePicture" alt="正常">
          <img v-else-if="option.monitorStatus == STOP_USE.value" :src="img.equipmentStopPicture" alt="停用">
          <!--<img v-else-if="option.monitorStatus == REPAIRING.value" :src="img.equipmentRepairPicture" alt="维修">-->
        </div>
      </div>
    </template>
  </ipt-modal>
</template>
<script>
  import IptModal from "@/components/common/modal"
  import equipmentUsePicture from '@/assets/img/use.png'
  import equipmentStopPicture from '@/assets/img/prohibit.png'
//  import equipmentRepairPicture from '@/assets/img/repair.png'
  import equipmentPicture from '@/assets/img/equipment.png'
  import Api from '@/ipt-supervise-help/api'

  export default {
    components: {
      IptModal
    },
    props: {
      enterpriseEquipmentList: {
        type: Array
      }
    },
    data: function () {
      return {
        img: {
          equipmentPicture,
          equipmentUsePicture,
          equipmentStopPicture
//          equipmentRepairPicture
        },
        NORMAL: {},
        STOP_USE: {}
//        REPAIRING: {}
      }
    },
    created: function () {
      this.init()
    },
    methods: {
      init: function () {
        let _this = this
        Api.EquipmentMonitor.getMonitorStatusEnum().then((data) => {
          _this.NORMAL = data.data.NORMAL
          _this.STOP_USE = data.data.STOP_USE
//          _this.REPAIRING = data.data.REPAIRING
        })
      }
    }
  }
</script>
