'use strict';

const Rollup = require('broccoli-rollup');
const MergeTrees = require('broccoli-merge-trees');
const calculateCacheKeyForTree = require('calculate-cache-key-for-tree');

module.exports = {
  name: require('./package').name,

  moduleName() {
    return 'shenanigans';
  },

  _findApp() {
    if (typeof this._findHost === 'function') {
      return this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      // Keep iterating upward until we don't have a grandparent.
      // Has to do this grandparent check because at some point we hit the project.
      let app;
      let current = this;
      do {
        app = current.app || this;
      } while (
        current.parent &&
        current.parent.parent &&
        (current = current.parent)
      );

      return app;
    }
  },


  cacheKeyForTree: function(treeType) {
    return calculateCacheKeyForTree(treeType, this, [!this.parent.parent]);
  },

  treeFor() {
    // Only include assets in app if top level instance
    if (!this.parent.parent) {
      return this._super.treeFor.apply(this, arguments);
    } else {
      return null;
    }
  },


  included() {
    this._super.included.apply(this, arguments);
    const app = this._findApp();
    let importTarget = app;
    if (typeof this.import === 'function') {
      importTarget = this;
    }
    importTarget.import('vendor/shenanigans/@stefanpenner/apple.js');
  },

  treeForVendor(tree) {
    let apple = new Rollup( `${__dirname}/pretend-node-modules/apple/` ,
      {
        rollup: {
          input: 'index.js',
          output: {
            file: 'shenanigans/@stefanpenner/apple.js',
            format: 'es',
          }
        }
      }
    );

    const babelAddon = this.addons.find(
      addon => addon.name === 'ember-cli-babel'
    );

    return new MergeTrees([
      babelAddon.transpileTree(apple),
      tree
    ].filter(Boolean));

  }
};
