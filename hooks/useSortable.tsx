import { useEffect, useRef } from "react";
import Sortable, { SortableOptions } from "sortablejs";

const useSortable = (options: SortableOptions = {}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create Sortable instance with options
        const sortable = Sortable.create(containerRef.current, {
            group: options.group || "default", // Allows sharing across lists
            sort: options.sort ?? true, // Enable sorting
            disabled: options.disabled ?? false, // Disable dragging
            animation: options.animation || 200, // Animation speed in ms
            easing: options.easing || "cubic-bezier(1, 0, 0, 1)", // Animation easing
            handle: options.handle || undefined, // Drag handle selector
            draggable: options.draggable || ".draggable", // Draggable item selector
            ghostClass: options.ghostClass || "ghost", // Class for the ghost element
            chosenClass: options.chosenClass || "chosen", // Class for chosen item
            dragClass: options.dragClass || "dragging", // Class for dragging item
            forceFallback: options.forceFallback ?? false, // Fallback to simple drag-and-drop
            fallbackClass: options.fallbackClass || "fallback", // Class for fallback item
            fallbackOnBody: options.fallbackOnBody ?? false, // Append fallback element to <body>
            fallbackTolerance: options.fallbackTolerance || 0, // Distance before fallback kicks in
            swapThreshold: options.swapThreshold || 1, // Swap threshold (0 to 1)
            invertSwap: options.invertSwap ?? false, // Invert swap zones
            invertedSwapThreshold: options.invertedSwapThreshold || 1, // Threshold for inverting swap
            direction: options.direction || "horizontal", // Sorting direction ('horizontal' or 'vertical')

            // Event callbacks
            onStart: options.onStart || (() => {}),
            onEnd: options.onEnd || (() => {}),
            onAdd: options.onAdd || (() => {}),
            onUpdate: options.onUpdate || (() => {}),
            onSort: options.onSort || (() => {}),
            onRemove: options.onRemove || (() => {}),
            onChoose: options.onChoose || (() => {}),
            onUnchoose: options.onUnchoose || (() => {}),
            onChange: options.onChange || (() => {}),
            onClone: options.onClone || (() => {}),
            onFilter: options.onFilter || (() => {}),
            onMove: options.onMove || (() => {}),
        });

        // Cleanup
        return () => {
            sortable.destroy();
        };
    }, [options]);

    return containerRef;
};

export default useSortable;
