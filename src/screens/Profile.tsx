import styled from "styled-components/native";
import Button from "../components/shared/Button";
import { logUserOut } from "../../apollo";

const Container = styled.View``;

const Text = styled.Text``;

export default function Profile() {
  return (
    <Container>
      <Text>Profile</Text>
      <Button text="Log Out" onPress={() => logUserOut()} />
    </Container>
  );
}
