import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TaskItem = ({task, onComplete, onDelete}) => {
  return (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, task.completed && styles.completedText]}>
        {task.text}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => onComplete(task.id)}>
          <Text style={styles.completeBtn}>✅</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.deleteBtn}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10},
  taskText: {fontSize: 16},
  completedText: {textDecorationLine: 'line-through',  color: 'gray'},
  buttons: {flexDirection: 'row'},
  completeBtn: {marginRight: 15, color: 'green'},
  deleteBtn: {color: 'red'},
});

export default TaskItem;
