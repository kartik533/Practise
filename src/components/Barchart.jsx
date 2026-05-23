export default function Barchart({items}) {

    const maxCount = Math.max(...(items.map(item => item.count)))
    const getRelativeHeight = (count) => `${count / maxCount * 100}%`;
    return (
        <div className="bar-container">
            {
                items.map(item => {
                    return (
                        <div
                            key={item.id}
                            className='bar'
                            title={`Item count: ${item.count}`}
                            style={{height: `${getRelativeHeight(item.count)}`, background: `${item.color}`}}
                        ></div>
                    )
                })
            }
        </div>
    )
}