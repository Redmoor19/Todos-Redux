export const useHttp = () => {
    const request = async (url, method = "GET", body = null, headers = {"Content-Type":"application/json"}) => {
        try {
            const responce = await fetch(url, {method, headers, body});
            if (!responce.ok) {
                throw new Error({status: responce.status, message: responce.message})
            }
            const data = await responce.json();
            return data;
        } catch (e) {
            throw e;
        }
    };
    return {request};
}
