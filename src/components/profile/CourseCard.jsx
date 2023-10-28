import React from "react";

export default function CourseCard({ image,title,onClick, }) {
	return (
		<div>
			<div
				className='card  cursor-pointer shadow-xl border-2 shadow-slate-300  hover:shadow-pink-200 '
				id='coursecard'
                style={{height:'370px'}}>
				<div className='img-section' id='courseimg'>
					<img src={`http://localhost:3001/uploads/${image}`} />
				</div>

				<div className='content-section px-2'>
					<div className='text-center font-bold text-xl my-3 flex  flex-col items-center justify-center '>
						<p style={{color:'#a11afe'}}> {title} </p>
					</div>

					<div className='text-center' >
						<button className="studybtn" onClick={onClick}>Study</button>
					</div>
				</div>
			</div>

			
		</div>
	);
}
