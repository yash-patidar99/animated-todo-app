import React, { useCallback, useRef } from "react";
import { AnimatePresence, View } from "moti";
import { PanGestureHandlerProps } from "react-native-gesture-handler";
import TaskItem from "./task-item";
import { makeStyledComponent } from "../utils/styled";
import { ScrollView } from "react-native-gesture-handler";

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

interface TaskItemData {
  id: string;
  subject: string;
  done: boolean;
}

interface TaskListProps {
  data: Array<TaskItemData>;
  editingItemId: String | null;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, newSubject: string) => void;
  onFinishedEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemoveItem: (item: TaskItemData) => void;
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  data: TaskItemData;
  isEditing: boolean;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, newSubject: string) => void;
  onFinishedEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemove: (item: TaskItemData) => void;
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    simultaneousHandlers,
    onPressLabel,
    isEditing,
    data,
    onToggleItem,
    onChangeSubject,
    onFinishedEditing,
    onRemove,
  } = props;
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback(
    (subject) => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject],
  );

  const handleFinishEditing = useCallback(() => {
    onFinishedEditing(data);
  }, [data, onFinishedEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  return (
    <StyledView
      width="full"
      from={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
      animate={{ opacity: 1, scale: 1, marginBottom: 0 }}
      exit={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onRemove={handleRemove}
        onPressLabel={handlePressLabel}
        onFinishEditing={handleFinishEditing}
        onChangeSubject={handleChangeSubject}
      />
    </StyledView>
  );
};

export default function TaskList(props: TaskListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishedEditing,
    onPressLabel,
    onRemoveItem,
  } = props;

  const refScrollView = useRef(null);

  return (
    <StyledScrollView w="full" ref={refScrollView}>
      <AnimatePresence>
        {data.map((item) => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishedEditing={onFinishedEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  );
}
