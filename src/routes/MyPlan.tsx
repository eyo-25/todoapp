import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categories, categoryState, toDoSelector } from "../component/atoms";
import ToDo from "../component/ToDo";
import { Container } from "../component/TodoList";
import { ContentsBox, OptionText, Select } from "./MakePlan";

const SubTitle = styled.h2`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: black;
    font-weight: 700;
`

function MyPlan() {
    const toDos = useRecoilValue(toDoSelector)
    const [category, setCategory] = useRecoilState(categoryState)
    const onInput = (event:React.FormEvent<HTMLSelectElement>)=>{
        setCategory(event.currentTarget.value as any)
    }
    return (
        <>
            <Container>
                <ContentsBox>
                    <OptionText>STATUS</OptionText>
                    <Select value={category} onInput={onInput}>
                        <option value={categories.TO_DO}>ToDo</option>
                        <option value={categories.DOING}>Doing</option>
                        <option value={categories.DONE}>Done</option>
                    </Select>
                </ContentsBox>
                <ContentsBox style={{backgroundColor: "#d5fe48"}}>
                    <SubTitle>{category} LIST</SubTitle>
                </ContentsBox>
                    { toDos?.map((todo,i)=>
                        <ContentsBox>
                            <OptionText>#{i + 1}</OptionText>
                            <ToDo key={todo.id} {...todo}></ToDo>
                        </ContentsBox>
                    )}
            </Container>
        </>
    )
}

export default MyPlan;