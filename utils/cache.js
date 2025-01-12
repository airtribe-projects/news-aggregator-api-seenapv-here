const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 }); // Cache TTL (time-to-live) in seconds

module.exports = {
  set: (key, value) => cache.set(key, value),
  get: (key) => cache.get(key),
  del: (key) => cache.del(key),
  flush: () => cache.flushAll(),
};