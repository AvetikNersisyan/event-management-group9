/* eslint-disable react/jsx-no-undef */
import './style.css';
import { memo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

import { eventTypes } from '../../helper/constants';

const Categories = ({ handleFilter, cancelSearch }) => {
	const filterTitle = useRef(null);
	const filterCategories = useRef(null);
	const filterCities = useRef(null);
	const filterTeg = useRef(null);
	const filterStartDate = useRef(null);
	const filterEndDate = useRef(null);

	const handleSearch = (e) => {
		e.preventDefault();

		let filteringObject = {
			title: filterTitle.current.value.toLowerCase().trim(),
			type: filterCategories.current.value.toLowerCase().trim(),
			tags: filterTeg.current.value.toLowerCase().trim(),
			location: filterCities.current.value.toLowerCase().trim(),
			start_date: filterStartDate.current.value,
			end_date: filterEndDate.current.value,
		};
		handleFilter(filteringObject);
	};

	return (
		<div className='wrapper'>
			<form className='container'>
				<div action='' method='GET' name='search_event'>
					<div className='form-elements'>
						<div className='form_element half'>
							<input
								className='selectpicker'
								placeholder='By title'
								name='name_event'
								ref={filterTitle}
							/>
						</div>
						<div className='form_element half'>
							<select
								name='name'
								selected='selected'
								className='selectpicker'
								ref={filterCategories}
							>
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
								<option value='yerevan'>Yerevan</option>
								<option value='los angeles'>Los Angeles</option>
								<option value='tsaghkadzor'>Tsaghkadzor</option>
							</select>
						</div>
					</div>
					<div className='form-elements'>
						<div className='form_element half'>
							<input
								placeholder='By tag'
								name='name_event'
								ref={filterTeg}
								className='selectpicker'
							/>
						</div>
						<div className='form_element half '>
							<input
								className='selectpicker'
								defaultValue={'1900-01-01'}
								ref={filterStartDate}
								type={'date'}
							/>
						</div>

						<div className='form-element half'>
							<input
								className='selectpicker'
								defaultValue={'2030-01-01'}
								ref={filterEndDate}
								type={'date'}
							/>
						</div>
					</div>
					<div className='event'>
						<div className='find'>
							<button value='Find Event' onClick={handleSearch}>
								Search
							</button>
						</div>
						<div className='find'>
							<button type={'reset'} value='Find Event' onClick={cancelSearch}>
								Reset
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export default memo(Categories);
