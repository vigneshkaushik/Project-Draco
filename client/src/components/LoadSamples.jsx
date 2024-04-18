import { useContext, useRef } from "react";
import { StateContext } from "../App";
import "../index.css";
import initialDataInterior from "../initialDataInterior";
import initialDataExterior from "../initialDataExterior";
import {
    restoreElements,
} from "@excalidraw/excalidraw";
import { MIME_TYPES } from "@excalidraw/excalidraw";
import {
    resolvablePromise,
    withBatchedUpdates,
    withBatchedUpdatesThrottled,
    distance2d
} from "../utils";
const LoadSamples = () => {
    const { desiredOutput, setDesiredOutput, setProjectData, excalidrawAPI } = useContext(StateContext);
    const initialStatePromiseRef = useRef({
        promise: null
    });
    if (!initialStatePromiseRef.current.promise) {
        initialStatePromiseRef.current.promise = resolvablePromise();
    }


    const handleLoadSample = (index) => {
        const fetchData = async () => {
            const res = await fetch(sampleFiles[index].imagePath);
            console.log('res', res);
            const imageData = await res.blob();
            const reader = new FileReader();
            reader.readAsDataURL(imageData);

            reader.onload = function () {
                const imagesArray = [
                    {
                        id: "imageId",
                        dataURL: reader.result,
                        mimeType: MIME_TYPES.jpg,
                        created: 1644915140367,
                        lastRetrieved: 1644915140367
                    }
                ];

                //@ts-ignore
                initialStatePromiseRef.current.promise.resolve(sampleFiles[index].initialData);
                excalidrawAPI.addFiles(imagesArray);
            };
        };
        fetchData();
        console.log('load project sample');
        const newDesiredOutput = {
            imageStyle: sampleFiles[index].imageStyle,
            architecturalStyle: sampleFiles[index].architecturalStyle,
            interiorExterior: sampleFiles[index].interiorExterior
        };

        const newProjectData = {
            location: sampleFiles[index].location,
            size: sampleFiles[index].size,
            typology: sampleFiles[index].typology,
            programs: sampleFiles[index].programs,
            description: sampleFiles[index].description
        };
        setDesiredOutput(newDesiredOutput);
        setProjectData(newProjectData);
        const sceneData = {
            elements: restoreElements(
                sampleFiles[index].initialData.elements,
                null
            ),
            appState: sampleFiles[index].initialData.appState
        };
        excalidrawAPI?.updateScene(sceneData);
    };
    const sampleFiles = [
        {
            imageStyle: "photographic",
            architecturalStyle: "scandinavian",
            interiorExterior: "interior",
            location: "Singapore",
            size: 120,
            typology: "residential",
            programs: "living room, dining area",
            description: "warm and cozy living room, with natural daylighting and high ceiling.",
            initialData: initialDataInterior,
            imagePath: "/images/living-room.jpeg"
        },
        {
            imageStyle: "photographic",
            architecturalStyle: "contemporary",
            interiorExterior: "exterior",
            location: "Singapore",
            size: 500,
            typology: "residential",
            programs: "3 bedrooms, front garden, living room, dining, balcony",
            description: "a spacious modern house with environmentally friendly materials. Lush front garden with trees.",
            initialData: initialDataExterior,
            imagePath: "/images/exterior.jpeg"
        }
    ];
    return (
        <div>
            <h3 className="text-center text-teal-200 font-semibold">OR</h3>
            <div className="relative w-full flex items-center gap-3">

                { sampleFiles.map((item, index) => (
                    <button
                        key={ index }
                        className="px-2 py-2.5 mt-2 w-full rounded-md border-teal-600 border-2 text-teal-200 text-base font-medium transition-colors duration-300 ease-in-out hover:bg-teal-950 focus:bg-teal-800"
                        onClick={ () => handleLoadSample(index) }
                    >Load <span className="font-bold text-white underline">{ item.interiorExterior }</span> example
                    </button>
                )) }
            </div>
        </div>
    );
};

export default LoadSamples;