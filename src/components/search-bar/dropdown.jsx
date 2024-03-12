import './style.css';

export default function Dropdown({ searchParams, dataList, handleSearch }) {

    function handleFilterData() {
        if (dataList && dataList.length > 2 && searchParams && searchParams.length > 2) {
            const filteredData = dataList.filter(data => {
                const paramsToString = searchParams.toString();
                const paramsTLC = paramsToString ? searchParams.toLowerCase() : null;
                const dataTLC = paramsTLC ? data.name.toLowerCase() : null;
                return dataTLC.startsWith(paramsTLC);
            });
            return filteredData;
        }
    }

    const filteredDataArray = handleFilterData();

    return (
        <div className={filteredDataArray && filteredDataArray.length > 0 ? "searchBar__dropdown searchBar__dropdown--active" : "searchBar__dropdown"}>
            <ul>
                {
                    filteredDataArray && filteredDataArray.length > 0 ? 
                    filteredDataArray.map((data) => 
                        <li key={data.id} onClick={(e) => handleSearch(e, data.id)}>
                            {data.string}
                        </li>
                    )
                    : null
                }
            </ul>
        </div>
    );
}