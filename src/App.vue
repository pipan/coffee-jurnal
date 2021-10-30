<template>
    <div>
        <transition :name="transitionName">
            <router-view />
        </transition>
        <transition name="animation--fade">
            <Modal v-if="isUpdating">
                <h2>Updating application</h2>
                <div class="pt-l pb-m">
                    <div class="progress progress--infinite"></div>
                </div>
            </Modal>
        </transition>
    </div>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
    name: 'App',
    components: { Modal },
    data: function () {
        return {
            transitionName: 'animation--slide-in',
            refreshing: false
        }
    },
    created: function () {
        document.addEventListener('swUpdateFound', () => {
            this.$store.dispatch('updateStart')
        }, { once: true })
        document.addEventListener('swUpdated', (event) => {
            const registration = event.detail
            if (!registration.waiting) {
                return
            }
            registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }, { once: true })
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (this.refreshing) {
                return
            }
            this.refreshing = true
            window.location.reload()
        })
    },
    computed: {
        isUpdating: function () {
            return this.$store.state.app.updating
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
@import "./assets/styles/progress.css";

@import "./assets/styles/jurnal.css";
@import "./assets/styles/bar.css";
@import "./assets/styles/context.css";
@import "./assets/styles/stats.css";

@import "./assets/styles/animation.css";
@import "./assets/styles/app.css";
</style>
