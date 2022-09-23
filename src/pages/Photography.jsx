import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserToken } from '../utils/authToken';


function Photography({ URL, Cart }) {
  const isAuthenticated = !!getUserToken();
  const initForm = {
    title: "",
    name: "",
    image: "",
    location: "",
    exif: "",
    digitalprice: "",
    printprice: "",
  };

  const [photo, setPhoto] = useState([]);

  const [newForm, setNewForm] = useState(initForm);

  const [counter, setCounter] = useState(0);


  const cartCounter = () => {
    setCounter(prevState => prevState + 1)
  };

  const removeFromCart = () => {
    if (counter > 0) {
      setCounter(prevState => prevState - 1)
    }
  };




  const createPhoto = async (photoData) => {
    try {
      await fetch(URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoData)
      });
      getPhoto();
    } catch (error) {

    }
  };

  const getPhoto = async () => {
    try {
      const myPhoto = await fetch(`${URL}photography`);
      const allPhotography = await myPhoto.json();
      setPhoto(allPhotography);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getPhoto(setPhoto);
    }, 1200)
  }, []);

  const handleChange = (event) => {
    const data = ({ ...newForm, [event.target.name]: event.target.value });
    setNewForm(data)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newPhoto = { ...newForm };
      const testingOutput = JSON.stringify(newPhoto);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`
        },
        body: testingOutput
      };
      const response = await fetch(URL + "photography", options);
      await response.json();
      await createPhoto(newForm);
      setNewForm(initForm);
    } catch (error) {

    }
  };

  const loaded = () => {
    return photo.map((photo) => {
      return (
        <div key={photo._id} className='photo-card'>
          <div className='card'>
            <Link className="index-show" to={`/photography/${photo._id}`} >
              <img className='show' src={photo.image} alt={photo.title} />
              <div className='card__details'></div>
              <span className="tag">Nature</span>
              <span className="tag">Photography</span>
            </Link>
            <div className="name">{photo.title}</div>
            <div className='datagrid'>
              <div id='content1'><pre>{photo.name}</pre></div>
              <div id='content2'><pre>{photo.location}</pre></div>
              <div id='content3'><pre>{photo.exif}</pre></div>
              <div id='content4'><button className='button' onClick={() => { cartCounter() }}>{photo.printprice}</button></div>
              <div id='content5'><button className='button' onClick={() => { cartCounter() }}>{photo.digitalprice}</button></div>
              <div id='content6'><button className='button' onClick={() => { removeFromCart() }}>Remove From Cart</button></div>
            </div>
          </div>
        </div>
      )
    })
  };

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
  );

  return (
    <>
      <Link>
        <img className='cart' src="https://cdn3.iconfinder.com/data/icons/e-commerce-2-2/380/1-512.png" alt="" />
      </Link>
      <h3 className='counter'>{counter}</h3>
      <section className="photo-list">
        {photo && photo.length ? loaded() : loading()}
      </section>
      <div className='Add'>
        {isAuthenticated && <section className='add-photo'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name' aria-hidden="true">Image: </label>
            <input
              type="text"
              name="image"
              placeholder="Add Your Image"
              onChange={handleChange}
              value={newForm.image}
            />
            <label htmlFor='title' aria-hidden="true">Title: </label >
            <input
              type="text"
              name="title"
              placeholder="Add Photo Title"
              onChange={handleChange}
              value={newForm.title}
            />
            <label htmlFor='title' aria-hidden="true">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Add Your Name"
              onChange={handleChange}
              value={newForm.name}
            />
            <label htmlFor='title' aria-hidden="true">Location:</label>
            <input
              type="text"
              name="location"
              placeholder="Add Photo Location"
              onChange={handleChange}
              value={newForm.location}
            />
            <label htmlFor='title' aria-hidden="true">Exif Data:</label>
            <input
              type="text"
              name="exif"
              placeholder="Add Photo Exif Data"
              onChange={handleChange}
              value={newForm.exif}
            />
            <label htmlFor='title' aria-hidden="true">Digital Print</label>
            <input
              type="text"
              name="digitalprice"
              placeholder="Add Digital Photo Price"
              onChange={handleChange}
              value={newForm.digitalprice}
            />
            <label htmlFor='title' aria-hidden="true">Print Price</label>
            <input
              type="text"
              name="printprice"
              placeholder="Add Photo Print Price"
              onChange={handleChange}
              value={newForm.printprice}
            />
            <input type="submit" value="Add Photo" />
          </form>
        </section>}
      </div>
    </>
  )
};

export default Photography;
