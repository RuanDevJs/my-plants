import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import Picture from "../../assets/Carlo-Acutis.jpeg";

import * as Styled from "./styles";

interface IProps {
  showProfilePicture?: boolean;
}

export default function Header({ showProfilePicture }: IProps) {
  return (
    <Styled.Container>
      <TouchableOpacity activeOpacity={0.72}>
        <Feather name="menu" size={32} color="rgba(17, 17, 17, 0.8)" />
      </TouchableOpacity>
      {!showProfilePicture ? (
        <TouchableOpacity activeOpacity={0.72}>
          <Feather name="search" size={32} color="rgba(17, 17, 17, 0.8)" />
        </TouchableOpacity>
      ) : (
        <Styled.Profile>
          <Styled.Picture source={Picture} />
        </Styled.Profile>
      )}
    </Styled.Container>
  );
}
