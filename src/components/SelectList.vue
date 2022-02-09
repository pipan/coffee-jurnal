<template>
    <div class="column gap-s">
        <InlineInput :label="label">
            <div class="column gap-s flex-grow">
                <div class="pos-r row">
                    <input type="text" :placeholder="placeholder" class="input-simple" :value="inputValue" @input="inputValue = $event.target.value" @focus="focusValue = true" @blur="focusValue = false" />
                    <InputAutocomplete :options="optionsFiltered" @select="select($event)" :visible="focusValue"></InputAutocomplete>
                </div>
            </div>
        </InlineInput>
        <MultiToggleSwitch class="row--reverse" :nullable="true"
            :options="value"
            :value="value"
            @change="setValue($event)"></MultiToggleSwitch>
    </div>
</template>

<script>
import InputAutocomplete from './InputAutocomplete.vue'
import InlineInput from './InlineInput.vue'
import MultiToggleSwitch from './MultiToggleSwitch.vue'

export default {
    name: 'SelectList',
    components: { InputAutocomplete, InlineInput, MultiToggleSwitch },
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
        setValue: function (value) {
            return this.$emit('change', value)
        }
    }
}
</script>