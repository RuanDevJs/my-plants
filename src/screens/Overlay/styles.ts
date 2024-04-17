import styled, { css } from "styled-components/native";
import Device from "../../helpers/device";
import Animated from "react-native-reanimated";

export const Background = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;

  height: ${Device.height}px;
`;

export const Container = styled.View`
  width: ${Device.width}px;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

export const Poster = styled(Animated.Image)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Picture = styled(Animated.View)``;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font.Nunito_700Bold};
    font-size: ${theme.font_size.lg}px;

    color: ${theme.colors.white};
    text-align: center;

    padding: 16px 0;
  `}
`;

export const Description = styled.View`
  width: 80%;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 0 16px;
`;

export const Tag = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font.Nunito_200ExtraLight};
    font-size: ${theme.font_size.md}px;
    color: ${theme.colors.gray200};

    text-align: center;
  `}
`;
