import styled, { css } from "styled-components/native";
import Device from "../../helpers/device";

interface IProps {
  active: boolean;
}

export const Container = styled.TouchableOpacity<IProps>`
  width: auto;
  height: auto;

  align-items: center;
  justify-content: center;

  padding: 8px 12px;
  border-radius: 50px;

  margin-top: 10px;
  margin-right: 12px;

  ${({ theme, active }) => css`
    background-color: ${active ? theme.colors.green : theme.colors.gray100};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.x_sm}px;
    font-family: ${theme.font.Nunito_700Bold};
    color: ${theme.colors.white};
  `}
`;
