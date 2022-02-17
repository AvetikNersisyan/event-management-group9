const AddPerson = ({ profession,
    changeProfessionType,
    professionTypes,
    personFirstName,
    setPersonFirstName,
    personLastName,
    setPersonLastName,
    personDoB,
    setPersonDoB,
    personBio,
    setPersonBio,
    handleAddPerson }) => {
    return (
        <>
            <div className='event-title-type'>
                <select
                    className='new-event-title-inputs'
                    value={profession}
                    onChange={changeProfessionType}
                >
                    {professionTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <input
                    className='new-event-title-inputs'
                    value={personFirstName}
                    onChange={(e) => setPersonFirstName(e.target.value)}
                    placeholder={'Firstname'}
                    required={true}
                />
                <input
                    className='new-event-title-inputs'
                    value={personLastName}
                    onChange={(e) => setPersonLastName(e.target.value)}
                    placeholder={'Firstname'}
                    required={true}
                />
                <input
                    className='new-event-inputs'
                    value={personDoB}
                    onChange={(e) => setPersonDoB(e.target.value)}
                    type={'date'}
                />
            </div>
            <div className='new-event-stroks'>
                <textarea
                    style={{ padding: '10px' }}
                    className='new-event-title-inputs'
                    value={personBio}
                    onChange={(e) => setPersonBio(e.target.value)}
                    placeholder={'Peson Biography'}
                    required={true}
                />
                <button
                    className={'button'}
                    type={'submit'}
                    onClick={handleAddPerson}
                >
                    Add Person
                </button>
            </div>
        </>
    );
};

export default AddPerson;
