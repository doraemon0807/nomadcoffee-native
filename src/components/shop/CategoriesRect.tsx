import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ImageProps,
  TouchableOpacityProps,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { SharedStackParamList } from "../../navigators/SharedStackNav";
import { IThemeProps } from "../../../styles";

interface TouchablePropsWithWidth extends TouchableOpacityProps {
  width: number;
  numColumns: number;
}

const CategoryContainer: React.FC<TouchablePropsWithWidth> = styled.TouchableOpacity`
  width: ${(props: TouchablePropsWithWidth) =>
    props.width / props.numColumns}px;
  padding: 4px;
  margin-bottom: 20px;
`;

const CategoryWrapper = styled.View`
  border: 1px solid ${(props: IThemeProps) => props.theme.borderColor};
  border-radius: 20px;
  padding: 10px;
  background-color: ${(props: IThemeProps) => props.theme.grayLight};
  flex: 1;
`;

const CategoryName = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
  text-align: center;
`;

interface ICategoryRectProps {
  id: number;
  name: string;
  numColumns: number;
  totalShops: number;
  navigation: NativeStackNavigationProp<
    SharedStackParamList,
    "Search",
    undefined
  >;
}

export default function CategoriesRect({
  id,
  name,
  numColumns,
  navigation,
}: ICategoryRectProps) {
  const { width } = useWindowDimensions();
  return (
    <CategoryContainer
      numColumns={numColumns}
      width={width}
      onPress={() =>
        navigation.navigate("CategoryResult", {
          categoryId: id,
          categoryName: name,
        })
      }
    >
      <CategoryWrapper>
        <CategoryName>{name}</CategoryName>
      </CategoryWrapper>
    </CategoryContainer>
  );
}
