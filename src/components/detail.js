import React from 'react';
import styled from 'styled-components';

const Detail = (props) =>{
    let temp_list1=props.todolist;
    let item_info=props.list;
    let item_index=props.index;
    const [isUpdate,setIsUpdate]=React.useState(false);
    const url = "https://www.pre-onboarding-selection-task.shop";
    let token= localStorage.getItem("access_token")
    const [moditodo,setModiTodo]=React.useState('');
    const onUpdate=()=>{
        /*Assignment 10*/
        setIsUpdate(!isUpdate)
    }
    const onCheck=()=>{
        /*Assignment 7*/
        console.log('checkbox click');
        fetch(url+`/todos/${item_info.id}`,{
            method : "put",
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify({"todo": item_info.todo, "isCompleted": !item_info.isCompleted})   
        })//.then(response => response.json())
        .then((result)=>{
            console.log(result)
            var temp=temp_list1.map((data,i)=>{
                return data.id===item_info.id ? {...data, isCompleted:!item_info.isCompleted} : data ;}) // 특정 요소의 값 변경하기
            props.setTodolist([...temp])
        })




      }
    const onSubmit=()=>{
        /*Assignment 10*/
        if(moditodo.length==0)
        {
            window.alert("빈값을 넣을 수 없습니다.")
        }
        else{
            fetch(url+`/todos/${item_info.id}`,{
                method : "put",
                headers : {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":"application/json; charset=utf-8"
                },
                body: JSON.stringify({"todo": moditodo, "isCompleted": item_info.isCompleted})   
            }).then(response => response.json())
            .then((result)=>{
                console.log(result)
                console.log(item_info.id)
                console.log(temp_list1)
                var temp=temp_list1.map((data,i)=>{
                    return data.id===item_info.id ? {...data, todo:moditodo} : data ;}) // 특정 요소의 값 변경하기
                props.setTodolist([...temp])
                setIsUpdate(!isUpdate)
            })

        }
        
    }
    const onDelete=()=>{
        /*Assignment 9*/
        fetch(url+`/todos/${item_info.id}`,{
            method : "DELETE",
            headers : {
                "Content-Type":"application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            }}
            ).then((result)=>{
                var temp_list=props.todolist.filter((data,i)=>{return !(data.id==item_info.id)} ) // 특정 요소 값 삭제
                props.setTodolist([...temp_list])
        })

    }

return <Todo key={props.index}>

        <li style={{padding:'0 0 0 200px'}} key={`list_${props.list.id}`}  /*Assignment 5*/>
            <label key={`label_${props.index}`}>
                <input onClick={onCheck} type="checkbox" key={item_info.id} defaultChecked={item_info.isCompleted} /*Assignment 7*/ />
                
                {isUpdate?<input data-testid="modify-input" onChange={(e)=>setModiTodo(e.target.value)} type='text' defaultValue={item_info.todo/*Assignment 10 수정 input*/} style={{margin: '0px 20px 0px 10px'}}/>:<span key={`span_${item_info.id}`} style={{margin: '0px 20px 0px 10px'}} >{item_info.todo}</span>}
            </label>
            {isUpdate?<><button data-testid="submit-button" onClick={onSubmit}>제출</button><button data-testid="cancel-button" onClick={onUpdate}>취소</button></>:<><button onClick={onUpdate} data-testid="modify-button" /*Assignment 8,10*/>수정</button>
            <button data-testid="delete-button" onClick={onDelete} /*Assignment 8*/>삭제</button></>}
        </li>
    </Todo>
}

export default Detail;

const Todo=styled.div`
    padding: 0 40px;
    justify-content:center;
`
