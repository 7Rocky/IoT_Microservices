const documents = require('../temperatures.json');

module.exports = {
  connect: (url, options) => {
    return Promise.resolve();
  },
  model: (name, schema) => {
    return {
      find: (doc, keys) => {
        if (doc.ip && doc.username && doc.init_timestamp && doc.end_timestamp &&
            doc.init_timestamp['$gte'] && doc.end_timestamp['$lte']) {

          return Promise.resolve([ documents[ Math.random() < 0.5 ? 0 : 1 ] ]);
        }

        return Promise.resolve([ ]);
      },
      /*insertMany: (docs) => {
  
      }*/
    }
  },
  connection: {
    on: (event, cb) => {
      cb(event);
    },
    once: (event, cb) => {
      cb(event);
    }
  },
  Schema: class {
    
    constructor(schema) {
      this.schema = schema;
    }

  }
};
