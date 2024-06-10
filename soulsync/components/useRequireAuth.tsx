import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../database/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useRequireAuth = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (!user.emailVerified) {
                router.push('/verifyEmail');
            }
        }
    }, [user, loading, router]);

    return { user, loading, error };
};

export default useRequireAuth;
