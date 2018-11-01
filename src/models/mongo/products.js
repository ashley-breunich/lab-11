'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
//gives the shape of a table
jsonSchema(mongoose);

const products = new mongoose.Schema({
  category: {type:String, require: true},
  name: {type:String, require: true},
  display_name: {type:String, require: true},
  description: {type:String},
});

export default mongoose.model('products', products);