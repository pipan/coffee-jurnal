<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>Import Cups</h1>
                </header>
                <form class="column flex-grow" @submit.prevent="submit()">
                    <div class="form flex-grow">
                        <input type="file" ref="fileInput" />
                    </div>
                    <div class="pt-m row row--center gap-m">
                        <button type="button" class="btn btn--secondary" @click="back()">CANCEL</button>
                        <button type="submit" class="btn btn--primary" :disabled="importing">IMPORT</button>
                    </div>
                </form>
            </div>
        </div>
        <CjModal v-if="importing">
            <h2>Importing</h2>
            <div class="pt-l pb-m">
                <div class="progress">
                    <div class="progress__bar" :style="{width: importProgress * 100 + '%' }"></div>
                </div>
            </div>
        </CjModal>
    </div>
</template>

<script>
import CjModal from '../components/Modal.vue'
import { BatchJob } from '../services/BatchJob.js'

export default {
    name: 'ImportView',
    components: { CjModal },
    metaInfo: function () {
        return {
            title: "Import Cups | CJ"
        }
    },
    data: function () {
        return {
            importing: false,
            importProgress: 0
        }
    },
    methods: {
        submit: function () {
            const files = this.$refs.fileInput.files
            if (files.length === 0) {
                return
            }
            if (this.importing) {
                return
            }
            this.importing = true

            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const prefix = 'data:application/json;base64,'
                if (!reader.result.startsWith(prefix)) {
                    this.importing = false
                    return
                }
                
                const base64 = reader.result.substring(prefix.length)
                const dataString = decodeURIComponent(escape(window.atob(base64)));
                const dataJson = JSON.parse(dataString)
                const job = new BatchJob(dataJson, { busyLimit: 100 })
                job.onComplete(() => {
                    this.importing = false
                    this.$router.replace({ name: 'Home' })
                }).forEach((items) => {
                    this.importProgress += items.length / dataJson.length
                    return this.$store.dispatch('importCups', items)
                })
            });
            reader.readAsDataURL(files[0]);
        },
        back: function () {
            if (window.history.length === 0) {
                return this.$router.push({ name: 'Home' })
            }
            this.$router.go(-1)
        }
    }
}
</script>
