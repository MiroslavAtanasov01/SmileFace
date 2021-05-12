import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import { Link } from 'react-router-dom'
import Footer from '../../components/footer'
import PageTitle from '../../components/helmet'
import { passwordValidator, emailValidator } from '../../utils/loginValidator'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dataService from '../../services/dataService'
import Logo from '../../components/logo'

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
        marginTop: theme.spacing(12),
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

const LoginPage = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles();

    const onSubmit = async (e) => {
        e.preventDefault()

        if (email && password && emailError === '' && passwordError === '') {
            try {
                const promise = await dataService({ method: 'POST', url: '/user/login', data: { email, password } })
                const authToken = promise.headers.get('Authorization')
                document.cookie = `auth-token=${authToken}`
                const response = await promise.json()

                if (response.email && authToken) {
                    context.logIn({ email: response.email, id: response._id })
                    history.push(`/`)
                } else {
                    toast.error('Invalid user e-mail or password!')
                }
            } catch (err) {
                return err
            }
        } else {
            toast.error('Please enter valid credentials')
        }

    }

    const handlerBlurEmail = () => { setEmailError(emailValidator(email)) }
    const handlerBlurPassword = () => { setPasswordError(passwordValidator(password)) }
    const handleClickShowPassword = () => { setShowPassword(!showPassword) }

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
                        error={emailError.length > 0}
                    />
                    <FormControl fullWidth variant="outlined" error={passwordError.length > 0} required margin="normal">
                        <InputLabel>{passwordError ? passwordError : 'Password'}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(event) => setPassword(event.target.value)}
                            onBlur={handlerBlurPassword}
                            labelWidth={passwordError ? 215 : 70}
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
                    <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>Sign In </Button>
                    <Grid container>
                        <Grid item xs> </Grid>
                        <Grid item ><Link to="/register" variant="body2">Don't have an account? Sign Up</Link> </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={25}>
                <Footer />
            </Box>

        </Container>
    )
}

export default LoginPage
