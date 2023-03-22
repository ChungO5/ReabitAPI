const API_URI = 'https://reabit.kr/v1';

export const authLogin = async publicId => {
    const response = await fetch(`${API_URI}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            publicId: publicId,
        }),
    });
    const data = await response.json();

    return data;
};

export const getAPI = async (token, method, url, body) => {
    const response = await fetch(`${API_URI}${url}`, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body,
    });
    const data = await response.json();
    return data;
};
