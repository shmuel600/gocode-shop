import { useState } from "react";

const ToggleText = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(!show)} className='header-btn' >
                {show ? "Hide Text" : "Show Text"}
            </button>
            {show && <span> This is a text</span>}
        </>
    )
}

export default ToggleText;