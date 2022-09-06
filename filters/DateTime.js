// Important: this is dependent on Luxon library
Vue.filter('toRelative', function (dateTimeStr) {
    return luxon.DateTime.fromISO(dateTimeStr).toRelative();
});
