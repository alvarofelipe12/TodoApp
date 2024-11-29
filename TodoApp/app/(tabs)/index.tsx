import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

import { TaskItem } from '@/components/TaskItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';
import { useFonts } from '@expo-google-fonts/inter';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([] as { id: number, text: string, completed: boolean }[]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() === '') {
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
    setTaskText('');
  };

  const completeTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  let [fontsLoaded] = useFonts({ Roboto_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <ThemedText style={styles.header}>To-Do List <HelloWave></HelloWave></ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter a task..."
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ index, item, separators }) => (
          <TaskItem task={item} onComplete={completeTask} onDelete={deleteTask} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, fontFamily: 'Roboto_400Regular' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, color: '#ccc' },
});
