import styled, { css } from "styled-components/native";
import Device from "../../../../helpers/device";

import { SvgUri } from "react-native-svg";

export const Background = styled.View`
  flex: 1;
  margin: 12px 8px;
`;

export const Container = styled.TouchableOpacity``;

export const Picture = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font.Nunito_700Bold};
    font-size: ${theme.font_size.md}px;

    color: ${theme.colors.dark};

    text-align: center;
  `}
`;

export const Description = styled.View`
  width: 100%;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  text-align: center;
  margin-top: 4px;
`;

export const Tag = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font.Nunito_200ExtraLight};
    font-size: ${theme.font_size.sm}px;
    color: ${theme.colors.gray200};
  `}
`;
