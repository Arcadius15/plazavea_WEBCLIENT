import {useCallback, useEffect, useNavigate} from 'react'

const Navegador = (link) => {
    const navigate = useNavigate()

    const redirect = useCallback(
        () => navigate('/' + link),
        [navigate,link]
    );

    useEffect(() => {
        redirect()
    }, [redirect])

}

export default Navegador