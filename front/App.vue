<template>
    <v-app>
        <v-container>
            <v-text-field
                solo
                placeholder="Search"
                clearable
                @keyup="search"
                @click:clear="search"
            ></v-text-field>
            <v-expansion-panels
                v-if="projectsList"
                multiple
            >
                <Project
                    v-for="project in projectsList"
                    :key="project.name"
                    :data="project"
                    @removed="removed"
                    v-if="!project.hidden"
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
            projectsList: [],
        }),

        methods: {
            search ({ target }) {
                if (this.projectsList && target.value !== this.seachedValue) {
                    if (this.seachTimeout) {
                        clearTimeout(this.seachTimeout);
                    }

                    const search = new RegExp(target.value || ".", "i");
                    this.seachTimeout = setTimeout(() => {
                        this.projectsList = this.projectsList.map(({ name }) => ({
                            name,
                            hidden: !search.test(name),
                        }));
                        this.seachedValue = target.value;
                    }, 100);
                }
            },

            removed (name) {
                this.projectsList.splice(this.projectsList.indexOf(name), 1);
            }
        },

        async mounted () {
            const result = await fetch("/ls?onlyDir");
            this.projectsList = await result.json();
        }
    };
</script>

<style scoped>

</style>
