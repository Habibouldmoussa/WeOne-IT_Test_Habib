//Importation des composants react
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//Le custom hook useFetch est utiliser pour consommé l'url de l'api 
export function useFetch(url, header) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url) return
        setLoading(true)
        async function fetchData() {
            try {
                const response = await fetch(url, header)
                const data = await response.json()
                setData(data)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoading(false)
            }

        }
        fetchData();

    }, [url])
    return { isLoading, data, error }
}
//ce hook est quand a lui destiné a récuperer un seul item de l'api
export function useFinditem(url, id, header) {
    const [dataItem, setDataItem] = useState({})
    const [isLoadingItem, setLoadingItem] = useState(true)
    const [errorItem, setErrorItem] = useState(false)

    const { isLoading, data, error } = useFetch(url, header);
    if (error) { setErrorItem(true) }
    useEffect(() => {
        if (!url) return
        setLoadingItem(true)
        async function getItem() {
            if (!isLoading) {

                try {
                    const response = await data.find(item => item._id === id)
                    setDataItem(response)
                } catch (err) {
                    console.log(err)
                    setErrorItem(true)
                } finally {
                    setLoadingItem(false)
                }
            }
        }
        getItem();
    }, [data, id, isLoading, url])
    return { isLoadingItem, dataItem, errorItem }
}
//Ce hook sert a changer le titre des page interne de l'application 
export function useTitleChange() {
    const location = useLocation();
    useEffect(() => {
        document.title = `Izeelogo | ${location.pathname} | ${location.id ? location.id : ""}`
    }, [location]);
}

