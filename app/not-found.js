import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex justify-center items-center">
      <Link className="custom_transition px-11 py-[14px] bg-sky-400 hover:bg-sky-500 text-lg font-semibold rounded-[50px] capitalize text-white" href="/">Return Home</Link>
    </div>
  )
}