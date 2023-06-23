import '../src/app/globals.css'
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import Logo from '../public/img/icons/icon-72x72.png';

export default function Header() {
    return (
        <div className='flex space-x-4 bg-sky-950'>
            <div>
                <Image src={Logo} alt="" />
            </div>
            <div>
                <h1 className='inline-block align-middle'>Steam Player Summary</h1>
            </div>
        </div>
    )
}