const EditForm = ({handleSubmit, handleChange, photographyData, }) => {
  return (
    <form onSubmit={handleSubmit}>
        <label> 
        <span>Title</span>
        <input 
        type="text" 
        name="title"
        placeholder="Enter Photo Title"
        onChange={handleChange}
        value={photographyData.title}
        />
        </label>
        <label> 
        <span>Name</span>
        <input 
        type="text" 
        name="name"
        placeholder="Enter Photogrphers Name"
        onChange={handleChange}
        value={photographyData.name}
        />
        </label>
        <label> 
        <span>Image</span>
        <input 
        type="text" 
        name="image"
        placeholder="Enter Image"
        onChange={handleChange}
        value={photographyData.image}
        />
        </label>
        <label> 
        <span>Location</span>
        <input 
        type="text" 
        name="location"
        placeholder="Enter Photo Location"
        onChange={handleChange}
        value={photographyData.location}
        />
        </label>
        <label> 
        <span>Exif Data</span>
        <input 
        type="text" 
        name="exif"
        placeholder="Enter Photo EXIF Info"
        onChange={handleChange}
        value={photographyData.exif}
        />
        </label>
        <label> 
        <span>Digital Print</span>
        <input 
        type="number" 
        name="digitalprice"
        placeholder="Enter Online Photo Price"
        onChange={handleChange}
        value={photographyData.digitalprice}
        />
        </label>
        <label> 
        <span>Print Price</span>
        <input 
        type="number" 
        name="printprice"
        placeholder="Enter Photo Print Price"
        onChange={handleChange}
        value={photographyData.printprice}
        />
        </label>
    </form>
  )
}

export default EditForm