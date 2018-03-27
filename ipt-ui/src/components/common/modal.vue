<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeHandler">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title myModalLabel">
            <slot name="modalTitle"></slot>
          </h4>
        </div>
        <div class="modal-body row form-control-content">
          <div class="modal-left col-xs-12">
            <slot name="modalBody"></slot>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="modalFooter"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
    },
    methods: {
      closeHandler() {
        this.$emit('close')
      }
    }
  }
</script>
<style scoped>
  .modal-header {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    background-color: #2f80ad;
    border-radius: 6px 6px 0 0;
    color: #fff;
  }
  .modal-header button.close {
    margin: 0px 8px;
    opacity: 1;
    text-shadow: none;
    color: #fff;
  }
  .is-danger {
    border-color: #EF5350;
  }
  label.is-danger, .help.is-danger {
    color: #EF5350;
  }
</style>
