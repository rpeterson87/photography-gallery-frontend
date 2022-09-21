import EditForm from "../components/EditForm"
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken } from "../utils/authToken"



const Show = ({ URL, getUser, user, isAuthenticated }) => {
  const [photo, setPhoto] = useState(null)
  const [editForm, setEditForm] = useState("")
  const [isOwner, setIsOwner] = useState(false)

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
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`,
        },
        body: JSON.stringify(editForm),
      };
      
      console.log(editForm)
      const response = await fetch(`${URL}photography/${id}`, options)
      console.log(response)
      const updatedPhoto = await response.json()
      console.log(updatedPhoto)

      setPhoto(updatedPhoto)
      setEditForm(updatedPhoto)
      console.log(updatedPhoto)

      
    } catch (err) {
      console.log(err)
      
    }
  }

  const getPhoto = async () => {
    try {
      const response = await fetch(`${URL}photography/${id}`)
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
        method: "DELETE",
        headers: { Authorization: `bearer ${getUserToken()}` },
      };
      const response = await fetch(`${URL}photography/${id}`, options)
      await response.json()
      navigate('/')

    } catch (error) {
      console.log(error)
      navigate('/')
    }
  }

  // console.log(`Current Person: ${JSON.stringify(person)}`)

  useEffect(() => {
    getPhoto()
    getUser()
  }, [])

  useEffect(() => {
    setIsOwner(photo?.owner?._id === user?._id)
  }, [isAuthenticated, photo?._id, isOwner])




  const loaded = () => {
    return (
      <div key={photo._id} className='photo-card-show'>
        <div className='card-show'>
          <Link to={`/photography/${photo._id}`} >
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

  return (
    <>
      {editForm && isOwner ? (<EditForm
        handleChange={handleChange}
        handleSubmit={updatePhoto}
        photographyData={editForm}
        val={`Edit ${photo.title}`}
      />) : null}

      {photo ? loaded() : loading()}

      <div className="button-wrapper">
        <Link className="header-name" to={'/'}>Back Home</Link>
        <button className="delete"
          onClick={removePhoto}
        >Delete Photo</button>
      </div>
    </>
  )
}

export default Show