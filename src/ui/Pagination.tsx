type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex justify-center gap-2 mt-6">
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`
            px-3 py-1 rounded-md border-2
            ${
							page === currentPage
								? "bg-green-medium border-green-medium text-black-dark"
								: "border-green-light text-white hover:bg-green-light hover:text-black-dark"
						}
            transition
          `}
				>
					{page}
				</button>
			))}
		</div>
	);
}
