<script>
import View from "@/classes/View";

export default {
    name: "region-container",
    props: {
        view: {
            type: View,
            required: true,
        },
    },
    methods: {
        close() {
            this.view.currentRegion = null;
        },
    },
};
</script>

<template>
    <transition name="fade">
        <div v-if="view.currentRegion" class="region-container">
            <slot />
            <div @click="close" class="close-button" />
        </div>
    </transition>
</template>

<style lang="scss">
.region-container {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    padding: 60px 20px 20px;
    overflow: auto;
    width: 200px;
    z-index: 10;
    box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);
    opacity: 1;

    .region-head {
        height: auto;
    }

    .region-details {
        &__row {
            display: block;

            > div {
                width: 100% !important;
                justify-content: flex-start !important;
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: right 0.3s ease-out;
}
.fade-enter,
.fade-leave-to {
    right: -200px;
}
</style>
