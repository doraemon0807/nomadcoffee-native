import React, { useEffect } from "react";
import UserDetail from "./UserDetail";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import useUser from "../hook/useUser";

type Props = NativeStackScreenProps<SharedStackParamList, "Profile">;

export default function Profile({ navigation }: Props) {
  const userDetailNavigation: NativeStackNavigationProp<
    SharedStackParamList,
    "UserDetail",
    undefined
  > = useNavigation();
  const userDetailRoute: RouteProp<SharedStackParamList, "UserDetail"> =
    useRoute();

  const { data } = useUser();

  useEffect(() => {
    navigation.setOptions({
      title: data?.me.profile?.username,
    });
  }, []);

  return (
    <UserDetail
      navigation={userDetailNavigation}
      route={userDetailRoute}
      isMe={true}
    />
  );
}
