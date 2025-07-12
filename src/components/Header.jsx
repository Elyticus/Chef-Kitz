import chefMouseImage from "/images/mouse-chef-image.png";

export default function Header() {
  return (
    <header className="header">
      <img
        className="mouse-logo"
        src={chefMouseImage}
        alt="Image of a chef mouse"
      />
      <h1 className="header-name">Chef Kitz</h1>
    </header>
  );
}
