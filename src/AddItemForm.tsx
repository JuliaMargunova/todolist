import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemPropsType={
    titleMaxLength:number
    addItem:(title:string)=>void
}

const AddItemForm : FC<AddItemPropsType> = ({titleMaxLength,addItem}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
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
    const userMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : null
    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addItemHandler()
    return (
        <div className={'add_form'}>
            <input
                placeholder="Please, enter title"
                value={title}
                onChange={setTitleHandler}
                //ref={taskTitleInput}
                onKeyDown={addTaskOnKeyPressHandler}
                className={inputClasses}
            />
            <button
                disabled={isAddBtnDisabled}
                onClick={addItemHandler}
            >+</button>
            {titleMaxLengthWarning || userMessage}
        </div>
    );
};

export default AddItemForm;