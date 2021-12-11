<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>Import cups</h1>
                </header>
                <form class="column flex-grow" @submit.prevent="submit()">
                    <div class="form flex-grow">
                        <input type="file" ref="fileInput" />
                    </div>
                    <div class="pt-m row row--center gap-m">
                        <button type="button" class="btn btn--secondary" @click="back()">CANCEL</button>
                        <button type="submit" class="btn btn--primary">IMPORT</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Import',
    components: {},
    metaInfo: function () {
        return {
            title: "Import Cups | CJ"
        }
    },
    methods: {
        submit: function () {
            const files = this.$refs.fileInput.files
            if (files.length === 0) {
                return
            }

            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const prefix = 'data:application/json;base64,'
                if (!reader.result.startsWith(prefix)) {
                    return
                }
                const base64 = reader.result.substring(prefix.length)
                const dataString = decodeURIComponent(escape(window.atob(base64)));
                const dataJson = JSON.parse(dataString)
                this.$store.dispatch('importCups', dataJson).then(() => {
                    this.$router.replace({ name: 'Home' })
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
