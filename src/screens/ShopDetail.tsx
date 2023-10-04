import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenLayout from "../components/shared/ScreenLayout";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { IThemeProps } from "../../styles";
import { useWindowDimensions } from "react-native";
import Avatar from "../components/shared/Avatar";
import CategoryItem from "../components/shared/CategoryItem";

type Props = NativeStackScreenProps<SharedStackParamList, "ShopDetail">;

const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
  font-size: 18px;
  font-weight: 500;
`;

const UserInfo = styled.TouchableOpacity`
  max-width: 40%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Username = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
  font-weight: 600;
  margin-left: 10px;
`;

const FileContainer = styled.View``;

const File = styled.Image``;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const DataBox = styled.View`
  margin-bottom: 14px;
`;
const DataTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 6px;
  margin-bottom: 4px;
  color: ${(props: IThemeProps) => props.theme.fontColor};
`;
const DataInfo = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
`;

const Categories = styled.View`
  flex-direction: row;
  max-width: 100%;
  flex-wrap: wrap;
  line-height: 30px;
  gap: 10px;
`;

const SEE_COFFEESHOP_QUERY = graphql(`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ...ShopFragment
    }
  }
`);

export default function ShopDetail({ navigation, route }: Props) {
  const { data, loading } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: {
      id: route.params?.shopId!,
    },
  });

  //Find width and height of the screen
  const { width: sWidth, height: sHeight } = useWindowDimensions();

  //height-450 as default height
  const [imageHeight, setImageHeight] = useState(sHeight - 450);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.shopName || data?.seeCoffeeShop?.name,
    });
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <Container>
        <Header>
          <Title>{data?.seeCoffeeShop?.name}</Title>
          <UserInfo
            onPress={() =>
              navigation.navigate("UserDetail", {
                userId: data?.seeCoffeeShop?.user?.id!,
                username: data?.seeCoffeeShop?.user?.username!,
              })
            }
          >
            <Avatar url={data?.seeCoffeeShop?.user?.avatarURL} size="small" />
            <Username>{data?.seeCoffeeShop?.user?.username}</Username>
          </UserInfo>
        </Header>
        <FileContainer>
          <File
            source={{ uri: data?.seeCoffeeShop?.photos?.[0]?.url }}
            resizeMode="contain"
            style={{ width: sWidth, height: imageHeight }}
          />
        </FileContainer>
        <ExtraContainer>
          <DataBox>
            <DataTitle>Coordinates</DataTitle>
            <DataInfo>{`${data?.seeCoffeeShop?.latitude} : ${data?.seeCoffeeShop?.longitude}`}</DataInfo>
          </DataBox>
          {data?.seeCoffeeShop?.description && (
            <DataBox>
              <DataTitle>Description</DataTitle>
              <DataInfo>{data?.seeCoffeeShop?.description}</DataInfo>
            </DataBox>
          )}

          <DataBox>
            <DataTitle>Categories</DataTitle>
            <Categories>
              {data?.seeCoffeeShop?.categories?.map((category) => (
                <CategoryItem key={category?.id} category={category} />
              ))}
            </Categories>
          </DataBox>
        </ExtraContainer>
      </Container>
    </ScreenLayout>
  );
}
