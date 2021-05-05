import React, { useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styles from './index.module.css'
import PageTitle from '../../components/helmet';
import Input2 from '../../components/input2';
import Textarea from '../../components/textarea';
import UserContext from '../../Context'
import { Link } from 'react-router-dom';
import getCookie from '../../utils/getCookie'
import PageLayout from '../../components/page-layout';

const SettingsProfile = () => {
    const context = useContext(UserContext)
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const params = useParams()
    const history = useHistory()

    const updateUser = (e) => {
        e.preventDefault();

        if (context.user !== null) {
            if (name !== '' && bio !== '' && context.user.id === params.id) {
                fetch(`http://localhost:3333/api/user/edit/${params.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie('auth-token')
                    },
                    body: JSON.stringify({ name, bio })
                })
                history.push(`/profile/${params.id}`)
            }
        }
    };

    return (
        <div>
            <PageTitle title="Settings | Smile" />
            <PageLayout>
                <form className={styles.form}>
                    <Input2 onChange={(e) => setName(e.target.value)} placeholder="Name" />
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