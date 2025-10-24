// Minimal polyfill for String.prototype.replaceAll for Node < 15
if (!String.prototype.replaceAll) {
  // eslint-disable-next-line no-extend-native
  String.prototype.replaceAll = function (search, replace) {
    if (search instanceof RegExp) {
      return this.replace(search, replace);
    }
    return this.split(search).join(replace);
  };
}
