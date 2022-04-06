<template>
    <div class="column flex-grow">
        <router-view v-slot="{ Component }">
            <transition :name="transitionName">
                <KeepAlive :include="['NavigationLayout']">
                    <component :is="Component"></component>
                </KeepAlive>
            </transition>
        </router-view>
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
            swRegistration: null,
            transitionName: 'animation--slide-in',
            refreshing: false
        }
    },
    created: function () {
        this.startUpdatePoll()
        document.addEventListener('swRegistration', (event) => {
            this.swRegistration = event.detail
        })
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
        if (navigator.serviceWorker) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (this.refreshing) {
                    return
                }
                this.refreshing = true
                window.location.reload()
            })
        }
    },
    computed: {
        isUpdating: function () {
            return this.$store.state.app.updating
        }
    },
    methods: {
        startUpdatePoll: function () {
            setInterval(() => {
                this.checkForUpdate()
            }, 5 * 60 * 1000)
        },
        checkForUpdate: function () {
            if (!this.swRegistration) {
                return
            }
            this.swRegistration.update();
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
@import "./assets/styles/toggle.css";
@import "./assets/styles/button.css";
@import "./assets/styles/text.css";
@import "./assets/styles/modal.css";
@import "./assets/styles/progress.css";
@import "./assets/styles/icon.css";

@import "./assets/styles/jurnal.css";
@import "./assets/styles/bar.css";
@import "./assets/styles/context.css";
@import "./assets/styles/stats.css";

@import "./assets/styles/animation.css";
@import "./assets/styles/iconfont.css";
@import "./assets/styles/app.css";
</style>
