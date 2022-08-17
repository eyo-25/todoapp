import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useRecoilState } from 'recoil'
import styled from "styled-components";
import MakePlan from "../routes/MakePlan";
import MyPlan from "../routes/MyPlan";
import { categories, categoryState, toDoState } from "./atoms";

export const Container = styled.div`
    padding: 0px 20px;
    max-width: 800px;
    margin: 0 auto
`

const Nav = styled.nav`
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SubNav = styled.nav`
    height: 60px;
    display: flex;
    cursor: pointer;
    margin-bottom: 40px;
`

const Title = styled.h1 `
    font-weight: 700;
    font-size: 45px;
    word-spacing: -2px;
    letter-spacing: -1px;
`

const Menu = styled.div`
    position: relative;
    width: 100%;
    font-size: 17px;
    word-spacing: -.5px;
    &:hover{
        background: linear-gradient(to top, #d5fe48, transparent);
        opacity: 0.6;
        transition: .3s ease-in;
        color: black;
    }
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`

const Bar = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #d5fe48, transparent);
    opacity: 0.6;
    z-index: -1;
`

// find todo based on id 2 id가 몇번째 인덱스인지 3 인덱스의 카테고리 변경
export function TodoList(){

    const [toDo,setToDo] = useRecoilState(toDoState)
    const [category, setCategory] = useRecoilState(categoryState)
    const homeMatch = useMatch("/");
    const planMatch = useMatch("/myplan");

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
        <Container>
            <Nav>
                <Title>JUST&nbsp;
                    <span>
                        {category==="TO_DO" && "DO"}
                        {category==="DOING" && category}
                        {category==="DONE" && category}
                    </span>
                    &nbsp;IT.
                </Title>
            </Nav>
            <SubNav>
                <Menu>
                    <Link to={`/`}>MAKE A PLAN</Link>
                    {homeMatch? <Bar/>:null}
                </Menu>
                <Menu>
                    <Link to={`/myplan`}>MY PLAN</Link>
                    {planMatch? <Bar/>:null}
                </Menu>
            </SubNav>
            {homeMatch? <MakePlan />:null}
            {planMatch? <MyPlan />:null}
        </Container>
    )
}

export default TodoList;