shenanigans
==============================================================================

List of known issues:

1.  name + moduleName() differ
2.  `addon/index.js` imports `shenanigans/bar` which although contained within this modules `moduleName` is provided via pre-built vendor tree
3. treeForVendor pulls in an external file, and uses the ember-cli-babel addon to compile it's contents, including it's es module

Note: I have also included other funky things it does, just in-case those also cause grief.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install shenanigans
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
# addon-shenanigans
