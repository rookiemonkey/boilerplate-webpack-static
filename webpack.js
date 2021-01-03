// !polyfill was removed and sinde babel 7, this needs to be imported manually
import "core-js/stable";
import "regenerator-runtime/runtime";



// !~~JS vendors / libraries first, then main js
import './src/assets/js/jquery';
import './src/assets/js/index';



// !~~CSS vendors/libraries first, then main css
import './src/assets/css/bootstrap.css'
import './src/assets/css/styles.css';
import './src/assets/scss/index.scss';



/**
* //! ~~alternatively, you can use this function to import everything on a specific folder
* requireAll(require.context('./assets/images/', true, /\.(svg|gif|png)$/));
* function requireAll(r) { r.keys().forEach(r); }
*/



//! PREVENTS BROWSER FROM REFRESHING AND INJECTS THE NEW CODE INSTEAD
//! might cause some bugs when injecting dynamic DOM Components
// module.hot ? module.hot.accept() : null
