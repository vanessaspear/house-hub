
export const FilterTask = () => {
    const [categories, setCategories] = useState([])
    const [frequencies, setFrequencies] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then((categoriesArray) => {
                    setCategories(categoriesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/frequencies`)
                .then(res => res.json())
                .then((frequenciesArray) => {
                    setFrequencies(frequenciesArray)
                })
        },
        []
    )
    
    return <></>
}
