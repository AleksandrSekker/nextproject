import { store } from '../redux/store';
import { Provider } from 'react-redux';
import '../scss/global.scss';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Provider>
  );
}
