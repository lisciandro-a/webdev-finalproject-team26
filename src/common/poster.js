
function Poster({poster}) {
  return ( poster ? 
    <img
      src={`https://simkl.in/posters/${poster}_m.webp`}
      alt=""
      className="img-size"
    /> : <></>
  );
}

export default Poster;