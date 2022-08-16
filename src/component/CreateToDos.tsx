import { useForm } from "react-hook-form"
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";

interface IForm {
    toDo:string;
    startline: string;
    deadline: string;
}

const Time = styled.input.attrs({ type: "datetime-local" })`

`;

function CreateToDos(){
    const { register, handleSubmit, setValue,formState:{errors}, } = useForm<IForm>();
    const category = useRecoilValue(categoryState)
    const [toDos, setToDos] = useRecoilState(toDoState);
    const handleValid = ({toDo, startline, deadline}: IForm) => {
        setToDos(
            oldToDos => [{text:toDo, category:category, id: Date.now(), startline:startline, deadline:deadline}, ...oldToDos]
        )
        setValue("toDo", "");
    };
    return(
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "Please write a toDo",
            })} placeholder="Write a to do"/>
            <span>
             {errors?.toDo?.message}
            </span>
            <Time {...register("startline", {
                required: "Please select a Date",
            })} placeholder="select a deadline"/>
            <span>
             {errors?.startline?.message}
            </span>
            <Time {...register("deadline", {
                required: "Please select a Date",
            })} placeholder="select a startline"/>
            <span>
             {errors?.deadline?.message}
            </span>
            <button>Add todo</button>
         </form>
    )
}

export default CreateToDos