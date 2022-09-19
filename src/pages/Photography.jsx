// import { useEffect, useState } from "react"
// import {Link} from 'react-router-dom'




// const Photography = () => {
//   const URL = process.env.REACT_APP_URL || "http://localhost:4000/";
//   // const [photo, setPhoto] = useState(null)
//   const [photography, setPhotography] = useState(null)
//   const initForm = {
//     title: "",
//     name: "",
//     image: "",
//     location: "",
//     exif: "",
//     digitalprice: "",
//     printprice: "",
//   }
//   // console.log(initForm)
//   const [newForm, setNewForm] = useState(initForm)
//   // console.log(newForm)
//   // console.log(photography)

//   const getPhotography = async () => {

//     console.log(URL)
//     try {
//       const response = await fetch(URL + "photography")
//       console.log(response)
//       const allPhotography = await response.json()
//       console.log(allPhotography)
      
//       setPhotography(allPhotography)
//     }catch(error){
//       console.log(error)
//     }
//   }

//   useEffect(() =>{
//     setTimeout(()=> {
//       getPhotography()
//     }, 1200)
//   }, [])


//   const handleSubmit = async (event) => {
//     event.default()
//     try {
//       const newPhoto = {...newForm}
//       const testing = JSON.stringify(newPhoto)

//       const options = {
//         method: "POST",
//         headers: {
//           "Content-Type" : "application/json"
//         },
//         body: testing
//       }
//       const response = await fetch(URL, options)
//       console.log(response)
//       const responseData = await response.json()
//       console.log(responseData)
//       getPhotography(setPhotography)
//       setNewForm(initForm)

//     }catch(error){
//       console.log(error)
//     }
//   }

//   const handleChange = (event) => {
//     console.log(event.target.value)
//     const data = {...newForm, [event.target.name]: event.target.value}
//     setNewForm(data)
//   }  


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Photography({ URL }) {
    const initForm = {
        title: "",
        name: "",
        image: "",
        location: "",
        exif: "",
        digitalprice: "",
        printprice: "",
    }
    // This is the state 
    const [photo, setPhoto] = useState(null);
    //  This is the state with an object
    const [newForm, setNewForm] = useState(initForm);
    // initial state for when the dom mounts 
    




    const createPhoto = async (photoData) => {
        try {
            const newPhoto = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(photoData)
            })
            getPhoto()
        } catch (error) {

        }
    }
    console.log(URL)
    const getPhoto = async () => {
        try {
            const myPhoto = await fetch(URL);
            const allPhotography = await myPhoto.json();
            setPhoto(allPhotography);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(photo);

    useEffect(() => {
        getPhoto();
    }, []);

    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value })
    }
    // state in react is immutable 
    // we are required to pass a new value with each set 

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createPhoto(newForm)
        setNewForm(initForm)
    }
    console.log(newForm)

  const loaded = () => {
    return photo.map((photo) => {
      return (
        <div key={photo._id}>
          <Link to={`/photo/${photo._id}`} >
          <h1>{photo.title}</h1>
          <h3>{photo.name}</h3>
          <img src={photo.image} alt={photo.title} />
          <h5>{photo.location}</h5>
          <p>{photo.exif}</p>
          <div>{photo.digitalprice} {photo.printprice}</div>
          </Link>
        </div>
      )
    })
  } 
  const loading = () => (
    <section>
      <h1>
        Loading...
        <span>
        <img
            role="presentation"
            alt="spinner logo"
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
         />{" "}
        </span>
      </h1>
    </section>
  )

  return(
    <>
    <section>
      <h2>Add Your Photo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input 
          type="text"
          name="title"
          placeholder="Add Photo Title"
          onChange={handleChange}
          value={newForm.title}
          />
        </label>
        <label>
          <span>Name</span>
          <input 
          type="text"
          name="name"
          placeholder="Add Your Name"
          onChange={handleChange}
          value={newForm.name}
          />
        </label>
        <label>
          <span>Image</span>
          <input 
          type="text"
          name="image"
          placeholder="Add Your Image"
          onChange={handleChange}
          value={newForm.image}
          />
        </label>
        <label>
          <span>Location</span>
          <input 
          type="text"
          name="location"
          placeholder="Add Photo Location"
          onChange={handleChange}
          value={newForm.location}
          />
        </label>
        <label>
          <span>Exif Data</span>
          <input 
          type="text"
          name="exif"
          placeholder="Add Photo Exif Info"
          onChange={handleChange}
          value={newForm.exif}
          />
        </label>
        <label>
          <span>Digital Print</span>
          <input 
          type="text"
          name="digitalprice"
          placeholder="Add Digital Photo Price"
          onChange={handleChange}
          value={newForm.digitalprice}
          />
        </label>
        <label>
          <span>Print Price</span>
          <input 
          type="text"
          name="printprice"
          placeholder="Add Photo Print Price"
          onChange={handleChange}
          value={newForm.printprice}
          />
        </label>
        <input type="submit" value="Add Photo" />
      </form>
    </section>
    <section>
      {photo && photo.length ? loaded() : loading()}
    </section>
    </>
  )
}

export default Photography
