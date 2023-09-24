import React, { useEffect, useState } from "react";
import { Image, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { IThemeProps } from "../../../styles";

import Avatar from "../shared/Avatar";

const Container = styled.View``;
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

const File = styled.Image``;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const Categories = styled.View`
  flex-direction: row;
  max-width: 100%;
  flex-wrap: wrap;
  line-height: 30px;
  gap: 10px;
`;

const Category = styled.TouchableOpacity`
  padding: 6px;
  border-radius: 100px;
  background-color: ${(props: IThemeProps) => props.theme.grayLight};
`;

const CategoryText = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
  margin-left: 5px;
  flex-shrink: 1;
`;

interface IShopPostProps {
  id: number;
  name: string;
  user?:
    | {
        __typename?: "User" | undefined;
        id: number;
        username: string;
        avatarURL?: string | null | undefined;
      }
    | null
    | undefined;
  photos?:
    | ({
        __typename?: "CoffeeShopPhoto" | undefined;
        id: number;
        url: string;
      } | null)[]
    | null
    | undefined;
  categories?:
    | ({
        __typename?: "Category" | undefined;
        id: number;
        name: string;
        slug: string;
      } | null)[]
    | null
    | undefined;
}

export default function ShopItem({
  id,
  name,
  user,
  photos,
  categories,
}: IShopPostProps) {
  //Find width and height of the screen
  const { width: sWidth, height: sHeight } = useWindowDimensions();

  //height-450 as default height
  const [imageHeight, setImageHeight] = useState(sHeight - 450);

  //if successful at getting image height, use that height
  useEffect(() => {
    Image.getSize(photos?.[0]?.url!, (width, height) => {
      setImageHeight((height * sWidth) / width);
    });
  }, [photos?.[0]?.url]);

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
        <UserInfo>
          <Avatar avatarUrl={user?.avatarURL} size="small" />
          <Username>{user?.username}</Username>
        </UserInfo>
      </Header>
      <File
        resizeMode="contain"
        source={{ uri: photos?.[0]?.url }}
        style={{ width: sWidth, height: imageHeight }}
      />
      <ExtraContainer>
        <Categories>
          {categories?.map((category) => (
            <Category key={category?.id}>
              <CategoryText>{category?.name}</CategoryText>
            </Category>
          ))}
        </Categories>
      </ExtraContainer>
    </Container>
  );
}
