<template>
    <v-list-item>
        <v-list-item-icon>
            <v-icon :class="css">
                {{ icon }}
            </v-icon>
        </v-list-item-icon>
        <v-list-item-title :class="css">
            {{ data.message }}
        </v-list-item-title>
        <v-spacer/>
        <v-btn
            v-if="data.isFixable"
            :color="color"
            @click="fix"
            :loading="isLoading"
        >
            <v-icon
                left
                small
            >
                mdi-wrench
            </v-icon>
            Fix
        </v-btn>
    </v-list-item>
</template>

<script>
    export default {
        name: "Check",

        props: ["projectName", "data"],

        data: () => ({
            isLoading: false,
        }),

        computed: {
            css () {
                return {
                    [`${this.color}--text`]: true,
                };
            },

            color () {
                return ["success", "error", "warning", "primary"][this.data.priority];
            },

            icon () {
                return ["mdi-thumb-up", "mdi-alarm-light", "mdi-alert", "mdi-information"][this.data.priority];
            },
        },

        methods: {
            async fix () {
                this.isLoading = true;
                await fetch(`/fix?name=${this.projectName}&plugin=${this.data.name}&message=${this.data.message}`);
                this.$emit("fixed");
                this.isLoading = false;
            },
        },
    };
</script>

<style scoped>

</style>
