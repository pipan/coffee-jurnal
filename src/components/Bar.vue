<template>
    <div class="bar bar--y" :class="classes"></div>
</template>

<script>
export default {
    name: 'Bar',
    components: {},
    props: {
        intensity: [Number],
        quality: [Number]
    },
    computed: {
        classes: function() {
            const intensityInteger = this.intensity * 4 + 1
            const qualityInteger = this.quality * 4 + 1
            return ['bar--intensity-' + intensityInteger, 'bar--quality-' + qualityInteger]
            
        },
    },
}
</script>