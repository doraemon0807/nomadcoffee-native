import styled from "styled-components/native";
import { IThemeProps } from "../../../styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedStackParamList } from "../../navigators/SharedStackNav";
import { useNavigation } from "@react-navigation/native";

type ICategoryItemProps = {
  category: {
    __typename?: "Category" | undefined;
    id: number;
    name: string;
    slug: string;
  } | null;
};

const Category = styled.TouchableOpacity`
  padding: 6px;
  border-radius: 100px;
  background-color: ${(props: IThemeProps) => props.theme.grayLight};
`;

const CategoryText = styled.Text`
  color: ${(props: IThemeProps) => props.theme.fontColor};
  margin-left: 5px;
  flex-shrink: 1;
`;

export default function CategoryItem({ category }: ICategoryItemProps) {
  const navigation: NativeStackNavigationProp<
    SharedStackParamList,
    "Search",
    undefined
  > = useNavigation();

  return (
    <Category
      onPress={() =>
        navigation.navigate("CategoryResult", {
          categoryId: category?.id!,
          categoryName: category?.name!,
        })
      }
    >
      <CategoryText>{category?.name}</CategoryText>
    </Category>
  );
}
