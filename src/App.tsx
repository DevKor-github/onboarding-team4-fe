import { useState } from 'react'
import './index.css'

function App() {
  const [isModalShow, setIsModalShow] = useState(false);


  const Modal = () => {
    return (
      <div
      className=" absolute backdrop-blur-md backdrop-opacity-70 backdrop-brightness-50 h-screen w-screen flex items-center justify-center "
      onClick={() => setIsModalShow(false)}
    >
      <div className="w-200 h-140 bg-white outline-1 p-10">
        <button onClick={() => setIsModalShow(false)}>✖</button>
        <section className="modal-section">
          <h4>Click the button bellow to accept our amazing offer!</h4>
        </section>
      </div></div>
    );
  };

  const ModalButton = () => (
    <div className="content-body">
      <div className="modal-button">
        <button onClick={() => setIsModalShow(true)}>Show offer</button>
      </div>
    </div>
  );

  return (
    <>
      {isModalShow ? (
        <>
          <Modal />
        </>
      ):null}
      <ModalButton />
    </>
  )
}


export default App
