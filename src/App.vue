<template>
    <transition :name="transitionName">
        <router-view />
    </transition>
</template>

<script>
export default {
    name: 'App',
    data: function () {
        return {
            transitionName: 'animation--slide-in'
        }
    },
    watch: {
        '$route' (to, from) {
            if (from.meta.transitionDepth < to.meta.transitionDepth) {
                this.transitionName = 'animation--slide-in'
                return
            }
            if (from.meta.transitionDepth > to.meta.transitionDepth) {
                this.transitionName = 'animation--slide-out'
                return
            }
            this.transitionName = ''
        }
    }
}
</script>

<style>
@import "./assets/styles/layout.css";
@import "./assets/styles/form.css";
@import "./assets/styles/button.css";
@import "./assets/styles/text.css";
@import "./assets/styles/tag.css";
@import "./assets/styles/modal.css";

@import "./assets/styles/jurnal.css";
@import "./assets/styles/bar.css";
@import "./assets/styles/context.css";
@import "./assets/styles/stats.css";

@import "./assets/styles/animation.css";
@import "./assets/styles/app.css";
</style>
