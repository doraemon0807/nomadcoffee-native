import React, { RefObject, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageProps,
  TextInputProps,
} from "react-native";
import { UploadNavTabParamList } from "../navigators/UploadNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { IThemeProps } from "../../styles";
import DismissKeyboard from "../components/shared/DismissKeyboard";
import { SubmitHandler, useForm } from "react-hook-form";
import HeaderButton from "../components/header/HeaderButton";
import { ApolloCache, useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ReactNativeFile } from "apollo-upload-client";
import { CoffeeShop, CreateCoffeeShopMutation } from "../gql/graphql";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";

type Props = NativeStackScreenProps<UploadNavTabParamList, "UploadForm">;

const Container = styled.View`
  flex: 1;
  background-color: ${(props: IThemeProps) => props.theme.bgColor};
  padding: 0px 50px;
`;
const PhotoImage: React.FC<ImageProps> = styled.Image`
  flex: 1;
`;

const FormContainer = styled.ScrollView`
  flex: 1;
`;

interface IUploadForm {
  name: string;
  description: string;
  longitude: string;
  latitude: string;
  category: string;
  errorMessage: string;
}

interface IUpdateUploadCoffeeShopProps {
  data?: CreateCoffeeShopMutation | null;
}

const CREATE_COFFEESHOP_MUTATION = graphql(`
  mutation createCoffeeShop(
    $name: String!
    $file: [Upload!]!
    $category: String
    $longitude: String
    $latitude: String
    $description: String
  ) {
    createCoffeeShop(
      name: $name
      files: $file
      category: $category
      longitude: $longitude
      latitude: $latitude
      description: $description
    ) {
      ok
      error
      shop {
        ...ShopFragment
        photos {
          ...PhotoFragment
        }
        user {
          ...UserFragment
        }
        categories {
          ...CategoryFragment
        }
      }
    }
  }
`);

export default function UploadForm({ route, navigation }: Props) {
  // --- mutation --- //

  // Modify cache: add new photo to the feed
  const updateUploadCoffeeShop = (
    cache: ApolloCache<CoffeeShop>,
    result: IUpdateUploadCoffeeShopProps
  ) => {
    if (!result.data) {
      return;
    }
    const {
      data: { createCoffeeShop },
    } = result;
    if (createCoffeeShop.ok) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return [createCoffeeShop, ...prev];
          },
        },
      });
    }
  };

  // mutation function
  const [createCoffeeShopMutation, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      update: updateUploadCoffeeShop,
    }
  );

  // useForm for caption
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IUploadForm>();

  useEffect(() => {
    register("name", {
      required: true,
    });
    register("description", {
      required: true,
    });
    register("longitude");
    register("latitude");
    register("category");
  }, [register]);

  const descriptionRef: React.MutableRefObject<null> = useRef(null);
  const longitudeRef: React.MutableRefObject<null> = useRef(null);
  const latitudeRef: React.MutableRefObject<null> = useRef(null);
  const categoryRef: React.MutableRefObject<null> = useRef(null);

  //Jump to next input after input
  const onNext = (nextRef: RefObject<HTMLInputElement>): void => {
    nextRef?.current?.focus();
  };

  const onSubmitValid: SubmitHandler<IUploadForm> = async ({
    description,
    longitude,
    latitude,
    name,
    category,
  }) => {
    if (route.params?.file) {
      const file = new ReactNativeFile({
        uri: route.params.file,
        name: `1.jpg`,
        type: "image/jpeg",
      });
      await createCoffeeShopMutation({
        variables: {
          description,
          longitude,
          latitude,
          name,
          category,
          file,
        },
      });
      navigation.navigate("Tabs");
    } else {
      Alert.alert("An error occurred. Please try again.", "", [
        {
          text: "Ok",
          onPress: () => {
            navigation.navigate("SelectPhoto");
          },
        },
      ]);
    }
  };

  const clearAllErrors = () => {
    clearErrors();
  };

  // navigation bar buttons config for loading
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? headerLoading : headerRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const headerRight = () => (
    <HeaderButton
      buttonName="Next"
      buttonFunction={handleSubmit(onSubmitValid)}
    />
  );

  const headerLoading = () => (
    <ActivityIndicator style={{ marginRight: 10 }} size="small" color="white" />
  );
  return (
    <DismissKeyboard>
      <Container>
        <PhotoImage
          resizeMode="contain"
          source={{ uri: route?.params?.file }}
        />
        <AuthLayout hideLogo errorMessage={errors.errorMessage?.message}>
          <AuthInput
            blurOnSubmit={false}
            onSubmitEditing={() => onNext(descriptionRef)}
            returnKeyType="next"
            placeholder="Shop Name"
            onChangeText={(text: string) => {
              clearAllErrors();
              setValue("name", text);
            }}
          />
          <AuthInput
            blurOnSubmit={false}
            autoCapitalize={"none"}
            onSubmitEditing={() => onNext(longitudeRef)}
            innerRef={descriptionRef}
            returnKeyType="next"
            placeholder="Description"
            onChangeText={(text: string) => {
              clearAllErrors();
              setValue("description", text);
            }}
          />
          <AuthInput
            blurOnSubmit={false}
            autoCapitalize={"none"}
            onSubmitEditing={() => onNext(latitudeRef)}
            innerRef={longitudeRef}
            returnKeyType="next"
            placeholder="Longitude"
            onChangeText={(text: string) => {
              clearAllErrors();
              setValue("longitude", text);
            }}
          />
          <AuthInput
            blurOnSubmit={false}
            autoCapitalize={"none"}
            onSubmitEditing={() => onNext(categoryRef)}
            innerRef={latitudeRef}
            returnKeyType="next"
            placeholder="Latitude"
            onChangeText={(text: string) => {
              clearAllErrors();
              setValue("latitude", text);
            }}
          />
          <AuthInput
            onSubmitEditing={handleSubmit(onSubmitValid)}
            autoCapitalize={"none"}
            innerRef={categoryRef}
            returnKeyType="done"
            placeholder="Categories"
            onChangeText={(text: string) => {
              clearAllErrors();
              setValue("category", text);
            }}
            lastOne={true}
          />
        </AuthLayout>
      </Container>
    </DismissKeyboard>
  );
}
