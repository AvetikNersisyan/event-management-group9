import { useMemo, useState } from 'react';
import Schedule from './eventFooterComponents/schedule';

const EventFooter = () => {
    const [comp, setComp] = useState(<Schedule />);

    // const activeTab = useMemo(() => comp, comp);
    return (
        <div className={'event-footer'}>
            <ul className={'head'}>
                <li> Schedule</li>
                <li onClick={() => setComp(<div> Ticket + Price</div>)}>
                    {' '}
                    Ticket & Price
                </li>
                <li> Speakers</li>
                <li> Comments</li>
            </ul>

            <hr />

            {comp}
        </div>
    );
};

export default EventFooter;
