import { useEffect, useState, useRef, useContext } from "react";
import {
    // exportToCanvas,
    // exportToSvg,
    exportToBlob,
    exportToClipboard,
    Excalidraw,
    useHandleLibrary,
} from "@excalidraw/excalidraw";


import {
    resolvablePromise,
} from "../utils";
import { StateContext } from "../App";


export default function Canvas() {
    const appRef = useRef(null);
    const [gridModeEnabled, setGridModeEnabled] = useState(false);
    const [theme, setTheme] = useState("light");
    const [savedData, setSavedData] = useState();

    const { excalidrawAPI, setExcalidrawAPI, exportWithDarkMode, exportEmbedScene, savedCanvasStates, savedElements, savedFiles } = useContext(StateContext);
    const initialStatePromiseRef = useRef({ promise: null });
    if (!initialStatePromiseRef.current.promise) {
        initialStatePromiseRef.current.promise = resolvablePromise();
    }


    useHandleLibrary({ excalidrawAPI });

    useEffect(() => {
        if (!excalidrawAPI) {
            return;
        }
        setSavedData({
            elements: savedElements,
            appState: savedCanvasStates,
            files: savedFiles
        });
    }, [excalidrawAPI]);

    const renderTopRightUI = () => {
        return (
            <>
                <label className="py-2 flex gap-2">
                    <input

                        type="checkbox"
                        checked={ gridModeEnabled }
                        onChange={ () => setGridModeEnabled(!gridModeEnabled) }
                    />
                    <p>
                        Grid
                    </p>
                </label>
                <button
                    className="reset-scene text-xs my-0 h-10 p-[10px] rounded-lg border-2 border-white box-border bg-violet-200 text-slate-700 hover:bg-violet-100"
                    onClick={ () => {
                        excalidrawAPI?.resetScene();
                    } }
                >
                    Reset
                </button >
                <button
                    className="text-xs my-0 h-10 p-[10px] rounded-lg border-2 border-white box-border bg-violet-200 text-slate-700 hover:bg-violet-100 w-fit-content"
                    onClick={ async () => {
                        if (!excalidrawAPI) {
                            return;
                        }
                        const blob = await exportToBlob({
                            elements: excalidrawAPI?.getSceneElements(),
                            mimeType: "image/jpeg",
                            appState: {
                                ...savedCanvasStates,
                                exportEmbedScene,
                                exportWithDarkMode,
                            },
                            files: excalidrawAPI?.getFiles()
                        });
                        // Create a temporary anchor element
                        const a = document.createElement('a');
                        a.href = window.URL.createObjectURL(blob);
                        a.download = 'canvas_export.jpeg'; // Set the filename here

                        // Simulate a click on the anchor element to trigger download
                        a.click();

                        // Clean up
                        window.URL.revokeObjectURL(a.href);

                    } }
                >
                    Export
                </button >
            </>

        );
    };



    const onCopy = async (type) => { // "png" | "svg" | "json"
        if (!excalidrawAPI) {
            return false;
        }
        await exportToClipboard({
            elements: excalidrawAPI.getSceneElements(),
            appState: excalidrawAPI.getAppState(),
            files: excalidrawAPI.getFiles(),
            type
        });
        window.alert(`Copied to clipboard as ${type} successfully`);
    };



    return (
        <div className="w-full h-full border-0" ref={ appRef }>
            <div className="w-full h-full">
                <Excalidraw
                    excalidrawAPI={ (api) => {
                        setExcalidrawAPI(api);
                    } }
                    gridModeEnabled={ gridModeEnabled }
                    initialData={ savedData }
                    theme={ theme }
                    name="Custom name of drawing"
                    UIOptions={ {
                        canvasActions: { loadScene: false }
                    } }
                    renderTopRightUI={ renderTopRightUI }
                >
                </Excalidraw>
            </div>
        </div>
    );
}
