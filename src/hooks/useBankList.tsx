import { generateAuthPSEToken } from '@/lib/generateAuthToken';
import { BankList } from '@/types/BankList';
import React from 'react'

function useBankList() {
    const [bankList, setBankList] = React.useState<BankList>({
        banks: [],
      });

      const getBankList = async () => {
        const token = generateAuthPSEToken();
        const response = await fetch(
          "https://noccapi-stg.paymentez.com/banks/PSE",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": token,
            },
          }
        );
    
        if (!response.ok) {
          console.log(response);
        }
    
        const b: BankList = await response.json();
        setBankList(b);
      };
    
    React.useEffect(()=>{
        getBankList()
    },[])

  return bankList
}

export default useBankList