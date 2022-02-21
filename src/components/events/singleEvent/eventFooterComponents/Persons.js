const Persons = ({ persons }) => {
    const filtered = persons.filter((item) => item.type === 'person');
    return (
        <div className='footer-persons-comp'>
            {filtered.map((per) => {
                return (
                    <div className='footer-persons-card'>
                        <div className='person-photo'>
                            <h2>PHOTO</h2>
                        </div>
                        <h2>{per.name + ' ' + per.lastName}</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {per.profession.toUpperCase()}
                        </p>
                        <p>{per.about}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Persons;
