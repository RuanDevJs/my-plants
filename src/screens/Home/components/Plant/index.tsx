import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import * as Styled from "./styles";
import { useTheme } from "styled-components/native";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

type TypeEnvironmentsKeys =
  | "all"
  | "living_room"
  | "bedroom"
  | "kitchen"
  | "bathroom";

interface Props {
  data: {
    id: number;
    name: string;
    about: string;
    photo: string;
    environments: TypeEnvironmentsKeys[];
    frequency: {
      times: number;
      repeat_every: "day" | "week";
    };
  };
}

export default function Plant({ data }: Props) {
  const theme = useTheme();

  const navigate = useNavigation();

  function handleNavigate() {
    navigate.navigate("Plant", data);
  }

  return (
    <Styled.Background>
      <Styled.Container activeOpacity={0.42} onPress={handleNavigate}>
        <Styled.Picture>
          <SvgUri uri={data.photo} width={180} height={100} />
        </Styled.Picture>
        <Styled.Title>{data.name}</Styled.Title>
        <Styled.Description>
          <Styled.Tag>Indoor Plants</Styled.Tag>
          <Styled.Tag
            style={{ fontFamily: theme.font.Nunito_400Regular, marginLeft: 8 }}
          >
            30% off
          </Styled.Tag>
        </Styled.Description>
      </Styled.Container>
    </Styled.Background>
  );
}
