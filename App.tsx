import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { ListItem } from './src/components/ListItem';
import { TaskProps } from './src/types/task';
import { Separator } from './src/components/Separator';

export default function App() {
  const tasks: TaskProps[] = [
    { id: "1", task: "Doritos" },
    { id: "2", task: "Cebolitos" },
    { id: "3", task: "Calabreso" },
    { id: "4", task: "Queijo Mussarela" },
    { id: "5", task: "Presunto Defumado" },
  ]

  return (
    <View style={styles.container}>
      <StatusBar />
      <FlatList 
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem 
            data={item}
            handleLeft={() => alert('Tarefa concluída com sucesso!')}
            handleRight={() => alert('Tarefa foi Excluída!')}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});
