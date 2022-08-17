import { useState } from "react";
import { useForm } from "react-hook-form"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from "styled-components";
import { ContentsBox, OptionText } from "../routes/MakePlan";
import { categoryState, toDoState } from "./atoms";

interface IForm {
    toDo:string;
    startline: string;
    deadline: string;
}

const Btn = styled.button`
    display: flex;
    font-size: 16px;
    justify-content: center;
    margin: 40px auto;
    border: 0.5px solid white;
    background: inherit;
    color: ${props=> props.theme.textColor};
    cursor: pointer;
    padding: 20px 0;
    width: 50%;
    border-radius: 4px;
    transition: background 0.5s linear;
    &:hover {
        color: black;
        background: #d5fe48;
        opacity: 0.8;
        border: none;
    }
`

const InputSelect = styled.input`
    width: 100%;
    background: ${props=>props.theme.bgColor};
    color: ${props=>props.theme.textColor};
    border: none;
    font-size: 16px;
    text-align: center;
    ::-webkit-calendar-picker-indicator {
        border-radius: 12px;
        padding: 4px;
        background-color: #d5fe48;
    }
`

function CreateToDos(){
    const { register, handleSubmit, setValue, formState:{errors}, } = useForm<IForm>();
    const category = useRecoilValue(categoryState)
    const setToDos = useSetRecoilState(toDoState);
    const handleValid = ({toDo, startline, deadline}: IForm) => {
        if( startline < deadline ){
            setToDos(
                oldToDos => [{text:toDo, category:category, id: Date.now(), startline:startline, deadline:deadline}, ...oldToDos]
            )
            setValue("toDo", "");
            setError(false)
            console.log("f")
        }else {
            setError(true)
            console.log("t")
        }
    };
    const [error,setError] = useState(false)

    return(
            <form onSubmit={handleSubmit(handleValid)}>
                <ContentsBox>
                    <OptionText>TODO<br/>NAME</OptionText>
                    <InputSelect as="input" {...register("toDo", {
                        required: "Please write a toDo",
                    })} placeholder="Write a to do"/>
                    <p>
                    {errors?.toDo?.message}
                    </p>
                </ContentsBox>
                <ContentsBox>
                    <OptionText>START<br/>TIME</OptionText>
                    <InputSelect as="input" type="datetime-local"  {...register("startline", {
                        required: "Please select a Date",
                        onChange: () => setError(false)
                    })} placeholder="select a deadline"/>
                    <p>
                        {errors?.startline?.message}
                    </p>
                </ContentsBox>
                <ContentsBox>
                    <OptionText>END<br/>TIME</OptionText>
                    <InputSelect as="input" type="datetime-local" {...register("deadline", {
                        required: "Please select a Date",
                        onChange: () => setError(false)
                    })} placeholder="select a startline"/>
                    <p>
                        {error && 'StartTime must be less than or equal to Endtime.'}
                        {errors?.deadline?.message}
                    </p>
                </ContentsBox>
                <Btn>Create Plan</Btn>
            </form>
    )
}

export default CreateToDos