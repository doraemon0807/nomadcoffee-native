import styled from "styled-components/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

type Props = NativeStackScreenProps<SharedStackParamList, "CategoryResult">;

const Container = styled.View``;

const Text = styled.Text``;

export default function CategoryResult({ navigation, route }: Props) {
  console.log(route.params);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.categoryName,
    });
  }, []);

  return (
    <Container>
      <Text>CategoryResult</Text>
    </Container>
  );
}
