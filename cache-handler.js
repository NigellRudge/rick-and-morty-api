const cacheMap = new Map();

export default class CacheHandler {
  constructor() {}

  async set(key, data, ctx) {
    return cacheMap.set(key, {
      data: JSON.stringify(data),
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  async revalidateTag(tags) {
    tags = [tags].flat();
    for (let [key, value] of cacheMap) {
      if (value.tags.some((tag) => tags.includes(tag))) {
        cacheMap.delete(key);
      }
    }
  }

  async get(key) {
    return cacheMap.get(key);
  }
}
