import placeholder from "../assets/placeholder.png";

export default function Plant({ data }) {
  const plantName = data.plant_name || data.common_name || "Unknown Plant";
  
  return (
    <div className="plant-card">
      <div className="card__info">
        <h4>{data.nickname}</h4>
        <p>{plantName}</p>
      </div>
      <div className="card__image">
        {data.image ? (
          <img src={data.image} alt={plantName}></img>
        ) : (
          <img src={placeholder}></img>
        )}
      </div>
    </div>
  );
}
