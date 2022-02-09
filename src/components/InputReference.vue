<template>
    <InlineInput :label="label">
        <div class="pos-r flex-grow row gap-m">
            <input class="input-simple" :class="{'input-simple--active': this.value}" type="text"
                autocomplete="off"
                :value="value"
                :placeholder="placeholder"
                @input="change($event.target.value)"
                @focus="openAutocomplete()"
                @blur="closeAutocomplete()"/>
            <button type="button" class="input__button" v-if="this.value" @click="change('')">&Cross;</button>
            <InputAutocomplete :options="optionsFiltered | orderAlphabetical('asc')" @select="change($event)" :visible="autocompleteVisible"></InputAutocomplete>
        </div>
    </InlineInput>
</template>

<script>
import InputAutocomplete from "./InputAutocomplete.vue";
import InlineInput from "./InlineInput.vue";

export default {
    name: 'InputReference',
    components: { InputAutocomplete, InlineInput },
    props: {
        options: [Array],
        value: {
            type: String,
            default: ''
        },
        inputId: [String],
        label: [String],
        placeholder: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            autocompleteVisible: false
        }
    },
    computed: {
        optionsFiltered: function () {
            if (this.value === '') {
                return this.options
            }
            const result = []
            for (const item of this.options) {
                if (item.toLowerCase().indexOf(this.value.toLowerCase()) > -1) {
                    result.push(item)
                }
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
        openAutocomplete: function () {
            this.autocompleteVisible = true
        },
        closeAutocomplete: function () {
            this.autocompleteVisible = false
        },
        toggleContext: function () {
            this.$refs.contextMenu.toggle()
        }
    }
}
</script>