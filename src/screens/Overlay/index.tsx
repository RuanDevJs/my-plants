import { StyleSheet } from "react-native";
import { IPlants, usePlants } from "../../context/PlantsContext";

import { SvgUri } from "react-native-svg";
import Device from "../../helpers/device";

import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import * as Styled from "./styles";
import { useState } from "react";

export default function Overlay() {
  const { plants } = usePlants();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Styled.Background>
      <Styled.Poster
        source={{
          uri: "https://img.freepik.com/fotos-gratis/fundo-de-folhas-verdes-tropicais_53876-88891.jpg?w=740&t=st=1713364414~exp=1713365014~hmac=80ace59f30958a63c12fc24a2fcdd8d1fb9b46b7e35fe0aee9564f001c787ab2",
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={5}
      />
      <Animated.FlatList
        data={plants}
        keyExtractor={(item) => `$plant=${item.id}`}
        renderItem={({ item, index }) => (
          <Plant data={item} index={index} translationX={translateX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        onScroll={scrollHandler}
      />
    </Styled.Background>
  );
}

interface IPlantProps {
  translationX: SharedValue<number>;
  index: number;
  data: IPlants;
}

function Plant({ data, index, translationX }: IPlantProps) {
  const INPUT_RANGE = [
    (index - 1) * Device.width,
    index * Device.width,
    (index + 1) * Device.width,
  ];

  const rStyledPicture = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(translationX.value, INPUT_RANGE, [-100, 0, -100])
          ),
        },
        {
          translateX: withSpring(
            interpolate(translationX.value, INPUT_RANGE, [-10, 0, 10])
          ),
        },
      ],
      opacity: interpolate(translationX.value, INPUT_RANGE, [0, 1, 0.5]),
    };
  });

  return (
    <Styled.Container>
      <Styled.Picture style={rStyledPicture}>
        <SvgUri
          uri={data.photo}
          width={Device.width * 0.72}
          height={Device.height * 0.5}
        />
      </Styled.Picture>

      <Styled.Title>{data.name}</Styled.Title>
      <Styled.Description>
        <Styled.Tag>{data.about}</Styled.Tag>
      </Styled.Description>
    </Styled.Container>
  );
}
