<template>
    <label class="input">
        <div class="row row--middle gap-m">
            <div class="flex-grow column">
                <div class="input__label">{{ label }}</div>
                <div class="flex-grow pt-s">
                    <span v-if="stringValue">{{ stringValue }}</span>
                    <span v-if="!stringValue">&nbsp;</span> 
                </div>
            </div>
            <div class="pos-r" v-if="options.length > 0">
                <button type="button"
                    class="input__button"
                    @click.stop
                    @click="toggleContext()">&Colon;</button>
                <ContextMenu :options="options" ref="contextMenu" @select="select($event)" :keepOpen="true">
                    <template v-slot:toggleButton>
                        <button type="button"
                            class="input__button"
                            @click.stop
                            @click="toggleContext()">&Colon;</button>
                    </template>
                    <div>
                        <button type="button" class="context-menu__item row gap-m"
                            v-for="option of contextOptions"
                            :key="option.name"
                            @click="select(option.name)">
                            <div class="selector-mark" :class="{ 'selector-mark--active': option.active }"></div>
                            <div>{{ option.name }}</div>
                        </button>
                    </div>
                </ContextMenu>
            </div>
        </div>
    </label>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";

export default {
    name: 'SelectList',
    components: { ContextMenu },
    props: {
        options: [Array],
        value: [Array],
        label: [String]
    },
    computed: {
        stringValue: function () {
            if (this.value.length === 0) {
                return ''
            }
            return this.value.join(', ')
        },
        contextOptions: function () {
            const result = []
            for (const option of this.options) {
                result.push({
                    name: option,
                    active: this.value.indexOf(option) > -1
                })
            }
            return result
        }
    },
    methods: {
        select: function (option) {
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