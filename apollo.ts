import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar<string | null>("");
export const darkModeVar = makeVar(false);

const TOKEN = "token";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
  client.resetStore();
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

//http link to authenticate with token
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

//http link to upload files
const uploadHttpLink = createUploadLink({
  uri: "https://funny-pandas-go.loca.lt/graphql",
});

//http link to display errors
const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error: `, graphQLErrors);
  }
  if (networkError) {
    console.log(`GraphQL Error: `, networkError);
  }
});

//http links combined
const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShops: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: httpLinks,
  cache,
});

export default client;
