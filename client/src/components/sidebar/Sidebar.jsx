import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaDatabase, FaRegFile } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

export default function Sidebar() {
    const [isRegistroOpen, setIsRegistroOpen] = useState(false);
    const [isBoletosOpen, setIsBoletosOpen] = useState(false);
    const [isUsuariosOpen, setIsUsuariosOpen] = useState(false);
    const [isEventosOpen, setIsEventosOpen] = useState(false);
    const [isEquipoOpen, setIsEquipoOpen] = useState(false);

    const toggleRegistroMenu = () => {
        setIsRegistroOpen(!isRegistroOpen);
        setIsBoletosOpen(false);
        setIsUsuariosOpen(false);
        setIsEventosOpen(false);
        setIsEquipoOpen(false);
    };

    const toggleBoletosMenu = () => {
        setIsBoletosOpen(!isBoletosOpen);
        setIsRegistroOpen(false);
        setIsUsuariosOpen(false);
        setIsEventosOpen(false);
        setIsEquipoOpen(false);
    };

    const toggleUsuariosMenu = () => {
        setIsUsuariosOpen(!isUsuariosOpen);
        setIsRegistroOpen(false);
        setIsBoletosOpen(false);
        setIsEventosOpen(false);
        setIsEquipoOpen(false);
    };

    const toggleEventosMenu = () => {
        setIsEventosOpen(!isEventosOpen);
        setIsRegistroOpen(false);
        setIsBoletosOpen(false);
        setIsUsuariosOpen(false);
        setIsEquipoOpen(false);
    };

    const toggleEquipoMenu = () => {
        setIsEquipoOpen(!isEquipoOpen);
        setIsRegistroOpen(false);
        setIsBoletosOpen(false);
        setIsUsuariosOpen(false);
        setIsEventosOpen(false);
    };

    return (
        <div>
            <aside
                id="separator-sidebar"
                className="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#EB6D1E]"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#EB6D1E]">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-[#EDEDED] rounded-lg hover:bg-gray-100 group"
                            >
                                <FaHome className="w-5 h-5" />
                                <span className="ms-3">Inicio</span>
                            </a>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-gray-100"
                                onClick={toggleRegistroMenu}
                            >
                                <FaDatabase className="w-5 h-5" />
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">Registro</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${isRegistroOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                                    >
                                        Usuarios
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-gray-100"
                                onClick={toggleBoletosMenu}
                            >
                                <FaRegFile className="w-5 h-5" />
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">Boletos</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${isBoletosOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                                    >
                                        Usuarios
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-gray-100"
                                onClick={toggleUsuariosMenu}
                            >
                                <HiOutlineUserGroup className="w-5 h-5" />
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">Usuarios</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${isUsuariosOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                                    >
                                        Usuarios
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-gray-100"
                                onClick={toggleEventosMenu}
                            >
                                <MdEvent className="w-5 h-5" />
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">Eventos</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${isEventosOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                                    >
                                        Usuarios
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-gray-100"
                                onClick={toggleEquipoMenu}
                            >
                                <HiOutlineUserGroup className="w-5 h-5" />
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">Equipo</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${isEquipoOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-gray-100"
                                    >
                                        Usuarios
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-[#EDEDED] rounded-lg hover:bg-gray-100 group"
                            >
                                <IoMdSettings className="w-5 h-5" />
                                <span className="ms-3">Ajustes</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
