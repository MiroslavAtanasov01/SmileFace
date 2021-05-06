const passwordValidator = (password) => {
    let passwordError = ""

    if (password.length < 8) {
        passwordError = "Password must be at least 8 characters long!"
    }
    if (!/^[\w!@#$%&]+$/.test(password)) {
        passwordError = "Password can only contain english letters, numbers, underscores, !, @, #, $, %, &, ? and *!"
    }
    if (!password) {
        passwordError = "Please enter your password"
    }

    if (password && /^[\w!@#$%&?]+$/.test(password) && password.length >= 8) {
        passwordError = ""
    }

    return passwordError
}

const rePasswordValidator = (password, rePassword) => {
    let rePasswordError = ""

    if (rePassword !== password) {
        rePasswordError = "Both passwords must match!"
    } else {
        rePasswordError = ""
    }

    return rePasswordError
}

const oldPasswordValidator = (oldPassword) => {
    if (!oldPassword) {
        return "Please enter your old password"
    }

    return ''
}

const emailValidator = (email) => {
    const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let emailError = ''

    if (!emailRegex.test(email)) {
        emailError = "Please enter a correct email address"
    }
    if (!email) {
        emailError = "Please enter your email"
    }

    if (email && emailRegex.test(email)) {
        emailError = ""
    }

    return emailError
}

const usernameValidator = (username) => {
    let usernameError = ''

    if (username.length < 3) {
        usernameError = "Username must be at least 3 characters long!"
    }
    if (!/^[\w.]+$/.test(username)) {
        usernameError = "Username can only contain english letters, numbers, underscores and dots!"
    }
    if (!username) {
        usernameError = "Please enter your username"
    }

    if (username && /^[\w.]+$/.test(username) && username.length >= 3) {
        usernameError = ""
    }

    return usernameError
}


export { rePasswordValidator, passwordValidator, usernameValidator, emailValidator, oldPasswordValidator }