export default class MapWithHistory {
  constructor() {
    this.data = {};
    this.keyToTimeStamp = {};
  }

  getKey(key, timestamp) {
    return `${key}-${timestamp}`;
  }

  set(key, value, timestamp) {
    const finalKey = this.getKey(key, timestamp);

    if (!this.keyToTimeStamp[key]) {
      this.keyToTimeStamp[key] = [timestamp];
    } else {
      this.keyToTimeStamp[key].push(timestamp);
      this.keyToTimeStamp[key] = [...new Set(this.keyToTimeStamp[key])].sort(
        (a, b) => a - b,
      );
    }

    this.data[finalKey] = value;
  }

  get(key, timestamp) {
    const finalKey = this.getKey(key, timestamp);

    if (this.data[finalKey]) return this.data[finalKey];

    const nextBestTimeStamp = this.getNextBestKey(key, timestamp);
    if (nextBestTimeStamp) {
      return this.data[this.getKey(key, nextBestTimeStamp)];
    }

    return "none";
  }

  getNextBestKey(key, timestamp) {
    let res;

    for (const num of this.keyToTimeStamp[key] || []) {
      if (num > timestamp) {
        return res;
      }
      res = num;
    }

    return res;
  }
}

const mapWithHistory = new MapWithHistory();

mapWithHistory.set("language", "JavaScript", 1);
mapWithHistory.set("language", "TypeScript", 4);

console.log(mapWithHistory.get("language", 1));
// 'JavaScript'

console.log(mapWithHistory.get("language", 3));
// 'JavaScript'

console.log(mapWithHistory.get("language", 4));
// 'TypeScript'

console.log(mapWithHistory.get("language", 10));
// 'TypeScript'

mapWithHistory.set("theme", "dark", 5);

console.log(mapWithHistory.get("theme", 4));
console.log(mapWithHistory.get("missing", 4));
