<template>
    <label class="input" :for="inputId">
        <div class="row row--middle gap-m">
            <div class="flex-grow">
                <div class="input__label">{{ label }}</div>
                <input :id="inputId" type="text" @change="change($event)" />
            </div>
            <div class="pos-r">
                <button type="button" class="input__button" @click="openContext()">&Colon;</button>
                <ContextMenu :options="['One','Two']" ref="contextMenu">
                    <button type="button" class="input__button" @click="closeContext()">&Colon;</button>
                </ContextMenu>
            </div>
        </div>
    </label>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";

export default {
  name: 'InputReference',
  components: { ContextMenu },
  props: {
      options: [Array],
      value: [String],
      inputId: [String],
      label: [String]
  },
  methods: {
      select: function (value) {
          if (value === this.value) {
              return
          }
          this.$emit('change', value)
      },
      change: function (value) {
          if (value === this.value) {
              return
          }
          this.$emit('change', value)
      },
      openContext: function () {
          this.$refs.contextMenu.open()
      },
      closeContext: function () {
          this.$refs.contextMenu.close()
      }
  }
}
</script>