'use client'
import React, { useState } from 'react'

export default function HomePage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiCalculate, setBmiCalculate] = useState(null);
  const [message, setMessage] = useState("");
  const [statusBmi, setStatusBmi] = useState("");
  const [statusClass, setStatusClass] = useState("")

  const calculate = () => {
    let bmi = Number(weight / (height / 100) ** 2).toFixed(2);
    setBmiCalculate(bmi);
    let status = getStatus(bmi);
    setStatusBmi(status)
    setHeight('');
    setWeight('');
    setStatusClass(getStatusClass(status))
  }

  const getStatus = (bmi) => {
    if (bmi < 18.5) {
      setMessage("Uzunluğunuza göre uygun ağırlıkta olmadığınızı, zayıf olduğunuzu gösterir. Zayıflık, bazı hastalıklar için risk oluşturan ve istenmeyen bir durumdur. Boyunuza uygun ağırlığa erişmeniz için yeterli ve dengeli beslenmeli, beslenme alışkanlıklarınızı geliştirmeye özen göstermelisiniz.")
      return "Under weight"
    } else if (bmi >= 18.5 && bmi < 25) {
      setMessage("Uzunluğunuza göre uygun ağırlıkta olduğunuzu gösterir. Yeterli ve dengeli beslenerek ve düzenli fiziksel aktivite yaparak bu ağırlığınızı korumaya özen gösteriniz.")
      return "Normal"
    } else if (bmi >= 25 && bmi < 30) {
      setMessage("Boyunuza göre vücut ağırlığınızın fazla olduğunu gösterir. Fazla kilolu olma durumu gerekli önlemler alınmadığı takdirde pek çok hastalık için risk faktörü olan obeziteye (şişmanlık) yol açar.")
      return "Overweight"
    } else if (bmi >= 30) {
      setMessage("Boyunuza göre vücut ağırlığınızın fazla olduğunu bir başka deyişle şişman olduğunuzun bir göstergesidir. Şişmanlık, kalp-damar hastalıkları, diyabet, hipertansiyon v.b. kronik hastalıklar için risk faktörüdür. Bir sağlık kuruluşuna başvurarak hekim / diyetisyen kontrolünde zayıflayarak normal ağırlığa inmeniz sağlığınız açısından çok önemlidir. Lütfen, sağlık kuruluşuna başvurunuz.")
      return "Obese"
    };
  }

  const getStatusClass = (status) => {
    if (status === "Under weight") {
      return "bg-sky-500"
    } else if (status === "Normal") {
      return "bg-green-600"
    } else if (status === "Overweight") {
      return "bg-orange-600"
    } else {
      return "bg-red-600"
    }
  }

  const resetClick=()=>{
    setBmiCalculate("");
    setHeight("");
    setWeight("")
  }
  return (
    <div className=''>
      <div className='w-1/2 h-[700px] bg-gray-100 p-5 mx-auto mt-10 rounded-sm'>
        <div>
          <h2 className='text-4xl font-semibold text-center mb-5 text-black'>
            BMI Calculator
          </h2>
        </div>
        <div className='flex justify-between'>
          <form className='pl-6 w-[300px]' >
            <div className='mb-3'>
              <label className='block pb-2 text-black'>Height(cm)</label>
              <input
                id="height"
                name="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="1"
                max="999"
                type="number"
                placeholder='Height'
                className='h-[50] w-full border border-solid border-neutral-500 rounded-sm outline-slate-600 pl-2' />
            </div>
            <div className='mb-3'>
              <label className='block pb-2 text-black'>Weight(kg)</label>
              <input
                id="weight"
                name="weight"
                value={weight}
                placeholder='Weight'
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                min="1"
                max="999"
                className='h-[50] border border-solid w-full border-neutral-500 rounded-sm outline-slate-600 pl-2' />
            </div>
            <div className='mt-5 flex justify-between'>
              <button type='button' onClick={calculate} disabled={weight === '' | height === ''} className='disabled:bg-gray-400 bg-green-700 px-5 py-2 rounded-sm text-white'>Calculate</button>
              <button type='button' onClick={resetClick} className=' bg-red-700 px-5 py-2 rounded-sm text-white'>Reset</button>
            </div>
          </form>
          <div className='grid  w-[400px] grid-cols-[repeat(2,1fr)] gap-4 '>
            <div className='bg-sky-500 text-white text-center p-5 rounded-sm'>
              <p>
                {`< 18.5`}
              </p>
              <p>
                Under weight
              </p>
            </div>
            <div className='bg-green-600 text-white text-center p-5 rounded-sm'>
              <p>
                {` 18.5 - 25`}
              </p>
              <p>
                Normal
              </p>
            </div>
            <div className='bg-orange-600 text-white text-center p-5 rounded-sm'>
              <p>
                {`25-30`}
              </p>
              <p>
                Over weight
              </p>
            </div>
            <div className='bg-red-600 text-white text-center p-5 rounded-sm'>
              <p>
                {`>30`}
              </p>
              <p>
                Obese
              </p>
            </div>
          </div>

        </div>
        <div className='mt-8 '>
          {
            bmiCalculate &&
            <div className={`${statusClass} text-white p-5 rounded-sm`}>
              <p className='font-semibold text-xl pb-3'>BMI:  {bmiCalculate} -{statusBmi}</p>
              <p>{message}</p>
            </div>
          }
        </div>

      </div>
    </div>
  )
}
