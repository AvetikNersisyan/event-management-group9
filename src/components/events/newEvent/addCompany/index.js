import { useRef } from "react";


const AddCompany = ({
    handleAddCompany,
}) => {

    const companyNameInput = useRef(null);
    const fieldOfActivityInput = useRef(null);
    const aboutCompanyInput = useRef(null);

    const handleAdd = () => {
        handleAddCompany({ companyNameInput: companyNameInput.current.value, fieldOfActivityInput: fieldOfActivityInput.current.value, aboutCompanyInput: aboutCompanyInput.current.value })
        companyNameInput.current.value = '';
        fieldOfActivityInput.current.value = '';
        aboutCompanyInput.current.value = '';
    }


    return (
        <>
            <div className='event-title-type'>
                <input
                    className='new-event-title-inputs'
                    ref={companyNameInput}
                    placeholder={'Company name'}
                    required={true}
                />
                <input
                    className='new-event-title-inputs'
                    ref={fieldOfActivityInput}
                    placeholder={'Field of activity'}
                    required={true}
                />
            </div>
            <div className='new-event-stroks'>
                <textarea
                    style={{ padding: '10px' }}
                    className='new-event-title-inputs'
                    ref={aboutCompanyInput}
                    placeholder={'About company'}
                    required={true}
                />
                <button className={'button'} type={'submit'} onClick={handleAdd}>
                    Add Company
                </button>
            </div>
        </>
    );
};

export default AddCompany;
