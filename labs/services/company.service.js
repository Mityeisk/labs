const url = 'http://localhost:8000/'

const postData = async (url, data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
};

const getAllData = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    });
    return await response.json();
};

export const postCompany = (company) => {
    postData(`${url}company`, company).then('Saved Successful')
}

export const getCompanies = async () => {
    return await getAllData(`${url}company`)
}