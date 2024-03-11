export default function DiButton({ type, text, onClick, color }) {
  return (
    <button type={type} onClick={onClick} color={color}>
      {text}
      <style jsx>{`
        button {
          font-size: 16px;
          background-color: white;
          color: ${color};
          margin: 2px;
          margin-right: 15px;
          border-radius: 50px;
          border: 1.5px solid ${color};
          padding: 6px 12px 6px 12px;
          position: relative;
          overflow: hidden;
        }
        button:hover {
          background-color: ${color};
          color: white;
        }
      `}</style>
    </button>
  )
}
