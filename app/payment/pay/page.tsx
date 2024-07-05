"use client";

const Pay = () => {
    async function handlePay(){
        fetch("http://localhost:3000/api/payment", {
            method: "POST",
        })
        .then(res => {
            console.log(res);
            if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
        })
        .then(({ url, message }) => {
            if(message === "success") window.location = url
        })
        .catch(e => {
            console.error(e.error)
        })
    }

  return (
    <div>
        <h2 className="font-bold text-2xl">Pay</h2>
        <button onClick={handlePay}>Payy</button>
    </div>
  )
}

export default Pay;