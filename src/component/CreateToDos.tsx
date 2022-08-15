import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { toDoState } from "./atoms";

interface IForm {
    toDo:string;
}

function CreateToDos(){
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const [toDos, setToDos] = useRecoilState(toDoState);
    const handleValid = ({toDo}: IForm) => {
        setToDos(
            oldToDos => [{text:toDo, category:"TO_DO", id: Date.now()}, ...oldToDos]
        )
        setValue("toDo", "");
    };
    return(
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "Please write a toDo",
            })} placeholder="Write a to do"/>
            <button>Add todo</button>
         </form>
    )
}

export default CreateToDos