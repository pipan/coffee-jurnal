<template>
    <div>
        <div class="actions">
            <slot name="actions"></slot>
        </div>
        <div class="body" v-gesture-swipe-horizontal
            :style="customStyle"
            @gestureSwipeHorizontal="onGesture($event)"
            @gestureSwipeHorizontalEnd="onGestureEnd()">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SwipeActions',
    data: function () {
        return {
            translateX: 0
        }
    },
    computed: {
        customStyle: function () {
            return {
                'transform': `translateX(${this.translateX}px)`
            }
        }
    },
    methods: {
        onGesture: function (event) {
            if (Math.abs(event.detail.deltaX) <= Math.abs(event.detail.deltaY)) {
                return
            }
            this.translateX = Math.min(0, Math.max(-60, this.translateX + event.detail.deltaX / 2))
        },
        onGestureEnd: function () {
            this.translateX = this.translateX <= -30 ? -60 : 0
        },
    }
}
</script>

<style scoped>
.body {
    height: 100%;
}


.body.gesture--active {
    transition-duration: 0ms;
}

.actions {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: row-reverse;
}
</style>