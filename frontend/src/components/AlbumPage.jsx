import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"


function Album() {
   
    const [prev, setPrev] = useState(1)
    const [text, setText] = useState("")
    const [all,setAll] = useState([]);
    const [datalist, setdatalist] = useState([])
    const [searchlist, setsearchlist] = useState([])
   const [conditions,setConditions] =useState(false);
   const [page,setPage] = useState(0);
   const arr=[];

  for(var i=1;i<=page;i++){
      arr.push(i)
  }


    useEffect(() => {
        getData()
    }, [prev])

     useEffect(()=>{
         GetAllData()
     },[])


    const GetAllData = async()=>{
        const {data} = await axios.get("http://localhost:2345/album/all")
        //const res = data.data;
        setAll(data)
        console.log(data,"data")
        setsearchlist(data)
    }


    const getData = async () => {
        const {data} = await axios.get(`http://localhost:2345/album?page=${prev}`)
        const bali = data.data.album;
        const totalpages = data.data.totalPages;
        setPage(totalpages)
        setdatalist(bali)
        // console.log(bali,"newwedwfw");
        // setsearchlist(bali)
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }


    const handlesearchlist = () => {
        if(text==""){
            return
        }
        const val = all.filter((e) => e.albumName.toLowerCase().includes(text.toLowerCase()))
        setConditions(true)
        setsearchlist(val)
        setText("")
    }

    const filtergenre = (e)=>{
         
        const option=e.target.value;
            console.log(option)
              if(option=="sad"){
             const updatedatalist = all.filter((ev)=>ev.genre==="sad" )
              setdatalist(updatedatalist)
              
              }
              if(option=="romantic"){
                const updatedatalist = all.filter((ev)=>ev.genre==="romantic" )
                 setdatalist(updatedatalist)
                 
                 }
                 if(option=="pop"){
                    const updatedatalist = all.filter((ev)=>ev.genre==="pop" )
                     setdatalist(updatedatalist)
                     
                     }
                     if(option=="rock"){
                        const updatedatalist = all.filter((ev)=>ev.genre==="rock" )
                         setdatalist(updatedatalist)
                         
                         }
    

     }


     const newToLow = (e)=>{
         
        const option=e.target.value;
        if(option==="newtoold"){
         const updatedatalist =    [...all].sort((a,b)=>  +(b.year) - +(a.year))
         setdatalist(updatedatalist)
        }
        if(option==="oldtonew"){
         const updatedatalist =    [...all].sort((a,b)=>  +(a.year) - +(b.year))
         setdatalist(updatedatalist)
        }      
     }


     const handlePrev = () => {
        setPrev(p => p - 1)
    }

    const handleNext = () => {
        setPrev(p => p + 1)
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
                {
                    conditions?
                    <>
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
                    </>
                :<>
                {datalist.map((e, i) => (
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
</>
}
            </div>
            <center id="btn">
                {/* {
                    arr.map((e,i)=>(
                        <button key={i}onClick={()=>setPrev(e)}>{e}</button>
                    ))
                } */}

                <button onClick={handlePrev} disabled={prev<=1?true:false} >Prev</button>
                <button>{prev}/{page}</button>
                {/* <button>{page}</button> */}
                <button onClick={handleNext} disabled={prev>=4?true:false}>next</button>

            </center>
        </>
    )
}

export { Album }