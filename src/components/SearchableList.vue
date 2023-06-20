<template>
    <div class="column column--bottom gap-s flex-grow px-l">
        <div class="column column--devider carousel-list">
            <div class="row row--center py-s" v-for="item of filteredOptions" :key="item">
                <button type="button" class="btn flex-grow"
                    :class="value == item ? 'btn--primary' : 'btn--secondary'"
                    @click="select(item)">
                    {{ item }}
                </button>
            </div>
        </div>
        <div class="pos-r">
            <input type="text" class="input-simple text-center" placeholder="search  ||  create" :value="searchValue" @input="search($event.target.value)" />
            <button type="button" class="btn btn--circle create-button" v-if="canCreate"
                :class="value == searchValue ? 'btn--primary' : 'btn--secondary'"
                @click="select(searchValue)">
                <i class="iconfont iconfont-plus"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchableList',
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        searchValue: {
            type: String,
            default: ''
        }
    },
    computed: {
        filteredOptions: function () {
            if (!this.searchValue) {
                return this.options
            }
            return this.options.filter((item) => {
                return item.toLowerCase().startsWith(this.searchValue.toLowerCase())
            })
        },
        canCreate: function () {
            if (!this.searchValue) {
                return false
            }
            for (let item of this.filteredOptions) {
                if (item.toLowerCase() === this.searchValue.toLowerCase()) {
                    return false
                }
            }
            return true
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
        },
        search: function (value) {
            if (value === this.searchValue) {
                return
            }
            this.$emit('changeSearch', value)
        }
    }
}
</script>

<style scoped>
.create-button {
    position: absolute;
    right: var(--unit-s);
    top: 0;
}
</style>