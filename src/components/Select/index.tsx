import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import * as Styled from "./styles";

interface IProps extends TouchableOpacityProps {
  title: string;
  active?: boolean;
}

export default function Select({ active = false, title, ...props }: IProps) {
  return (
    <Styled.Container activeOpacity={0.42} active={active} {...props}>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Container>
  );
}
