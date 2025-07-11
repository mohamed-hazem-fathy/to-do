import Card from "@mui/material/Card";
import { useState } from "react";
import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TodosContext } from "../context/todosContext";
import { TostContext } from "../context/Toast";
import { useContext } from "react";

import TextField from "@mui/material/TextField";

//Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Todo({ todo, showDelete }) {
   const { showHideToast } = useContext(TostContext);
  const [showUpdateDialg, setShowUpdateDialg] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  // Function to handle the check click
  function handelCheckClick() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast(" تم االتعديل بنجاح")
  }
  // Function to handle the delete click
  function handelDeleteClick() {
    showDelete(todo);
  }

  // Function to handle the close of the update dialog
  function handelUpdateDialogClose() {
    setShowUpdateDialg(false);
  }
  // Function to handle the update confirm action
  function handelUpdateConfirm() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...todo, title: updatedTodo.title, details: updatedTodo.details }
        : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialg(false);
    showHideToast(" تم التحديث بنجاح")
  }
  return (
    <>
      {/* Edit Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelUpdateDialogClose}
        open={showUpdateDialg}
        slots={{
          transition: Transition,
        }}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"تعديل المهمة "}</DialogTitle>
        <DialogContent>
          <TextField
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
          />
          <TextField
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label=" التفاصيل"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelUpdateDialogClose}>إغلاق</Button>
          <Button onClick={handelUpdateConfirm}>تأكيد</Button>
        </DialogActions>
      </Dialog>
      {/* ===Edit Modal=== */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            {/* Action Buttons */}
            <Grid
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              size={4}
            >
              <IconButton
                onClick={() => handelCheckClick()}
                className="iconbtn"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "3px solid #8bc34a",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => setShowUpdateDialg(true)}
                className="iconbtn"
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "3px solid #1769aa",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handelDeleteClick}
                className="iconbtn"
                sx={{
                  color: "#b23c17",
                  background: "white",
                  border: "3px solid #b23c17",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
            {/* ==Action Buttons== */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
