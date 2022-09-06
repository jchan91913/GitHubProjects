Vue.component('commit-list', {
    data: function () {
        return {
            loading: false,
            list: [],
            /*
            ex.
            message: {
                type: '', // success, error, red, blue, etc.
                header: '',
                detail: ''
            }
            */
            message: null
        }
    },
    methods: {
        // Resets our UI (clear message, reset list, etc.)
        reset: function () {
            this.message = null;
            this.list = [];
        },

        findCommitsByUserAndRepo: function (user, repo) {
            // Lets just get 5 commits from the specified repo's default branch
            const url = `https://api.github.com/repos/${user}/${repo}/commits?per_page=5`;

            this.getCommits(url);
        },

        getCommits: function (queryUrl) {
            // Read token from global secret
            const config = {
                headers: {
                    Authorization: `Bearer ${secret.API_TOKEN}`
                }
            };

            this.reset();
            this.loading = true;

            axios.get(queryUrl, config)
                .then(resp => {
                    const commits = resp.data;

                    this.list = commits;
                })
                .catch(error => {
                    this.message = {
                        type: 'error',
                        header: 'Failed to retrieve commits.',
                        detail: 'Please try again later.'
                    };
                })
                .then(() => {
                    // Finally
                    this.loading = false;
                });
        }

    },
    template: `
        <div class="content">
            <template
                v-if="message !== null"
            >
                <div :class="['ui', 'message', message.type]">
                    <div class="header">{{ message.header }}</div>
                    <p>{{ message.detail }}</p>
                </div>
            </template>
            <div class="ui very relaxed divided list">
                <template v-if="loading">
                    <div class="item">
                        <div class="right floated content">
                            <div class="ui disabled compact button">hash</div>
                        </div>
                        <div class="ui placeholder">
                            <div class="image header">
                                <div class="line"></div>
                                <div class="line"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <commit-item
                    v-for="commit in list"
                    :item="commit"
                    :key="commit.sha"
                ></commit-item>
            </div>
        </div>
    `
});
