import { useContext, useState } from 'react'

import CalculatorContext from '../../contexts/CalculatorContext'
import { useForm } from '../../hooks/useForm'

import { Header } from './components/Header'
import { Information } from './components/Information'
import { SectionButtons } from './components/SectionButtons'
import { Stats } from './components/Stats'
import { PropertyForm } from './forms/property/PropertyForm'
import { PropertyFormAdvanced } from './forms/property/PropertyFormAdvanced'
import { ContentLayout } from './layouts/content/ContentLayout'
import { LeftLayout } from './layouts/content/LeftLayout'
import { MiddleLayout } from './layouts/content/MiddleLayout'
import { RightLayout } from './layouts/content/RightLayout'

/**
  type PropertyProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
*/

export const Property = ({ nextStep, backStep }) => {
  const { advanced, accessToken } = useContext(CalculatorContext)
  const [loading, setLoading] = useState(false)

  const {
    formData,
    onChange,
  } = useForm({})

  const handleNext = () => {
    const data = {
      ...(!advanced && { 'monthly_spend_on_goods': formData?.monthlySpendOnGoods }),
      ...(advanced && {
        'furniture_household_appliances': formData?.furnitureAppliances,
        'clothes': formData?.clothes,
        'entertainment': formData?.entertainment,
        'paper_office_reading': formData?.paperOffice,
        'personal_hygiene_cleaning': formData?.personalHygiene,
        'spare_parts_car': formData?.spareParts,
        'medical_supplies': formData?.medicalSupplies,
      }),
      'services': advanced ? 'Detallada' : 'Simplificada',
      'bearerToken': accessToken,
    }

    setLoading(true)

    const endpoint = advanced ? 'bienes-detailed' : 'bienes-simplificada'

    fetch(`https://koywecalc.herokuapp.com/api/v1/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async res => {
      const responseData = await res.json()

      if (responseData.success)
        nextStep()
      else
        return Promise.reject(responseData.message)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Header
        title="Sección N° 4 - Bienes"
        subtitle="En la versión simplificada te preguntamos simplemente cuánto gastas al año en comprar bienes. Asumiremos una canasta promedio de compras. En la versión detallada, te preguntaremos cuánto gastas en cada cosa."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          {!advanced && <PropertyForm formData={formData} onChange={onChange} />}
          {advanced && <PropertyFormAdvanced formData={formData} onChange={onChange} />}
          <SectionButtons nextStep={handleNext} backStep={backStep} loading={loading} />
        </MiddleLayout>
        <RightLayout>
          <Information index={3} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
