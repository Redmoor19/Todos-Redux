import {TailSpin} from 'react-loader-spinner';

const useStatus = () => {
    
    const status = (status, data) => {
        switch (status) {
            case "loading":
                return <TailSpin
                        height="80"
                        width="80"
                        color="#000000"
                        radius="0"/>
            case "error": 
                return <h1>Error!</h1>
            default:
                return data;
        }
    }

    return {status};
}

export default useStatus;