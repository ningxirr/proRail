import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const initialData = [
    {
        key: '1',
        label: 'first',
        height: '50',
        width: '50',
        backgroundColor: 'yellow'
    },
    {
        key: '2',
        label: 'second',
        height: '50',
        width: '50',
        backgroundColor: 'blue'
    }
]

export default function App() {
  const [data, setData] = useState(initialData);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={{ backgroundColor: isActive ? "red" : item.backgroundColor }}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});