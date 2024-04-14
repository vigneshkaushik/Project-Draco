import { useEffect, useState, useRef, useContext } from "react";
import {
    // exportToCanvas,
    // exportToSvg,
    exportToBlob,
    exportToClipboard,
    Excalidraw,
    useHandleLibrary,
    // MIME_TYPES,
    // sceneCoordsToViewportCoords,
    // viewportCoordsToSceneCoords,
    // restoreElements,
    // LiveCollaborationTrigger,
    // MainMenu,
    // Footer,
    // Sidebar
} from "@excalidraw/excalidraw";

import initialData from "../initialData";

import { nanoid } from "nanoid";
import {
    resolvablePromise,
    // withBatchedUpdates,
    // withBatchedUpdatesThrottled,
    // distance2d
} from "../utils";
import { StateContext } from "../App";


export default function Canvas() {
    const appRef = useRef(null);
    const [gridModeEnabled, setGridModeEnabled] = useState(false);
    const [blobUrl, setBlobUrl] = useState("");
    const [canvasUrl, setCanvasUrl] = useState("");
    const [theme, setTheme] = useState("light");
    // const [exportWithDarkMode, setExportWithDarkMode] = useState(false);
    // const [exportEmbedScene, setExportEmbedScene] = useState(false);
    // const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    const { excalidrawAPI, setExcalidrawAPI, exportWithDarkMode, exportEmbedScene } = useContext(StateContext);
    const initialStatePromiseRef = useRef({ promise: null });
    if (!initialStatePromiseRef.current.promise) {
        initialStatePromiseRef.current.promise = resolvablePromise();
    }


    useHandleLibrary({ excalidrawAPI });

    useEffect(() => {
        if (!excalidrawAPI) {
            return;
        }
        const fetchData = async () => {
            const reader = new FileReader();
            reader.onload = function () {
                //@ts-ignore
                initialStatePromiseRef.current.promise.resolve(initialData);
            };
        };
        fetchData();
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
                    className="reset-scene text-xs my-0 h-10 p-[10px] rounded-lg border-2 border-white box-border bg-blue-200 text-slate-700 hover:bg-blue-100"
                    onClick={ () => {
                        excalidrawAPI?.resetScene();
                    } }
                >
                    Reset
                </button >
                <button
                    className="text-xs my-0 h-10 p-[10px] rounded-lg border-2 border-white box-border bg-blue-200 text-slate-700 hover:bg-blue-100 w-fit-content"
                    onClick={ async () => {
                        if (!excalidrawAPI) {
                            return;
                        }
                        const blob = await exportToBlob({
                            elements: excalidrawAPI?.getSceneElements(),
                            mimeType: "image/jpeg",
                            appState: {
                                ...initialData.appState,
                                exportEmbedScene,
                                exportWithDarkMode
                            },
                            files: excalidrawAPI?.getFiles()
                        });
                        setBlobUrl(window.URL.createObjectURL(blob));
                    } }
                >
                    Export
                </button>
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
            {/* <div className="button-wrapper">
                <div>
                    <button onClick={ onCopy.bind(null, "png") }>
                        Copy to Clipboard as PNG
                    </button>
                    <button onClick={ onCopy.bind(null, "svg") }>
                        Copy to Clipboard as SVG
                    </button>
                    <button onClick={ onCopy.bind(null, "json") }>
                        Copy to Clipboard as JSON
                    </button>
                </div>
            </div> */}

            <div className="w-full h-full">
                <Excalidraw
                    excalidrawAPI={ (api) => {
                        setExcalidrawAPI(api);
                    } }
                    gridModeEnabled={ gridModeEnabled }
                    theme={ theme }
                    name="Custom name of drawing"
                    UIOptions={ {
                        canvasActions: { loadScene: false }
                    } }
                    renderTopRightUI={ renderTopRightUI }
                >
                </Excalidraw>
            </div>

            {/* <div className="export-wrapper button-wrapper">
                    <label className="export-wrapper__checkbox">
                        <input
                            type="checkbox"
                            checked={ exportWithDarkMode }
                            onChange={ () => setExportWithDarkMode(!exportWithDarkMode) }
                        />
                        Export with dark mode
                    </label>
                    <label className="export-wrapper__checkbox">
                        <input
                            type="checkbox"
                            checked={ exportEmbedScene }
                            onChange={ () => setExportEmbedScene(!exportEmbedScene) }
                        />
                        Export with embed scene
                    </label>
                    <button
                        onClick={ async () => {
                            if (!excalidrawAPI) {
                                return;
                            }
                            const svg = await exportToSvg({
                                elements: excalidrawAPI?.getSceneElements(),
                                appState: {
                                    ...initialData.appState,
                                    exportWithDarkMode,
                                    exportEmbedScene,
                                    width: 300,
                                    height: 100
                                },
                                files: excalidrawAPI?.getFiles()
                            });
                            appRef.current.querySelector(".export-svg").innerHTML =
                                svg.outerHTML;
                        } }
                    >
                        Export to SVG
                    </button>
                    <div className="export export-svg"></div>

                    <button
                        onClick={ async () => {
                            if (!excalidrawAPI) {
                                return;
                            }
                            const blob = await exportToBlob({
                                elements: excalidrawAPI?.getSceneElements(),
                                mimeType: "image/jpeg",
                                appState: {
                                    ...initialData.appState,
                                    exportEmbedScene,
                                    exportWithDarkMode
                                },
                                files: excalidrawAPI?.getFiles()
                            });
                            setBlobUrl(window.URL.createObjectURL(blob));
                        } }
                    >
                        Export to Blob
                    </button>
                    <div className="export export-blob">
                        <img src={ blobUrl } alt="" />
                    </div>
                </div> */}
        </div>
    );
}
