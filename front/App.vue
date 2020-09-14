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
                    ></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-checkbox :value="showHidden"></v-checkbox>
                </v-col>
            </v-row>
            <v-expansion-panels
                v-if="projectsList"
                multiple
            >
                <Project
                    v-for="project in projectsList"
                    :key="project.name"
                    :data="project"
                    @hide="hide"
                    @removed="removed"
                    v-if="!project.filtered && !project.hidden"
                ></Project>
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

        methods: {
            research ({ target }) {
                if (this.projectsList && target.value !== this.search) {
                    if (this.searchTimeout) {
                        clearTimeout(this.searchTimeout);
                    }

                    const search = new RegExp(target.value || ".", "i");
                    this.searchTimeout = setTimeout(() => {
                        this.projectsList.forEach(({ name }) => this.settings.hidden[name] = !search.test(name));
                        this.search = target.value;
                    }, 100);
                }
            },

            hide (project) {
                this.hidden[project.name] = project.hidden;

                localStorage.setItem("vinton", JSON.stringify({
                    search: this.search,
                    showHidden: this.showHidden,
                    hidden: this.hidden,
                }));
            },

            removed (project) {
                this.projectsList.splice(this.projectsList.indexOf(project), 1);
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
