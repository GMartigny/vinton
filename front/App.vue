<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="10">
                    <v-text-field
                        solo
                        :value="search"
                        placeholder="Search"
                        clearable
                        @keyup="research"
                        @click:clear="research"
                    />
                </v-col>
                <v-col cols="2">
                    <v-switch
                        v-model="showHidden"
                        label="Show hidden"
                        @change="save"
                    />
                </v-col>
            </v-row>
            <v-expansion-panels
                v-if="projectsList"
                multiple
            >
                <v-expand-transition
                    v-for="name in projectsList"
                    :key="name"
                >
                    <Project
                        :name="name"
                        :hidden="hidden[name]"
                        @hide="hide"
                        @removed="removed"
                        v-show="!isHidden(name)"
                    />
                </v-expand-transition>
            </v-expansion-panels>
        </v-container>
    </v-app>
</template>

<script>
    import Project from "./components/Project.vue";

    export default {
        name: "App",

        components: {
            Project,
        },

        data: () => ({
            search: "",
            searchTimeout: null,
            showHidden: false,
            hidden: {},
            projectsList: [],
        }),

        computed: {
            isHidden () {
                const vm = this;
                const search = new RegExp(this.search || ".", "i");
                return name => !search.test(name) || (vm.hidden[name] && !vm.showHidden);
            },
        },

        methods: {
            research ({ target }) {
                if (target.value !== this.search) {
                    if (this.searchTimeout) {
                        clearTimeout(this.searchTimeout);
                    }

                    this.searchTimeout = setTimeout(() => {
                        this.search = target.value;
                        this.save();
                    }, 200);
                }
            },

            hide (name) {
                this.hidden = {
                    ...this.hidden,
                    [name]: !this.hidden[name],
                };

                this.save();
            },

            removed (name) {
                this.projectsList.splice(this.projectsList.indexOf(name), 1);
            },

            save () {
                localStorage.setItem("vinton", JSON.stringify({
                    search: this.search,
                    showHidden: this.showHidden,
                    hidden: this.hidden,
                }));
            }
        },

        async mounted () {
            const local = localStorage.getItem("vinton");
            if (local) {
                const settings = JSON.parse(local);

                this.search = settings.search;
                this.showHidden = settings.showHidden;
                this.hidden = settings.hidden;
            }

            const result = await fetch("/ls?onlyDir");
            this.projectsList = await result.json();
        }
    };
</script>

<style scoped>

</style>
