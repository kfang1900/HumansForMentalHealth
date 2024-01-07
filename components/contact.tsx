import React from "react"
import { Formik, Field, Form, FormikHelpers } from "formik"

interface ContactFormProps {
  onClose: () => void
  recipientName: string
  recipientEmail: string
}

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactForm: React.FC<ContactFormProps> = ({
  onClose,
  recipientName,
  recipientEmail,
}) => {
  const closePopup = () => {
    const emailPopup = document.getElementById("emailPopup")
    if (emailPopup) {
      emailPopup.style.display = "none"
    }
    onClose()
  }
  const initialValues: FormValues = {
    name: "",
    email: "",
    message: "",
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const dataWithRecipient = { ...values, recipientEmail }

    try {
      console.log(JSON.stringify(dataWithRecipient))
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithRecipient),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        if (data.success) {
          alert("Email sent successfully!")
          closePopup()
        } else {
          alert("Failed to send email.")
        }
      } else {
        console.error(`Failed to fetch. Status: ${response.status}`)
        alert("Failed to send email.")
      }
    } catch (error) {
      console.error(error)
      alert("An error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div id="emailPopup" className="popup bottom-0 w-full">
      <div className="popup-content bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">
            {`Contact ${recipientName.split(" ")[0]}`}
          </div>
          <span
            className="close text-gray-600 cursor-pointer text-3xl"
            onClick={closePopup}
          >
            &times;
          </span>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            id="emailForm"
            className="mt-4 space-y-4 w-full max-w-screen-lg mx-auto"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message:
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows={5}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default ContactForm
