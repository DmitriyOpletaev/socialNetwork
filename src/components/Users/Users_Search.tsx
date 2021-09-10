import * as yup from "yup";
import {Field, Form, Formik,} from "formik";
import React from "react";
import {Filter} from "../redux/Reducers/users-reducer";




type Props = {
    onFilterChanged:(filter:Filter)=>void
}
type FormType={
    term:string
    friend:'true'|'false'|'null'
}

const UsersSearchForm:React.FC<Props> = ({onFilterChanged}) => {
    const nameRegex = /^[a-zA-Z0-9а-яА-Яії ]+$/
    const validationSchema = yup.object().shape({
        term: yup.string().matches(nameRegex, 'Нельзя использовать символы').typeError('Должно быть строкой')
    })


    const submit = (values:FormType,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=>void})=>{
        const filterValues:Filter = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'  //it's same: values.friend === 'null' ? null : values.friend==='true' ? true : false
        }
        onFilterChanged(filterValues)
        setSubmitting(false)


    }


    return (

        <Formik initialValues={{term: '', friend: 'null'}} validationSchema={validationSchema} validateOnBlur
                onSubmit={submit}
        >
            {({ values, errors,
                handleChange,isSubmitting,
            }) => (
                    <Form>
                        <Field type={`text`} name={`term`} onChange={handleChange}
                               value={values.term} disabled={isSubmitting}
                        />
                        <Field name='friend' as='select'>
                            <option value='null'>All</option>
                            <option value='true'>Followed</option>
                            <option value='false'>Unfollowed</option>
                        </Field>
                        <button type={'submit'} disabled={isSubmitting}>Find</button>
                        { errors.term && <span style={{color:'red'}}>{errors.term}</span>}

                    </Form>
        )}
        </Formik>
    )
}

export default UsersSearchForm