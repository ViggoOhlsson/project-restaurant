import { useEffect, useState } from "react"
import { IBookingGuestInfo } from "../../models/IBookingGuestInfo"

interface IBookingGuestInfoForm {
    changeBookingGuestInfo(bookingGuestInfo: IBookingGuestInfo): void
}

export const BookingGuestInfoForm = (props: IBookingGuestInfoForm) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)

    useEffect(() => {
        console.log("Changed Guest Info")
        props.changeBookingGuestInfo({
            name: name,
            email: email,
            phone: phone
        })
    }, [email, name, phone])

    return <div className="phase-container info-phase">
    <div className="info-container">
      <div>
        <p>What name do you want to book in?</p>
        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} ></input>
      </div>
      <div>
        <p>Where do you want to get the confirmation?</p>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} ></input>
      </div>
      <div>
        <p>How can we contact you?</p>
        <input type="tel" placeholder="Phone number" onChange={e => setPhone(parseInt(e.target.value))} ></input>
      </div>
    </div>
  </div>
    
}