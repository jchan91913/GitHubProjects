// Not the best place to store but it will do for now
const secret = {
    API_TOKEN: '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'
};

const app = new Vue({
    el: '#app',
    data: {
        searchTerm: '',
        /*
            ex.
            message: {
                type: '', // success, error, red, blue, etc.
                header: '',
                detail: ''
            }
        */
        message: null
    },
    methods: {
        search: function () {
            if (this.searchTerm.trim() !== '') {
                this.$refs.repoListRef.findReposByUser(this.searchTerm);
            } else {
                this.updateMessage({
                    type: 'error',
                    header: 'User or organization is required.',
                    detail: 'Please enter a value.'
                });
            }
        },
        
        updateMessage: function (messageObj) {
            this.message = messageObj;
        },

        clearMessage: function () {
            this.message = null;
        }
    }
});
