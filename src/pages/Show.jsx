import EditForm from "../components/EditForm"
// import { useParams, Link, useNavigate, } from "react-router-dom"
// import { useState, useEffect } from "react"


// const Show = (URL) => {
//   const [editForm, setEditForm] = useState("")
//   const [photo, setPhoto] = useState(null)
//   const {id}  = useParams()
//   const navigate = useNavigate()
  

//   const getPhoto = async () => {
//     try {
//       const response = await fetch(URL, id)
//       const photographyData = await response.json()
//       setPhoto(photographyData)
//       setEditForm(photographyData)

//     }catch(error){  
//       console.log(error)
//     }
//   }

//   const loaded = () => {
//     return (
//       <div>
//         <h1>Show Page</h1>
//         <h2>{photo.title}</h2>
//         <h2>{photo.name}</h2>
//         <img src={photo.image} alt={photo.title} />
//         <h4>{photo.location}</h4>
//         <p>{photo.exif}</p>
//         <div>
//           <h1>{photo.digitalprice}</h1>
//           <h1>{photo.printprice}</h1>
//         </div>
//       </div>
//     )
//   }

//   const loading = () => {
//     return <h1>Loading......</h1>
//   }

//   const handleChange = (event) => {
//     setEditForm({...editForm, [event.target.name]: event.target.value})
//   }

//   const handleSubmit = async (event) => {
//     console.log("submit fired")
//     event.preventDefault()
//     const options = {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(editForm)
//     }
//     try {
//       console.log(URL)
//       const response = await fetch(URL + id, options)
//       const updatedPhoto = await response.json()

//       setPhoto(updatedPhoto)
//       setEditForm(updatedPhoto)
//     }catch(error){
//       console.log(error)
//     }
//   }

//   const removePhoto = async () => {
//     try {
//       const options = {
//         method: "DELETE"
//       }
//       const response = await fetch(URL + id, options)
//       await response.json()
//       navigate('/')
//     }catch(error){
//       console.log(error)
//       navigate(URL)
//     }
//   }

//   useEffect(() => {
//     getPhoto()
//   }, [])

import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'



const Show = ({ URL }) => {
  const [photo, setPhoto] = useState(null)
  const [editForm, setEditForm] = useState("")

  const navigate = useNavigate()

  const { id } = useParams()

  console.log(editForm)

  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  }



  const updatePhoto = async (event) => {
    event.preventDefault()
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      }
      console.log(editForm)
      const response = await fetch(URL + id, options)
      console.log(response)
      const updatedPhoto = await response.json()
      console.log(updatedPhoto)

      setPhoto(updatedPhoto)
      setEditForm(updatedPhoto)
      console.log(updatedPhoto)

    } catch (err) {
      console.log(err)
      navigate(URL)
    }
  }

  const getPhoto = async () => {
    try {
      const response = await fetch(URL + id)
      const result = await response.json()

      setPhoto(result)
      setEditForm(result)

    } catch (error) {
      console.log(error)
    }
  };


  const removePhoto = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      const response = await fetch(URL + id, options)
      await response.json()
      navigate('/')

    } catch (error) {
      console.log(error)
      navigate(URL)
    }
  }

  // console.log(`Current Person: ${JSON.stringify(person)}`)





  useEffect(() => {
    getPhoto()
  }, [])


    const loaded = () => {
    return (
      <div key={photo._id} className='photo-card-show'>
          <div className='card-show'>
            <Link to={`/photo/${photo._id}`} >
              <img className='show-image' src={photo.image} alt={photo.title} />
            </Link>
              <div className='card__details-show'>
                <span className="tag-show">Nature</span>
                <span className="tag-show">Lake</span>
                <div className="name-show">{photo.title}</div>
                <p className="ptag-show">{photo.name}{photo.exif}{photo.location}</p>
                <button clas>Buy now</button>
              <div className="price-show">{photo.digitalprice} {photo.printprice}</div>
            </div>
          </div>
         </div>
    )
  }

  const loading = () => {
    return <h1>Loading......</h1>
  }

  return <>
    
    {photo ? <EditForm 
      handleChange={handleChange}
      handleSubmit={updatePhoto}
      photographyData={editForm}
      val={`Edit ${photo.title}`}
    /> : null}
    {photo ? loaded() : loading()}
    <div className="button-wrapper">
      <Link className="header-name" to={'/'}>Back Home</Link>
      <button className="delete"
      onClick={removePhoto}
      >Delete Photo</button>
    </div>
    </>



}

export default Show