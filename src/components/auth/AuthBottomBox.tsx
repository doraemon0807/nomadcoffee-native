import styled from "styled-components/native";
import { IThemeProps } from "../../../styles";
import { TouchableOpacityProps } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedStackParamList } from "../../navigators/SharedStackNav";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Cta = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
  margin-right: 6px;
`;

const LinkButton: React.FC<TouchableOpacityProps> = styled.TouchableOpacity``;

const LinkMessage = styled.Text`
  color: ${(props: IThemeProps) => props.theme.accentNormal};
`;

interface IAuthBottomBox {
  cta: string;
  navigation: NativeStackNavigationProp<
    SharedStackParamList,
    "Login" | "CreateAccount",
    undefined
  >;
  linkMessage: string;
  clearError: () => void;
  setStateMessage?: React.Dispatch<React.SetStateAction<string>>;
}

export default function AuthBottomBox({
  cta,
  navigation,
  linkMessage,
  clearError,
  setStateMessage,
}: IAuthBottomBox) {
  const onLinkPress = () => {
    clearError();
    if (linkMessage === "Login") {
      navigation.navigate("Login");
    } else if (linkMessage === "Sign Up") {
      if (setStateMessage) {
        setStateMessage("");
      }
      navigation.navigate("CreateAccount");
    }
  };

  return (
    <Container>
      <Cta>{cta}</Cta>
      <LinkButton onPress={onLinkPress}>
        <LinkMessage>{linkMessage}</LinkMessage>
      </LinkButton>
    </Container>
  );
}
