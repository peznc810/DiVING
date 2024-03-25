export default function DefaultButton({ type, text, onClick, color }) {
  return (
    <>
      <button type={type} onClick={onClick} color={color} className="special">
        {text}
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <style jsx>{`
        .special {
          margin: 2px;
          margin-right: 15px;
          border-radius: 50px;
          display: inline-block;
          position: relative;
          z-index: 1;
          min-width: 200px;
          background: #ffffff;
          border: 1.5px solid ${color};
          color: ${color};
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          overflow: hidden;
          transition: 0.5s;
          padding: 10px 20px;
        }
        .special span {
          position: absolute;
          width: 25%;
          height: 100%;
          background-color: ${color};
          transform: translateY(150%);
          border-radius: 50%;
          left: calc((var(--n) - 1) * 25%);
          transition: 0.5s;
          transition-delay: calc((var(--n) - 1) * 0.1s);
          z-index: -1;
        }
        .special:hover {
          color: #fff;
        }
        .special:focus {
          color: #fff;
          background-color: ${color};
        }
        .special:hover span {
          transform: translateY(0) scale(2);
        }
        .special span:nth-child(1) {
          --n: 1;
        }
        .special span:nth-child(2) {
          --n: 2;
        }
        .special span:nth-child(3) {
          --n: 3;
        }
        .special span:nth-child(4) {
          --n: 4;
        }
      `}</style>
    </>
  )
}
/*<!-- HTML !-->
<button class="button-71" role="button">Button 71</button>

.button-71 {
  background-color: #0078d0;
  border: 0;
  border-radius: 56px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 18px;
  font-weight: 600;
  outline: 0;
  padding: 16px 21px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-71:before {
  background-color: initial;
  background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
  border-radius: 125px;
  content: "";
  height: 50%;
  left: 4%;
  opacity: .5;
  position: absolute;
  top: 0;
  transition: all .3s;
  width: 92%;
}

.button-71:hover {
  box-shadow: rgba(255, 255, 255, .2) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .button-71 {
    padding: 16px 48px;
  }
} */
