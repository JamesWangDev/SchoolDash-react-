import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';

import Page from '../components/Page';
import withData from '../lib/withData';

const queryClient = new QueryClient();
queryClient.setDefaultOptions({ queries: { staleTime: 10000 } });
console.log('MyApp.js');
console.log(queryClient.getDefaultOptions());
function MyApp({ Component, pageProps, apollo }) {
  return (
    <>
      <ApolloProvider client={apollo}>
        <QueryClientProvider client={queryClient}>
          <Page>
            <Component {...pageProps} />
          </Page>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
