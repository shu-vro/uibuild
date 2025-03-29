import { FreshNode, Node, useEditor, useNode } from "@craftjs/core";
import { useCallback, useEffect, useRef } from "react";
import { BsArrowsMove } from "react-icons/bs";
import ReactDOM from "react-dom";
import { MdOutlineArrowUpward } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { ROOT_NODE } from "@craftjs/utils";
import { cn } from "@/lib/utils";
import { FaRegClone } from "react-icons/fa6";
import shortid from "shortid";

export default function RenderNode({ render }) {
    const { id } = useNode();
    const { actions, query, isActive, enabled } = useEditor((_, query) => ({
        isActive: query.getEvent("selected").contains(id),
        enabled: query.getOptions().enabled,
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

    const getCloneTree = useCallback((idToClone) => {
        const tree = query.node(idToClone).toNodeTree();
        const newNodes = {};

        const changeNodeId = (node: Node, newParentId?: string) => {
            const newNodeId = shortid();

            const childNodes = node.data.nodes.map((childId) =>
                changeNodeId(tree.nodes[childId], newNodeId),
            );
            const linkedNodes = Object.keys(node.data.linkedNodes).reduce(
                (accum, id) => {
                    const newNodeId2 = changeNodeId(
                        tree.nodes[node.data.linkedNodes[id]],
                        newNodeId,
                    );
                    return {
                        ...accum,
                        [id]: newNodeId2,
                    };
                },
                {},
            );

            newNodes[newNodeId] = {
                ...node,
                id: newNodeId,
                data: {
                    ...node.data,
                    parent: newParentId || node.data.parent,
                    nodes: childNodes,
                    linkedNodes,
                },
            };

            return newNodeId;
        };

        const rootNodeId = changeNodeId(tree.nodes[tree.rootNodeId]);
        return {
            rootNodeId,
            nodes: newNodes,
        };
    }, []);

    const handleClone = (e, id) => {
        e.preventDefault();
        const parentNode = query.node(parent).get();
        const indexToAdd = parentNode.data.nodes.indexOf(id);
        const tree = getCloneTree(id); // id is the node id
        actions.addNodeTree(tree, parentNode.id, indexToAdd + 1);

        //  problem and solution
        //  see https://github.com/prevwong/craft.js/issues/209

        setTimeout(function () {
            actions.deserialize(query.serialize());
            actions.selectNode(tree.rootNodeId);
        }, 100);
    };

    return (
        <>
            {(isHover || isActive) && enabled
                ? ReactDOM.createPortal(
                      <div
                          ref={currentRef}
                          className={cn(
                              "p-1 text-white text-sm fixed flex items-center",
                              {
                                  "bg-primary/80": isActive,
                                  "bg-secondary/80": isHover,
                              },
                          )}
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
                          {id !== ROOT_NODE ? (
                              <div
                                  className="mr-2 cursor-copy"
                                  onClick={(e) => handleClone(e, id)}
                              >
                                  <FaRegClone />
                              </div>
                          ) : null}
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
