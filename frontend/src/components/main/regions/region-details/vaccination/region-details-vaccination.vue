<script>
    import RegionDetailsVaccinationAgeGroup from "./region-details-vaccination-age-group";
    import _Region from "@/classes/region/_Region";

    export default {
        name: 'region-details-vaccination',
        components: {RegionDetailsVaccinationAgeGroup},
        props: {
            region: {
                type: _Region,
                required: true
            },
            reference: {
                type: _Region | null,
                required: true
            }
        },
        // computed: {
        //     ageGroup() {
        //         return this.vaccination.find(a => a.ageGroup === '12+');
        //     }
        // },
        methods: {
            getReference(ageGroup) {
                if (this.reference) {
                    return this.reference.vaccination.find(a => a.ageGroup === ageGroup.ageGroup);
                } else {
                    return null;
                }
            }
        }
    }
</script>


<template>
    <div class="region-details-vaccination">
        <region-details-vaccination-age-group
            v-for="ageGroup of region.vaccination"
            :age-group="ageGroup"
            :reference="getReference(ageGroup)"/>
        <div class="region-details-vaccination__legend">
            <div class="region-details-vaccination__legend-set">
                <div class="region-details-vaccination__legend-color" style="background:#2d70e3"></div>
                <div class="region-details-vaccination__legend-label">Volledig gevaccineerd</div>
            </div>
            <div class="region-details-vaccination__legend-set">
                <div class="region-details-vaccination__legend-color" style="background:#aaa"></div>
                <div class="region-details-vaccination__legend-label">Gedeeltelijk gevaccineerd</div>
            </div>
            <div class="region-details-vaccination__legend-set">
                <div class="region-details-vaccination__legend-line"></div>
                <div class="region-details-vaccination__legend-label">Gem. volledig in Veiligheidsregio</div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details-vaccination {

        &__legend {
            padding-top: 8px;
            display: flex;
            font-size: 8px;
            line-height: 1;
        }

        &__legend-set {
            margin-right: 8px;
            display: flex;
            align-items: center;
        }

        &__legend-color {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 2px;
        }

        &__legend-line {
            width: 0;
            height: 0;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-top: 4px solid #000;
            margin-right: 2px;
        }
    }
</style>