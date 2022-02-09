<template>
    <div class="row row--middle gap-s">
        <label class="input__label input__label--inline">{{ label }}</label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'InlineInput',
    props: {
        label: {
            type: String,
            default: ''
        }
    }
}
</script>