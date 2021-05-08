import React, { useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styles from './index.module.css'
import PageTitle from '../../components/helmet';
import Input from '../../components/input';
import Textarea from '../../components/textarea';
import UserContext from '../../Context'
import { Link } from 'react-router-dom';
import getCookie from '../../utils/getCookie'
import PageLayout from '../../components/page-layout';
import { usernameValidator } from '../../utils/registerValidators'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SettingsProfile = () => {
    const context = useContext(UserContext)
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const params = useParams()
    const history = useHistory()

    const [usernameError, setUsernameError] = useState('')

    const updateUser = (e) => {
        e.preventDefault();

        if (context.user !== null) {
            if (name !== '' && usernameError === "" && context.user.id === params.id) {
                if (bio <= 200) {
                    fetch(`http://localhost:3333/api/user/edit/${params.id}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': getCookie('auth-token')
                        },
                        body: JSON.stringify({ name, bio })
                    })
                    history.push(`/profile/${params.id}`)
                } else {
                    toast.error('The Description should be max 200 character')
                }
            } else {
                toast.error('Please enter valid username')
            }
        }
    };

    const handlerBlurUsername = () => { setUsernameError(usernameValidator(name)) }

    return (
        <div>
            <PageTitle title="Settings | Smile" />
            <ToastContainer transition={Zoom} />
            <PageLayout>
                <form className={styles.form}>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        onBlur={handlerBlurUsername}
                        id="username"
                        type='login'
                        placeholder="Username"
                        error={usernameError}
                    />
                    <Textarea onChange={(e) => setBio(e.target.value)} placeholder="Bio" />

                    <div className={styles.actions}>
                        <button onClick={updateUser}>Save changes</button>
                        <Link to={`/profile/${params.id}`}>Cancel</Link>
                        <Link to="/changePassword">Change password</Link>
                    </div>
                </form>
            </PageLayout>
        </div>
    )
};

export default SettingsProfile