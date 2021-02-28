import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import Page from '../components/Page';
import withData from '../lib/withData';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <QueryClientProvider client={queryClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </QueryClientProvider>
    </ApolloProvider>
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
