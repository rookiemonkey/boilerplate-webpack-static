//! polyfill was removed and sinde babel 7, this needs to be imported manually
import "core-js/stable";
import "regenerator-runtime/runtime";


//! ~~JS vendors/libraries first, then main js
import '../assets/js/jquery';
import '../assets/js/index';


//! ~~CSS vendors/libraries first, then main css
import '../assets/css/bootstrap.css'
import '../assets/css/styles.css';
import '../assets/scss/index.scss';



//! ~~these are the ones not used in CSS/SASS since css-loader will automatically grab it
//! ~~these are the ones used in the markup img & video tags
import '../assets/images/cat.jpg';
import '../assets/videos/sample.mp4';



//! ~~alternatively, you can use this function to import everything on a specific folder
requireAll(require.context('./assets/images/', true, /\.(svg|gif|png)$/));
function requireAll(r) { r.keys().forEach(r); }
