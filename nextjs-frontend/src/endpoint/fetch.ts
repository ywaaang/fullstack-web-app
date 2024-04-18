const myFetch = async (url: string, params: any) => {
    const data = await fetch(url, params);
    const res = await data.json();
    console.log(res);
    if (res && res.error && res.error === 'Unauthorized') {
        console.log('unauthorized')
        location.replace('/login');
    }
    if (res && res.error) {
        throw new Error(res.error)
    }
    return res;
};

export default myFetch;