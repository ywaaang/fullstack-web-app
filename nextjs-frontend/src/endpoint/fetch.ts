const myFetch: typeof fetch = async (url, params) => {
    const data = await fetch(url, params);
    const res = await data.json();
    if (res && res.error && res.error === 'Unauthorized') {
        console.log('unauthorized')
        location.replace('/login');
    }
    return res;
};

export default myFetch;