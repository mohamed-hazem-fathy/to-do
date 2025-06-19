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
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

//Components
import Todo from "./Todo";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputValue, setInputValue] = useState("");
  const todosList = todos.map((t) => {
    return <Todo key={t.id} todo={t}  />;
  });

  const [alignment, setAlignment] = useState("left");
  function handelChange(e) {
    setInputValue(e.target.value);

    e.target.value = "";
  }
  function addToDo() {
    if (inputValue === "") {
      alert("الرجاء إدخال عنوان المهمة");
    } else {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: inputValue,
          details: "تفاصيل المهمة الجديدة",
          isCompleted: false,
        },
      ]);
      setInputValue("");
    }
  }
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />
          {/* Filter Buttons */}

          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "19px" }}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="right">غير المنجز</ToggleButton>
            <ToggleButton value="center">المنجز</ToggleButton>
            <ToggleButton value="left">الكل</ToggleButton>
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
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/* ==Input + Add Btn== */}
        </CardContent>
      </Card>
    </Container>
  );
}
