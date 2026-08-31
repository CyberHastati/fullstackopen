
const Filter = (props) => {
    return (
        <div>
            filter shown with {' '}
            <input 
                value={props.filterName} 
                onChange={props.handleFilterInput}
            />
        </div>
    )
}
export default Filter