import { RefObject, useEffect, useRef, useState } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import Button from "../components/shared/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { LoginMutation } from "../gql/graphql";
import { logUserIn } from "../../apollo";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import AuthBottomBox from "../components/auth/AuthBottomBox";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<SharedStackParamList, "Login">;

export interface ILoginForm {
  username: string;
  password: string;
  errorMessage?: string | null;
}

const LOGIN_MUTATION = graphql(`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`);

export default function Login({ route: { params } }: Props) {
  const navigation: NativeStackNavigationProp<
    SharedStackParamList,
    "Login",
    undefined
  > = useNavigation();

  const [stateMessage, setStateMessage] = useState("");
  const [stateUsername, setStateUsername] = useState("");
  const [statePassword, setStatePassword] = useState("");

  useEffect(() => {
    if (params?.stateMessage) {
      setStateMessage(params.stateMessage);
    }
  }, [params?.stateMessage]);

  useEffect(() => {
    if (params) {
      const { username, password } = params;
      setStateUsername(username);
      setStatePassword(password);
    }
  }, [params?.username, params?.password]);

  // --- React Hook Form --- //
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      username: params?.username || stateUsername,
      password: params?.password || statePassword,
    },
  });

  //Register input values via useEffect. Only on React Native
  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

  //Jump to Password after input
  const passwordRef: React.MutableRefObject<null> = useRef(null);

  const onNext = (nextRef: RefObject<HTMLInputElement>): void => {
    nextRef?.current?.focus();
  };

  const onCompleted = async ({
    login: { ok, error, token },
  }: LoginMutation) => {
    if (ok && token) {
      await logUserIn(token);
    } else if (error) {
      console.log("ERROR: ", error);
      setError("errorMessage", {
        message: error,
      });
    }
  };

  // --- MUTATION --- //
  // mutation function for login
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid: SubmitHandler<ILoginForm> = ({ username, password }) => {
    if (!loading) {
      setStateMessage("");
      logInMutation({
        variables: {
          username,
          password,
        },
      });
    }
  };

  const clearAllErrors = () => {
    clearErrors();
  };

  return (
    <AuthLayout
      errorMessage={errors?.errorMessage?.message}
      stateMessage={stateMessage}
    >
      <AuthInput
        blurOnSubmit={false}
        value={watch("username")}
        autoCapitalize="none"
        returnKeyType="next"
        placeholder="Username"
        onSubmitEditing={() => onNext(passwordRef)}
        //set value of input value. Only on React Native
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("username", text);
        }}
      />
      <AuthInput
        value={watch("password")}
        autoCapitalize="none"
        innerRef={passwordRef}
        returnKeyType="done"
        secureTextEntry
        placeholder="Password"
        lastOne={true}
        onSubmitEditing={handleSubmit(onSubmitValid)}
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("password", text);
        }}
      />
      <Button
        $accent
        loading={loading}
        text="Log in"
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onSubmitValid)}
      />
      <AuthBottomBox
        cta="Don't have an account?"
        navigation={navigation}
        linkMessage="Sign Up"
        clearError={clearAllErrors}
        setStateMessage={setStateMessage}
      />
    </AuthLayout>
  );
}
