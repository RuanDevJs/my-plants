import { Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface IDevice {
  width: number;
  height: number;
  plataform: {
    os: "ios" | "android";
    behavior: "padding" | "height";
  };
}

const Device: IDevice = {
  width,
  height,
  plataform: {
    behavior: Platform.OS === "ios" ? "padding" : "height",
    os: Platform.OS === "ios" ? "ios" : "android",
  },
};

export default Device;
