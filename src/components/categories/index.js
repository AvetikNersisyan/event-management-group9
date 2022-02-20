/* eslint-disable react/jsx-no-undef */
import './style.css';
import { memo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

import { eventTypes } from '../../helper/constants';


const Categories = ({ handleFilter, cancelSearch }) => {
	const filterTitle = useRef(null)
	const filterCategories = useRef(null)
	const filterCities = useRef(null)
	const filterTeg = useRef(null)
	const filterStartDate = useRef(null);
	const filterEndDate = useRef(null);

	const handleSearch = () => {
		let filteringObject = {
			title: filterTitle.current.value.toLowerCase(),
			type: filterCategories.current.value,
			tags: filterTeg.current.value.toLowerCase(),
			location: filterCities.current.value,
			start_date: filterStartDate.current.value,
			end_date: filterEndDate.current.value,
		}
		handleFilter(filteringObject)
	}

	return (
		<div className='wrapper'>
			<div className='container'>
				<div action='' method='GET' name='search_event'>
					<div className='form-element'>
						<div className='form_element half'>
							<input placeholder='By title' name='name_event' ref={filterTitle} />
						</div>
						<div className='form_element half'>
							<select name='name' selected='selected' className='selectpicker' ref={filterCategories}>
								<option value=''>All Categories</option>
								{eventTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</div>
						<div className='form_element half'>
							<select
								name='name_country'
								id='name_country'
								className='selectpicker'
								ref={filterCities}
							>
								<option value='' selected='selected'>
									All Cities
								</option>
								<option className='level-0' value='yerevan'>
									Yerevan
								</option>
								<option className='level-0' value='los angeles'>
									Los Angeles
								</option>
								<option className='level-0' value='tsaghkadzor'>
									Tsaghkadzor
								</option>
							</select>
						</div>
					</div>
					<div className='form-element'>
						<div className='form_element half'>
							<input placeholder='By tag' name='name_event' ref={filterTeg} />
						</div>
						<div className='form_element half'>
							<div className='datepicker'>
								<input className='new-event-inputs' ref={filterStartDate} type={'date'} />
								<input className='new-event-inputs' ref={filterEndDate} type={'date'} />
							</div>
						</div>

						<div className='form_element half'>
							<button className='button' style={{ margin: '20px' }} value='Find Event' onClick={handleSearch} >Search</button>
						</div>
						<div className='form_element half'>
							<button className='button' style={{ margin: '20px' }} value='Find Event' onClick={cancelSearch} >Cancel</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default memo(Categories);
