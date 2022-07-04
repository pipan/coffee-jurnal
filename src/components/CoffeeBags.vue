<template>
    <div class="row row--between row--middle gap-s">
        <div class="row gap-s scroll-x scroll-x--transparent">
            <button type="button" class="toggle toggle--dual-line user-select-disable" style="width: 128px;"
                :class="{'toggle--active': checked.indexOf(index) > -1}"
                v-for="(item, index) of bags"
                :key="index"
                @contextmenu.prevent="setChecked(index)"
                @click="select(index)">
                <div class="ellipsis text-m">{{ item.coffeeRoaster }}</div>
                <div class="text-s text-secondary ellipsis">{{ item.coffeeOrigin }}</div>
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CoffeeBags',
    components: { },
    inheritAttrs: false,
    props: {
        bags: {
            type: Array,
            default: () => []
        },
        checked: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        hasChecked: function () {
            return this.checked.length > 0
        }
    },
    methods: {
        setChecked: function (value) {
            const index = this.checked.indexOf(value)
            if (index > -1) {
                return
            }
            let newChecked = [...this.checked]
            newChecked.push(value)
            this.$emit('checkedChange', newChecked)
        },
        select: function (value) {
            if (!this.hasChecked) {
                this.$emit('select', this.bags[value])
                return
            }
            let newChecked = [...this.checked]
            let index = this.checked.indexOf(value)
            if (index > -1) {
                newChecked.splice(index, 1)
            } else {
                newChecked.push(value)
            }
            this.$emit('checkedChange', newChecked)
        }
    }
}
</script>