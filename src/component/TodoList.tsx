import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from 'recoil'
import { categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDos from "./CreateToDos";
import ToDo from "./ToDo";


// find todo based on id 2 id가 몇번째 인덱스인지 3 인덱스의 카테고리 변경
function TodoList(){

    const toDos = useRecoilValue(toDoSelector)
    const [toDo,setToDo] = useRecoilState(toDoState)
    const [category, setCategory] = useRecoilState(categoryState)
    const onInput = (event:React.FormEvent<HTMLSelectElement>)=>{
        setCategory(event.currentTarget.value as any)
    }

    useEffect(()=>{
        let array = localStorage.getItem('toDoList')
        let copy = JSON.parse(array as any)
        {copy === null ? localStorage.setItem('toDoList', JSON.stringify( [] )) : setToDo(()=>[...copy])}
    },[])

    useEffect(()=>{
        let lastCategory = localStorage.getItem('category')
        let copy = JSON.parse(lastCategory as string)
        {copy === null ? localStorage.setItem('category', JSON.stringify( categories.TO_DO )) : setCategory(()=>copy)}
    },[])

    useEffect(()=>{
        localStorage.setItem('toDoList', JSON.stringify( toDo ))
    },[toDo])

    useEffect(()=>{
        localStorage.setItem('category', JSON.stringify( category ))
    },[category])
    
    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
            <form>
                <select value={category} onInput={onInput}>
                    <option value={categories.TO_DO}>ToDo</option>
                    <option value={categories.DOING}>Doing</option>
                    <option value={categories.DONE}>Done</option>
                </select>
            </form>
            <CreateToDos></CreateToDos>
            { toDos?.map(todo=><ToDo key={todo.id} {...todo}></ToDo>)}
        </div>
    )
}

export default TodoList;