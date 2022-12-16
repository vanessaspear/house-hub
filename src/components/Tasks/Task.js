import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Tasks.css"
import { WorkOrderStatus } from "../WorkOrders/WorkOrderStatus"

export const Task = ({ task, doRefresh, refresh }) => {
    const [currentTask, setTask] = useState([])

   useEffect(
        () => {
            fetch(`http://localhost:8088/tasks/${task.id}`)
                .then(res => res.json())
                .then((taskObj) => {
                    setTask(taskObj)
                })
        },
        []
   )

    const getCategoryIcon = () => {
        if (task?.category?.category === "Upgrade") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670863473/HouseHub/Resources/outline_trending_up_black_24dp_fsvhg1.png" />
                <div className="task-metrics_item">{task?.category?.category}</div>
            </div>
            </>
        } else if (task?.category?.category === "Maintenance") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670864355/HouseHub/Resources/outline_home_repair_service_black_24dp_rv3blt.png" />
                <div className="task-metrics_item">{task?.category?.category}</div>
            </div>
            </>
        } else if (task?.category?.category === "Repair") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670865754/HouseHub/Resources/Screenshot_2022-12-12_at_11.21.38_AM_lewnhb.png" />
                <div className="task-metrics_item">{task?.category?.category}</div>
            </div>
            </>
        }
    }

    const getDefaultImage = () => {
        if (task?.category?.category === "Upgrade") {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670885327/HouseHub/Images/lina-verovaya-41TbIC5J_l0-unsplash_attjjq.jpg" />
        } else if (task?.category?.category === "Maintenance") {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670885703/HouseHub/Images/rasa-kasparaviciene-fLBplDxkNsk-unsplash_xmlfpe.jpg" />
        } else if (task?.category?.category === "Repair") {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689181/HouseHub/Images/jeshoots-com-VdOO4_HFTWM-unsplash_wveip6.jpg" />
        }
    }

    const getFrequencyIcon = () => {
        if (task?.frequency?.frequency === "Seasonal - Spring") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670866184/HouseHub/Resources/Screenshot_2022-12-12_at_11.26.50_AM_qjkgn0.png" />
                <div className="task-metrics_item">{task?.frequency?.frequency}</div>
            </div>
            </>
        } else if (task?.frequency?.frequency === "Seasonal - Summer") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670866187/HouseHub/Resources/Screenshot_2022-12-12_at_11.27.21_AM_wevzkp.png" />
                <div className="task-metrics_item">{task?.frequency?.frequency}</div>
            </div>
            </>
        } else if (task?.frequency?.frequency === "Seasonal - Fall") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670866191/HouseHub/Resources/Screenshot_2022-12-12_at_11.28.05_AM_jiuqiw.png" />
                <div className="task-metrics_item">{task?.frequency?.frequency}</div>
            </div>
            </>
        }  else if (task?.frequency?.frequency === "Seasonal - Winter") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670866191/HouseHub/Resources/Screenshot_2022-12-12_at_11.27.39_AM_w09k4n.png" />
                <div className="task-metrics_item">{task?.frequency?.frequency}</div>
            </div>
            </>
        } else if (task?.frequency?.frequency === "Annual") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670866635/HouseHub/Resources/Screenshot_2022-12-12_at_11.36.44_AM_d6wdmc.png" />
                <div className="task-metrics_item">{task?.frequency?.frequency}</div>
            </div>
            </>
        } else if (task?.frequency?.frequency === "One time") {
            return <>
            <div className="metrics-category">
                <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670866779/HouseHub/Resources/Screenshot_2022-12-12_at_11.39.12_AM_ssivrm.png" />
                <div className="task-metrics_item">{task?.frequency?.frequency}</div>
            </div>
            </>
        }
        }

    return <>
        <section className="task-container" key={`task--${task.id}`}>
           <section className="task">
            {
                task.status === "Active" ? <>
                
                <div>
                    {
                        task.image ? <img className="task-image" src={task?.image} />
                        : getDefaultImage()
                    }
                </div>
                <div className="task-item">
                    <div className="task-item_title">{task.title}</div>
                    <div className="task-item_description">{task.description}</div>
                    <div className="task-options">
                        <div><Link className="task-item_link" to={`/tasks/${task.id}/edit`}>Edit</Link></div>|
                        <div className="task-option_item" onClick={() => {
                            fetch(`http://localhost:8088/tasks/${task.id}`, {
                                method: "DELETE"
                            })
                                .then(() => {
                                    doRefresh(!refresh)
                                })
                            }}>Delete</div>|
                        <div className="task-option_item" onClick={() => {
                            const copy = {...currentTask}
                            copy.status = "Archived"
                            setTask(copy)
                            fetch(`http://localhost:8088/tasks/${task.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(currentTask)
                            })
                                .then(() => {
                                    doRefresh(!refresh)
                                })
                            }}>Archive</div>
                    </div> 
                </div>
                <div className="task-metrics">
                    {getCategoryIcon()}
                    {getFrequencyIcon()}
                    <WorkOrderStatus task={task} />
                </div>
                </> 
                    : ""
            }
            </section>
        </section>
    </>
}