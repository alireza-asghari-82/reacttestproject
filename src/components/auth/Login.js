import React from 'react'
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useHistory} from 'react-router-dom'

export const Login = () => {
    const history = useHistory();
    return (
        <>
            <div className="login-wrap" style={{marginTop:'10vh'}}>
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">ورود به پنل</label>
                    <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label for="tab-2" className="tab">فراموشی رمز عبور</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    if(values.email == 'test@gmail.com' || values.password=='123')
                                    {
                                        const user = {
                                            userId : 'uuid',
                                            userName : 'derambakht',
                                            fullName:'محسن درم بخت' ,
                                            thumbnail:'https://img.icons8.com/dusk/2x/change-user-male.png',
                                            token:'a;dnadnasdk abkjdasdmasdmas;dasdmas;dasldmsa;ld'
                                        };

                                        //set data in localStorage
                                        //localStorage.setItem('key', 'value');
                                        localStorage.setItem('user', JSON.stringify(user));

                                        //redirect to dashboard page
                                        history.push('/');
                                    } else {
                                        //alert(values.email);
                                        alert('نام کاربری یا رمز عبور صحیح نمی باشد');
                                    }
                                 
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="group">
                                            <label for="email" className="label">نام کاربری</label>
                                            <Field type="email" name="email" className="input" />
                                            <ErrorMessage name="email" component="div" />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">رمز عبور</label>
                                            <Field type="password" name="password" className="input" />
                                            <ErrorMessage name="password" component="div" />
                                        </div>
                                        <div className="group">
                                            <button type="submit" className="button" disabled={isSubmitting}>
                                                ورود
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="hr"></div>
                        </div>
                        <div className="for-pwd-htm">
                            <div className="group">
                                <label for="user" className="label">نام کاربری یا ایمیل</label>
                                <input id="user" type="text" className="input" />
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="بازیابی رمز" />
                            </div>
                            <div className="hr"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
