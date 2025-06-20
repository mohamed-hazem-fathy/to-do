import * as React from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { TodosContext } from "../context/todosContext";
import { useContext, useEffect, useMemo } from "react";
import { TostContext } from "../context/Toast";
import { v4 as uuidv4 } from "uuid";

//Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

//Components
import Todo from "./Todo";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(TostContext);
  const [inputValue, setInputValue] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [showDeletDialg, setShowDeletDialg] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);

  //filteration arrays
  const notCompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      // console.log("calling not completed")
      return !todo.isCompleted;
    });
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);
  function handelChange(e) {
    setInputValue(e.target.value);

    e.target.value = "";
  }
  function addToDo() {
    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      details: "تفاصيل المهمة الجديدة",
      isCompleted: false,
    };
    if (inputValue === "") {
      alert("الرجاء إدخال عنوان المهمة");
    } else {
      const updateTodos = [...todos, newTodo];
      setTodos(updateTodos);
      localStorage.setItem("todos", JSON.stringify(updateTodos));
      setInputValue("");
      showHideToast("تم إضافه المهمه بنجاح");
    }
  }

  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }
  // Function to handle the close of the delete dialog
  function handelDeleteDialogClose() {
    setShowDeletDialg(false);
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeletDialg(true);
  }
  // Function to handle the confirm delete action
  function handelDeletConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setShowDeletDialg(false);
    showHideToast("تم الحذف بنجاح")
  }

  // Map todos to Todo components
  const todosList = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} showDelete={openDeleteDialog} />;
  });
  return (
    <>
      {/* Delete Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelDeleteDialogClose}
        open={showDeletDialg}
        slots={{
          transition: Transition,
        }}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"هل انت متأكد من حذف المهمة"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            لا يمكنك استرجاع المهمة بعد حذفها، هل أنت متأكد من أنك تريد حذفها؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelDeleteDialogClose}>إغلاق</Button>
          <Button onClick={handelDeletConfirm}>نعم،قم بالحذف</Button>
        </DialogActions>
      </Dialog>
      {/* ===Delete Modal=== */}
      <Container maxWidth="sm">
        <Card
          className="custom-scrollbar"
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />
            {/* Filter Buttons */}

            <ToggleButtonGroup
              color="primary"
              style={{ direction: "ltr", marginTop: "19px" }}
              value={displayTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton value="non-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* ==Filter Buttons== */}

            {/* All Todo */}

            {todosList}

            {/* ==All Todo== */}

            {/* Input + Add Btn */}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  value={inputValue}
                  onChange={handelChange}
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                />
              </Grid>

              <Grid
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                size={4}
              >
                <Button
                  onClick={addToDo}
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  disabled={inputValue.length == 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/* ==Input + Add Btn== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
