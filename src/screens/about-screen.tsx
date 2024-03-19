import React from "react";
import {
  ScrollView,
  Icon,
  Image,
  useColorModeValue,
  Box,
  Text,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import NavBar from "../components/navbar";
import MastHead from "../components/masthead";
import AnimatedColorBox from "../components/animated-color-box";
import LinkButton from "../components/link-button";

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.50", "warmGray.900")}
      w="full"
    >
      <MastHead
        title="About this app"
        image={require("../assets/about-dev.png")}
      >
        <NavBar />
      </MastHead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require("../assets/zoro.jpg")}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"
            />
          </Box>
          <Text fontSize="md" w="full">
            Hello guys! This is an Animated Todo app built with React Native.
          </Text>
          <LinkButton
            colorScheme="red"
            size="lg"
            borderRadius="full"
            href="https://www.github.com"
            leftIcon={
              <Icon as={Feather} name="github" size="sm" opacity={0.5} />
            }
          >
            Go to GitHub page
          </LinkButton>
          <LinkButton
            colorScheme={useColorModeValue("blue", "darkBlue")}
            size="lg"
            borderRadius="full"
            href="https://www.twitter.com"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }
          >
            Go to Twitter account
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  );
};

export default AboutScreen;
