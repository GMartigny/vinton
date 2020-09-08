<template>
    <v-list-item>
        <v-list-item-icon>
            <v-icon :class="{ [`${color}--text`]: true }">
                {{ icon }}
            </v-icon>
        </v-list-item-icon>
        <v-list-item-title :class="{ [`${color}--text`]: true }">
            {{ data.message }}
        </v-list-item-title>
        <v-spacer></v-spacer>
        <v-btn
            v-if="data.fixable"
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
            color () {
                return ["success", "error", "warning", "primary"][this.data.priority];
            },

            icon () {
                return ["mdi-thumb-up", "mdi-alarm-light", "mdi-alert", "mdi-information", ][this.data.priority];
            },
        },

        methods: {
            async fix () {
                this.isLoading = true;
                await fetch(`/fix?name=${this.projectName}&check=${this.data.name}`);
                this.data = {
                    ...this.data,
                    message: "Fixed",
                    fixable: false,
                    priority: 0,
                };
                this.isLoading = false;
            }
        },
    };
</script>

<style scoped>

</style>
