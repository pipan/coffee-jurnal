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
    name: 'ContextMenu',
    props: {
        options: [Array]
    },
    data: function () {
        return {
            visible: false
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
            this.close()
        },
        open: function() {
            this.visible = true
        },
        close: function() {
            this.visible = false
        }
    }
}
</script>