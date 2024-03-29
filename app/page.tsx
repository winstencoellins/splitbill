'use client'

import Image from "next/image";
import { useState } from "react";

import food from '@/public/image/food.jpeg'

interface Order {
  id: number;
  name: string;
  desc: string;
  amount: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [descriptioin, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [calculate, setCalculate] = useState(false);
  const [totalDeduction, setTotalDeduction] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [deductionPercentage, setDeductionPercentage] = useState('');
  const [deliveryFeePerPerson, setDeliveryFeePerPerson] = useState('');
  
  const [listOfOrder, setListOfOrder] = useState<Order[]>([]);

  function clearInput() {
    let fullname:any = document.querySelector('.fullname')
    let description:any = document.querySelector('.description')
    let amount:any = document.querySelector('.amount')

    fullname.value = ''
    description.value = ''
    amount.value = ''

    setName('')
    setDescription('')
    setAmount('')
  }

  function handleAddToList() {
    let [arr, fullname, desc, price, id] = [listOfOrder, name, descriptioin, amount, listOfOrder.length + 1];

    if (fullname == '') {
      fullname = 'Unknown'
    }

    arr.push({ 'id': id, 'name': fullname, 'desc': desc, 'amount': price });

    setTotalAmount(totalAmount + parseInt(price))

    setListOfOrder(arr);

    clearInput();
  }

  function calculatePercentDeduction() {
    let percentDeduction = (parseInt(totalDeduction) / totalAmount) * 100
    let num = percentDeduction.toFixed()

    setDeductionPercentage(num)
  }

  function calculateDeliveryFeePerPerson() {
    let delivFee = parseInt(deliveryFee) / listOfOrder.length

    setDeliveryFeePerPerson(delivFee.toFixed())
  }

  function handleCalculate() {
    setCalculate(true)
    calculatePercentDeduction()
    calculateDeliveryFeePerPerson()
  }

  function handleRemovePerson() {

  }

  return (
    <div className="max-w-7xl mx-auto flex flex-row">
      <div className="my-10 w-1/3 fixed">
        <div className="flex flex-col mb-5">
          <label className="mb-1">Description</label>
          <input placeholder="Pizza" className="description border-b border-black px-3 py-1 bg-slate-100" onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <div className="flex flex-row mb-10">
          <div className="flex flex-col w-1/2 mr-10">
            <label className="mb-1">Fullname</label>
            <input placeholder="John Doe" className="fullname border-b border-black px-3 py-1 bg-slate-100" onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className="flex flex-col w-1/2">
            <label className="mb-1">Amount</label>
            <input placeholder="100000" className="amount border-b border-black px-3 py-1 bg-slate-100" onChange={(e) => setAmount(e.target.value)}/>
          </div>
        </div>

        <button className="bg-black text-white px-3 py-2 rounded-full w-full" onClick={handleAddToList}>Add to List of Order</button>
      </div>


      <div className="my-10 w-2/3 ml-[50%]">
        <h1 className="mb-2">List of Orders</h1>

        <hr />

        <div>
          {
            listOfOrder.length == 0 ? 
            <div className="text-center mt-5">Currently you have no list of orders ...</div> 
            :
            listOfOrder.map((a) => (
              <div>
                <div className="flex flex-row justify-between items-center my-3">
                  <div className="flex flex-row">
                    <Image src={food} alt='food' width={50} height={50} className="rounded-full"/>
                    <div className="ml-5">
                      <h1 className="font-semibold">{a.desc}</h1>
                      <p className="text-sm text-slate-500">{a.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base mr-10">Rp. {parseInt(a.amount).toLocaleString()}</h3>

                    <div>
                      <button className="bg-white border border-red-500 text-red-500 text-sm rounded-full py-2 px-3 hover:bg-red-500 hover:text-white duration-100">Remove</button>
                    </div>
                  </div>
                </div>

                <hr />
              </div>
            ))
          }
        </div>

        {listOfOrder.length == 0 ? <></> : <p className="my-2 flex flex-row justify-end">Orders Total Amount: Rp. {totalAmount.toLocaleString()}</p>}

        {
          listOfOrder.length == 0 ? 
          <></>
          :
          <div className="mt-5">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-1/2 mr-10">
                <label className="mb-1">Total Deduction</label>
                <input placeholder="10000" className="bg-slate-100 px-3 py-1 border-b border-black" onChange={(e) => setTotalDeduction(e.target.value)}/>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-1">Delivery Fee</label>
                <input placeholder="10000" className="bg-slate-100 px-3 py-1 border-b border-black" onChange={(e) => setDeliveryFee(e.target.value)}/>
              </div>
            </div>

            <div className="mt-5 flex flex-row items-center">
              <p className="w-3/4 text-sm">Are these all of your orders? Click calculate to finalize the split bill calculation.</p>
              <button className="w-1/4 bg-black text-white px-3 py-1 rounded-full" onClick={handleCalculate}>Calculate</button>
            </div>
          </div>
        }


        {
          calculate ? 
          <div className="mt-10">
            <div className="mb-5 text-sm">
              <h1>Percent Deduction / Person: {deductionPercentage}%</h1>
              <h1>Delivery Fee / Person: Rp. {parseInt(deliveryFeePerPerson).toLocaleString()}</h1>
            </div>

            <h1 className="mb-2">Split Bill Final Calculation</h1>

            <hr />

            {
              listOfOrder.map((a) => (
                <div>
                  <div className="flex flex-row justify-between items-center my-3">
                    <div className="flex flex-row">
                      <Image src={food} alt='food' width={50} height={50} className="rounded-full"/>
                      <div className="ml-5">
                        <h1 className="font-semibold">{a.desc}</h1>
                        <p className="text-sm text-slate-500">{a.name}</p>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-center">
                      <h3 className="text-base mr-10">Rp. {(parseInt(a.amount) - (parseInt(a.amount) * parseInt(deductionPercentage) / 100) + parseInt(deliveryFeePerPerson)).toLocaleString()}</h3>
                    </div>
                  </div>

                  <hr />
                </div>
              ))
            }


          </div>
          :
          <></>
        }
        
      </div>
    </div>
  );
}
