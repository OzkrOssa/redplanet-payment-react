import PocketBase from "pocketbase";

const pb = new PocketBase("URL_SERVER");

type Pay = {
    subscriber: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    amount: number,
    description: string,
    pay_method: string,
    transaction_id: string,
    transaction_status: string
}

function SavePayment(data: Pay) {
  const record = pb.collection("payments").create<Pay>(data);
  return record;
}

export {SavePayment}