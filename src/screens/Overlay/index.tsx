import { StyleSheet, View } from "react-native";
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

import Wallpaper1 from "../../assets/Wallpaper-1.jpg";
import Wallpaper2 from "../../assets/Wallpaper-2.jpg";
import Wallpaper3 from "../../assets/Wallpaper-3.jpg";
import Wallpaper4 from "../../assets/Wallpaper-4.jpg";

import * as Styled from "./styles";

export default function Overlay() {
  const { plants } = usePlants();
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Styled.Background>
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

  const rStyledOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationX.value,
        [
          (index - 1) * Device.width,
          index * Device.width,
          (index + 1) * Device.width,
        ],
        [0, 1, 0]
      ),
      transform: [
        {
          translateX: interpolate(
            translationX.value,
            [
              (index - 1) * Device.width,
              index * Device.width,
              (index + 1) * Device.width,
            ],
            [-Device.width, 0, 0]
          ),
        },
      ],
    };
  });

  const wallpapers = [
    Wallpaper1,
    Wallpaper2,
    Wallpaper3,
    Wallpaper4,
    Wallpaper3,
    Wallpaper1,
    Wallpaper2,
    Wallpaper3,
    Wallpaper4,
    Wallpaper1,
  ];

  return (
    <Styled.Container>
      <Styled.Poster
        source={wallpapers[index]}
        style={[StyleSheet.absoluteFillObject, rStyledOpacity]}
        blurRadius={8}
        resizeMode={"cover"}
        resizeMethod={"resize"}
      />
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
