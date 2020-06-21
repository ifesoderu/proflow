import React from 'react'
import ThreeDotsIcon from '../../assets/img/ThreeDots.svg'
import AddAssigneeIcon from '../../assets/img/addAssigneeIcon.svg'
import AddDueDateIcon from '../../assets/img/addDueDateIcon.svg'
import ProfileImage from '../../assets/img/profileImage.svg'
import { Draggable } from 'react-beautiful-dnd'


export const ProjectTask = ({ title, id, index }) => {
    return (
        <Draggable
            draggableId={`${id}`}
            index={index}
        >{
                (provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        className={`py-5 px-3.5 w-full  mb-5 bg-white rounded-lg`}
                    // className={`py-5 px-3.5 w-full  mb-5 ${snapshot.isDragging ? 'bg-red-200' : 'bg-white'} rounded-lg`}
                    >
                        <div className="flex">
                            <span className="text-base flex-grow font-semibold">{title}</span>
                            <button className="w-2/12 p-0 mb-1 bg-opacity-0 rounded-lg"><img className="float-right" src={ThreeDotsIcon} alt="section menu" /></button>
                        </div>
                        <div className=" flex mt-1 flex-wrap">
                            {[1, 2, 3].length !== 0 ?
                                (<span className="">
                                    {([1, 2].map((assignee, _, arr) => (
                                        <img src={ProfileImage} className={`w-5.5 mr-2 bg-gray-300 border inline-block rounded-full ${arr.length > 4 && 'mb-3'}`} alt="add assignee" />
                                    )))}
                                </span>) :
                                <span className="w-1/5"><img src={AddAssigneeIcon} alt="add assignee" /></span>
                            }
                            <span className="ml-1 w-2/5"><img src={AddDueDateIcon} alt="add due date" /></span>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}