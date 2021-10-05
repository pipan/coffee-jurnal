<template>
    <div class="toggle row--center">
        <button v-for="item of options"
            :key="item.id"
            class="toggle-btn"
            :class="{ 'toggle-btn--active': item.id === value.id }"
            type="button"
            @click="select(item)">{{ item.name }}</button>
    </div>
</template>

<script>
export default {
    name: 'ToggleSwitch',
    props: {
        options: [Array],
        value: [Object]
    },
    methods: {
        select: function (item) {
            if (item.id === this.value.id) {
                return
            }
            this.$emit('change', item)
        }
    }
}
</script>