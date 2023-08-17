import "./card.scss";
/**
 * @param { infoItem } param0
 * (camp) -> Titulo de la información a mostrar;
 * (txt) -> Información a mostrar;
 * @returns item de la lista de Card
 */
const Card__item = ({ infoItem }) => {
  return (
    <li className="c-card__item">
      <span className="c-card__camp">{infoItem.camp}: </span>
      <span className="c-card__text">{infoItem.txt}</span>
    </li>
  );
};

const Card = ({ user }) => {
  const listInfo = [
    { camp: "Email", txt: user.email },
    { camp: "Status", txt: user.status ? "Activo" : "Inactivo" },
    { camp: "Role", txt: user.role },
  ];
  return (
    <div className={`c-card ${user.status ? "" : "c-card--inactive"}`}>
      <header className="c-card__header">
        {
          <img
            className="c-card__img"
            src={user.profileImgUrl ?? `/img/empty-profile-img.png`}
            alt="profile-img"
          />
        }
      </header>
      <h2 className="c-card__title">{user.username}</h2>
      <ul className="c-card__list">
        {listInfo.map((info, idx) => (
          <Card__item key={idx} infoItem={info} />
        ))}
      </ul>
    </div>
  );
};

export default Card;
