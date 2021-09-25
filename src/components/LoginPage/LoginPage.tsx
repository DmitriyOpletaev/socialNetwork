import m from './LoginPage.module.css'
import closeImg from '../../assets/images/Close.png'
import {Formik, Field, FormikValues, Form} from "formik";
import * as yup from 'yup'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCaptchaUrl, getIsAuth} from "../redux/Selectors/Auth_Selector";
import {logInMe} from "../redux/Reducers/auth_reducer";
import {Redirect, useHistory} from "react-router-dom";



type Props={
    logInMeSubmit:(values:FormikValues)=>void
    captchaUrl:string|null
}


const LoginForm:React.FC<Props>=({logInMeSubmit, captchaUrl})=> {

    const nameRegex = /^[a-zA-Z0-9а-яії ]+$/
    const validationSchema = yup.object().shape({
        name: yup.string().matches(nameRegex, 'Нельзя использовать символы').typeError('Должно быть строкой'),//.min(4, 'Слишком короткое имя'),//.required('Обязательно введите имя'),
        secondName: yup.string().typeError('Должно быть строкой'),//.min(4, 'Слишком короткое имя'),//.required('Обязательно введите фамилию'),
        eMail: yup.string().email('Не валидный e-Mail').required('Введите Ваш e-Mail'),
        login: yup.string().typeError('Должно быть строкой'),//.required('Нужен логин'),
        password:  yup.string().typeError('Должно быть строкой').required('Введите пароль!').min(4, 'Слишком короткий пароль'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Подтвердите пароль!'),
        captcha: yup.string().typeError('Должно быть строкой'),
    })
    function onSubmit(values:FormikValues){
        logInMeSubmit(values)

    }

    return (


        <Formik initialValues={{
            name: '',
            secondName: '',
            login: '',
            eMail: '',
            password: '',
            confirmPassword: '',
            rememberMe: true,
            captcha:'',
            isSubmitting: false
        }}
                validateOnBlur
                onSubmit={onSubmit}
                validationSchema={validationSchema}
        >
            {({
                  values, errors, touched,
                  handleChange, handleBlur,
                  isValid, handleSubmit, dirty,setSubmitting,isSubmitting,
              }) => (
                  <Form>
                <div className={m.inputs_wrapper}>


                    <div>
                        <div className={m.input_value}>
                            <label htmlFor={`name`}>введите имя</label>
                            <Field type={`text`} name={`name`} onChange={handleChange}
                                   onBlur={handleBlur} value={values.name}

                            />
                        </div>
                        { touched.name && errors.name && <div className={m.input_Error}>{errors.name}</div>}
                    </div>


                    <div>
                        <div className={m.input_value}>
                            <label htmlFor={`login`}>введите логин</label>
                            <input type={`text`} name={`login`} onChange={handleChange}
                                   onBlur={handleBlur} value={values.login}
                            />
                        </div>
                        { touched.login && errors.login && <div className={m.input_Error}>{errors.login}</div>}
                    </div>


                    <div>
                        <div className={m.input_value}>
                            <label htmlFor='{`eMail`}'>введите e-mail</label>
                            <Field type={`email`} name={`eMail`} onChange={handleChange}
                                   onBlur={handleBlur} value={values.eMail}
                                   style={touched.eMail && errors.eMail &&{border:'red solid 2px'}}
                            />
                        </div>
                        { touched.eMail && errors.eMail && <div className={m.input_Error}>{errors.eMail}</div>}
                    </div>


                    <div>
                        <div className={m.input_value}>
                            <label htmlFor='{`password`}'>введите пароль</label>
                            <Field type={`password`} name={`password`} onChange={handleChange}
                                   onBlur={handleBlur} value={values.password}
                                   style={touched.password && errors.password &&{border:'red solid 2px'}}
                            />
                        </div>
                        { touched.password && errors.password && <div className={m.input_Error}>{errors.password}</div>}
                    </div>


                    <div>
                        <div className={m.input_value}>
                            <label htmlFor='{`confirmPassword`}'>подтвердите пароль</label>
                            <Field type={`password`} name={`confirmPassword`} onChange={handleChange}
                                   onBlur={handleBlur} value={values.confirmPassword}
                                   style={touched.confirmPassword && errors.confirmPassword &&{border:'red solid 2px'}}
                            />
                        </div>
                        { touched.confirmPassword && errors.confirmPassword && <div className={m.input_Error}>{errors.confirmPassword}</div>}
                    </div>

                    <div className={m.checkbox}>

                        <Field type={`checkbox`} name={`rememberMe`}
                               label={`Check the mark`}
                        />
                        <label htmlFor='{`rememberMe`}'>Remember me</label>

                    </div>

                        <div className={m.Error_Server}>
                            Error From Server
                        </div>

                    <div>
                        <button  disabled={!isValid || !dirty}  type={'submit'}>
                            LOG IN
                        </button>
                    </div>
                    {captchaUrl && <div className={m.captcha_container}>
                        <img src={captchaUrl}/>


                            <Field type={`text`} name={`captcha`} onChange={()=>handleSubmit()}
                                   onBlur={handleBlur} value={values.captcha}  placeholder={'Введите каптчу'}

                            />

                    </div>}



                </div>
                  </Form>
            )}
        </Formik>
    )
}

type PropsHOC={

}
const LoginPage:React.FC<PropsHOC>=()=> {

   /* let eMail = 'OpletaevDmitriy@gmail.com'
    let password = '_!2zFsnhet5mM7T'*/

    const captchaUrl = useSelector(getCaptchaUrl)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch()
    const logInMeSubmit = (values:FormikValues)=> {

        dispatch(logInMe(values))
    }



    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (

        <div className={m.wrapper_login_page}>
            <div className={m.login_block}>
                <h2>Login</h2>


                <img alt='X' src={closeImg} className={m.closeImg}/>

                <LoginForm  logInMeSubmit={logInMeSubmit} captchaUrl={captchaUrl}/>


            </div>
        </div>

    )
}

export default LoginPage





