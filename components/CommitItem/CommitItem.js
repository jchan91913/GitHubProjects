Vue.component('commit-item', {
    props: ['item'],
    data: function () {
        return {}
    },
    template: `
        <div class="item">
            <div class="right floated content">
                <a
                    class="ui compact button"
                    :href="item.html_url"
                    target="_blank"
                    data-inverted=""
                    data-tooltip="View commit"
                    data-position="top center"
                    data-variation="mini"
                >
                    {{ item.sha | firstChars(7) }}
                </a>
            </div>
            <img
                v-if="item.author !== null"
                class="ui avatar image"
                :src="item.author.avatar_url"
            >
            <div class="content">
                <a
                    class="header"
                    :href="item.html_url"
                    target="_blank"
                >
                    {{ item.commit.message }}
                </a>
                <div class="description">
                    <a
                        v-if="item.author !== null"
                        :href="item.author.html_url"
                        target="_blank"
                    >
                        {{ item.author.login }}
                    </a>
                    <span v-else>
                        <b>{{ item.commit.author.name }}</b>
                    </span>
                    {{ 'commited this ' + $options.filters.toRelative(item.commit.author.date) }}
                </div>
            </div>
        </div>
    `
});