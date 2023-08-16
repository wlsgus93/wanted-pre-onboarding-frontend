import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () =>{

    const [id, setId]= React.useState('');
    const [pwd,setPwd]= React.useState('');
    const regExp=/@/g; //Assignment1
    const navigate = useNavigate();
    const idRef = useRef("");
    const checkToken = () => {
        const token = localStorage.getItem("access_token");
        if(!token)
        {
            console.log('토큰없음')
        }
        else{
            console.log('토큰있음')
            navigate("/todo");  /*Assignment 4*/
        }
            // localStorage.setItem("token", result.access_token);}
      }


    const signup = ()=>{
        console.log('회원가입')
        fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
            method : "POST",          //메소드 지정
            headers : {               //데이터 타입 지정
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify({"email": id, "password": pwd})   //실제 데이터 파싱하여 body에 저장
        }) //.then(res=> res.json())
        .then((response)=>{
            console.log(response);
            console.log(response.ok)
        if(response.ok)
    {
        window.alert('회원가입에 성공하셨습니다.')
        navigate('/signin') /*Assignment 2*/
    }}
        
        );

    }
    useEffect(() => {
        idRef.current.focus();
        checkToken();
      }, []);
      const naviHome =()=>{
        navigate("/");
    }


    return <Main>
    <Title>회원가입</Title>
    <Inputdiv>
        <input data-testid="email-input" placeholder='Email' ref={idRef} onChange={(e)=>
            {
                setId(e.target.value);}} />
    </Inputdiv>
    <Inputdiv>
        <input data-testid="password-input" placeholder='Password' onChange={(e)=>{
        setPwd(e.target.value);

        }} />
    </Inputdiv>
    <button data-testid="signup-button" disabled={regExp.test(id) && pwd.length>=8?false:true /*Assignment 1 */} onClick={signup}>회원가입</button> 
    <Button onClick={naviHome}>home</Button>
    </Main>
}

export default Signup;

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

const Inputdiv = styled.div`

    display: flex;
    flex-grow: 1;
    flex-shrink: 0;

    padding: 10px 10px;
    width: 100%;
    justify-content: center;
    max-width: 800px;
`;

const Title= styled.h2`
    padding: 10px 10px;
`;

const Button= styled.button`
    margin: 30px 30px;
    width: 100px;
    height: 100px;
`