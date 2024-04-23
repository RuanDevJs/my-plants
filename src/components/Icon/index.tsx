import { Feather } from "@expo/vector-icons";
import * as Styled from "./styles";

interface IProps {
  name: keyof typeof Feather.glyphMap;
  color: string;
  focused: boolean;
}

export default function Icon({ name, color }: IProps) {
  return <Feather name={name} size={24} color={color} />;
}
