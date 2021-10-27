<template>
    <ContextMenu :options="options" ref="context">
        <template v-slot:toggleButton>
            <slot></slot>
        </template>
        <button class="context-menu__item"
            type="button"
            v-for="item of options"
            :key="item"
            @click="select(item)">{{ item }}</button>
    </ContextMenu>
</template>

<script>
import ContextMenu from './ContextMenu.vue'

export default {
    name: 'ListContextMenu',
    components: { ContextMenu },
    props: {
        options: [Array],
        keepOpen: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
            if (!this.keepOpen) {
                this.close()
            }
        },
        open: function() {
            this.$refs.context.open()
        },
        close: function() {
            this.$refs.context.close()
        },
        toggle: function() {
            this.$refs.context.toggle()
        }
    }
}
</script>