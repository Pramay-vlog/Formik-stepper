import { InputField } from "./InputFields"
import * as Yup from 'yup'
import './App.css'
import MultiStepForm, { FormStep } from './MultiStepForm'

function App() {
  return (
    <div className="App">
      <MultiStepForm
        initialValues={{
          name: "",
          email: "",
          address: "",
          city: ""
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >

        <FormStep
          stepName='Person'
          onSubmit={() => console.log("Step1 submit")}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email format").required("Email is required"),
          })}
        >
          <InputField label="Name" name="name" />
          <InputField label="Email" name="email" />
        </FormStep>

        <FormStep
          stepName='Address'
          onSubmit={() => console.log("Step2 submit")}
          validationSchema={Yup.object({
            address: Yup.string().required("Address is required"),
            city: Yup.string().required("City is required"),
          })}
        >
          <InputField label="Address" name="address" />
          <InputField label="City" name="city" />
        </FormStep>

      </MultiStepForm>
    </div>
  )
}

export default App
