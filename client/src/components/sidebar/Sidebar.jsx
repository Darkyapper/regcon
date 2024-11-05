import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome,  FaCheckCircle, FaRegFile, FaChartPie } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdEvent, MdCollectionsBookmark } from "react-icons/md";
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
                            <Link
                                to="/dashboard"
                                className="flex items-center p-2 text-[#EDEDED] rounded-lg hover:bg-orange-800 group"
                            >
                                <FaHome className="w-5 h-5" />
                                <span className="ms-3">Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/attendance-validation" className="flex items-center p-2 text-[#EDEDED] rounded-lg hover:bg-orange-800 group">
                                <FaCheckCircle className="w-5 h-5" />
                                <span className="ms-3">Validar Asistencia</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-orange-800"
                                onClick={toggleRegistroMenu}
                            >
                                <MdCollectionsBookmark className="w-5 h-5" />
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">Registro</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${isRegistroOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <Link
                                        to="/register"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Consultar Registros
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register/add"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Crear Registros
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/register/print"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Crear Informe
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-orange-800"
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
                                    <Link
                                        to="/tickets"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Administrar Boletos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/tickets/add'
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Crear Boletos
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/tickets/print"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Crear Informe
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-orange-800"
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
                                    <Link
                                        to="/users"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Administrar Usuarios
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/users/add"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Registrar Usuarios
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/users/print"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Crear Informe
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-orange-800"
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
                                    <Link
                                        to="/events"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Administrar Eventos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/events/add"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Crear Eventos
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base text-[#EDEDED] transition duration-75 rounded-lg group hover:bg-orange-800"
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
                                    <Link
                                        to="/my-workgroup"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Mi Grupo de Trabajo
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center w-full p-2 text-[#EDEDED] transition duration-75 rounded-lg pl-11 group hover:bg-orange-800"
                                    >
                                        Mi Perfil
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/settings" className="flex items-center p-2 text-[#EDEDED] rounded-lg hover:bg-orange-800 group">
                                <FaChartPie className="w-5 h-5" />
                                <span className="ms-3">Estadísticas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="flex items-center p-2 text-[#EDEDED] rounded-lg hover:bg-orange-800 group">
                                <IoMdSettings className="w-5 h-5" />
                                <span className="ms-3">Ajustes</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
