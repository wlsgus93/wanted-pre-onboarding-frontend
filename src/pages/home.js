import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useEffect, useRef } from "react";
const Home = () =>{

    const navigate = useNavigate();
    // let logincheck=false
    const [logincheck, setLogincheck]= React.useState('');
    const token = localStorage.getItem("access_token");
    useEffect(() => {
        checkToken();
        
      }, []);
    
    const naviTodo =()=>{
        navigate("/todo");
    }
    const naviLogin =()=>{
        navigate("/signin");
    }
    const naviSignup=()=>{
        navigate("/signup")
    }
    const Logout=()=>{
        localStorage.removeItem('access_token');
    }
    const checkToken = () => {
        if(!token)  
        {
            setLogincheck(false);
            console.log('토큰없음')
        }
        else{
            setLogincheck(true);
            console.log('토큰있음')
        }
    }
    
    
    return <Main>
        <Logincheck logincheck={logincheck}>{logincheck?'로그인중..':'로그인중이 아닙니다..'}</Logincheck>
        <Button onClick={naviTodo}>Todo list</Button>
        <Button onClick={naviLogin}>로그인</Button>
        <Button onClick={naviSignup}>회원가입</Button>
        <Button onClick={Logout}>로그아웃</Button>
    </Main>
}

export default Home;


const Main = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 0 auto;
    flex-shrink: 0;
    width: 100%;
    align-items: center;
    max-width: 800px;
`;
const Button= styled.button`
    margin: 30px 30px;
    width: 100px;
    height: 100px;
`
const Logincheck = styled.h5`
    color: ${(props) => (props.logincheck ?'green':'red')};
`