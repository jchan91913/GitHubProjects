Vue.component('repo-item', {
    props: ['item'],
    data: function () {
        return {
            show_commits: false
        }
    },
    methods: {
        showCommits: function () {
            const repo = this.item;

            this.show_commits = true;

            this.$refs.commitListRef.findCommitsByUserAndRepo(
                repo.owner.login,
                repo.name
            );
        },

        hideCommits: function () {
            this.show_commits = false;

            this.$refs.commitListRef.reset();
        }
    },
    template: `
    <div class="ui fluid card">
        <div class="content">
            <a
                class="header"
                :href="item.html_url"
                target="_blank"
            >
                {{ item.name }}
            </a>
            <div
                v-if="item.language !== null"
                class="ui tiny green horizontal label"
            >
                {{ item.language }}
            </div>
            <div class="meta">
                Updated {{ item.updated_at | toRelative }}
            </div>
            <div
                v-if="item.description !== null"
                class="description"
            >
                {{ item.description }}
            </div>
        </div>
        <div class="extra content">
            <span
                class="repoItem__stat--not-last"
                data-inverted=""
                data-tooltip="Stars"
                data-position="top center"
                data-variation="mini"
            >
                <i class="yellow star icon"></i>
                {{ item.stargazers_count | numToLocaleString }}
            </span>
            <span
                class="repoItem__stat--not-last"
                data-inverted=""
                data-tooltip="Watchers"
                data-position="top center"
                data-variation="mini"
            >
                <i class="eye icon"></i>
                {{ item.watchers_count | numToLocaleString }}
            </span>
            <span
                data-inverted=""
                data-tooltip="Forks"
                data-position="top center"
                data-variation="mini"
            >
                <i class="black fork icon"></i>
                {{ item.forks_count | numToLocaleString }}
            </span>
        </div>
        <div
            v-if="show_commits"
            class="ui bottom attached button"
            @click="hideCommits"
        >
            <i class="angle up icon"></i>
            Hide Commits
        </div>
        <div
            v-else
            class="ui bottom attached button"
            @click="showCommits"
        >
            <i class="angle down icon"></i>
            Show Commits
        </div>
        <commit-list ref="commitListRef"></commit-list>
    </div>
    `
});
