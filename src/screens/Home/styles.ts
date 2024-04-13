import styled, { css } from "styled-components/native";
import Device from "../../helpers/device";

export const Container = styled.View`
  flex: 1;
  padding: 15px 15px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${({ theme }) => theme.font_size.lg}px;
    font-family: ${({ theme }) => theme.font.Nunito_700Bold};
    color: ${({ theme }) => theme.colors.black};
  `}
`;

export const Environments = styled.View``;

export const Plants = styled.View`
  flex: 1;
  margin-top: 24px;
`;
