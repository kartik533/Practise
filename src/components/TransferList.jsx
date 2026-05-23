import {useState} from "react";

const INITIAL_LEFT = [
    { value: "apple", isSelected: false },
    { value: "mango", isSelected: false },
    { value: "orange", isSelected: false },
];

const INITIAL_RIGHT = [
    { value: "html", isSelected: false },
    { value: "json", isSelected: false },
    { value: "react", isSelected: false },
];

export function TransferList() {
    const [left, setLeft] = useState(INITIAL_LEFT);
    const [right, setRight] = useState(INITIAL_RIGHT);

    // ✅ Toggle
    const toggleLeft = (value) => {
        setLeft(prev =>
            prev.map(i =>
                i.value === value ? { ...i, isSelected: !i.isSelected } : i
            )
        );
    };

    const toggleRight = (value) => {
        setRight(prev =>
            prev.map(i =>
                i.value === value ? { ...i, isSelected: !i.isSelected } : i
            )
        );
    };

    // ✅ Move selected
    const moveLeftToRight = () => {
        const selected = left.filter(i => i.isSelected);
        const unselected = left.filter(i => !i.isSelected);

        setRight(prev => [
            ...prev,
            ...selected.map(i => ({ ...i, isSelected: false }))
        ]);
        setLeft(unselected);
    };

    const moveRightToLeft = () => {
        const selected = right.filter(i => i.isSelected);
        const unselected = right.filter(i => !i.isSelected);

        setLeft(prev => [
            ...prev,
            ...selected.map(i => ({ ...i, isSelected: false }))
        ]);
        setRight(unselected);
    };

    // ✅ Move all
    const moveAllLeftToRight = () => {
        setRight(prev => [
            ...prev,
            ...left.map(i => ({ ...i, isSelected: false }))
        ]);
        setLeft([]);
    };

    const moveAllRightToLeft = () => {
        setLeft(prev => [
            ...prev,
            ...right.map(i => ({ ...i, isSelected: false }))
        ]);
        setRight([]);
    };

    return (
        <div className="main">
            {/* LEFT */}
            <div className='left-list'>
                {left.map(item => (
                    <div key={item.value}>
                        <input
                            type="checkbox"
                            checked={item.isSelected}
                            onChange={() => toggleLeft(item.value)}
                        />
                        {item.value}
                    </div>
                ))}
            </div>

            {/* ACTIONS */}
            <div className='middle'>
                <button onClick={moveAllRightToLeft}>&lt;&lt;</button>
                <button onClick={moveRightToLeft}>&lt;</button>
                <button onClick={moveLeftToRight}>&gt;</button>
                <button onClick={moveAllLeftToRight}>&gt;&gt;</button>
            </div>

            {/* RIGHT */}
            <div className='right'>
                {right.map(item => (
                    <div key={item.value}>
                        <input
                            type="checkbox"
                            checked={item.isSelected}
                            onChange={() => toggleRight(item.value)}
                        />
                        {item.value}
                    </div>
                ))}
            </div>
        </div>
    );
}