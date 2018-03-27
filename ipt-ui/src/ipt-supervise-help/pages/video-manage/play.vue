<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">视频播放</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <div class="video-box">
        <p class="video-name">{{ videoData.name }}</p>
        <video id="myVideo" width="100%" controls>
          <source :src="videoData.src" :type="videoData.type">
          您的浏览器不支持此内容。请升级您的浏览器
        </video>
      </div>
    </template>
  </ipt-modal>
</template>
<script>
  /** 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      videoData: {}
    }
  }
</script>
