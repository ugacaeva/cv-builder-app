import { useNavigate } from "react-router-dom"
import TemplateThumbnail from "../../components/templates/TemplateThumbnail"
import { useResume } from "../../contexts/ResumeProvider"

export default function HomePage() {
    const navigate = useNavigate();
    const { dispatch } = useResume();

    const chooseTemplate = (id) => {
        dispatch({ type: "SET_TEMPLATE", payload: id });
        navigate("/create");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="pt-12 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                            Создайте профессиональное резюме
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 max-w-prose">
                            Редактируйте поля, выбирайте шаблон, настраивайте вид —
                            и скачивайте готовое резюме в PDF.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                onClick={() => navigate("/create")}
                                className="px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold shadow hover:bg-indigo-500"
                            >
                                Создать резюме
                            </button>

                            <button
                                onClick={() => navigate("/saved")}
                                className="px-4 sm:px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Мои резюме
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-semibold mb-4">Выберите шаблон</h3>

                        <div className="grid grid-cols-3 gap-3">
                            {["A", "B", "C"].map((t) => (
                                <TemplateThumbnail
                                    key={t}
                                    templateId={t}
                                    onClick={chooseTemplate}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
