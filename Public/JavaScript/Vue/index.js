const { createApp } = Vue;

createApp({
    data() {
        return {
            
        };
    },

    methods: {
        handlePageOpening(event, sectionId) {
            sectionOpener(event, sectionId); // Ref: Assignder/index
        },

        handleAppThemeChange() {
            switchAppTheme(); // Ref: Assignder/index
        },

        handleToggleButtons(event) {
            toggleButtonsHandler(event); // Ref: Assignder/index
        },

        handleNewAssignmentCreate() {
            createNewAssignment();
        }
    }
}).mount("#assignderApplication");
