'use client'

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import food from '@/public/image/food.jpg'
import { useRouter } from "next/navigation";

interface Order {
  id: number;
  name: string;
  desc: string;
  amount: string;
}

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [descriptioin, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [calculate, setCalculate] = useState(false);
  const [totalDeduction, setTotalDeduction] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [deductionPercentage, setDeductionPercentage] = useState('');
  const [deliveryFeePerPerson, setDeliveryFeePerPerson] = useState('');
  const [amountValidation, setAmountValidation] = useState(true);
  const [descValidation, setDescValidation] = useState(true);
  const [deductionValidation, setDeductionValidation] = useState(true);
  const [deliveryValidation, setDeliveryValidation] = useState(true);

  const trackRemove = useRef(0)
  
  const [listOfOrder, setListOfOrder] = useState<Order[]>([]);

  function currentYear() {
    let date = new Date()

    return date.getFullYear()
  }

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

    // Validation
    let orderValidation:boolean = formOrderValidation(price, desc);

    if (orderValidation == false) {
      return
    }

    if (fullname == '') {
      fullname = 'Unknown'
    }

    arr.push({ 'id': id, 'name': fullname, 'desc': desc, 'amount': price });

    setTotalAmount(totalAmount + parseInt(price))

    setListOfOrder(arr);
    setAmountValidation(true);
    setDescValidation(true);

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
    let [totDeduction, delivFee] = [totalDeduction, deliveryFee]

    // Validation
    let calculationValidation:boolean = formCalculationValidation(totDeduction, delivFee)

    if (calculationValidation == false) {
      return
    }

    setCalculate(true)
    calculatePercentDeduction()
    calculateDeliveryFeePerPerson()
  }

  function handleRemovePerson(event:any) {
    let id = event.currentTarget.id
    let arr = listOfOrder
    let index = 0
    
    for (let idx in listOfOrder) {
      if (listOfOrder[idx].id == id) {
        index = parseInt(idx)
        break
      }
    }

    let amount = arr[index].amount
    
    arr.splice(index, 1)

    
    setListOfOrder(arr)
    setTotalAmount(totalAmount - parseInt(amount))
  }

  function formOrderValidation(price: string, desc: string) {
    let regex = /^[0-9]*$/mg
    let amountInput: any = document.querySelector('.text-amount')
    let descInput: any = document.querySelector('.text-desc')
    let valid = true

    if (price == '') {
      setAmountValidation(false)
      amountInput.innerHTML = 'Please enter an amount'

      valid = false
    } else if (price.match(regex) == null) {
      setAmountValidation(false)
      amountInput.innerHTML = 'Please enter a valid amount'

      valid = false
    } else {
      setAmountValidation(true)
      amountInput.innerHTML = ''
    }

    if (desc == '') {
      setDescValidation(false)
      descInput.innerHTML = 'Please enter a description'

      valid = false
    } else {
      setDescValidation(true)
      descInput.innerHTML = ''
    }

    return valid
  }

  function formCalculationValidation(deduction: string, deliveryFee: string) {
    let regex = /^[0-9]*$/mg
    let textDeduct:any = document.querySelector('.text-deduct')
    let textDelivery: any = document.querySelector('.text-delivery')
    let valid = true

    // Validate total deduction
    if (deduction == '') {
      setDeductionValidation(false);
      textDeduct.innerHTML = 'Please enter an amount'

      valid = false
    } else if (deduction.match(regex) == null) {
      setDeductionValidation(false)
      textDeduct.innerHTML = 'Please enter a valid amount'

      valid = false
    } else {
      setDeductionValidation(true)
      textDeduct.innerHTML = ''
    }

    // Validate delivery fee
    if (deliveryFee == '') {
      setDeliveryValidation(false);
      textDelivery.innerHTML = 'Please enter an amount'

      valid = false
    } else if (deduction.match(regex) == null) {
      setDeliveryValidation(false)
      textDelivery.innerHTML = 'Please enter a valid amount'

      valid = false
    } else {
      setDeliveryValidation(true)
      textDelivery.innerHTML = ''
    }

    return valid
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row">
        <div className="w-1/3 fixed">
          <h1 className="my-10 text-2xl">Split Bill Application</h1>
          <div className="flex flex-col mb-5">
            <label className="mb-1">Description</label>
            <input placeholder="Pizza" className={descValidation ? "description border-b border-black px-3 py-1 bg-slate-100" : "description border-b border-red-500 px-3 py-1 bg-slate-100"} onChange={(e) => setDescription(e.target.value)}/>
            <p className="text-red-500 text-xs text-desc mt-1"></p>
          </div>

          <div className="flex flex-row mb-10">
            <div className="flex flex-col w-1/2 mr-10">
              <label className="mb-1">Fullname</label>
              <input placeholder="John Doe" className="fullname border-b border-black px-3 py-1 bg-slate-100" onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="mb-1">Amount</label>
              <input placeholder="100000" className={amountValidation ? "amount border-b border-black px-3 py-1 bg-slate-100" : "amount border-b border-red-500 px-3 py-1 bg-slate-100"} onChange={(e) => setAmount(e.target.value)}/>
              <p className="text-red-500 text-amount text-xs mt-1"></p>
            </div>
          </div>

          <div className="w-full flex flex-row justify-between">
            <button className="bg-black text-white px-3 py-2 rounded-full w-1/2 mb-3 hover:bg-white hover:text-black hover:border hover:border-black duration-100 mr-5" onClick={handleAddToList}>Add to List of Order</button>
            <button className="bg-white text-black border border-black px-3 py-2 rounded-full w-1/2 mb-3 hover:bg-black hover:text-white hover:border hover:border-black duration-100" onClick={() => window.location.reload()}>Start New Order</button>
          </div>
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
                <div key={a.id}>
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
                        <button id={`${a.id}`} className={`bg-white border border-red-500 text-red-500 text-sm rounded-full py-2 px-3 hover:bg-red-500 hover:text-white duration-100 btn-${a.id}`} onClick={handleRemovePerson}>Remove</button>
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
                  <input placeholder="10000" className={deductionValidation ? "bg-slate-100 px-3 py-1 border-b border-black" : "bg-slate-100 px-3 py-1 border-b border-red-500"} onChange={(e) => setTotalDeduction(e.target.value)}/>
                  <p className="text-xs text-red-500 mt-1 text-deduct"></p>
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="mb-1">Delivery Fee</label>
                  <input placeholder="10000" className={deliveryValidation ? "bg-slate-100 px-3 py-1 border-b border-black" : "bg-slate-100 px-3 py-1 border-b border-red-500"} onChange={(e) => setDeliveryFee(e.target.value)}/>
                  <p className="text-xs text-red-500 mt-1 text-delivery"></p>
                </div>
              </div>

              <div className="mt-5 flex flex-row items-center">
                <p className="w-3/4 text-sm">Are these all of your orders? Click calculate to finalize the split bill calculation.</p>
                <button className="w-1/4 bg-black text-white px-3 py-1 rounded-full" onClick={handleCalculate}>Calculate</button>
              </div>
            </div>
          }


          {
            calculate && listOfOrder.length != 0 ? 
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

      
    </div>
  );
}
