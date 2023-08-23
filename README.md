
### 1.이름
김진현
### 2.프로젝트의 실행 방법
1. git clone
2. 해당 프로젝트 경로에서
   ```npm install```
   ```npm start```
### 3.데모영상
![testvideo](https://github.com/wlsgus93/wanted-pre-onboarding-frontend/assets/35252854/761af35b-08b3-496a-a8d6-162bc074fbe0)
#### 링크 : http://wanted-pre-onboarding-frontend-jin0816.s3-website.ap-northeast-2.amazonaws.com/
###### 참고사항
1. UI상의 로그아웃버튼: 구현 사항의 리다이렉트 기능을 확인하기 위한 단순 localstorage내의 토큰을 지우는 용도이며,
   자체적인 페이지 이동 기능은 전혀없다. 
### 4. 디렉토리 구조
```
├─node_modules
├─public
└─src
│  ├─components
│  │  └─detail.js
│  ├─pages
│  │  └─home.js
│  │  ├─signin.js
│  │  ├─signup.js
│  │  ├─todo.js
│  └─shared
│  │  └─Router.js
│  ├─App.js
│  ├─App.css
│  ├─index.css
│  └─index.html
├─.gitignore
├─package.json
├─package-lock.json
└─README.md
```
### 5. 기능 구현 설명
### :: 1.로그인/회원가입
#### development 1
- 이메일 및 비밀번호 유효성 검사기능
  - 이메일 조건: `@` 포함
  - 비밀번호 조건: 8자 이상
- 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성
##### 이메일은 정규식으로 유효성검사
```javascript
const regExp=/@/g; 
```
```html
<button disabled={regExp.test(id) && pwd.length>=8?false:true} 
onClick={Signin}>로그인</button>
```
---
#### development 2
- 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동
```javascript
const signup = ()=>{
        fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
            method : "POST",
            headers : {
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify({"email": id, "password": pwd})   //실제 데이터 파싱하여 body에 저장
        }) //.then(res=> res.json())
        .then((response)=>{
        if(response.ok){
        window.alert('회원가입에 성공하셨습니다.')
        navigate('/signin') /*Assignment 2*/
}}
);}
```
- 회원가입버튼 이벤트리스너: Fetch를 이용해 응답 성공시 signin페이지로 이동
---
#### development 3

- 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동
  - 응답받은 JWT는 로컬 스토리지에 저장
```javascript
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
            if(response.access_token)
            {
                localStorage.setItem("access_token", response.access_token); /*Assignment 3 */
                navigate("/todo");
                window.alert('로그인에 성공하셨습니다.')
            }
            else{
                window.alert(`잘못된 로그인입니다: ${response.message}`)}
        })}
```
- 회원가입버튼 이벤트리스너: Fetch를 이용해 토큰 받아올 시 로컬 스토리지에 저장후 .todo 페이지로 이동, 비밀번호가 틀리거나 아이디가 없는 경우 메시지 예외처리
---
#### development 4

- 로그인 여부에 따른 리다이렉트 처리
  - 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트
  - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트
```javascript
    useEffect(() => {
      checkToken();
    }, []);
```
  - 렌더링시 토큰 확인
```javascript
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
      }
```
  - 토큰 유무에 따라 리다이렉트
---
### :: 2. TODO LIST
#### development 5
- `/todo`경로에 접속하면 투두 리스트의 목록
- 목록에서는 TODO의 내용과 완료 여부가 표시
```html
<List>
   {todolist.map((data,index)=>{
   return <Detail key={data.index} todolist={todolist} setTodolist={setTodolist}  index={index} list={data}/ >})}
</List>
```
- 서버에서 받아온 목록 데이터를 이용해 각 항목 렌더링
- Detail component는 밑의 기본 구조를 따름
```html
<li>
  <label>
    <input type="checkbox" />
    <span>TODO 1</span>
  </label>
</li>
<li>
  <label>
    <input type="checkbox" />
    <span>TODO 2</span>
  </label>
</li>
```
---
#### development 6

- TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 구현

<img src="https://github.com/wlsgus93/wanted-pre-onboarding-frontend/assets/35252854/c90e0fff-a257-4287-b750-55732d340356" align="center">

```javascript
const [isUpdate,setIsUpdate]=React.useState(false);
const onUpdate=()=>{
setIsUpdate(!isUpdate)
    }
```
 - 수정 버튼 이벤트 리스터: 업데이트 여부 설정
```html
{isUpdate?<input onChange={(e)=>setModiTodo(e.target.value)} type='text' defaultValue={item_info.todo/}/>:<span>{item_info.todo}</span>}
{isUpdate?<><button onClick={onSubmit}>제출</button><button onClick={onUpdate}>취소</button></>:<><button onClick={onUpdate}>수정</button><button onClick={onDelete}>삭제</button></>}
```
 - isUpdate의 state에 따라 각기 다른 tag 렌더링
---

#### development 7
<img src="https://github.com/wlsgus93/wanted-pre-onboarding-frontend/assets/35252854/c1a6da3a-9e90-4e3f-8f6d-314e98497a14" align="center">

- 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button
- 추가 button을 클릭시 입력 input의 내용이 새로운 TODO로 추가
- TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.
```javascript
      const onAdd=()=>{
        if(todo.length==0){ // 2 
            window.alert("빈 값을 넣을 수 없습니다.")
        }
        else{
            fetch(url+'/todos',{
                method : "POST", 
                headers : {
                    "Content-Type":"application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({"todo": todo })
                }).then(response => response.json())
                .then((result)=>{
                setTodolist([...todolist,result]); //1
                setTodo('') // 3 
            })
        } 
```
  - 추가 버튼 이벤트 리스너
    1. Fetch를 이용해 응답 성공시 기존 todo 리스트 배열에 추가
    2. 입력 값이 빈값일시 입력 못하도록 처리
    3. 입력후 수정 상태 반영

```javascript
const [todolist,setTodolist]=React.useState([]);
    useEffect(() => {
        idRef.current.focus();
        if(!token){
            navigate('/signin')
        }
        else{
            fetch(url+'/todos',{
                method : "GET",          
                headers : { 
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
```
  - TODO 페이지 렌더링 시 토큰 유무에 따라 렌더링하며, 토큰 있을시 todo list 배열에 목록 업데이트 없을시 로그인 페이지로 이동.
---
#### development 8
- 투두 리스트의 삭제, 제출, 취소 기능
```javascript
    const onDelete=()=>{
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
```
  - 삭제 기능
  1. 부모 component(Todo)의 setState함수(setTodolist()) 자식 component(Detail)에 전달
  2. 해당 todo id를 제외한 state(todo list) 업데이트

```javascript
    const onSubmit=()=>{
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
                let temp=temp_list1.map((data,i)=>{
                    return data.id===item_info.id ? {...data, todo:moditodo} : data ;}) // 특정 요소의 값 변경하기
                props.setTodolist([...temp])
                setIsUpdate(!isUpdate)
            })
        }
    }
```
  - 제출버튼 이벤트 핸들러
  1. 기존의 todo list를 map함수를 이용해 해당 to do object의 내용 변경
  2. 버튼 클릭후 수정 상태 반영
  - 취소버튼 : [수정버튼 기능과 동일](#development-6)
### 6. 추후 평가
- 구현 범위가 적고, 기능 구현만 고려하여 클린코드 X
 - 코드 리팩토링 필요
   1. 각각의 스크립트에서 같은 변수 재선언 많음
   2. API를 모듈화 하지 않아 코드 가독성 떨어짐 
   3. 각각의 스크립트에서 같은 기능의 함수 재선언 많음 (유지보수)
   4. 쓸 데 없는 주석이 많음
 - useState의 사용으로 인해 렌더링 횟수 많음=> useRef 고려
 - axios사용으로 api 단순화 및 예외처리 쉽게 변경 고려(작성된 API는 Fetch로 구현)
