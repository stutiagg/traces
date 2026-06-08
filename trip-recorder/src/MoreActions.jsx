import './MoreActions.css'

function MoreActions({handleEdit, handleDelete}){
    return(
        <div className='menu' onClick={(e) => e.stopPropagation()}>
        <button onClick={handleEdit}>Edit</button>

        <button onClick={handleDelete}>Delete</button>
        
        </div>
    )
}

export default MoreActions