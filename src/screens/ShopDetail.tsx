import styled from "styled-components/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

type Props = NativeStackScreenProps<SharedStackParamList, "ShopDetail">;

const Container = styled.View``;

const Text = styled.Text``;

export default function ShopDetail({ navigation, route }: Props) {
  console.log(route.params);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.shopId + "",
    });
  }, []);

  return (
    <Container>
      <Text>ShopDetail</Text>
    </Container>
  );
}
