import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withAuth = WrappedComponent => {
    const Wrapper = props => {
        const { token } = props
        const router = useRouter()
        useEffect(() => {
            if (!token)
                router.push('/login')
        }, [token])
        return (<WrappedComponent {...props} />)
    }
    return Wrapper
}

export default withAuth


