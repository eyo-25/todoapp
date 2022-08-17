import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categories, categoryState } from "../component/atoms";
import CreateToDos from "../component/CreateToDos";
import { Container } from "../component/TodoList";

export const ContentsBox = styled.div`
    display: flex;
    border-bottom: 0.5px solid #3d3d3d;
    padding: 23px 0;
    position: relative;
    p {
        font-size: 15px;
        margin-left: 90px;
        position: absolute;
        text-align: center;
        right: 0;
        left: 0;
        bottom: 6px;
        color: #d5fe48;
    }
`

export const OptionText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 20px;
    width: 90px;
`

export const Select = styled.select`
    width: 100%;
    background: ${props=>props.theme.bgColor};
    color: ${props=>props.theme.textColor};
    border: none;
    font-size: 16px;
    text-align: center;
    option {
        text-align: center;
    }
`

function MakePlan() {
    const [category, setCategory] = useRecoilState(categoryState)
    const onInput = (event:React.FormEvent<HTMLSelectElement>)=>{
        setCategory(event.currentTarget.value as any)
    }
    return (
        <Container>
            <ContentsBox>
                <OptionText>STATUS</OptionText>
                <Select value={category} onInput={onInput}>
                    <option value={categories.TO_DO}>ToDo</option>
                    <option value={categories.DOING}>Doing</option>
                    <option value={categories.DONE}>Done</option>
                </Select>
            </ContentsBox>
            <CreateToDos></CreateToDos>
        </Container>
    )
}

export default MakePlan;