import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Button, IconButton, TextField} from "@mui/material";

type AddItemPropsType = {
    titleMaxLength: number
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemPropsType> = ({titleMaxLength, addItem}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long!</div>
        : null
    const userMessage = error && "Title is required!"

    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addItemHandler()
    return (
        <div className={'add_form'}>
            <TextField
                size="small"
                placeholder="Enter item title, please"
                value={title}
                onChange={setTitleHandler}
                //ref={taskTitleInput}
                onKeyDown={addTaskOnKeyPressHandler}
                error={error}
                helperText={userMessage}
                //className={inputClasses}
            />
            <IconButton
                size="small"
                disabled={isAddBtnDisabled}
                onClick={addItemHandler}>
                <AddBoxIcon/>
            </IconButton>
            {titleMaxLengthWarning}
        </div>
    );
};

export default AddItemForm;