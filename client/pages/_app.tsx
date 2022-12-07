import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const apolloClient = new ApolloClient({
    link: createUploadLink({
        uri: 'http://localhost:5000/graphql'
    }),
    cache: new InMemoryCache()
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
