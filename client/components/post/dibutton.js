const DiButton = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="primary">
      {text}
      <style jsx>{`
        button {
          font-size: 16px;
          background-color: white;
          color: #013c64;
          margin: 2px;
          margin-right: 15px;
          border-radius: 50px;
          border: 1.5px solid #013c64;
          padding: 6px 12px 6px 12px;
          position: relative;
          overflow: hidden;
        }
        button:hover {
          background-color: #013c64;
          color: white;
        }
      `}</style>
    </button>
  )
}

export default DiButton
