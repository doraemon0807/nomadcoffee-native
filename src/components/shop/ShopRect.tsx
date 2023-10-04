import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ImageProps,
  TouchableOpacityProps,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { SharedStackParamList } from "../../navigators/SharedStackNav";

interface ImagePropsWithWidth extends ImageProps {
  width: number;
  numColumns: number;
}

const PhotoContainer: React.FC<TouchableOpacityProps> = styled.TouchableOpacity``;

const File: React.FC<ImagePropsWithWidth> = styled.Image`
  width: ${(props: ImagePropsWithWidth) => props.width / props.numColumns}px;
  aspect-ratio: 1;
`;

interface IShopRectProps {
  id: number;
  file: string;
  navigation: NativeStackNavigationProp<
    SharedStackParamList,
    "Search" | "CategoryResult",
    undefined
  >;
  numColumns: number;
}

export default function ShopRect({
  id,
  file,
  navigation,
  numColumns,
}: IShopRectProps) {
  const { width } = useWindowDimensions();
  return (
    <PhotoContainer
      onPress={() =>
        navigation.navigate("ShopDetail", {
          shopId: id,
        })
      }
    >
      <File
        source={{ uri: file }}
        resizeMode="cover"
        width={width}
        numColumns={numColumns}
      />
    </PhotoContainer>
  );
}
