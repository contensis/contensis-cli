import React from 'react';
import { toUrl } from '../../services/navigation';

function Pager({ entries, search }) {
	const pageCount = Math.ceil(entries.totalCount / entries.pageSize);
	const pages = [];
	let counter = 0;
	while (counter < pageCount) {
		pages[counter] = counter;
		counter += 1;
	}
		
	const showPrev = (entries.pageIndex > 0);
	const showNext = (entries.pageIndex + 1 < pageCount);
	return (
		<div>

			<span><a href="#" href={toUrl(search, { pageIndex: 0 })}>First</a> </span>

			{showPrev && <span><a href="#" href={toUrl(search, { pageIndex: entries.pageIndex - 1 })}>&lt; Prev</a> </span>}

			{pages.map((_, pageIndex) => {
				let active = (pageIndex === entries.pageIndex) ? "active" : null;				
				return (<span key={pageIndex}><a href={toUrl(search, { pageIndex })} className={active}>{pageIndex + 1}</a> </span>);
			})}	

			{showNext && <span><a href="#" href={toUrl(search, { pageIndex: entries.pageIndex + 1 })}>Next &gt;</a> </span>}
			
			<span><a href="#" href={toUrl(search, { pageIndex: pageCount - 1 })}>Last</a> </span>

		</div>
	);
}

export default Pager;
