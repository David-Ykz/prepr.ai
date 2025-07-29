import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './BrowseJobPosting.css'
import { getJobPosting, listJobPostings, uploadJobPosting } from './api';

const BrowseJobPosting = function() {
	const [titleFilter, setTitleFilter] = useState("");
	const [companyFilter, setCompanyFilter] = useState("");
	const [tagsFilter, setTagsFilter] = useState([]);
	const [postings, setPostings] = useState([]);
	const allTags = ['SQL', 'JavaScript', 'Pytorch', 'Python', 'AWS', 'C++', 'Kubernetes', 'React', 'Web Development', 'Full-stack', 'Node.js']
	const tagOptions = allTags.map(tag => ({ value: tag, label: tag }));

	useEffect(() => {
		async function fetchData() {
			setPostings(await listJobPostings({title: titleFilter, company: companyFilter, tags: tagsFilter}));		
		}
		fetchData();
	}, []);

	async function onFilterButtonClick() {
		setPostings(await listJobPostings({title: titleFilter, company: companyFilter, tags: tagsFilter}));
	};


	return (
		<div className="container">
			<div className="filter-section">
				<p className="filter-title">Filters</p>

		    	<p>Job Title:</p>
      			<input
        			type="text"
					className="filter-input"
        			value={titleFilter}
        			onChange={e => setTitleFilter(e.target.value)}
        			placeholder="Search..."
      			/>

		      	<p>Company:</p>
      			<input
					type="text"
					className="filter-input"
					value={companyFilter}
					onChange={e => setCompanyFilter(e.target.value)}
					placeholder="Search..."
			    />

		      	<p>Tags:</p>
				<Select
					className="filter-select"
					options={tagOptions}
					isMulti
					value={tagsFilter.map(tag => ({ value: tag, label: tag }))}
					onChange={(selected) => setTagsFilter(selected.map(s => s.value))}
				/>

				<button className="filter-button" onClick={onFilterButtonClick}>Apply</button>

			</div>
			{
				postings.map((posting, index) => (
					<div className="posting-card" key={index}>
						<p className="posting-title">{posting.title}</p>
						<p className="posting-text">{posting.company}</p>
						{posting.tags.map((tag, i) => (
							<span className="posting-tag" key={i}>{tag}</span>
						))}
					</div>
				))
			}
		</div>
	)
};

export default BrowseJobPosting;
