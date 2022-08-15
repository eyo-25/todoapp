import { useForm } from "react-hook-form"
import { useRecoilValue } from 'recoil'
import { toDoState } from "./atoms";
import CreateToDos from "./CreateToDos";
import ToDo from "./ToDo";


// find todo based on id 2 id가 몇번째 인덱스인지 3 인덱스의 카테고리 변경
function TodoList(){
    const toDos = useRecoilValue(toDoState);
    console.log(toDos)
    return(
        <div>
            <h1>To Dos</h1>
            <ul>
                <CreateToDos></CreateToDos>
                {toDos.map((toDo)=><ToDo key={toDo.id} {...toDo}></ToDo>)}
                {/* toDoState의 props과 ToDo컴포넌트의 props가 같기때문에 <ToDo {...toDo}/> 처럼 사용가능 */}
            </ul>
        </div>
    )
}

export default TodoList;