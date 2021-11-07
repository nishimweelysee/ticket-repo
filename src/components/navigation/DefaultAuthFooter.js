import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function DefaultAuthFooter(props) {
    return (
        <div>
            <footer className="relative pt-8 pb-8 bg-maincolor ">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-wrap justify-around pt-6 text-center lg:text-left ">
                        <div className="w-full px-4 lg:w-4/12 ">

                            <div className="flex flex-wrap items-top">
                                <div className="w-full px-4 mb-8 ml-auto md:mb-0">
                                    <span className="block mb-2 text-sm font-medium text-white  uppercase">
                                        <h2 className=" md:text-lg text-center">Get In Touch</h2>
                                    </span>
                                    <div className="flex flex-col sm:flex-row  gap-2 justify-center ">
                                        <div className="justify-center gap-2 md:justify-start md:mb-0 to-blue-500">
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
                                        <div className="justify-center  gap-2 md:justify-start md:mb-0 to-blue-500">
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
                        </div>
                        <div className="w-full px-4 lg:w-4/12">
                            <span className="block mb-2 text-sm font-medium text-white uppercase">
                                <h2 className="text-sm md:text-lg text-center">Find Us On</h2>
                            </span>
                            <div className="flex flex-col sm:flex-row gap-2 justify-center  mt-6 mb-8 jugap-2  md:mb-0 to-blue-500 ">
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
                                Copyright © {new Date().getFullYear()}  Intercore Group LTD | Designed By{' '}
                                <a
                                    href="#"
                                    className="text-white transition-all hover:text-gray-900"
                                >
                                    Nishimwe Elysee
                                </a>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default DefaultAuthFooter;