import * as React from "react";
import {
  Text,
  Box,
  Center,
  VStack,
  useColorModeValue,
  Fab,
  Icon,
} from "native-base";
import ThemeToggle from "../components/theme-toggle";
import AnimatedCheckbox from "../components/AnimatedCheckbox";
import { Pressable } from "react-native";
import { useCallback, useState } from "react";
import TaskItem from "../components/task-item";
import { AntDesign } from "@expo/vector-icons";
import shortid from "shortid";
import TaskList from "../components/task-list";
import AnimatedColorBox from "../components/animated-color-box";
import MastHead from "../components/masthead";
import NavBar from "../components/navbar";

const initialData = [
  {
    id: shortid.generate(),
    subject: "Buy movie tickets for Friday",
    done: false,
  },
  {
    id: shortid.generate(),
    subject: "Make a React Native tutorial",
    done: false,
  },
];
export default function MainScreen() {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleToggleTaskItem = useCallback((item) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject,
      };
      return newData;
    });
  }, []);

  const handleFinishEditingTaskItem = useCallback((_item) => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item) => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveItem = useCallback((item) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => i !== item);
      return newData;
    });
  }, []);

  return (
    <AnimatedColorBox
      bg={useColorModeValue("warmGray.50", "primary.900")}
      w="full"
      flex={1}
    >
      <MastHead
        title="What's up Yash!"
        image={require("../assets/masthead.png")}
      >
        <NavBar />
      </MastHead>
      <VStack
        flex={1}
        space={1}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishedEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        onPress={() => {
          const id = shortid.generate();
          setData([
            {
              id,
              subject: "",
              done: false,
            },
            ...data,
          ]);
          setEditingItemId(id);
        }}
      />
    </AnimatedColorBox>
  );
}
