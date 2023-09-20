import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/shared/Button";
import AuthInput from "../components/auth/AuthInput";
import { RefObject, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { CreateAccountMutation } from "../gql/graphql";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { useNavigation } from "@react-navigation/native";
import AuthBottomBox from "../components/auth/AuthBottomBox";

interface ICreateAccountForm {
  username: string;
  email: string;
  name: string;
  location: string;
  password: string;
  githubUsername?: string;
  errorMessage?: string;
}

const CREATE_ACCOUNT_MUTATION = graphql(`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`);

export default function CreateAccount() {
  const navigation: NativeStackNavigationProp<
    SharedStackParamList,
    "CreateAccount",
    undefined
  > = useNavigation();

  // --- React Hook Form --- //
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm<ICreateAccountForm>();

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("email", {
      required: true,
    });
    register("name", {
      required: true,
    });
    register("location", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("githubUsername");
  }, [register]);

  const emailRef: React.MutableRefObject<null> = useRef(null);
  const nameRef: React.MutableRefObject<null> = useRef(null);
  const locationRef: React.MutableRefObject<null> = useRef(null);
  const passwordRef: React.MutableRefObject<null> = useRef(null);
  const githubRef: React.MutableRefObject<null> = useRef(null);

  //Jump to next input after input
  const onNext = (nextRef: RefObject<HTMLInputElement>): void => {
    nextRef?.current?.focus();
  };

  // --- MUTATION --- //
  const onCompleted = ({
    createAccount: { ok, error },
  }: CreateAccountMutation) => {
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        username: username,
        password: password,
        stateMessage: "Account created. Please log in.",
      });
    } else if (error) {
      setError("errorMessage", {
        message: error,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid: SubmitHandler<ICreateAccountForm> = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const clearAllErrors = () => {
    clearErrors();
  };

  return (
    <AuthLayout errorMessage={errors?.errorMessage?.message}>
      <AuthInput
        blurOnSubmit={false}
        autoCapitalize={"none"}
        onSubmitEditing={() => onNext(nameRef)}
        returnKeyType="next"
        placeholder="Username"
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("username", text);
        }}
      />
      <AuthInput
        blurOnSubmit={false}
        autoCapitalize="none"
        onSubmitEditing={() => onNext(emailRef)}
        innerRef={nameRef}
        returnKeyType="next"
        placeholder="Full Name"
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("name", text);
        }}
      />
      <AuthInput
        blurOnSubmit={false}
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        innerRef={emailRef}
        returnKeyType="next"
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("email", text);
        }}
      />
      <AuthInput
        blurOnSubmit={false}
        autoCapitalize="none"
        onSubmitEditing={() => onNext(locationRef)}
        innerRef={passwordRef}
        returnKeyType="next"
        secureTextEntry
        placeholder="Password"
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("password", text);
        }}
      />
      <AuthInput
        blurOnSubmit={false}
        onSubmitEditing={() => onNext(githubRef)}
        innerRef={locationRef}
        returnKeyType="next"
        placeholder="Location"
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("location", text);
        }}
      />
      <AuthInput
        onSubmitEditing={handleSubmit(onSubmitValid)}
        innerRef={githubRef}
        returnKeyType="done"
        placeholder="Github Username (optional)"
        onChangeText={(text: string) => {
          clearAllErrors();
          setValue("githubUsername", text);
        }}
        lastOne={true}
      />
      <Button
        $accent
        loading={loading}
        text="Create Account"
        disabled={
          !watch("username") ||
          !watch("email") ||
          !watch("name") ||
          !watch("location") ||
          !watch("password")
        }
        onPress={handleSubmit(onSubmitValid)}
      />
      <AuthBottomBox
        cta="Already have an account?"
        navigation={navigation}
        linkMessage="Login"
        clearError={clearAllErrors}
      />
    </AuthLayout>
  );
}
