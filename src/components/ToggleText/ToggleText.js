import { useState } from "react";

const ToggleText = () => {
    const [show, setShow] = useState(true);
    return (
        <>
            <button onClick={() => setShow(!show)}>
                {show ? "Hide Text" : "Show Text"}
            </button>
            {show && <span> This is a text</span>}
        </>
    )
}

export default ToggleText;