import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Animal } from "./Animal"
import { IAnimal } from "./IAnimal"
import { Div } from "./styles/Div"

export const Animals = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([])

    useEffect(() => {
        if(localStorage.getItem("Animals")) return;

        axios.get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
            .then((Response) =>   {
                localStorage.setItem("Animals", JSON.stringify(Response.data))
                setAnimals(Response.data)
            })            
    })

    useEffect(() => {
        if(animals.length > 0) return;

        if(localStorage.getItem("Animals")) {
            let animalList = JSON.parse(localStorage.getItem("Animals") || "")
            setAnimals(animalList)
        }
    }) 

    let animalPresentation = animals.map((a) => {
        let animalId = `/Animal/${a.id}`
        return (
            <Link to={animalId} key={a.id}>
                <Div>
                    <h3>{a.name}</h3>
                    <p>{a.shortDescription}</p>
                </Div>
            </Link>
        )
    })

    return (<>
        {animalPresentation}
    </>)
}