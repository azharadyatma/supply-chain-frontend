<template>
  <div
    class="modal fade"
    :class="{ show: visible, 'd-block': visible }"
    tabindex="-1"
    aria-modal="true"
    role="dialog"
    v-if="visible"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            @click="$emit('close')"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: " ",
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
  background: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}

.modal.d-block {
  display: block;
}

.btn-secondary {
  background-color: #fe6e70;
  border-color: #fe6e70;
  color: white;
}

.btn-secondary:hover {
  background-color: #bb3232;
  border-color: #bb3232;
}
</style>
