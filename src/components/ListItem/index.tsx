import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from "react-native"
import { TaskProps } from "../../types/task";

interface ListItemProps {
  data: TaskProps;
  handleLeft: () => void;
  handleRight: () => void;
}

interface InterpolateProps { 
  interpolate: (arg0: { 
    inputRange: number[],
    outputRange: number[], 
    extrapolate: string,
  }) => any; 
}

interface RightActionsProps {
  progress: any;
  dragX: any;
  press: () => void;
}

export const ListItem = ({ data, handleLeft, handleRight }: ListItemProps) => {
  function LeftActions(progress: any, dragX: InterpolateProps) {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp"
    })

    return(
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { 
          transform: [{ scale }] 
        }]}>
          Concluir
        </Animated.Text>
      </View>
    )
  }

  function RightActions({progress, dragX, press}: RightActionsProps) {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp"
    })

    return(
      <View style={styles.rightAction}>
        <TouchableOpacity onPress={press}>
          <Animated.Text style={[styles.actionText, { 
            transform: [{ scale }] 
          }]}>
            Excluir
          </Animated.Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={LeftActions}
        onSwipeableOpen={handleLeft}
        renderRightActions={(progress, dragX) => (
          <RightActions 
            progress={progress} 
            dragX={dragX} 
            press={handleRight} 
          />
        )}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{data.task}</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  text: {
    fontSize: 17,
    color: "#222"
  },
  leftAction: {
    backgroundColor: "#388e3c",
    justifyContent: "center",
    flex: 1
  },
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center"  
  },
  actionText: {
    color: "#fff",
    padding: 20,
    fontSize: 17
  }
})