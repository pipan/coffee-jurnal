<template>
    <label class="input" :for="inputId">
        <div class="row row--middle gap-m">
            <div class="flex-grow">
                <div class="input__label">{{ label }}</div>
                <input :id="inputId" type="text" @input="change($event.target.value)" :value="value"  />
            </div>
            <ListContextMenu v-if="options.length > 0"
                :options="options"
                ref="contextMenu"
                @select="change($event)">
                <button type="button"
                    class="input__button"
                    @click="toggleContext()">&Colon;</button>
            </ListContextMenu>
        </div>
    </label>
</template>

<script>
import ListContextMenu from "./ListContextMenu.vue";

export default {
    name: 'InputReference',
    components: { ListContextMenu },
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
        toggleContext: function () {
            this.$refs.contextMenu.toggle()
        }
    }
}
</script>