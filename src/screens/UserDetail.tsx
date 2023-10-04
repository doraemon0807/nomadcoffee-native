import styled from "styled-components/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import ScreenLayout from "../components/shared/ScreenLayout";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import useUser from "../hook/useUser";
import { IThemeProps } from "../../styles";
import Avatar from "../components/shared/Avatar";
import { logUserOut } from "../../apollo";
import Button from "../components/shared/Button";

type Props = NativeStackScreenProps<SharedStackParamList, "UserDetail">;

interface IPropsWithMe extends Props {
  isMe?: boolean;
}

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const ProfileContainer = styled.View`
  padding: 15px;
`;

const ProfileHeader = styled.View`
  flex-direction: row;
  height: 100px;
`;

const ProfileAvatar = styled.View`
  margin-right: 18px;
  justify-content: center;
  align-items: center;
  padding: 6px;
`;

const ProfileBody = styled.View``;

const ProfileInfoHeader = styled.View`
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ProfileUsername = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  color: ${(props: IThemeProps) => props.theme.fontColor};
`;
const ProfileActions = styled.View`
  flex-direction: row;
`;

const ProfileAction = styled.View`
  width: 100px;
  margin-right: 8px;
`;

const ProfileDetail = styled.View`
  margin-top: 10px;
`;

const DataBox = styled.View`
  margin-bottom: 14px;
`;
const DataTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 6px;
  margin-bottom: 4px;
  color: ${(props: IThemeProps) => props.theme.fontColor};
`;
const DataInfo = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
`;

const SEE_PROFILE_QUERY = graphql(`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ...UserFragment
      name
      location
      githubUsername
    }
  }
`);

export default function UserDetail({ navigation, route, isMe }: IPropsWithMe) {
  const { data: userData } = useUser();

  const username = isMe
    ? userData?.me.profile?.username
    : route?.params?.username;

  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: username!,
    },
  });

  const handleEditProfile = () => {
    if (userData && userData.me.profile) {
      navigation.navigate("EditProfile", {
        userId: userData.me.profile.id!,
        username: userData.me.profile.username!,
        email: userData.me.profile.email!,
        name: userData.me.profile.name!,
        location: userData.me.profile.location!,
        githubUsername: userData.me.profile.githubUsername!,
      });
    }
  };

  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params?.username,
      });
    }
  }, [route]);

  return (
    <ScreenLayout loading={loading}>
      <Container>
        <ProfileContainer>
          <ProfileHeader>
            <ProfileAvatar>
              <Avatar avatarUrl={data?.seeProfile?.avatarURL} size="large" />
            </ProfileAvatar>
            <ProfileBody>
              <ProfileInfoHeader>
                <ProfileUsername>{data?.seeProfile?.username}</ProfileUsername>
                {data?.seeProfile?.isMe ? (
                  <ProfileActions>
                    <ProfileAction>
                      <Button text="Edit Profile" onPress={handleEditProfile} />
                    </ProfileAction>
                    <ProfileAction>
                      <Button text="Log Out" onPress={() => logUserOut()} />
                    </ProfileAction>
                  </ProfileActions>
                ) : null}
              </ProfileInfoHeader>
            </ProfileBody>
          </ProfileHeader>
          <ProfileDetail>
            {data?.seeProfile?.name && (
              <DataBox>
                <DataTitle>Name</DataTitle>
                <DataInfo>{data?.seeProfile?.name}</DataInfo>
              </DataBox>
            )}
            {data?.seeProfile?.location && (
              <DataBox>
                <DataTitle>Location</DataTitle>
                <DataInfo>{data?.seeProfile?.location}</DataInfo>
              </DataBox>
            )}
            {data?.seeProfile?.githubUsername && (
              <DataBox>
                <DataTitle>GitHub</DataTitle>
                <DataInfo>{data.seeProfile.githubUsername}</DataInfo>
              </DataBox>
            )}
          </ProfileDetail>
        </ProfileContainer>
      </Container>
    </ScreenLayout>
  );
}
