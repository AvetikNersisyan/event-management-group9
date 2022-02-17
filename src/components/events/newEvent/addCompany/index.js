const AddCompany = ({ companyName,
    setCompanyName,
    fieldOfActivity,
    setFieldOfActivity,
    aboutCompany,
    setAboutCompany,
    handleAddCompany }) => {
    return (
        <>
            <div className='event-title-type'>
                <input
                    className='new-event-title-inputs'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={'Company name'}
                    required={true}
                />
                <input
                    className='new-event-title-inputs'
                    value={fieldOfActivity}
                    onChange={(e) => setFieldOfActivity(e.target.value)}
                    placeholder={'Field of activity'}
                    required={true}
                />
            </div>
            <div className='new-event-stroks'>
                <textarea
                    style={{ padding: '10px' }}
                    className='new-event-title-inputs'
                    value={aboutCompany}
                    onChange={(e) => setAboutCompany(e.target.value)}
                    placeholder={'About company'}
                    required={true}
                />
                <button className={'button'} type={'submit'} onClick={handleAddCompany}>
                    Add Company
                </button>
            </div>
        </>
    );
};

export default AddCompany;
