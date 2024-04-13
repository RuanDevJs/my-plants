import styled from "styled-components/native";
import Device from "../../helpers/device";

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  height: ${Device.height * 0.15}px;
  padding: 25px;
`;

export const Profile = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const Picture = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;
