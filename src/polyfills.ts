// Polyfills
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';

//Polyfill to safari, it's advice to add a code to load this only when necessary.
import 'intl';
import 'intl/locale-data/jsonp/en';

if ('production' === process.env.ENV) {
  // In production Reflect with es7-reflect-metadata/reflect-metadata is added

  // Zone.js
  require('zone.js/dist/zone-microtask.min');

  // RxJS
  // In production manually include the operators you use
  require('rxjs/add/operator/map');

} else {
  // Reflect Polyfill
  require('es7-reflect-metadata/src/global/browser');
  // In production Reflect with es7-reflect-metadata/reflect-metadata is added

  // by webpack.prod.config ProvidePlugin
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/zone-microtask');
  require('zone.js/dist/long-stack-trace-zone');

}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
