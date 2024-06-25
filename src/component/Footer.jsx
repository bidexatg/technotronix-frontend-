import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <>
        <div className="bg-orange-500 py-[40px] px-[20px] lg:px-[50px] lg:flex justify-between">
            <div className="flex items-center">
                <p className="font-bold text-xl sm:justify-center">TECHNOTRONIX</p>
            </div>
            <div className="items-center">
                <h1 className="text-[18px] font-bold mb-[3px] lg:mb-[10px]">Useful link</h1>
                <ul className="flex lg:flex-col gap-3">
                    <li>
                        <a className="hover:text-white" href="">Home</a>
                    </li>
                    <li>
                        <a className="hover:text-white" href="">Contact</a>
                    </li>
                    <li>
                        <a className="hover:text-white" href="">Privacy Policy</a>
                    </li>
                    <li>
                        <a className="hover:text-white" href="">Terms and Condition</a>
                    </li>
                </ul>
            </div>
            <div>
            <h1 className="text-[18px] font-bold mb-[10px]">Follow Us</h1>
            <div className="flex gap-5">
                <FaFacebook />
                <FaTwitter />
                <FaSquareInstagram />
                <FaTiktok/>
            </div>
        </div>
        </div>
        <div className="bg-cyan-50 text-center py-[5px]">
            <p className="text-black">CREATED WITH <span className="text-blue-500 underline font-bold"><a href="https://www.instagram.com/bidexatg?igsh=NHg2cnJxcXNtc3Rq&utm_source=qr">BIDEX TECH</a></span></p>
        </div>
        <div className="bg-black text-white text-center py-[5px]">
            <p>&copy;Copyright Technotronix | ALL rights reserved</p>
        </div>
    </>
  )
}

export default Footer


