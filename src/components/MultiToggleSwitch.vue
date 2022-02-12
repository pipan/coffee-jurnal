<template>
    <transition-group tag="div" class="row gap-s scroll-x" name="list" @before-leave="onBeforeLeave($event)">
        <button v-for="item of normOptions"
            :key="item.id"
            class="toggle"
            :class="{ 'toggle--active': item.active }"
            type="button"
            @click="select(item.id)">{{ item.name }}</button>
    </transition-group>
</template>

<script>
export default {
    name: 'MultiToggleSwitch',
    props: {
        nullable: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array
        },
        value: [Array]
    },
    computed: {
        normOptions: function () {
            let norm = []
            for (const item of this.options) {
                if (typeof item === 'string') {
                    norm.push({
                        id: item,
                        name: item,
                        active: this.isActive(item)
                    })
                } else {
                    item.active = this.isActive(item.id)
                    norm.push(item)
                }
            }
            return norm
        }
    },
    methods: {
        select: function (id) {
            let newValue = [...this.value]
            const index = newValue.indexOf(id)
            if (index === -1) {
                newValue.push(id)
            } else {
                if (!this.nullable && newValue.length === 1) {
                    return
                }
                newValue.splice(index, 1)
            }
            this.$emit('change', newValue)
        },
        isActive: function (id) {
            return this.value.indexOf(id) > -1
        },
        onBeforeLeave: function (element) {
            element.style.left = element.offsetLeft + "px"
        }
    }
}
</script>