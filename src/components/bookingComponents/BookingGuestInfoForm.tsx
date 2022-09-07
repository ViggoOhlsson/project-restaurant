import { ChangeEvent, useEffect, useState } from "react"
import { IBookingGuestInfo } from "../../models/IBookingGuestInfo"

interface IBookingGuestInfoForm {
    name: string
    email: string
    phone: number
    changeName: (name: string) => void
    changeEmail: (email: string) => void
    changePhone: (num: number) => void
}

export const BookingGuestInfoForm = (props: IBookingGuestInfoForm) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeName(e.target.value)
    }
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeEmail(e.target.value)
    }
    const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
        props.changePhone(parseInt(e.target.value))
    }
    const validateName = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value == "" || e.target.value.length < 2) {
            setNameError("Name required")
            return
        }
        if (e.target.value.length > 64) {
            setNameError("Name too long")
            return
        }
        setNameError("")
    }
    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value == "" ) {
            setEmailError("Email required")
            return
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setEmailError("Invalid email")
            return
        }
        setEmailError("")
    }
    const validatePhone = (e: ChangeEvent<HTMLInputElement>) => {
        if (parseInt(e.target.value) == 0 ) {
            setPhoneError("Phone number required")
            return
        }
        setPhoneError("")
    }

    return <div className="phase-container info-phase">
    <div className="info-container">
      <div>
        <p>What name do you want to book in?</p>
        <input type="text" placeholder="Name" onChange={handleName} onBlur={validateName} value={props.name} ></input>
        {nameError && <p className="error"><i className="fa-solid fa-warning"></i> {nameError}</p>}
      </div>
      <div>
        <p>Where do you want to get the confirmation?</p>
        <input type="email" placeholder="Email" onChange={handleEmail} onBlur={validateEmail} value={props.email} ></input>
        {emailError && <p className="error"><i className="fa-solid fa-warning"></i> {emailError}</p>}
      </div>
      <div>
        <p>How can we contact you?</p>
        <input type="tel" placeholder="Phone number" onChange={handlePhone} onBlur={validatePhone} value={props.phone} ></input>
        {phoneError && <p className="error"><i className="fa-solid fa-warning"></i> {phoneError}</p>}
      </div>
    </div>
  </div>
    
}