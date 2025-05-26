// frontend/src/components/PropertyImageGallery.js
'use client'; 

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function PropertyImageGallery({ 
  images, 
  initialTitle = "Imagen de la propiedad" 
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <Image src="/placeholder-image.png" alt="No hay imagen disponible" width={300} height={225} className="opacity-50 object-contain" /> {/* Ajustado tamaño placeholder */}
      </div>
    );
  }

  const lightboxSlides = images.map(img => ({ 
    src: img.original, // 'original' contiene la URL completa para el lightbox
    alt: img.alt || initialTitle,
  }));

  const openLightboxAtIndex = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  let visibleGalleryLayout;
  const numImages = images.length;

  // Imagen Principal (siempre la primera del array 'images' si hay alguna)
  const mainDisplayImage = images[0];

  if (numImages === 1) {
    visibleGalleryLayout = (
      <div 
        className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 cursor-pointer" // Usando aspect-video
        onClick={() => openLightboxAtIndex(0)}
      >
        <Image 
            src={mainDisplayImage.original} 
            alt={mainDisplayImage.alt || initialTitle} 
            fill 
            className="object-cover" 
            sizes="(max-width: 1023px) 100vw, 66vw" 
            priority 
            unoptimized={mainDisplayImage.original?.includes('http://localhost:1337')} 
        />
      </div>
    );
  } else { // 2 o más imágenes: Muestra la primera grande y las siguientes como miniaturas
    visibleGalleryLayout = (
      <>
        <div 
          className="relative w-full aspect-video mb-2 rounded-lg overflow-hidden shadow-lg bg-gray-100 cursor-pointer" // Usando aspect-video
          onClick={() => openLightboxAtIndex(0)} // Al hacer clic en la grande, abre el lightbox en la primera imagen
        >
          <Image 
            src={mainDisplayImage.original} 
            alt={mainDisplayImage.alt || initialTitle} 
            fill 
            className="object-cover" 
            sizes="(max-width: 1023px) 100vw, 66vw" 
            priority 
            unoptimized={mainDisplayImage.original?.includes('http://localhost:1337')} 
          />
        </div>
        
        {/* Miniaturas (solo se muestran si hay más de 1 imagen) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mt-2">
          {/* Mapeamos DESDE la segunda imagen para las miniaturas visibles */}
          {images.slice(0, 6).map((image, index) => ( // Mostrar hasta 6 miniaturas en la página. Todas estarán en el lightbox.
            <div 
              key={image.id || image.original || index} 
              className="relative aspect-square rounded overflow-hidden cursor-pointer border-2 border-transparent hover:border-schonfeld-red bg-gray-100"
              onClick={() => openLightboxAtIndex(index)} // El 'index' aquí es el índice del array 'images' completo
            >
              <Image 
                src={image.thumbnail} 
                alt={image.alt || `Miniatura ${index + 1}`}
                fill 
                className="object-cover" 
                sizes="20vw" 
                unoptimized={image.thumbnail?.includes('http://localhost:1337')}
              />
            </div>
          ))}
        </div>
        {numImages > 6 && <p className="text-xs text-center mt-2 text-gray-500">(Total: {numImages} imágenes. Haz clic para ver todas)</p>}
      </>
    );
  }

  return (
    <>
      {visibleGalleryLayout}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={lightboxIndex}
          on={{ view: ({ index: currentIndex }) => setLightboxIndex(currentIndex) }}
          plugins={[Thumbnails, Zoom]}
          carousel={{ finite: numImages <= 5 }}
          thumbnails={{ position: "bottom", width: 100, height: 80, border: 1, borderRadius: 4, padding: 4, gap: 16 }}
          zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        />
      )}
    </>
  );
}
