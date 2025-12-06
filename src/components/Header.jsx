import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3">
                <div
                    className="inline-flex flex-none items-center justify-center w-11 h-11 rounded-lg font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
                >
                    CV
                </div>

                <div className="hidden sm:block">
                    <div className="text-lg font-semibold">CV Builder</div>
                    <div className="text-xs text-gray-500">Конструктор резюме</div>
                </div>
                </Link>
            </div>

            <nav className="flex items-center gap-2">
                <Link
                to="/create"
                className={`rounded-md font-medium
                    ${location.pathname === '/create' ? 'bg-indigo-600 text-white' : 'text-indigo-600 border border-indigo-600'}
                    px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm`}
                >
                Создать резюме
                </Link>

                <Link
                to="/saved"
                className={`rounded-md font-medium
                    ${location.pathname === '/saved' ? 'bg-indigo-600 text-white' : 'text-indigo-600 border border-indigo-600'}
                    px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm`}
                >
                Мои резюме
                </Link>
            </nav>
            </div>
        </div>
        </header>
    );
}
