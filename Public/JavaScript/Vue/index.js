const { createApp } = Vue;

createApp({
    data() {
        return {
            main: {
                configs: {
                    response: 2
                },
                sections: {
                    2: {
                        img: "../Images/person.jpg"
                    }
                }
            }
        };
    },
}).mount("#assignderApplication");
