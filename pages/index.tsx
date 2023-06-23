//Dit zijn de componenten die nodig zijn om de api data te kunnen fetchen en om de tailwind css te kunnen gebruiken.
"use client"
import useSWR from 'swr';
import '../src/app/globals.css'
import 'tailwindcss/tailwind.css';

export default function Index() {
    //Hier word de steam api data gefetched van de json url met behulp van SWR.
    const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
    const { data } = useSWR('/api/steamdata', fetcher);
    return (
        //Dit is de index pagina waar ik mijn steam data laat zien met behulp van simpele javascript.
        //Ook heb ik tailwind gebruikt voor de opmaak.
        <main className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 min-h-screen md:p-24 p-6 bg-sky-900">
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Avatar</p>
                </div>
                <div className='flex justify-center items-center h-60 bg-sky-700'>
                    <img src={data?.steam.getAvatar} alt="" />
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Username</p>
                </div>
                <div className='flex justify-center items-center h-60 bg-sky-700'>
                    <p>{data?.steam.getPersonName}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Status</p>
                </div>
                <div className='flex justify-center items-center h-60 bg-sky-700'>
                    <p>{data?.steam.getStatus}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Profile Url</p>
                </div>
                <div className='flex text-center justify-center items-center h-60 bg-sky-700'>
                    <p>{data?.steam.getprofileUrl}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Profile Visibility</p>
                </div>
                <div className='flex justify-center items-center h-60 bg-sky-700'>
                    <p>{data?.steam.getCommunityVisibilityState}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Last Logged Off</p>
                </div>
                <div className='flex justify-center items-center h-60 bg-sky-700'>
                    <p>{data?.steam.getLastLogOff}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Steam ID</p>
                </div>
                <div className='flex justify-center items-center h-60 bg-sky-700'>
                    <p>{data?.steam.getSteamID}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-center items-center h-12 bg-sky-800'>
                    <p>Allows Comments</p>
                </div>
                <div className='flex text-center justify-center items-center h-60 bg-sky-700'>
                    <p>{data?.steam.getCommentPermission}</p>
                </div>
            </div>
        </main>
    )
}
