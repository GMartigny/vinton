<template>
    <v-expansion-panel :readonly="!checks.length">
        <v-expansion-panel-header>
            <div>
                <v-badge
                    inline
                    :value="loadChecks || checks.length"
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
                    {{ name }}
                </v-badge>
            </div>
            <div class="action">
                <v-btn
                    icon
                    @click="remove"
                    :loading="loadRemove"
                    class="float-right"
                    title="Delete project"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                    icon
                    @click="hide"
                    class="float-right"
                >
                    <v-icon v-if="hidden" title="Show project">mdi-eye-off</v-icon>
                    <v-icon v-else title="Hide project">mdi-eye</v-icon>
                </v-btn>
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if="checks">
            <v-list>
                <Check
                    v-for="(check, index) in checks"
                    :key="index"
                    :project-name="name"
                    :data="check"
                    @fixed="fixed(index)"
                />
            </v-list>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import Check from "./Check.vue";

    export default {
        name: "Project",

        props: ["name", "hidden"],

        components: {
            Check,
        },

        data: () => ({
            checks: [],
            loadChecks: true,
            loadRemove: false,
        }),

        methods: {
            hide (event) {
                event.stopPropagation();
                this.$emit("hide", this.name);
            },

            async remove (event) {
                event.stopPropagation();
                if (!this.loadRemove) {
                    this.loadRemove = true;
                    await fetch(`/rm?name=${this.name}`);
                    this.$emit("removed", this.name);
                }
            },

            async fixed (index) {
                this.checks.splice(index, 1, {
                    message: "Fixed",
                    isFixable: false,
                    priority: 0,
                });

                setTimeout(() => {
                    this.checks.splice(index, 1);
                }, 1000);
            }
        },

        async mounted () {
            await new Promise(resolve => setTimeout(() => resolve(), 2000));
            const result = await fetch(`/check?name=${this.name}`);
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
