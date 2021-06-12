import { Avatar, Button, Container, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Lock, LockOpenOutlined, Person, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { AUTH_LOGIN } from '../../redux/type';
import useStyles from './style';


const Login = () => {
    const initial = { type:'', value:null, isValid: false, userMessageError:'Username is required', passMessageError: 'Password is required' }; 
    const classes = useStyles();
    const [lock, setLock] = useState(false);
    const [checkValidation, setCheckValidation] = useState(false);
    const [username, setUsername] = useState(initial);
    const [password, setPassword] = useState(initial);
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useAuth();


    useEffect(()=>{
        if(auth && auth.loggedin){
            history.replace('/home');
        }
    }, [auth])

    const handleInput = (e) => {
        let { name, value } = e.target;
        
        switch(name){
            case 'username':
                if(!value || value.length === 0){
                    setUsername((prev) => ({ ...prev, value, type:'username', isValid: false}));
                    return;
                }
                setUsername((prev) => ({ ...prev, type: 'username', value:'', isValid: true }));
                return;
            case 'password':
                if(!value || value.length === 0){
                    setPassword((prev) => ({ ...prev, value:'', type:'password', isValid: false}));
                    return;
                }
                setPassword((prev) => ({ ...prev, type: 'password', value, isValid: true}));
                return;
        }
    }

    const validateForm = () => {
        setCheckValidation(true);
        return username.isValid && password.isValid;
    }

    const submit = (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        dispatch({ type: AUTH_LOGIN, data: {username: username.value, password: password.value} });
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>
                <TextField
                    id="username"
                    name="username"
                    fullWidth
                    variant="outlined"
                    className={classes.inputText}
                    onChange={handleInput}
                    value={username.value}
                    error={ checkValidation && !username.isValid}
                    helperText={ checkValidation && !username.isValid ? username.userMessageError : ''}
                    InputProps={{
                        type:'text',
                        placeholder:"Username",
                        startAdornment:(
                            <InputAdornment>
                                <Person/>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id="password"
                    name="password"
                    fullWidth
                    variant='outlined'
                    value={password.value}
                    onChange={handleInput}
                    error={checkValidation && !password.isValid}
                    helperText={ checkValidation && !password.isValid ? password.passMessageError : ''}
                    InputProps={{
                        type: !lock ? 'password' :'text',
                        placeholder:"password",
                        startAdornment:(
                            <InputAdornment>
                                <Lock/>
                            </InputAdornment>
                        ),
                        endAdornment:(
                            <InputAdornment>
                                <div onClick={()=> setLock(prev => !prev)} style={{ cursor: 'pointer' }}>{ !lock ? (<Visibility/>):(<VisibilityOff/>)}</div>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;