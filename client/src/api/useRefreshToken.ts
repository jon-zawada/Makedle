import { useAuth } from '../context/AuthProvider';
import { refreshHttpInstance } from './httpService';

const useRefreshToken = () => {
    const { setAuthToken } = useAuth();

    const refresh = async () => {
        const response = await refreshHttpInstance.post('/refresh-token', {
            withCredentials: true
        });
        setAuthToken(response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
