Vue.component('repo-list', {
    data: function () {
        return {
            loading: false,
            list: [],
            links: null
        }
    },
    methods: {
        // Resets our UI (clear message, clean up link navigation, etc.)
        reset: function () {
            this.$emit('msg-clear');
            this.links = null;
            this.list = [];
        },

        findReposByUser: function (user) {
            // Lets order the repos by most recently updated
            const url = `https://api.github.com/users/${user}/repos?sort=updated&direction=desc`;

            this.getRepos(url);
        },

        getRepos: function (queryUrl) {
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
                    const repos = resp.data;
                    this.list = repos;

                    this.parseHeaderLink(resp.headers);

                    if (repos.length === 0) {
                        this.$emit('msg-update', {
                            type: 'warning',
                            header: 'No repositories found.',
                            detail: 'Perhaps user or organization has not created any repositories yet.'
                        });
                    }
                })
                .catch(error => {
                    const resp = error.response;
                    let msgHeader, msgDetail = '';

                    if (resp.status === 404) {
                        msgHeader = 'User or organization not found.'
                        msgDetail = 'Please enter a valid name.';
                    } else {
                        // API is down or we exceeded our rate limit
                        msgHeader = 'Search request failed.';
                        msgDetail = 'Please try again later.';
                    }

                    this.$emit('msg-update', {
                        type: 'error',
                        header: msgHeader,
                        detail: msgDetail
                    });
                })
                .then(() => {
                    // Finally
                    this.loading = false;
                });
        },

        skipToRepos: function (queryUrl) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            this.getRepos(queryUrl);
        },

        // Extracts pagination data from header link, if available
        parseHeaderLink: function (headers) {
            const linkMap = {};

            if (headers.hasOwnProperty('link')) {
                // Proceed to parse the link relations GitHub API provides
                const relations = headers.link.split(', ');

                relations.forEach((relation) => {
                    const parts = relation.split('; ');

                    const linkMatch = parts[0].match(/<(.*)>/);
                    const nameMatch = parts[1].match(/rel="(.*)"/);
                    const link = linkMatch[1];
                    const name = nameMatch[1];

                    linkMap[name] = link;
                });

                this.links = linkMap;

            } else {
                this.links = null;
            }
        }
    },
    template: `
        <div>
            <div class="ui cards">
                <div
                    v-if="loading"
                    class="fluid ui card"
                >
                    <div class="content">
                        <div class="ui placeholder">
                            <div class="header">
                                <div class="very short line"></div>
                                <div class="medium line"></div>
                            </div>
                            <div class="paragraph">
                                <div class="short line"></div>
                                <div class="medium line"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <repo-item
                    v-for="repo in list"
                    :item="repo"
                    :key="repo.id"
                ></repo-item>
            </div>
            <div class="row repoList__nav">
                <div
                    v-if="links !== null"
                    class="ui buttons"
                >
                    <button
                        v-if="links.hasOwnProperty('first')"
                        class="ui button"
                        @click="skipToRepos(links.first)"
                    >
                        First
                    </button>
                    <button
                        v-if="links.hasOwnProperty('prev')"
                        class="ui button"
                        @click="skipToRepos(links.prev)"
                    >
                        Prev
                    </button>
                    <button
                        v-if="links.hasOwnProperty('next')"
                        class="ui button"
                        @click="skipToRepos(links.next)"
                    >
                        Next
                    </button>
                    <button
                        v-if="links.hasOwnProperty('last')"
                        class="ui button"
                        @click="skipToRepos(links.last)"
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    `,
});
