export default function TagButton({ type, text, onClick, color }) {
  return (
    <button type={type} onClick={onClick}>
      {text}
      <style jsx>{`
        button {
          margin: 4px 6px;
          font-family: 'Heebo', sans-serif;
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.025rem;
          font-style: normal;
          text-transform: capitalize;
          color: #ffffff;
          background-color: #004080;
          border-radius: 3.6875rem;
          -webkit-border-radius: 3.6875rem;
          -moz-border-radius: 3.6875rem;
          padding: 0.2rem 0.3rem;
          border-style: double;
          border-width: 0.3rem;
          border-color: #0080c0;
          -webkit-box-shadow: 3px 3px 0px 0px rgba(51, 51, 51, 0.14);
          -moz-box-shadow: 3px 3px 0px 0px rgba(51, 51, 51, 0.14);
          -box-shadow: 3px 3px 0px 0px rgba(51, 51, 51, 0.14);
        }
        button:hover {
          color: white;
        }
      `}</style>
    </button>
  )
}
