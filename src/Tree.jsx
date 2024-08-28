/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    ModalBody,
    Select,
} from '@chakra-ui/react'
import { v4 } from "uuid";

const TreeView = () => {
    const [show, setShow] = useState(false);

    const generateUUID = () => {
        return v4();
    };
    const [expandedNodes, setExpandedNodes] = useState([]);
    const [data, setData] = useState([]);
    function SaveModal({ show, node, close }) {
        const newUUID = generateUUID();
        async function save(data) {
            if (data?.name !== "" && data?.name !== undefined && data?.name !== null) {
                await axios.post("https://netswifts.com/menus_project/public/api/menus", data).then(() => {
                    fetchData().then(() => {
                        onClose();
                    })
                }).catch(err => {
                    console.log('err:', err)
                })
            }
        }
        const { depth, parent_id, id } = node;
        const [name, setName] = useState("");
        function onClose() {
            close()
        }
        return (
            <Modal isOpen={show} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="menu-id" className="block text-gray-700 text-sm font-semibold mb-2">Menu ID</label>
                                <input type="text" id="menu-id" value={newUUID} readOnly className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="depth" className="block text-gray-700 text-sm font-semibold mb-2">Depth</label>
                                <input type="text" id="depth" value={depth} readOnly className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="parent-data" className="block text-gray-700 text-sm font-semibold mb-2">Parent Data</label>
                                <input type="text" id="parent-data" value={id} readOnly className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                                <input type="text" id="name" value={name} onChange={(ev) => { setName(ev?.target?.value) }} className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" min={3} required />
                            </div>
                            <div>
                                <button type="button" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors" onClick={() => { save({ depth, parent_id: id, name }) }}>Save</button>
                            </div>
                        </form>
                    </div>
                </ModalContent>
            </Modal>
        )
    }

    function EditModal({ show, node, close }) {
        const { depth, parent_id, id } = node;
        const newUUID = generateUUID();
        async function update(data) {
            await axios.put(`https://netswifts.com/menus_project/public/api/menus/${id}`, data).then(() => {
                fetchData().then(() => {
                    onClose();
                })
            }).catch(err => {
                console.log('err:', err)
            })
        }
        const [name, setName] = useState("");
        function onClose() {
            close()
        }
        return (
            <Modal isOpen={show} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <div className="bg-white p-8 rounded-lg shadow-md w-full">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="menu-id" className="block text-gray-700 text-sm font-semibold mb-2">Menu ID</label>
                                <input type="text" id="menu-id" value={newUUID} readOnly className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="depth" className="block text-gray-700 text-sm font-semibold mb-2">Depth</label>
                                <input type="text" id="depth" value={depth} readOnly className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="parent-data" className="block text-gray-700 text-sm font-semibold mb-2">Parent Data</label>
                                <input type="text" id="parent-data" value={id || "null"} readOnly className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                                <input type="text" id="name" value={name} onChange={(ev) => { setName(ev?.target?.value) }} className="w-full p-3 bg-gray-100 text-gray-500 rounded-lg border border-gray-300" />
                            </div>
                            <div>
                                <button type="button" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors" onClick={() => { update({ depth, parent_id, name }) }}>Update</button>
                            </div>
                        </form>
                    </div>
                </ModalContent>
            </Modal>
        )
    }


    function DeleteModal({ show, node, close }) {
        const { id } = node;
        async function deleteEl(data) {
            await axios.delete(`https://netswifts.com/menus_project/public/api/menus/${id}`, data).then(async () => {
                fetchData().then(() => {
                    onClose();
                })
            }).catch(err => {
                console.log('err:', err)
            })
        }
        function onClose() {
            close()
        }
        return (
            <Modal isOpen={show} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Delete - {id}
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this element ?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={deleteEl}>
                            Delete
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    const TreeNode = ({ node, expandedNodes, setExpandedNodes, childClass, titleClass }) => {
        const isExpanded = expandedNodes.includes(node.name);
        const [show, setShow] = useState(false);
        const [showDel, setShowDel] = useState(false);
        const [showUp, setShowUp] = useState(false);
        const toggleNode = () => {
            if (isExpanded) {
                setExpandedNodes(expandedNodes.filter((title) => title !== node.name));
            } else {
                setExpandedNodes([...expandedNodes, node.name]);
            }
        };

        return (
            <div className={childClass}>
                <div className="ElBefore"></div>
                <div className="ElBeforeVertical"></div>
                {
                    node?.children ? (
                        <>
                            {node.children && (
                                <div className="flex justify-start items-center gap-2 El-Title">
                                    <MdOutlineKeyboardArrowDown className={`${node?.children?.length === 0 ? '!hidden' : '!block'}`} />
                                    <button
                                        onClick={toggleNode}
                                        className={`${node?.children?.length === 0 ? 'pl-2' : ''}`}
                                    >
                                        {node.name}
                                    </button>
                                    <FaPlusCircle className="cursor-pointer w-6 h-6 fill-blue-600" onClick={() => { setShow(true) }} />
                                    <FaMinusCircle className="cursor-pointer w-6 h-6 fill-red-600" onClick={() => { setShowDel(true) }} />
                                    <CiEdit className="cursor-pointer w-6 h-6" onClick={() => { setShowUp(true) }} />
                                </div>
                            )}
                            {!node.children && <span>{node.name}</span>}
                            {isExpanded && node.children && (
                                <div className={`ml-4 ${isExpanded ? 'expanded' : ''}`}>
                                    {node.children.map((child, index) => (
                                        <TreeNode
                                            key={index}
                                            node={child}
                                            expandedNodes={expandedNodes}
                                            setExpandedNodes={setExpandedNodes}
                                            childClass={`ml-4${index + 1 === node?.children?.length ? ' lastEl' : ''} El`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {node.sub_children && (
                                <div className="flex justify-start items-center gap-2 El-Title">
                                    <MdOutlineKeyboardArrowDown className={`${node?.sub_children?.length === 0 ? '!hidden' : '!block'}`} />
                                    <button
                                        onClick={toggleNode}
                                        className={`${node?.sub_children?.length === 0 ? 'pl-2' : ''}`}
                                    >
                                        {node.name}
                                    </button>
                                    <FaPlusCircle className="cursor-pointer w-6 h-6 fill-blue-600" onClick={() => { setShow(true) }} />
                                    <FaMinusCircle className="cursor-pointer w-6 h-6 fill-red-600" onClick={() => { setShowDel(true) }} />
                                    <CiEdit className="cursor-pointer w-6 h-6" onClick={() => { setShowUp(true) }} />
                                </div>
                            )}
                            {!node.sub_children && <span>{node.name}</span>}
                            {isExpanded && node.sub_children && (
                                <div className={`ml-4 ${isExpanded ? 'expanded' : ''}`}>
                                    {node.sub_children.map((child, index) => (
                                        <TreeNode
                                            key={index}
                                            node={child}
                                            expandedNodes={expandedNodes}
                                            setExpandedNodes={setExpandedNodes}
                                            childClass={`ml-4${index + 1 === node?.sub_children?.length ? ' lastEl' : ''} El`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )
                }
                <SaveModal show={show} node={node} close={() => { setShow(false) }} />
                <DeleteModal show={showDel} node={node} close={() => { setShowDel(false) }} />
                <EditModal show={showUp} node={node} close={() => { setShowUp(false) }} />
            </div>
        );
    };

    const fetchData = async () => {
        await axios.get("https://netswifts.com/menus_project/public/api/menus").then(async res => {
            await setData(res?.data?.menus)
        })
    }
    useEffect(() => {
        fetchData();
        // const int = setInterval(() => {
        //     fetchData();
        // }, 30000)
        // return () => {
        //     clearInterval(int);
        // };
    }, []);

    const expandAll = () => {
        const allTitles = [];

        const gatherTitles = (nodes) => {
            nodes.forEach((node) => {
                allTitles.push(node.name);
                if (node?.children || node?.sub_children) {
                    gatherTitles(node?.children || node?.sub_children);
                }
            });
        };

        gatherTitles(data);
        setExpandedNodes(allTitles);
    };

    const collapseAll = () => {
        setExpandedNodes([]);
    };

    return (
        <div className="p-4">
            <div className="flex justify-start items-center mb-8 gap-2">
                <div className="h-8 w-8 flex justify-center items-center bg-blue-700 rounded-full">
                    <HiTemplate className="fill-white" />
                </div>
                <h1 className="text-black font-bold text-xl">Menu</h1>
            </div>
            <h5 className="mb-1">Menu</h5>
            <Select variant='filled' placeholder='System Mangement' mb={"16px"} />
            <div className="mb-4 flex justify-center gap-4 items-center">
                <button
                    onClick={expandAll}
                    className="bg-blue-500 text-white rounded-full h-[35px] w-[120px]"
                >
                    Expand All
                </button>
                <button
                    onClick={collapseAll}
                    className="bg-transparent text-gray-600 border border-gray-600 rounded-full h-[35px] w-[120px]"
                >
                    Collapse All
                </button>
                <button
                    onClick={() => { setShow(true) }}
                    className="bg-transparent text-gray-600 border border-gray-600 rounded-full h-[35px] w-[120px] flex gap-1 items-center justify-center"
                >
                    Add <FaPlusCircle className="cursor-pointer" />
                </button>
            </div>
            <div>
                {data?.map((node, index) => (
                    <TreeNode
                        key={index}
                        node={node}
                        expandedNodes={expandedNodes}
                        setExpandedNodes={setExpandedNodes}
                    />
                ))}
            </div>
            <SaveModal show={show} node={{ depth: 0, parent_id: null }} close={() => { setShow(false) }} />
        </div>
    );
};

export default TreeView;