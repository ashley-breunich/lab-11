'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
//gives the shape of a table
jsonSchema(mongoose);

const categories = new mongoose.Schema({
  name: {type:String, require: true},
  display_name: {type:String, require: true},
  description: {type:String},
});

export default mongoose.model('categories', categories);