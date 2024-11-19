import { useAuth } from '../context/AuthProvider';
import { refreshHttpInstance } from './httpService';

const useRefreshToken = () => {
    const { setAccessToken } = useAuth();

    const refresh = async () => {
        const response = await refreshHttpInstance.post('/refresh-token', {
            withCredentials: true
        });
        setAccessToken(response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
