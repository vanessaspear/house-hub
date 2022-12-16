import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Contractor = ({ contractor, doRefresh, refresh }) => {

    const [currentContractor, setContractor] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/contractors/${contractor.id}`)
                .then(res => res.json())
                .then((contractorObj) => {
                    setContractor(contractorObj)
                })
        },
        []
   )

    const getDefaultImage = () => {
        if (contractor.specialty === "Electrical") {
            return <img className="contractor-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        } else if (contractor.specialty === "Lawn & Landscaping") {
            return <img className="contractor-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        } else if(contractor.specialty === "Plumbing") {
            return <img className="contractor-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        }  else if(contractor.specialty === "HVAC") {
            return <img className="contractor-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        }  else if(contractor.specialty === "Pools") {
            return <img className="contractor-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        }  else if(contractor.specialty === "General Contracting") {
            return <img className="contractor-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        } else {
            return <img className="contractor-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689180/HouseHub/Images/zoe-schaeffer-VW6gnHHZIjg-unsplash_lkoo34.jpg" />
        }
    }

    return <>
        <section className="contractor-container" key={contractor.id}>
            <section className="contractor">
                {
                    contractor.status === "Active" ? <>
                        <div>
                            {
                                contractor.image ? <img className="contractor-image" src={contractor?.image} />
                                : getDefaultImage()
                            }
                        </div>
                        <div className="contractor-item">
                            <div className="contractor-item_title">{contractor.company}</div>
                            <div className="task-item_description">Primary Contact - {contractor.primaryContact}</div>
                            <div className="contractor-options">
                                <div><Link className="contractor-item_link" to={`/contractors/${contractor.id}/edit`}>Edit</Link></div>|
                                <div className="contractor-option_item" onClick={() => {
                                    fetch(`http://localhost:8088/contractors/${contractor.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(() => {
                                            doRefresh(!refresh)
                                        })
                                    }}>Delete</div>|
                                <div className="contractor-option_item" onClick={() => {
                                    const copy = {...currentContractor}
                                    copy.status = "Archived"
                                    setContractor(copy)
                                    fetch(`http://localhost:8088/contractors/${contractor.id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(currentContractor)
                                    })
                                        .then(() => {
                                            doRefresh(!refresh)
                                        })
                                    }}>Archive</div>
                            </div>
                        </div>
                            <div className="contractor-metrics">
                                <div className="metrics-category">
                                    <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670962009/HouseHub/Resources/Screenshot_2022-12-13_at_2.05.34_PM_cptjai.png" />
                                    <div className="contractor-metrics_item"> {contractor.specialty}</div>
                                </div>
                                <div className="metrics-category">
                                    <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670962010/HouseHub/Resources/Screenshot_2022-12-13_at_2.03.27_PM_jqtgi3.png" />
                                    <div className="contractor-metrics_item"> {contractor.phone}</div>
                                </div>
                                <div className="metrics-category">
                                    <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670962010/HouseHub/Resources/Screenshot_2022-12-13_at_2.03.51_PM_rqinnx.png" />
                                    <div className="contractor-metrics_item"> {contractor.email}</div>
                                </div>
                                {/* {
                                    workOrder ? <div>This contractor is working on<Link className="contractor-item_link" to={`/workOrders`}>Work Order #{workOrder.id}</Link></div>
                                        : <div>This contractor is not currently working on any work orders</div>
                                } */}
                            </div>
                    </>
                        : ""
                }
            </section>
        </section>
    </>
}