import { useState } from "react"
import { StyleSheet, View, FlatList, Button } from "react-native"
import GoalItem from "./components/GoalItem"
import GoalInput from "./components/GolalInput"
import { StatusBar } from "expo-status-bar"

export default function App() {
  const [ModalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])
  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, { text: enteredGoalText, id: Math.random().toString() }])
    setModalIsVisible(false)
  }
  const deleteGoalHandler = (id) => {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }
  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title="Add New Goal" onPress={() => setModalIsVisible(true)} color="#5e0acc" />
      {ModalIsVisible && <GoalInput onAddGoal={addGoalHandler} visible={ModalIsVisible} onCancel={() => setModalIsVisible(false)} />}
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} alwaysBounceVertical={false} renderItem={({ item }) => <GoalItem text={item.text} onDeleteItem={deleteGoalHandler.bind(this, item.id)} />}/>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 4
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    color: "white"
  }
})
