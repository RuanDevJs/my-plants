import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";

export const Container = styled(Animated.View)`
  flex: 1;
  margin-top: 12px;
`;

export const Picture = styled(Animated.View)``;

export const Title = styled.Text`
  text-align: center;
  padding: 0px 0 16px;

  font-family: ${({ theme }) => theme.font.Nunito_600SemiBold};
  font-size: ${({ theme }) => theme.font_size.lg}px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Description = styled.Text`
  text-align: center;
  padding: 0 16px;

  font-family: ${({ theme }) => theme.font.Nunito_600SemiBold};
  font-size: ${({ theme }) => theme.font_size.md}px;
  color: ${({ theme }) => theme.colors.gray200};
`;

export const Environments = styled.View`
  flex-direction: row;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
`;
