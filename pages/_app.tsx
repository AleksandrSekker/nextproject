import { store } from '../redux/store';
import { Provider } from 'react-redux';
import '../scss/global.scss';
export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
