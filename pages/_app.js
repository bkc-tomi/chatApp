import '../styles/globals.css'
import FB from "../functions/firebase";
import { logoutProcess } from "../functions/window";

function MyApp({ Component, pageProps }) {
  (async() => {
    await FB.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("true");
        
      } else {
        console.log("false");
      }
    });
  })();

  

  return <Component {...pageProps} />
}

export default MyApp
