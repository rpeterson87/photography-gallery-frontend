import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getUserToken } from '../utils/authToken'


function Photography({ URL }) {
  const isAuthenticated = !!getUserToken()
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
    const [photo, setPhoto] = useState([]);
    //  This is the state with an object
    const [newForm, setNewForm] = useState(initForm);
    // initial state for when the dom mounts 
    




    const createPhoto = async (photoData) => {
        try {
            await fetch(URL, {
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
            const myPhoto = await fetch(`${URL}photography`);
            const allPhotography = await myPhoto.json();
            setPhoto(allPhotography);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(photo);

    useEffect(() => {
      setTimeout(() => {
        getPhoto(setPhoto);
      }, 1200)
    }, []);

    const handleChange = (event) => {
        const data = ({ ...newForm, [event.target.name]: event.target.value })
        setNewForm(data)
    }
    // state in react is immutable 
    // we are required to pass a new value with each set 

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const newPhoto = { ...newForm }
          const testingOutput = JSON.stringify(newPhoto)
          const options = {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
              "Authorization" : `bearer ${getUserToken()}`
            },
            body: testingOutput
          }
          const response  = await fetch(URL + "photography", options)
          const responseData = await response.json()
          console.log(responseData)
          await createPhoto(newForm)
          setNewForm(initForm)
        }catch(error){

        }
    }
    console.log(newForm)

  const loaded = () => {
    return photo.map((photo) => {
      return (
        <div key={photo._id} className='photo-card'>
          <div className='card'>
            <Link to={`/photography/${photo._id}`} >
              <img className='show' src={photo.image} alt={photo.title} />
            
              <div className='card__details'>
                <span className="tag">Nature</span>
                <span className="tag">Lake</span>
                <div className="name">{photo.title}</div>
                <p>{photo.name}{photo.exif}{photo.location}</p>
                <button>Buy now</button>
              <div className='price'>{photo.digitalprice} {photo.printprice}</div>
            </div>
            </Link>
          </div>
         </div>
      )
    })
  } 
  const loading = () => (
    <section className="photo-list">
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

    <section className="photo-list">
      {photo && photo.length ? loaded() : loading()}
    </section>
    
    <div className='Add'>
    { isAuthenticated && <section className='add-photo'>
      <h3>Add Your Photo</h3>
      <form onSubmit={handleSubmit}>
        <label >
          <span>Image: </span>
          <input 
          type="text"
          name="image"
          placeholder="Add Your Image"
          onChange={handleChange}
          value={newForm.image}
          />
        </label>
        <label >
          <span>Title: </span>
          <input 
          type="text"
          name="title"
          placeholder="Add Photo Title"
          onChange={handleChange}
          value={newForm.title}
          />
        </label >
        <label >
          <span>Name: </span>
          <input 
          type="text"
          name="name"
          placeholder="Add Your Name"
          onChange={handleChange}
          value={newForm.name}
          />
        </label>
        <label >
          <span>Location: </span>
          <input 
          type="text"
          name="location"
          placeholder="Add Photo Location"
          onChange={handleChange}
          value={newForm.location}
          />
        </label>
        <label >
          <span>Exif Data: </span>
          <input 
          type="text"
          name="exif"
          placeholder="Add Photo Exif Info"
          onChange={handleChange}
          value={newForm.exif}
          />
        </label>
        <label >
          <span>Digital Print: </span>
          <input 
          type="text"
          name="digitalprice"
          placeholder="Add Digital Photo Price"
          onChange={handleChange}
          value={newForm.digitalprice}
          />
        </label>
        <label >
          <span>Print Price </span>
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
    </section>}
    </div>
    </>
  )
}

export default Photography
