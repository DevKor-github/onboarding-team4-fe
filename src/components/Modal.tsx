function Modal({ title, body, footer } : { title: React.ReactNode, body: React.ReactNode, footer: React.ReactNode }) {
  return (
    <div className="absolute backdrop-blur-md backdrop-opacity-70 backdrop-brightness-50 h-screen w-full flex items-center justify-center p-14">
      <div className="flex flex-col justify-center items-center gap-2 w-200 h-140 bg-white outline-1 px-4 py-3 w-full rounded-lg min-h-40">
        <div className="w-full">
          {title}
        </div>
        <div className="flex-1">
          {body}
        </div>
        <div className="w-full">
          {footer}
        </div>
      </div>
    </div>
  );
}

export default Modal;