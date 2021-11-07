import React, { useEffect, useState } from 'react';
import PageAuthWrapper from '../components/Layout/AuthorizedLayout';
import axios from 'axios';
import { httpRequest } from '../helpers/httpRequest';
import _ from 'lodash';
import cogoToast from 'cogo-toast';
import { connect } from 'react-redux';

function adminSlidingImages(props) {
    const [image, setClient] = useState({ title: '', image: null })
    const [images, setClients] = useState([])
    const handleInput = (e) => {
        const name = e.target.name
        if (name == 'image') {
            setClient({ ...image, image: e.target.files[0] })
        }
        if (name == 'title') {
            setClient({ ...image, title: e.target.value })
        }
    }
    const getClients = async () => {
        const { response, error } = await httpRequest("GET", "/image/getAll/location",null,{"Authorization":props.login.token});
        if (!error) {
            setClients(response.data.data);
        }
    }

    useEffect(() => {
        getClients();
    }, [])
    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append("file", image.image);
        formData.append("title", image.title);
        formData.append("type", "location");
        axios.post(`${process.env.BACKEND_URL}/image`, formData,{headers: {"Authorization":props.login.token}}).then(data => {
            cogoToast.success(data.data.message)
            getClients();
        })
    };
    const handleDelete=async(id)=>{
        const { response, error } = await httpRequest("DELETE", `/image/${id}`,null,{"Authorization":props.login.token});
        if (!error) {
            cogoToast.success(response.data.message)
            getClients();
        }
    }
    return (
        <PageAuthWrapper>
            <div className="text-center text-2xl p-4 underline dark">
                <p>Add and Manages images for your Event locations</p>
            </div>
            <div className="m-3 p-3 grid grid-cols-1 md:grid-cols-2">
                <div>
                    <form className="w-full max-w-sm border-2 border-grey-500 p-4">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                    Title
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={image.title} name="title" onInput={handleInput} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                    Image
                                </label>
                            </div>
                            <div>
                                <label
                                    className="w-auto flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                                    <i className="fas fa-cloud-upload-alt fa-3x"></i>
                                    <span className="mt-2 text-base leading-normal">Select a file</span>
                                    <input type='file' name="image" className="hidden" accept="image/*" onChange={handleInput} />
                                </label>
                            </div>
                        </div>

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button onClick={onFileUpload} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    Upload
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <div>
                    <table className="min-w-full border-collapse block md:table">
                        <thead className="block md:table-header-group">
                            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Title</th>
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Image</th>
                                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Action</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group">
                            {
                                _.map(images, (c, index) => {
                                    return <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row" key={index}>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{c.title}</td>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><img className="h-32 w-48" src={c.image} alt="Image" /></td>
                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                            <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded" onClick={e=>handleDelete(c.id)}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </PageAuthWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
}

export default connect(mapStateToProps)(adminSlidingImages);