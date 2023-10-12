import { useState } from 'react';
import './App.css';

export default function App() {
  const [cc_number, setCCNumber] = useState("");
  const [cc_verifCode, setCCV] = useState("");

  const [cc_numberError, setCCNumberError] = useState("");
  const [cc_verifCodeError, setCCVError] = useState("");

  const [termAgree, setTermAgree] = useState(false)
  const [termAgreeError, setTermAgreeError] = useState("")

  const [amount, setAmount] = useState(1)

  const handleCCNumber = (event) => {
    var filteredNumber = event.target.value.replace(/\D/g, '')
    if (filteredNumber.length > 16) {
      filteredNumber = filteredNumber.slice(0, 16);
    }
    setCCNumber(filteredNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim());

    if(filteredNumber.length < 16) {
      setCCNumberError("Credit card number must have 16 digits")
    } else {
      setCCNumberError("")
    }
  }

  const handleCCV = (event) => {
    var filteredNumber = event.target.value.replace(/\D/g, '')
    if (filteredNumber.length > 3) {
      filteredNumber = filteredNumber.slice(0, 3);
    }
    setCCV(filteredNumber);

    if(filteredNumber.length < 3) {
      setCCVError("Credit card verification code must have 3 digits")
    } else {
      setCCVError("")
    }
  }

  const handleTermAgree = () => {
    if(termAgree) {
      setTermAgree(false)
    } else {
      setTermAgree(true)
      setTermAgreeError("")
    }
  }

  const termAgreeText = () => {
    window.alert("Don't input real data, even though this was made for fun.")
  }

  const submit = () => {
    if (termAgree && cc_number && cc_verifCode) {
      setTermAgreeError("")
      window.alert("We will send " + AmountConvert(amount) + " to " + cc_number + " (" + cc_verifCode + ") shortly!")

      setCCNumber("")
      setCCV("")
      setTermAgree(false)
    } else {
      cc_number ? setCCNumberError("") : setCCNumberError("Please fill in the fields!")
      cc_verifCode ? setCCVError("") : setCCVError("Please fill in the fields!")
      setTermAgreeError("Please agree to our terms and conditions!")
    }
  }

  return (
    <div className="bg-animation w-screen h-screen flex justify-center items-center">
      <form className="xl:w-1/4 lg:w-1/3 md:w-2/5 w-full mx-5 bg-white rounded-lg p-6 flex flex-col gap-3">

        <div className="w-full flex flex-col">
          <span className="md:text-lg text-lg font-bold">Get Money Easily</span>
          <span className="md:text-sm text-xs text-gray-400">supported by !not_a_scam</span>
        </div>

        <label>
          {cc_numberError && <span className="md:text-sm text-xs text-red-300">{cc_numberError}</span>}
          <TextField placeholder={"Credit Card Number"} type={"text"} value={cc_number} onChange={handleCCNumber} />
        </label>
        
        <label>
          {cc_verifCodeError && <span className="md:text-sm text-xs text-red-300">{cc_verifCodeError}</span>}
          <TextField placeholder={"CCV Code"} type={"password"} value={cc_verifCode} onChange={handleCCV} />
        </label>

        <div>
          {termAgreeError && <span className="md:text-sm text-xs text-red-300">{termAgreeError}</span>}
          <div className="flex flex-row w-full md:text-sm text-xs text-gray-400 items-center">
            <input className="md:w-4 md:h-4 h-3 w-3 md:mr-2 mr-1 hover:cursor-pointer" type="checkbox" checked={termAgree} onChange={handleTermAgree} />
            I agree to the&nbsp;<span onClick={termAgreeText} className="text-blue-500 hover:cursor-pointer hover:text-blue-700 transition duration-300" href="https://github.com/Nucizz">terms and conditions</span>.
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-col gap-1">
            
            <span className="font-medium text-base sm:text-sm">Select redeem amount</span>

            <div className="flex flex-row items-center md:text-base text-sm">
              <input className="md:w-4 md:h-4 h-3 w-3 mr-2 hover:cursor-pointer" type="radio" checked={amount === 1} onChange={() => setAmount(1)} />
              $100
            </div>

            <div className="flex flex-row items-center md:text-base text-sm">
              <input className="md:w-4 md:h-4 h-3 w-3 mr-2 hover:cursor-pointer" type="radio" checked={amount === 2} onChange={() => setAmount(2)} />
              $250
            </div>

            <div className="flex flex-row items-center md:text-base text-sm">
              <input className="md:w-4 md:h-4 h-3 w-3 mr-2 hover:cursor-pointer" type="radio" checked={amount === 3} onChange={() => setAmount(3)} />
              $500
            </div>

          </div>
        </div>

        <input className="text-white bg-blue-500 rounded-md md:h-10 h-9 w-full text-white font-semibold hover:cursor-pointer hover:bg-blue-700 transition duration-300 mt-3" type="button" value="Submit" onClick={submit} />

      </form>
        
    </div>
  );
}

function TextField({placeholder, type, value, onChange}) {
  return (
    <input className="bg-gray-200 rounded-md w-full md:h-10 h-9 md:text-base text-sm focus:outline-none px-3" placeholder={placeholder} type={type} value={value} onChange={onChange} />
  );
}

function AmountConvert(amount) {
  switch (amount){
    case 1:
      return "$100";
    case 2:
      return "$250";
    case 3:
      return "$500";
    default:
      return "";
  }
}