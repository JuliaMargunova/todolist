import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    addTask:(title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (nextFilter: FilterValuesType, todoListId: string)=> void
    changeTodoListTitle : (title: string, todoListId: string)=>void
    changeTaskTitle:(taskId: string, title:string ,todoListId: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const addTask = (title:string) => props.addTask(title, props.todoListId)
    const removeTodoListHandler =()=> props.removeTodoList(props.todoListId)
    const changeTodoListTitle=(title:string)=>{props.changeTodoListTitle(props.todoListId,title,)

    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((task: TaskType): JSX.Element => {
        const removeTask = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=> props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title:string)=> props.changeTodoListTitle( title, props.todoListId)
        const taskClasses = task.isDone ? "task-isDone" : "task"
        return (
            <li key={task.id}>
                <div>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan changeTitle={changeTaskTitle} title={task.title} classes={taskClasses}/>
                </div>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

    return (
        <div className="todolist">
            <header className='todoList-header'>
                <h2>
                <EditableSpan title={props.title}  changeTitle={changeTodoListTitle}/></h2>
                <button onClick={removeTodoListHandler}>X</button>
            </header>
            <AddItemForm titleMaxLength={25} addItem={addTask}/>
            <ul>
                {tasksListItems}
            </ul>
            <div className={"filter-btn-wrapper"}>
                <button
                    className={props.filter=== "all"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("all")}>All</button>
                <button
                    className={props.filter=== "active"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("active")}>Active</button>
                <button
                    className={props.filter=== "completed"
                        ? "filter-btn filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;