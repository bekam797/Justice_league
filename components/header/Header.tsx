// import siteMetadata from '@/data/siteMetadata'
// import headerNavLinks from '@/data/headerNavLinks'
// import Logo from '@/data/logo.svg'
// import Link from '../Link'
// import MobileNav from '../MobileNav'
// import SearchButton from '../SearchButton'

// const Header = () => {
//   let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
//   if (siteMetadata.stickyNav) {
//     headerClass += ' sticky top-0 z-50'
//   }

//   return (
//     <header className={headerClass}>
//       <Link href="/" aria-label={siteMetadata.headerTitle}>
//         <div className="flex items-center justify-between">
//           <div className="mr-3">Logo</div>
//         </div>
//       </Link>
//       <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
//         <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
//           {headerNavLinks
//             .filter((link) => link.href !== '/')
//             .map((link) => (
//               <Link
//                 key={link.title}
//                 href={link.href}
//                 className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
//               >
//                 {link.title}
//               </Link>
//             ))}
//         </div>
//         <MobileNav />
//       </div>
//     </header>
//   )
// }

// export default Header

'use client'

import { JusticeLogo } from '@/components/header/justice-logo'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full`}>
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="relative h-16 w-[114px]">
          <JusticeLogo isScrolled={scrolled} />
        </Link>

        <div className="flex items-center gap-1">
          <button className="group flex h-[64px] cursor-pointer items-center justify-between gap-2 rounded-[8px] bg-[#1A1A1A] px-6">
            <span className="font-justice text-base text-white">EN</span>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="flex h-[64px] cursor-pointer items-center justify-between gap-2 rounded-[8px] bg-[#3c380d] px-6">
            <span className="font-justice text-base text-white">Menu</span>
            <div className="flex flex-col gap-[7px]">
              <div className="h-[2px] w-6 bg-white"></div>
              <div className="h-[2px] w-6 bg-white"></div>
              <div className="h-[2px] w-6 bg-white"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
