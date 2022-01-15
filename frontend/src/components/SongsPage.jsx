import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { Navbar } from "./Navbar"
import axios from "axios"

function Songs(){
    let {id} = useParams()
    const [Music, setMusic] = useState([])


    useEffect(()=>{
        getSongs()
     
    },[])


    const getSongs = async() =>{
        const {data} = await axios.get(`http://localhost:2345/album/${id}`)
         setMusic(data.data.songs.songs)
    }

    return (
        <>
        <Navbar />
        <div id="songs">
            <h1>Playlist </h1>
            {Music.map((e,i)=>(
                <div key={i} className="songlist">
                    <h4>{e.name}</h4>
                    <h4>Time  - {e.duration}:34</h4>
                </div>
            ))}
        </div>
        </>
    )
}

export {Songs}