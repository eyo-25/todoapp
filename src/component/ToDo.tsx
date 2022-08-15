import { IToDo, toDoState } from './atoms';
import { useSetRecoilState } from "recoil";
import React from 'react';

function ToDo({text, category, id}: IToDo){
    const setToDos = useSetRecoilState(toDoState)
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        // IToDo["category"] IToDo안의 카테고리만 있는 부분을 제네릭으로 넣는다
        const {currentTarget : {name}} = event
        setToDos( (oldToDos) => {
            const targetIndex = oldToDos.findIndex((e)=>e.id === id)
            const newToDo = {text:text, id:id, category: name as IToDo["category"]}
            // categiry에는 "TO_DO"|"DOING"|"DONE"만 들어가야하기에 name의 인터페이스를 넣어둔다
            return [...oldToDos.slice(0,targetIndex),newToDo,...oldToDos.slice(targetIndex + 1)]
       })
    }
    return(
        <>
            <li>
                <span>{text}</span>
                {category !== "TO_DO" && <button name='TO_DO' onClick={onClick}>To Do</button>}
                {category !== "DOING" && <button name='DOING' onClick={onClick}>Doing</button>}
                {category !== "DONE" && <button name='DONE' onClick={onClick}>Done</button>}
                {/* onClick이벤트에서 인자를 넘기고 싶을때는 onClick={()=>함수(인자)} 이런식으로 익명함수안에 함수(인자) 기입 */}
            </li>
        </>
    )
}

export default ToDo