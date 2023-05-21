import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import uniqueId from "lodash.uniqueid";

interface Todo {
  uid: string;
  label: string;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 60,
  },
  text: {
    color: "#000",
  },
  iconText: {
    fontSize: 26,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    height: 40,
  },
  listItem: {
    padding: 10,
  },
  noLeftBorderRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  noRightBorderRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  divider: {
    height: 0,
    borderBottomWidth: 1,
    borderColor: "#00000040",
    marginVertical: 10,
  },
});

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const add = useCallback(
    (value: string) =>
      setTodos((prevTodos) => [
        ...prevTodos,
        { uid: uniqueId(), label: value },
      ]),
    [setTodos]
  );

  const remove = useCallback(
    (uid: Todo["uid"]) =>
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.uid !== uid)),
    [setTodos]
  );

  return {
    todos,
    add,
    remove,
  };
};

const PageView = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.mainContainer}>{children}</View>
);

const AddText = ({ onAdd }: { onAdd?: (value: string) => void }) => {
  const [inputText, setInputText] = useState("");

  const onPressAddButton = () => {
    onAdd?.(inputText);
    setInputText("");
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        value={inputText}
        onChange={(e) => setInputText(e.nativeEvent.text)}
        style={[styles.input, styles.noRightBorderRadius, { flex: 85 }]}
      />

      <Pressable
        style={[styles.button, styles.noLeftBorderRadius, { flex: 15 }]}
        onPress={onPressAddButton}
      >
        <Text style={[styles.text, styles.iconText, { color: "#fff" }]}>+</Text>
      </Pressable>
    </View>
  );
};

const TodoItem = ({
  label,
  onPressRemove,
}: {
  label: string;
  onPressRemove?: () => void;
}) => (
  <>
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.listItem, { flex: 85, marginRight: 10 }]}>
        <Text style={styles.text}>{label}</Text>
      </View>

      <Pressable style={[styles.button, { flex: 15 }]} onPress={onPressRemove}>
        <Text
          style={[
            styles.text,
            styles.iconText,
            { color: "#fff", lineHeight: 26 },
          ]}
        >
          x
        </Text>
      </Pressable>
    </View>

    <View style={styles.divider} />
  </>
);

export default function App() {
  const { todos, add: addTodo, remove: removeTodo } = useTodos();

  console.log(todos);

  return (
    <PageView>
      <AddText onAdd={addTodo} />

      <ScrollView style={{ marginTop: 40, width: "100%" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.uid}
            label={todo.label}
            onPressRemove={() => removeTodo(todo.uid)}
          />
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </PageView>
  );
}
