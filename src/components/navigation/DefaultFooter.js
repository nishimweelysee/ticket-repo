import React from 'react';
import Button from '../common/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from '../common/textInput';
import { Link } from 'react-router-dom';

const DefaultFooter = () => {
    return (
        <>
            <footer className="relative pt-8 pb-8 bg-maincolor ">
                <div id="footer-id" className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-wrap justify-around pt-6 text-center lg:text-left ">
                        <div className="w-full px-4 mb-5 lg:w-4/12 ">
                            <span className="text-base uppercase lg:text-2xl" >
                                <h2 className="text-sm text-white  md:text-base">Subscribe to our channel</h2>
                            </span>
                            <div className="inline gap-2 mt-8 md:flex">
                                <div><TextInput placeholder="Type your Email"></TextInput></div>
                                <div className="md:mt-4"><Button type="submit" className="">Subscribe</Button></div>
                            </div>
                            <div className="flex flex-col gap-2 text-white">
                                <Link className="hover:text-blue-700" to="/terms">Terms and Condidions</Link>
                                <Link className="hover:text-blue-700" to="/terms">Privacy</Link>
                            </div>

                        </div>
                        <div className="w-full px-4 lg:w-4/12 ">

                            <div className="flex flex-wrap items-top">
                                <div className="w-full px-4 mb-8 ml-auto md:mb-0">
                                    <span className="block mb-2 text-sm font-medium text-white uppercase">
                                        <h2 className=" md:text-lg ">Get In Touch</h2>
                                    </span>
                                    {/* <p className="text-sm text-white">Phone Number</p> */}
                                    <div className="justify-center mt-6 mb-8 jugap-2 md:justify-start md:mb-0 to-blue-500">
                                        <div id="phonenuber" className="flex justify-center gap-2 lg:justify-start">
                                            <div>
                                                <a
                                                    href="#"
                                                    className="flex items-center justify-center w-10 h-10 mb-3 font-normal text-blue-500 bg-white rounded-full shadow-md outline-none place-items-center align-center focus:outline-none"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FontAwesomeIcon icon={["fas", "phone"]} size="1x" />

                                                </a>
                                            </div>
                                            <div >
                                                <p className="pt-2 text-white">+250788787878</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="text-sm text-white">Email</p> */}
                                    <div className="justify-center gap-2 md:justify-start md:mb-0 to-blue-500">
                                        <div id="phonenuber" className="flex justify-center gap-2 lg:justify-start">
                                            <div>
                                                <a
                                                    href="#"
                                                    className="flex items-center justify-center w-10 h-10 mb-3 font-normal text-blue-500 bg-white rounded-full shadow-md outline-none place-items-center align-center focus:outline-none"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FontAwesomeIcon icon={["fas", "envelope"]} size="1x" />

                                                </a>
                                            </div>
                                            <div >
                                                <p className="pt-2 text-white">info@intercore.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full px-4 lg:w-4/12">
                            <span className="block mb-2 text-sm font-medium text-white uppercase">
                                <h2 className="text-sm md:text-base ">Find Us On</h2>
                            </span>
                            <div className="justify-center mt-6 mb-8 jugap-2 md:justify-start md:mb-0 to-blue-500 ">
                                <div id="facebook" className="flex justify-center gap-2 lg:justify-start">
                                    <div>
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-10 h-10 mb-3 font-normal text-blue-500 bg-white rounded-full shadow-md outline-none place-items-center align-center focus:outline-none"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FontAwesomeIcon icon={["fab", "facebook-f"]} size="1x" />

                                        </a>
                                    </div>
                                    <div >
                                        <p className="pt-2 text-white">Facebook</p>
                                    </div>
                                </div>

                                <div id="twitter" className="flex justify-center gap-2 mr-4 lg:justify-start">
                                    <div>
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-10 h-10 mb-3 font-normal text-blue-500 bg-white rounded-full shadow-md outline-none place-items-center align-center focus:outline-none"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FontAwesomeIcon icon={["fab", "twitter"]} size="1x" />

                                        </a>
                                    </div>
                                    <div>
                                        <p className="pt-2 text-white"> Twitter</p>
                                    </div>
                                </div>

                                <div id="youtube" className="flex justify-center gap-2 lg:justify-start">
                                    <div>
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-10 h-10 mb-3 font-normal text-blue-500 bg-white rounded-full shadow-md outline-none place-items-center align-center focus:outline-none"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FontAwesomeIcon icon={["fab", "youtube"]} size="1x" />

                                        </a>
                                    </div>
                                    <div>
                                        <p className="pt-2 text-white">YouTube</p>
                                    </div>
                                </div>
                                <div id="linkedin" className="flex justify-center gap-2 lg:justify-start">
                                    <div>
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-10 h-10 mb-3 font-normal text-blue-500 bg-white rounded-full shadow-md outline-none place-items-center align-center focus:outline-none"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FontAwesomeIcon icon={["fab", "linkedin"]} size="1x" />

                                        </a>
                                    </div>
                                    <div>
                                        <p className="pt-2 text-white">linkedIn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap items-center justify-center md:justify-between">
                        <div className="w-full px-4 mx-auto text-center md:w-6/12">
                            <div className="py-1 text-sm font-medium text-white">
                                Ticket Rwanda Powered by  Intercore Group LTD | Designed By{' '}
                                <a
                                    href="#"
                                    className="text-white transition-all hover:text-gray-900"
                                >
                                    Nishimwe Elysee
                                </a>
                                .
                            </div>
                            <div className="scroll-top ">
                                <Button type="button" onClick={e=>window.scroll(0,0)}>Back to top</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default DefaultFooter;