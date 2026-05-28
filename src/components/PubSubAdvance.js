class PubSub {
  constructor() {
    this.data = {};
    this.handlers = {};
  }

  add(key, value) {
    const oldValue = this.data[key];
    this.data[key] = value;

    this.trigger(oldValue, value, key);
  }

  has(key) {
    return key in this.data;
  }

  on(key, handler) {
    this.handlers[key] = this.handlers[key] || [];
    this.handlers[key].push(handler);
  }

  trigger(oldValue, newValue, key) {
    const changeEvent = `change:${key}`;
    if (this.handlers[changeEvent]) {
      this.handlers[changeEvent].forEach((handler) =>
        handler(oldValue, newValue, changeEvent),
      );
    }

    const event = key;
    if (this.handlers[event]) {
      this.handlers[event].forEach((handler) =>
        handler(oldValue, newValue, event),
      );
    }
  }
}

// let store = new PubSub();
// store.add("name", "joe");
// store.add("age", 30);

// console.log(store.has("age")); // return true
// console.log(store.has("animal")); // return false

// store.add("name", "emma");
// store.on("change:name", (old_val, new_val, key) => {
//   console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
// });
// store.add("name", "john");
// // "old name: emma, new name: john"

// store.on("age", (old_val, new_val, key) => {
//   console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`);
// });
// store.add("age", 50);
// // "old age: 30, new age: 50"

// store.on("change:age", (old_val, new_val, key) => {
//   console.log(`${old_val > new_val ? "older now" : ""}`);
// });
// store.add("age", 28);
// // "older now"
// // "old age: 50, new age: 28"

// store.add("age", 45);
// // ""
// "old age: 28, new age: 45"

const map = new MapClone();

const a = { name: "abcd" };
const b = { name: "abcd" };

map.set(a, 1);
map.set(b, 2);

hash[map.get()] = 1;
hash[JSON.stringify(b)] = 2;

console.log(hash[JSON.stringify(a)]);
console.log(hash[JSON.stringify(b)]);

console.log(hash);
