// pages/_app.jsx
import '../styles/globals.css';  // Ensure you have a globals.css file

function Survey({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default Survey;
