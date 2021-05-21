import "../styles/globals.scss";
import "components/styles/layout.scss";
import "components/styles/navbar.scss";
import "components/styles/card.scss";
import "components/styles/form.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
