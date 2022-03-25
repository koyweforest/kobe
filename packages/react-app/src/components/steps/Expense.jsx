import { useContext, useState } from 'react'

import CalculatorContext from '../../contexts/CalculatorContext'
import { useForm } from '../../hooks/useForm'

import { Header } from './components/Header'
import { Information } from './components/Information'
import { SectionButtons } from './components/SectionButtons'
import { Stats } from './components/Stats'
import { ExpenseForm } from './forms/expense/ExpenseForm'
import { ExpenseFormAdvanced } from './forms/expense/ExperenceFormAdvanced'
import { ContentLayout } from './layouts/content/ContentLayout'
import { LeftLayout } from './layouts/content/LeftLayout'
import { MiddleLayout } from './layouts/content/MiddleLayout'
import { RightLayout } from './layouts/content/RightLayout'

/**
  type ExpenseProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
*/

const Expense = ({ nextStep, backStep }) => {
  const { advanced, accessToken } = useContext(CalculatorContext)
  const [loading, setLoading] = useState(false)

  const {
    formData,
    onChange,
  } = useForm({})

  const handleNext = () => {
    const data = {
      ...(!advanced && { 'spend_on_services_per_month': formData?.spendOnServicesPerMonth }),
      ...(advanced && {
        'health': formData?.health,
        'information_telecommunications': formData?.information,
        'visits_doctor': formData?.doctor,
        'auto_technical_service': formData?.autoService,
        'financial_management_services': formData?.financialServices,
        'home_maintenance_repairs': formData?.homeMaintenance,
        'donations': formData?.donations,
        'other_services': formData?.otherServices,
      }),
      'bearerToken': accessToken,
    }

    setLoading(true)

    const endpoint = advanced ? 'servicios-detailed' : 'servicios-simplificada'

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
        title="Sección N° 5 - Servicios"
        subtitle="Igual que con los bienes, la simple sólo pregunta el gasto mensual total en CLP, mientras que la detallada es sobre cada tipo de servicio."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          {!advanced && <ExpenseForm formData={formData} onChange={onChange} />}
          {advanced && <ExpenseFormAdvanced formData={formData} onChange={onChange} />}
          <SectionButtons nextStep={handleNext} backStep={backStep} loading={loading} />
        </MiddleLayout>
        <RightLayout>
          <Information index={4} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}

export default Expense
