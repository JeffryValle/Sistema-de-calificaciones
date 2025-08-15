import { useFormContext } from "react-hook-form"
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import { findInputError } from "../utils/findInputError"
import { isFormInvalid } from "../utils/isFormInvalid"


export const Input = ({ label, type, id, placeholder, name, value, handleChange, 
    validation, multiline, className,}) => {

    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputError = findInputError( errors, name )
    const isInvalid = isFormInvalid( inputError )

     const input_tailwind =
    'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60';

  return (
    <div>
        <label htmlFor={ id } className="block text-l/6 font-medium text-gray-900">
            { label }
        </label>
            <AnimatePresence mode="wait" initial={false}>
            { isInvalid && (
                <InputError
                    message={ inputError.error.message }
                    key={ inputError.error.message }
                />
            )}
            </AnimatePresence>
        <div className="mt-2">
            <input
                id={ id }
                name={ name }
                type={ type }
                placeholder={placeholder}
                {...register(name, validation)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
        </div>
    </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}