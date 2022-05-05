<template>
    <div class="row row--between row--middle gap-s">
        <div class="row gap-s scroll-x">
            <div class="toggle toggle--dual-line" style="width: 128px; box-sizing: border-box;"
                :class="{'toggle--active': checked.indexOf(index) > -1}"
                v-for="(item, index) of bags"
                :key="index"
                @contextmenu.prevent="setChecked(index)"
                @click="select(index)">
                <div class="ellipsis">{{ item.coffeeRoaster }}</div>
                <div class="text-s text-secondary ellipsis">{{ item.coffeeOrigin }}</div>
            </div>
        </div>
        <button type="button" class="btn btn--secondary btn--circle flex-no-shrink" @click="create()" v-if="!hasChecked">
            <i class="iconfont iconfont-plus"></i>
        </button>
        <button type="button" class="btn btn--secondary btn--circle flex-no-shrink" @click="remove()" v-if="hasChecked">
            <i class="iconfont iconfont-bin text-l"></i>
        </button>
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
        }
    },
    data: function () {
        return {
            checked: []
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
            this.checked.push(value)
        },
        select: function (value) {
            if (!this.hasChecked) {
                this.$emit('select', this.bags[value])
                return
            }
            let index = this.checked.indexOf(value)
            if (index > -1) {
                this.checked.splice(index, 1)
            } else {
                this.checked.push(value)
            }
        },
        create: function () {
            this.$emit('create')
        },
        remove: function () {
            this.$emit('remove', this.checked)
            this.checked = []
        },
    }
}
</script>