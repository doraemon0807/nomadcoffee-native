import React, { RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { IThemeProps } from "../../styles";
import AuthInput from "../components/auth/AuthInput";
import { graphql } from "../gql";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditProfileMutation } from "../gql/graphql";
import Button from "../components/shared/Button";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "../hook/useUser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";

type Props = NativeStackScreenProps<SharedStackParamList, "EditProfile">;

interface IEditProfileForm {
  username: string;
  name: string;
  email: string;
  githubUsername: string;
  location: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  errorMessage?: string;
}

interface INewData {
  username?: string;
  name?: string;
  email?: string;
  githubUsername?: string;
  location?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const Container = styled.View`
  background-color: ${(props: IThemeProps) => props.theme.bgColor};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Wrapper = styled.ScrollView`
  width: 100%;
  flex: 1;
  padding: 20px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  padding-bottom: 10px;
`;
const ErrorMessage = styled.Text`
  color: ${(props: IThemeProps) => props.theme.red};
  text-align: center;
`;

const EditHeader = styled.View`
  width: 100%;
  flex-direction: row;
`;

const EditMode = styled.TouchableOpacity<{ $active: boolean }>`
  justify-content: center;
  flex: 1;
  padding: 16px 0px;
  margin-bottom: 10px;
  border-bottom-width: 2px;
  border-color: ${(props: any) =>
    props.$active ? props.theme.fontColor : "transparent"};
`;

const EditModeText = styled.Text<{ $active: boolean }>`
  text-align: center;
  color: ${(props: any) =>
    props.$active ? props.theme.fontColor : props.theme.grayLight};
`;

const ProfileEditForm = styled.View`
  width: 100%;
  flex: 1;
`;
const PasswordEditForm = styled.View`
  width: 100%;
  flex: 1;
`;

const EDIT_PROFILE_MUTATION = graphql(`
  mutation editProfile(
    $username: String
    $name: String
    $email: String
    $githubUsername: String
    $location: String
    $oldPassword: String
    $newPassword: String
  ) {
    editProfile(
      username: $username
      name: $name
      email: $email
      githubUsername: $githubUsername
      location: $location
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      ok
      error
    }
  }
`);

export default function EditProfile({ navigation, route: { params } }: Props) {
  // Edit Profile Mode State
  const [mode, setMode] = useState<"profile" | "password">("profile");

  // --- React Hook Form --- //
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm<IEditProfileForm>({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      githubUsername: "",
      location: "",
    },
  });

  useEffect(() => {
    let defaults = {
      username: params?.username,
      name: params?.name,
      email: params?.email,
      githubUsername: params?.githubUsername,
      location: params?.location,
    };
    reset(defaults);
  }, [params, reset]);

  useEffect(() => {
    register("username");
    register("name");
    register("email");
    register("githubUsername");
    register("location");
    register("oldPassword");
    register("newPassword");
    register("confirmNewPassword");
  }, [register]);

  const nameRef: React.MutableRefObject<null> = useRef(null);
  const emailRef: React.MutableRefObject<null> = useRef(null);
  const githubUsernameRef: React.MutableRefObject<null> = useRef(null);
  const locationRef: React.MutableRefObject<null> = useRef(null);
  const newPasswordRef: React.MutableRefObject<null> = useRef(null);
  const confirmNewPasswordRef: React.MutableRefObject<null> = useRef(null);

  //Jump to next input after input
  const onNext = (nextRef: RefObject<HTMLInputElement>): void => {
    nextRef?.current?.focus();
  };

  // --- MUTATION --- //
  const onCompleted = async ({
    editProfile: { ok, error },
  }: EditProfileMutation) => {
    const { username } = getValues();

    if (ok) {
      navigation.pop(1);
    } else {
      setError("errorMessage", {
        message: error!,
      });
    }
  };

  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    {
      refetchQueries: [ME_QUERY],
      onCompleted,
    }
  );

  const editProfileValidation = () => {
    let validation = true;
    let message = "";

    if (mode === "profile") {
      const { username, name, email, githubUsername, location } = getValues();

      //check if all forms are complete
      if (
        !username ||
        !name ||
        !email ||
        !githubUsername ||
        !location ||
        username === "" ||
        name === "" ||
        email === "" ||
        githubUsername === "" ||
        location === ""
      ) {
        validation = false;
        message = "All fields must be filled in.";
      }
    }
    if (mode === "password") {
      const { oldPassword, newPassword, confirmNewPassword } = getValues();

      //check if all forms are complete
      if (
        !oldPassword ||
        !newPassword ||
        !confirmNewPassword ||
        oldPassword === "" ||
        newPassword === "" ||
        confirmNewPassword === ""
      ) {
        validation = false;
        message = "All fields must be filled in.";
      }

      //check if old password and new password is the same
      else if (oldPassword === newPassword) {
        validation = false;
        message = "Cannot use same password.";
      }

      //check if new passwords are same
      else if (newPassword !== confirmNewPassword) {
        validation = false;
        message = "Passwords must match.";
      }
    }

    return {
      validation,
      message,
    };
  };

  const onSubmitValid: SubmitHandler<IEditProfileForm> = (data) => {
    const { validation, message } = editProfileValidation();
    if (!validation) {
      return setError("errorMessage", {
        message,
      });
    }
    if (loading) {
      return;
    }

    let newData: INewData = { ...data };

    if (mode === "password") {
      newData.username = params?.username;
      delete newData.name;
      delete newData.email;
      delete newData.githubUsername;
      delete newData.location;
    } else if (mode === "profile") {
      delete newData.oldPassword;
      delete newData.newPassword;
      delete newData.confirmNewPassword;
    }

    console.log(newData);
    editProfileMutation({
      variables: {
        ...newData,
      },
    });
  };

  const clearAllError = () => {
    clearErrors();
  };

  return (
    <Container>
      <Wrapper>
        <EditHeader>
          <EditMode
            $active={mode === "profile"}
            onPress={() => setMode("profile")}
          >
            <EditModeText $active={mode === "profile"}>
              Change My Info
            </EditModeText>
          </EditMode>

          <EditMode
            $active={mode === "password"}
            onPress={() => setMode("password")}
          >
            <EditModeText $active={mode === "password"}>
              Change Password
            </EditModeText>
          </EditMode>
        </EditHeader>
        {mode === "profile" ? (
          <ProfileEditForm>
            <AuthInput
              blurOnSubmit={false}
              value={watch("username")}
              onSubmitEditing={() => onNext(nameRef)}
              returnKeyType="next"
              placeholder="Username"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("username", text);
              }}
            />
            <AuthInput
              blurOnSubmit={false}
              value={watch("name")}
              onSubmitEditing={() => onNext(githubUsernameRef)}
              innerRef={nameRef}
              returnKeyType="next"
              placeholder="Name"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("name", text);
              }}
            />
            <AuthInput
              blurOnSubmit={false}
              value={watch("email")}
              autoCapitalize="none"
              onSubmitEditing={() => onNext(emailRef)}
              innerRef={githubUsernameRef}
              returnKeyType="next"
              placeholder="Email"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("email", text);
              }}
            />
            <AuthInput
              blurOnSubmit={false}
              value={watch("githubUsername")}
              autoCapitalize="none"
              onSubmitEditing={() => onNext(locationRef)}
              innerRef={emailRef}
              returnKeyType="next"
              keyboardType="email-address"
              placeholder="Github Username"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("githubUsername", text);
              }}
            />
            <AuthInput
              blurOnSubmit={false}
              multiline={true}
              value={watch("location")}
              autoCapitalize="none"
              innerRef={locationRef}
              returnKeyType="done"
              keyboardType="email-address"
              placeholder="Location"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("location", text);
              }}
              lastOne={true}
              onSubmitEditing={handleSubmit(onSubmitValid)}
            />
          </ProfileEditForm>
        ) : null}
        {mode === "password" ? (
          <PasswordEditForm>
            <AuthInput
              blurOnSubmit={false}
              onSubmitEditing={() => onNext(newPasswordRef)}
              returnKeyType="next"
              autoCapitalize="none"
              secureTextEntry
              placeholder="Current Password"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("oldPassword", text);
              }}
            />
            <AuthInput
              blurOnSubmit={false}
              onSubmitEditing={() => onNext(confirmNewPasswordRef)}
              innerRef={newPasswordRef}
              returnKeyType="next"
              autoCapitalize="none"
              secureTextEntry
              placeholder="New Password"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("newPassword", text);
              }}
            />
            <AuthInput
              blurOnSubmit={false}
              innerRef={confirmNewPasswordRef}
              returnKeyType="done"
              autoCapitalize="none"
              secureTextEntry
              placeholder="Confirm New Password"
              onChangeText={(text: string) => {
                clearAllError();
                setValue("confirmNewPassword", text);
              }}
              lastOne={true}
              onSubmitEditing={handleSubmit(onSubmitValid)}
            />
          </PasswordEditForm>
        ) : null}
        {errors.errorMessage?.message ? (
          <ErrorContainer>
            <ErrorMessage>{errors.errorMessage?.message}</ErrorMessage>
          </ErrorContainer>
        ) : null}

        <Button
          $accent
          loading={loading}
          text="Edit Profile"
          disabled={
            mode === "profile"
              ? getValues("username") === "" ||
                !getValues("username") ||
                getValues("name") === "" ||
                !getValues("name") ||
                getValues("email") === "" ||
                !getValues("email") ||
                getValues("githubUsername") === "" ||
                !getValues("githubUsername") ||
                getValues("location") === "" ||
                !getValues("location")
              : mode === "password"
              ? getValues("oldPassword") === "" ||
                !getValues("oldPassword") ||
                getValues("newPassword") === "" ||
                !getValues("newPassword") ||
                getValues("confirmNewPassword") === "" ||
                !getValues("confirmNewPassword")
              : true
          }
          onPress={handleSubmit(onSubmitValid)}
        />
      </Wrapper>
    </Container>
  );
}
