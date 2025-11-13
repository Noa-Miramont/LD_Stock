import Image from "next/image";

export default function Footer() {
  return (
    <header className="fixed w-full flex flex-row items-center justify-between bg-white px-12 py-4 z-100">
        <Image className='w-[120px] h-auto' src="/logo/logo.png" width={250} height={250} alt="logo" />
        <nav className="flex flex-row items-center justify-center gap-[40px] Poppins">
            <ol className="flex flex-row items-center justify-center gap-[35px]">
                <li className="text-black text-base"><a href="/">Acceuil</a></li>
                <li className="text-base"><a href="/">Catalogue</a></li>
                <li className="text-base"><a href="/">Contact</a></li>
            </ol>
            <ol>
                <li><a className="bg-black text-white text-lg font-medium rounded-xl py-3 px-5" href="/">demander un devis</a></li>
            </ol>
        </nav>
    </header>
  );
}