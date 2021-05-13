const passwordValidator = (password) => {
    if (!password) {
        return "Please enter your password"
    }

    return ''
}

const emailValidator = (email) => {
    if (!email) {
        return "Please enter your email"
    }

    return ''
}

export { passwordValidator, emailValidator }