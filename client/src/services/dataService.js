const dataService = async ({ method, url, data, token }) => {
    try {
        const promise = await fetch(`https://smile-face-app.herokuapp.com/api${url}`, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `${token}` : null
            }
        })
        return promise
    } catch (error) {
        return error;
    }
}

export default dataService