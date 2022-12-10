import { Link } from "react-router-dom"

export const Task = ({ task, doRefresh, refresh }) => {

    const defaultImage = () => {
        const min = 0
        const max = 6
        const randomNumber = Math.floor(Math.random()*(max-min+1))
        console.log(randomNumber)
        if (randomNumber === 1) {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        } else if (randomNumber === 2) {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/louis-hansel-fDdNNr63CGM-unsplash_n7v0qu.jpg" />
        } else if (randomNumber === 3) {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/tekton-B5jHf_4vBeg-unsplash_apw5ut.jpg" />
        } else if (randomNumber === 4) {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689181/HouseHub/Images/louis-hansel-Rf9eElW3Qxo-unsplash_pj3foz.jpg" />
        } else if (randomNumber === 5) {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689181/HouseHub/Images/jeshoots-com-VdOO4_HFTWM-unsplash_wveip6.jpg" />
        } else if (randomNumber === 6) {
            return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689181/HouseHub/Images/cesar-carlevarino-aragon-NL_DF0Klepc-unsplash_wqjjaq.jpg" />
        }
    }

    return <>
        <section className="task-container" key={`task--${task.id}`}>
           <section className="task">
                <div>
                    {
                        task.image ? <img className="task-image" src={task?.image} />
                        : defaultImage()
                    }
                </div>
                <div className="task-item">
                    <div className="task-item_title">{task.title}</div>
                    <div className="task-item_description">{task.description}</div> 
                    <div><Link className="task-item_edit" to={`/tasks/${task.id}/edit`}>Edit</Link></div>
                </div>
                <div className="task-metrics">
                    <div className="task-metrics_item">{task?.category?.category}</div>
                    <div className="task-metrics_item">{task?.frequency?.frequency}</div>
                    <div className="task-metrics_item">Insert linked work order feature</div>
                </div>
            </section>
            <div className="task-options">
                <Link to={`/workOrder/${task.id}/create`}>Create Work Order</Link>
                <button onClick={() => {
                    fetch(`http://localhost:8088/tasks/${task.id}`, {
                        method: "DELETE"
                    })
                        .then(() => {
                            doRefresh(!refresh)
                        })
                }}>
                    Delete
                </button>
            </div>
        </section>
    </>
}