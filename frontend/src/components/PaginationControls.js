// frontend/src/components/PaginationControls.js
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link'; // Aunque usemos router.push, Link puede ser útil para prefetching o estilo

export default function PaginationControls({ currentPage, pageCount, totalProperties }) {
  const router = useRouter();
  const searchParams = useSearchParams(); // Para obtener los filtros actuales
  const pathname = usePathname(); // Para la ruta base

  if (!pageCount || pageCount <= 1) {
    return null; // No mostrar paginación si hay 0 o 1 página
  }

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams); // Copia los filtros existentes
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(createPageURL(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      router.push(createPageURL(currentPage + 1));
    }
  };

  // Generar números de página para mostrar (lógica simple, se puede mejorar)
  let pageNumbers = [];
  const maxPagesToShow = 5; // Cuántos números de página mostrar a la vez
  if (pageCount <= maxPagesToShow) {
    pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  } else {
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (startPage > 1) {
        pageNumbers.unshift('...'); // Indicador de páginas anteriores
        pageNumbers.unshift(1);
    }
    if (endPage < pageCount) {
        pageNumbers.push('...'); // Indicador de páginas siguientes
        pageNumbers.push(pageCount);
    }
    // Eliminar duplicados si '...' está al lado de 1 o pageCount
    pageNumbers = [...new Set(pageNumbers)]; 
  }


  return (
    <div className="mt-12 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="text-sm text-gray-600">
        Página <span className="font-semibold">{currentPage}</span> de <span className="font-semibold">{pageCount}</span> ({totalProperties} propiedades)
      </div>
      <nav aria-label="Paginación">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Anterior
            </button>
          </li>

          {pageNumbers.map((page, index) => (
            <li key={`page-${page === '...' ? `ellipsis-${index}` : page}`}>
              {page === '...' ? (
                <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">...</span>
              ) : (
                <Link
                  href={createPageURL(page)}
                  className={`px-3 py-2 leading-tight border border-gray-300
                    ${currentPage === page 
                      ? 'text-schonfeld-red bg-red-50 border-schonfeld-red z-10' 
                      : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  {page}
                </Link>
              )}
            </li>
          ))}
          
          <li>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= pageCount}
              className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}