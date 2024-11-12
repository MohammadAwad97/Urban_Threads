import ReactDOM  from "react-dom"


function Modal({ children, onClose, actionBar }) {

    return ReactDOM.createPortal(
        <div>
            {/* هون حطينا الاون ديسميس مباشرة , لانو ما في اسطر كود ثانية في الكليك اينفت هاندلر
            لكن اذا كنت بدك تعمل شغلات ثانية غير الاغلاق المودل, مضطر اننك تعرف فوق فنكشين لحاله عشان تكتب فيه
            الاسطر الباقية
            */}
            <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
            <div className="fixed inset-y-44 inset-x-80 p-10 bg-white flex justify-center items-center rounded-lg">
                <div className="h-full w-full flex flex-col justify-between font-semibold text-purple-800">
                {children}
                <div onClick={onClose} className="flex justify-end">
                {actionBar}
                </div>
                </div>
            </div>
        </div>,
        document.getElementById("container")
    )
};

export default Modal;