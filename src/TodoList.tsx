import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Button, Typography, ListItem, Checkbox, List} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (nextFilter: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todoListId, title,)

    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((task: TaskType): JSX.Element => {
        const removeTask = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)
        const taskClasses = task.isDone ? "task-isDone" : "task"
        return (
            <ListItem
                key={task.id}
                disablePadding
                divider
                secondaryAction={<IconButton
                    onClick={removeTask}>
                    <DeleteForeverIcon/>
                </IconButton>}
            >
                <Checkbox
                    color="secondary"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                    size="small"
                />
                <EditableSpan changeTitle={changeTaskTitle} title={task.title} classes={taskClasses}/>
            </ListItem>
        )
    })
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

    return (
        <div className="todolist">
            <header className='todoList-header'>
                <Typography
                    variant="h5"
                    align="center"
                    fontWeight="bold"
                    gutterBottom
                >
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <Button
                        variant={"contained"}
                        onClick={removeTodoListHandler}
                        endIcon={<DeleteForeverIcon/>}
                        sx={{ml: "15px"}}
                    >
                        Del
                    </Button>
                </Typography>
            </header>
            <AddItemForm titleMaxLength={25} addItem={addTask}/>
            <List>
                {tasksListItems}
            </List>
            <div className={"btn-filter-container"}>
                <Button
                    size={"small"}
                    variant={"contained"}
                    disableElevation
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={handlerCreator("all")}>All</Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    disableElevation
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={handlerCreator("active")}>Active</Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    disableElevation
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={handlerCreator("completed")}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;