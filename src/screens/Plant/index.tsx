import { useRoute } from "@react-navigation/native";

import Header from "../../components/Header";
import Select from "../../components/Select";

import { SvgUri } from "react-native-svg";
import Device from "../../helpers/device";

import {
  Keyframe,
  useAnimatedStyle,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import * as Styled from "./styles";
import { useState } from "react";

type TypeEnvironmentsKeys =
  | "all"
  | "living_room"
  | "bedroom"
  | "kitchen"
  | "bathroom";

interface useRouteParams {
  id: number;
  name: string;
  about: string;
  photo: string;
  environments: TypeEnvironmentsKeys[];
  frequency: {
    times: number;
    repeat_every: "day" | "week";
  };
}

export default function Plant() {
  const [show, setShow] = useState(false);
  const data = useRoute().params as useRouteParams;

  const enteringAnimation = new Keyframe({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  }).duration(700);

  return (
    <Styled.Container entering={enteringAnimation}>
      <Header showProfilePicture />
      <Styled.Picture>
        <SvgUri
          uri={data.photo}
          width={Device.width}
          height={Device.height * 0.42}
        />
      </Styled.Picture>
      <Styled.Environments>
        {data.environments.map((environment, index) => {
          return (
            <Select
              title={environment
                .replace("_", " ")
                .replace(environment[0], environment[0].toLocaleUpperCase())}
              active
              key={index}
            />
          );
        })}
      </Styled.Environments>
      <Styled.Title>{data.name}</Styled.Title>
      <Styled.Description>{data.about}</Styled.Description>
    </Styled.Container>
  );
}
