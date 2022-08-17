import { categories, IToDo, toDoState } from './atoms';
import { useSetRecoilState } from "recoil";
import React from 'react';
import styled from 'styled-components';

const ListForm = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
`

const DateBox = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 40px;
    font-size: 14px;
`

const ToDoBox = styled.div`
    display: flex;
    align-items: center;
`

const ToDoBtn = styled.button`
    color: white;
    margin-right: 10px;
    background: none;
    border: 1px solid white;
    border-radius: 3px;
    padding: 5px 15px;
    cursor: pointer;
    box-sizing: border-box;
    transition: background 0.5s linear;
    &:hover{
        font-weight: 600;
        background: #d5fe48;
        color: black;
        border: none;
    }
`

const ToDoItem = styled.input`
    color: ${props=> props.theme.textColor};
    background: none;
    border: none;
`

function ToDo({text, category, id, startline, deadline}: IToDo){
    const setToDos = useSetRecoilState(toDoState)
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        // IToDo["category"] IToDo안의 카테고리만 있는 부분을 제네릭으로 넣는다
        const {currentTarget : {name}} = event
        setToDos( (oldToDos) => {
            const targetIndex = oldToDos.findIndex((e)=>e.id === id)
            const newToDo = {text:text, id:id, category: name as IToDo["category"], startline:startline, deadline:deadline}
            // categiry에는 "TO_DO"|"DOING"|"DONE"만 들어가야하기에 name의 인터페이스를 넣어둔다
            return [...oldToDos.slice(0,targetIndex),newToDo,...oldToDos.slice(targetIndex + 1)]
       })
    }
    const onDelete = () => {
        setToDos( (oldToDos) => {
            const targetIndex = oldToDos.findIndex((e)=>e.id === id)
            return [...oldToDos.slice(0,targetIndex),...oldToDos.slice(targetIndex + 1)]
       })
    }
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {value : value} = event.currentTarget
        setToDos((oldToDos)=>{
            const targetIndex = oldToDos.findIndex((e)=>e.id === id)
            const newToDo = {text:value, id:id, category:category, startline:startline, deadline:deadline}
            const newArray = [...oldToDos]
            newArray.splice(targetIndex, 1, newToDo)
            // splice(배열 인덱스, 자르는 요소, 교체할 요소)
            return newArray
        })
    }
    return(
        <ListForm>
            <ToDoBox>
                <ToDoItem defaultValue={text} onChange={onChange}/>
                {category !== categories.TO_DO &&<ToDoBtn name={categories.TO_DO}onClick={onClick}>To Do</ToDoBtn>}
                {category !== categories.DOING && <ToDoBtn name={categories.DOING} onClick={onClick}>Doing</ToDoBtn>}
                {category !== categories.DONE && <ToDoBtn name={categories.DONE} onClick={onClick}>Done</ToDoBtn>}
                <ToDoBtn onClick={onDelete}>x</ToDoBtn>
            </ToDoBox>
            <DateBox>
                <span>Start Time : {startline.replace('T', ' ')}</span>
                <br/>
                <span>End Time : {deadline.replace('T', ' ')}</span>
            </DateBox>
            {/* onClick이벤트에서 인자를 넘기고 싶을때는 onClick={()=>함수(인자)} 이런식으로 익명함수안에 함수(인자) 기입 */}
        </ListForm>
    )
}

export default ToDo