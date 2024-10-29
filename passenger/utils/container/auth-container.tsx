import {View, Text, Image, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
  import React, { ReactNode } from "react";
  import { external } from "@/styles/external.style";
  import Images from "../images";
  import { windowHeight, windowWidth } from "@/themes/app.constant";
  import styles from "./style";


  type Props = {
    container: ReactNode;
    topSpace: any;
    imageShow: boolean;
  };

  const AuthContainer = ({ container, topSpace, imageShow }: Props) => {
    return (
      <KeyboardAvoidingView
        style={[external.fx_1]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
     
        <Image
          style={[styles.backgroundImage]}
          source={Images.loginbg}
        />
  
        <View style={styles.contentContainer}>
          <View style={[styles.container]}>
            <ScrollView>{container}</ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default AuthContainer;