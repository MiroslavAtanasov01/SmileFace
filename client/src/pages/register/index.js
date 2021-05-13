import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import Logo from '../../components/logo'
import { Link } from 'react-router-dom'
import Footer from '../../components/footer'
import PageTitle from '../../components/helmet'
import { rePasswordValidator, passwordValidator, usernameValidator, emailValidator } from '../../utils/registerValidators'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../services/dataService'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const RegisterPage = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [rePasswordError, setRePasswordError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const classes = useStyles()

    const onSubmit = async (e) => {
        e.preventDefault()

        if (email && username && password && rePassword && password === rePassword
            && emailError === "" && usernameError === "" && passwordError === "" && rePasswordError === "") {
            try {
                const promise = await dataService({
                    method: 'POST', url: '/user/register',
                    data: { email, username, password, rePassword }
                })
                const authToken = promise.headers.get('Authorization')
                document.cookie = `auth-token=${authToken}`
                const response = await promise.json()

                if (response.email && authToken) {
                    context.logIn({ email: response.email, id: response._id })
                    history.push(`/`)
                } else {
                    toast.error(response.error)
                }
            } catch (err) {
                return err
            }
        } else {
            toast.error('Please enter valid credentials')
        }
    }

    const handlerBlurEmail = () => { setEmailError(emailValidator(email)) }
    const handlerBlurUsername = () => { setUsernameError(usernameValidator(username)) }
    const handlerBlurPassword = () => { setPasswordError(passwordValidator(password)) }
    const handlerBlurRePassword = () => { setRePasswordError(rePasswordValidator(password, rePassword)) }
    const handleClickShowPassword = () => { setShowPassword(!showPassword) }
    const handleClickShowRePassword = () => { setShowRePassword(!showRePassword) }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <PageTitle title="Login | SmileFace" />
            <ToastContainer transition={Zoom} />
            <div className={classes.paper}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <form noValidate onSubmit={onSubmit} className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={emailError ? emailError : 'Email Address'}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={handlerBlurEmail}
                        error={emailError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label={usernameError ? usernameError : 'Username'}
                        name="username"
                        autoComplete="username"
                        onChange={(event) => setUsername(event.target.value)}
                        onBlur={handlerBlurUsername}
                        error={usernameError}
                    />
                    <FormControl fullWidth variant="outlined" error={passwordError} required margin="normal">
                        <InputLabel>{passwordError ? passwordError : 'Password'}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(event) => setPassword(event.target.value)}
                            onBlur={handlerBlurPassword}
                            labelWidth={passwordError ? 380 : 85}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" error={rePasswordError} required margin="normal">
                        <InputLabel>{rePasswordError ? rePasswordError : 'Re-Password'}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-repassword"
                            type={showRePassword ? 'text' : 'password'}
                            onChange={(event) => setRePassword(event.target.value)}
                            onBlur={handlerBlurRePassword}
                            labelWidth={rePasswordError ? 225 : 110}
                            name='password'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowRePassword}
                                        edge="end"
                                    >
                                        {showRePassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>Sign Up </Button>
                    <Grid container>
                        <Grid item xs> </Grid>
                        <Grid item ><Link to="/login" variant="body2">Already have an account? Sign in</Link> </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={9}>
                <Footer />
            </Box>
        </Container>
    )
}

export default RegisterPage