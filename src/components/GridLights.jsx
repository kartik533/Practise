import {useCallback, useEffect, useState} from "react";

export function GridLights({numberOfLights = 4}) {
    const [order, setOrder] = useState([]);

    const handleClick = (ind) => {
        const temp = [...order];
        temp.push(ind);
        setOrder(temp)
    }

    const revert = useCallback(() => {
        const timer = setInterval(() => {
            if (!order.length) {
                clearInterval(timer);
                setOrder([]);
                return;
            }
            const temp = [...order];
            temp.pop();
            setOrder(temp)
        }, 1000)
    }, [order])

    useEffect(() => {
        if (order.length === numberOfLights) {
            revert();
        }

    }, [order.length, numberOfLights, revert])

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(2, 1fr)`
            }}
        >
            {
                Array(numberOfLights).fill(null).map((_, ind) => {
                    return (
                        <span
                            onClick={() => handleClick(ind)}
                            style={{
                                height: "80px",
                                width: "80px",
                                border: '1px solid black',
                                background: order.includes(ind) ? 'green' : 'white'
                            }}
                        />
                    )
                })
            }
        </div>
    )
}