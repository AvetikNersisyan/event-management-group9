import './style.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Categories = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	return (
		<div className='wrapper'>
			<div className='container'>
				<form action='' method='GET' name='search_event'>
					<div className='form-element'>
						<div className='form_element half'>
							<input placeholder='Enter Name ...' name='name_event' value='' />
						</div>
						<div className='form_element half'>
							<select name='name' selected='selected' className='selectpicker '>
								<option value=''>All Categories</option>
								<option value='business'>Business</option>
								<option value='concert'>Concert</option>
								<option value='conference'>Conference</option>
								<option value='festival'>Festival</option>
								<option value='sport'>Sport</option>
								<option value='travel'>Travel</option>
							</select>
						</div>
						<div className='form_element half'>
							<select
								name='name_country'
								id='name_country'
								className='selectpicker'
							>
								<option value='' selected='selected'>
									All States
								</option>
								<option className='level-0' value='california'>
									California
								</option>
								<option className='level-0' value='texas'>
									Texas
								</option>
								<option className='level-0' value='washington'>
									washington
								</option>
							</select>
						</div>

						<div className='form_element half'>
							<select name='name_city' id='name_city' className='selectpicker'>
								<option value='' selected='selected'>
									All Cities
								</option>
								<option value='austin'>Austin</option>
								<option value='dallas'>Dallas</option>
								<option value='houston'>Houston</option>
								<option value='los angeles'>Los Angeles</option>
								<option value='sacramento'>Sacramento</option>
								<option value='olimpia'>Olimpia</option>
								<option value='seattle'>Seattle</option>
							</select>
						</div>
					</div>

					<div className='form-element'>
						<div className='form_element half'>
							<select name='name_venue' className='selectpicker'>
								<option value=''>All Venue</option>
								<option value='225-liberty-street-new-york'>
									225 Liberty Street, New York
								</option>
								<option value='732-macdougal-street'>
									732 Macdougal Street
								</option>
								<option value='beekman-street-new-york'>
									Beekman Street, New York
								</option>
								<option value='pace-university'>Pace University</option>
								<option value='park-row-new-york'>Park Row, New York</option>
								<option value='seamores-broome-street-new-york'>
									Seamore&#8217;s, Broome Street, New York
								</option>
							</select>
						</div>

						<div className='form_element half'>
							<select name='time' className='selectpicker'>
								<option value=''>All Time</option>
								<option value='today'>Today</option>
								<option value='tomorrow'>Tomorrow</option>
								<option value='this_week'>This Week</option>
								<option value='this_week_end'>This Weekend</option>
								<option value='next_week'>Next Week</option>
								<option value='next_month'>Next Month</option>
								<option value='past'>Past Events</option>
								<option value='future'>Future Events</option>
							</select>
						</div>
						<div className='form_element half'>
							<div className='datepicker'>
								<DatePicker
									placeholderText='Select Start Date'
									dateFormat='MMMM d, yyyy h:mmaa'
									showTimeSelect
									selected={startDate}
									selectsStart={startDate}
									endDate={endDate}
									onChange={(date) => setStartDate(date)}
								/>
								<DatePicker
									placeholderText='Select End Date'
									showTimeSelect
									dateFormat='MMMM d, yyyy h:mmaa'
									selected={endDate}
									selectsEnd
									startDate={startDate}
									endDate={endDate}
									minDate={startDate}
									onChange={(date) => setEndDate(date)}
								/>
							</div>
						</div>

						<div className='form_element half'>
							<input className='find_event' type='submit' value='Find Event' />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Categories;
