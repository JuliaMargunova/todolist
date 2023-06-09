import React, {ChangeEvent, useReducer, useState} from 'react';
import {TextField} from "@mui/material";

type EditablePropsType={
    title:string
    classes?:string
    changeTitle:(title:string)=>void
}
const EditableSpan:React.FC<EditablePropsType> = ({title,classes,changeTitle}) => {

   const [isEditMode,setIsEditMode]= useState<boolean>(false)
    const [localTitle,setLocalTitle]= useState<string>(title)
   const onEditMode = ()=>setIsEditMode(true)
   const offEditMode=()=>{
       changeTitle(localTitle)
       setIsEditMode(false)
   }

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)

    return (
        isEditMode
        ?<TextField
            variant="standard"
            size={"small"}
            autoFocus
            onBlur={offEditMode}
            value={localTitle}
            onChange={setTitleHandler}
            />
            : <span
                onDoubleClick={onEditMode}
                className={classes}
            >{title}</span>
    );
};

export default EditableSpan;