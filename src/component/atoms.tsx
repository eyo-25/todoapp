import { atom, selector } from 'recoil'

export enum categories {
    "TO_DO"="TO_DO",
    "DOING"="DOING",
    "DONE"="DONE",
    // enum은 기본적으로 숫자타입이므로 "TO_DO"="TO_DO" 이렇게 문자타입으로 변환가능하다.
}

export interface IToDo {
    text: string;
    id: number;
    category: categories;
    startline: string;
    deadline: string;
}

export const categoryState = atom<categories>({
    key: "category",
    default: categories.TO_DO,
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) =>{
        const toDos = get(toDoState)
        const category = get(categoryState)
        return toDos.filter((todo)=>todo.category === category)
    }
})