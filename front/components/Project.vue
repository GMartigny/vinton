<template>
    <v-expansion-panel :readonly="!(checks && checks.length)">
        <v-expansion-panel-header>
            <div>
                <v-badge
                    inline
                    :value="checks && checks.length"
                >
                    <template v-slot:badge>
                        <v-progress-circular
                            indeterminate
                            size="10"
                            width="2"
                            v-if="loadChecks"
                        ></v-progress-circular>
                        <div v-else>
                            {{ checks.length }}
                        </div>
                    </template>
                    {{ data.name }}
                </v-badge>
            </div>
            <div class="action">
                <v-btn
                    icon
                    @click="remove"
                    :loading="loadRemove"
                    class="float-right"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content
            v-if="checks"
        >
            <v-list>
                <Check
                    v-for="(check, index) in checks"
                    :key="index"
                    :project-name="data.name"
                    :data="check"
                ></Check>
            </v-list>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import Check from "./Check.vue";

    export default {
        name: "Project",

        props: ["data"],

        components: {
            Check,
        },

        data: () => ({
            checks: null,
            loadChecks: true,
            loadRemove: false,
        }),

        methods: {
            async remove () {
                if (!this.loadRemove) {
                    this.loadRemove = true;
                    await fetch(`/rm?name=${this.data.name}`);
                    this.$emit("removed", this.data);
                }
            }
        },

        async mounted () {
            const result = await fetch(`/check?name=${this.data.name}`);
            this.checks = await result.json();
            this.loadChecks = false;
        },
    };
</script>

<style scoped>
    .action {
        padding-right: 2em;
    }
</style>
