import { useEditor, useNode } from "@craftjs/core";
import { useCallback, useEffect, useRef } from "react";
import { BsArrowsMove } from "react-icons/bs";
import ReactDOM from "react-dom";
import { MdOutlineArrowUpward } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { ROOT_NODE } from "@craftjs/utils";

export default function RenderNode({ render }) {
    const { id } = useNode();
    const { actions, query, isActive } = useEditor((_, query) => ({
        isActive: query.getEvent("selected").contains(id),
    }));

    const {
        isHover,
        dom,
        name,
        moveable,
        deletable,
        connectors: { drag },
        parent,
    } = useNode((node) => ({
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        moveable: query.node(node.id).isDraggable(),
        deletable: query.node(node.id).isDeletable(),
        parent: node.data.parent,
        props: node.data.props,
    }));

    const currentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (dom) {
            if (isActive || isHover) dom.classList.add("component-selected");
            else dom.classList.remove("component-selected");
        }
    }, [dom, isActive, isHover]);

    const getPos = useCallback((dom: HTMLElement) => {
        const { top, left, bottom } = dom
            ? dom.getBoundingClientRect()
            : { top: 0, left: 0, bottom: 0 };
        return {
            top: `${top > 0 ? top : bottom}px`,
            left: `${left}px`,
        };
    }, []);

    const scroll = useCallback(() => {
        const { current: currentDOM } = currentRef;

        if (!currentDOM) return;
        const { top, left } = getPos(dom!);
        currentDOM.style.top = top;
        currentDOM.style.left = left;
    }, [dom, getPos]);

    useEffect(() => {
        if (!dom) return;
        let crenderer = document.querySelector(".craftjs-renderer");
        if (!crenderer) return;
        crenderer.addEventListener("scroll", scroll);

        return () => {
            document
                .querySelector(".craftjs-renderer")!
                .removeEventListener("scroll", scroll);
        };
    }, [scroll]);

    return (
        <>
            {isHover || isActive
                ? ReactDOM.createPortal(
                      <div
                          ref={currentRef}
                          className="p-1 text-white text-sm bg-primary/80 fixed flex items-center"
                          style={{
                              zIndex: 9999,
                              left: getPos(dom!).left,
                              top: `${parseFloat(getPos(dom!).top) - 31}px`,
                          }}
                      >
                          <h2 className="flex-1 mr-4">{name}</h2>
                          {moveable ? (
                              <div ref={drag as React.Ref<HTMLDivElement>}>
                                  <BsArrowsMove className="mr-2 cursor-move" />
                              </div>
                          ) : null}
                          {id !== ROOT_NODE && (
                              <div
                                  className="mr-2 cursor-pointer"
                                  onClick={() => {
                                      actions.selectNode(parent as string);
                                  }}
                              >
                                  <MdOutlineArrowUpward />
                              </div>
                          )}
                          {deletable ? (
                              <div
                                  className="cursor-pointer"
                                  onMouseDown={(e: React.MouseEvent) => {
                                      e.stopPropagation();
                                      actions.delete(id);
                                  }}
                              >
                                  <AiOutlineDelete />
                              </div>
                          ) : null}
                      </div>,
                      document.querySelector(".page-container")!,
                  )
                : null}
            {render}
        </>
    );
}
