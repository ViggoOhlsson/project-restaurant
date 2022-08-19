import { useState } from "react"

export function Booking() {

    const [customerName, setCustomerName] = useState("")

    return <>
        <p>Booking View</p>
        <form>
            <input type="text" onInput={setCustomerName(e)}></input>

            Här har vi en form för grejor och saker liksom
        </form>
    </>
}