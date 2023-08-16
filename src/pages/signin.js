import React from 'react';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
const Signin = () =>{


    const [id, setId]= React.useState('');
    const [pwd,setPwd]= React.useState('');
    const [warning,setWarning]=React.useState(false);
    const regExp=/@/g; /*Assignment 1 */
    const navigate = useNavigate();
    const url = "https://www.pre-onboarding-selection-task.shop";
    const idRef = useRef("");
    const token = localStorage.getItem("access_token");
    const checkToken = () => {
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


    const Signin = ()=>
    
    {
        fetch(url+'/auth/signin',{
            method : "POST",          //메소드 지정
            headers : {               //데이터 타입 지정
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify({"email": id, "password": pwd})   //실제 데이터 파싱하여 body에 저장
        })
        .then(response => response.json())
        .then((response)=>{
            // console.log(result.access_token);
            console.log(response.message)
            if(response.access_token)
            {
                localStorage.setItem("access_token", response.access_token); /*Assignment 3 */
                navigate("/todo");  /*Assignment 3 */
                window.alert('로그인에 성공하셨습니다.')
                console.log('success') // navigate("/todo");  /*Assignment 3 */
            }
            else{
                window.alert(`잘못된 로그인입니다: ${response.message}`)
            }
        }
            
            )      
        }
    

    // 렌더링이 될 때
    useEffect(() => {
      idRef.current.focus();
      checkToken();
    console.log('check render')
    }, []);

    const naviHome =()=>{
        navigate("/");
    }
    return <Main>
        <Title>로그인</Title>
        <Inputdiv>
           <input data-testid="email-input" ref={idRef} placeholder='Email'  onChange={(e)=>
                {
                    setId(e.target.value);
                    console.log(e.target.value);}} />
        </Inputdiv>
        <Inputdiv>
            <input data-testid="password-input" placeholder='Password' onChange={(e)=>{
            setPwd(e.target.value);
            console.log(e.target.value)

            }} />
        </Inputdiv>
        <button data-testid="signin-button" disabled={regExp.test(id) && pwd.length>=8?false:true /*Assignment 1 */} onClick={Signin}>로그인</button>
        <Button onClick={naviHome}>home</Button>
    </Main>
}

export default Signin;

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