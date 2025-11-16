import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [apiTodoList, setApiTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showToday, setShowToday] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  // React Query fetch todos
  const {
    data: apiTodos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await api.get("/todos");
      return res.data;
    },
  });

  useEffect(() => {
    if (apiTodos) setApiTodoList(apiTodos.slice(0, 10));
  }, [apiTodos]);

  // Toggle completion (local)
  const toggleTodo = (id) => {
    setApiTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete task
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setApiTodoList((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const taskData = {
      title: newTask,
      completed: false,
    };

    try {
      const res = await api.post("/todos", taskData);
      setApiTodoList((prev) => [res.data, ...prev]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const todayTodos = apiTodoList.filter((t) => !t.completed);
  const completedTodos = apiTodoList.filter((t) => t.completed);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "60%" }}>
        {/* Header */}
        <Typography variant="h5" fontWeight="bold">
          Good Evening, {user?.email?.split("@")[0]} 😄
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>

        {/* New Task Input */}
        <Box
          component="form"
          onSubmit={handleAddTask}
          sx={{
            mt: 2,
            p: 1.5,
            border: "2px dotted #bbb",
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": { borderColor: "#888", backgroundColor: "#f9f9f9" },
          }}
        >
          <TextField
            fullWidth
            placeholder="+ Add a new task..."
            size="small"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: 15,
                "&::placeholder": {
                  color: "#999",
                  fontStyle: "italic",
                  opacity: 1,
                },
              },
            }}
            sx={{
              "& .MuiInputBase-input": { padding: "6px 8px", color: "#333" },
            }}
          />
        </Box>

        {/* Today Tasks Accordion */}
        <Accordion
          expanded={showToday}
          onChange={() => setShowToday(!showToday)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              Today's Tasks ({todayTodos.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {isLoading && <Typography>Loading todos...</Typography>}
            {isError && (
              <Typography color="error">Error fetching todos.</Typography>
            )}
            {todayTodos.map((todo) => (
              <Box
                key={todo.id}
                sx={{ display: "flex", alignItems: "center", mt: 1 }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <Typography sx={{ flex: 1 }}>{todo.title}</Typography>
                <IconButton
                  onClick={() => deleteTodo(todo.id)}
                  sx={{ color: "gray", "&:hover": { color: "red" } }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Completed Tasks Accordion */}
        <Accordion
          expanded={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              Completed Tasks ({completedTodos.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {completedTodos.map((todo) => (
              <Box
                key={todo.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                  backgroundColor: "#f5f5f5",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <Typography
                  sx={{
                    flex: 1,
                    textDecoration: "line-through",
                    color: "gray",
                  }}
                >
                  {todo.title}
                </Typography>
                <IconButton
                  onClick={() => deleteTodo(todo.id)}
                  sx={{ color: "gray", "&:hover": { color: "red" } }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Logout Button */}
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            mt: 3,
            backgroundColor: "#2f2b3a",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": { backgroundColor: "#272436" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
