import { useRef } from "react";

const AddPerson = ({ profession,
    changeProfessionType,
    professionTypes,
    handleAddPerson }) => {

    const personFirstNameInput = useRef(null);
    const personLastNameInput = useRef(null);
    const personDoBInput = useRef(null);
    const personBioInput = useRef(null);

    const handleAdd = () => {
        handleAddPerson({
            personFirstNameInput: personFirstNameInput.current.value,
            personLastNameInput: personLastNameInput.current.value,
            personDoBInput: personDoBInput.current.value,
            personBioInput: personBioInput.current.value,
        })
        personFirstNameInput.current.value = '';
        personLastNameInput.current.value = '';
        personDoBInput.current.value = '';
        personBioInput.current.value = '';
    }

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
                    ref={personFirstNameInput}
                    placeholder={'Firstname'}
                    required={true}
                />
                <input
                    className='new-event-title-inputs'
                    ref={personLastNameInput}
                    placeholder={'Firstname'}
                    required={true}
                />
                <input
                    className='new-event-inputs'
                    ref={personDoBInput}
                    type={'date'}
                />
            </div>
            <div className='new-event-stroks'>
                <textarea
                    style={{ padding: '10px' }}
                    className='new-event-title-inputs'
                    ref={personBioInput}
                    placeholder={'Peson Biography'}
                    required={true}
                />
                <button
                    className={'button'}
                    type={'submit'}
                    onClick={handleAdd}
                >
                    Add Person
                </button>
            </div>
        </>
    );
};

export default AddPerson;
