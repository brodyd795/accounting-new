import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';
import DatePickerField from '../tables/selectors/date-selector';
import {StyledSelect} from '../tables/styles';

const StyledModal = styled(Modal)`
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
`;

const StyledLabel = styled.label`
    color: red;
    margin-right: 10px;
`;

const validationSchema = yup.object().shape({
    fromAccountName: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
    }),
    toAccountName: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
    }),
    amount: yup.number().required('Required'),
    comment: yup.string().notRequired(),
    date: yup.date().required('Required')
});

const TransactionEditModal = ({isEditing, transactionBeingEdited, accounts}) => {
    console.log('transactionBeingEdited', transactionBeingEdited)
    if (!transactionBeingEdited) {
        return null;
    }
    const {fromAccountName, toAccountName, amount, comment, date} = transactionBeingEdited;
    console.log('accounts', accounts)

    // TODO: pre-fill the right to/from accounts in the dropdowns like I did before using accounts.find()

    return (
        <StyledModal
            isOpen={isEditing}
            contentLabel={'Edit Transaction Modal'}
            ariaHideApp={false}
        >
            <h2>{'Edit Transaction'}</h2>
            <Formik
                initialValues={{
                    fromAccountName,
                    toAccountName,
                    amount,
                    comment,
                    date: new Date(date)
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('submitted!');
                    console.log('values', values)
                }}
            >
                {(props) => {
                    const {setFieldValue} = props;

                    return (
                        <Form>
                            <div>
                                <StyledLabel htmlFor={'date'}>{'Date'}</StyledLabel>
                                <DatePickerField name={'date'} type={'text'} />
                                <ErrorMessage name={'date'} />
                            </div>
                            <div>
                                <StyledLabel htmlFor={'fromAccountName'}>{'From account name'}</StyledLabel>
                                <StyledSelect
                                    options={accounts}
                                    value={props.values.fromAccountName}
                                    onChange={(option) => setFieldValue('fromAccountName', option)}
                                    name={'fromAccountName'}
                                    id={'fromAccountName'}
                                />
                                <ErrorMessage name={'fromAccountName'} />
                            </div>
                            <div>
                                <StyledLabel htmlFor={'toAccountName'}>{'To account name'}</StyledLabel>
                                <StyledSelect
                                    options={accounts}
                                    value={props.values.toAccountName}
                                    onChange={(option) => setFieldValue('toAccountName', option)}
                                    name={'toAccountName'}
                                    id={'toAccountName'}
                                />
                                <ErrorMessage name={'toAccountName'} />
                            </div>
                            <div>
                                <StyledLabel htmlFor={'amount'}>{'Amount'}</StyledLabel>
                                <Field name={'amount'} type={'text'} />
                                <ErrorMessage name={'amount'} />
                            </div>
                            <div>
                                <StyledLabel htmlFor={'comment'}>{'Comment'}</StyledLabel>
                                <Field name={'comment'} type={'text'} />
                                <ErrorMessage name={'comment'} />
                            </div>
                            <button type={'button'}>{'Cancel'}</button>
                            <button type={'submit'}>{'Update'}</button>
                        </Form>
                    );
                }}
            </Formik>
        </StyledModal>
    );
};

export default TransactionEditModal;