'use strict';

// import requireAll from 'require-dir';

// const models = requireAll('../models');
const models = { products: require('../models/products.js'), categories: require('../models/categories.js')};


/*
{
  notes: { default: [Function: Notes] },
  tasks: { default: [Function: Tasks] }
}

 */

export default (req,res,next) => {
  let model = req.params.model;
  if(model && models[model] && models[model].default) {
    req.model = models[model].default;
    next();
  }
  else {
    next('Invalid Model');
  }
};
