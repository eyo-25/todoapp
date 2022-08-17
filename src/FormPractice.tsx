import { ReactEventHandler, useState } from "react";
import { useForm } from "react-hook-form"

function TodoList1(){
        const [toDo, setToDo] = useState("")
        const [toDoError, setToDoError] = useState("")
        let onChangeHandler = (event:React.FormEvent<HTMLInputElement>)=>{
            const {value : value} = event.currentTarget
            // event.currentTarget.value = 입력한값을 가져와서 setValue에
            setToDo(value)
            setToDoError("")
        }
        const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault();
            if( toDo.length < 10 ){
                return setToDoError("To do should de longer")
            }
            console.log("submit")
        }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={toDo} onChange={onChangeHandler} placeholder="Write a to do"/>
                <button>Add</button>
                {toDoError !== "" ? toDoError : null}
            </form>
        </div>
    )
}

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    CheckingPassword: string;
    extraError?: string;
}

function Formpractice(){
    const { register, handleSubmit, formState:{errors}, setError} = useForm<IForm>(
        {defaultValues: {
            email:"@naver.com"
        }}
    );
    // <IForm>이부분을 제네릭이라고 한다
    const onValid = (data:IForm) => {
        if(data.password !== data.CheckingPassword){
            setError(
                "CheckingPassword",
                { message: "Passwor are not same" },
                { shouldFocus: true }
                // shouldFocus 에러난 input에 focus해준다.
            )
        }
    }
    console.log(errors);
    return(
        <div>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", {
                    required: "Write a to Email",
                    pattern:{
                        value: /^[A-Za-z0-9_]+@naver\.com$/,
                        message: "you should be write email form"
                    }
                    })}
                     placeholder="Write a to Email">
                </input>
                <span>
                    {errors?.email?.message}
                </span>
                <input {...register("firstName", {
                    required: "Write a to firstName",
                    validate: {
                        noeyo: (v)=>
                            v.includes("eyo")? "no eyo allowed": true,
                        noqutuzm: (v)=>
                            v.includes("qutuzm")? "no qutuzm allowed": true,
                    }
                    })} placeholder="Write a to FirstName"/>
                <span>
                    {errors?.firstName?.message}
                </span>
                <input {...register("lastName", {required: true})} placeholder="Write a to LastName"/>
                <input {...register("userName", {
                    required: "username require",
                    minLength: {
                        value: 3,
                        message: "Your are username is too short",
                    }
                    })} placeholder="Write a to UserName"/>
                {errors?.userName?.message}
                <input {...register("password", {required: "password require", minLength: 5})} placeholder="Write a to PassWord"/>
                <span>
                    {errors?.password?.message}
                </span>
                <input {...register("CheckingPassword", {required: "password require", minLength: 5})} placeholder="Write a to PassWord1"/>
                <span>
                    {errors?.CheckingPassword?.message}
                </span>
                {/* register("toDo")가 가진 함수를 input에게 props로 준다 */}
                <button>Add</button>
            </form>
        </div>
    )
}

export default Formpractice;