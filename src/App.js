import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { TodosContext } from "./context/todosContext";
import { v4 as uuidv4 } from "uuid";
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette:{
    primary: {
      main: "#dd2c00"
    }
  }
});
function App() {
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      title: "مهمة 1",
      details: "تفاصيل المهمة 1",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "مهمة 2",
      details: "تفاصيل المهمة 2",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "مهمة 3",
      details: "تفاصيل المهمة 3",
      isCompleted: false,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          direction: "rtl",
          background: "#191b1f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
