import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styles from "./index.module.css";
import PageTitle from "../../components/helmet";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import UserContext from "../../Context";
import { Link } from "react-router-dom";
import getCookie from "../../utils/getCookie";
import PageLayout from "../../components/page-layout";
import { usernameValidator } from "../../utils/registerValidators";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataService from "../../services/dataService";

const SettingsProfile = () => {
  const context = useContext(UserContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const params = useParams();
  const history = useHistory();
  const [usernameError, setUsernameError] = useState("");
  console.log(context.user);

  const updateUser = async (e) => {
    e.preventDefault();

    if (context.user !== null) {
      if (
        name !== "" &&
        usernameError === "" &&
        context.user.id === params.id
      ) {
        if (bio.length <= 200) {
          await dataService({
            method: "PUT",
            url: `/user/edit/${params.id}`,
            data: { name, bio },
            token: getCookie("auth-token"),
          });

          history.push(`/profile/${params.id}`);
        } else {
          toast.error("The Description should be max 200 character");
        }
      } else {
        toast.error("Please enter valid username");
      }
    }
  };

  const handlerBlurUsername = () => {
    setUsernameError(usernameValidator(name));
  };

  useEffect(() => {
    setName(context?.user?.username);
    setBio(context?.user?.userInfo?.description);
  }, [context]);

  if (!context.user) return <div>loading...</div>;
  return (
    <PageLayout>
      <div className={styles.container}>
        <PageTitle title="Settings | Smile" />
        <ToastContainer transition={Zoom} />
        <form className={styles.form}>
          <Input
            value={name || ""}
            onChange={(event) => setName(event.target.value)}
            onBlur={handlerBlurUsername}
            id="username"
            placeholder="Username"
            error={usernameError}
          />
          <Textarea
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Description"
          />

          <div className={styles.actions}>
            <button onClick={updateUser}>Save changes</button>
            <Link to={`/profile/${params.id}`}>Cancel</Link>
            <Link to="/changePassword">Change password</Link>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default SettingsProfile;
