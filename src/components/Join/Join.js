import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Alert, Button, Col, Container, Form, Input, Row } from 'reactstrap';
import { getCheckId, insertUser, login } from '../../store/users';
import AuthRouter from '../AuthRouter';

const Join = () => {
   const dispatch = useDispatch();
   const [isFail, setIsFail] = useState(false);
   const [text, setText] = useState('');
   const [user, setUser] = useState({
      id: '',
      password: '',
      name: '',
   });
   const navigate = useNavigate();
   //const { insertUsers, users } = useContext(UserContext);
   const onSubmitLogin = async e => {
      e.preventDefault();
      //const findUser = users.find(data => data.userId === user.id);
      if (user.id === '') {
         openAlert('아이디를 입력해주세요');
         return;
      } else if (user.name === '') {
         openAlert('이름을 입력해주세요');
         return;
      } else if (user.password === '') {
         openAlert('비밀번호를을 입력해주세요');
         return;
      }
      const check = await dispatch(getCheckId(user.id)).unwrap();
      if (check) {
         openAlert('이미 존재하는 아이디입니다.');
         return;
      } else {
         await dispatch(insertUser(user));
         await dispatch(login(user));
         navigate('/');
         // insertUsers(users);
         // localStorage.setItem('id', users.length);
      }
   };
   const openAlert = text => {
      setIsFail(true);
      setText(text);
      setTimeout(() => closeAlert(), 3000);
   };
   const closeAlert = () => {
      setIsFail(false);
      setText('');
   };
   const onChangeHandler = e => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };
   return (
      <div className="JoinPage">
         <Container className="bg-light border">
            <Row style={{ rowGap: '1em', padding: '3em' }}>
               <Col xl={12}>
                  <img
                     src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                     alt="Logo"></img>
               </Col>
               <Col xl={12}>
                  <Form onSubmit={onSubmitLogin} className="JoinForm">
                     {isFail ? (
                        <Alert color="warning" toggle={() => closeAlert()}>
                           {text}
                        </Alert>
                     ) : null}
                     <Input type="text" placeholder="ID" name="id" onChange={e => onChangeHandler(e)}></Input>
                     <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={e => onChangeHandler(e)}></Input>
                     <Input type="text" placeholder="name" name="name" onChange={e => onChangeHandler(e)}></Input>
                     <Button type={'submit'} color="primary" block>
                        가입
                     </Button>
                  </Form>
               </Col>
            </Row>
         </Container>
         <Container className="bg-light border">
            <Row style={{ padding: '1em', textAlign: 'center' }}>
               <p>
                  계정이 있으신가요? <a href="/login">로그인</a>
               </p>
            </Row>
         </Container>
         <AuthRouter></AuthRouter>
      </div>
   );
};
export default Join;
