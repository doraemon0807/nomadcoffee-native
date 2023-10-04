import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenLayout from "../components/shared/ScreenLayout";
import { graphql } from "../gql";
import { FlatList, ListRenderItem, useWindowDimensions } from "react-native";
import ShopItem from "../components/shop/ShopPost";
import { useQuery } from "@apollo/client";
import ShopRect from "../components/shop/ShopRect";
import { CoffeeShop } from "../gql/graphql";

type Props = NativeStackScreenProps<SharedStackParamList, "CategoryResult">;

const SEE_CATEGORY_QUERY = graphql(`
  query seeCategory($category: String!, $offset: Int) {
    seeCategory(category: $category, offset: $offset) {
      ...ShopFragment
    }
  }
`);

export default function CategoryResult({ navigation, route }: Props) {
  const { width } = useWindowDimensions();

  const numColumns = 3;

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.categoryName,
    });
  }, []);

  // --- QUERY --- //
  const { data, loading, refetch, fetchMore } = useQuery(SEE_CATEGORY_QUERY, {
    variables: {
      category: route.params?.categoryName!,
      offset: 0,
    },
  });

  // render item once data is loaded
  const renderShop: ListRenderItem<CoffeeShop> = ({ item }) => {
    return (
      <ShopRect
        navigation={navigation}
        numColumns={numColumns}
        id={item.id}
        file={item.photos[0]?.url || ""}
      />
    );
  };

  // refresh when pulled down
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        columnWrapperStyle={{
          justifyContent: "flex-start",
          width,
        }}
        data={data?.seeCategory as CoffeeShop[]}
        renderItem={renderShop}
        keyExtractor={(shop) => shop?.id + ""}
        numColumns={numColumns}
        //Infinite scroll
        onEndReachedThreshold={0.3}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCategory.length,
              category: route.params?.categoryName,
            },
          })
        }
        //Refetch when scrolled down
        refreshing={refreshing}
        onRefresh={refresh}
      />
    </ScreenLayout>
  );
}
