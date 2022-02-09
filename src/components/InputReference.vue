<template>
    <label class="input" :for="inputId">
        <div class="row row--middle gap-m">
            <div class="flex-grow">
                <div class="input__label">{{ label }}</div>
                <input :id="inputId" type="text"
                    autocomplete="off"
                    :value="value"
                    @input="change($event.target.value)"
                    @focus="openAutocomplete()"
                    @blur="closeAutocomplete()"/>
            </div>
            <button type="button" class="input__button" v-if="this.value" @click="change('')">&Cross;</button>
            <InputAutocomplete :options="optionsFiltered | orderAlphabetical('asc')" @select="change($event)" :visible="autocompleteVisible"></InputAutocomplete>
        </div>
    </label>
</template>

<script>
import InputAutocomplete from "./InputAutocomplete.vue";

export default {
    name: 'InputReference',
    components: { InputAutocomplete },
    props: {
        options: [Array],
        value: {
            type: String,
            default: ''
        },
        inputId: [String],
        label: [String]
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