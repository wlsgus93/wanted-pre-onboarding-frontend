import React from 'react';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Detail from '../components/detail';
import styled from 'styled-components';

const Todo = () =>{


    const navigate = useNavigate();
    const [todo,setTodo]=React.useState('');
    const [todolist,setTodolist]=React.useState([]);
    const [text,setText]=React.useState('');
    const url = "https://www.pre-onboarding-selection-task.shop";
    const idRef = useRef("");
    let token= localStorage.getItem("access_token")
    

    useEffect(() => {
        idRef.current.focus();
        // checkToken();
        if(!token){
            navigate('/signin')
        }
        else{
            fetch(url+'/todos',{
                method : "GET",          //메소드 지정
                headers : {               //데이터 타입 지정
                    "Content-Type":"application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
                }
                }).then(response => response.json())
                .then((response)=>{
                    setTodolist([...response])
                    console.log(response)
            })

        }
      }, []);

      const onAdd=()=>{
        /*Assignment 6*/
        if(todo.length==0){
            window.alert("빈 값을 넣을 수 없습니다.")
        }
        else{
            fetch(url+'/todos',{
                method : "POST",          //메소드 지정
                headers : {               //데이터 타입 지정
                    "Content-Type":"application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({"todo": todo })   //실제 데이터 파싱하여 body에 저장
                }).then(response => response.json())
                .then((result)=>{
                setTodolist([...todolist,result]);
                setTodo('')
            })

        }
        
      }
      const Logout=()=>{
        localStorage.removeItem('access_token');
    }
      


    return <Main /*Assignment 6*/> 
        <Title>Todo list</Title>
        <Inputdiv>
            <input onChange={(e)=>{
                setTodo(e.target.value)}} ref={idRef} data-testid="new-todo-input" value={todo} />
            <button data-testid="new-todo-add-button" onClick={onAdd}>추가</button>
        </Inputdiv>
        <List>
            {todolist.map((data,index)=>{
                return <Detail key={data.index} todolist={todolist} setTodolist={setTodolist}  index={index} list={data}/ >})}
        </List>
        <Button onClick={Logout}>로그아웃</Button>
    </Main>
}

export default Todo;


const Main = styled.div`
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    align-items: center;
    max-width: 800px;
`;

const Inputdiv = styled.div`

    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: center;
    padding: 10px 10px;
    width: 100%;
    max-width: 800px;
`;

const Title= styled.h2`
    padding: 10px 10px;
    font-size:20px;
    font-weight:bold;
    color:red;
`;

const List=styled.div`
    
    justify-content: left;
    width:800px;

`
const Button= styled.button`
    margin: 30px 30px;
    width: 100px;
    height: 100px;
`