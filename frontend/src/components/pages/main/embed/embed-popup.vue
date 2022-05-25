<script>
export default {
    name: "embed-popup",
    components: {},
    props: {},
    data() {
        return {
            width: 500,
            height: 500,
        };
    },
    computed: {
        currentMap() {
            return this.$store.state.maps.current;
        },
        src() {
            return (
                "https://covid19.innouveau.com/#/?map=" + this.currentMap.title
            );
        },
        embedString() {
            return (
                '<iframe src="' +
                this.src +
                '" style="border: 1px solid #888; width:' +
                this.width +
                "px; height:" +
                this.height +
                'px;"></iframe>'
            );
        },
    },
    methods: {
        close() {
            this.$store.commit("ui/updateProperty", {
                key: "embedPopup",
                value: false,
            });
        },
    },
};
</script>

<template>
    <div class="embed-popup">
        <div class="embed__article">
            <p>
                Nam eleifend mi at placerat interdum. Cras lacinia sapien id leo
                finibus, vitae luctus tellus feugiat. Morbi ac quam dictum
                libero varius auctor accumsan consequat sem. Cras dictum
                vestibulum sodales. Sed vehicula ex ut ex lobortis luctus.
            </p>
            <div class="embed__size">
                <iframe
                    style="border: 1px solid #888"
                    :style="{
                        width: width + 'px',
                        height: height + 'px',
                    }"
                    :src="src"
                ></iframe>
            </div>
            <p>
                Aenean volutpat erat at justo sodales accumsan. Etiam ultricies
                metus vel maximus molestie. Fusce tortor quam, tempus aliquet
                urna et, luctus tempus odio. Aliquam erat volutpat. Vestibulum
                feugiat lacinia laoreet. Etiam bibendum urna nec sodales
                accumsan. Suspendisse id lacus ac odio consequat egestas.
                Vestibulum hendrerit vitae libero congue imperdiet. Pellentesque
                porttitor sed massa congue auctor. Quisque mattis nisl quis
                semper sagittis. In dui dui, euismod ac feugiat ac, imperdiet
                vel metus.
            </p>
        </div>

        <div class="embed__tools">
            <div class="embed__tools-section">
                <div class="embed__tools-row">
                    <input type="number" v-model="width" /> Breedte
                </div>
                <div class="embed__tools-row">
                    <input type="number" v-model="height" /> Hoogte
                </div>
            </div>
            <p>Kopieer deze html om de kaart te gebruiken bij een artikel.</p>
            <textarea v-model="embedString" />
        </div>

        <div @click="close()" class="close-button"></div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

.embed-popup {
    position: fixed;
    left: 20px;
    top: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    background: #ddd;
    z-index: 10;
    font-size: 16px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
    padding: 20px;
    display: flex;

    .embed__tools {
        width: calc(100% - 640px);

        .embed__tools-section {
            margin-bottom: 10px;

            .embed__tools-row {
                margin-bottom: 4px;

                input {
                    width: 60px;
                }
            }
        }

        input,
        textarea {
            background: #fff;
            width: 100%;
            max-width: 400px;
            padding: 8px;
            border: 0;
            outline: 0;
        }

        textarea {
            height: 100px;
        }
    }

    .embed__article {
        width: 600px;
        max-width: 100%;
        background: #fff;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
        padding: 20px;
        height: 100%;
        font-size: 12px;
        overflow: auto;
        margin-right: 40px;

        p {
            width: 400px;
            max-width: 100%;
        }

        .embed__size {
            margin: 30px 0;

            iframe {
            }
        }
    }

    @include mobile() {
        display: block;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;

        .embed__article {
            display: none;
        }

        .embed__tools {
            width: 100%;
        }
    }
}
</style>
