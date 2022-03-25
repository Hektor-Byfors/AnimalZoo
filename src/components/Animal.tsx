import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IAnimal } from "./IAnimal"
import { IIsAnimalFed } from "./models/IIsAnimalFed"
import { Div } from "./styles/Div"

export const Animal =() => {
    const [animalId, setAnimalId] = useState(0)
    const [animals, setAnimals] = useState<IAnimal[]>([])
    const [isAnimalFed, setIsAnimalFed] = useState(false)
    const [isAnimalFedString, setIsAnimalFedString] = useState("")
    const [feedingDate, setFeedingDate] = useState("")

    let params = useParams()

    const feedAnimal = () => {
        setIsAnimalFed(true)
        setFeedingDate(Date())
    }
    
    useEffect(() => {
        if(params.id) {
            setAnimalId(+params.id)
        }
    },[])

    useEffect(() => {
        if(animals.length > 0) return

        if(localStorage.getItem("Animals")) {
            let animalList = JSON.parse(localStorage.getItem("Animals") || "")
            setAnimals(animalList)
        }
    })

    useEffect(() => {
        if(animals.length > 0 && animalId > 0) {
            animals.map((a) => {
                if(animalId === a.id) {
                    setIsAnimalFed(a.isFed)
                    setFeedingDate(a.lastFed)
                }
            })
        }
    }, [animals])

    useEffect(() => {
        if(isAnimalFed === true) {
            setIsAnimalFedString("ja")
        } else if(isAnimalFed === false) {
            setIsAnimalFedString("nej")
        }
    }, [isAnimalFed])

    let animalPresentation = animals.map((a: IAnimal) => {
        if(a.id === animalId) {
            return(
                <Div key={a.id}>
                    <h2>{a.name}</h2>
                    <p>Namn på latin: {a.latinName}</p>
                    <p>{a.yearOfBirth}</p>
                    <p>Medicin: {a.medicine}</p>
                    <span>
                        <p>Är matad: {isAnimalFedString}</p>
                        <button onClick={feedAnimal} disabled={isAnimalFed}>Mata djur</button>
                    </span>
                    <p>Senast matad: {feedingDate}</p>
                    <p>{a.longDescription}</p>
                </Div>
            )  
        }
    })

    return(<>
        <Link to="/">Tillbaka</Link>
        {animalPresentation}
    </>
    )
}