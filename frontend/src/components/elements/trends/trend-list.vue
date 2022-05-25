<script>
export default {
    name: "trend-list",
};
</script>

<template>
    <div class="trend-list">
        <slot />
    </div>
</template>

<style lang="scss">
.trend-list {
    margin-bottom: 20px;

    > div {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 2px 0;
    }
}
</style>
