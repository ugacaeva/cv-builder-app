import { useNavigate } from "react-router-dom";

    export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-12 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Создайте профессиональное резюме
                </h1>

                <p className="mt-6 text-lg text-gray-600 max-w-prose">
                Редактируйте поля, выбирайте шаблон, настраивайте вид — и скачивайте готовое резюме в PDF.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                <button
                    onClick={() => navigate('/create')}
                    className="px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold shadow hover:bg-indigo-500"
                >
                    Создать резюме
                </button>

                <button
                    onClick={() => navigate('/saved')}
                    className="px-4 sm:px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Мои резюме
                </button>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                Здесь могла быть <strong>ваша реклама</strong>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="h-64 flex items-center justify-center border border-dashed border-gray-200 rounded">
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-500">Здесь будут Превью Шаблонов</p>
                </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">Шаблон A</div>
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">Шаблон B</div>
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">Шаблон C</div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}
