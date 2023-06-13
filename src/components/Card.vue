<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CjCard'
}
</script>

<style scoped>
.card {
    box-sizing: border-box;
    width: 100%;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    flex-shrink: 0;
    overflow: hidden;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
}
</style>