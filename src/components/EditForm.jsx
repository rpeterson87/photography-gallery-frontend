const EditForm = ({ handleSubmit, handleChange, photographyData, val }) => {
  return (
    <div >
      <form onSubmit={handleSubmit} >
        <label aria-hidden="true" >Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Photo Title"
          onChange={handleChange}
          value={photographyData.title}
        />
        <label aria-hidden="true" >Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Photogrphers Name"
          onChange={handleChange}
          value={photographyData.name}
        />
        <label aria-hidden="true" >Image</label>
        <input
          type="text"
          name="image"
          placeholder="Enter Image"
          onChange={handleChange}
          value={photographyData.image}
        />
        <label aria-hidden="true" >Location</label>
        <input
          type="text"
          name="location"
          placeholder="Enter Photo Location"
          onChange={handleChange}
          value={photographyData.location}
        />
        <label aria-hidden="true" >Exif Data</label>
        <input
          type="text"
          name="exif"
          placeholder="Enter Photo EXIF Info"
          onChange={handleChange}
          value={photographyData.exif}
        />

        <label aria-hidden="true" >Digital Print</label>
        <input
          type="text"
          name="digitalprice"
          placeholder="Enter Online Photo Price"
          onChange={handleChange}
          value={photographyData.digitalprice}
        />
        <label aria-hidden="true" >Print Price</label>
        <input
          type="text"
          name="printprice"
          placeholder="Enter Photo Print Price"
          onChange={handleChange}
          value={photographyData.printprice}
        />
        <input type="submit" value={val} />
      </form>
    </div>
  )
};

export default EditForm;