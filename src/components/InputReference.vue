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
            <InputAutocomplete :options="options" @select="change($event)" ref="autocomplete"></InputAutocomplete>
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
        value: [String],
        inputId: [String],
        label: [String]
    },
    methods: {
        change: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        },
        openAutocomplete: function () {
            this.$refs.autocomplete.open()
        },
        closeAutocomplete: function () {
            this.$refs.autocomplete.close()
        },
        toggleContext: function () {
            this.$refs.contextMenu.toggle()
        }
    }
}
</script>