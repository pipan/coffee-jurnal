<template>
    <InlineInput label="Rating">
        <div class="row flex-grow row--center gap-m">
            <RatingButton v-for="rating of ratings"
                :key="rating.value"
                :value="rating.value"
                :active="rating.active"
                @select="change($event)"></RatingButton>
        </div>
    </InlineInput>
</template>

<script>
import RatingButton from './RatingButton.vue'
import InlineInput from './InlineInput.vue'

export default {
    name: 'RatingInput',
    components: { RatingButton, InlineInput },
    props: {
        value: [Number],
        limit: {
            type: Number,
            default: 5
        }
    },
    computed: {
        ratings: function () {
            const result = []
            for (let i = 1; i <= this.limit; i++) {
                result.push({
                    value: i,
                    active: i <= this.value
                })
            }
            return result
        }
    },
    methods: {
        change: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        },
    }
}
</script>