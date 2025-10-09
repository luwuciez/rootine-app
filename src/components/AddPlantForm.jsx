function AddPlantForm() {
    return (
        <div className="form-container">
            <h2>New Plant</h2>
            <form>
            <div className="form-control">
                    <label>Name:</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Plant Name"
                    />
                </div>
                <div className="form-control">
                    <label>Nickname:</label>
                    <input
                        name="nickname"
                        type="text"
                        placeholder="Nickname"
                    />
                </div>
                <div className="form-control">
                    <label>Location:</label>
                    <input
                        name="location"
                        type="text"
                        placeholder="room"
                    />
                </div>
                <div className="form-control">
                    <label>Watering Schedule:</label>
                    <input
                        name="water-sched"
                        type="date"
                    />
                </div>
                <div className="form-control">
                    <label>Sunlight:</label>
                    <input
                        name="sunlight"
                        type="radio"
                        id="direct-light"
                        value="Direct-Light"
                    />
                    <label for="direct-light">Direct-light</label>
                    <input
                        name="sunlight"
                        type="radio"
                        id="low-Light"
                        value="Low-Light"
                    />
                    <label for="low-light">Low-light</label>
                </div>
                <button className="btn primary">Save</button>
            </form>
        </div>
    );
}

export default AddPlantForm;