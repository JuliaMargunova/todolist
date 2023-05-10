import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import todoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button, Checkbox,
    Container,
    createTheme, CssBaseline, FormControl, FormControlLabel, FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {amber, lightGreen} from "@mui/material/colors";


//CRUD
//C-create
//R-read (filter, search, sort, pagination)
//U-update
//D-delete

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'completed'}
    ])
    const [isDarkMode,setIsDarkMode]= useState<boolean>(true)
    type TasksStateType = {
        [todoListId: string]: TaskType[]
    }

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS/ES6&TS", isDone: true},
            {id: v1(), title: "REACT/REDUX", isDone: false}],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Bread", isDone: false}],

    })

    const removeTask = (taskId: string, todoListId: string) => {
        const updateTasks = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todoListId]: updateTasks})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updateTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: updateTasks})
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        const updateTasks = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks, [todoListId]: updateTasks})
    }
    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, filter: nextFilter}
            : tl
        ))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, title: title}
            : tl
        ))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copy = {...tasks}
        delete copy[todoListId]
        setTasks(copy)
    }
    const addTodoList = (title: string) => {
        const newTodo: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }


    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        const updateTasks = tasks[todoListId].map(t => t.id === taskId
            ? {...t, title: title} : t)
        setTasks({...tasks, [todoListId]: updateTasks})
    }

    const todoListsComponents: JSX.Element[] = todoLists.map(tl => {
        const tasksWhatIWantToSee = getTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper elevation={8}>
                    <TodoList
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksWhatIWantToSee}

                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    const mode = isDarkMode ? "dark" : "light";
    const customTheme = createTheme({
        palette: {
            primary: amber,
            secondary: lightGreen,
            mode: mode
        }
    })
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline>
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                TodoLists
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox onChange={e=>setIsDarkMode(e.currentTarget.checked)} />}
                                    label = {isDarkMode ? "Light mode":"Dark mode"}
                                />
                            </FormGroup>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Container fixed>
                        <Grid container sx={{p: "15px 0"}}>
                            <AddItemForm titleMaxLength={25} addItem={addTodoList}/>
                        </Grid>
                        <Grid container spacing={4}>
                            {todoListsComponents}
                        </Grid>

                    </Container>


                </div>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
