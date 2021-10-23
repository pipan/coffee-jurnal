<template>
    <div class="context-menu context-menu--right" :class="{'context-menu--opened': visible}">
        <div class="context-menu__header">
            <slot></slot>
        </div>
        <button class="context-menu__item"
            type="button"
            v-for="item of options"
            :key="item"
            @click="select(item)">{{ item }}</button>
    </div>
</template>

<script>
export default {
    name: 'ListContextMenu',
    props: {
        options: [Array],
        keepOpen: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            visible: false
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
            if (!this.keepOpen) {
                this.close()
            }
        },
        setVisibility: function(value) {
            this.visible = value
        },
        open: function() {
            this.setVisibility(true)
        },
        close: function() {
            this.setVisibility(false)
        },
        toggle: function() {
            this.setVisibility(!this.visible)
        }
    }
}
</script>