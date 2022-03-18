<template>
    <div class="modal-view" @click="outsideClick()">
        <div class="modal" @click="preventClosing = true">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CjModal',
    data: function () {
        return {
            preventClosing: false
        }
    },
    methods: {
        outsideClick: function () {
            if (this.preventClosing) {
                this.preventClosing = false
                return
            }
            this.close()
        },
        close: function() {
            this.$emit('close')
        }
    }
}
</script>
