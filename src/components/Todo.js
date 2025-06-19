import Card from "@mui/material/Card";
import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TodosContext } from "../context/todosContext";
import { useContext } from "react";
import Slide from '@mui/material/Slide';
import { useState } from "react";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Todo({todo}) {
  const [showDeletDialg, setShowDeletDialg] = useState(false);
  const {todos, setTodos} = useContext(TodosContext);

  // Function to handle the check click
  function handelCheckClick() {
     setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...todo, isCompleted: !t.isCompleted } : t
      )
    );
  }
  // Function to handle the delete click
  function handelDeleteClick() {
    setShowDeletDialg(true);
  }
  // Function to handle the close of the delete dialog
  function handelClose() {
    setShowDeletDialg(false);
  }
  // Function to handle the confirm delete action
  function handelDeletConfirm() {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setShowDeletDialg(false);
  }
  return (
    <>
  {/* Delete Modal */}
    <Dialog
    style={{direction:"rtl"}}
    onClose={handelClose}
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
          <Button onClick={handelClose}>إغلاق</Button>
          <Button onClick={handelDeletConfirm} >نعم،قم بالحذف</Button>
        </DialogActions>
      </Dialog>

  {/* ===Delete Modal=== */}

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
              <Typography variant="h5" sx={{ textAlign: "right" }}>
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
