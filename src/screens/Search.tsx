import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  TextInputProps,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { IThemeProps, darkTheme, lightTheme } from "../../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DismissKeyboard from "../components/shared/DismissKeyboard";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphql } from "../gql";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { darkModeVar } from "../../apollo";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import {
  Category,
  CoffeeShop,
  QuerySearchCoffeeShopsArgs,
} from "../gql/graphql";
import ShopRect from "../components/shop/ShopRect";
import CategoriesRect from "../components/shop/CategoriesRect";

type Props = NativeStackScreenProps<SharedStackParamList, "Search">;

interface TextInputPropsWithWidth extends TextInputProps {
  width: number;
}

const Container = styled.View`
  background-color: ${(props: IThemeProps) => props.theme.bgColor};
  flex: 1;
  align-items: center;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModeContainer = styled.View``;

const Input: React.FC<TextInputPropsWithWidth> = styled.TextInput.attrs(
  (props: IThemeProps) => ({
    placeholderTextColor: props.theme.grayNormal,
  })
)`
  background-color: ${(props: IThemeProps) => props.theme.borderColor};
  width: ${(props: TextInputPropsWithWidth) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 10px;
`;

const MessageContainer = styled.View``;
const MessageText = styled.Text`
  margin-top: 10px;
  color: ${(props: IThemeProps) => props.theme.fontColor};
  font-weight: 600;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Mode = styled.TouchableOpacity<{ $active: boolean }>`
  justify-content: center;
  flex: 1;
  padding: 16px 0px;
  border-bottom-width: 1px;
  border-color: ${(props: any) =>
    props.$active ? props.theme.fontColor : "transparent"};
`;

const ModeText = styled.Text`
  text-align: center;
  color: ${(props: IThemeProps) => props.theme.fontColor};
`;

const SEARCH_COFFEE_SHOPS = graphql(`
  query searchCoffeeShops($keyword: String!, $offset: Int) {
    searchCoffeeShops(keyword: $keyword, offset: $offset) {
      id
      photos {
        id
        url
      }
    }
  }
`);

const SEARCH_CATEGORIES = graphql(`
  query searchCategories($keyword: String!, $offset: Int) {
    searchCategories(keyword: $keyword, offset: $offset) {
      id
      name
      slug
      totalShops
    }
  }
`);

export default function Search({ navigation }: Props) {
  const darkMode = useReactiveVar(darkModeVar);
  const [mode, setMode] = useState<"shops" | "categories">("shops");

  const { width } = useWindowDimensions();

  const numColumns = 3;

  const {
    setValue,
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<QuerySearchCoffeeShopsArgs>();

  // --- Lazy query: only run query when requested --- //
  const [
    startShopsQueryFn,
    {
      loading: shopsLoading,
      data: shopsData,
      called: shopsCalled,
      fetchMore: shopsFetchMore,
      refetch: shopsRefetch,
    },
  ] = useLazyQuery(SEARCH_COFFEE_SHOPS);

  // --- Lazy query: only run query when requested --- //
  const [
    startCategoriesQueryFn,
    {
      loading: categoriesLoading,
      data: categoriesData,
      called: categoriesCalled,
      fetchMore: categoriesFetchMore,
      refetch: categoriesRefetch,
    },
  ] = useLazyQuery(SEARCH_CATEGORIES);

  const onSubmitEditing: SubmitHandler<QuerySearchCoffeeShopsArgs> = ({
    keyword,
  }) => {
    if (!shopsLoading && !categoriesLoading) {
      startShopsQueryFn({
        variables: {
          keyword,
          offset: 0,
        },
      });
      startCategoriesQueryFn({
        variables: {
          keyword,
          offset: 0,
        },
      });
    }
  };

  //search box in the header
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="black"
      placeholder="Search Photos"
      autoCapitalize="none"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onSubmitEditing)}
    />
  );

  const shopRenderItem: ListRenderItem<CoffeeShop> = ({ item }) => {
    return (
      <ShopRect
        navigation={navigation}
        numColumns={numColumns}
        id={item.id}
        file={item.photos[0]?.url || ""}
      />
    );
  };
  const categoriesRenderItem: ListRenderItem<Category> = ({ item }) => {
    return (
      <CategoriesRect
        navigation={navigation}
        id={item.id}
        name={item.name}
        numColumns={numColumns}
        totalShops={item.totalShops}
      />
    );
  };

  // refresh when pulled down
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await shopsRefetch();
    await categoriesRefetch();
    setRefreshing(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: {
        message: "Your keyword must be longer than 2 letters.",
        value: 3,
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (errors.keyword?.message) {
      Alert.alert("Invalid", errors.keyword.message, [
        {
          text: "Dismiss",
          onPress: () => clearErrors("keyword"),
        },
      ]);
    }
  }, [errors.keyword]);

  return (
    <DismissKeyboard>
      <Container>
        <Header>
          <Mode $active={mode === "shops"} onPress={() => setMode("shops")}>
            <ModeText>Shops</ModeText>
          </Mode>

          <Mode
            $active={mode === "categories"}
            onPress={() => setMode("categories")}
          >
            <ModeText>Categories</ModeText>
          </Mode>
        </Header>

        <Wrapper>
          {mode === "shops" ? (
            <ModeContainer>
              {/* When searching */}
              {shopsLoading ? (
                <MessageContainer>
                  <ActivityIndicator
                    size="large"
                    color={
                      darkMode ? darkTheme.fontColor : lightTheme.fontColor
                    }
                  />
                  <MessageText>Searching...</MessageText>
                </MessageContainer>
              ) : null}
              {/* When data has not been called yet */}
              {!shopsCalled ? (
                <MessageContainer>
                  <MessageText>Search Shops by keyword</MessageText>
                </MessageContainer>
              ) : null}
              {/* When search is performed */}
              {shopsData?.searchCoffeeShops !== undefined ? (
                // When there's no data from search query
                shopsData?.searchCoffeeShops?.length === 0 ? (
                  <MessageContainer>
                    <MessageText>Could not find anything.</MessageText>
                  </MessageContainer>
                ) : (
                  // When there's a data from search query
                  <FlatList
                    columnWrapperStyle={{
                      justifyContent: "flex-start",
                      width,
                    }}
                    data={shopsData?.searchCoffeeShops as CoffeeShop[]}
                    renderItem={shopRenderItem}
                    keyExtractor={(shop) => shop?.id + ""}
                    numColumns={numColumns}
                    //Infinite scroll
                    onEndReachedThreshold={0.3}
                    onEndReached={() =>
                      shopsFetchMore({
                        variables: {
                          offset: shopsData?.searchCoffeeShops.length,
                          keyword: getValues("keyword"),
                        },
                      })
                    }
                    //Refetch when scrolled down
                    refreshing={refreshing}
                    onRefresh={refresh}
                  />
                )
              ) : null}
            </ModeContainer>
          ) : null}
          {mode === "categories" ? (
            <ModeContainer>
              {/* When searching */}
              {categoriesLoading ? (
                <MessageContainer>
                  <ActivityIndicator
                    size="large"
                    color={
                      darkMode ? darkTheme.fontColor : lightTheme.fontColor
                    }
                  />
                  <MessageText>Searching...</MessageText>
                </MessageContainer>
              ) : null}
              {/* When data has not been called yet */}
              {!categoriesCalled ? (
                <MessageContainer>
                  <MessageText>Search Categories by keyword</MessageText>
                </MessageContainer>
              ) : null}
              {/* When search is performed */}
              {categoriesData?.searchCategories !== undefined ? (
                // When there's no data from search query
                categoriesData?.searchCategories?.length === 0 ? (
                  <MessageContainer>
                    <MessageText>Could not find anything.</MessageText>
                  </MessageContainer>
                ) : (
                  // When there's a data from search query

                  <FlatList
                    columnWrapperStyle={{
                      justifyContent: "flex-start",
                      width,
                    }}
                    data={categoriesData?.searchCategories as Category[]}
                    renderItem={categoriesRenderItem}
                    keyExtractor={(category) => category?.id + ""}
                    numColumns={numColumns}
                    //Infinite scroll
                    onEndReachedThreshold={0.3}
                    onEndReached={() =>
                      categoriesFetchMore({
                        variables: {
                          offset: categoriesData?.searchCategories.length,
                          keyword: getValues("keyword"),
                        },
                      })
                    }
                    //Refetch when scrolled down
                    refreshing={refreshing}
                    onRefresh={refresh}
                  />
                )
              ) : null}
            </ModeContainer>
          ) : null}
        </Wrapper>
      </Container>
    </DismissKeyboard>
  );
}
