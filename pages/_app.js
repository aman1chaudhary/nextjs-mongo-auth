import Navigation from '../components/Navigation';
import '../styles/globals.css';
import { UserProvider } from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navigation />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
