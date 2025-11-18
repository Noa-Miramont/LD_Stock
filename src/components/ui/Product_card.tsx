import Image from "next/image"

// Types pour les props du composant
interface ProductCardProps {
    id: string
    image: string
    title: string
    description: string
    littleDescription: string
    price: string
    rentalPrice: string | number | null
    productType: string
    dimensions: {
        length: number
        width: number
        height: number
    }
}

export default function ProductCard({
    id,
    image,
    title,
    littleDescription,
    price,
    rentalPrice,
    productType,
    dimensions
    
}: ProductCardProps) {
 return (
    <article className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-lg h-full">
        <div className="relative h-60 w-full bg-neutral-200 overflow-hidden">
            <Image 
            className='w-full h-full object-cover' 
            src={image}
            alt={title}
            width={500}
            height={500}
            />
        </div>
        <div className="px-6 py-6 mt-6 flex flex-col flex-grow">
            <span className="Inter font-semibold text-xs py-1 px-2 border border-[#E5E5E5] rounded-[8px] w-min ">{productType}</span>

            <h2 className="Inter text-xl font-semibold pt-4">{title}</h2>
            <div className="mt-3 min-h-[3rem]">
                <p className="text-sm text-neutral-500">{littleDescription}</p>
            </div>
            <p className="mt-2 text-sm text-neutral-500">{dimensions.length}m x {dimensions.width}m x {dimensions.height}m</p>
            <h3 className="flex flex-col gap-1 mt-5 min-h-[4rem]">
                <span className="Inter text-xl">A partir de <span className="font-medium">{price}</span></span>
                {rentalPrice !== null && rentalPrice !== '' ? (
                    <span className="Inter text-lg text-[#727272]">Location: <span className="font-medium">{rentalPrice}</span></span>
                ) : (
                    <span className="Inter text-lg text-transparent">Location: </span>
                )}
            </h3>
            <a className="flex justify-center items-center  mt-auto border border-[#E5E5E5] rounded-lg bg-white py-2 text-md font-semibold text-black tracking-wide transition hover:bg-black hover:text-white" href={`/produit?id=${id}`}>
                Voir les détails
            </a>
        </div>
    </article>
  )
}