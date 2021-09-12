import * as yup from "yup";
import {Field, Form, Formik,} from "formik";
import React from "react";
import {Filter} from "../redux/Reducers/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../redux/Selectors/User_Selector";
import {Button} from "antd";




type Props = {
    onFilterChanged:(filter:Filter)=>void
}
type Friend = 'true' | 'false' | 'null';
type FormType={
    term:string
    friend:Friend
}

const UsersSearchForm:React.FC<Props> = ({onFilterChanged}) => {

    const filter = useSelector(getUsersFilter)

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

        <Formik initialValues={{term: filter.term, friend: String(filter.friend) as Friend}} validationSchema={validationSchema} validateOnBlur
                onSubmit={submit} enableReinitialize={true}
        >
            {({ values, errors,
                handleChange,isSubmitting,
            }) => (
                    <Form>
                        <Field type={`text`} name={`term`} onChange={handleChange}
                               value={values.term} disabled={isSubmitting}
                        />
                        <Field name='friend'  as='select'>
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