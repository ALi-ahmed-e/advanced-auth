import { useEffect, useRef, useState } from "react"

const VerfiyEmail = () => {



    const fieldsRef = useRef()
    const [state, setState] = useState({ code1: "", code2: "", code3: "", code4: "", code5: "", code6: "" })
    const err = false


    
    // Switch to input fields method
    const inputFocus = (e) => {
        const elements = fieldsRef.current.children
        const dataIndex = +e.target.getAttribute("data-index")
        if ((e.key === "Delete" || e.key === "Backspace")) {
            const next = dataIndex - 1;
            if (next > -1) {
                elements[next].focus()
            }
        } else {

            const next = dataIndex + 1
            if (next < elements.length && e.target.value != " " && e.target.value != "" && e.key.length == 1) {
                elements[next].focus()
            }
        }
    }

    const handleChange = (e, codeNumber) => {
        const value = e.target.value
        setState({ ...state, [codeNumber]: value.slice(value.length - 1) })
    }



    const handleSubmit = () => {
        console.log(state)
    }




    return (
        <div>

            <div className=' text-white max-w-md p-5  w-full  rounded-lg bg-glass bg-gray-800 bg-opacity-50 flex justify-center items-center flex-col'>
                <label className="text-white     mb-5">
                    enter the Verification code sent to your email

                </label>
                <div ref={fieldsRef} className="mt-2 flex items-center gap-x-2">
                    <input type="text" data-index="0" placeholder="0" value={state.code1} className="w-12 h-12 bg-emerald-600 text-white rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
                        onChange={(e) => handleChange(e, "code1")}
                        onKeyUp={inputFocus}
                    />
                    <input type="text" data-index="1" placeholder="0" value={state.code2} className="w-12 h-12 bg-emerald-600 text-white rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
                        onChange={(e) => handleChange(e, "code2")}
                        onKeyUp={inputFocus}
                    />
                    <input type="text" data-index="2" placeholder="0" value={state.code3} className="w-12 h-12 bg-emerald-600 text-white rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
                        onChange={(e) => handleChange(e, "code3")}
                        onKeyUp={inputFocus}
                    />
                    <input type="text" data-index="3" placeholder="0" value={state.code4} className="w-12 h-12 bg-emerald-600 text-white rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
                        onChange={(e) => handleChange(e, "code4")}
                        onKeyUp={inputFocus}
                    />
                    <input type="text" data-index="4" placeholder="0" value={state.code5} className="w-12 h-12 bg-emerald-600 text-white rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
                        onChange={(e) => handleChange(e, "code5")}
                        onKeyUp={inputFocus}
                    />
                    <input type="text" data-index="5" placeholder="0" value={state.code6} className="w-12 h-12 bg-emerald-600 text-white rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
                        onChange={(e) => handleChange(e, "code6")}
                        onKeyUp={inputFocus}
                    />
                </div>

                {err && <p className=" font-normal text-red-500">
                    wrong or expired code
                </p>}
                <button type="submit" onClick={handleSubmit} className=' w-full p-3 mt-5 text-white bg-gradient-to-r from-emerald-600 to-emerald-400 hover:opacity-85 rounded-xl font-semibold'>Submit</button>

            </div>
        </div>
    )
}

export default VerfiyEmail