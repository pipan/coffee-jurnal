<template>
    <div class="column gap-s">
        <div class="row row--middle gap-s">
            <div class="input__label input__label--inline">{{ label }}</div>
            <div class="column gap-s flex-grow">
                <div class="pos-r row">
                    <input type="text" :placeholder="placeholder" class="input-simple" :value="inputValue" @input="inputValue = $event.target.value" @focus="focusValue = true" @blur="focusValue = false" />
                    <InputAutocomplete :options="optionsFiltered" @select="select($event)" :visible="focusValue"></InputAutocomplete>
                </div>
                
            </div>
        </div>
        <div class="row row--reverse gap-s flex-grow scroll-x">
            <button type="button" class="tag tag--active"
                v-for="(option, index) of value"
                :key="index"
                @click="toggle(option)">{{ option }}</button>
        </div>
    </div>
</template>

<script>
import InputAutocomplete from './InputAutocomplete.vue'

export default {
    name: 'SelectList',
    components: { InputAutocomplete },
    props: {
        options: [Array],
        value: {
            type:Array,
            default: () => []
        },
        label: [String],
        placeholder: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            inputValue: '',
            focusValue: false
        }
    },
    computed: {
        availableOptions: function () {
            let result = []
            for (const option of this.options) {
                if (this.value.indexOf(option) > -1) {
                    continue
                }
                result.push(option)
            }
            return result
        },
        optionsFiltered: function () {
            if (this.inputValue === '') {
                return this.availableOptions
            }
            const result = []
            for (const item of this.availableOptions) {
                if (item.toLowerCase().indexOf(this.inputValue.toLowerCase()) > -1) {
                    result.push(item)
                }
            }
            return result
        }
    },
    methods: {
        select: function (option) {
            this.inputValue = ''
            this.toggle(option)
        },
        deselect: function (option) {
            this.toggle(option)
        },
        toggle: function (option) {
            const index = this.value.indexOf(option)
            const newValue = [...this.value]
            if (index > -1) {
                newValue.splice(index, 1)
            } else {
                newValue.push(option)
            }
            return this.$emit('change', newValue)
        },
        toggleContext: function () {
            this.$refs.contextMenu.toggle()
        }
    }
}
</script>