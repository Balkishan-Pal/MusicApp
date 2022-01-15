import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"


function Album() {
   
    const [prev, setPrev] = useState(1)
    const [text, setText] = useState("")
    const [all,setAll] = useState([]);
    const [datalist, setdatalist] = useState([])
    const [searchlist, setsearchlist] = useState([])

    useEffect(() => {
        getData()
    }, [prev])

     useEffect(()=>{
         GetAllData()
     },[])


    const GetAllData = async()=>{
        const {data} = await axios.get("http://localhost:2345/all")
        //const res = data.data;
        console.log(data)
    }


    const getData = async () => {
        const {data} = await axios.get(`http://localhost:2345/album?page=${prev}`)
        const bali = data.data.album;
        console.log(bali)
        setdatalist(bali)
        setsearchlist(bali)
    }

    const handlePrev = () => {
        setPrev(p => p - 1)
    }

    const handleNext = () => {
        setPrev(p => p + 1)
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }


    const handlesearchlist = () => {
        const val = datalist.filter((e) => e.albumName.toLowerCase().includes(text.toLowerCase()))
        setsearchlist(val)
        setText("")
    }

    const filtergenre = (e)=>{
         
        const option=e.target.value;
            console.log(option)
              if(option=="sad"){
             const updatedatalist = datalist.filter((ev)=>ev.genre==="sad" )
              setsearchlist(updatedatalist)
              
              }
              if(option=="romantic"){
                const updatedatalist = datalist.filter((ev)=>ev.genre==="romantic" )
                 setsearchlist(updatedatalist)
                 
                 }
                 if(option=="pop"){
                    const updatedatalist = datalist.filter((ev)=>ev.genre==="pop" )
                     setsearchlist(updatedatalist)
                     
                     }
                     if(option=="rock"){
                        const updatedatalist = datalist.filter((ev)=>ev.genre==="rock" )
                         setsearchlist(updatedatalist)
                         
                         }
    

     }


     const newToLow = (e)=>{
         
        const option=e.target.value;
        if(option==="newtoold"){
         const updatedatalist =    [...datalist].sort((a,b)=>  +(b.year) - +(a.year))
         setsearchlist(updatedatalist)
        }
        if(option==="oldtonew"){
         const updatedatalist =    [...datalist].sort((a,b)=>  +(a.year) - +(b.year))
         setsearchlist(updatedatalist)
        }      
     }


    return (
        <>
            <div id="searchbox">
                <input type="text" placeholder="Enter To search Album.........." value={text} onChange={handleChange}/>
                <button id="btn2" onClick={handlesearchlist}>Search</button>
            </div>
            <div id="sorting">
                <select onChange={newToLow}>
                    <option value="">Sort from new to old</option>
                    <option value="newtoold">New To Old</option>   
                    <option value="oldtonew">Old To New</option>      
                </select>
                <select onChange={filtergenre}>
                    <option value="">Filter according to Genre</option>
                    <option value="sad">Sad</option>
                    <option value="pop">Pop</option>
                    <option value="romantic">romantic</option>
                    <option value="rock">rock</option>
                </select>
            </div>
            <div id="album">
                {searchlist.map((e, i) => (
                    <div key={i} className="particulardiv">
                        <NavLink to={`/songs/${e._id}`} style={{ textDecoration: "none" }}>
                            <img id ="imageborder" src={e.pic} alt="picture" width="200px" height="200px"  />
                            <div id="content"> 
                            <h2>{e.albumName}</h2>
                            <p>Artist - {e.artistName}</p>
                            <p>Year Of Release : {e.year}</p>
                            </div>
                        </NavLink>
                    </div>
                ))}

            </div>
            <center id="btn">
                <button onClick={handlePrev} disabled={prev == 1 ? true : false}>Prev</button>
                <button onClick={handleNext} disabled={prev < 2 ? false : true}>Next</button>
            </center>
        </>
    )
}

export { Album }