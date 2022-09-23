import EditForm from "../components/EditForm";
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserToken } from "../utils/authToken";


const Show = ({ URL, getUser, user, isAuthenticated }) => {
  const [photo, setPhoto] = useState(null);
  const [editForm, setEditForm] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [counter, setCounter] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const cartCounter = () => {
    setCounter(prevState => prevState + 1)
  };

  const removeFromCart = () => {
    if (counter > 0) {
      setCounter(prevState => prevState - 1)
    }
  };

  const updatePhoto = async (event) => {
    event.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`,
        },
        body: JSON.stringify(editForm),
      };

      const response = await fetch(`${URL}photography/${id}`, options);

      const updatedPhoto = await response.json();

      setPhoto(updatedPhoto);
      setEditForm(updatedPhoto);
      navigate(`/photography/${id}`, { replace: true });

    } catch (err) {
      console.log(err);
      navigate(`/photography/${id}`, { replace: true });
    }
  };

  const getPhoto = async () => {
    try {
      const response = await fetch(`${URL}photography/${id}`);
      const result = await response.json();

      setPhoto(result)
      setEditForm(result)

    } catch (error) {
      console.log(error);
    }
  };


  const removePhoto = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: { Authorization: `bearer ${getUserToken()}` },
      };
      const response = await fetch(`${URL}photography/${id}`, options);
      await response.json();
      navigate('/');

    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };

  useEffect(() => {
    getPhoto();
    getUser();
  }, []);

  useEffect(() => {
    setIsOwner(photo?.owner?._id === user?._id);
  }, [isAuthenticated, photo?._id, isOwner]);




  const loaded = () => {
    return (
      <>
        <Link>
          <img className='cart' src="https://cdn3.iconfinder.com/data/icons/e-commerce-2-2/380/1-512.png" alt="" />
        </Link>
        <h3 className='counter'>{counter}</h3>
        <div key={photo._id} className='photo-card-show'>
          <div className='card-show'>
            <Link to={`/photography/${photo._id}`} >
              <img className='show-image' src={photo.image} alt={photo.title} />
            </Link>
            <div className='card__details-show'>
              <span className="tag-show">Nature</span>
              <span className="tag-show">Photography</span>
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
        </div>
      </>
    )
  };

  const loading = () => {
    return <h1>Loading......</h1>
  };

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
        <button className="delete"
          onClick={removePhoto}
        >Delete Photo</button>
        <Link className="header-name" to={'/'}>Back Home</Link>
      </div>
    </>
  )
};

export default Show;