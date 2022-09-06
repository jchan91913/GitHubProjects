Vue.filter('firstChars', function (str, numChars) {
    return str.substring(0, numChars);
});

Vue.filter('numToLocaleString', function (numStr) {
    // Format number string in U.S English locale
    // Note: looks like the simplest way to format a number
    // with thousands separators
    return parseInt(numStr).toLocaleString('en-US');
});
