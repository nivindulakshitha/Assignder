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
        }
    }
}).mount("#assignderApplication");
