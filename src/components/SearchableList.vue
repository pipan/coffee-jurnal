<template>
    <div class="column column--bottom gap-s flex-grow px-l">
        <div class="column column--devider carousel-list">
            <div class="row row--center py-s" v-if="search">
                <button type="button" class="btn flex-grow row gap-m row--middle row--center" 
                    :class="value == search ? 'btn--primary' : 'btn--secondary'"
                    @click="select(search)">
                    <i class="iconfont iconfont-plus"></i> {{ search }}
                </button>
            </div>
            <div class="row row--center py-s" v-for="item of filteredOptions" :key="item">
                <button type="button" class="btn flex-grow"
                    :class="value == item ? 'btn--primary' : 'btn--secondary'"
                    @click="select(item)">
                    {{ item }}
                </button>
            </div>
        </div>
        <div>
            <input type="text" class="input-simple text-center" placeholder="search  ||  create" :value="search" @input="search = $event.target.value" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchableList',
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data: function () {
        return {
            search: '',
        }
    },
    computed: {
        filteredOptions: function () {
            if (!this.search) {
                return this.options
            }
            return this.options.filter((item) => {
                return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
        }
    }
}
</script>