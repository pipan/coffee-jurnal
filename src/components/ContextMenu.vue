<template>
    <div class="pos-r" @click="preventClosing()">
        <slot name="toggleButton"></slot>
        <div class="context-menu context-menu--right" :class="{'context-menu--opened': visible}">
            <div class="context-menu__header">
                <slot name="toggleButton"></slot>
            </div>
            <slot></slot>
        </div>
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
            visible: false,
            preventClosingValue: false
        }
    },
    created() {
        window.addEventListener("click", this.onWindowClick);
    },
    destroyed() {
        window.removeEventListener("click", this.onWindowClick);
    },
    methods: {
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
        },
        preventClosing:function () {
            this.preventClosingValue = true
        },
        onWindowClick: function () {
            if (this.preventClosingValue) {
                this.preventClosingValue = false
                return
            }
            this.close()
        }
    }
}
</script>