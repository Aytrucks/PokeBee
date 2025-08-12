//Generates the suggest list of pokes based on typed input
const FilterSuggestion = (props) => {
    const [show, setShow] = useState(false)
    const list = props.list

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShow(true)
        }, 700)
        return () =>{
            clearTimeout(timer)
            setShow(false)
        }
    },[list])

    if(list.length === 0 && show){
        return <div>
            No Suggestions Yet!
        </div>
    }
    if(list.length <= 10 && show){
        return <ul>
        {
            list.map(item => 
                <li key={item}>{item}</li>
            )
        }
    </ul>
    }
    
}

export default FilterSuggestion