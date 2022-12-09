import { Link } from "react-router-dom"

export const Contractor = ({ contractor, doRefresh, refresh }) => {

    return <>
        <section className="contractor" key={contractor.id}>
            <header><Link to={`/contractors/${contractor.id}/edit`}>{contractor.company}</Link></header>
            <div>Primary Contact: {contractor.primaryContact}</div>
            <div>Phone: {contractor.phone}</div>
            <div>Email: {contractor.email}</div>
            <div>Specialty: {contractor.specialty}</div>
            <footer>
            <button onClick={() => {
                fetch(`http://localhost:8088/contractors/${contractor.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        doRefresh(!refresh)
                    })
            }}>
                Delete
            </button>
            </footer>
        </section>
    </>
}