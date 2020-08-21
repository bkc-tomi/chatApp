import '../styles/globals.css'
import FB from "../functions/firebase";

function MyApp({ Component, pageProps }) {
  (async() => {
    await FB.onAuthStateChanged(user => {
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
