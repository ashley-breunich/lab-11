'use strict';

import storage from '../lib/storage/storage.js';

class Categories {

  static findOne(id) {
    let query = { _id:id };
    return this.find(query);
  }
  static schema() {
    return typeof this.schema.jsonSchema === 'function' ?
      this.schema.jsonSchema() : {};
  }

  static find(query) {
    return storage.find(query);
  }

  static save(data) {
    return storage.save(data);
  }

  static delete(id) {
    return storage.delete(id);
  }

  static put(id, data) {
    return storage.save(data);
  }

  static patch(id, data) {
    data._id = id;
    return storage.save(data);
  }

}

export default Categories;
