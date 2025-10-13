import placeholder from "../assets/placeholder.png";

export default function Plant({ data }) {
  return (
    <div className="plant-card">
      <div className="card__info">
        <h4>{data.nickname}</h4>
        <p>{data.common_name}</p>
      </div>
      <div className="card__image">
        {data.image ? (
          <img src={data.image} alt={data.common_name}></img>
        ) : (
          <img src={placeholder}></img>
        )}
      </div>
    </div>
  );
}
