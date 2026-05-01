const path = require("path");
const { resourcePath } = atom.getLoadSettings();
const { ScopeSelector } = require(path.join(resourcePath, "node_modules", "second-mate"));
const cache = {};

exports.get = function (selector) {
  let scopeSelector = cache[selector];
  if (!scopeSelector) {
    scopeSelector = new ScopeSelector(selector);
    cache[selector] = scopeSelector;
  }
  return scopeSelector;
};
