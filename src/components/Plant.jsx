import placeholder from "../assets/placeholder.png";

export default function Plant({ data }) {
    return (
        <div className="plant-card">
            <div className="card__info">
                {data.nickname ? <h4>{`"${data.nickname}"`}</h4> : <h4>{data.common_name}</h4>}
                <p className="scientific-name">{data.scientific_name}</p>
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
