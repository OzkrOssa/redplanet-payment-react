import { generateAuthCardToken } from "@/lib/generateAuthToken";
import React from "react";

function useBankCards() {
    const fetchBankCards = async () =>{
        const token = generateAuthCardToken()
        const req = await fetch("https://ccapi-stg.paymentez.com/v2/card/list",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Auth-Token": token,
            }
        })

        if (!req.ok){
            console.log(req)
        }

        const cards = await req.json()
        console.log(cards)
    }
    React.useEffect(()=>{
        fetchBankCards()
    },[])
  return <div>useBankCards</div>;
}

export { useBankCards };
