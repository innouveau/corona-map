<script>
    import Source from "@/classes/Source";
    import sourceTools from "@/tools/source";

    export default {
        name: 'source-loader',
        components: {},
        props: {
            value: {
                type: String,
                required: true
            },
            hasValue: {
                type: Boolean,
                required: true
            },
            source: {
                type: Source,
                required: true
            }
        },
        data(){
            return {
                loading: false
            }
        },
        computed: {},
        methods: {
            loadSource() {
                this.loading = true;
                sourceTools.load(this.source).then(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>


<template>
    <div class="source_loader">
        <span
            v-if="hasValue"
            class="source_loader__value">
            {{value}}
        </span>
        <span
            v-else
            class="source_loader_button">
            <button
                v-if="!loading"
                @click="loadSource">
                Load data
            </button>
            <span class="loading" v-else>
                Loading...
            </span>
        </span>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .source_loader {
        height: 22px;

        button {
            white-space: nowrap;
        }

        .loading {
            font-family: $sans-serif;
            font-size: 13px;
            font-weight: 400;
        }
    }
</style>