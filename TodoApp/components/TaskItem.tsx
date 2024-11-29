
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function TaskItem({ task, onComplete, onDelete }: any) {
  return (
    <View style={styles.taskItem}>
      <ThemedText style={[styles.taskText, task.completed && styles.completedText]}>
        {task.text}
      </ThemedText>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => onComplete(task.id)}>
          <ThemedText style={styles.completeBtn}>✅</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <ThemedText style={styles.deleteBtn}>❌</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 3, // Android shadow
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // iOS shadow
  },
  taskText: { fontSize: 16 },
  completedText: { textDecorationLine: 'line-through', color: 'gray' },
  buttons: { flexDirection: 'row' },
  completeBtn: { marginRight: 15, color: 'green' },
  deleteBtn: { color: 'red' },
});