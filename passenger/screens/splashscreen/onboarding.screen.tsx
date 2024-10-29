import { View, Text , Image, ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import color from '@/themes/app.colors'
import Swiper from "react-native-swiper"; 
import Images from '@/utils/images'
import {styles} from "./styles"
import { slides } from '@/configs/constants';

import { router } from "expo-router";
import { BackArrow } from "@/utils/icons";

export default function OnboardingScreen() {
  return (
    <View style={{flex:1, backgroundColor:color.whiteColor}}>
      <Swiper 
      activeDotStyle={styles.activeStyle}
      removeClippedSubviews={true}
      paginationStyle={styles.paginationStyle}
      >
           {slides.map((slide:any, index:number) => (
            <View style={[styles.slideContainer]} key={slide.id}>
                 <Image style={styles.imageBackground} source={slide.image} />
                 <View style={[styles.imageBgView]}>
              <ImageBackground
                resizeMode="stretch"
                style={styles.img}
                source={Images.bgOnboarding}
              >
                <Text style={styles.title}>{slide.text}</Text>
                <Text style={styles.description}>{slide.description}</Text>
                {/* Render the back button only on the last slide */}
                {index === slides.length - 1 && (
                  <TouchableOpacity
                    style={styles.backArrow}
                    onPress={() => router.push("/(routes)/login")}
                    accessibilityLabel="Go back to login"
                    accessibilityRole="button"
                  >
                    <BackArrow colors={color.whiteColor} width={40} height={40} />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            </View>
            </View>
           ))}   
      </Swiper>
    </View>
  )
}