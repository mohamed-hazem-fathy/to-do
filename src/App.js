import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { TodosContext } from "./context/todosContext";
import { TostProvider } from "./context/Toast";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});
let initialTodos = [
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
];
function App() {
  const [todos, setTodos] = useState(initialTodos);



  return (
    <ThemeProvider theme={theme}>
      <TostProvider>
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
      </TostProvider>
    </ThemeProvider>
  );
}

export default App;
