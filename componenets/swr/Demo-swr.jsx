import { ErrorInfo } from '@/componenets/Error';
import UserList from '@/componenets/UserList';
import toast from 'react-hot-toast';
import useSWR from 'swr';


const url = 'http://localhost:3000/users';
const fetcher = async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('fetch' + response.status);
    return await response.json();
}

export function DemoSwr() {
    const { data, error, isLoading, isValidating, mutate} = useSWR(url,fetcher );

    return <>
        <div style={{position: 'absolute', fontSize: 'xxx-large'}}>
            {isLoading && '⌛️'}
            {isValidating && '👁️'}
        </div>
        {error && <ErrorInfo error={error}/>}
        { data && <UserList />}
    
    </>
}