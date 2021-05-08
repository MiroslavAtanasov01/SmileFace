const dataService = async ({ method, url, data, token }) => {
    try {
        const promise = await fetch(`http://localhost:3333/api${url}`, {
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