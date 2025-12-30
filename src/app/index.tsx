import { View, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import { commonStyles } from "@/styles/commonStyles";
import { splashStyles } from "@/styles/splashStyles";
import { useFonts } from "expo-font";
import { tokenStorage } from "@/service/storage";
import { resetAndNavigate } from "@/utils/Helpers";
import { jwtDecode } from "jwt-decode";
import { refresh_tokens } from "@/service/api/apiInterceptors";

interface DecodedToken {
  exp: number;
}

const Page = () => {
  const [loaded] = useFonts({
    Bold: require("@/assets/fonts/Poppins-Bold.ttf"),
    Medium: require("@/assets/fonts/Poppins-Medium.ttf"),
    Regular: require("@/assets/fonts/Poppins-Regular.ttf"),
    SemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    Light: require("@/assets/fonts/Poppins-Light.ttf"),
  });

  const tokenCheck = async () => {
    try {
      const accessToken = tokenStorage.getString("accessToken");
      const refreshToken = tokenStorage.getString("refreshToken");

      if (!accessToken || !refreshToken) {
        resetAndNavigate("/auth");
        return;
      }

      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedAccessToken.exp < currentTime) {
        const newToken = await refresh_tokens();
        if (newToken) {
          resetAndNavigate("/home");
        } else {
          resetAndNavigate("/auth");
        }
      } else {
        resetAndNavigate("/home");
      }
    } catch (error) {
      console.log("Token check error:", error);
      resetAndNavigate("/auth");
    }
  };

  useEffect(() => {
    if (loaded) {
      const timeoutId = setTimeout(tokenCheck, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [loaded]);

  return (
    <View style={commonStyles.container}>
      <Image
        style={splashStyles.img}
        source={require("@/assets/images/logo_t.png")}
      />
    </View>
  );
};

export default Page;
