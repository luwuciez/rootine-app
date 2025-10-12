import { useState, useRef } from "react";
import "../App.css";

function AddPlantForm() {
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef();

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  }

  function handleBoxClick() {
    fileInputRef.current.click(); 
  }

  return (
    <div className="form-container">

      <form>

     {/* Add Photo input */}
        <div className=" photo-upload">
        <div className="photo-preview" onClick={handleBoxClick}>
            {photo ? (
            <img src={photo} alt="Plant preview" />
            ) : (
            <img
                src="../src/assets/upload_Photo.svg" 
                alt="Placeholder plant"
                className="photo-placeholder-img"
            />
            
            )}
        </div>
        <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
            style={{ display: "none" }}
        />
        </div>


    {/* Name Your Plant */}
        <div className="form-control-stack">
            <label className="form-title" >Name Your Plant:</label>
            <div className="input-stack">
                <input className="form-input" name="name" type="text" placeholder="Plant Name" />
                <input className="form-input" name="nickname" type="text" placeholder="Nickname" />
            </div>
        </div>

        
        <br></br>
    {/* Plant Location */}
        <div className="form-control">
          <label className="form-title">Plant Location:</label>
          <input className="form-input" name="location" type="text" placeholder="Room" />
        </div>

    {/* Watering Schedule */}
        <div className="form-control">
          <label className="form-title">Watering Schedule:</label>
          <input className="form-input" name="water-sched" type="date" />
        </div>

    {/* Sunlight */}
        <div className="form-control">
          <label className="form-title">Sunlight:</label>
          <input 
            name="sunlight"
            type="radio"
            id="direct-light"
            value="Direct-Light"
          />
          <label htmlFor="direct-light">Direct-light</label>
          <input
            name="sunlight"
            type="radio"
            id="low-light"
            value="Low-Light"
          />
          <label htmlFor="low-light">Low-light</label>
        </div>

        <button className="btn primary">Save</button>
      </form>
    </div>
  );
}

export default AddPlantForm;
