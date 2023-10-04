import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components/native";
import ScreenLayout from "../components/shared/ScreenLayout";
import { FlatList } from "react-native";
import ShopItem from "../components/shop/ShopPost";
import { graphql } from "../gql";

const SEE_COFFEE_SHOPS_QUERY = graphql(`
  query seeCoffeeShops($offset: Int) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      user {
        ...UserFragment
      }
      photos {
        ...PhotoFragment
      }
      categories {
        ...CategoryFragment
      }
    }
  }
`);

export default function Home() {
  // --- QUERY --- //
  const { data, loading, refetch, fetchMore } = useQuery(
    SEE_COFFEE_SHOPS_QUERY,
    {
      variables: {
        offset: 0,
      },
    }
  );

  // render item once data is loaded
  const renderShop = ({ item }: any) => {
    return <ShopItem {...item} />;
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
        // infinite scroll implementation
        onEndReachedThreshold={0.3}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        //refetch when scrolled down
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(shop) => shop?.id + ""}
        renderItem={renderShop}
      />
    </ScreenLayout>
  );
}
